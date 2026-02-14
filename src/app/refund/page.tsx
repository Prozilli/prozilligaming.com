import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy",
  description:
    "Refund Policy for Prozilli Gaming (prozilligaming.com). Learn about our return, refund, and cancellation policies for merchandise, VIP subscriptions, digital purchases, tips, donations, and FiveM virtual items.",
};

export default function RefundPolicyPage() {
  return (
    <section className="py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="legal-content">
          <p className="text-label text-dim mb-2">Last Updated: February 13, 2026</p>
          <h1 className="text-headline mb-2">Refund Policy</h1>
          <p className="text-body-lg mb-8">
            This Refund Policy explains the terms and conditions for returns, refunds, cancellations, and exchanges for all purchases made through or in connection with Prozilli Entertainment&rsquo;s (&ldquo;Prozilli,&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) services. This policy covers physical merchandise, digital purchases, VIP subscriptions, tips, donations, and virtual items. By making any purchase through our Services, you agree to the terms of this Refund Policy.
          </p>

          {/* TABLE OF CONTENTS */}
          <div className="glass legal-toc" id="toc">
            <h2 style={{ marginTop: 0, borderBottom: "none", paddingBottom: 0, fontSize: "1.125rem" }}>Table of Contents</h2>
            <ol>
              <li><a href="#overview">1. Overview</a></li>
              <li><a href="#physical-merchandise">2. Physical Merchandise (Fourthwall)</a></li>
              <li><a href="#digital-purchases">3. Digital Purchases</a></li>
              <li><a href="#vip-subscriptions">4. VIP Subscriptions (Tebex)</a></li>
              <li><a href="#tips-donations">5. Tips and Donations</a></li>
              <li><a href="#patreon-pledges">6. Patreon Pledges</a></li>
              <li><a href="#fivem-virtual-items">7. FiveM Virtual Items and In-Game Purchases</a></li>
              <li><a href="#chargebacks">8. Chargeback Policy</a></li>
              <li><a href="#how-to-request">9. How to Request a Refund</a></li>
              <li><a href="#processing-timeline">10. Processing Timeline</a></li>
              <li><a href="#refund-methods">11. Refund Methods</a></li>
              <li><a href="#exceptions">12. Exceptions and Special Circumstances</a></li>
              <li><a href="#consumer-rights">13. Consumer Protection Rights</a></li>
              <li><a href="#refund-changes">14. Changes to This Policy</a></li>
              <li><a href="#refund-contact">15. Contact Information</a></li>
            </ol>
          </div>

          {/* SECTION 1 */}
          <section id="overview">
            <h2>1. Overview</h2>
            <p>We want you to be satisfied with your purchases. This Refund Policy is designed to be fair and transparent while also protecting against abuse. Different types of purchases have different refund terms, as detailed below. Please read the section applicable to your purchase type carefully before completing any transaction.</p>

            <h3>1.1 General Principles</h3>
            <ul>
              <li>Physical merchandise has a 30-day return window with conditions.</li>
              <li>Digital purchases are generally non-refundable.</li>
              <li>VIP subscriptions can be cancelled but are not retroactively refunded.</li>
              <li>Tips and donations are non-refundable under all circumstances.</li>
              <li>Virtual items and in-game purchases are non-refundable.</li>
              <li>Chargebacks initiated in bad faith may result in permanent bans.</li>
            </ul>

            <h3>1.2 Applicable Payment Processors</h3>
            <p>Purchases are processed by various third-party payment processors depending on the product type:</p>
            <table>
              <thead>
                <tr><th>Purchase Type</th><th>Processor</th><th>Refund Policy Governed By</th></tr>
              </thead>
              <tbody>
                <tr><td>Merchandise</td><td>Fourthwall</td><td>This policy + Fourthwall&rsquo;s policies</td></tr>
                <tr><td>VIP Subscriptions (FiveM)</td><td>Tebex</td><td>This policy + Tebex&rsquo;s policies</td></tr>
                <tr><td>Tips</td><td>StreamElements / PayPal</td><td>This policy</td></tr>
                <tr><td>Patreon Pledges</td><td>Patreon</td><td>This policy + Patreon&rsquo;s policies</td></tr>
                <tr><td>Other Payments</td><td>Stripe / PayPal</td><td>This policy</td></tr>
              </tbody>
            </table>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 2 */}
          <section id="physical-merchandise">
            <h2>2. Physical Merchandise (Fourthwall)</h2>
            <p>Our official Prozilli Gaming merchandise is sold through our Fourthwall-powered store. The following policies apply to all physical merchandise purchases.</p>

            <h3>2.1 30-Day Return Window</h3>
            <p>You may request a return or exchange for physical merchandise within <strong>30 days</strong> of receiving your order. To be eligible for a return:</p>
            <ul>
              <li>The item must be in its original, unworn, unwashed, and undamaged condition.</li>
              <li>The item must have all original tags and packaging intact.</li>
              <li>The item must not have been personalized or customized (custom items are final sale).</li>
              <li>You must provide your order number and reason for return.</li>
            </ul>

            <h3>2.2 Return Shipping</h3>
            <ul>
              <li><strong>Defective/Incorrect Items:</strong> If you received a defective or incorrect item, we will cover the cost of return shipping. Please contact us within 7 days of receiving the item.</li>
              <li><strong>Change of Mind / Sizing Issues:</strong> If you are returning an item because you changed your mind, ordered the wrong size, or for other non-defective reasons, you are responsible for return shipping costs.</li>
              <li><strong>Original Shipping Costs:</strong> Original shipping costs are non-refundable (unless the return is due to our error).</li>
            </ul>

            <h3>2.3 Exchange Process</h3>
            <p>If you would like to exchange an item for a different size or color:</p>
            <ol>
              <li>Contact us within 30 days of receiving your order.</li>
              <li>We will provide return shipping instructions.</li>
              <li>Once we receive the returned item and verify its condition, we will ship the replacement item.</li>
              <li>If the replacement item is a different price, you will be charged or refunded the difference.</li>
              <li>Exchanges are subject to availability. If the requested item is out of stock, you may choose a different item or receive a refund.</li>
            </ol>

            <h3>2.4 Defective or Damaged Items</h3>
            <p>If you receive a defective, damaged, or incorrect item:</p>
            <ul>
              <li>Contact us within <strong>7 days</strong> of receiving the order.</li>
              <li>Include photographs of the defect or damage.</li>
              <li>Include photographs of the shipping packaging (if damage occurred during shipping).</li>
              <li>We will offer a full replacement or full refund at your choice, including original shipping costs.</li>
              <li>Depending on the nature of the defect, we may not require you to return the defective item.</li>
            </ul>

            <h3>2.5 Lost or Missing Orders</h3>
            <p>If your order has not arrived:</p>
            <ul>
              <li>Check the tracking information provided in your order confirmation email.</li>
              <li>Allow sufficient time for delivery based on the shipping method selected (domestic: 5-10 business days; international: 10-30 business days).</li>
              <li>If the tracking shows &ldquo;delivered&rdquo; but you have not received the package, check with neighbors, building management, and the carrier.</li>
              <li>If the order is confirmed lost (tracking shows no delivery or is stuck for an extended period), contact us and we will either reship the order or issue a full refund.</li>
            </ul>

            <h3>2.6 Items Not Eligible for Return</h3>
            <ul>
              <li>Custom or personalized items (items made to your specifications).</li>
              <li>Items marked as &ldquo;Final Sale&rdquo; or &ldquo;Non-Returnable&rdquo; at the time of purchase.</li>
              <li>Items that have been worn, washed, altered, or damaged by the customer.</li>
              <li>Items returned after the 30-day return window.</li>
              <li>Gift cards or store credits.</li>
            </ul>

            <h3>2.7 Fourthwall Policies</h3>
            <p>As our merchandise is fulfilled through Fourthwall, returns and refunds are also subject to Fourthwall&rsquo;s policies. In the event of a conflict between this policy and Fourthwall&rsquo;s policies, we will work with Fourthwall to reach a fair resolution for the customer.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 3 */}
          <section id="digital-purchases">
            <h2>3. Digital Purchases</h2>

            <h3>3.1 General Rule</h3>
            <p><strong>Digital purchases are generally non-refundable.</strong> Due to the nature of digital goods, once a digital product has been delivered or access has been granted, the purchase cannot be reversed. By completing a digital purchase, you acknowledge and agree that:</p>
            <ul>
              <li>You have read and understood the product description before purchasing.</li>
              <li>Digital delivery is immediate or near-immediate upon payment processing.</li>
              <li>You waive any right to a &ldquo;cooling-off&rdquo; period for digital content that has been delivered (to the extent permitted by applicable law).</li>
            </ul>

            <h3>3.2 Exceptions</h3>
            <p>We may, at our sole discretion, issue refunds for digital purchases in the following circumstances:</p>
            <ul>
              <li>The product was not delivered due to a technical error on our end.</li>
              <li>The product was materially different from what was described at the time of purchase.</li>
              <li>You were charged multiple times for the same purchase (duplicate charge).</li>
              <li>The purchase was made fraudulently (unauthorized use of your payment method).</li>
            </ul>

            <h3>3.3 Digital Content Types</h3>
            <p>Digital purchases that are non-refundable include but are not limited to:</p>
            <ul>
              <li>Digital downloads (wallpapers, graphics, audio files).</li>
              <li>Digital gift cards or store credits.</li>
              <li>One-time digital access purchases.</li>
              <li>Digital content bundles.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 4 */}
          <section id="vip-subscriptions">
            <h2>4. In-Game VIP Subscriptions (Tebex)</h2>
            <p>In-game VIP subscriptions for our FiveM server (ZO Syndicate RP) are offered in three tiers: Associate, Connected, and Inner Circle. These are managed through Tebex and are purchased from within the game.</p>

            <h3>4.1 Subscription Cancellation</h3>
            <ul>
              <li>You may cancel your VIP subscription at any time through your Tebex account settings or by contacting us.</li>
              <li>Cancellation takes effect at the end of the current billing period. You will retain access to VIP benefits until the end of the period you have already paid for.</li>
              <li><strong>No partial refunds</strong> are given for unused time within a billing period.</li>
              <li>No proration is applied. If you cancel on day 2 of a 30-day billing period, you will not receive a refund for the remaining 28 days, but you will retain access for those 28 days.</li>
            </ul>

            <h3>4.2 Non-Refundable Subscription Payments</h3>
            <p>Subscription payments that have already been processed are non-refundable, except in the following circumstances:</p>
            <ul>
              <li><strong>Service Unavailability:</strong> If the FiveM server is permanently shut down or VIP features are permanently removed, we may issue prorated refunds for any remaining subscription time, at our discretion.</li>
              <li><strong>Billing Error:</strong> If you were charged incorrectly (wrong amount, double charge, charge after cancellation), we will issue a full refund for the erroneous charge.</li>
              <li><strong>Fraud:</strong> If your payment method was used without authorization, contact your payment provider and us immediately.</li>
            </ul>

            <h3>4.3 Tier Changes</h3>
            <ul>
              <li><strong>Upgrading:</strong> If you upgrade to a higher VIP tier mid-cycle, you will be charged the prorated difference for the remainder of the current billing period, and the new tier price will apply at the next renewal.</li>
              <li><strong>Downgrading:</strong> If you downgrade to a lower VIP tier, the change takes effect at the next billing period. No partial refund is given for the current period.</li>
            </ul>

            <h3>4.4 VIP Benefits After Ban</h3>
            <p>If your account is banned from our FiveM server or other services for violating our <a href="/terms">Terms of Service</a> or <a href="/acceptable-use">Acceptable Use Policy</a>, your VIP subscription will be cancelled and <strong>no refund will be issued</strong>. VIP status does not provide immunity from enforcement actions.</p>

            <h3>4.5 Tebex Policies</h3>
            <p>Tebex may have additional refund policies that apply to purchases made through their platform. In the event of a conflict, we will work with Tebex to resolve the issue fairly.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 5 */}
          <section id="tips-donations">
            <h2>5. Tips and Donations</h2>

            <h3>5.1 Non-Refundable</h3>
            <p><strong>All tips and donations are voluntary, non-refundable gifts.</strong> By sending a tip or donation, you acknowledge and agree to the following:</p>
            <ul>
              <li>Tips and donations are <strong>not</strong> purchases of goods or services. They are voluntary expressions of support and appreciation.</li>
              <li>Tips and donations do not create any obligation on the part of Prozilli Entertainment to provide any specific benefit, service, access, or acknowledgment.</li>
              <li>Tips and donations cannot be reversed, refunded, or charged back under any circumstances.</li>
              <li>You are authorized to use the payment method and have sufficient funds to cover the tip/donation amount.</li>
              <li>You are making the tip/donation of your own free will, without coercion or expectation of return.</li>
            </ul>

            <h3>5.2 Platforms for Tips</h3>
            <p>Tips may be sent through:</p>
            <ul>
              <li><strong>StreamElements:</strong> Tips sent through StreamElements during live streams are processed by StreamElements and are non-refundable.</li>
              <li><strong>PayPal:</strong> Direct PayPal tips are non-refundable. See Section 8 regarding PayPal chargebacks.</li>
              <li><strong>Platform-Specific Tips:</strong> Tips sent through Twitch (Bits/Cheers), YouTube (Super Chat, Super Stickers, Super Thanks), Kick, or other platforms are governed by those platforms&rsquo; refund policies. We have no control over platform-level refund decisions.</li>
            </ul>

            <h3>5.3 Tip Message Content</h3>
            <p>Tips sent with messages that violate our <a href="/acceptable-use">Acceptable Use Policy</a> may result in the message being hidden or removed. The monetary value of the tip is still non-refundable.</p>

            <h3>5.4 Accidental Tips</h3>
            <p>If you believe you accidentally sent a tip in the wrong amount (e.g., $100 instead of $10), please contact us immediately at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> within 24 hours of the transaction. We will review accidental tip claims on a case-by-case basis and may, at our sole discretion, issue a partial refund for the accidental excess. This is not an obligation and is handled as a courtesy.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 6 */}
          <section id="patreon-pledges">
            <h2>6. Patreon Pledges</h2>

            <h3>6.1 Patreon Terms</h3>
            <p>Patreon pledges are recurring monthly contributions processed through Patreon. Patreon has its own refund and dispute resolution policies. By pledging through Patreon, you agree to Patreon&rsquo;s Terms of Use.</p>

            <h3>6.2 Cancellation</h3>
            <p>You may cancel your Patreon pledge at any time through your Patreon account. Cancellation takes effect at the end of the current month. You will retain access to patron benefits until the end of the month you have paid for.</p>

            <h3>6.3 Refunds via Patreon</h3>
            <p>Patreon processes refund requests through their own system. If you need a refund for a Patreon pledge, please contact Patreon directly. We do not have the ability to process Patreon refunds outside of Patreon&rsquo;s system.</p>

            <h3>6.4 Patron Benefits</h3>
            <p>Patron benefits are described on our Patreon page and are subject to availability. If a promised benefit is permanently discontinued, we will provide a comparable alternative or adjust the tier pricing.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 7 */}
          <section id="fivem-virtual-items">
            <h2>7. FiveM Virtual Items and In-Game Purchases</h2>

            <h3>7.1 Non-Refundable</h3>
            <p><strong>All purchases of virtual items, in-game currency, and in-game assets for the ZO Syndicate RP FiveM server are non-refundable.</strong> This includes but is not limited to:</p>
            <ul>
              <li>In-game currency purchases.</li>
              <li>Virtual vehicles, properties, or businesses.</li>
              <li>Cosmetic items (clothing, accessories, modifications).</li>
              <li>VIP-exclusive in-game items or perks.</li>
              <li>Any other virtual goods or services obtained through real-money purchases.</li>
            </ul>

            <h3>7.2 No Real-World Value</h3>
            <p>Virtual items have no real-world monetary value and are provided under a limited, revocable license. See our <a href="/terms">Terms of Service</a> (Section 12) for complete virtual item terms.</p>

            <h3>7.3 Server Wipes</h3>
            <p>In the event of a server wipe (economy reset, character reset, inventory wipe), <strong>no refunds or compensation</strong> will be provided for virtual items or in-game assets lost, regardless of whether those items were obtained through real-money purchases. Server wipes are sometimes necessary for game health and economy balance.</p>

            <h3>7.4 Item Modifications</h3>
            <p>We reserve the right to modify, nerf, buff, or remove any virtual item at any time for game balance, bug fixes, or content updates. No refund or compensation is provided for changes to virtual items.</p>

            <h3>7.5 Account Termination</h3>
            <p>If your account is terminated due to violations of our policies, all virtual items and in-game purchases are forfeited without refund.</p>

            <h3>7.6 Technical Issues</h3>
            <p>If a purchased virtual item fails to be delivered due to a technical error on our end, please contact us and we will either deliver the item or provide a suitable replacement. If neither is possible, we may issue a refund for the specific item, at our sole discretion.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 8 */}
          <section id="chargebacks">
            <h2>8. Chargeback Policy</h2>

            <h3>8.1 Contact Us First</h3>
            <p><strong>Before initiating a chargeback with your bank or payment provider, please contact us first.</strong> We are committed to resolving disputes fairly and promptly. In many cases, we can resolve the issue faster than the chargeback process, which can take weeks or months.</p>

            <h3>8.2 Fraudulent Chargebacks</h3>
            <p>A chargeback initiated in bad faith (also known as &ldquo;friendly fraud&rdquo;) is a violation of our <a href="/terms">Terms of Service</a>. A chargeback is considered fraudulent when:</p>
            <ul>
              <li>You received the goods or services you paid for and then initiate a chargeback.</li>
              <li>You initiate a chargeback for a non-refundable purchase (tips, donations, digital items, VIP subscriptions) after voluntarily making the purchase.</li>
              <li>You initiate a chargeback to avoid legitimate charges.</li>
              <li>You deny making a purchase that you in fact made.</li>
            </ul>

            <h3>8.3 Consequences of Fraudulent Chargebacks</h3>
            <p>If we determine that a chargeback was initiated fraudulently or in bad faith, we reserve the right to:</p>
            <ul>
              <li><strong>Permanently ban</strong> your account from all Prozilli Entertainment services (websites, Discord, FiveM server, all platforms).</li>
              <li><strong>Contest the chargeback</strong> with the payment processor by providing evidence of the legitimate transaction.</li>
              <li><strong>Pursue legal action</strong> to recover the disputed amount, chargeback fees, and associated costs.</li>
              <li><strong>Report the fraud</strong> to applicable authorities and payment fraud databases.</li>
              <li><strong>Revoke all virtual items, VIP benefits, and access</strong> associated with the account.</li>
            </ul>

            <h3>8.4 Chargeback Fees</h3>
            <p>Chargebacks incur fees from our payment processors that are charged to us. If a chargeback is found to be fraudulent, we may seek to recover these fees from the party who initiated the chargeback.</p>

            <h3>8.5 Legitimate Chargebacks</h3>
            <p>We understand that there are legitimate reasons for chargebacks, including unauthorized use of your payment method (actual fraud), billing errors, or non-delivery of goods. If you have a legitimate reason for a chargeback, we encourage you to contact us first so we can resolve the issue directly and avoid the lengthy chargeback process.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 9 */}
          <section id="how-to-request">
            <h2>9. How to Request a Refund</h2>

            <h3>9.1 Contact Information</h3>
            <p>To request a refund, please contact us at:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
              <li><strong>Subject Line:</strong> &ldquo;Refund Request - [Order Number or Transaction ID]&rdquo;</li>
              <li><strong>Discord:</strong> Open a support ticket in our Discord server.</li>
            </ul>

            <h3>9.2 Required Information</h3>
            <p>Please include the following in your refund request:</p>
            <ul>
              <li>Your full name (as used for the purchase).</li>
              <li>Email address associated with the purchase.</li>
              <li>Order number or transaction ID.</li>
              <li>Date of purchase.</li>
              <li>Items purchased and amount paid.</li>
              <li>Reason for the refund request.</li>
              <li>Supporting evidence (photographs of defective items, screenshots of errors, etc.).</li>
              <li>Preferred refund method (original payment method, store credit, etc.).</li>
            </ul>

            <h3>9.3 Acknowledgment</h3>
            <p>We will acknowledge receipt of your refund request within 2 business days. If you do not receive an acknowledgment, please check your spam folder or contact us again.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 10 */}
          <section id="processing-timeline">
            <h2>10. Processing Timeline</h2>

            <table>
              <thead>
                <tr><th>Stage</th><th>Timeline</th><th>Description</th></tr>
              </thead>
              <tbody>
                <tr><td>Request Acknowledgment</td><td>1-2 business days</td><td>We confirm receipt of your refund request.</td></tr>
                <tr><td>Review and Decision</td><td>3-5 business days</td><td>We review your request and determine eligibility.</td></tr>
                <tr><td>Return Shipping (if applicable)</td><td>Varies</td><td>You ship the item back to us. Transit time depends on location and carrier.</td></tr>
                <tr><td>Item Inspection (if applicable)</td><td>2-3 business days</td><td>We inspect the returned item to verify condition.</td></tr>
                <tr><td>Refund Processing</td><td>3-5 business days</td><td>We initiate the refund through the original payment method.</td></tr>
                <tr><td>Bank/Card Processing</td><td>5-10 business days</td><td>Your bank or credit card company processes the refund. This timeline is outside our control.</td></tr>
              </tbody>
            </table>

            <p><strong>Total estimated time:</strong> Refunds for eligible requests are typically completed within 15-25 business days from the date we receive your request (including return shipping and bank processing time). Digital refunds (no physical return required) are typically faster: 5-10 business days.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 11 */}
          <section id="refund-methods">
            <h2>11. Refund Methods</h2>

            <h3>11.1 Original Payment Method</h3>
            <p>Refunds are issued to the original payment method used for the purchase whenever possible. This means:</p>
            <ul>
              <li><strong>Credit/Debit Card:</strong> Refund is credited back to the card used for the purchase.</li>
              <li><strong>PayPal:</strong> Refund is credited to your PayPal account.</li>
              <li><strong>Other Payment Methods:</strong> Refund is credited to the original payment method.</li>
            </ul>

            <h3>11.2 Store Credit</h3>
            <p>In some cases, we may offer store credit as an alternative to a monetary refund. Store credit can be used for future purchases on our Fourthwall store. Store credit does not expire. You may choose store credit instead of a refund to your original payment method.</p>

            <h3>11.3 Replacement</h3>
            <p>For defective or damaged items, we may offer a replacement item instead of a monetary refund. You may choose between a replacement and a refund.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 12 */}
          <section id="exceptions">
            <h2>12. Exceptions and Special Circumstances</h2>

            <h3>12.1 Service Disruptions</h3>
            <p>If our Services experience a major, prolonged outage (more than 72 continuous hours) that prevents you from accessing purchased benefits (VIP perks, digital content), we may, at our discretion, offer compensation in the form of extended subscription time, store credit, or partial refunds.</p>

            <h3>12.2 Discontinuation of Services</h3>
            <p>If we permanently discontinue a service (e.g., shut down the FiveM server, close the merchandise store), we will:</p>
            <ul>
              <li>Provide reasonable advance notice (at least 30 days where possible).</li>
              <li>Issue prorated refunds for active subscriptions covering the period after discontinuation.</li>
              <li>Fulfill any outstanding merchandise orders or issue refunds.</li>
            </ul>
            <p>We are not obligated to compensate for loss of virtual items, in-game progress, or digital assets upon service discontinuation.</p>

            <h3>12.3 Natural Disasters and Force Majeure</h3>
            <p>In the event that merchandise delivery is delayed or prevented due to events beyond our control (natural disasters, pandemics, strikes, carrier disruptions), we will work with you to either reship the order when possible or issue a full refund if fulfillment is not possible within a reasonable timeframe.</p>

            <h3>12.4 Goodwill Refunds</h3>
            <p>In exceptional circumstances, we may issue &ldquo;goodwill&rdquo; refunds at our sole discretion, even when a transaction does not meet the normal refund criteria. Goodwill refunds are not precedent-setting and do not create an obligation to issue similar refunds in the future.</p>

            <h3>12.5 Bulk or Large Orders</h3>
            <p>For bulk or large merchandise orders (10+ items or $500+), please contact us before ordering to discuss return policies, as standard terms may be modified for large orders.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 13 */}
          <section id="consumer-rights">
            <h2>13. Consumer Protection Rights</h2>

            <h3>13.1 Statutory Rights</h3>
            <p>Nothing in this Refund Policy is intended to limit or exclude your statutory consumer protection rights under applicable law. If you are entitled to a refund under consumer protection laws in your jurisdiction (e.g., the EU Consumer Rights Directive, the UK Consumer Rights Act 2015, the Australian Consumer Law), your statutory rights prevail over any conflicting terms in this policy.</p>

            <h3>13.2 European Union</h3>
            <p>If you are a consumer in the European Union, you have a 14-day right of withdrawal for distance purchases (physical merchandise) from the date you receive the goods. This right of withdrawal does not apply to:</p>
            <ul>
              <li>Digital content supplied on a non-tangible medium if performance has begun with your prior express consent and acknowledgment that you lose your right of withdrawal.</li>
              <li>Sealed goods which were unsealed after delivery and are not suitable for return for health protection or hygiene reasons.</li>
              <li>Goods made to your specifications or clearly personalized.</li>
              <li>Services fully performed with your prior express consent.</li>
            </ul>

            <h3>13.3 United Kingdom</h3>
            <p>UK consumers have similar rights under the Consumer Rights Act 2015 and the Consumer Contracts (Information, Cancellation and Additional Charges) Regulations 2013, including a 14-day cancellation period for distance contracts.</p>

            <h3>13.4 Australia</h3>
            <p>Australian consumers have rights under the Australian Consumer Law that cannot be excluded by agreement. Goods come with guarantees that cannot be excluded, including guarantees as to acceptable quality and fitness for purpose.</p>

            <h3>13.5 Exercising Statutory Rights</h3>
            <p>To exercise your statutory consumer protection rights, please contact us at <a href="mailto:legal@prozilli.com">legal@prozilli.com</a> and reference the applicable consumer protection law.</p>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 14 */}
          <section id="refund-changes">
            <h2>14. Changes to This Policy</h2>
            <p>We may update this Refund Policy from time to time. When we make changes:</p>
            <ul>
              <li>We will update the &ldquo;Last Updated&rdquo; date at the top of this page.</li>
              <li>Material changes (such as shortening return windows or adding new non-refundable categories) will be announced on our website and Discord.</li>
              <li>Changes to the Refund Policy do not apply retroactively. Purchases made before a policy change are governed by the policy in effect at the time of purchase.</li>
            </ul>

            <p><a href="#toc">Back to Table of Contents</a></p>
          </section>

          {/* SECTION 15 */}
          <section id="refund-contact">
            <h2>15. Contact Information</h2>
            <p>For all refund-related inquiries, returns, exchanges, and disputes:</p>
            <ul>
              <li><strong>Email:</strong> <a href="mailto:legal@prozilli.com">legal@prozilli.com</a></li>
              <li><strong>Subject Line:</strong> &ldquo;Refund Request - [Order Number]&rdquo; or &ldquo;Return Inquiry - [Order Number]&rdquo;</li>
              <li><strong>Discord:</strong> ZO Syndicate Discord server (support ticket system)</li>
              <li><strong>Entity:</strong> Prozilli Entertainment (Widler Sanon, Sole Proprietor)</li>
              <li><strong>Websites:</strong> <a href="https://prozilligaming.com" target="_blank" rel="noopener noreferrer">prozilligaming.com</a> | <a href="https://prozilli.com" target="_blank" rel="noopener noreferrer">prozilli.com</a></li>
            </ul>
            <p>We strive to respond to all refund inquiries within 1-2 business days.</p>

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
