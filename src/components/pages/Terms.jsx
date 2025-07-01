import React from "react";
import { Helmet } from "react-helmet-async";

const Terms = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 py-20 text-gray-800 dark:text-gray-200">
      <Helmet>
        <title>Terms & Conditions | Virtual Book House</title>
      </Helmet>

      <h1 className="text-4xl font-bold mb-6 text-center">📜 Terms & Conditions</h1>

      <p className="mb-6">
        Welcome to <span className="font-semibold">Virtual Book House</span>! These terms and
        conditions outline the rules and regulations for the use of our platform. By accessing
        this website, we assume you accept these terms in full. Do not continue to use the site if
        you do not agree to all of the terms and conditions stated here.
      </p>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">1. User Accounts</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>You must be 13 years or older to create an account.</li>
          <li>Users are responsible for maintaining the confidentiality of their credentials.</li>
          <li>Sharing your account is not permitted.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">2. Content Ownership</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>
            You retain ownership of any content (books, reviews, etc.) you add to the platform.
          </li>
          <li>
            By posting content, you grant us a non-exclusive license to use, display, and share it
            within the app.
          </li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">3. Prohibited Activities</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>Uploading harmful or illegal content.</li>
          <li>Attempting to hack or manipulate the system.</li>
          <li>Spamming or harassing other users.</li>
        </ul>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">4. Termination</h2>
        <p>
          We reserve the right to suspend or terminate your account at any time for violations of
          our terms, or for any reason deemed appropriate by the platform administrators.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">5. Limitation of Liability</h2>
        <p>
          Virtual Book House is not liable for any content uploaded by users or any damages that
          may occur through the use of the platform.
        </p>
      </section>

      <section className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">6. Changes to Terms</h2>
        <p>
          We may update these Terms and Conditions from time to time. You will be notified of
          significant changes via email or on the platform.
        </p>
      </section>

      <p className="mt-8 text-sm text-gray-500 dark:text-gray-400 text-center">
        Last updated: July 1, 2025
      </p>
    </div>
  );
};

export default Terms;
