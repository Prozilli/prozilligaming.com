import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Prozilli Gaming, PRISMAI, and Prozilli Inc. services. Read our terms for website usage, application usage, community guidelines, and service agreements.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://prozilligaming.com/terms" },
};

export default function TermsPage() {
  return (
    <>
      <PageHero
        label="Legal"
        labelColor="muted"
        title="Terms of Service"
        subtitle="Last updated: February 1, 2025"
        accent="none"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-10 text-sm leading-relaxed text-muted">
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">1. Introduction</h2>
            <p>
              Welcome to Prozilli Gaming (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a division of Prozilli Entertainment operated under Prozilli Inc. These Terms of Service (&quot;Terms&quot;) govern your access to and use of the Prozilli Gaming website located at prozilligaming.com, our applications including PRISMAI, our streaming content, community platforms, and all related services (collectively, the &quot;Services&quot;). PRISMAI is an application developed and operated by Prozilli Inc. that provides AI-powered content and social media services through third-party platforms, including TikTok.
            </p>
            <p className="mt-3">By accessing or using our Services, you agree to be bound by these Terms. If you do not agree to these Terms, you must not access or use our Services.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">2. Use of Services</h2>
            <p>You may use our Services, including PRISMAI, only in compliance with these Terms and all applicable local, state, national, and international laws, rules, and regulations. You must be at least 13 years of age to use our Services. If you are under 18, you represent that you have your parent or guardian&apos;s consent to use the Services.</p>
            <p className="mt-3">We reserve the right to modify, suspend, or discontinue any aspect of the Services at any time, with or without notice.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">3. Accounts and Registration</h2>
            <p>Certain features of our Services may require you to create an account or register through third-party platforms (including but not limited to Discord, Twitch, YouTube, Patreon, Ko-fi, and Fourthwall). You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.</p>
            <p className="mt-3">You agree to provide accurate, current, and complete information during registration and to update such information as necessary.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">4. Content and Intellectual Property</h2>
            <p>All content available through our Services, including but not limited to text, graphics, logos, images, audio, video, stream recordings, branding materials, software, and content generated or delivered through PRISMAI, is the property of Prozilli Inc. or its licensors and is protected by United States and international copyright, trademark, and other intellectual property laws.</p>
            <p className="mt-3">You may not reproduce, distribute, modify, create derivative works of, publicly display, publicly perform, republish, download, store, or transmit any of our content without our prior written consent, except as permitted by fair use under applicable law.</p>
            <p className="mt-3">The Prozilli Gaming name, the PRISMAI name, and all related names, logos, product and service names, designs, and slogans are trademarks of Prozilli Inc.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">5. User-Generated Content</h2>
            <p>Our Services may allow you to submit, post, or share content, including messages in chat, Discord servers, or other community platforms (&quot;User Content&quot;). You retain ownership of your User Content, but by submitting it, you grant Prozilli Inc. a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, distribute, prepare derivative works of, display, and perform your User Content in connection with the Services.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">6. Acceptable Use Policy</h2>
            <p>You agree not to use our Services to:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Violate any applicable law, regulation, or these Terms</li>
              <li>Harass, abuse, threaten, or intimidate any person</li>
              <li>Post or transmit content that is unlawful, defamatory, obscene, hateful, or otherwise objectionable</li>
              <li>Impersonate any person or entity</li>
              <li>Interfere with or disrupt the Services or servers or networks connected to the Services</li>
              <li>Attempt to gain unauthorized access to any portion of the Services</li>
              <li>Use any automated means, including bots, scrapers, or spiders, to access the Services without our express written permission</li>
              <li>Engage in any activity that could damage, disable, overburden, or impair the functioning of the Services</li>
              <li>Collect or harvest personal information of other users without their consent</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">7. Purchases, Donations, and Subscriptions</h2>
            <p>Certain aspects of our Services may involve purchases, donations, or subscriptions through third-party platforms including but not limited to Fourthwall, Ko-fi, Patreon, and PayPal. These transactions are subject to the respective terms and policies of those third-party platforms.</p>
            <p className="mt-3">Donations and tips are voluntary and non-refundable unless required by applicable law.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">8. Third-Party Services and Links</h2>
            <p>Our Services, including PRISMAI, may contain links to or integrate with third-party websites, services, or content that are not owned or controlled by Prozilli Inc., including but not limited to TikTok and other social media platforms. Your use of PRISMAI in connection with third-party platforms such as TikTok is also subject to those platforms&apos; respective terms and policies.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">9. Disclaimer of Warranties</h2>
            <p>THE SERVICES, INCLUDING PRISMAI, ARE PROVIDED ON AN &quot;AS IS&quot; AND &quot;AS AVAILABLE&quot; BASIS, WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, NON-INFRINGEMENT, OR COURSE OF PERFORMANCE.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">10. Limitation of Liability</h2>
            <p>IN NO EVENT SHALL PROZILLI INC., ITS DIRECTORS, OFFICERS, EMPLOYEES, AGENTS, OR AFFILIATES BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING WITHOUT LIMITATION LOSS OF PROFITS, DATA, USE, GOODWILL, OR OTHER INTANGIBLE LOSSES, RESULTING FROM YOUR ACCESS TO OR USE OF OR INABILITY TO ACCESS OR USE THE SERVICES.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">11. Indemnification</h2>
            <p>You agree to defend, indemnify, and hold harmless Prozilli Inc. and its officers, directors, employees, and agents from and against any claims, liabilities, damages, judgments, awards, losses, costs, expenses, or fees arising out of or relating to your violation of these Terms or your use of the Services.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">12. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the United States and the State in which Prozilli Inc. is incorporated, without regard to its conflict of law provisions.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">13. Changes to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. If we make material changes, we will provide notice through the Services or by other means. Your continued use of the Services after the effective date of any changes constitutes your acceptance of the revised Terms.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">14. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{" "}
              <a href="mailto:business@prozilli.com" className="text-gold transition-colors hover:text-foreground">business@prozilli.com</a>
              {" "}or visit our{" "}
              <Link href="/contact" className="text-gold transition-colors hover:text-foreground">Contact page</Link>.
            </p>
            <p className="mt-6 text-xs text-dim">Prozilli Gaming is a division of Prozilli Entertainment, operated under Prozilli Inc.</p>
          </div>
        </div>
      </section>
    </>
  );
}
