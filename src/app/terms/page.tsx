import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
};

export default function TermsPage() {
  return (
    <>
      {/* Hero */}
      <section className="gradient-gaming relative flex flex-col items-center px-6 pt-20 pb-12 text-center">
        <div className="relative z-10">
          <h1 className="animate-fade-in-up text-3xl font-bold tracking-tight text-white md:text-5xl">
            Terms of Service
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
              Welcome to Prozilli Gaming (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a division of Prozilli Entertainment operated under Prozilli Inc. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Prozilli Gaming website located at prozilligaming.com, our streaming content, community platforms, and all related services (collectively, the &quot;Services&quot;).
            </p>
            <p className="mt-3">
              By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.
            </p>
          </div>

          {/* Use of Services */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              2. Use of Services
            </h2>
            <p>
              You may use our Services only in compliance with these Terms and all applicable local, state, national, and international laws, rules, and regulations. You must be at least 13 years of age to use our Services. If you are under 18, you represent that you have your parent or guardian&apos;s consent to use the Services.
            </p>
            <p className="mt-3">
              We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with or without notice. We shall not be liable to you or any third party for any modification, suspension, or discontinuation of the Services.
            </p>
          </div>

          {/* Accounts */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              3. Accounts and Registration
            </h2>
            <p>
              Certain features of our Services may require you to create an account or register through third-party platforms (including but not limited to Discord, Twitch, YouTube, Patreon, Ko-fi, and Fourthwall). You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
            </p>
            <p className="mt-3">
              You agree to provide accurate, current, and complete information during registration and to update such information as necessary. We reserve the right to suspend or terminate your account if any information provided is inaccurate, misleading, or incomplete.
            </p>
          </div>

          {/* Content */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              4. Content and Intellectual Property
            </h2>
            <p>
              All content available through our Services, including but not limited to text, graphics, logos, images, audio, video, stream recordings, branding materials, and software, is the property of Prozilli Inc. or its licensors and is protected by United States and international copyright, trademark, and other intellectual property laws.
            </p>
            <p className="mt-3">
              You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our content without our prior written consent, except as permitted by fair use under applicable law.
            </p>
            <p className="mt-3">
              The Prozilli Gaming name, logo, and all related names, logos, product and service names, designs, and slogans are trademarks of Prozilli Inc. You must not use such marks without our prior written permission.
            </p>
          </div>

          {/* User Content */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              5. User-Generated Content
            </h2>
            <p>
              Our Services may allow you to submit, post, or share content, including messages in chat, Discord servers, or other community platforms (&quot;User Content&quot;). You retain ownership of your User Content, but by submitting it, you grant Prozilli Inc. a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with the Services and our business operations.
            </p>
            <p className="mt-3">
              You represent and warrant that you own or have the necessary rights to submit your User Content and that it does not violate the rights of any third party.
            </p>
          </div>

          {/* Acceptable Use */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              6. Acceptable Use Policy
            </h2>
            <p>You agree not to use our Services to:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Violate any applicable law, regulation, or these Terms</li>
              <li>Harass, abuse, threaten, or intimidate any person</li>
              <li>Post or transmit content that is unlawful, defamatory, obscene, hateful, or otherwise objectionable</li>
              <li>Impersonate any person or entity, or falsely state or misrepresent your affiliation with a person or entity</li>
              <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
              <li>Attempt to gain unauthorized access to any portion of the Services or any other systems or networks</li>
              <li>Use any automated means, including bots, scrapers, or spiders, to access the Services without our express written permission</li>
              <li>Engage in any activity that could damage, disable, overburden, or impair the functioning of the Services</li>
              <li>Collect or harvest personal information of other users without their consent</li>
            </ul>
            <p className="mt-3">
              We reserve the right to investigate and take appropriate action against anyone who violates this policy, including removal of content, suspension or termination of access, and reporting to law enforcement authorities.
            </p>
          </div>

          {/* Purchases and Donations */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              7. Purchases, Donations, and Subscriptions
            </h2>
            <p>
              Certain aspects of our Services may involve purchases, donations, or subscriptions through third-party platforms including but not limited to Fourthwall, Ko-fi, Patreon, and PayPal. These transactions are subject to the respective terms and policies of those third-party platforms.
            </p>
            <p className="mt-3">
              Donations and tips are voluntary and non-refundable unless required by applicable law. Merchandise purchases are subject to the return and refund policies of the applicable storefront provider. We are not responsible for issues arising from third-party payment processing.
            </p>
          </div>

          {/* Third-Party Services */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              8. Third-Party Services and Links
            </h2>
            <p>
              Our Services may contain links to third-party websites, services, or content that are not owned or controlled by Prozilli Inc. We have no control over, and assume no responsibility for, the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that Prozilli Inc. shall not be responsible or liable for any damage or loss caused by your use of any such third-party websites or services.
            </p>
          </div>

          {/* Disclaimer */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              9. Disclaimer of Warranties
            </h2>
            <p>
              THE SERVICES ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE. PROZILLI INC. DOES NOT WARRANT THAT THE SERVICES WILL BE UNINTERRUPTED, TIMELY, SECURE, OR ERROR-FREE.
            </p>
          </div>

          {/* Limitation of Liability */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              10. Limitation of Liability
            </h2>
            <p>
              IN NO EVENT SHALL PROZILLI INC., ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, WHETHER OR NOT WE HAVE BEEN INFORMED OF THE POSSIBILITY OF SUCH DAMAGE.
            </p>
          </div>

          {/* Indemnification */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              11. Indemnification
            </h2>
            <p>
              You agree to defend, indemnify, and hold harmless Prozilli Inc. and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees (including reasonable attorneys&apos; fees) arising out of or relating to your violation of these Terms or your use of the Services.
            </p>
          </div>

          {/* Governing Law */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              12. Governing Law
            </h2>
            <p>
              These Terms shall be governed by and construed in accordance with the laws of the United States and the State in which Prozilli Inc. is incorporated, without regard to its conflict of law provisions. Any legal action or proceeding arising under these Terms shall be brought exclusively in the courts located in the jurisdiction of Prozilli Inc.&apos;s principal place of business.
            </p>
          </div>

          {/* Changes */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              13. Changes to Terms
            </h2>
            <p>
              We reserve the right to modify these Terms at any time. If we make material changes, we will provide notice through the Services or by other means. Your continued use of the Services after the effective date of any changes constitutes your acceptance of the revised Terms.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h2 className="mb-4 text-lg font-bold tracking-wide text-white">
              14. Contact Information
            </h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a
                href="mailto:business@prozilli.com"
                className="text-brand-gold transition-colors hover:text-white"
              >
                business@prozilli.com
              </a>{" "}
              or visit our{" "}
              <Link
                href="/contact"
                className="text-brand-gold transition-colors hover:text-white"
              >
                Contact page
              </Link>
              .
            </p>
            <p className="mt-6 text-xs text-muted">
              Prozilli Gaming is a division of Prozilli Entertainment, operated under Prozilli Inc.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
