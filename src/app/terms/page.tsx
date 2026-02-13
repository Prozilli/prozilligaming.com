import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service",
  description:
    "Terms of Service for Prozilli Gaming (prozilligaming.com). These terms govern your use of all Prozilli Entertainment services including streaming, AI chatbot, FiveM server, merch shop, and community platforms.",
};

export default function TermsOfServicePage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="legal-content">
          <p className="text-label text-dim mb-2">Last Updated: February 13, 2026</p>
          <h1 className="text-headline mb-2">Terms of Service</h1>
          <p className="text-body-lg mb-8">
            Welcome to Prozilli Gaming. These Terms of Service (&ldquo;Terms&rdquo;) constitute a legally binding agreement between you (&ldquo;you,&rdquo; &ldquo;your,&rdquo; or &ldquo;User&rdquo;) and Prozilli Entertainment (&ldquo;Prozilli,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;), operated by Widler Sanon as a sole proprietorship. These Terms govern your access to and use of our websites (prozilligaming.com and prozilli.com), streaming services, AI chatbot (LISA), FiveM roleplay server (ZO Syndicate RP), merchandise store, community platforms, and all related services (collectively, the &ldquo;Services&rdquo;). By accessing or using any of our Services, you agree to be bound by these Terms. If you do not agree to these Terms, do not use our Services.
          </p>

          {/* TABLE OF CONTENTS */}
          <div className="glass legal-toc" id="toc">
            <h2 style={{ marginTop: 0, borderBottom: "none", paddingBottom: 0, fontSize: "1.125rem" }}>Table of Contents</h2>
            <ol>
              <li><a href="#acceptance">1. Acceptance of Terms</a></li>
              <li><a href="#eligibility">2. Eligibility</a></li>
              <li><a href="#accounts">3. Account Registration and Security</a></li>
              <li><a href="#platform-linking">4. Platform Account Linking</a></li>
              <li><a href="#service-description">5. Description of Services</a></li>
              <li><a href="#lisa-ai">6. LISA AI and Artificial Intelligence Terms</a></li>
              <li><a href="#fivem-server">7. FiveM Server (ZO Syndicate RP)</a></li>
              <li><a href="#user-content">8. User Content</a></li>
              <li><a href="#intellectual-property">9. Intellectual Property</a></li>
              <li><a href="#prohibited-conduct">10. Prohibited Conduct</a></li>
              <li><a href="#purchases">11. Purchases and Payments</a></li>
              <li><a href="#virtual-items">12. Virtual Items and Currency</a></li>
              <li><a href="#giveaways">13. Giveaways</a></li>
              <li><a href="#third-party">14. Third-Party Links and Services</a></li>
              <li><a href="#disclaimers">15. Disclaimers</a></li>
              <li><a href="#limitation">16. Limitation of Liability</a></li>
              <li><a href="#indemnification">17. Indemnification</a></li>
              <li><a href="#dispute-resolution">18. Dispute Resolution</a></li>
              <li><a href="#governing-law">19. Governing Law</a></li>
              <li><a href="#termination">20. Termination</a></li>
              <li><a href="#modifications">21. Modifications to Terms</a></li>
              <li><a href="#severability">22. Severability</a></li>
              <li><a href="#entire-agreement">23. Entire Agreement</a></li>
              <li><a href="#waiver">24. Waiver</a></li>
              <li><a href="#assignment">25. Assignment</a></li>
              <li><a href="#force-majeure">26. Force Majeure</a></li>
              <li><a href="#terms-contact">27. Contact Information</a></li>
            </ol>
          </div>

          {/* SECTION 1 */}
          <section id="acceptance">
            <h2>1. Acceptance of Terms</h2>
            <p>By accessing, browsing, or using any of our Services, you acknowledge that you have read, understood, and agree to be bound by these Terms, our <a href="/privacy">Privacy Policy</a>, our <a href="/acceptable-use">Acceptable Use Policy</a>, our <a href="/cookies">Cookie Policy</a>, our <a href="/dmca">DMCA Policy</a>, and our <a href="/refund">Refund Policy</a> (collectively, the &ldquo;Agreements&rdquo;). All such Agreements are incorporated herein by reference.</p>
            <p>If you are using our Services on behalf of an organization, you represent and warrant that you have the authority to bind that organization to these Terms, and &ldquo;you&rdquo; and &ldquo;your&rdquo; will refer to that organization.</p>
            <p>We reserve the right to update or modify these Terms at any time. Material changes will be communicated as described in Section 21. Your continued use of the Services after any such changes constitutes your acceptance of the new Terms.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 2 */}
          <section id="eligibility">
            <h2>2. Eligibility</h2>

            <h3>2.1 Minimum Age</h3>
            <p>You must be at least <strong>13 years of age</strong> to access or use our Services. By using our Services, you represent and warrant that you are at least 13 years old. If you are under 13, you are prohibited from using any part of our Services.</p>

            <h3>2.2 Age-Restricted Features</h3>
            <ul>
              <li><strong>FiveM Server (18+):</strong> The ZO Syndicate RP FiveM server is intended for users aged 18 and older due to mature content including simulated violence, criminal roleplay, and adult themes. By connecting to our FiveM server, you represent and warrant that you are at least 18 years old.</li>
              <li><strong>Purchases (18+ or parental consent):</strong> Users under 18 must have verifiable parental or guardian consent before making any purchases through our Services, including merchandise, VIP subscriptions, tips, or donations.</li>
              <li><strong>Account Linking (13+):</strong> You must be at least 13 to connect third-party platform accounts via OAuth.</li>
            </ul>

            <h3>2.3 Legal Capacity</h3>
            <p>You represent and warrant that you have the legal capacity to enter into these Terms in your jurisdiction. If you are between 13 and 18 (or the age of majority in your jurisdiction), you represent that your parent or legal guardian has reviewed and agreed to these Terms on your behalf.</p>

            <h3>2.4 Restrictions</h3>
            <p>You may not use our Services if:</p>
            <ul>
              <li>You have been previously banned or removed from our Services.</li>
              <li>You are prohibited from receiving our Services under the laws of your jurisdiction.</li>
              <li>You are located in a country subject to a U.S. government embargo or designated as a &ldquo;terrorist supporting&rdquo; country.</li>
              <li>You are listed on any U.S. government list of prohibited or restricted parties.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 3 */}
          <section id="accounts">
            <h2>3. Account Registration and Security</h2>

            <h3>3.1 Account Creation</h3>
            <p>Certain features of our Services may require you to create an account or connect a third-party platform account. When you create an account, you agree to provide accurate, current, and complete information and to update such information to keep it accurate, current, and complete.</p>

            <h3>3.2 Account Security</h3>
            <p>You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account. You agree to:</p>
            <ul>
              <li>Use a strong, unique password for your account.</li>
              <li>Not share your account credentials with any third party.</li>
              <li>Immediately notify us of any unauthorized use of your account or any other breach of security.</li>
              <li>Ensure that you log out of your account at the end of each session, particularly on shared devices.</li>
            </ul>

            <h3>3.3 Account Responsibility</h3>
            <p>You are solely responsible for all activity on your account, regardless of whether such activity was authorized by you. We will not be liable for any loss or damage arising from your failure to secure your account. If you believe your account has been compromised, contact us immediately at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>.</p>

            <h3>3.4 One Account Per Person</h3>
            <p>Each person may maintain only one account. Creating multiple accounts to circumvent bans, manipulate giveaways, abuse promotions, or for any other purpose is prohibited and may result in termination of all associated accounts.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 4 */}
          <section id="platform-linking">
            <h2>4. Platform Account Linking</h2>

            <h3>4.1 OAuth Authorization</h3>
            <p>Our Services allow you to connect third-party platform accounts (Twitch, YouTube, Kick, Discord, TikTok, X/Twitter, Instagram, Facebook, Trovo) via OAuth. By linking your accounts, you authorize us to access and use data from those platforms in accordance with our <a href="/privacy">Privacy Policy</a> and the permissions you grant during the OAuth flow.</p>

            <h3>4.2 Token Storage</h3>
            <p>When you link a platform account, we store encrypted OAuth tokens (access tokens and refresh tokens) that allow us to interact with the platform on your behalf. These tokens are encrypted at rest using AES-256-GCM encryption. See our <a href="/privacy">Privacy Policy</a> for complete details.</p>

            <h3>4.3 Automatic Token Refresh</h3>
            <p>Our systems automatically refresh your OAuth tokens before they expire to maintain uninterrupted service. This is a standard practice and does not require additional authorization from you.</p>

            <h3>4.4 Revoking Access</h3>
            <p>You may revoke our access to any linked platform at any time by disconnecting the account through the platform&rsquo;s settings or by contacting us. Revoking access may affect your ability to use certain features of our Services that depend on the linked platform.</p>

            <h3>4.5 Platform Terms</h3>
            <p>Your use of third-party platforms is governed by those platforms&rsquo; own terms of service and privacy policies. We are not responsible for the policies or practices of third-party platforms. You are responsible for ensuring that your use of linked platforms complies with their respective terms.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 5 */}
          <section id="service-description">
            <h2>5. Description of Services</h2>
            <p>Prozilli Entertainment provides the following Services, which are subject to these Terms:</p>

            <h3>5.1 Multi-Platform Streaming</h3>
            <p>We broadcast live streaming content simultaneously across multiple platforms including Twitch, YouTube, Kick, TikTok, X/Twitter, Instagram, Facebook, Trovo, and Discord. Our /watch page aggregates these streams into a unified viewing experience.</p>

            <h3>5.2 LISA AI Chatbot</h3>
            <p>LISA (Live Interactive System Administrator) is our AI-powered chatbot and co-host that operates across all connected platforms. LISA provides entertainment, engages with viewers, and maintains relationship memory with individual users. See Section 6 for complete AI terms.</p>

            <h3>5.3 ZO Syndicate RP (FiveM Server)</h3>
            <p>A custom FiveM roleplay server with 51 custom resources, 10 gangs, 5 law enforcement departments, a full economy system, AI NPCs, and extensive gameplay mechanics. See Section 7 for complete FiveM terms.</p>

            <h3>5.4 Merchandise Store</h3>
            <p>Official Prozilli Gaming merchandise available through our Fourthwall-powered shop at /shop. See Section 11 for purchase terms and our <a href="/refund">Refund Policy</a> for return information.</p>

            <h3>5.5 Community Platforms</h3>
            <p>We operate Discord community servers (ZO Syndicate, Prozilli community) for community interaction, support, and engagement. Use of our Discord servers is subject to both these Terms and Discord&rsquo;s Terms of Service.</p>

            <h3>5.6 PRISMAI Backend</h3>
            <p>PRISMAI is our proprietary backend system that powers the entire ecosystem, including platform connectivity, token management, webhook processing, AI operations, and content automation. PRISMAI operates in the background and users do not directly interact with it.</p>

            <h3>5.7 Service Availability</h3>
            <p>We strive to keep our Services available at all times, but we do not guarantee uninterrupted, error-free, or secure operation. Services may be temporarily unavailable due to maintenance, updates, server issues, third-party service outages, or circumstances beyond our control. We will make reasonable efforts to provide advance notice of planned maintenance.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 6 */}
          <section id="lisa-ai">
            <h2>6. LISA AI and Artificial Intelligence Terms</h2>

            <h3>6.1 Nature of AI</h3>
            <p>LISA and all other AI characters in our ecosystem (Vania, Benny, Dolores, Snake, Tony) are artificial intelligence systems. They are not human. Their responses are generated by machine learning models. They do not have consciousness, emotions, or personal experiences, despite their programmed personalities suggesting otherwise.</p>

            <h3>6.2 AI-Generated Content</h3>
            <p>All content generated by LISA and other AI characters is provided for <strong>entertainment purposes only</strong>. You acknowledge and agree that:</p>
            <ul>
              <li>AI-generated responses may be inaccurate, misleading, incomplete, or inappropriate.</li>
              <li>AI-generated content does not constitute professional advice of any kind (medical, legal, financial, psychological, or otherwise).</li>
              <li>AI-generated content does not represent the official views, opinions, or policies of Prozilli Entertainment.</li>
              <li>You should not rely on AI-generated content for making important decisions.</li>
              <li>AI responses may sometimes be repetitive, contradictory, or nonsensical.</li>
            </ul>

            <h3>6.3 Consent to AI Processing</h3>
            <p>By interacting with LISA or any AI character, you consent to:</p>
            <ul>
              <li>Your messages being processed by third-party AI model providers (Groq, OpenAI) for response generation.</li>
              <li>Your interaction data being stored in our relationship memory system for personalization.</li>
              <li>Your identity being linked across platforms to provide a consistent AI experience.</li>
              <li>Your messages being included in conversation context provided to the AI model.</li>
            </ul>
            <p>You may withdraw this consent at any time by ceasing to interact with AI characters and requesting deletion of your relationship memory data.</p>

            <h3>6.4 AI Interaction Guidelines</h3>
            <p>When interacting with LISA or other AI characters, you agree not to:</p>
            <ul>
              <li>Attempt to extract, discover, or reverse-engineer AI system prompts, instructions, or configurations.</li>
              <li>Attempt to manipulate the AI into generating harmful, illegal, offensive, or malicious content.</li>
              <li>Use AI interactions to generate content that violates these Terms or applicable law.</li>
              <li>Impersonate LISA or other AI characters on any platform.</li>
              <li>Treat AI characters as real humans or form dependencies based on AI interactions.</li>
              <li>Use automated tools, scripts, or bots to mass-interact with our AI systems.</li>
            </ul>

            <h3>6.5 AI Availability</h3>
            <p>AI services depend on third-party providers (Groq, OpenAI) and may be temporarily unavailable. We implement fallback systems (Groq primary, OpenAI fallback) but cannot guarantee continuous AI availability. No compensation is provided for AI service interruptions.</p>

            <h3>6.6 No Liability for AI Content</h3>
            <p>To the maximum extent permitted by law, Prozilli Entertainment is not liable for any damages arising from AI-generated content, including but not limited to content that is inaccurate, offensive, harmful, or otherwise objectionable. Your interaction with AI systems is at your own risk.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 7 */}
          <section id="fivem-server">
            <h2>7. FiveM Server (ZO Syndicate RP)</h2>

            <h3>7.1 Server Access</h3>
            <p>Access to the ZO Syndicate RP FiveM server is a privilege, not a right. We reserve the absolute right to deny, restrict, or revoke server access to any individual at any time, for any reason, with or without notice.</p>

            <h3>7.2 Age Requirement</h3>
            <p>You must be at least 18 years old to play on the ZO Syndicate RP server. The server contains mature content including simulated violence, criminal activity roleplay, adult themes, and strong language.</p>

            <h3>7.3 Server Rules</h3>
            <p>All players must comply with the ZO Syndicate RP server rules, which include but are not limited to:</p>
            <ul>
              <li><strong>Roleplay Standards:</strong> You must remain in character at all times while on the server. Breaking character, fail RP, and powergaming are prohibited.</li>
              <li><strong>Value of Life:</strong> You must roleplay a realistic fear of death and injury. Acting without regard for your character&rsquo;s life is prohibited.</li>
              <li><strong>No Metagaming:</strong> Using out-of-character information (Discord, streams, external communications) to gain in-game advantages is strictly prohibited.</li>
              <li><strong>No Combat Logging:</strong> Disconnecting from the server during or immediately after a roleplay scenario to avoid consequences is prohibited.</li>
              <li><strong>No Exploiting:</strong> Using bugs, glitches, exploits, mod menus, cheats, or unauthorized modifications to gain unfair advantages is prohibited.</li>
              <li><strong>No Harassment:</strong> Out-of-character harassment, racism, sexism, homophobia, or targeted bullying of other players is strictly prohibited.</li>
              <li><strong>New Life Rule:</strong> After your character is downed and respawns, you must not return to the same scenario or use knowledge from the previous life.</li>
              <li><strong>Random Deathmatch (RDM):</strong> Killing other players without proper roleplay initiation is prohibited.</li>
              <li><strong>Vehicle Deathmatch (VDM):</strong> Intentionally running over or ramming other players with vehicles without roleplay justification is prohibited.</li>
              <li><strong>Respect Administrators:</strong> Administrator decisions are final during in-game situations. Appeals may be filed after the fact through proper channels.</li>
            </ul>

            <h3>7.4 Administrative Authority</h3>
            <p>Server administrators, moderators, and staff have full authority over the server environment. Their decisions regarding rule enforcement, disputes, and player conduct are final in the moment. You may appeal administrative actions through our designated appeals process (Discord ticket system), but administrators are not required to reverse decisions.</p>

            <h3>7.5 Character Data</h3>
            <p>Your in-game character data (name, inventory, money, vehicles, properties, gang affiliation, job, criminal record) is stored in our database. We reserve the right to modify, reset, or delete character data at any time for server maintenance, economy balancing, or disciplinary purposes.</p>

            <h3>7.6 Virtual Item Ownership</h3>
            <p>All in-game items, currency, vehicles, properties, businesses, and other virtual assets exist solely within the game server and are the property of Prozilli Entertainment. You receive a limited, revocable, non-transferable license to use these virtual items within the game server. See Section 12 for complete virtual item terms.</p>

            <h3>7.7 Server Wipes and Resets</h3>
            <p>We reserve the right to perform partial or complete server wipes (economy resets, character resets, inventory wipes) at any time for server health, economy balancing, or major updates. No compensation, refund, or credit is provided for items or progress lost during server wipes, even for users who have made real-money purchases.</p>

            <h3>7.8 Recording and Streaming</h3>
            <p>The ZO Syndicate RP server may be recorded and/or live-streamed by Prozilli Entertainment and authorized content creators. By playing on the server, you consent to your character and in-game interactions potentially appearing in streams, videos, and other content. You waive any claims related to your likeness (as represented by your in-game character) appearing in our content.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 8 */}
          <section id="user-content">
            <h2>8. User Content</h2>

            <h3>8.1 Definition</h3>
            <p>&ldquo;User Content&rdquo; means any content you create, upload, transmit, or otherwise make available through our Services, including but not limited to chat messages, Discord messages, forum posts, roleplay narratives, character backstories, in-game creations, stream clips, screenshots, feedback, suggestions, and any other content.</p>

            <h3>8.2 License Grant</h3>
            <p>By submitting User Content, you grant Prozilli Entertainment a worldwide, non-exclusive, royalty-free, sublicensable, transferable, perpetual, irrevocable license to use, reproduce, modify, adapt, publish, translate, create derivative works from, distribute, perform, and display your User Content in connection with operating, developing, promoting, and improving our Services and business, in any media formats and through any media channels now known or hereafter developed.</p>

            <h3>8.3 User Representations</h3>
            <p>By submitting User Content, you represent and warrant that:</p>
            <ul>
              <li>You own or have all necessary rights, licenses, consents, and permissions to submit the content and grant the license above.</li>
              <li>Your User Content does not infringe, misappropriate, or violate any third party&rsquo;s intellectual property rights, privacy rights, publicity rights, or other rights.</li>
              <li>Your User Content does not contain material that is unlawful, defamatory, obscene, or otherwise objectionable.</li>
              <li>Your User Content does not contain viruses, malware, or other harmful code.</li>
            </ul>

            <h3>8.4 No Obligation to Monitor</h3>
            <p>We have no obligation to monitor, review, or edit User Content, but we reserve the right to do so at our discretion. We may remove or disable access to any User Content that we determine, in our sole discretion, violates these Terms or is otherwise objectionable.</p>

            <h3>8.5 No Endorsement</h3>
            <p>User Content does not reflect the views or opinions of Prozilli Entertainment. We do not endorse any User Content or any opinion, recommendation, or advice expressed therein.</p>

            <h3>8.6 Content Moderation</h3>
            <p>We operate automated moderation systems (link filtering, spam detection, caps detection, banned word filtering, warning escalation) and manual moderation through human moderators. These systems may automatically restrict, delete, or flag User Content. Moderation decisions can be appealed through our support channels.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 9 */}
          <section id="intellectual-property">
            <h2>9. Intellectual Property</h2>

            <h3>9.1 Prozilli Intellectual Property</h3>
            <p>All right, title, and interest in and to our Services, including but not limited to the following, are and shall remain the exclusive property of Prozilli Entertainment:</p>
            <ul>
              <li><strong>Branding:</strong> The &ldquo;Prozilli&rdquo; name, &ldquo;Prozilli Entertainment&rdquo; name, &ldquo;Prozilli Gaming&rdquo; name, and all associated logos, marks, and trade dress.</li>
              <li><strong>PRISMAI:</strong> The PRISMAI platform, including its architecture, code, APIs, and functionality.</li>
              <li><strong>LISA:</strong> The LISA (Live Interactive System Administrator) character, personality, backstory, and related AI configurations.</li>
              <li><strong>ZO Syndicate:</strong> The &ldquo;ZO Syndicate RP&rdquo; name, branding, custom resources (all 51 zo_* resources), SOPs, gang graphics, and server configurations.</li>
              <li><strong>NPC Characters:</strong> Vania, Benny, Dolores, Snake, Tony, and all associated character profiles and AI personalities.</li>
              <li><strong>Website Design:</strong> The &ldquo;Stark Glass&rdquo; design system, UI components, layouts, and visual identity of our websites.</li>
              <li><strong>Content:</strong> All original content created by Prozilli Entertainment, including streams, videos, graphics, text, and audio.</li>
            </ul>

            <h3>9.2 Limited License to Users</h3>
            <p>Subject to these Terms, we grant you a limited, non-exclusive, non-transferable, revocable license to access and use our Services for personal, non-commercial purposes. This license does not include:</p>
            <ul>
              <li>The right to modify, copy, distribute, transmit, display, perform, reproduce, publish, license, create derivative works from, transfer, or sell any information, software, products, or services obtained from our Services.</li>
              <li>The right to use data mining, robots, screen scraping, or similar data gathering or extraction methods on our Services.</li>
              <li>The right to download (other than page caching) any portion of our Services, except as expressly permitted by us.</li>
              <li>The right to use our Services or any content therein for any commercial purpose without our prior written consent.</li>
            </ul>

            <h3>9.3 DMCA and Copyright</h3>
            <p>We respect the intellectual property rights of others and expect our users to do the same. For copyright infringement claims, please see our <a href="/dmca">DMCA Policy</a>.</p>

            <h3>9.4 Feedback</h3>
            <p>If you provide us with any feedback, suggestions, or ideas regarding our Services (&ldquo;Feedback&rdquo;), you assign to us all rights in such Feedback and agree that we shall have the right to use and implement such Feedback in any manner without restriction, attribution, or compensation to you.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 10 */}
          <section id="prohibited-conduct">
            <h2>10. Prohibited Conduct</h2>
            <p>You agree not to engage in any of the following prohibited activities. This list is non-exhaustive; violations of the spirit of these rules may also result in enforcement action. For detailed prohibited activity descriptions, see our <a href="/acceptable-use">Acceptable Use Policy</a>.</p>

            <h3>10.1 General Prohibitions</h3>
            <ul>
              <li>Violating any applicable law, regulation, or third-party rights.</li>
              <li>Harassment, bullying, intimidation, or threats directed at any person.</li>
              <li>Hate speech, discrimination, or content promoting violence against any individual or group based on race, ethnicity, nationality, religion, gender, gender identity, sexual orientation, disability, or other protected characteristics.</li>
              <li>Impersonating any person or entity, or falsely representing your affiliation with any person or entity.</li>
              <li>Posting or transmitting spam, unsolicited advertisements, or promotional material.</li>
              <li>Distributing viruses, malware, trojans, worms, or any other harmful code.</li>
              <li>Attempting to gain unauthorized access to our systems, other users&rsquo; accounts, or any computer network.</li>
              <li>Interfering with or disrupting the integrity or performance of our Services.</li>
              <li>Engaging in any form of automated data collection (scraping, crawling, harvesting) without our express written permission.</li>
              <li>Creating accounts for the purpose of ban evasion.</li>
              <li>Sharing, distributing, or posting any content that depicts, promotes, or facilitates child sexual abuse material (CSAM) or the exploitation of minors.</li>
              <li>Doxxing — publishing or threatening to publish another person&rsquo;s private or personally identifiable information without their consent.</li>
              <li>Swatting or making false emergency reports.</li>
              <li>Engaging in or promoting illegal gambling.</li>
              <li>Selling, trading, or transferring your account to another person.</li>
            </ul>

            <h3>10.2 FiveM-Specific Prohibitions</h3>
            <ul>
              <li>Using mod menus, cheats, exploits, injectors, or any unauthorized modifications.</li>
              <li>Exploiting bugs or glitches for personal gain (these must be reported to administrators).</li>
              <li>Real-money trading (RMT) of in-game items, currency, or assets.</li>
              <li>Using external voice channels to coordinate in-game actions (metagaming).</li>
              <li>Stream sniping — using another player&rsquo;s live stream to gain in-game advantages.</li>
              <li>Intentionally crashing or degrading server performance.</li>
              <li>Placing excessive or malicious props/vehicles to cause lag.</li>
            </ul>

            <h3>10.3 AI-Specific Prohibitions</h3>
            <ul>
              <li>Attempting to jailbreak, manipulate, or extract system prompts from LISA or other AI characters.</li>
              <li>Using AI interactions to generate illegal, harmful, or exploitative content.</li>
              <li>Automated mass-interaction with AI systems (bot attacks).</li>
              <li>Attempting to make AI characters produce content that violates our <a href="/acceptable-use">Acceptable Use Policy</a>.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 11 */}
          <section id="purchases">
            <h2>11. Purchases and Payments</h2>

            <h3>11.1 Merchandise</h3>
            <p>Physical and digital merchandise is available through our Fourthwall-powered shop. All merchandise purchases are processed by Fourthwall and are subject to Fourthwall&rsquo;s terms of service in addition to these Terms. Prices are displayed in U.S. Dollars (USD) unless otherwise indicated. Shipping costs, taxes, and delivery times are calculated at checkout.</p>

            <h3>11.2 VIP Subscriptions</h3>
            <p>VIP subscriptions (Supporter, VIP, Elite tiers) for the FiveM server and other services are available through Tebex. Subscriptions are recurring and will automatically renew unless cancelled before the renewal date. You may cancel your subscription at any time; cancellation takes effect at the end of the current billing period. No partial refunds are given for unused subscription time.</p>

            <h3>11.3 Tips and Donations</h3>
            <p>Tips and donations made through StreamElements, PayPal, or other platforms are <strong>voluntary, non-refundable gifts</strong>. Tips and donations are not purchases of goods or services. They do not entitle you to any specific benefits, access, or services beyond what may be offered as a courtesy. You understand that tips and donations cannot be reversed, refunded, or charged back.</p>

            <h3>11.4 Patreon Pledges</h3>
            <p>Patreon pledges are subject to Patreon&rsquo;s terms of service. Pledge benefits are described on our Patreon page and are subject to availability and our discretion.</p>

            <h3>11.5 Payment Processing</h3>
            <p>All payments are processed by third-party payment processors (Stripe, PayPal, Fourthwall, Tebex, Patreon, StreamElements). We do not directly collect, store, or process credit card numbers or full bank account information. Your use of these payment processors is subject to their respective terms of service and privacy policies.</p>

            <h3>11.6 Pricing and Availability</h3>
            <p>We reserve the right to change prices, modify product offerings, and discontinue products or services at any time without prior notice. Prices displayed on our Services are subject to applicable taxes and fees.</p>

            <h3>11.7 Refunds</h3>
            <p>Refunds are governed by our <a href="/refund">Refund Policy</a>. Please review it carefully before making any purchase.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 12 */}
          <section id="virtual-items">
            <h2>12. Virtual Items and Currency</h2>

            <h3>12.1 Nature of Virtual Items</h3>
            <p>Virtual items include, but are not limited to, in-game currency, vehicles, properties, businesses, weapons, clothing, inventory items, and any other virtual assets within the ZO Syndicate RP FiveM server or other game environments operated by Prozilli Entertainment.</p>

            <h3>12.2 No Real-World Value</h3>
            <p>Virtual items have <strong>no real-world monetary value</strong>. Virtual items cannot be redeemed for real money, goods, or services outside of the game environment. The accumulation of virtual items does not create any property right, financial interest, or claim against Prozilli Entertainment.</p>

            <h3>12.3 Revocable License</h3>
            <p>Your right to use virtual items is a limited, revocable, non-transferable, non-sublicensable license. We may revoke this license at any time for any reason, including but not limited to violations of these Terms, server resets, economy balancing, or discontinuation of the service.</p>

            <h3>12.4 No Trading for Real Money</h3>
            <p>The sale, purchase, exchange, or transfer of virtual items for real-world currency or items of value (commonly known as &ldquo;RMT&rdquo; or &ldquo;real-money trading&rdquo;) is strictly prohibited. Violations will result in immediate permanent ban and forfeiture of all virtual items.</p>

            <h3>12.5 Modification and Removal</h3>
            <p>We reserve the right to modify, nerf, buff, remove, or add virtual items at any time for game balance, bug fixes, content updates, or any other reason. No compensation is provided for changes to virtual items.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 13 */}
          <section id="giveaways">
            <h2>13. Giveaways</h2>

            <h3>13.1 Eligibility</h3>
            <p>Giveaways are open to eligible participants as specified in each giveaway&rsquo;s official rules. General eligibility requirements include being at least 13 years old (or 18 for age-restricted prizes), being a member of the specified community or platform, and not having been previously banned from our Services.</p>

            <h3>13.2 No Purchase Necessary</h3>
            <p>No purchase is necessary to enter or win any giveaway, unless explicitly stated and permitted by applicable law. Giveaways are void where prohibited by law.</p>

            <h3>13.3 Winner Selection</h3>
            <p>Winners are selected at random or through criteria specified in the giveaway rules. Our decisions regarding winner selection are final. Winners will be notified through the platform on which the giveaway was conducted.</p>

            <h3>13.4 Prize Fulfillment</h3>
            <p>We will make reasonable efforts to fulfill prizes as described. Prizes are non-transferable and may not be substituted except at our sole discretion. If a prize cannot be fulfilled, we may substitute a prize of equal or greater value. Winners are responsible for any taxes or fees associated with receiving a prize.</p>

            <h3>13.5 Disqualification</h3>
            <p>We reserve the right to disqualify any participant who we believe has attempted to tamper with the entry process, violates these Terms, or acts in an unsportsmanlike or disruptive manner.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 14 */}
          <section id="third-party">
            <h2>14. Third-Party Links and Services</h2>
            <p>Our Services may contain links to third-party websites, services, and content that are not owned or controlled by Prozilli Entertainment. These include but are not limited to Twitch, YouTube, Kick, Discord, TikTok, X/Twitter, Instagram, Facebook, Trovo, Fourthwall, StreamElements, PayPal, Stripe, Patreon, and Tebex.</p>
            <p>We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party websites or services. You acknowledge and agree that:</p>
            <ul>
              <li>We are not responsible for the availability, accuracy, or content of third-party services.</li>
              <li>We do not endorse any third-party content, products, or services.</li>
              <li>Your use of third-party services is at your own risk and subject to those services&rsquo; terms and policies.</li>
              <li>We are not liable for any damage or loss caused by your use of or reliance on third-party content or services.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 15 */}
          <section id="disclaimers">
            <h2>15. Disclaimers</h2>
            <p><strong>THE SERVICES ARE PROVIDED ON AN &ldquo;AS IS&rdquo; AND &ldquo;AS AVAILABLE&rdquo; BASIS WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY.</strong></p>
            <p>TO THE FULLEST EXTENT PERMITTED BY APPLICABLE LAW, PROZILLI ENTERTAINMENT EXPRESSLY DISCLAIMS ALL WARRANTIES, INCLUDING BUT NOT LIMITED TO:</p>
            <ul>
              <li>IMPLIED WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.</li>
              <li>WARRANTIES THAT THE SERVICES WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS.</li>
              <li>WARRANTIES REGARDING THE ACCURACY, RELIABILITY, TIMELINESS, OR COMPLETENESS OF ANY CONTENT, INCLUDING AI-GENERATED CONTENT.</li>
              <li>WARRANTIES THAT THE SERVICES WILL MEET YOUR REQUIREMENTS OR EXPECTATIONS.</li>
              <li>WARRANTIES REGARDING THE RESULTS THAT MAY BE OBTAINED FROM THE USE OF THE SERVICES.</li>
            </ul>
            <p>NO ADVICE OR INFORMATION, WHETHER ORAL OR WRITTEN, OBTAINED BY YOU FROM PROZILLI ENTERTAINMENT OR THROUGH THE SERVICES SHALL CREATE ANY WARRANTY NOT EXPRESSLY STATED IN THESE TERMS.</p>
            <p>SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OF IMPLIED WARRANTIES, SO SOME OF THE ABOVE EXCLUSIONS MAY NOT APPLY TO YOU. IN SUCH JURISDICTIONS, OUR LIABILITY IS LIMITED TO THE FULLEST EXTENT PERMITTED BY LAW.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 16 */}
          <section id="limitation">
            <h2>16. Limitation of Liability</h2>
            <p><strong>TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, IN NO EVENT SHALL PROZILLI ENTERTAINMENT, ITS OWNER (WIDLER SANON), OR ITS AFFILIATES, AGENTS, CONTRACTORS, MODERATORS, OR VOLUNTEERS BE LIABLE FOR ANY:</strong></p>
            <ul>
              <li>INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, PUNITIVE, OR EXEMPLARY DAMAGES.</li>
              <li>LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR USE.</li>
              <li>COST OF PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES.</li>
              <li>DAMAGES ARISING OUT OF OR RELATED TO YOUR USE OF OR INABILITY TO USE THE SERVICES.</li>
              <li>DAMAGES ARISING FROM AI-GENERATED CONTENT, INCLUDING INACCURATE, OFFENSIVE, OR HARMFUL RESPONSES.</li>
              <li>DAMAGES ARISING FROM UNAUTHORIZED ACCESS TO YOUR ACCOUNT OR DATA.</li>
              <li>DAMAGES ARISING FROM LOSS OF VIRTUAL ITEMS, IN-GAME PROGRESS, OR SERVER DATA.</li>
              <li>DAMAGES ARISING FROM ACTIONS OF OTHER USERS OR THIRD PARTIES.</li>
            </ul>
            <p><strong>WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STRICT LIABILITY, OR ANY OTHER LEGAL THEORY, AND WHETHER OR NOT WE HAVE BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.</strong></p>
            <p><strong>IN NO EVENT SHALL OUR TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THESE TERMS OR THE SERVICES EXCEED THE GREATER OF: (A) THE AMOUNT YOU HAVE PAID US IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM, OR (B) ONE HUNDRED U.S. DOLLARS ($100.00).</strong></p>
            <p>SOME JURISDICTIONS DO NOT ALLOW THE LIMITATION OR EXCLUSION OF LIABILITY FOR INCIDENTAL OR CONSEQUENTIAL DAMAGES, SO SOME OF THE ABOVE LIMITATIONS MAY NOT APPLY TO YOU.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 17 */}
          <section id="indemnification">
            <h2>17. Indemnification</h2>
            <p>You agree to indemnify, defend, and hold harmless Prozilli Entertainment, its owner (Widler Sanon), and its affiliates, officers, agents, contractors, moderators, and volunteers from and against any and all claims, liabilities, damages, losses, costs, expenses, and fees (including reasonable attorneys&rsquo; fees) arising from or relating to:</p>
            <ul>
              <li>Your use of or access to the Services.</li>
              <li>Your violation of these Terms or any applicable law or regulation.</li>
              <li>Your User Content.</li>
              <li>Your violation of any third party&rsquo;s rights, including intellectual property, privacy, or publicity rights.</li>
              <li>Your interactions with other users of the Services.</li>
              <li>Any disputes between you and other users.</li>
              <li>Any chargebacks or payment disputes you initiate.</li>
            </ul>
            <p>We reserve the right, at your expense, to assume the exclusive defense and control of any matter for which you are required to indemnify us, and you agree to cooperate with our defense of such claims.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 18 */}
          <section id="dispute-resolution">
            <h2>18. Dispute Resolution</h2>

            <h3>18.1 Informal Resolution</h3>
            <p>Before filing any formal dispute, you agree to first attempt to resolve the dispute informally by contacting us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>. We will attempt to resolve the dispute informally within 60 days. Most disputes can be resolved without formal proceedings.</p>

            <h3>18.2 Binding Arbitration</h3>
            <p>If we cannot resolve a dispute informally, <strong>you and Prozilli Entertainment agree that any dispute, claim, or controversy arising out of or relating to these Terms or the Services shall be resolved by binding individual arbitration</strong>, rather than in court, except as set forth below. This arbitration agreement is governed by the Federal Arbitration Act (FAA).</p>
            <p>Arbitration shall be administered by the American Arbitration Association (&ldquo;AAA&rdquo;) in accordance with the AAA&rsquo;s Consumer Arbitration Rules. The arbitration shall be conducted by a single arbitrator, in the English language, and shall take place in the state of Florida or remotely via videoconference, at the election of the party initiating the arbitration.</p>

            <h3>18.3 Class Action Waiver</h3>
            <p><strong>YOU AND PROZILLI ENTERTAINMENT AGREE THAT EACH MAY BRING CLAIMS AGAINST THE OTHER ONLY IN YOUR OR OUR INDIVIDUAL CAPACITY, AND NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY PURPORTED CLASS, CONSOLIDATED, OR REPRESENTATIVE ACTION.</strong> Unless both you and we agree otherwise, the arbitrator may not consolidate more than one person&rsquo;s claims, and may not otherwise preside over any form of a representative or class proceeding.</p>

            <h3>18.4 Small Claims Exception</h3>
            <p>Notwithstanding the above, either party may bring an individual action in small claims court for disputes within the court&rsquo;s jurisdictional limits.</p>

            <h3>18.5 Injunctive Relief</h3>
            <p>Nothing in this section shall prevent either party from seeking injunctive or other equitable relief in court for matters relating to intellectual property, data security, or unauthorized access to the Services.</p>

            <h3>18.6 Opt-Out</h3>
            <p>You may opt out of this arbitration agreement by sending written notice to <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> within 30 days of first accepting these Terms. Your notice must include your name, address, and a clear statement that you wish to opt out of the arbitration agreement. If you opt out, the dispute resolution provisions of Section 19 (Governing Law) will apply.</p>

            <h3>18.7 Survival</h3>
            <p>This arbitration agreement will survive the termination of your relationship with Prozilli Entertainment.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 19 */}
          <section id="governing-law">
            <h2>19. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the <strong>State of Florida, United States of America</strong>, without regard to its conflict of law provisions. To the extent that arbitration is not applicable or is opted out of, you agree to submit to the exclusive jurisdiction of the state and federal courts located in the State of Florida for the resolution of any disputes.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 20 */}
          <section id="termination">
            <h2>20. Termination</h2>

            <h3>20.1 Termination by You</h3>
            <p>You may terminate your use of our Services at any time by discontinuing use and requesting account deletion by contacting us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>.</p>

            <h3>20.2 Termination by Us</h3>
            <p>We may terminate or suspend your access to our Services, in whole or in part, at any time, with or without cause, with or without notice, effective immediately. Reasons for termination may include, but are not limited to:</p>
            <ul>
              <li>Violation of these Terms or any of our Agreements.</li>
              <li>Conduct that is harmful to other users, our business, or third parties.</li>
              <li>Fraudulent, abusive, or illegal activity.</li>
              <li>Extended periods of inactivity.</li>
              <li>At our sole discretion for any reason or no reason.</li>
            </ul>

            <h3>20.3 Effect of Termination</h3>
            <p>Upon termination:</p>
            <ul>
              <li>Your right to access and use the Services ceases immediately.</li>
              <li>We may delete your account data, User Content, and associated information in accordance with our data retention policies.</li>
              <li>Any virtual items, in-game progress, or digital assets associated with your account are forfeited.</li>
              <li>Any outstanding purchases or subscriptions may be cancelled without refund (except as required by applicable law).</li>
              <li>Provisions that by their nature should survive termination shall survive, including Sections 8 (User Content license grant), 9 (Intellectual Property), 15 (Disclaimers), 16 (Limitation of Liability), 17 (Indemnification), 18 (Dispute Resolution), and 19 (Governing Law).</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 21 */}
          <section id="modifications">
            <h2>21. Modifications to Terms</h2>
            <p>We reserve the right to modify these Terms at any time. When we make material changes, we will:</p>
            <ul>
              <li>Update the &ldquo;Last Updated&rdquo; date at the top of this page.</li>
              <li>Provide at least 30 days&rsquo; notice before material changes take effect (where practical).</li>
              <li>Post a prominent notice on our websites.</li>
              <li>Send notification through our Discord community.</li>
            </ul>
            <p>Your continued use of the Services after the effective date of revised Terms constitutes your acceptance of the revised Terms. If you do not agree to the new Terms, you must stop using the Services.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 22 */}
          <section id="severability">
            <h2>22. Severability</h2>
            <p>If any provision of these Terms is held to be invalid, illegal, or unenforceable by a court of competent jurisdiction, such invalidity, illegality, or unenforceability shall not affect any other provision of these Terms. The remaining provisions shall continue in full force and effect. The invalid or unenforceable provision shall be modified to the minimum extent necessary to make it valid and enforceable while preserving its original intent.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 23 */}
          <section id="entire-agreement">
            <h2>23. Entire Agreement</h2>
            <p>These Terms, together with our Privacy Policy, Acceptable Use Policy, Cookie Policy, DMCA Policy, Refund Policy, and any other agreements or policies referenced herein, constitute the entire agreement between you and Prozilli Entertainment regarding your use of the Services. These Terms supersede all prior and contemporaneous agreements, communications, and proposals, whether oral or written, between you and Prozilli Entertainment regarding the Services.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 24 */}
          <section id="waiver">
            <h2>24. Waiver</h2>
            <p>The failure of Prozilli Entertainment to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver of any provision of these Terms will be effective only if in writing and signed by Prozilli Entertainment. A waiver of any provision on one occasion shall not be deemed a waiver of any other provision or of such provision on any other occasion.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 25 */}
          <section id="assignment">
            <h2>25. Assignment</h2>
            <p>You may not assign or transfer these Terms or your rights or obligations hereunder, in whole or in part, without our prior written consent. We may assign these Terms, in whole or in part, at any time without notice or consent. These Terms shall be binding upon and inure to the benefit of the parties and their respective successors and permitted assigns.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 26 */}
          <section id="force-majeure">
            <h2>26. Force Majeure</h2>
            <p>Prozilli Entertainment shall not be liable for any failure or delay in performing its obligations under these Terms where such failure or delay results from events beyond our reasonable control, including but not limited to: acts of God, natural disasters, pandemics, epidemics, war, terrorism, riots, civil unrest, government actions, embargoes, fire, flood, earthquake, power outages, internet or telecommunications failures, DDoS attacks, cyberattacks, third-party service outages (including Cloudflare, Groq, OpenAI, Twitch, YouTube, Discord, and other platform outages), strikes, labor disputes, or any other event beyond our reasonable control.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 27 */}
          <section id="terms-contact">
            <h2>27. Contact Information</h2>
            <p>If you have questions about these Terms of Service, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
              <li><strong>Entity:</strong> Prozilli Entertainment (Widler Sanon, Sole Proprietor)</li>
              <li><strong>Websites:</strong> <a href="https://prozilligaming.com" target="_blank" rel="noopener noreferrer">prozilligaming.com</a> | <a href="https://prozilli.com" target="_blank" rel="noopener noreferrer">prozilli.com</a></li>
              <li><strong>Discord:</strong> ZO Syndicate Discord server (support channel)</li>
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
