import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "DMCA Policy",
  description:
    "DMCA Policy for Prozilli Gaming (prozilligaming.com). Learn about our copyright infringement procedures, takedown requests, counter-notifications, and repeat infringer policy under 17 U.S.C. Section 512.",
};

export default function DMCAPolicyPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="legal-content">
          <p className="text-label text-dim mb-2">Last Updated: February 13, 2026</p>
          <h1 className="text-headline mb-2">DMCA Policy</h1>
          <p className="text-body-lg mb-8">
            Prozilli Entertainment (&ldquo;Prozilli,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) respects the intellectual property rights of others and expects our users to do the same. In accordance with the Digital Millennium Copyright Act of 1998 (&ldquo;DMCA&rdquo;), codified at 17 U.S.C. &sect; 512, we have implemented procedures for receiving and responding to notifications of claimed copyright infringement. This policy applies to all content hosted on or transmitted through our Services, including our websites (prozilligaming.com and prozilli.com), Discord servers, FiveM game server, and any other platforms operated by Prozilli Entertainment.
          </p>

          {/* TABLE OF CONTENTS */}
          <div className="glass legal-toc" id="toc">
            <h2 style={{ marginTop: 0, borderBottom: "none", paddingBottom: 0, fontSize: "1.125rem" }}>Table of Contents</h2>
            <ol>
              <li><a href="#infringement-notification">1. Copyright Infringement Notification (Takedown Request)</a></li>
              <li><a href="#elements-required">2. Required Elements of a DMCA Notice</a></li>
              <li><a href="#processing-notices">3. How We Process DMCA Notices</a></li>
              <li><a href="#counter-notification">4. Counter-Notification Procedure</a></li>
              <li><a href="#elements-counter">5. Required Elements of a Counter-Notification</a></li>
              <li><a href="#processing-counter">6. How We Process Counter-Notifications</a></li>
              <li><a href="#repeat-infringer">7. Repeat Infringer Policy</a></li>
              <li><a href="#good-faith">8. Good Faith and Misrepresentation</a></li>
              <li><a href="#third-party-platforms">9. Content on Third-Party Platforms</a></li>
              <li><a href="#user-generated-content-dmca">10. User-Generated Content</a></li>
              <li><a href="#streaming-content">11. Streaming Content Considerations</a></li>
              <li><a href="#fivem-content">12. FiveM Server Content</a></li>
              <li><a href="#ai-generated-content">13. AI-Generated Content</a></li>
              <li><a href="#safe-harbor">14. Safe Harbor</a></li>
              <li><a href="#designated-agent">15. Designated Agent Information</a></li>
              <li><a href="#dmca-modifications">16. Modifications to This Policy</a></li>
              <li><a href="#dmca-contact">17. Contact Information</a></li>
            </ol>
          </div>

          {/* SECTION 1 */}
          <section id="infringement-notification">
            <h2>1. Copyright Infringement Notification (Takedown Request)</h2>
            <p>If you are a copyright owner (or are authorized to act on behalf of a copyright owner) and believe that content available on or through our Services infringes your copyrighted work, you may submit a DMCA takedown notification to our Designated Agent. Your notification must comply with the requirements set forth in 17 U.S.C. &sect; 512(c)(3) as detailed in Section 2 below.</p>
            <p>Please note that under 17 U.S.C. &sect; 512(f), any person who knowingly materially misrepresents that material or activity is infringing may be subject to liability for damages, including costs and attorneys&rsquo; fees incurred by the alleged infringer or by the service provider.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 2 */}
          <section id="elements-required">
            <h2>2. Required Elements of a DMCA Notice</h2>
            <p>To be effective, a DMCA takedown notification must be a written communication provided to our Designated Agent that includes substantially the following (pursuant to 17 U.S.C. &sect; 512(c)(3)):</p>
            <ol>
              <li><strong>Identification of the copyrighted work:</strong> Identification of the copyrighted work claimed to have been infringed, or, if multiple copyrighted works at a single online site are covered by a single notification, a representative list of such works at that site.</li>
              <li><strong>Identification of the infringing material:</strong> Identification of the material that is claimed to be infringing or to be the subject of infringing activity and that is to be removed or access to which is to be disabled, and information reasonably sufficient to permit us to locate the material. <strong>Please provide specific URLs, screenshots, or other identifying information.</strong></li>
              <li><strong>Contact information:</strong> Information reasonably sufficient to permit us to contact you, including your name, mailing address, telephone number, and email address.</li>
              <li><strong>Good faith statement:</strong> A statement that you have a good faith belief that use of the material in the manner complained of is not authorized by the copyright owner, its agent, or the law.</li>
              <li><strong>Accuracy statement:</strong> A statement that the information in the notification is accurate, and, under penalty of perjury, that you are authorized to act on behalf of the owner of an exclusive right that is allegedly infringed.</li>
              <li><strong>Signature:</strong> A physical or electronic signature of the copyright owner or a person authorized to act on behalf of the owner.</li>
            </ol>

            <h3>2.1 Incomplete Notices</h3>
            <p>If your DMCA notice does not substantially comply with the requirements above, we may not be able to act on your notice. We may attempt to contact you for additional information, but we are under no obligation to do so. Failure to provide complete information may result in your notice being deemed deficient and not acted upon.</p>

            <h3>2.2 Submitting a DMCA Notice</h3>
            <p>DMCA takedown notices should be sent to our Designated Agent by email at:</p>
            <p><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a><br />
            <strong>Subject Line:</strong> DMCA Takedown Notice</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 3 */}
          <section id="processing-notices">
            <h2>3. How We Process DMCA Notices</h2>
            <p>Upon receipt of a valid DMCA takedown notification that complies with the requirements above, we will take the following steps:</p>
            <ol>
              <li><strong>Review:</strong> We will review the notification for completeness and compliance with 17 U.S.C. &sect; 512(c)(3).</li>
              <li><strong>Expeditious Removal:</strong> If the notification is complete and valid, we will expeditiously remove or disable access to the allegedly infringing material.</li>
              <li><strong>Notification to User:</strong> We will make reasonable efforts to notify the user who posted or uploaded the allegedly infringing material that the content has been removed or disabled, and provide them with a copy of the takedown notice (with your personal contact information redacted if you request).</li>
              <li><strong>Counter-Notification Window:</strong> The affected user may submit a counter-notification as described in Section 4.</li>
              <li><strong>Record Keeping:</strong> We will maintain a record of all DMCA notices received and actions taken in response.</li>
            </ol>

            <h3>3.1 Timeline</h3>
            <p>We aim to process valid DMCA notices within 1-3 business days of receipt. Complex cases involving large amounts of content, ambiguous claims, or fair use considerations may require additional time.</p>

            <h3>3.2 Preservation</h3>
            <p>Upon receipt of a valid DMCA notice, we may preserve a copy of the removed material for our records, for the purpose of responding to potential counter-notifications and legal proceedings.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 4 */}
          <section id="counter-notification">
            <h2>4. Counter-Notification Procedure</h2>
            <p>If you believe that material you posted was removed or disabled as a result of a mistake or misidentification, you may submit a counter-notification to our Designated Agent pursuant to 17 U.S.C. &sect; 512(g). Please be aware that filing a counter-notification is a legal act with serious consequences.</p>

            <h3>4.1 When to File a Counter-Notification</h3>
            <p>You should file a counter-notification only if you have a good faith belief that the material was removed or disabled as a result of:</p>
            <ul>
              <li>A mistake in identifying the material (e.g., the wrong URL was targeted).</li>
              <li>A misidentification of the material as infringing (e.g., the material is original, licensed, in the public domain, or constitutes fair use).</li>
            </ul>

            <h3>4.2 Consequences of Filing</h3>
            <p>By filing a counter-notification, you consent to the jurisdiction of the federal district court for the judicial district in which your address is located (or, if outside the United States, any judicial district in which Prozilli Entertainment may be found). You also agree to accept service of process from the person who filed the original DMCA notice or their agent. Be aware that the copyright owner may file a lawsuit against you after receiving your counter-notification.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 5 */}
          <section id="elements-counter">
            <h2>5. Required Elements of a Counter-Notification</h2>
            <p>A counter-notification must be a written communication provided to our Designated Agent that includes substantially the following (pursuant to 17 U.S.C. &sect; 512(g)(3)):</p>
            <ol>
              <li><strong>Identification of removed material:</strong> Identification of the material that has been removed or to which access has been disabled, and the location at which the material appeared before it was removed or disabled.</li>
              <li><strong>Statement under penalty of perjury:</strong> A statement under penalty of perjury that you have a good faith belief that the material was removed or disabled as a result of mistake or misidentification of the material to be removed or disabled.</li>
              <li><strong>Contact information:</strong> Your name, address, telephone number, and email address.</li>
              <li><strong>Consent to jurisdiction:</strong> A statement that you consent to the jurisdiction of the Federal District Court for the judicial district in which your address is located (or, if your address is outside the United States, for any judicial district in which Prozilli Entertainment may be found), and that you will accept service of process from the person who provided the original notification of alleged infringement, or an agent of such person.</li>
              <li><strong>Signature:</strong> Your physical or electronic signature.</li>
            </ol>

            <h3>5.1 Submitting a Counter-Notification</h3>
            <p>Counter-notifications should be sent to our Designated Agent by email at:</p>
            <p><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a><br />
            <strong>Subject Line:</strong> DMCA Counter-Notification</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 6 */}
          <section id="processing-counter">
            <h2>6. How We Process Counter-Notifications</h2>
            <p>Upon receipt of a valid counter-notification, we will:</p>
            <ol>
              <li><strong>Review:</strong> Review the counter-notification for completeness and compliance with 17 U.S.C. &sect; 512(g)(3).</li>
              <li><strong>Forward to Complainant:</strong> Promptly provide a copy of the counter-notification to the party who filed the original DMCA notice.</li>
              <li><strong>Inform of Timeline:</strong> Inform the original complainant that the removed material will be restored within 10-14 business days unless the complainant files a court action.</li>
              <li><strong>Restore Material:</strong> If the original complainant does not notify us within 10-14 business days that they have filed a court action seeking a restraining order against the person who submitted the counter-notification, we will restore the removed material or re-enable access to it.</li>
            </ol>

            <h3>6.1 Expedited Restoration</h3>
            <p>In cases where it is clear that the original takedown notice was filed in error (e.g., wrong URL, obvious fair use), we may restore the material sooner than the 10-14 business day window, at our discretion.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 7 */}
          <section id="repeat-infringer">
            <h2>7. Repeat Infringer Policy</h2>
            <p>In accordance with 17 U.S.C. &sect; 512(i), Prozilli Entertainment has adopted and reasonably implements a policy for the termination, in appropriate circumstances, of users who are repeat infringers.</p>

            <h3>7.1 Definition</h3>
            <p>A &ldquo;repeat infringer&rdquo; is any user against whom we have received two or more valid DMCA takedown notifications for separate instances of copyright infringement, and who has not successfully challenged those notifications through the counter-notification process.</p>

            <h3>7.2 Strike System</h3>
            <p>We implement a three-strike system for copyright infringement:</p>
            <ul>
              <li><strong>First Strike:</strong> Warning notification. The infringing material is removed. The user is informed of our DMCA policy and warned that further infractions may result in account termination.</li>
              <li><strong>Second Strike:</strong> Formal warning. The infringing material is removed. The user receives a formal written notice that one additional infraction will result in account termination.</li>
              <li><strong>Third Strike:</strong> Account termination. The user&rsquo;s account and access to all Services are permanently terminated. This includes website accounts, FiveM server access, Discord membership, and all other Services.</li>
            </ul>

            <h3>7.3 Severe Cases</h3>
            <p>In cases of egregious, willful, or large-scale copyright infringement, we reserve the right to immediately terminate a user&rsquo;s account without following the three-strike process described above.</p>

            <h3>7.4 Strike Expiration</h3>
            <p>Strikes expire 12 months after the date of the strike. A strike that has been successfully challenged through the counter-notification process is removed from the user&rsquo;s record.</p>

            <h3>7.5 Appeals</h3>
            <p>Users may appeal strike decisions by contacting us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> with evidence supporting their position. Appeals will be reviewed within 14 business days.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 8 */}
          <section id="good-faith">
            <h2>8. Good Faith and Misrepresentation</h2>

            <h3>8.1 Good Faith Requirement</h3>
            <p>Both DMCA takedown notices and counter-notifications must be submitted in good faith. We expect all parties to honestly and accurately represent their claims.</p>

            <h3>8.2 Misrepresentation Liability</h3>
            <p><strong>Under 17 U.S.C. &sect; 512(f), any person who knowingly materially misrepresents:</strong></p>
            <ul>
              <li>That material or activity is infringing (in a takedown notice), or</li>
              <li>That material or activity was removed or disabled by mistake or misidentification (in a counter-notification),</li>
            </ul>
            <p><strong>may be liable for damages, including costs and attorneys&rsquo; fees, incurred by the alleged infringer, the copyright owner, or the service provider who is injured by such misrepresentation.</strong></p>

            <h3>8.3 Fair Use Consideration</h3>
            <p>Before submitting a DMCA takedown notice, copyright owners should consider whether the use of the material may constitute fair use under 17 U.S.C. &sect; 107. The four factors of fair use analysis are:</p>
            <ol>
              <li>The purpose and character of the use, including whether it is commercial or nonprofit educational.</li>
              <li>The nature of the copyrighted work.</li>
              <li>The amount and substantiality of the portion used in relation to the copyrighted work as a whole.</li>
              <li>The effect of the use upon the potential market for or value of the copyrighted work.</li>
            </ol>
            <p>Copyright owners who fail to consider fair use before filing a DMCA notice may be liable for misrepresentation under &sect; 512(f), as established in <em>Lenz v. Universal Music Corp.</em>, 815 F.3d 1145 (9th Cir. 2016).</p>

            <h3>8.4 Abuse of Process</h3>
            <p>We take abuse of the DMCA process seriously. Users who submit fraudulent takedown notices to harass other users, suppress legitimate speech, or gain competitive advantages may have their accounts terminated and may face legal action.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 9 */}
          <section id="third-party-platforms">
            <h2>9. Content on Third-Party Platforms</h2>
            <p>Prozilli Entertainment operates across multiple third-party platforms. The DMCA procedures in this policy apply only to content hosted on our own Services (our websites, our Discord servers, our FiveM server). For content hosted on third-party platforms, the following applies:</p>

            <h3>9.1 Twitch, YouTube, Kick, TikTok, X/Twitter, Instagram, Facebook, Trovo</h3>
            <p>If you believe that content on our profiles on these platforms infringes your copyright, you should use the respective platform&rsquo;s DMCA/copyright reporting mechanism. Each platform has its own procedures for handling copyright claims. We will cooperate with platform-level DMCA procedures as required.</p>

            <h3>9.2 Discord</h3>
            <p>For content posted in our Discord servers (ZO Syndicate, Prozilli community), you may submit a DMCA notice to us using the procedures described in this policy, or you may use Discord&rsquo;s own Trust &amp; Safety reporting mechanisms.</p>

            <h3>9.3 Our Responsibility</h3>
            <p>We cannot remove content that is hosted on platforms we do not control. If infringing content appears on a third-party platform, we recommend contacting that platform directly. However, if we are made aware of an infringement claim involving our content on a third-party platform, we will take reasonable steps to address it.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 10 */}
          <section id="user-generated-content-dmca">
            <h2>10. User-Generated Content</h2>
            <p>Our Services allow users to submit content, including chat messages, Discord messages, forum posts, and other materials. We are not the author of user-generated content and act as a service provider under the DMCA.</p>

            <h3>10.1 User Responsibility</h3>
            <p>Users are solely responsible for ensuring that their content does not infringe the intellectual property rights of others. By submitting content, users represent and warrant that they have all necessary rights and permissions.</p>

            <h3>10.2 Our Role</h3>
            <p>As a service provider, we do not pre-screen user-generated content for copyright compliance. We respond to valid DMCA notices by removing or disabling access to identified content. We are not liable for user-generated content that infringes third-party copyrights.</p>

            <h3>10.3 Proactive Measures</h3>
            <p>While we are not required to proactively monitor for copyright infringement, we may implement reasonable measures to detect and prevent obvious instances of infringement, such as automated content filters in Discord and chat moderation systems.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 11 */}
          <section id="streaming-content">
            <h2>11. Streaming Content Considerations</h2>

            <h3>11.1 Live Streaming</h3>
            <p>Our live streams are broadcast simultaneously across multiple platforms. Music, game content, and other copyrighted materials used during live streams are subject to the terms and copyright policies of each respective streaming platform. We make reasonable efforts to use licensed music, royalty-free content, and content within fair use guidelines.</p>

            <h3>11.2 VODs and Clips</h3>
            <p>Video on demand (VOD) recordings and clips from our streams may contain copyrighted material. Platforms may apply automated content identification systems (such as Twitch&rsquo;s Audible Magic or YouTube&rsquo;s Content ID) to these recordings. We comply with platform-level content identification requirements.</p>

            <h3>11.3 Stream Viewers</h3>
            <p>If you believe that content in one of our live streams or VODs infringes your copyright, please contact us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> or use the reporting tools provided by the respective streaming platform.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 12 */}
          <section id="fivem-content">
            <h2>12. FiveM Server Content</h2>

            <h3>12.1 Custom Resources</h3>
            <p>The ZO Syndicate RP FiveM server uses custom-built resources (coded by or for Prozilli Entertainment), open-source community resources (used in accordance with their respective licenses), and modified versions of publicly available resources. All custom zo_* resources are the intellectual property of Prozilli Entertainment.</p>

            <h3>12.2 Player-Created Content</h3>
            <p>Players may create roleplay content (characters, stories, scenarios) within our FiveM server. While players retain conceptual ownership of their character ideas, all content created within our server environment is subject to the license grant in our <a href="/terms">Terms of Service</a> (Section 8).</p>

            <h3>12.3 Third-Party Assets</h3>
            <p>Our FiveM server may use third-party assets including vehicle models, MLOs (Map Loader Objects), clothing models, and other assets. We make reasonable efforts to use assets that are either created by us, licensed for our use, or freely available to the FiveM community. If you believe any asset used on our server infringes your copyright, please contact us.</p>

            <h3>12.4 Mod Menu / Cheat Injections</h3>
            <p>The use of mod menus, cheat injectors, or other unauthorized modifications on our FiveM server is prohibited under our <a href="/terms">Terms of Service</a>. Such tools may themselves infringe copyrights. We do not authorize or support the use of any unauthorized modifications.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 13 */}
          <section id="ai-generated-content">
            <h2>13. AI-Generated Content</h2>

            <h3>13.1 LISA and NPC Content</h3>
            <p>LISA and our NPC bots generate content using AI models (Groq, OpenAI). The copyright status of AI-generated content is an evolving area of law. We make no claims of copyright ownership over purely AI-generated text responses. However, the LISA character, personality, system prompts, and creative direction are the intellectual property of Prozilli Entertainment.</p>

            <h3>13.2 AI-Generated Images and Videos</h3>
            <p>We use AI tools (DALL-E 3, Leonardo AI) to generate images and videos for our auto-post content and visual assets. These generated assets are used in accordance with the respective AI providers&rsquo; terms of service and usage policies.</p>

            <h3>13.3 Copyright Claims Involving AI Content</h3>
            <p>If you believe that AI-generated content on our Services infringes your copyright (for example, if an AI model generates content substantially similar to your copyrighted work), you may submit a DMCA notice following the procedures in this policy. We will evaluate such claims on a case-by-case basis.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 14 */}
          <section id="safe-harbor">
            <h2>14. Safe Harbor</h2>
            <p>Prozilli Entertainment claims the benefit of the safe harbor provisions of 17 U.S.C. &sect; 512. We:</p>
            <ul>
              <li>Have designated an agent to receive DMCA notifications (see Section 15).</li>
              <li>Have adopted and reasonably implement a repeat infringer policy (see Section 7).</li>
              <li>Do not interfere with standard technical measures used by copyright owners to identify or protect copyrighted works.</li>
              <li>Expeditiously remove or disable access to infringing material upon receipt of valid DMCA notifications.</li>
              <li>Do not have actual knowledge that material on our Services is infringing, and when we become aware of infringing material, we act expeditiously to remove it.</li>
              <li>Do not receive a financial benefit directly attributable to infringing activity that we have the right and ability to control.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 15 */}
          <section id="designated-agent">
            <h2>15. Designated Agent Information</h2>
            <p>Our Designated Agent for receiving DMCA takedown notifications, as required by 17 U.S.C. &sect; 512(c)(2), is:</p>
            <ul>
              <li><strong>Name:</strong> Widler Sanon</li>
              <li><strong>Title:</strong> Owner / DMCA Designated Agent</li>
              <li><strong>Entity:</strong> Prozilli Entertainment</li>
              <li><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
            </ul>
            <p>Our Designated Agent information is also registered with the U.S. Copyright Office as required by the DMCA.</p>
            <p><strong>Note:</strong> Communications other than DMCA notices sent to the Designated Agent email may not receive a response. For general inquiries, please use our standard contact channels.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 16 */}
          <section id="dmca-modifications">
            <h2>16. Modifications to This Policy</h2>
            <p>We may update this DMCA Policy from time to time. Changes will be posted on this page with an updated &ldquo;Last Updated&rdquo; date. Material changes affecting how we process DMCA notices will be announced through our website. Your continued use of our Services after any changes constitutes acceptance of the updated policy.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 17 */}
          <section id="dmca-contact">
            <h2>17. Contact Information</h2>
            <p>For DMCA-related matters:</p>
            <ul>
              <li><strong>DMCA Notices and Counter-Notifications:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
              <li><strong>General Legal Inquiries:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
              <li><strong>Entity:</strong> Prozilli Entertainment (Widler Sanon, Sole Proprietor)</li>
              <li><strong>Websites:</strong> <a href="https://prozilligaming.com" target="_blank" rel="noopener noreferrer">prozilligaming.com</a> | <a href="https://prozilli.com" target="_blank" rel="noopener noreferrer">prozilli.com</a></li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          <div className="divider-red my-12" />
          <p className="text-sm text-dim text-center">
            Effective Date: February 13, 2026 &middot; Prozilli Entertainment &middot; All Rights Reserved
          </p>
        </div>
      </div>
    </section>
  );
}
