import { useState, useEffect } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';

export default function Login() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Handle error query parameter from NextAuth.js if a redirect occurs
  useEffect(() => {
    if (router.query.error) {
      switch (router.query.error) {
        case 'CredentialsSignin':
          setError('Invalid email or password. Please check your details and try again.');
          break;
        case 'AccessDenied':
            setError('Access Denied. You do not have permission to sign in.');
            break;
        default:
          setError('An error occurred during login. Please try again.');
          break;
      }
      // Remove error from URL to prevent re-display on refresh
      const { pathname, query } = router;
      delete query.error;
      router.replace({ pathname, query }, undefined, { shallow: true });
    }
  }, [router.query.error, router]);

  // Redirect if already logged in
  useEffect(() => {
    if (status === 'authenticated') {
      router.push('/');
    }
  }, [status, router]);

  if (status === 'loading' || status === 'authenticated') {
    return (
        <div className="flex justify-center items-center min-h-screen">
            <p>Loading...</p>
        </div>
    ); // Or a loading spinner
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    if (!formData.email || !formData.password) {
      setError('Please enter both email and password.');
      setIsLoading(false);
      return;
    }

    try {
      const result = await signIn('credentials', {
        redirect: false, // Handle redirect manually for better error display
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        switch (result.error) {
          case 'CredentialsSignin':
            setError('The email or password you entered is incorrect. Please try again.');
            break;
          default:
            setError(`Login failed: ${result.error}. Please try again later.`);
            break;
        }
        setIsLoading(false);
      } else if (!result?.ok) {
        setError('Login failed. Please check your credentials and try again later.');
        setIsLoading(false);
      } else {
        // Successful login, NextAuth session update will trigger useEffect for redirect
        // router.push('/'); // This can be handled by the useEffect watching session status
        // For immediate feedback if useEffect is slow, can still push here.
        // However, letting session status handle it is cleaner.
      }
    } catch (err) {
      console.error("Login submission error:", err);
      setError('An unexpected error occurred during login. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <>
      <Head>
        <title>Log In | EdPsych Connect</title>
        <meta name="description" content="Log in to your EdPsych Connect account" />
      </Head>
      <Navbar />
      <main className="bg-gray-50 py-12 min-h-[calc(100vh-128px)] flex items-center">
        <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md w-full">
          <h1 className="text-2xl font-bold text-center text-indigo-600 mb-6">Log In to Your Account</h1>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            {error && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-4" role="alert">
                <p>{error}</p>
              </div>
            )}
            
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                aria-required="true"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">Password</label>
              <input
                type="password"
                id="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                aria-required="true"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="rememberMe"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <label htmlFor="rememberMe" className="ml-2 block text-sm text-gray-700">
                  Remember me
                </label>
              </div>
              
              <div className="text-sm">
                {/* <Link href="/forgot-password" className="text-indigo-600 hover:text-indigo-500">
                  Forgot your password?
                </Link> */}
                {/* TODO: Implement forgot password page */}
              </div>
            </div>
            
            <div className="pt-4">
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isLoading ? 'Logging in...' : 'Log In'}
              </button>
            </div>
          </form>
          
          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{' '}
            <Link href="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}

