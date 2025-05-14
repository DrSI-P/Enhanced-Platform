# Phase 2 Feature Documentation: Legal Pages and Cookie Consent

This document provides an overview of the legal pages and cookie consent mechanism implemented during Phase 2 of the EdPsych Connect platform revitalization.

## 1. Legal Pages

Four key legal documents were drafted and integrated into the EdPsych Connect website. These pages are crucial for compliance with UK data protection laws (including GDPR and PECR) and for establishing clear terms of service with users.

### 1.1. Implemented Legal Pages:

*   **Privacy Policy (`/legal/privacy-policy`):** Outlines how EdPsych Connect collects, uses, stores, and protects user data. It covers aspects like data subject rights, data retention, and information about children's privacy. The content was initially drafted with AI assistance and then refined to align with the platform's specific operations and UK legal standards.
*   **Terms of Service (`/legal/terms-of-service`):** Defines the rules and regulations for using the EdPsych Connect platform. It includes clauses on user responsibilities, intellectual property, limitations of liability, and dispute resolution.
*   **Cookie Policy (`/legal/cookie-policy`):** Provides detailed information about the types of cookies used on the website, their purpose, and how users can manage their cookie preferences. This page is directly linked from the cookie consent banner.
*   **GDPR Compliance Statement (`/legal/gdpr-compliance-statement`):** Affirms EdPsych Connect's commitment to GDPR principles and outlines the measures taken to ensure compliance. This serves as a supplementary document to the Privacy Policy.

### 1.2. Implementation Details:

*   **Content Generation:** Initial drafts were generated using an LLM, guided by specific requirements and UK legal frameworks. These drafts were then reviewed and refined internally.
*   **Integration:** Each legal document is available as a static Markdown page, rendered dynamically via a Next.js component (`/src/pages/legal/[slug].tsx`).
*   **Accessibility:** Links to these legal pages are prominently displayed in the website footer for easy access by users.
*   **Legal Review:** The user (Dr. Patrick) confirmed that the drafted legal pages were reviewed and approved by a legal professional (barrister).

### 1.3. Maintenance Considerations:

*   **Regular Review:** Legal documents should be reviewed and updated periodically (e.g., annually or when there are significant changes to the platform's data processing activities or relevant legislation).
*   **Accuracy:** Ensure that company details (registration number, contact address) are kept up-to-date within these documents.
*   **Version Control:** Maintain a record of changes to legal documents.

## 2. Cookie Consent Mechanism

A cookie consent mechanism has been implemented to comply with UK GDPR and PECR requirements regarding the use of cookies and tracking technologies.

### 2.1. Selected Solution:

*   **`react-cookie-consent` Library:** An open-source React component was chosen for its flexibility, ease of integration with Next.js, and customization options.

### 2.2. Implementation Details:

*   **Banner Display:** A cookie consent banner is displayed at the bottom of the screen for all new visitors.
*   **User Choice:** The banner provides users with clear options to "Accept All" or "Decline" non-essential cookies.
*   **Cookie Policy Link:** A direct link to the full Cookie Policy (`/legal/cookie-policy`) is included in the banner text.
*   **Consent Storage:** User consent preferences are stored in a cookie named `edpsychConnectCookieConsent` for 150 days.
*   **Global Integration:** The `CookieConsentBanner` component (`/src/components/ui/CookieConsentBanner.tsx`) is integrated into the global application layout (`/src/pages/_app.tsx`) to ensure it appears on all pages.
*   **Functionality:** Placeholder functions (`onAccept`, `onDecline`) are included in the banner component. These should be expanded in the future to manage the loading of specific tracking scripts (e.g., Google Analytics) based on user consent. Currently, they log the user's choice to the console.

### 2.3. Maintenance and Future Enhancements:

*   **Script Management:** Implement logic to conditionally load or block tracking scripts based on the consent status stored by `react-cookie-consent`.
*   **Granular Consent:** Consider implementing more granular cookie consent options in the future, allowing users to select specific categories of cookies they consent to (e.g., analytics, marketing), if required.
*   **Regular Audits:** Periodically audit the website's cookie usage to ensure the Cookie Policy and consent mechanism remain accurate and compliant.
*   **Library Updates:** Keep the `react-cookie-consent` library updated to its latest stable version.

This documentation covers the legal and cookie consent features implemented in Phase 2. The AI-powered blog and chatbot features have been paused due to technical blockers and will require separate documentation once development resumes and is completed.

