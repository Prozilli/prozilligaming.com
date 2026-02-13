import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Cookie Policy",
  description:
    "Cookie Policy for Prozilli Gaming (prozilligaming.com). Learn about the cookies, local storage, and tracking technologies we use, how to manage them, and your choices.",
};

export default function CookiePolicyPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="legal-content">
          <p className="text-label text-dim mb-2">Last Updated: February 13, 2026</p>
          <h1 className="text-headline mb-2">Cookie Policy</h1>
          <p className="text-body-lg mb-8">
            This Cookie Policy explains how Prozilli Entertainment (&ldquo;Prozilli,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) uses cookies, local storage, session storage, and similar tracking technologies on our websites (prozilligaming.com and prozilli.com) and related services (collectively, the &ldquo;Services&rdquo;). This policy should be read in conjunction with our <a href="/privacy">Privacy Policy</a>.
          </p>

          {/* TABLE OF CONTENTS */}
          <div className="glass legal-toc" id="toc">
            <h2 style={{ marginTop: 0, borderBottom: "none", paddingBottom: 0, fontSize: "1.125rem" }}>Table of Contents</h2>
            <ol>
              <li><a href="#what-are-cookies">1. What Are Cookies?</a></li>
              <li><a href="#types-of-cookies">2. Types of Cookies We Use</a></li>
              <li><a href="#specific-cookies">3. Specific Cookies and Technologies</a></li>
              <li><a href="#local-storage">4. Local Storage and Session Storage</a></li>
              <li><a href="#third-party-cookies">5. Third-Party Cookies and Embeds</a></li>
              <li><a href="#managing-cookies">6. How to Manage Cookies</a></li>
              <li><a href="#impact-disabling">7. Impact of Disabling Cookies</a></li>
              <li><a href="#do-not-track">8. Do Not Track and Global Privacy Control</a></li>
              <li><a href="#third-party-policies">9. Third-Party Cookie Policies</a></li>
              <li><a href="#cookie-changes">10. Updates to This Cookie Policy</a></li>
              <li><a href="#cookie-contact">11. Contact Information</a></li>
            </ol>
          </div>

          {/* SECTION 1 */}
          <section id="what-are-cookies">
            <h2>1. What Are Cookies?</h2>
            <p>Cookies are small text files that are stored on your device (computer, tablet, or smartphone) when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and give website operators information about how their sites are used.</p>

            <h3>1.1 How Cookies Work</h3>
            <p>When you visit our website, our web server sends a cookie to your browser, which stores it on your device. When you return to the site, your browser sends the cookie back to the server, allowing the site to recognize you and remember your preferences, login status, and other settings.</p>

            <h3>1.2 Cookie Lifespan</h3>
            <ul>
              <li><strong>Session Cookies:</strong> Temporary cookies that are erased when you close your browser. They are used to maintain your session while you navigate through the site.</li>
              <li><strong>Persistent Cookies:</strong> Cookies that remain on your device for a set period of time or until you manually delete them. They are used to remember your preferences and settings across visits.</li>
            </ul>

            <h3>1.3 Cookie Origin</h3>
            <ul>
              <li><strong>First-Party Cookies:</strong> Set by the website you are visiting (prozilligaming.com or prozilli.com).</li>
              <li><strong>Third-Party Cookies:</strong> Set by a domain other than the one you are visiting. These are typically set by embedded content, analytics services, or advertising networks.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 2 */}
          <section id="types-of-cookies">
            <h2>2. Types of Cookies We Use</h2>

            <h3>2.1 Strictly Necessary / Essential Cookies</h3>
            <p>These cookies are essential for the operation of our websites. They enable core functionality such as security, session management, and accessibility. Without these cookies, certain Services cannot function properly. These cookies do not require your consent under most privacy laws because they are strictly necessary for the service you have requested.</p>
            <ul>
              <li>Session identification and authentication.</li>
              <li>CSRF (Cross-Site Request Forgery) protection tokens.</li>
              <li>Load balancing and server routing.</li>
              <li>Cookie consent preferences storage.</li>
              <li>Security headers and protection mechanisms.</li>
            </ul>

            <h3>2.2 Functional / Preference Cookies</h3>
            <p>These cookies allow our websites to remember choices you make (such as your preferred theme, language, or region) and provide enhanced, more personalized features. They may be set by us or by third-party providers whose services we have added to our pages.</p>
            <ul>
              <li>Theme preferences (dark/light mode, if applicable).</li>
              <li>Language and locale preferences.</li>
              <li>Volume and player settings for embedded media.</li>
              <li>Layout and display preferences.</li>
              <li>Notification preferences and dismissal state.</li>
            </ul>

            <h3>2.3 Analytics / Performance Cookies</h3>
            <p>These cookies help us understand how visitors interact with our websites by collecting and reporting information about page views, navigation paths, time spent on pages, and other usage metrics. All information collected by these cookies is aggregated or pseudonymized and is used solely to improve our Services.</p>
            <ul>
              <li>Google Analytics: page views, session duration, user flow, bounce rate, demographics, device data.</li>
              <li>Cloudflare Analytics: visitor counts, page views, geographic distribution, performance metrics.</li>
              <li>Internal analytics: feature usage tracking, error reporting.</li>
            </ul>

            <h3>2.4 Marketing / Advertising Cookies</h3>
            <p>As of the effective date of this policy, we do not use marketing or advertising cookies on our websites. We do not serve third-party advertisements. If this changes in the future, we will update this Cookie Policy and obtain appropriate consent where required by law.</p>

            <h3>2.5 Social Media / Embed Cookies</h3>
            <p>Our websites contain embedded content from third-party platforms (Twitch, YouTube, Discord). These embeds may set their own cookies when you interact with them. See Section 5 for details on third-party embed cookies.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 3 */}
          <section id="specific-cookies">
            <h2>3. Specific Cookies and Technologies</h2>
            <p>The following table lists the specific cookies and tracking technologies used on our websites. This list is periodically reviewed and updated.</p>

            <h3>3.1 Essential Cookies</h3>
            <table>
              <thead>
                <tr><th>Cookie Name</th><th>Provider</th><th>Purpose</th><th>Duration</th><th>Type</th></tr>
              </thead>
              <tbody>
                <tr><td>__cf_bm</td><td>Cloudflare</td><td>Bot management and detection — distinguishes humans from bots</td><td>30 minutes</td><td>Session</td></tr>
                <tr><td>__cflb</td><td>Cloudflare</td><td>Load balancer cookie for distributing traffic to healthy servers</td><td>Session</td><td>Session</td></tr>
                <tr><td>cf_clearance</td><td>Cloudflare</td><td>Stores proof of challenge completion (CAPTCHA/JS challenge)</td><td>30 minutes</td><td>Session</td></tr>
                <tr><td>__cf_logged_in</td><td>Cloudflare</td><td>Identifies authenticated sessions for Cloudflare Access</td><td>Session</td><td>Session</td></tr>
                <tr><td>cookie_consent</td><td>First-party</td><td>Stores your cookie consent preferences</td><td>1 year</td><td>Persistent</td></tr>
              </tbody>
            </table>

            <h3>3.2 Functional Cookies</h3>
            <table>
              <thead>
                <tr><th>Cookie Name</th><th>Provider</th><th>Purpose</th><th>Duration</th><th>Type</th></tr>
              </thead>
              <tbody>
                <tr><td>theme</td><td>First-party</td><td>Stores user&rsquo;s preferred theme (dark/light)</td><td>1 year</td><td>Persistent</td></tr>
                <tr><td>locale</td><td>First-party</td><td>Stores user&rsquo;s preferred language/locale</td><td>1 year</td><td>Persistent</td></tr>
                <tr><td>volume</td><td>First-party</td><td>Stores user&rsquo;s preferred media player volume</td><td>1 year</td><td>Persistent</td></tr>
                <tr><td>dismissed_notices</td><td>First-party</td><td>Tracks which notification banners have been dismissed</td><td>30 days</td><td>Persistent</td></tr>
              </tbody>
            </table>

            <h3>3.3 Analytics Cookies</h3>
            <table>
              <thead>
                <tr><th>Cookie Name</th><th>Provider</th><th>Purpose</th><th>Duration</th><th>Type</th></tr>
              </thead>
              <tbody>
                <tr><td>_ga</td><td>Google Analytics</td><td>Distinguishes unique users by assigning a randomly generated ID</td><td>2 years</td><td>Persistent</td></tr>
                <tr><td>_ga_*</td><td>Google Analytics</td><td>Used by GA4 to persist session state</td><td>2 years</td><td>Persistent</td></tr>
                <tr><td>_gid</td><td>Google Analytics</td><td>Distinguishes unique users for the current day</td><td>24 hours</td><td>Persistent</td></tr>
                <tr><td>_gat</td><td>Google Analytics</td><td>Throttles request rate to Google Analytics</td><td>1 minute</td><td>Session</td></tr>
                <tr><td>_gcl_au</td><td>Google</td><td>Stores conversion data for Google Ads (if applicable)</td><td>90 days</td><td>Persistent</td></tr>
              </tbody>
            </table>

            <h3>3.4 Third-Party Embed Cookies</h3>
            <table>
              <thead>
                <tr><th>Cookie Name</th><th>Provider</th><th>Purpose</th><th>Duration</th><th>Type</th></tr>
              </thead>
              <tbody>
                <tr><td>Various Twitch cookies</td><td>Twitch</td><td>Required for Twitch player embed functionality, authentication, and viewing preferences</td><td>Varies</td><td>Varies</td></tr>
                <tr><td>VISITOR_INFO1_LIVE</td><td>YouTube</td><td>Estimates bandwidth for YouTube embedded player</td><td>180 days</td><td>Persistent</td></tr>
                <tr><td>YSC</td><td>YouTube</td><td>Registers a unique ID to keep statistics of YouTube videos viewed</td><td>Session</td><td>Session</td></tr>
                <tr><td>CONSENT</td><td>YouTube/Google</td><td>Stores cookie consent state for Google services</td><td>2 years</td><td>Persistent</td></tr>
                <tr><td>Various Discord cookies</td><td>Discord</td><td>Required for Discord widget embed functionality</td><td>Varies</td><td>Varies</td></tr>
                <tr><td>Various Fourthwall cookies</td><td>Fourthwall</td><td>Shopping cart persistence, checkout session management</td><td>Varies</td><td>Varies</td></tr>
              </tbody>
            </table>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 4 */}
          <section id="local-storage">
            <h2>4. Local Storage and Session Storage</h2>
            <p>In addition to cookies, we use browser local storage and session storage to store data on your device. These technologies work similarly to cookies but can store larger amounts of data and have different persistence behaviors.</p>

            <h3>4.1 Local Storage (Persistent)</h3>
            <p>Data stored in local storage persists until explicitly deleted by you or by our code. We use local storage for:</p>
            <table>
              <thead>
                <tr><th>Key</th><th>Purpose</th><th>Data Stored</th></tr>
              </thead>
              <tbody>
                <tr><td>theme-preference</td><td>UI theme selection</td><td>Theme identifier (e.g., &ldquo;dark&rdquo;, &ldquo;light&rdquo;)</td></tr>
                <tr><td>cart-data</td><td>Shopping cart persistence</td><td>Cart item IDs, quantities, and cart session ID for Fourthwall integration</td></tr>
                <tr><td>stream-preferences</td><td>Streaming player settings</td><td>Preferred platform, volume, quality settings</td></tr>
                <tr><td>notification-state</td><td>Notification tracking</td><td>Dismissed notification IDs and timestamps</td></tr>
                <tr><td>oauth-state</td><td>OAuth security</td><td>Temporary state parameter for OAuth flow verification (cleared after use)</td></tr>
                <tr><td>schedule-timezone</td><td>Schedule display</td><td>User&rsquo;s preferred timezone for schedule display</td></tr>
              </tbody>
            </table>

            <h3>4.2 Session Storage (Temporary)</h3>
            <p>Data stored in session storage is automatically deleted when you close the browser tab. We use session storage for:</p>
            <table>
              <thead>
                <tr><th>Key</th><th>Purpose</th><th>Data Stored</th></tr>
              </thead>
              <tbody>
                <tr><td>current-page-state</td><td>Navigation state</td><td>Scroll position, active tab, filter selections</td></tr>
                <tr><td>form-data</td><td>Form preservation</td><td>Partially completed form data to prevent loss on accidental navigation</td></tr>
                <tr><td>auth-redirect</td><td>Login redirect</td><td>URL to redirect to after successful authentication</td></tr>
                <tr><td>sse-connection</td><td>Server-Sent Events</td><td>Connection state for live stream data updates</td></tr>
              </tbody>
            </table>

            <h3>4.3 Clearing Local and Session Storage</h3>
            <p>You can clear local storage and session storage through your browser&rsquo;s developer tools or settings. The exact steps vary by browser:</p>
            <ul>
              <li><strong>Chrome:</strong> Settings &rarr; Privacy and security &rarr; Clear browsing data &rarr; Check &ldquo;Cookies and other site data&rdquo; (this also clears local storage)</li>
              <li><strong>Firefox:</strong> Settings &rarr; Privacy &amp; Security &rarr; Cookies and Site Data &rarr; Clear Data</li>
              <li><strong>Safari:</strong> Preferences &rarr; Privacy &rarr; Manage Website Data &rarr; Remove</li>
              <li><strong>Edge:</strong> Settings &rarr; Privacy, search, and services &rarr; Clear browsing data</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 5 */}
          <section id="third-party-cookies">
            <h2>5. Third-Party Cookies and Embeds</h2>
            <p>Our websites embed content from third-party services. When you interact with these embeds, the third-party service may set cookies on your device. We do not control these cookies and cannot access them.</p>

            <h3>5.1 Twitch Embeds</h3>
            <p>Our /watch page embeds the Twitch player for live stream viewing. When you load the Twitch embed, Twitch may set cookies for player functionality, viewing preferences, authentication (if you are logged into Twitch), and analytics. These cookies are governed by Twitch&rsquo;s Cookie Policy.</p>

            <h3>5.2 YouTube Embeds</h3>
            <p>We may embed YouTube videos and live streams. YouTube (Google) sets cookies for video playback, quality preferences, viewing history (if you are logged into Google), and analytics. We use the privacy-enhanced mode (youtube-nocookie.com) where possible to minimize tracking.</p>

            <h3>5.3 Discord Widgets</h3>
            <p>Our website may include Discord server widgets showing online member counts and server information. Discord may set cookies for widget functionality and analytics.</p>

            <h3>5.4 Fourthwall Shopping</h3>
            <p>Our /shop page integrates with Fourthwall for merchandise. Fourthwall may set cookies for shopping cart management, checkout session handling, and payment processing. These cookies are essential for the shopping experience.</p>

            <h3>5.5 Controlling Third-Party Cookies</h3>
            <p>You can control third-party cookies through your browser settings. Be aware that blocking third-party cookies may affect the functionality of embedded content (e.g., the Twitch player may not work correctly, the shop cart may not persist).</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 6 */}
          <section id="managing-cookies">
            <h2>6. How to Manage Cookies</h2>
            <p>You have several options for managing cookies on our websites.</p>

            <h3>6.1 Browser Settings</h3>
            <p>Most web browsers allow you to control cookies through their settings. You can typically:</p>
            <ul>
              <li>View what cookies are stored on your device.</li>
              <li>Delete individual cookies or all cookies.</li>
              <li>Block all cookies or only third-party cookies.</li>
              <li>Set your browser to notify you when a cookie is set.</li>
              <li>Set your browser to refuse cookies by default.</li>
            </ul>
            <p>Browser-specific instructions:</p>
            <ul>
              <li><strong>Google Chrome:</strong> <a href="https://support.google.com/chrome/answer/95647" target="_blank" rel="noopener noreferrer">Manage cookies in Chrome</a></li>
              <li><strong>Mozilla Firefox:</strong> <a href="https://support.mozilla.org/en-US/kb/clear-cookies-and-site-data-firefox" target="_blank" rel="noopener noreferrer">Clear cookies in Firefox</a></li>
              <li><strong>Apple Safari:</strong> <a href="https://support.apple.com/guide/safari/manage-cookies-sfri11471/mac" target="_blank" rel="noopener noreferrer">Manage cookies in Safari</a></li>
              <li><strong>Microsoft Edge:</strong> <a href="https://support.microsoft.com/en-us/microsoft-edge/delete-cookies-in-microsoft-edge-63947406-40ac-c3b8-57b9-2a946a29ae09" target="_blank" rel="noopener noreferrer">Delete cookies in Edge</a></li>
            </ul>

            <h3>6.2 Google Analytics Opt-Out</h3>
            <p>You can opt out of Google Analytics tracking by installing the <a href="https://tools.google.com/dlpage/gaoptout" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>. This add-on prevents Google Analytics JavaScript from sharing information with Google Analytics about visit activity.</p>

            <h3>6.3 Opt-Out Tools</h3>
            <ul>
              <li><strong>Network Advertising Initiative:</strong> <a href="https://optout.networkadvertising.org/" target="_blank" rel="noopener noreferrer">NAI opt-out page</a></li>
              <li><strong>Digital Advertising Alliance:</strong> <a href="https://optout.aboutads.info/" target="_blank" rel="noopener noreferrer">DAA opt-out page</a></li>
              <li><strong>European Interactive Digital Advertising Alliance:</strong> <a href="https://www.youronlinechoices.com/" target="_blank" rel="noopener noreferrer">EDAA opt-out page</a></li>
            </ul>

            <h3>6.4 Mobile Devices</h3>
            <p>On mobile devices, you can manage cookies and tracking through your device settings:</p>
            <ul>
              <li><strong>iOS:</strong> Settings &rarr; Safari &rarr; Block All Cookies (or Privacy &amp; Security settings).</li>
              <li><strong>Android:</strong> Chrome app &rarr; Settings &rarr; Site Settings &rarr; Cookies.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 7 */}
          <section id="impact-disabling">
            <h2>7. Impact of Disabling Cookies</h2>
            <p>If you choose to disable or block cookies, some features of our websites may not function properly. Specifically:</p>

            <table>
              <thead>
                <tr><th>Feature</th><th>Impact if Cookies Disabled</th></tr>
              </thead>
              <tbody>
                <tr><td>Authentication / Login</td><td>You may be unable to log in or stay logged in. OAuth flows may fail.</td></tr>
                <tr><td>Theme / Preferences</td><td>Your preferences will not be remembered between visits.</td></tr>
                <tr><td>Shopping Cart</td><td>Cart items may not persist between pages or sessions. Checkout may fail.</td></tr>
                <tr><td>Twitch Player Embed</td><td>The embedded Twitch player may not load or function correctly.</td></tr>
                <tr><td>YouTube Embeds</td><td>Embedded videos may not play or may display cookie consent prompts.</td></tr>
                <tr><td>Discord Widget</td><td>The Discord server widget may not display.</td></tr>
                <tr><td>Cloudflare Protection</td><td>You may be repeatedly challenged by Cloudflare security checks (CAPTCHA).</td></tr>
                <tr><td>Analytics</td><td>Your visits will not be tracked in analytics (this is the opt-out effect).</td></tr>
                <tr><td>CSRF Protection</td><td>Form submissions may fail due to missing security tokens.</td></tr>
              </tbody>
            </table>

            <p>We recommend keeping essential cookies enabled to ensure the best experience on our websites.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 8 */}
          <section id="do-not-track">
            <h2>8. Do Not Track and Global Privacy Control</h2>

            <h3>8.1 Do Not Track (DNT)</h3>
            <p>Some web browsers transmit &ldquo;Do Not Track&rdquo; (DNT) signals to websites. There is currently no universally accepted standard for how websites should respond to DNT signals. As a result, our websites do not currently alter their behavior in response to DNT signals. However, you can manage tracking through the cookie management options described in Section 6.</p>

            <h3>8.2 Global Privacy Control (GPC)</h3>
            <p>We recognize and honor Global Privacy Control (GPC) signals. If your browser sends a GPC signal, we will treat it as:</p>
            <ul>
              <li>A valid opt-out request under the California Consumer Privacy Act (CCPA).</li>
              <li>A request to limit the sale or sharing of personal information (though we do not sell personal information).</li>
              <li>An indication of your preference to limit data collection where legally applicable.</li>
            </ul>
            <p>You can enable GPC in supported browsers or through browser extensions. Learn more at <a href="https://globalprivacycontrol.org/" target="_blank" rel="noopener noreferrer">globalprivacycontrol.org</a>.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 9 */}
          <section id="third-party-policies">
            <h2>9. Third-Party Cookie Policies</h2>
            <p>For more information about how third-party services use cookies, please refer to their respective cookie and privacy policies:</p>

            <table>
              <thead>
                <tr><th>Service</th><th>Policy Link</th></tr>
              </thead>
              <tbody>
                <tr><td>Cloudflare</td><td><a href="https://www.cloudflare.com/cookie-policy/" target="_blank" rel="noopener noreferrer">Cloudflare Cookie Policy</a></td></tr>
                <tr><td>Google (Analytics, YouTube)</td><td><a href="https://policies.google.com/technologies/cookies" target="_blank" rel="noopener noreferrer">Google Cookie Policy</a></td></tr>
                <tr><td>Twitch</td><td><a href="https://www.twitch.tv/p/en/legal/cookie-notice/" target="_blank" rel="noopener noreferrer">Twitch Cookie Notice</a></td></tr>
                <tr><td>Discord</td><td><a href="https://discord.com/privacy" target="_blank" rel="noopener noreferrer">Discord Privacy Policy</a></td></tr>
                <tr><td>Fourthwall</td><td><a href="https://fourthwall.com/privacy" target="_blank" rel="noopener noreferrer">Fourthwall Privacy Policy</a></td></tr>
                <tr><td>Stripe</td><td><a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe Privacy Policy</a></td></tr>
                <tr><td>PayPal</td><td><a href="https://www.paypal.com/us/legalhub/privacy-full" target="_blank" rel="noopener noreferrer">PayPal Privacy Policy</a></td></tr>
              </tbody>
            </table>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 10 */}
          <section id="cookie-changes">
            <h2>10. Updates to This Cookie Policy</h2>
            <p>We may update this Cookie Policy from time to time to reflect changes in our practices, technology, legal requirements, or other factors. When we make changes:</p>
            <ul>
              <li>We will update the &ldquo;Last Updated&rdquo; date at the top of this page.</li>
              <li>For material changes (such as adding new categories of cookies or third-party services), we will provide prominent notice on our websites.</li>
              <li>Where required by law, we will obtain your renewed consent for non-essential cookies after material changes.</li>
            </ul>
            <p>We encourage you to review this Cookie Policy periodically to stay informed about how we use cookies and related technologies.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 11 */}
          <section id="cookie-contact">
            <h2>11. Contact Information</h2>
            <p>If you have questions about this Cookie Policy or our use of cookies and tracking technologies, please contact us:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
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
