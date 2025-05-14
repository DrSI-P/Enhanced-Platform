@echo off
REM EdPsych Connect Enhanced Platform (2025) Deployment Script for Windows
REM This script automates the deployment of the Enhanced Platform to Vercel

echo EdPsych Connect Enhanced Platform (2025) Deployment
echo ==================================================
echo.

REM Check if Vercel CLI is installed
where vercel >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Error: Vercel CLI is not installed.
    echo Please install it using: npm install -g vercel
    exit /b 1
)

REM Check if user is logged in to Vercel
echo Checking Vercel authentication...
vercel whoami >nul 2>nul
if %ERRORLEVEL% neq 0 (
    echo Not logged in to Vercel. Initiating login...
    vercel login
    if %ERRORLEVEL% neq 0 (
        echo Failed to log in to Vercel. Aborting deployment.
        exit /b 1
    )
)
echo Authenticated with Vercel as: 
vercel whoami
echo.

REM Install dependencies
echo Installing dependencies...
call npm install
if %ERRORLEVEL% neq 0 (
    echo Failed to install dependencies. Aborting deployment.
    exit /b 1
)
echo Dependencies installed successfully.
echo.

REM Build the project
echo Building project...
call npm run build
if %ERRORLEVEL% neq 0 (
    echo Build failed. Aborting deployment.
    exit /b 1
)
echo Build completed successfully.
echo.

REM Deploy to Vercel
echo Deploying to Vercel...
echo This may take a few minutes...

REM Check if this is a production deployment
set /p PROD_DEPLOY="Is this a production deployment? (y/n): "
if /i "%PROD_DEPLOY%"=="y" (
    echo Deploying to production...
    vercel --prod
) else (
    echo Deploying to preview environment...
    vercel
)

if %ERRORLEVEL% neq 0 (
    echo Deployment failed. Please check the error messages above.
    exit /b 1
)

echo Deployment completed successfully!
echo.

REM Domain configuration reminder
echo.
echo Domain Configuration:
echo To configure custom domains (edpsychconnect.com and edpsychconnect.app),
echo please follow the instructions in DOMAIN_CONFIGURATION_GUIDE.md

REM Final steps
echo.
echo Next Steps:
echo 1. Test the application thoroughly
echo 2. Configure custom domains if this is a production deployment
echo 3. Set up monitoring for the application
echo.
echo Deployment process completed!

pause