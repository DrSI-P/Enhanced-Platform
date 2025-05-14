import React from "react";
import CookieConsent, { Cookies } from "react-cookie-consent";
import Link from "next/link";

const CookieConsentBanner = () => {
  return (
    <CookieConsent
      location="bottom"
      buttonText="Accept All"
      declineButtonText="Decline"
      enableDeclineButton
      cookieName="edpsychConnectCookieConsent"
      style={{ background: "#2B373B", color: "#FFF" }}
      buttonStyle={{ backgroundColor: "#4CAF50", color: "#FFF", fontSize: "14px", borderRadius: "5px" }}
      declineButtonStyle={{ backgroundColor: "#f44336", color: "#FFF", fontSize: "14px", borderRadius: "5px" }}
      expires={150} // Expires in 150 days
      onAccept={() => {
        // This is where you would set cookies or enable tracking scripts
        // For example, if using Google Analytics:
        // window.gtag('consent', 'update', { 'analytics_storage': 'granted' });
        console.log("Cookies accepted by user.");
      }}
      onDecline={() => {
        // This is where you would disable cookies or tracking scripts
        // For example, if using Google Analytics:
        // window.gtag('consent', 'update', { 'analytics_storage': 'denied' });
        console.log("Cookies declined by user.");
        // Optionally, remove existing non-essential cookies if any were set before consent
        // Object.keys(Cookies.get()).forEach(cookieName => {
        //   if (cookieName !== 'edpsychConnectCookieConsent') { // Don't remove the consent cookie itself
        //     Cookies.remove(cookieName);
        //   }
        // });
      }}
    >
      This website uses cookies to enhance your experience and for analytics purposes. By clicking "Accept All", you consent to the use of all cookies. By clicking "Decline", only essential cookies will be used. You can read more in our{" "}
      <Link href="/legal/cookie-policy" style={{ color: "#a0c3ff", textDecoration: "underline" }}>
        Cookie Policy
      </Link>
      .
    </CookieConsent>
  );
};

export default CookieConsentBanner;

