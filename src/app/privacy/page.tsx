import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Privacy Policy for Prozilli Gaming (prozilligaming.com). Learn how Prozilli Entertainment collects, uses, stores, and protects your personal information across our streaming, AI, gaming, and community platforms.",
};

export default function PrivacyPolicyPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="legal-content">
          <p className="text-label text-dim mb-2">Last Updated: February 13, 2026</p>
          <h1 className="text-headline mb-2">Privacy Policy</h1>
          <p className="text-body-lg mb-8">
            Prozilli Entertainment (&ldquo;Prozilli,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our websites (prozilligaming.com and prozilli.com), use our services, interact with our AI systems, participate in our FiveM roleplay server, connect your platform accounts, or engage with our community across any medium (collectively, the &ldquo;Services&rdquo;). Please read this Privacy Policy carefully. By accessing or using any of our Services, you acknowledge that you have read, understood, and agree to be bound by this Privacy Policy.
          </p>

          {/* TABLE OF CONTENTS */}
          <div className="glass legal-toc" id="toc">
            <h2 style={{ marginTop: 0, borderBottom: "none", paddingBottom: 0, fontSize: "1.125rem" }}>Table of Contents</h2>
            <ol>
              <li><a href="#information-we-collect">1. Information We Collect</a></li>
              <li><a href="#how-we-use-information">2. How We Use Your Information</a></li>
              <li><a href="#lisa-ai-disclosure">3. LISA AI Data Processing Disclosure</a></li>
              <li><a href="#oauth-platform-data">4. OAuth and Platform Data</a></li>
              <li><a href="#cookies-tracking">5. Cookies and Tracking Technologies</a></li>
              <li><a href="#third-party-services">6. Third-Party Services and Processors</a></li>
              <li><a href="#data-sharing">7. Data Sharing and Disclosure</a></li>
              <li><a href="#data-retention">8. Data Retention</a></li>
              <li><a href="#data-security">9. Data Security</a></li>
              <li><a href="#international-transfers">10. International Data Transfers</a></li>
              <li><a href="#gdpr-rights">11. Your Rights Under GDPR (EEA/UK Users)</a></li>
              <li><a href="#ccpa-rights">12. Your Rights Under CCPA (California Residents)</a></li>
              <li><a href="#coppa-compliance">13. Children&rsquo;s Privacy (COPPA Compliance)</a></li>
              <li><a href="#do-not-track">14. Do Not Track Signals</a></li>
              <li><a href="#state-specific">15. Additional State-Specific Disclosures</a></li>
              <li><a href="#changes">16. Changes to This Privacy Policy</a></li>
              <li><a href="#contact">17. Contact Information</a></li>
            </ol>
          </div>

          {/* SECTION 1 */}
          <section id="information-we-collect">
            <h2>1. Information We Collect</h2>
            <p>We collect information in several ways depending on how you interact with our Services. The categories below describe the types of data we may collect.</p>

            <h3>1.1 Information You Provide Directly</h3>
            <ul>
              <li><strong>Account Registration Data:</strong> When you create an account on our websites or connect through a platform, we collect your username, display name, email address, and any profile information you choose to provide.</li>
              <li><strong>Platform Account Linking (OAuth):</strong> When you connect third-party accounts (Twitch, YouTube, Kick, Discord, TikTok, X/Twitter, Instagram, Facebook, Trovo), we receive authentication tokens, your platform user ID, username, display name, profile picture URL, and email address (where provided by the platform). See Section 4 for detailed OAuth disclosures.</li>
              <li><strong>Chat Messages and Communications:</strong> Messages you send in our Twitch, Kick, YouTube, Discord, Trovo, Facebook, Instagram, TikTok, and X/Twitter chat rooms are collected and processed by our systems. This includes text content, timestamps, platform identifiers, and message metadata.</li>
              <li><strong>AI Interaction Data:</strong> When you interact with LISA (our AI co-host), your messages, the AI&rsquo;s responses, and contextual data about the interaction (platform, timestamp, channel) are collected. LISA maintains a relationship memory system that stores your interaction history, preferences, nickname, and relationship score. See Section 3 for complete LISA AI disclosures.</li>
              <li><strong>FiveM Roleplay Data:</strong> When you play on our ZO Syndicate RP FiveM server, we collect your FiveM license identifier, Steam ID (if linked), Discord ID (if linked), in-game character data (name, job, gang affiliation, inventory, bank balance, owned properties, vehicles), roleplay actions, administrative actions taken against your account, and server connection logs.</li>
              <li><strong>Payment Information:</strong> When you make purchases, we collect transaction details. We do not directly store credit card numbers or full payment credentials; these are processed by our third-party payment processors (Fourthwall, Stripe, PayPal, Tebex, Patreon, StreamElements). We receive transaction IDs, order summaries, amounts, and delivery addresses for physical merchandise.</li>
              <li><strong>Support and Correspondence:</strong> When you contact us via email, Discord, or other channels, we collect the content of your communications, your contact information, and any attachments you provide.</li>
              <li><strong>Survey and Feedback Data:</strong> Any responses you provide to optional surveys, polls, feedback forms, or community votes.</li>
              <li><strong>Giveaway Entry Data:</strong> When you enter giveaways, we collect your platform username, entry timestamps, and any required eligibility information.</li>
              <li><strong>User-Generated Content:</strong> Content you create, upload, or share through our Services, including but not limited to Discord messages, stream clips, FiveM roleplay content, forum posts, and social media interactions with our accounts.</li>
            </ul>

            <h3>1.2 Information Collected Automatically</h3>
            <ul>
              <li><strong>Device and Browser Information:</strong> IP address, browser type and version, operating system, device type (desktop, mobile, tablet), screen resolution, language preference, and time zone.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, click patterns, navigation paths, referring URLs, exit pages, search queries used on our site, and features utilized.</li>
              <li><strong>Log Data:</strong> Server logs including timestamps, request methods, URLs accessed, response codes, and data transfer volumes.</li>
              <li><strong>Analytics Data:</strong> Aggregated and individual analytics data collected via Cloudflare Analytics and Google Analytics, including session duration, page views, bounce rates, geographic region (country/city level), and user flow data.</li>
              <li><strong>Stream Viewing Data:</strong> When you use our /watch page, we collect data about which streams you view, duration of viewing, embedded player interactions, and platform-specific viewing metrics relayed through embedded players.</li>
              <li><strong>Connection and Performance Data:</strong> Network connection type, latency measurements, load times, and error occurrences related to our Services.</li>
            </ul>

            <h3>1.3 Information from Third-Party Platforms</h3>
            <ul>
              <li><strong>Twitch:</strong> User ID, login name, display name, email, profile image, broadcaster type, subscription status, follow status, bits donated, chat messages.</li>
              <li><strong>YouTube:</strong> Channel ID, channel name, subscriber status, Super Chat/Super Sticker amounts, chat messages, membership status.</li>
              <li><strong>Kick:</strong> User ID, username, chatroom messages, subscription status, gifted subscriptions.</li>
              <li><strong>Discord:</strong> User ID, username, discriminator, avatar, guild membership, roles, messages in our servers, voice channel participation timestamps (not audio content).</li>
              <li><strong>TikTok:</strong> User ID, display name, profile data shared through OAuth.</li>
              <li><strong>X/Twitter:</strong> User ID, handle, display name, profile data shared through OAuth.</li>
              <li><strong>Instagram:</strong> User ID, username, account type, profile data shared through OAuth.</li>
              <li><strong>Facebook:</strong> User ID, name, email (if authorized), profile picture, page interactions.</li>
              <li><strong>Trovo:</strong> User ID, username, profile data shared through OAuth, chat messages.</li>
              <li><strong>Fourthwall:</strong> Order data (items purchased, amounts, shipping addresses), subscription data, donation data via webhooks.</li>
              <li><strong>StreamElements:</strong> Tip amounts, tipper usernames, tip messages.</li>
              <li><strong>PayPal:</strong> Transaction IDs, payment amounts, payer email (as provided through payment confirmation webhooks).</li>
              <li><strong>Stripe:</strong> Transaction IDs, payment amounts, last four digits of card (as provided through payment confirmation webhooks).</li>
              <li><strong>Patreon:</strong> Patron username, pledge tier, pledge amount, pledge status.</li>
              <li><strong>Tebex:</strong> Transaction IDs, purchased packages, player identifiers (for FiveM VIP fulfillment).</li>
            </ul>

            <h3>1.4 Cookies and Similar Technologies</h3>
            <p>We use cookies, local storage, session storage, and similar tracking technologies to collect and store information. For comprehensive details, please see our <a href="/cookies">Cookie Policy</a>.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 2 */}
          <section id="how-we-use-information">
            <h2>2. How We Use Your Information</h2>
            <p>We use the information we collect for the following purposes:</p>

            <h3>2.1 Service Provision and Operation</h3>
            <ul>
              <li>To provide, maintain, and improve our websites, streaming services, AI chatbot, FiveM server, merchandise store, and community platforms.</li>
              <li>To process your account creation, authentication, and platform linking through OAuth.</li>
              <li>To process and fulfill merchandise orders, VIP subscriptions, and other purchases.</li>
              <li>To deliver chat messages across platforms and facilitate real-time communication.</li>
              <li>To operate the ZO Syndicate RP FiveM server, including character persistence, economy systems, and administrative functions.</li>
              <li>To manage giveaways, including verifying eligibility and selecting winners.</li>
            </ul>

            <h3>2.2 AI Processing and Personalization</h3>
            <ul>
              <li>To process your chat messages through our AI systems (LISA) to generate contextually relevant, entertaining responses.</li>
              <li>To maintain LISA&rsquo;s relationship memory system, which stores interaction history to personalize future conversations.</li>
              <li>To link your identity across platforms so LISA can recognize you regardless of which platform you&rsquo;re chatting on.</li>
              <li>To improve LISA&rsquo;s response quality and personality through aggregated interaction analysis.</li>
              <li>To operate NPC bot personalities (Vania, Benny, Dolores, Snake, Tony) in Discord and FiveM, each with independent AI processing.</li>
            </ul>

            <h3>2.3 Communication</h3>
            <ul>
              <li>To send you service-related notices, updates, security alerts, and administrative messages.</li>
              <li>To respond to your inquiries, support requests, and feedback.</li>
              <li>To send promotional communications where you have opted in (you may opt out at any time).</li>
              <li>To facilitate community announcements through Discord, social media, and in-stream notifications.</li>
            </ul>

            <h3>2.4 Analytics and Improvement</h3>
            <ul>
              <li>To analyze usage patterns and trends to improve our Services.</li>
              <li>To monitor and measure the effectiveness and performance of our platforms.</li>
              <li>To conduct A/B testing and feature development based on aggregated user behavior.</li>
              <li>To generate internal reports on audience demographics, engagement, and content performance.</li>
            </ul>

            <h3>2.5 Security and Integrity</h3>
            <ul>
              <li>To detect, prevent, and address fraud, abuse, security incidents, and technical issues.</li>
              <li>To enforce our Terms of Service, Acceptable Use Policy, and community guidelines.</li>
              <li>To moderate chat content across platforms using automated and manual systems.</li>
              <li>To manage bans, warnings, and disciplinary actions on our FiveM server and Discord communities.</li>
              <li>To protect against unauthorized access to accounts and systems.</li>
            </ul>

            <h3>2.6 Legal Compliance</h3>
            <ul>
              <li>To comply with applicable laws, regulations, legal processes, and governmental requests.</li>
              <li>To establish, exercise, or defend legal claims.</li>
              <li>To enforce our agreements and policies.</li>
              <li>To protect our rights, property, and safety, and that of our users and the public.</li>
            </ul>

            <h3>2.7 Legal Bases for Processing (GDPR)</h3>
            <p>If you are located in the European Economic Area (EEA) or the United Kingdom, our legal bases for processing your personal data include:</p>
            <ul>
              <li><strong>Consent:</strong> Where you have given us explicit consent to process your data (e.g., AI interaction, optional marketing communications, cookie consent).</li>
              <li><strong>Contract Performance:</strong> Where processing is necessary to fulfill our contract with you (e.g., providing Services you requested, processing orders).</li>
              <li><strong>Legitimate Interests:</strong> Where processing is necessary for our legitimate interests, provided those interests are not overridden by your fundamental rights (e.g., analytics, security, service improvement, fraud prevention).</li>
              <li><strong>Legal Obligation:</strong> Where processing is necessary to comply with a legal obligation (e.g., tax records, law enforcement requests).</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 3 */}
          <section id="lisa-ai-disclosure">
            <h2>3. LISA AI Data Processing Disclosure</h2>
            <p>This section provides detailed information about how our AI chatbot system, LISA (Live Interactive System Administrator), processes your data. LISA is a core component of our Services and operates across all connected platforms.</p>

            <h3>3.1 What LISA Is</h3>
            <p>LISA is an AI-powered chatbot and co-host that operates across Twitch, YouTube, Kick, Discord, TikTok, X/Twitter, Instagram, Facebook, and Trovo. LISA has a defined personality, backstory, and character traits. LISA is not a human. All responses from LISA are generated by artificial intelligence.</p>

            <h3>3.2 How LISA Processes Your Data</h3>
            <ul>
              <li><strong>Chat Message Ingestion:</strong> When you send a chat message on any connected platform, that message may be processed by LISA&rsquo;s systems. Messages are received through platform-specific APIs and connectors (tmi.js for Twitch IRC, Pusher WebSocket for Kick, discord.js for Discord, WebSocket for Trovo, API polling for YouTube, Graph API for Facebook, REST API for X).</li>
              <li><strong>AI Model Processing:</strong> Your messages are sent to third-party AI model providers for response generation. Our primary provider is <strong>Groq</strong> (using the llama-3.3-70b-versatile model). If Groq is unavailable, we automatically fall back to <strong>OpenAI</strong> (using GPT-4 Turbo). These providers process your message content, conversation context, and LISA&rsquo;s system instructions to generate a response.</li>
              <li><strong>Context Window:</strong> When generating a response, LISA includes recent conversation history (up to a configured context window) and your relationship memory data as context for the AI model.</li>
            </ul>

            <h3>3.3 Relationship Memory System</h3>
            <p>LISA maintains a persistent relationship memory for each user who interacts with her. This memory is stored in our MySQL database and includes:</p>
            <ul>
              <li><strong>User Identity:</strong> Your platform username(s), display name, and platform-specific user IDs.</li>
              <li><strong>Cross-Platform Linking:</strong> If you interact with LISA on multiple platforms, LISA may link your identities to maintain a unified relationship profile. This linking is based on username similarity, explicit user confirmation, or OAuth account connections.</li>
              <li><strong>Relationship Score:</strong> A numerical score representing the depth of your interaction history with LISA, used to adjust response tone and familiarity.</li>
              <li><strong>Interaction History:</strong> Key details from past conversations, including memorable moments, topics discussed, jokes shared, preferences expressed, and your stated interests.</li>
              <li><strong>Nicknames and Preferences:</strong> Any nickname LISA has assigned you or that you&rsquo;ve requested, language preferences, and communication style preferences.</li>
              <li><strong>Moderation Flags:</strong> Records of any moderation actions taken in connection with your interactions.</li>
            </ul>

            <h3>3.4 NPC Bot Processing</h3>
            <p>In addition to LISA, we operate five independent AI-powered NPC (Non-Player Character) bots in our Discord server: Vania, Benny, Dolores, Snake, and Tony. Each has a unique personality and processes messages independently. These bots use the same AI model providers (Groq/OpenAI) and similar data processing practices as LISA, but maintain separate conversation contexts and personality parameters.</p>

            <h3>3.5 Data Sent to AI Providers</h3>
            <p>When processing your interactions, the following data may be sent to Groq and/or OpenAI:</p>
            <ul>
              <li>The text content of your message.</li>
              <li>Recent conversation context (prior messages in the current session).</li>
              <li>Your username and display name.</li>
              <li>Your relationship memory summary (if one exists).</li>
              <li>The platform you are messaging from.</li>
              <li>LISA&rsquo;s system prompt (personality instructions, not user data).</li>
            </ul>
            <p>We do <strong>not</strong> send your email address, IP address, payment information, or other sensitive personal data to AI providers as part of LISA&rsquo;s processing.</p>

            <h3>3.6 AI Provider Data Policies</h3>
            <ul>
              <li><strong>Groq:</strong> Groq processes data in accordance with their privacy policy. As of our last review, Groq does not use customer API input/output data to train their models. Groq&rsquo;s privacy policy: <a href="https://groq.com/privacy-policy/" target="_blank" rel="noopener noreferrer">https://groq.com/privacy-policy/</a></li>
              <li><strong>OpenAI:</strong> OpenAI processes data in accordance with their API data usage policies. OpenAI&rsquo;s API does not use customer data submitted via the API to train their models. OpenAI&rsquo;s privacy policy: <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">https://openai.com/policies/privacy-policy</a></li>
            </ul>

            <h3>3.7 Opting Out of AI Processing</h3>
            <p>You may opt out of LISA&rsquo;s AI processing in the following ways:</p>
            <ul>
              <li><strong>Do Not Interact:</strong> LISA only processes messages that are directed at her or that meet certain trigger criteria. Avoiding direct interaction with LISA will minimize AI processing of your messages.</li>
              <li><strong>Request Memory Deletion:</strong> You may request deletion of your relationship memory data by contacting us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>. We will delete your stored relationship memory within 30 days of a verified request.</li>
              <li><strong>Platform Blocking:</strong> On most platforms, you can block LISA&rsquo;s bot account to prevent interactions.</li>
            </ul>

            <h3>3.8 AI-Generated Content Disclaimer</h3>
            <p>All of LISA&rsquo;s responses are generated by artificial intelligence. LISA&rsquo;s responses may be inaccurate, inappropriate, or nonsensical. LISA&rsquo;s statements do not represent the official views, opinions, or policies of Prozilli Entertainment or Widler Sanon. LISA is designed for entertainment purposes. Do not rely on LISA for factual information, medical advice, legal advice, financial advice, or any other professional guidance.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 4 */}
          <section id="oauth-platform-data">
            <h2>4. OAuth and Platform Data</h2>
            <p>Our Services allow you to connect third-party platform accounts via OAuth (Open Authorization). This section explains what happens when you link your accounts.</p>

            <h3>4.1 What OAuth Is</h3>
            <p>OAuth is an industry-standard authorization protocol that allows you to grant our Services limited access to your third-party accounts without sharing your password. When you click &ldquo;Connect&rdquo; for a platform, you are redirected to that platform&rsquo;s authorization page where you explicitly approve the permissions requested.</p>

            <h3>4.2 Tokens We Store</h3>
            <p>When you authorize a platform connection, we receive and store:</p>
            <ul>
              <li><strong>Access Tokens:</strong> Short-lived tokens that allow us to interact with the platform API on your behalf (e.g., reading your profile, posting in chat).</li>
              <li><strong>Refresh Tokens:</strong> Longer-lived tokens that allow us to obtain new access tokens without requiring you to re-authorize. Not all platforms provide refresh tokens.</li>
              <li><strong>Token Metadata:</strong> Expiration timestamps, token scopes (permissions granted), and the platform identifier.</li>
            </ul>

            <h3>4.3 Token Security</h3>
            <p>All OAuth tokens are encrypted at rest using <strong>AES-256-GCM encryption</strong> in our Cloudflare KV storage. Each encryption operation uses a unique random 12-byte initialization vector (IV). The encryption key is stored as a Cloudflare Worker secret and is never exposed in source code or logs. Tokens are transmitted exclusively over HTTPS/TLS.</p>

            <h3>4.4 Automatic Token Refresh</h3>
            <p>Our system automatically refreshes your OAuth tokens before they expire (typically 30 minutes before expiration) to maintain uninterrupted service. This process is fully automated and does not require any action on your part. You can revoke access at any time by disconnecting your account through our website or by revoking access through the third-party platform&rsquo;s settings.</p>

            <h3>4.5 Token Synchronization</h3>
            <p>Tokens stored in Cloudflare KV are synchronized to our PRISMAI backend system every 5 minutes for operational use. This synchronization occurs over encrypted channels between our Cloudflare Workers and our backend server infrastructure.</p>

            <h3>4.6 PKCE Security</h3>
            <p>For platforms that support it (Kick, X/Twitter, Instagram), we implement PKCE (Proof Key for Code Exchange) with S256 code challenge method. This provides an additional layer of security that prevents authorization code interception attacks, even if the authorization code is compromised during transmission.</p>

            <h3>4.7 Revoking Platform Access</h3>
            <p>You may revoke our access to any connected platform at any time by:</p>
            <ul>
              <li>Visiting the platform&rsquo;s authorized applications settings and removing Prozilli/PRISMAI.</li>
              <li>Contacting us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> to request disconnection and token deletion.</li>
            </ul>
            <p>Upon revocation, we will delete the associated tokens from our systems. Note that data already collected prior to revocation may be retained in accordance with our data retention policies.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 5 */}
          <section id="cookies-tracking">
            <h2>5. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to enhance your experience, analyze usage, and assist in our marketing efforts. For comprehensive details about the specific cookies we use, how to manage them, and your choices, please see our dedicated <a href="/cookies">Cookie Policy</a>.</p>

            <h3>5.1 Types of Technologies Used</h3>
            <ul>
              <li><strong>Cookies:</strong> Small text files placed on your device by your browser.</li>
              <li><strong>Local Storage:</strong> Browser-based storage for persistent data (e.g., theme preferences, cart data).</li>
              <li><strong>Session Storage:</strong> Browser-based storage for session-specific data that is cleared when you close your browser.</li>
              <li><strong>Pixel Tags / Web Beacons:</strong> Small transparent images used to track page views and email opens.</li>
              <li><strong>Embedded Content:</strong> Third-party embeds (Twitch player, YouTube player, Discord widgets) may set their own cookies and tracking technologies.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 6 */}
          <section id="third-party-services">
            <h2>6. Third-Party Services and Processors</h2>
            <p>We use the following third-party services to operate our platform. Each has its own privacy policy governing their use of your data:</p>

            <h3>6.1 Infrastructure and Hosting</h3>
            <table>
              <thead>
                <tr><th>Service</th><th>Purpose</th><th>Data Processed</th></tr>
              </thead>
              <tbody>
                <tr><td>Cloudflare</td><td>Website hosting (Pages), API hosting (Workers), CDN, DDoS protection, KV storage, analytics</td><td>IP addresses, request headers, page views, encrypted tokens</td></tr>
                <tr><td>Cybrancee</td><td>Backend server hosting (PRISMAI NodeJS and Python services)</td><td>Server-side application data, chat messages, user data in transit</td></tr>
                <tr><td>RocketNode</td><td>FiveM game server hosting</td><td>Player connection data, game state, character data</td></tr>
              </tbody>
            </table>

            <h3>6.2 AI and Machine Learning</h3>
            <table>
              <thead>
                <tr><th>Service</th><th>Purpose</th><th>Data Processed</th></tr>
              </thead>
              <tbody>
                <tr><td>Groq</td><td>Primary AI model provider for LISA chatbot (llama-3.3-70b-versatile)</td><td>Chat messages, conversation context, usernames</td></tr>
                <tr><td>OpenAI</td><td>Fallback AI model provider for LISA (GPT-4 Turbo), image generation (DALL-E 3)</td><td>Chat messages, conversation context, usernames, image prompts</td></tr>
                <tr><td>Leonardo AI</td><td>Video generation for auto-post content (Motion 2.0)</td><td>Image data, motion prompts (no user personal data)</td></tr>
              </tbody>
            </table>

            <h3>6.3 Streaming and Social Platforms</h3>
            <table>
              <thead>
                <tr><th>Service</th><th>Purpose</th><th>Data Processed</th></tr>
              </thead>
              <tbody>
                <tr><td>Twitch</td><td>Live streaming, chat, subscriptions, follows</td><td>OAuth tokens, user IDs, chat messages, sub/follow events</td></tr>
                <tr><td>YouTube / Google</td><td>Live streaming, chat, memberships, Shorts uploads</td><td>OAuth tokens, channel data, chat messages, video metadata</td></tr>
                <tr><td>Kick</td><td>Live streaming, chat, subscriptions</td><td>OAuth tokens, user IDs, chat messages, chatroom data</td></tr>
                <tr><td>Discord</td><td>Community server, bot interactions, role management</td><td>OAuth tokens, user IDs, messages, role data, server membership</td></tr>
                <tr><td>TikTok</td><td>Content posting, account connection</td><td>OAuth tokens, user IDs, video upload data</td></tr>
                <tr><td>X/Twitter</td><td>Content posting, account connection</td><td>OAuth tokens, user IDs, post data</td></tr>
                <tr><td>Instagram</td><td>Content posting, account connection</td><td>OAuth tokens, user IDs, media upload data</td></tr>
                <tr><td>Facebook</td><td>Content posting, page management, webhooks</td><td>OAuth tokens, page data, post data, webhook events</td></tr>
                <tr><td>Trovo</td><td>Live streaming, chat</td><td>OAuth tokens, user IDs, chat messages</td></tr>
              </tbody>
            </table>

            <h3>6.4 Payment Processors</h3>
            <table>
              <thead>
                <tr><th>Service</th><th>Purpose</th><th>Data Processed</th></tr>
              </thead>
              <tbody>
                <tr><td>Fourthwall</td><td>Merchandise store, order fulfillment, donations, subscriptions</td><td>Order data, shipping addresses, payment processing, webhook events</td></tr>
                <tr><td>Stripe</td><td>Payment processing</td><td>Payment card data (processed by Stripe, not stored by us), transaction data</td></tr>
                <tr><td>PayPal</td><td>Payment processing, tips</td><td>PayPal account data, transaction data</td></tr>
                <tr><td>Patreon</td><td>Membership/patronage platform</td><td>Patron data, pledge amounts, tier information</td></tr>
                <tr><td>StreamElements</td><td>Stream tips and alerts</td><td>Tip amounts, tipper usernames, tip messages</td></tr>
                <tr><td>Tebex</td><td>FiveM VIP package purchases</td><td>Transaction data, player identifiers, package information</td></tr>
              </tbody>
            </table>

            <h3>6.5 Analytics</h3>
            <table>
              <thead>
                <tr><th>Service</th><th>Purpose</th><th>Data Processed</th></tr>
              </thead>
              <tbody>
                <tr><td>Cloudflare Analytics</td><td>Privacy-focused website analytics</td><td>Page views, visitor counts, geographic data (aggregated)</td></tr>
                <tr><td>Google Analytics</td><td>Detailed website analytics</td><td>Page views, session data, user flow, demographics, device data</td></tr>
              </tbody>
            </table>

            <h3>6.6 Database</h3>
            <table>
              <thead>
                <tr><th>Service</th><th>Purpose</th><th>Data Processed</th></tr>
              </thead>
              <tbody>
                <tr><td>MySQL</td><td>Persistent data storage for PRISMAI and FiveM server</td><td>User profiles, chat logs, relationship memories, FiveM character data, transaction records, moderation logs</td></tr>
              </tbody>
            </table>

            <p>We encourage you to review the privacy policies of these third-party services. We are not responsible for the privacy practices of third-party services.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 7 */}
          <section id="data-sharing">
            <h2>7. Data Sharing and Disclosure</h2>

            <h3>7.1 We Do Not Sell Your Data</h3>
            <p><strong>We do not sell, rent, or trade your personal information to third parties for their marketing purposes.</strong> This applies to all categories of personal information we collect.</p>

            <h3>7.2 Circumstances Where We May Share Data</h3>
            <p>We may share your information in the following limited circumstances:</p>
            <ul>
              <li><strong>Service Providers and Processors:</strong> We share data with third-party service providers who perform services on our behalf (as listed in Section 6). These providers are contractually obligated to use your data only for the purposes we specify and in accordance with this Privacy Policy.</li>
              <li><strong>AI Model Providers:</strong> Chat messages and interaction context are shared with Groq and/or OpenAI for AI response generation, as described in Section 3.</li>
              <li><strong>Payment Processors:</strong> Transaction data is shared with payment processors to fulfill purchases and process payments.</li>
              <li><strong>Legal Requirements:</strong> We may disclose your information if required to do so by law, subpoena, court order, or other legal process, or if we believe in good faith that such disclosure is necessary to: (a) comply with applicable law; (b) protect our rights, property, or safety; (c) protect the rights, property, or safety of our users or the public; or (d) detect, prevent, or address fraud, security, or technical issues.</li>
              <li><strong>Business Transfers:</strong> In the event of a merger, acquisition, reorganization, bankruptcy, or sale of all or a portion of our assets, your personal information may be transferred as part of that transaction. We will notify you via prominent notice on our Services or by email of any change in ownership or uses of your personal information.</li>
              <li><strong>With Your Consent:</strong> We may share your information in other circumstances where you have provided explicit consent.</li>
              <li><strong>Aggregated or De-Identified Data:</strong> We may share aggregated or de-identified information that cannot reasonably be used to identify you, without restriction.</li>
            </ul>

            <h3>7.3 Cross-Platform Data Sharing</h3>
            <p>Our PRISMAI system operates as a central hub connecting multiple platforms. When you interact on one platform, certain data (such as your chat messages, username, and AI interaction data) may be processed centrally and used to inform your experience on other connected platforms. For example, if LISA learns your nickname on Twitch, she may use it when you chat on Discord. You may request that your cross-platform identity linking be severed by contacting us.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 8 */}
          <section id="data-retention">
            <h2>8. Data Retention</h2>
            <p>We retain your personal information for as long as necessary to fulfill the purposes described in this Privacy Policy, unless a longer retention period is required or permitted by law. The specific retention periods depend on the type of data:</p>

            <table>
              <thead>
                <tr><th>Data Type</th><th>Retention Period</th><th>Rationale</th></tr>
              </thead>
              <tbody>
                <tr><td>Account data</td><td>Duration of account existence + 30 days after deletion request</td><td>Service provision</td></tr>
                <tr><td>OAuth tokens</td><td>Until revoked, expired without refresh, or account deletion</td><td>Platform connectivity</td></tr>
                <tr><td>Chat messages (raw)</td><td>Up to 90 days</td><td>Moderation, analytics, AI context</td></tr>
                <tr><td>LISA relationship memory</td><td>Duration of account existence or until deletion requested</td><td>AI personalization</td></tr>
                <tr><td>FiveM character data</td><td>Duration of active play + 180 days of inactivity</td><td>Game server operation</td></tr>
                <tr><td>Transaction records</td><td>7 years</td><td>Tax and legal compliance</td></tr>
                <tr><td>Moderation/ban records</td><td>Permanent (for permanent bans) or 1 year (for temporary actions)</td><td>Community safety</td></tr>
                <tr><td>Server/access logs</td><td>30 days</td><td>Security and debugging</td></tr>
                <tr><td>Analytics data</td><td>26 months (Google Analytics default)</td><td>Business analytics</td></tr>
                <tr><td>Support correspondence</td><td>2 years after resolution</td><td>Service quality, legal protection</td></tr>
                <tr><td>Giveaway entries</td><td>90 days after giveaway conclusion</td><td>Verification and compliance</td></tr>
              </tbody>
            </table>

            <p>When data is no longer needed, it is securely deleted or anonymized. Anonymized data that cannot be used to identify you may be retained indefinitely for statistical and analytical purposes.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 9 */}
          <section id="data-security">
            <h2>9. Data Security</h2>
            <p>We implement robust technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.</p>

            <h3>9.1 Technical Measures</h3>
            <ul>
              <li><strong>Encryption at Rest:</strong> All OAuth tokens and sensitive credentials are encrypted using AES-256-GCM encryption with unique random initialization vectors (IVs) per encryption operation.</li>
              <li><strong>Encryption in Transit:</strong> All data transmitted between your browser and our servers, and between our internal services, is encrypted using TLS 1.2 or higher (HTTPS).</li>
              <li><strong>Access Controls:</strong> Access to personal data is restricted to authorized personnel and systems on a need-to-know basis. Administrative access requires authentication.</li>
              <li><strong>API Security:</strong> Internal API communications are secured with API keys, webhook signature verification (HMAC-SHA256), and IP-based access controls where applicable.</li>
              <li><strong>Circuit Breakers:</strong> Our systems implement circuit breaker patterns to prevent cascading failures and ensure resilience against external service outages.</li>
              <li><strong>DDoS Protection:</strong> Cloudflare provides enterprise-grade DDoS protection for all web-facing services.</li>
              <li><strong>Webhook Verification:</strong> All incoming webhooks from third-party platforms are cryptographically verified using platform-specific signature methods (HMAC-SHA256 for Twitch, Fourthwall, Stripe; HMAC-MD5 for Patreon; API verification for PayPal).</li>
              <li><strong>PKCE:</strong> OAuth flows for Kick, X/Twitter, and Instagram implement PKCE (S256) to prevent authorization code interception.</li>
            </ul>

            <h3>9.2 Organizational Measures</h3>
            <ul>
              <li>Regular review of data processing activities and security measures.</li>
              <li>Limitation of data access to personnel who require it for their functions.</li>
              <li>Secure development practices, including input validation, SQL injection prevention, and rate limiting.</li>
              <li>Incident response procedures for data breaches (see Section 9.3).</li>
            </ul>

            <h3>9.3 Data Breach Notification</h3>
            <p>In the event of a data breach that is likely to result in a risk to your rights and freedoms, we will:</p>
            <ul>
              <li>Notify affected users without undue delay, and in any event within 72 hours of becoming aware of the breach (as required by GDPR for EEA/UK users).</li>
              <li>Notify applicable supervisory authorities as required by law.</li>
              <li>Provide information about the nature of the breach, the data affected, the likely consequences, and the measures taken or proposed to address the breach.</li>
              <li>For California residents, provide notification in accordance with California Civil Code Section 1798.82.</li>
            </ul>

            <h3>9.4 No Guarantee</h3>
            <p>While we strive to use commercially acceptable means to protect your personal information, no method of transmission over the Internet or method of electronic storage is 100% secure. We cannot guarantee absolute security of your data.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 10 */}
          <section id="international-transfers">
            <h2>10. International Data Transfers</h2>
            <p>Prozilli Entertainment is based in the United States. If you access our Services from outside the United States, please be aware that your information may be transferred to, stored, and processed in the United States and other countries where our service providers operate.</p>

            <h3>10.1 Transfer Mechanisms</h3>
            <p>For transfers of personal data from the EEA, UK, or Switzerland to the United States or other countries that have not received an adequacy decision from the European Commission, we rely on:</p>
            <ul>
              <li><strong>Standard Contractual Clauses (SCCs):</strong> Where applicable, we use EU-approved Standard Contractual Clauses as the legal mechanism for data transfers.</li>
              <li><strong>Data Privacy Framework:</strong> Where our processors have certified under the EU-U.S. Data Privacy Framework, the UK Extension, or the Swiss-U.S. Data Privacy Framework, we rely on that certification.</li>
              <li><strong>Consent:</strong> In certain circumstances, we may rely on your explicit consent for data transfers.</li>
              <li><strong>Contractual Necessity:</strong> Where transfers are necessary for the performance of our contract with you.</li>
            </ul>

            <h3>10.2 Cloudflare Global Network</h3>
            <p>Our websites are served through Cloudflare&rsquo;s global CDN, which means your requests may be processed at Cloudflare edge nodes in various countries. Cloudflare is committed to data protection and maintains certifications including ISO 27001 and SOC 2 Type II.</p>

            <h3>10.3 AI Provider Locations</h3>
            <p>Groq and OpenAI primarily process data in the United States. By interacting with LISA, you acknowledge that your chat messages will be processed in the United States regardless of your location.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 11 */}
          <section id="gdpr-rights">
            <h2>11. Your Rights Under GDPR (EEA/UK Users)</h2>
            <p>If you are located in the European Economic Area (EEA) or the United Kingdom, you have the following rights under the General Data Protection Regulation (GDPR) and the UK GDPR:</p>

            <h3>11.1 Right of Access (Article 15)</h3>
            <p>You have the right to request a copy of the personal data we hold about you. We will provide this information in a structured, commonly used, and machine-readable format within 30 days of your request.</p>

            <h3>11.2 Right to Rectification (Article 16)</h3>
            <p>You have the right to request correction of inaccurate personal data and to have incomplete personal data completed.</p>

            <h3>11.3 Right to Erasure / Right to Be Forgotten (Article 17)</h3>
            <p>You have the right to request deletion of your personal data when:</p>
            <ul>
              <li>The data is no longer necessary for the purposes for which it was collected.</li>
              <li>You withdraw consent and there is no other legal basis for processing.</li>
              <li>You object to processing and there are no overriding legitimate grounds.</li>
              <li>The data has been unlawfully processed.</li>
              <li>The data must be erased to comply with a legal obligation.</li>
            </ul>
            <p>Note: This right is not absolute. We may retain data where processing is necessary for compliance with legal obligations, establishment or defense of legal claims, or for archival purposes in the public interest.</p>

            <h3>11.4 Right to Restriction of Processing (Article 18)</h3>
            <p>You have the right to request restriction of processing when:</p>
            <ul>
              <li>You contest the accuracy of your data (restriction applies during verification).</li>
              <li>Processing is unlawful and you prefer restriction over erasure.</li>
              <li>We no longer need the data but you need it for legal claims.</li>
              <li>You have objected to processing pending verification of legitimate grounds.</li>
            </ul>

            <h3>11.5 Right to Data Portability (Article 20)</h3>
            <p>You have the right to receive your personal data in a structured, commonly used, and machine-readable format (e.g., JSON or CSV) and to transmit that data to another controller without hindrance, where processing is based on consent or contract performance and is carried out by automated means.</p>

            <h3>11.6 Right to Object (Article 21)</h3>
            <p>You have the right to object to processing of your personal data based on legitimate interests or for direct marketing purposes. Where you object, we will cease processing unless we can demonstrate compelling legitimate grounds that override your interests, rights, and freedoms.</p>

            <h3>11.7 Rights Related to Automated Decision-Making (Article 22)</h3>
            <p>You have the right not to be subject to a decision based solely on automated processing, including profiling, which produces legal effects or similarly significantly affects you. Our AI systems (LISA, moderation) may use automated processing, but these do not produce legal effects. Automated moderation decisions (e.g., chat timeouts) can always be appealed to a human moderator.</p>

            <h3>11.8 Right to Withdraw Consent</h3>
            <p>Where we process your data based on consent, you have the right to withdraw that consent at any time. Withdrawal of consent does not affect the lawfulness of processing carried out before withdrawal.</p>

            <h3>11.9 Right to Lodge a Complaint</h3>
            <p>You have the right to lodge a complaint with a supervisory authority in your member state of habitual residence, place of work, or place of alleged infringement. A list of EEA supervisory authorities is available at: <a href="https://edpb.europa.eu/about-edpb/about-edpb/members_en" target="_blank" rel="noopener noreferrer">https://edpb.europa.eu/about-edpb/about-edpb/members_en</a></p>

            <h3>11.10 How to Exercise Your Rights</h3>
            <p>To exercise any of these rights, please contact us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> with the subject line &ldquo;GDPR Request.&rdquo; We will respond to your request within 30 days. We may need to verify your identity before processing your request. We will not charge a fee for processing your request unless the request is manifestly unfounded or excessive.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 12 */}
          <section id="ccpa-rights">
            <h2>12. Your Rights Under CCPA (California Residents)</h2>
            <p>If you are a California resident, you have the following rights under the California Consumer Privacy Act (CCPA) as amended by the California Privacy Rights Act (CPRA):</p>

            <h3>12.1 Right to Know</h3>
            <p>You have the right to request that we disclose:</p>
            <ul>
              <li>The categories of personal information we have collected about you.</li>
              <li>The categories of sources from which we collected personal information.</li>
              <li>The business or commercial purpose for collecting or selling personal information.</li>
              <li>The categories of third parties with whom we share personal information.</li>
              <li>The specific pieces of personal information we have collected about you.</li>
            </ul>

            <h3>12.2 Right to Delete</h3>
            <p>You have the right to request that we delete personal information we have collected from you, subject to certain exceptions (e.g., completing a transaction, security, legal obligations, internal uses compatible with your expectations).</p>

            <h3>12.3 Right to Correct</h3>
            <p>You have the right to request that we correct inaccurate personal information that we maintain about you.</p>

            <h3>12.4 Right to Opt-Out of Sale or Sharing</h3>
            <p><strong>We do not sell your personal information.</strong> We do not share your personal information for cross-context behavioral advertising. Therefore, there is no need to opt out. However, if our practices change, we will provide a clear &ldquo;Do Not Sell or Share My Personal Information&rdquo; link on our website.</p>

            <h3>12.5 Right to Limit Use of Sensitive Personal Information</h3>
            <p>To the extent we process sensitive personal information (as defined by CCPA), you have the right to limit its use to purposes that are necessary to provide our Services.</p>

            <h3>12.6 Right to Non-Discrimination</h3>
            <p>We will not discriminate against you for exercising any of your CCPA rights. We will not deny you goods or services, charge you different prices, provide a different level or quality of goods or services, or suggest that you will receive a different price or quality for exercising your rights.</p>

            <h3>12.7 Authorized Agents</h3>
            <p>You may designate an authorized agent to make a CCPA request on your behalf. We may require verification of the agent&rsquo;s authorization and your identity.</p>

            <h3>12.8 Categories of Personal Information Collected</h3>
            <p>In the preceding 12 months, we have collected the following categories of personal information as defined by the CCPA:</p>
            <ul>
              <li><strong>Identifiers:</strong> Name, email address, username, platform user IDs, IP address, Discord ID, FiveM license ID, Steam ID.</li>
              <li><strong>Commercial Information:</strong> Purchase history, products or services purchased, transaction data.</li>
              <li><strong>Internet or Electronic Network Activity:</strong> Browsing history on our sites, search history, interaction with our websites and ads, chat messages, streaming viewing data.</li>
              <li><strong>Geolocation Data:</strong> Approximate location derived from IP address (country/city level).</li>
              <li><strong>Inferences:</strong> Preferences, characteristics, behavior patterns drawn from collected data (e.g., LISA relationship memory, content recommendations).</li>
              <li><strong>Sensitive Personal Information:</strong> Account login credentials (processed via OAuth, not stored in plaintext).</li>
            </ul>

            <h3>12.9 How to Exercise Your Rights</h3>
            <p>To exercise your CCPA rights, please contact us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> with the subject line &ldquo;CCPA Request.&rdquo; We will respond within 45 days. You may also submit a request by mail to the address listed in Section 17.</p>

            <h3>12.10 Verification</h3>
            <p>We will verify your identity before fulfilling your request by matching information you provide with information we have on file. For requests to know specific pieces of personal information, we will apply a heightened verification standard.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 13 */}
          <section id="coppa-compliance">
            <h2>13. Children&rsquo;s Privacy (COPPA Compliance)</h2>

            <h3>13.1 Age Requirement</h3>
            <p>Our Services are not directed to children under the age of 13. <strong>We do not knowingly collect personal information from children under 13 years of age.</strong> If you are under 13, you may not use our Services, create an account, interact with LISA, play on our FiveM server, or provide any personal information to us.</p>

            <h3>13.2 Age Restrictions for Specific Features</h3>
            <ul>
              <li><strong>General Use (13+):</strong> Users must be at least 13 years old to use our websites, view streams, and participate in chat.</li>
              <li><strong>FiveM Server (18+):</strong> The ZO Syndicate RP FiveM server contains mature content (violence, criminal roleplay, adult themes). Users must be at least 18 years old to play on our FiveM server.</li>
              <li><strong>Purchases (18+ or parental consent):</strong> Users under 18 must have parental or guardian consent to make purchases through our Services.</li>
              <li><strong>AI Interactions (13+):</strong> Users must be at least 13 to interact with LISA and other AI systems.</li>
            </ul>

            <h3>13.3 Parental Rights</h3>
            <p>If you are a parent or guardian and believe your child under 13 has provided us with personal information, please contact us immediately at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>. We will take steps to delete such information from our systems within 30 days.</p>

            <h3>13.4 Discovery of Underage Users</h3>
            <p>If we discover that we have collected personal information from a child under 13, we will promptly delete that information and terminate any associated account. If we discover a user is between 13 and 18 and has accessed age-restricted content without appropriate consent, we may restrict their account to age-appropriate features.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 14 */}
          <section id="do-not-track">
            <h2>14. Do Not Track Signals</h2>
            <p>Some web browsers transmit &ldquo;Do Not Track&rdquo; (DNT) signals to websites. Because there is no universally accepted standard for how to respond to DNT signals, our websites do not currently respond to DNT signals. However, you can manage your cookie and tracking preferences as described in our <a href="/cookies">Cookie Policy</a>.</p>

            <h3>14.1 Global Privacy Control (GPC)</h3>
            <p>We recognize and honor Global Privacy Control (GPC) signals as a valid opt-out mechanism under applicable privacy laws including the CCPA. If your browser sends a GPC signal, we will treat it as a request to opt out of the sale or sharing of your personal information.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 15 */}
          <section id="state-specific">
            <h2>15. Additional State-Specific Disclosures</h2>

            <h3>15.1 Virginia (VCDPA)</h3>
            <p>Virginia residents have the right to access, correct, delete, obtain a copy of, and opt out of the processing of personal data for targeted advertising, sale, or profiling. To exercise these rights, contact us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>. You may appeal our decision regarding your request within 30 days.</p>

            <h3>15.2 Colorado (CPA)</h3>
            <p>Colorado residents have similar rights to access, correct, delete, and obtain a portable copy of their personal data, and to opt out of targeted advertising, sale, or profiling. Contact us to exercise these rights.</p>

            <h3>15.3 Connecticut (CTDPA)</h3>
            <p>Connecticut residents have rights to access, correct, delete, obtain, and opt out of sale, targeted advertising, and profiling. Contact us to exercise these rights.</p>

            <h3>15.4 Nevada</h3>
            <p>Nevada residents may opt out of the sale of personal information. We do not currently sell personal information as defined by Nevada law. If you wish to submit an opt-out request, contact us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 16 */}
          <section id="changes">
            <h2>16. Changes to This Privacy Policy</h2>
            <p>We may update this Privacy Policy from time to time to reflect changes in our practices, technologies, legal requirements, or other factors. When we make material changes, we will:</p>
            <ul>
              <li>Update the &ldquo;Last Updated&rdquo; date at the top of this page.</li>
              <li>Provide prominent notice on our websites (e.g., a banner or pop-up notification).</li>
              <li>Send an email notification to registered users where we have email addresses on file (for material changes that significantly affect your rights).</li>
              <li>Post an announcement in our Discord community.</li>
            </ul>
            <p>Your continued use of our Services after the effective date of a revised Privacy Policy constitutes your acceptance of the revised Privacy Policy. If you do not agree with the changes, you should discontinue use of our Services and request deletion of your data.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 17 */}
          <section id="contact">
            <h2>17. Contact Information</h2>
            <p>If you have questions, concerns, or requests regarding this Privacy Policy or our data practices, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
              <li><strong>Entity:</strong> Prozilli Entertainment (Widler Sanon, Sole Proprietor)</li>
              <li><strong>Websites:</strong> <a href="https://prozilligaming.com" target="_blank" rel="noopener noreferrer">prozilligaming.com</a> | <a href="https://prozilli.com" target="_blank" rel="noopener noreferrer">prozilli.com</a></li>
              <li><strong>Discord:</strong> ZO Syndicate Discord server (support channel)</li>
            </ul>
            <p>For GDPR-related inquiries, please include &ldquo;GDPR&rdquo; in the subject line of your email. For CCPA-related inquiries, please include &ldquo;CCPA&rdquo; in the subject line. We will respond to all privacy inquiries within 30 days.</p>

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
