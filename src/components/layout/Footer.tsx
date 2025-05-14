import Link from 'next/link';
import Image from 'next/image'; // Import Next.js Image component

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-6 md:mb-0">
            <Link href="/" className="flex items-center mb-4">
              {/* Replace CSS monogram with Image component */}
              <Image 
                src="/images/EdPsych_Connect_Logo.png" 
                alt="EdPsych Connect Logo" 
                width={180} // Adjust width as needed, maintaining aspect ratio
                height={40} // Adjust height as needed, maintaining aspect ratio
                // No priority needed for footer logo usually
              />
            </Link>
            <p className="text-gray-400 mb-4">
              Bridging education and psychology with innovative AI-powered solutions.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white">
                <span className="sr-only">Twitter</span>
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/dr-scott-ighavongbe-patrick-dedpsych-cpsychol-9143941b6?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=ios_app" className="text-gray-400 hover:text-white" target="_blank" rel="noopener noreferrer">
                <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Platform</h3>
            <ul className="space-y-2">
              <li><Link href="/#features" className="text-gray-400 hover:text-white">Features</Link></li>
              <li><Link href="/resources" className="text-gray-400 hover:text-white">Resources</Link></li>
              <li><Link href="/professional-development" className="text-gray-400 hover:text-white">Professional Development</Link></li>
              <li><Link href="/register" className="text-gray-400 hover:text-white">Sign Up</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Support</h3>
            <ul className="space-y-2">
              <li><Link href="/executive-dysfunction" className="text-gray-400 hover:text-white">Executive Dysfunction</Link></li>
              <li><Link href="/semh-support" className="text-gray-400 hover:text-white">SEMH Support</Link></li>
              <li><Link href="/about" className="text-gray-400 hover:text-white">About Us</Link></li>
              <li><Link href="/contact" className="text-gray-400 hover:text-white">Contact</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold mb-4">Legal</h3>
            <ul className="space-y-2">
              <li><Link href="/legal/privacy-policy" className="text-gray-400 hover:text-white">Privacy Policy</Link></li>
              <li><Link href="/legal/terms-of-service" className="text-gray-400 hover:text-white">Terms of Service</Link></li>
              <li><Link href="/legal/cookie-policy" className="text-gray-400 hover:text-white">Cookie Policy</Link></li>
              <li><Link href="/legal/gdpr-compliance-statement" className="text-gray-400 hover:text-white">GDPR Compliance</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">
            &copy; 2025 EdPsych Connect Ltd. All rights reserved.
          </p>
          <p className="text-gray-400 text-sm mt-4 md:mt-0">
            38 Buckingham View, Chesham Buckinghamshire, HP5 3HA | +44 7376113640
          </p>
        </div>
      </div>
    </footer>
  );
}

