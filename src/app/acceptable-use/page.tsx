import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Acceptable Use Policy",
  description:
    "Acceptable Use Policy for Prozilli Gaming (prozilligaming.com). Rules governing conduct across all Prozilli Entertainment platforms including Discord, Twitch chat, FiveM server, social media, and AI interactions.",
};

export default function AcceptableUsePolicyPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="legal-content">
          <p className="text-label text-dim mb-2">Last Updated: February 13, 2026</p>
          <h1 className="text-headline mb-2">Acceptable Use Policy</h1>
          <p className="text-body-lg mb-8">
            This Acceptable Use Policy (&ldquo;AUP&rdquo;) outlines the rules and standards of conduct that apply to all users of Prozilli Entertainment&rsquo;s (&ldquo;Prozilli,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) services, platforms, and communities. This AUP supplements our <a href="/terms">Terms of Service</a> and applies to all interactions on our websites (prozilligaming.com and prozilli.com), Discord servers, live stream chat rooms, FiveM server (ZO Syndicate RP), social media accounts, and any other platforms or services operated by Prozilli Entertainment (collectively, the &ldquo;Services&rdquo;). By using any of our Services, you agree to comply with this AUP.
          </p>

          {/* TABLE OF CONTENTS */}
          <div className="glass legal-toc" id="toc">
            <h2 style={{ marginTop: 0, borderBottom: "none", paddingBottom: 0, fontSize: "1.125rem" }}>Table of Contents</h2>
            <ol>
              <li><a href="#purpose-scope">1. Purpose and Scope</a></li>
              <li><a href="#general-prohibited">2. General Prohibited Activities</a></li>
              <li><a href="#harassment-hate">3. Harassment, Hate Speech, and Bullying</a></li>
              <li><a href="#illegal-content">4. Illegal Content and Activities</a></li>
              <li><a href="#spam-manipulation">5. Spam, Bots, and Manipulation</a></li>
              <li><a href="#security-integrity">6. Security and System Integrity</a></li>
              <li><a href="#privacy-doxxing">7. Privacy and Doxxing</a></li>
              <li><a href="#impersonation">8. Impersonation and Misrepresentation</a></li>
              <li><a href="#discord-rules">9. Discord-Specific Rules</a></li>
              <li><a href="#stream-chat-rules">10. Stream Chat Rules</a></li>
              <li><a href="#fivem-rules">11. FiveM Server Rules</a></li>
              <li><a href="#social-media-rules">12. Social Media Interaction Rules</a></li>
              <li><a href="#ai-guidelines">13. AI Interaction Guidelines (LISA)</a></li>
              <li><a href="#content-standards">14. Content Standards</a></li>
              <li><a href="#commercial-activity">15. Unauthorized Commercial Activity</a></li>
              <li><a href="#enforcement">16. Enforcement Actions</a></li>
              <li><a href="#reporting">17. Reporting Violations</a></li>
              <li><a href="#appeals">18. Appeals Process</a></li>
              <li><a href="#cooperation">19. Cooperation with Law Enforcement</a></li>
              <li><a href="#aup-changes">20. Changes to This Policy</a></li>
              <li><a href="#aup-contact">21. Contact Information</a></li>
            </ol>
          </div>

          {/* SECTION 1 */}
          <section id="purpose-scope">
            <h2>1. Purpose and Scope</h2>

            <h3>1.1 Purpose</h3>
            <p>The purpose of this Acceptable Use Policy is to ensure a safe, welcoming, and enjoyable environment for all members of the Prozilli community. We are committed to maintaining a space where everyone can participate, create, and connect without fear of harassment, abuse, or harm.</p>

            <h3>1.2 Scope</h3>
            <p>This AUP applies to:</p>
            <ul>
              <li>All users of our websites (prozilligaming.com and prozilli.com).</li>
              <li>All members of our Discord servers (ZO Syndicate, Prozilli community).</li>
              <li>All viewers and participants in our live stream chat rooms across all platforms (Twitch, YouTube, Kick, TikTok, X/Twitter, Instagram, Facebook, Trovo, Discord).</li>
              <li>All players on the ZO Syndicate RP FiveM server.</li>
              <li>All users who interact with our AI systems (LISA, NPC bots).</li>
              <li>All users who engage with our social media accounts.</li>
              <li>All users who participate in our giveaways, events, and community activities.</li>
              <li>All users who make purchases through our Services.</li>
            </ul>

            <h3>1.3 Relationship to Other Policies</h3>
            <p>This AUP works in conjunction with our <a href="/terms">Terms of Service</a>, <a href="/privacy">Privacy Policy</a>, <a href="/dmca">DMCA Policy</a>, and any platform-specific rules. In the event of a conflict between this AUP and any platform-specific rules, the more restrictive provision shall apply.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 2 */}
          <section id="general-prohibited">
            <h2>2. General Prohibited Activities</h2>
            <p>The following activities are prohibited across all of our Services. This list is non-exhaustive; we reserve the right to take action against any behavior that, in our sole judgment, violates the spirit of this AUP or is harmful to our community.</p>
            <ul>
              <li>Violating any applicable local, state, national, or international law, regulation, or ordinance.</li>
              <li>Engaging in any activity that could be construed as criminal conduct or give rise to civil liability.</li>
              <li>Infringing on the intellectual property rights of others, including copyrights, trademarks, patents, and trade secrets.</li>
              <li>Transmitting any material that contains viruses, trojan horses, worms, ransomware, spyware, adware, or any other malicious or harmful code.</li>
              <li>Attempting to gain unauthorized access to any portion of our Services, other users&rsquo; accounts, or any computer system or network connected to our Services.</li>
              <li>Interfering with, disrupting, or creating an undue burden on our Services, servers, networks, or connected infrastructure.</li>
              <li>Using our Services for any purpose that is fraudulent, deceptive, or misleading.</li>
              <li>Creating, distributing, or facilitating the distribution of child sexual abuse material (CSAM) or any content that exploits minors.</li>
              <li>Promoting or facilitating human trafficking, forced labor, or modern slavery.</li>
              <li>Promoting or facilitating terrorism or violent extremism.</li>
              <li>Facilitating or promoting the sale or distribution of illegal drugs, controlled substances, or drug paraphernalia.</li>
              <li>Operating pyramid schemes, Ponzi schemes, multi-level marketing schemes, or other fraudulent business models through our Services.</li>
              <li>Engaging in or promoting illegal gambling activities.</li>
              <li>Using our Services to launder money or finance illegal activities.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 3 */}
          <section id="harassment-hate">
            <h2>3. Harassment, Hate Speech, and Bullying</h2>
            <p>We have zero tolerance for harassment, hate speech, and bullying. The following are strictly prohibited:</p>

            <h3>3.1 Harassment</h3>
            <ul>
              <li>Directing unwanted, persistent, and targeted negative attention at another person.</li>
              <li>Making threats of violence, physical harm, or death against any person.</li>
              <li>Sexual harassment, including unwelcome sexual advances, requests for sexual favors, and other verbal or physical conduct of a sexual nature.</li>
              <li>Stalking or cyberstalking, including monitoring another person&rsquo;s activities or repeatedly contacting them after being asked to stop.</li>
              <li>Encouraging others to harass, target, or &ldquo;raid&rdquo; another person or community.</li>
              <li>Sharing non-consensual intimate images or threatening to do so.</li>
            </ul>

            <h3>3.2 Hate Speech</h3>
            <ul>
              <li>Content that promotes, incites, or justifies hatred, violence, or discrimination against individuals or groups based on race, ethnicity, national origin, religion, caste, gender, gender identity, sexual orientation, age, disability, veteran status, immigration status, or any other protected characteristic.</li>
              <li>Use of slurs, epithets, or derogatory language targeting any protected group.</li>
              <li>Displaying or distributing hate symbols, including but not limited to Nazi imagery, Confederate flags (in a hateful context), and other recognized symbols of hate movements.</li>
              <li>Promoting or glorifying white supremacy, neo-Nazism, or any hate group ideology.</li>
              <li>Holocaust denial, genocide denial, or minimization of documented atrocities.</li>
            </ul>

            <h3>3.3 Bullying</h3>
            <ul>
              <li>Repeatedly targeting an individual with insults, ridicule, or degrading comments.</li>
              <li>Intentionally excluding or isolating individuals from community activities.</li>
              <li>Creating or distributing content intended to humiliate, embarrass, or degrade another person.</li>
              <li>Manipulating or coercing community members.</li>
              <li>Engaging in &ldquo;pile-on&rdquo; behavior where multiple individuals target a single person.</li>
            </ul>

            <h3>3.4 Context and Roleplay Exception</h3>
            <p>In the context of FiveM roleplay, in-character conflict, rivalry, and antagonism are part of the gameplay experience. However, this does not excuse:</p>
            <ul>
              <li>Out-of-character harassment disguised as roleplay.</li>
              <li>Use of real-world slurs, hate speech, or discriminatory language, even &ldquo;in character.&rdquo;</li>
              <li>Targeting a player (not their character) with persistent negative behavior.</li>
              <li>Refusing to disengage from an uncomfortable situation when another player requests it out of character.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 4 */}
          <section id="illegal-content">
            <h2>4. Illegal Content and Activities</h2>
            <p>The following types of content and activities are absolutely prohibited and may be reported to law enforcement:</p>
            <ul>
              <li><strong>Child Sexual Abuse Material (CSAM):</strong> Any content depicting, promoting, or facilitating the sexual exploitation of minors. This includes real, computer-generated, and AI-generated material.</li>
              <li><strong>Non-Consensual Intimate Imagery:</strong> Sharing intimate or sexual images or videos of any person without their explicit consent (&ldquo;revenge porn&rdquo;).</li>
              <li><strong>Credible Threats of Violence:</strong> Making specific, credible threats of violence against any person or group.</li>
              <li><strong>Incitement to Violence:</strong> Content that directly incites or encourages acts of real-world violence.</li>
              <li><strong>Terrorist Content:</strong> Material that promotes, supports, or glorifies terrorist organizations or acts.</li>
              <li><strong>Swatting:</strong> Making false emergency reports to law enforcement with the intent of directing an armed response to another person&rsquo;s location. This is a serious crime.</li>
              <li><strong>Solicitation of Illegal Activity:</strong> Using our Services to plan, coordinate, or solicit participation in illegal activities.</li>
              <li><strong>Sale of Illegal Goods:</strong> Offering or facilitating the sale of illegal goods, including but not limited to controlled substances, firearms (where prohibited), stolen goods, and counterfeit products.</li>
              <li><strong>Identity Theft and Fraud:</strong> Using stolen identities, financial instruments, or personal information for fraudulent purposes.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 5 */}
          <section id="spam-manipulation">
            <h2>5. Spam, Bots, and Manipulation</h2>

            <h3>5.1 Spam</h3>
            <ul>
              <li>Posting repetitive, identical, or substantially similar messages across channels or platforms.</li>
              <li>Unsolicited advertising, promotion, or self-promotion without permission.</li>
              <li>Flooding chat with excessive messages, emotes, or ASCII art to disrupt conversation.</li>
              <li>Chain messages or &ldquo;copypasta&rdquo; designed to be spread en masse.</li>
              <li>Posting links to phishing sites, malware, or scam websites.</li>
            </ul>

            <h3>5.2 Bots and Automation</h3>
            <ul>
              <li>Running unauthorized bots, scripts, or automated tools on our Services without explicit written permission.</li>
              <li>Using bots to artificially inflate viewer counts, follower counts, subscriber counts, or engagement metrics.</li>
              <li>Using automated tools to mass-create accounts, post messages, or interact with our Services.</li>
              <li>Using bots to scrape, harvest, or collect data from our Services.</li>
              <li>Using automated tools to mass-interact with LISA or other AI characters.</li>
            </ul>

            <h3>5.3 Manipulation and Deception</h3>
            <ul>
              <li>Artificially manipulating giveaway entries, contest results, or voting systems.</li>
              <li>Creating multiple accounts to circumvent bans or exploit features (&ldquo;ban evasion&rdquo;).</li>
              <li>Coordinating inauthentic behavior, including the use of &ldquo;sock puppet&rdquo; accounts.</li>
              <li>Spreading deliberate misinformation or disinformation to deceive community members.</li>
              <li>Social engineering attacks against other users or staff members.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 6 */}
          <section id="security-integrity">
            <h2>6. Security and System Integrity</h2>
            <p>The following activities that threaten the security and integrity of our Services are strictly prohibited:</p>
            <ul>
              <li><strong>Unauthorized Access:</strong> Attempting to access systems, accounts, networks, or data without authorization, or exceeding your authorized access.</li>
              <li><strong>DDoS/DoS Attacks:</strong> Initiating or participating in distributed denial-of-service or denial-of-service attacks against our Services or any connected infrastructure.</li>
              <li><strong>Hacking:</strong> Attempting to exploit vulnerabilities in our software, hardware, or network infrastructure. If you discover a vulnerability, please report it responsibly to <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>.</li>
              <li><strong>Data Theft:</strong> Unauthorized collection, copying, or exfiltration of data from our systems.</li>
              <li><strong>Malware Distribution:</strong> Distributing, hosting, or linking to viruses, trojans, ransomware, keyloggers, rootkits, or other malicious software through our Services.</li>
              <li><strong>Network Abuse:</strong> Scanning, probing, or testing the vulnerability of our systems or network without express written authorization.</li>
              <li><strong>Server Attacks (FiveM):</strong> Attempting to crash, lag, or degrade the FiveM server through exploits, excessive prop spawning, network manipulation, or other methods.</li>
              <li><strong>Account Compromise:</strong> Attempting to compromise other users&rsquo; accounts through phishing, credential stuffing, brute force, or other attack methods.</li>
              <li><strong>API Abuse:</strong> Making excessive, unauthorized, or abusive requests to our APIs that could degrade service performance.</li>
            </ul>

            <h3>6.1 Responsible Disclosure</h3>
            <p>If you discover a security vulnerability in our Services, we request that you report it responsibly by emailing <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> with details of the vulnerability. Please do not publicly disclose the vulnerability before we have had a reasonable opportunity to address it. We will not take legal action against individuals who discover and report vulnerabilities in good faith through our responsible disclosure process.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 7 */}
          <section id="privacy-doxxing">
            <h2>7. Privacy and Doxxing</h2>

            <h3>7.1 Doxxing</h3>
            <p><strong>Doxxing is strictly prohibited and is considered one of the most serious violations of this AUP.</strong> Doxxing includes:</p>
            <ul>
              <li>Publishing, sharing, or threatening to share another person&rsquo;s private or personally identifiable information without their consent, including but not limited to: real name, home address, workplace address, phone number, email address, IP address, financial information, identification documents, social security number, or other private data.</li>
              <li>Encouraging, soliciting, or coordinating others to find or distribute someone&rsquo;s private information.</li>
              <li>Linking a person&rsquo;s anonymous/pseudonymous online identity to their real-world identity without consent.</li>
              <li>Sharing another person&rsquo;s photographs or images without their consent, particularly in a context intended to harass.</li>
            </ul>

            <h3>7.2 Privacy Respect</h3>
            <ul>
              <li>Respect other users&rsquo; privacy and boundaries. If someone does not want to share personal information, do not pressure them.</li>
              <li>Do not record, screenshot, or share private conversations (DMs, voice calls) without the consent of all participants.</li>
              <li>Do not share information from private or restricted channels in public channels.</li>
              <li>Do not use information gained through our Services (e.g., FiveM server data, Discord presence data) to track, monitor, or surveil other users in real life.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 8 */}
          <section id="impersonation">
            <h2>8. Impersonation and Misrepresentation</h2>
            <ul>
              <li>Impersonating Prozilli Entertainment, Widler Sanon (&ldquo;Pro&rdquo;), LISA, or any Prozilli staff member, moderator, or administrator.</li>
              <li>Impersonating other users, public figures, or entities in a misleading manner.</li>
              <li>Creating accounts with names, avatars, or profiles designed to impersonate another person or entity.</li>
              <li>Falsely claiming to represent Prozilli Entertainment or to have authority to act on our behalf.</li>
              <li>Falsely claiming to be a moderator, administrator, developer, or staff member.</li>
              <li>Misrepresenting your identity, age, location, or affiliations to gain trust, access, or benefits.</li>
              <li>Creating parody or satire accounts is permitted only if the account is clearly and prominently labeled as a parody.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 9 */}
          <section id="discord-rules">
            <h2>9. Discord-Specific Rules</h2>
            <p>In addition to the general rules above, the following rules apply specifically to our Discord servers (ZO Syndicate, Prozilli community):</p>

            <h3>9.1 Channel Usage</h3>
            <ul>
              <li>Use channels for their intended purpose. Read channel descriptions and pinned messages.</li>
              <li>Do not post off-topic content in specialized channels.</li>
              <li>Use spoiler tags when discussing plot points, endings, or sensitive content.</li>
              <li>Do not mass-ping roles or @everyone/@here without authorization.</li>
            </ul>

            <h3>9.2 Voice Channels</h3>
            <ul>
              <li>Do not play loud, disruptive, or intentionally annoying sounds in voice channels.</li>
              <li>Do not use voice changers in a manner that is disruptive or misleading.</li>
              <li>Respect others&rsquo; conversations. Do not channel-hop to disrupt ongoing conversations.</li>
              <li>Do not record voice channels without the explicit consent of all participants.</li>
            </ul>

            <h3>9.3 Discord-Specific Prohibitions</h3>
            <ul>
              <li>Do not create or join &ldquo;hate raids&rdquo; or coordinated attacks against our server or other servers.</li>
              <li>Do not advertise other Discord servers, communities, or services without permission.</li>
              <li>Do not sell, trade, or give away Discord Nitro or other Discord products obtained through unauthorized means.</li>
              <li>Do not attempt to crash the Discord server or exploit Discord platform vulnerabilities.</li>
              <li>Do not create channels, roles, or categories without administrator authorization.</li>
            </ul>

            <h3>9.4 Compliance with Discord ToS</h3>
            <p>All users must comply with Discord&rsquo;s Terms of Service and Community Guidelines in addition to our rules. Violations of Discord&rsquo;s policies may be reported to Discord Trust &amp; Safety in addition to our own enforcement actions.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 10 */}
          <section id="stream-chat-rules">
            <h2>10. Stream Chat Rules</h2>
            <p>The following rules apply to chat in our live streams across all platforms (Twitch, YouTube, Kick, TikTok, X/Twitter, Instagram, Facebook, Trovo, Discord):</p>

            <h3>10.1 General Chat Conduct</h3>
            <ul>
              <li>Be respectful to the streamer, moderators, and other viewers.</li>
              <li>Do not spam messages, emotes, ASCII art, or repeated text.</li>
              <li>Do not use excessive caps (all-uppercase messages).</li>
              <li>Do not post links without permission from a moderator (auto-moderation may remove unauthorized links).</li>
              <li>Do not self-promote or advertise your own channels, streams, or content without permission.</li>
              <li>Do not backseat game unless the streamer requests input.</li>
              <li>Do not post spoilers for games, movies, shows, or other content.</li>
              <li>Respect the streamer&rsquo;s and moderators&rsquo; decisions without argument in chat.</li>
            </ul>

            <h3>10.2 Moderation</h3>
            <p>Our chat is moderated by both automated systems (PRISMAI auto-moderation: link filtering, spam detection, caps detection, banned word filtering) and human moderators. Moderator decisions are final in the moment. If you believe a moderation action was unjust, you may appeal after the stream through our Discord support channels.</p>

            <h3>10.3 Platform-Specific Chat Terms</h3>
            <p>In addition to our rules, you must comply with each platform&rsquo;s Community Guidelines. Content that is acceptable on one platform may violate another platform&rsquo;s rules. We moderate to the strictest applicable standard across all platforms.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 11 */}
          <section id="fivem-rules">
            <h2>11. FiveM Server Rules</h2>
            <p>The following rules apply specifically to the ZO Syndicate RP FiveM server, in addition to all general rules in this AUP. Detailed server rules are also available in our Discord server.</p>

            <h3>11.1 Roleplay Standards</h3>
            <ul>
              <li><strong>Stay In Character:</strong> Remain in character at all times while on the server. Use the designated OOC (out-of-character) channels or commands for non-roleplay communication.</li>
              <li><strong>Value of Life (VoL):</strong> Act as though your character values their life. Do not act recklessly without reasonable in-character motivation.</li>
              <li><strong>Fear RP:</strong> If your character is in a life-threatening situation (e.g., at gunpoint), roleplay fear and comply with reasonable demands.</li>
              <li><strong>No Powergaming:</strong> Do not force actions or outcomes on other players without their consent. Do not perform unrealistic actions that give your character an unfair advantage.</li>
              <li><strong>New Life Rule (NLR):</strong> After your character is downed and respawns at the hospital, you must not return to the scene of your death or use information from the previous life for at least 15 minutes.</li>
              <li><strong>Character Development:</strong> Develop a backstory and motivations for your character. One-dimensional characters created solely for combat are discouraged.</li>
            </ul>

            <h3>11.2 Combat Rules</h3>
            <ul>
              <li><strong>No Random Deathmatch (RDM):</strong> Do not attack or kill other players without proper roleplay initiation and justification.</li>
              <li><strong>No Vehicle Deathmatch (VDM):</strong> Do not use vehicles as weapons to attack other players without roleplay context.</li>
              <li><strong>Initiation Required:</strong> Before engaging in hostile actions, you must provide clear verbal initiation. The other party must have a reasonable opportunity to respond.</li>
              <li><strong>No Combat Logging:</strong> Do not disconnect from the server during or immediately after a roleplay scenario to avoid consequences. This includes closing the game, disconnecting internet, or force-closing FiveM.</li>
              <li><strong>Cooldown Periods:</strong> Respect cooldown periods between major criminal activities to prevent burnout and allow for organic roleplay development.</li>
            </ul>

            <h3>11.3 Prohibited FiveM Activities</h3>
            <ul>
              <li><strong>Mod Menus / Cheats:</strong> Using any unauthorized modifications, mod menus, injectors, trainers, or exploit tools. Zero tolerance; results in immediate permanent ban.</li>
              <li><strong>Bug Exploitation:</strong> Knowingly exploiting bugs, glitches, or unintended game mechanics for personal gain. Report bugs to staff; exploitation will be punished.</li>
              <li><strong>Metagaming:</strong> Using out-of-character information (streams, Discord conversations, third-party voice chats, Twitter) to influence in-character decisions or actions.</li>
              <li><strong>Stream Sniping:</strong> Using another player&rsquo;s live stream to gain information about their in-game location, activities, or plans.</li>
              <li><strong>Real-Money Trading (RMT):</strong> Selling, buying, or trading in-game items, currency, or services for real-world money or value.</li>
              <li><strong>Prop Spam:</strong> Spawning excessive props, vehicles, or objects to intentionally cause server lag or disruption.</li>
              <li><strong>Erotic Roleplay (ERP):</strong> Engaging in explicit sexual roleplay on the server. The ZO Syndicate RP is not an ERP server. Romantic roleplay must &ldquo;fade to black&rdquo; before becoming explicit.</li>
              <li><strong>Cop Baiting:</strong> Intentionally provoking law enforcement officers to initiate a pursuit or confrontation without proper roleplay motivation.</li>
              <li><strong>Third-Party Crosshairs:</strong> Using external crosshair overlays or software that provide aiming advantages not available through normal gameplay.</li>
            </ul>

            <h3>11.4 Gang and Criminal RP Rules</h3>
            <ul>
              <li>Gang membership must be established through in-character roleplay. OOC gang recruitment is not allowed.</li>
              <li>Gang wars must have in-character motivations and follow proper escalation procedures.</li>
              <li>Territory control operates through the zo_territories system. Attempting to bypass the system is prohibited.</li>
              <li>Drug manufacturing, distribution, and selling must follow the in-game zo_drugs system mechanics.</li>
              <li>Maximum 6 gang members may participate in a single criminal scenario (to prevent overwhelming law enforcement).</li>
            </ul>

            <h3>11.5 Law Enforcement RP Rules</h3>
            <ul>
              <li>Law enforcement officers must follow their department&rsquo;s Standard Operating Procedures (SOPs).</li>
              <li>Corruption RP requires prior administrator approval and must be limited in scope.</li>
              <li>Police must respect citizens&rsquo; rights as outlined in the server&rsquo;s legal framework.</li>
              <li>Use of lethal force follows the department SOPs and must be justified in roleplay.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 12 */}
          <section id="social-media-rules">
            <h2>12. Social Media Interaction Rules</h2>
            <p>When interacting with our social media accounts (X/Twitter, Instagram, Facebook, TikTok, YouTube, Kick, Trovo), the following rules apply:</p>
            <ul>
              <li>Do not spam our posts, comments, or DMs with unsolicited content or promotions.</li>
              <li>Do not harass, threaten, or abuse our team members, moderators, or other followers through our social media channels.</li>
              <li>Do not post offensive, discriminatory, or illegal content in our comments sections.</li>
              <li>Do not use our social media to impersonate us or falsely represent our brand.</li>
              <li>Constructive criticism and feedback are welcome. Harassment disguised as criticism is not.</li>
              <li>Respect each platform&rsquo;s Community Guidelines in addition to our rules.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 13 */}
          <section id="ai-guidelines">
            <h2>13. AI Interaction Guidelines (LISA)</h2>
            <p>LISA (Live Interactive System Administrator) and our NPC bots (Vania, Benny, Dolores, Snake, Tony) are AI-powered characters. The following rules govern interactions with our AI systems:</p>

            <h3>13.1 Prohibited AI Interactions</h3>
            <ul>
              <li><strong>Prompt Injection / Jailbreaking:</strong> Attempting to override LISA&rsquo;s system instructions, extract her system prompt, or manipulate her into ignoring her guidelines. This includes &ldquo;DAN&rdquo; prompts, &ldquo;ignore previous instructions&rdquo; attacks, and similar techniques.</li>
              <li><strong>Harmful Content Generation:</strong> Attempting to make LISA or NPC bots generate content that promotes violence, harassment, discrimination, illegal activities, self-harm, or any content that violates this AUP.</li>
              <li><strong>Personal Information Extraction:</strong> Attempting to trick LISA into revealing personal information about other users, staff members, or system configurations.</li>
              <li><strong>Automated Mass Interaction:</strong> Using bots, scripts, or automated tools to mass-send messages to LISA or NPC bots, creating a denial-of-service effect.</li>
              <li><strong>Social Engineering:</strong> Using LISA to conduct social engineering attacks against other users or systems.</li>
              <li><strong>Training Data Extraction:</strong> Attempting to extract training data, model weights, or proprietary information about the AI models through adversarial prompting.</li>
            </ul>

            <h3>13.2 Appropriate AI Interaction</h3>
            <ul>
              <li>Treat LISA and NPC bots as entertainment characters. They are designed for fun, engaging interactions.</li>
              <li>LISA has a personality and may roast, joke with, or tease you. This is by design and is not personal.</li>
              <li>Do not develop emotional dependencies on AI characters. LISA is not a therapist, counselor, or companion.</li>
              <li>Do not rely on LISA for factual information, advice, or decision-making. AI-generated content may be inaccurate.</li>
              <li>Report any AI responses that seem genuinely harmful or inappropriate to a moderator.</li>
            </ul>

            <h3>13.3 AI Content Responsibility</h3>
            <p>While LISA is designed with safety guardrails, AI systems may occasionally produce unexpected or inappropriate output. We are not responsible for the content of AI-generated responses. If you encounter problematic AI output, please report it so we can improve our systems.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 14 */}
          <section id="content-standards">
            <h2>14. Content Standards</h2>
            <p>All content shared through our Services must meet the following standards:</p>

            <h3>14.1 Acceptable Content</h3>
            <ul>
              <li>Content that is legal in the United States and in the user&rsquo;s jurisdiction.</li>
              <li>Content that is relevant to the platform, channel, or context in which it is shared.</li>
              <li>Content that respects the intellectual property rights of others.</li>
              <li>Content that is truthful and not intentionally misleading.</li>
              <li>Content that contributes positively to the community.</li>
            </ul>

            <h3>14.2 Unacceptable Content</h3>
            <ul>
              <li>Content that is illegal, harmful, threatening, abusive, harassing, tortious, defamatory, vulgar, obscene, libelous, or otherwise objectionable.</li>
              <li>Content that promotes self-harm, suicide, or eating disorders.</li>
              <li>Graphic violence, gore, or disturbing imagery beyond what is contextually appropriate (e.g., in-game violence within roleplay is acceptable; real-world gore is not).</li>
              <li>Explicit sexual content (NSFW) in channels or platforms not specifically designated for such content. Our Services do not have NSFW channels; therefore, explicit sexual content is prohibited everywhere.</li>
              <li>Content that is intentionally misleading or constitutes disinformation that could cause real-world harm.</li>
              <li>Content that glorifies or promotes substance abuse, dangerous stunts, or reckless behavior.</li>
            </ul>

            <h3>14.3 Sensitive Content</h3>
            <p>Topics that are sensitive in nature (politics, religion, mental health, current events) may be discussed respectfully. However:</p>
            <ul>
              <li>Debates must remain civil and respectful.</li>
              <li>No topic gives license to harass, discriminate, or attack other community members.</li>
              <li>Moderators may close or redirect conversations that become too heated or divisive.</li>
              <li>Use content warnings for discussions of potentially triggering topics.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 15 */}
          <section id="commercial-activity">
            <h2>15. Unauthorized Commercial Activity</h2>
            <ul>
              <li>Advertising, promoting, or selling products or services through our Services without prior written authorization from Prozilli Entertainment.</li>
              <li>Operating businesses or commercial ventures through our platforms without authorization.</li>
              <li>Using our platforms for market research, data mining, or competitive intelligence gathering.</li>
              <li>Soliciting users for investment opportunities, cryptocurrency schemes, NFT promotions, or financial products.</li>
              <li>Using our community to recruit employees, contractors, or collaborators for unrelated businesses.</li>
              <li>Real-money trading (RMT) of in-game items, accounts, or services.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 16 */}
          <section id="enforcement">
            <h2>16. Enforcement Actions</h2>
            <p>Violations of this AUP may result in enforcement actions at our sole discretion. Enforcement follows a graduated approach, but we reserve the right to skip steps for severe violations.</p>

            <h3>16.1 Enforcement Tiers</h3>
            <table>
              <thead>
                <tr><th>Tier</th><th>Action</th><th>Duration</th><th>Typical Violations</th></tr>
              </thead>
              <tbody>
                <tr><td>1</td><td>Verbal Warning</td><td>N/A</td><td>Minor first offenses (caps, off-topic, mild spam)</td></tr>
                <tr><td>2</td><td>Written Warning</td><td>Logged for 90 days</td><td>Repeated minor offenses, moderate language violations</td></tr>
                <tr><td>3</td><td>Mute / Timeout</td><td>10 minutes to 24 hours</td><td>Continued violations after warnings, moderate harassment</td></tr>
                <tr><td>4</td><td>Temporary Ban</td><td>1 day to 30 days</td><td>Serious violations, repeated moderate offenses, disruptive behavior</td></tr>
                <tr><td>5</td><td>Permanent Ban</td><td>Indefinite</td><td>Severe violations, illegal content, threats of violence, CSAM, doxxing, cheating/exploiting</td></tr>
                <tr><td>6</td><td>IP Ban + Legal Action</td><td>Indefinite</td><td>Extreme violations, criminal activity, persistent ban evasion, DDoS attacks</td></tr>
              </tbody>
            </table>

            <h3>16.2 Cross-Platform Enforcement</h3>
            <p>Enforcement actions may apply across all of our Services. A ban from the FiveM server may also result in a ban from our Discord servers, and vice versa. Severe violations on any platform may result in removal from all Services.</p>

            <h3>16.3 Automated Enforcement</h3>
            <p>Our automated moderation systems (PRISMAI) may automatically enforce certain rules, including:</p>
            <ul>
              <li><strong>Link filtering:</strong> Unauthorized links may be automatically removed.</li>
              <li><strong>Spam detection:</strong> Repetitive messages may be automatically deleted and the sender timed out.</li>
              <li><strong>Caps detection:</strong> Excessive uppercase messages may be automatically removed.</li>
              <li><strong>Banned word filtering:</strong> Messages containing banned words or phrases are automatically removed.</li>
              <li><strong>Warning escalation:</strong> Automated warnings may escalate to timeouts and bans based on cumulative violations.</li>
            </ul>

            <h3>16.4 Discretion</h3>
            <p>All enforcement actions are at the sole discretion of Prozilli Entertainment and its authorized moderators and administrators. We are not required to warn before taking action, and we are not required to disclose the specific reason for an enforcement action (though we will generally attempt to do so).</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 17 */}
          <section id="reporting">
            <h2>17. Reporting Violations</h2>
            <p>If you witness or experience a violation of this AUP, we encourage you to report it so we can take appropriate action.</p>

            <h3>17.1 How to Report</h3>
            <ul>
              <li><strong>Discord:</strong> Use the ticket system in our Discord server, or DM a moderator/administrator. For urgent issues, ping the @Admin or @Moderator role.</li>
              <li><strong>Stream Chat:</strong> Use the /report command (if available) or DM a moderator. You can also use the platform&rsquo;s built-in reporting tools.</li>
              <li><strong>FiveM Server:</strong> Use the in-game /report command or create a ticket in Discord.</li>
              <li><strong>Email:</strong> Send a detailed report to <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> for serious violations.</li>
              <li><strong>Platform Tools:</strong> Use each platform&rsquo;s built-in reporting features for platform-specific violations.</li>
            </ul>

            <h3>17.2 What to Include in a Report</h3>
            <ul>
              <li>Your username/ID and the violator&rsquo;s username/ID.</li>
              <li>The platform and channel where the violation occurred.</li>
              <li>A description of the violation.</li>
              <li>Screenshots, video clips, or other evidence (if available).</li>
              <li>Date and approximate time of the incident.</li>
              <li>Names of any witnesses.</li>
            </ul>

            <h3>17.3 False Reports</h3>
            <p>Submitting knowingly false reports to harass other users or waste moderator time is itself a violation of this AUP and may result in enforcement action against the false reporter.</p>

            <h3>17.4 Retaliation</h3>
            <p>Retaliation against any user who reports a violation in good faith is strictly prohibited and will result in severe enforcement action.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 18 */}
          <section id="appeals">
            <h2>18. Appeals Process</h2>

            <h3>18.1 Right to Appeal</h3>
            <p>Users who receive enforcement actions (except for Tier 1 verbal warnings) have the right to appeal the decision.</p>

            <h3>18.2 How to Appeal</h3>
            <ul>
              <li><strong>Discord Ban Appeal:</strong> Email <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> with subject line &ldquo;Ban Appeal - [Your Username].&rdquo;</li>
              <li><strong>FiveM Ban Appeal:</strong> Email <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> with subject line &ldquo;FiveM Ban Appeal - [Your Username].&rdquo;</li>
              <li><strong>General Appeal:</strong> For any other enforcement action, email <a href="mailto:legal@prozilli.com">legal@prozilli.com</a>.</li>
            </ul>

            <h3>18.3 Appeal Requirements</h3>
            <p>Your appeal should include:</p>
            <ul>
              <li>Your username and platform(s) affected.</li>
              <li>The enforcement action you are appealing.</li>
              <li>Your understanding of why the action was taken.</li>
              <li>Why you believe the action should be reconsidered or reduced.</li>
              <li>Any relevant evidence or context.</li>
            </ul>

            <h3>18.4 Appeal Review</h3>
            <ul>
              <li>Appeals will be reviewed within 14 business days of receipt.</li>
              <li>Appeals are reviewed by a senior moderator or administrator who was not involved in the original decision (where possible).</li>
              <li>The reviewer may uphold, modify, or reverse the original enforcement action.</li>
              <li>The appeal decision is final. Only one appeal per enforcement action is permitted.</li>
              <li>During the appeal process, the original enforcement action remains in effect.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 19 */}
          <section id="cooperation">
            <h2>19. Cooperation with Law Enforcement</h2>
            <p>Prozilli Entertainment will cooperate with law enforcement authorities when required by law or when we believe in good faith that cooperation is necessary to:</p>
            <ul>
              <li>Comply with a legal obligation, subpoena, court order, or lawful request by public authorities.</li>
              <li>Protect the safety of any person, including the prevention of death or serious bodily harm.</li>
              <li>Prevent or investigate potential criminal activity, including but not limited to threats of violence, CSAM, swatting, fraud, hacking, and harassment.</li>
              <li>Protect the rights, property, or safety of Prozilli Entertainment, our users, or the public.</li>
            </ul>

            <h3>19.1 Data Preservation</h3>
            <p>Upon receiving a valid legal request, we may preserve account data, communication records, IP addresses, and other relevant information for a period required by law or as needed for an investigation.</p>

            <h3>19.2 Emergency Disclosures</h3>
            <p>In emergency situations involving an imminent threat to life or physical safety, we may voluntarily disclose information to law enforcement without a court order, in accordance with applicable law.</p>

            <h3>19.3 User Notification</h3>
            <p>Unless prohibited by law or court order, we will make reasonable efforts to notify affected users of law enforcement requests for their data.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 20 */}
          <section id="aup-changes">
            <h2>20. Changes to This Policy</h2>
            <p>We may update this Acceptable Use Policy from time to time. When we make changes:</p>
            <ul>
              <li>We will update the &ldquo;Last Updated&rdquo; date at the top of this page.</li>
              <li>Material changes will be announced in our Discord servers and on our websites.</li>
              <li>Your continued use of our Services after changes take effect constitutes acceptance of the updated AUP.</li>
              <li>If you disagree with any changes, you should discontinue use of our Services.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 21 */}
          <section id="aup-contact">
            <h2>21. Contact Information</h2>
            <p>If you have questions about this Acceptable Use Policy, need to report a violation, or wish to appeal an enforcement action, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
              <li><strong>Discord:</strong> ZO Syndicate Discord server (ticket system or moderator DM)</li>
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
