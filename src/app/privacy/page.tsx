import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Prozilli Gaming and Prozilli Inc. Learn how we collect, use, and protect your personal information across our platforms and services.",
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: "https://prozilligaming.com/privacy",
  },
};

export default function PrivacyPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming relative flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-3xl font-bold tracking-tight text-white md:text-5xl">
            Privacy Policy
          </h1>
          <p className="animate-fade-in-up animate-delay-100 mt-4 text-sm text-muted">
            Last updated: February 1, 2025
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="prose prose-invert max-w-none space-y-10 text-sm leading-relaxed text-muted">
          {/* Introduction */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              1. Introduction
            </h2>
            <p>
              Prozilli Gaming (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a division of Prozilli Entertainment operated under Prozilli Inc., is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at prozilligaming.com, use our streaming services, interact with our community platforms, or engage with any of our related services (collectively, the &quot;Services&quot;).
            </p>
            <p className="mt-3">
              Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Services.
            </p>
          </div>

          {/* Information We Collect */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              2. Information We Collect
            </h2>
            <h3 className="mb-2 mt-4 font-semibold text-brand-silver">
              2.1 Information You Provide
            </h3>
            <p>We may collect information that you voluntarily provide when using our Services, including:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Contact information (such as email address) when you reach out for business inquiries</li>
              <li>Account information when you register through third-party platforms (Discord, Twitch, YouTube, etc.)</li>
              <li>Payment and transaction information when you make purchases or donations through third-party services (Fourthwall, Ko-fi, Patreon, PayPal)</li>
              <li>User-generated content, including chat messages, community posts, and application submissions</li>
              <li>Any other information you choose to provide to us</li>
            </ul>

            <h3 className="mb-2 mt-6 font-semibold text-brand-silver">
              2.2 Information Collected Automatically
            </h3>
            <p>When you access our Services, we may automatically collect certain information, including:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Device information (browser type, operating system, device identifiers)</li>
              <li>Log data (IP address, access times, pages viewed, referring URLs)</li>
              <li>Usage data (interactions with our website, features used, content viewed)</li>
              <li>Location data (general geographic location derived from IP address)</li>
            </ul>
          </div>

          {/* Cookies and Tracking */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              3. Cookies and Tracking Technologies
            </h2>
            <p>
              We and our third-party service providers may use cookies, web beacons, pixels, and similar tracking technologies to collect information about your interactions with our Services. These technologies help us analyze trends, administer the website, track user movements, and gather demographic information.
            </p>
            <h3 className="mb-2 mt-4 font-semibold text-brand-silver">
              Types of Cookies We Use
            </h3>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>
                <span className="font-medium text-white">Essential Cookies:</span> Required for the operation of our website and cannot be disabled
              </li>
              <li>
                <span className="font-medium text-white">Analytics Cookies:</span> Help us understand how visitors interact with our website by collecting information anonymously
              </li>
              <li>
                <span className="font-medium text-white">Functionality Cookies:</span> Enable enhanced functionality and personalization
              </li>
              <li>
                <span className="font-medium text-white">Third-Party Cookies:</span> Set by third-party services embedded in our website (e.g., Twitch player, YouTube embeds, analytics providers)
              </li>
            </ul>
            <p className="mt-3">
              You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of our Services.
            </p>
          </div>

          {/* How We Use Information */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              4. How We Use Your Information
            </h2>
            <p>We may use the information we collect for the following purposes:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>To provide, maintain, and improve our Services</li>
              <li>To process transactions and send related information</li>
              <li>To send you updates, notifications, and communications related to our Services</li>
              <li>To respond to your inquiries, comments, or requests</li>
              <li>To monitor and analyze usage trends and preferences</li>
              <li>To detect, prevent, and address technical issues, fraud, or security concerns</li>
              <li>To enforce our Terms of Service and other policies</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          {/* Sharing Information */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              5. How We Share Your Information
            </h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>
                <span className="font-medium text-white">Service Providers:</span> We may share information with third-party vendors who perform services on our behalf, such as hosting, analytics, and payment processing
              </li>
              <li>
                <span className="font-medium text-white">Legal Requirements:</span> We may disclose information if required to do so by law or in response to valid requests by public authorities
              </li>
              <li>
                <span className="font-medium text-white">Business Transfers:</span> In connection with any merger, sale of company assets, financing, or acquisition of all or a portion of our business
              </li>
              <li>
                <span className="font-medium text-white">With Your Consent:</span> We may share information with your consent or at your direction
              </li>
            </ul>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              6. Third-Party Services
            </h2>
            <p>
              Our Services integrate with and link to third-party platforms and services, including but not limited to:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Streaming platforms (Twitch, YouTube, Kick, Trovo, Facebook Gaming)</li>
              <li>Community platforms (Discord)</li>
              <li>Commerce platforms (Fourthwall)</li>
              <li>Support platforms (Ko-fi, Patreon, PayPal)</li>
              <li>Social media platforms (TikTok, Instagram, X)</li>
            </ul>
            <p className="mt-3">
              These third-party services have their own privacy policies and data collection practices. We encourage you to review the privacy policies of any third-party services you interact with through our Services. We are not responsible for the privacy practices of these third parties.
            </p>
          </div>

          {/* Data Retention */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              7. Data Retention
            </h2>
            <p>
              We retain your information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements. When we no longer have a legitimate business need to process your personal information, we will either delete or anonymize it.
            </p>
          </div>

          {/* Data Security */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              8. Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational security measures designed to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is completely secure. While we strive to protect your personal information, we cannot guarantee its absolute security.
            </p>
          </div>

          {/* Your Rights */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              9. Your Rights and Choices
            </h2>
            <p>
              Depending on your location and applicable law, you may have the following rights regarding your personal information:
            </p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>
                <span className="font-medium text-white">Access:</span> The right to request access to the personal information we hold about you
              </li>
              <li>
                <span className="font-medium text-white">Correction:</span> The right to request correction of inaccurate or incomplete personal information
              </li>
              <li>
                <span className="font-medium text-white">Deletion:</span> The right to request deletion of your personal information, subject to certain exceptions
              </li>
              <li>
                <span className="font-medium text-white">Opt-Out:</span> The right to opt out of certain data processing activities, including marketing communications
              </li>
              <li>
                <span className="font-medium text-white">Portability:</span> The right to receive your personal information in a structured, commonly used, and machine-readable format
              </li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a
                href="mailto:business@prozilli.com"
                className="text-brand-gold transition-colors hover:text-white"
              >
                business@prozilli.com
              </a>
              . We will respond to your request in accordance with applicable law.
            </p>
          </div>

          {/* Children's Privacy */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              10. Children&apos;s Privacy
            </h2>
            <p>
              Our Services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly. If you believe we may have collected information from a child under 13, please contact us immediately.
            </p>
          </div>

          {/* International Users */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              11. International Users
            </h2>
            <p>
              Our Services are operated in the United States. If you are accessing our Services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States. By using our Services, you consent to the transfer of your information to the United States, which may have different data protection laws than your jurisdiction.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              12. Changes to This Privacy Policy
            </h2>
            <p>
              We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting the updated Privacy Policy on our website and updating the &quot;Last updated&quot; date. Your continued use of our Services after any changes to this Privacy Policy constitutes your acceptance of the revised policy.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              13. Contact Information
            </h2>
            <p>
              If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:
            </p>
            <div className="mt-4 rounded-lg border border-white/5 bg-white/3 p-6">
              <p className="font-medium text-white">Prozilli Inc.</p>
              <p className="mt-1">
                Email:{" "}
                <a
                  href="mailto:business@prozilli.com"
                  className="text-brand-gold transition-colors hover:text-white"
                >
                  business@prozilli.com
                </a>
              </p>
              <p className="mt-1">
                Web:{" "}
                <Link
                  href="/contact"
                  className="text-brand-gold transition-colors hover:text-white"
                >
                  prozilligaming.com/contact
                </Link>
              </p>
            </div>
            <p className="mt-6 text-xs text-muted">
              Prozilli Gaming is a division of Prozilli Entertainment, operated under Prozilli Inc.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
