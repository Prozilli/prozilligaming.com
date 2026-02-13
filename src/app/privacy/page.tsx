import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/ui/PageHero";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Prozilli Gaming, PRISMAI, and Prozilli Inc. Learn how we collect, use, and protect your personal information across our platforms and services, including the PRISMAI application.",
  robots: { index: true, follow: true },
  alternates: { canonical: "https://prozilligaming.com/privacy" },
};

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        label="Legal"
        labelColor="muted"
        title="Privacy Policy"
        subtitle="Last updated: February 1, 2025"
        accent="none"
      />

      <section className="mx-auto max-w-3xl px-6 py-16">
        <div className="space-y-10 text-sm leading-relaxed text-muted">
          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">1. Introduction</h2>
            <p>
              Prozilli Gaming (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;), a division of Prozilli Entertainment operated under Prozilli Inc., is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website at prozilligaming.com, use our applications including PRISMAI, use our streaming services, interact with our community platforms, or engage with any of our related services (collectively, the &quot;Services&quot;). PRISMAI is an application developed and operated by Prozilli Inc. that provides AI-powered content and social media services through third-party platforms, including TikTok.
            </p>
            <p className="mt-3">
              Please read this Privacy Policy carefully. By accessing or using our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy. If you do not agree with the terms of this Privacy Policy, please do not access or use our Services.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">2. Information We Collect</h2>
            <h3 className="mb-2 mt-4 font-semibold text-dim">2.1 Information You Provide</h3>
            <p>We may collect information that you voluntarily provide when using our Services, including through the PRISMAI application:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Contact information (such as email address) when you reach out for business inquiries</li>
              <li>Account information when you register through third-party platforms (Discord, Twitch, YouTube, TikTok, etc.) or when you authenticate with PRISMAI</li>
              <li>Payment and transaction information when you make purchases or donations through third-party services (Fourthwall, Ko-fi, Patreon, PayPal)</li>
              <li>User-generated content, including chat messages, community posts, and application submissions</li>
              <li>Any other information you choose to provide to us</li>
            </ul>
            <h3 className="mb-2 mt-6 font-semibold text-dim">2.2 Information Collected Automatically</h3>
            <p>When you access our Services, including through PRISMAI, we may automatically collect certain information, including:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Device information (browser type, operating system, device identifiers)</li>
              <li>Log data (IP address, access times, pages viewed, referring URLs)</li>
              <li>Usage data (interactions with our website, features used, content viewed)</li>
              <li>Location data (general geographic location derived from IP address)</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">3. Cookies and Tracking Technologies</h2>
            <p>We and our third-party service providers may use cookies, web beacons, pixels, and similar tracking technologies to collect information about your interactions with our Services.</p>
            <h3 className="mb-2 mt-4 font-semibold text-dim">Types of Cookies We Use</h3>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li><span className="font-medium text-foreground">Essential Cookies:</span> Required for the operation of our website and cannot be disabled</li>
              <li><span className="font-medium text-foreground">Analytics Cookies:</span> Help us understand how visitors interact with our website by collecting information anonymously</li>
              <li><span className="font-medium text-foreground">Functionality Cookies:</span> Enable enhanced functionality and personalization</li>
              <li><span className="font-medium text-foreground">Third-Party Cookies:</span> Set by third-party services embedded in our website (e.g., Twitch player, YouTube embeds, analytics providers)</li>
            </ul>
            <p className="mt-3">You can manage your cookie preferences through your browser settings. Please note that disabling certain cookies may affect the functionality of our Services.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">4. How We Use Your Information</h2>
            <p>We may use the information we collect, including information collected through PRISMAI, for the following purposes:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>To provide, maintain, and improve our Services, including the PRISMAI application</li>
              <li>To process transactions and send related information</li>
              <li>To send you updates, notifications, and communications related to our Services</li>
              <li>To respond to your inquiries, comments, or requests</li>
              <li>To monitor and analyze usage trends and preferences</li>
              <li>To detect, prevent, and address technical issues, fraud, or security concerns</li>
              <li>To enforce our Terms of Service and other policies</li>
              <li>To comply with legal obligations</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">5. How We Share Your Information</h2>
            <p>We do not sell your personal information. We may share your information in the following circumstances:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li><span className="font-medium text-foreground">Service Providers:</span> We may share information with third-party vendors who perform services on our behalf</li>
              <li><span className="font-medium text-foreground">Legal Requirements:</span> We may disclose information if required to do so by law or in response to valid requests by public authorities</li>
              <li><span className="font-medium text-foreground">Business Transfers:</span> In connection with any merger, sale of company assets, financing, or acquisition</li>
              <li><span className="font-medium text-foreground">With Your Consent:</span> We may share information with your consent or at your direction</li>
            </ul>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">6. Third-Party Services</h2>
            <p>Our Services integrate with and link to third-party platforms and services, including but not limited to:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li>Streaming platforms (Twitch, YouTube, Kick, Trovo, Facebook Gaming)</li>
              <li>Community platforms (Discord)</li>
              <li>Commerce platforms (Fourthwall)</li>
              <li>Support platforms (Ko-fi, Patreon, PayPal)</li>
              <li>Social media platforms (TikTok, Instagram, X) -- including via PRISMAI</li>
            </ul>
            <p className="mt-3">These third-party services have their own privacy policies and data collection practices. We encourage you to review the privacy policies of any third-party services you interact with through our Services.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">7. Data Retention</h2>
            <p>We retain your information only for as long as necessary to fulfill the purposes for which it was collected, including to satisfy any legal, accounting, or reporting requirements.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">8. Data Security</h2>
            <p>We implement appropriate technical and organizational security measures designed to protect the security of your personal information. However, no method of transmission over the Internet or electronic storage is completely secure.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">9. Your Rights and Choices</h2>
            <p>Depending on your location and applicable law, you may have the following rights regarding your personal information:</p>
            <ul className="mt-3 list-inside list-disc space-y-2">
              <li><span className="font-medium text-foreground">Access:</span> The right to request access to the personal information we hold about you</li>
              <li><span className="font-medium text-foreground">Correction:</span> The right to request correction of inaccurate or incomplete personal information</li>
              <li><span className="font-medium text-foreground">Deletion:</span> The right to request deletion of your personal information, subject to certain exceptions</li>
              <li><span className="font-medium text-foreground">Opt-Out:</span> The right to opt out of certain data processing activities</li>
              <li><span className="font-medium text-foreground">Portability:</span> The right to receive your personal information in a structured, commonly used, and machine-readable format</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us at{" "}
              <a href="mailto:business@prozilli.com" className="text-gold transition-colors hover:text-foreground">business@prozilli.com</a>.
            </p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">10. Children&apos;s Privacy</h2>
            <p>Our Services are not directed to individuals under the age of 13. We do not knowingly collect personal information from children under 13. If we become aware that we have collected personal information from a child under 13, we will take steps to delete such information promptly.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">11. International Users</h2>
            <p>Our Services are operated in the United States. If you are accessing our Services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">12. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time. If we make material changes, we will notify you by posting the updated Privacy Policy on our website and updating the &quot;Last updated&quot; date.</p>
          </div>

          <div>
            <h2 className="mb-4 text-lg font-bold text-foreground">13. Contact Information</h2>
            <p>If you have any questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us at:</p>
            <div className="panel mt-4 p-6">
              <p className="font-medium text-foreground">Prozilli Inc.</p>
              <p className="mt-1">
                Email:{" "}
                <a href="mailto:business@prozilli.com" className="text-gold transition-colors hover:text-foreground">business@prozilli.com</a>
              </p>
              <p className="mt-1">
                Web:{" "}
                <Link href="/contact" className="text-gold transition-colors hover:text-foreground">prozilligaming.com/contact</Link>
              </p>
            </div>
            <p className="mt-6 text-xs text-dim">Prozilli Gaming is a division of Prozilli Entertainment, operated under Prozilli Inc.</p>
          </div>
        </div>
      </section>
    </>
  );
}
