import React from 'react';
import { motion } from 'framer-motion';

const Refunds: React.FC = () => {
  return (
    <div className="bg-dark-custom" style={{ marginTop: '76px', minHeight: '100vh' }}>
      <div className="container py-5">
        {/* Header */}
        <motion.div 
          className="text-center mb-5"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-display fw-bold mb-3" data-testid="refund-policy-title">
            Refund Policy
          </h1>
          <p className="fs-5 text-secondary-custom">
            Our policy on refunds, cancellations, and payment disputes
          </p>
          <p className="text-secondary-custom">
            <small>Last updated: March 15, 2024</small>
          </p>
        </motion.div>

        <div className="row justify-content-center">
          <div className="col-lg-8">
            <motion.div 
              className="card-custom p-5"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <div className="space-y-6">
                <section>
                  <h3 className="font-display fw-semibold mb-3">1. General Refund Policy</h3>
                  <p className="text-secondary-custom mb-4">
                    At StudyCove, we strive to provide excellent service and ensure your satisfaction with our study spaces and services. This refund policy outlines the circumstances under which refunds may be provided and the process for requesting them.
                  </p>
                  <p className="text-secondary-custom mb-4">
                    All refund requests are subject to review and approval by our customer service team. Refunds, when approved, will be processed to the original payment method within 5-10 business days.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">2. Day Pass Refunds</h3>
                  <h5 className="fw-semibold mb-3">Full Refund Eligibility</h5>
                  <p className="text-secondary-custom mb-3">
                    You are eligible for a full refund of your day pass under the following conditions:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Cancellation made at least 2 hours before your booking start time</li>
                    <li>Technical issues on our platform prevented you from using the service</li>
                    <li>Facility closure due to unforeseen circumstances (maintenance, emergencies)</li>
                    <li>Significant disruption to the study environment beyond reasonable levels</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Partial Refund Eligibility</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Cancellation within 2 hours of booking start time: 50% refund</li>
                    <li>Early departure due to facility issues: Pro-rated refund based on unused time</li>
                    <li>Medical emergencies with valid documentation: Case-by-case evaluation</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">No Refund Situations</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>No-show (failure to check in within 15 minutes of booking start time)</li>
                    <li>Violation of facility rules resulting in asked departure</li>
                    <li>Personal change of plans or schedule conflicts</li>
                    <li>Dissatisfaction with study environment within normal operating parameters</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">3. Membership Refunds</h3>
                  <h5 className="fw-semibold mb-3">Monthly Membership</h5>
                  <p className="text-secondary-custom mb-4">
                    Monthly memberships are billed in advance for the upcoming month. Refund eligibility includes:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>First 7 Days:</strong> Full refund if you cancel within 7 days of initial purchase</li>
                    <li><strong>After 7 Days:</strong> No refund for the current billing period; cancellation takes effect at the next billing cycle</li>
                    <li><strong>Unused Benefits:</strong> No refund for unused membership benefits (guest passes, discounts)</li>
                    <li><strong>Auto-renewal:</strong> Accidental auto-renewal may be refunded if reported within 48 hours</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Premium Membership</h5>
                  <p className="text-secondary-custom mb-4">
                    Premium memberships follow the same refund policy as monthly memberships, with additional considerations:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>14-day satisfaction guarantee for first-time premium members</li>
                    <li>Pro-rated refund for service disruptions lasting more than 3 consecutive days</li>
                    <li>No refund for premium amenities if facility rules are violated</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Student Membership Discounts</h5>
                  <p className="text-secondary-custom mb-4">
                    Student discounted memberships are subject to the same refund policy as regular memberships. However, if student status verification fails after purchase, the membership will be converted to regular pricing, and no refund will be provided for the price difference.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">4. Event and Workshop Refunds</h3>
                  <h5 className="fw-semibold mb-3">Participant Cancellations</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>More than 48 hours before event:</strong> 100% refund</li>
                    <li><strong>24-48 hours before event:</strong> 50% refund</li>
                    <li><strong>Less than 24 hours:</strong> No refund, but may transfer to future event</li>
                    <li><strong>No-show:</strong> No refund or transfer</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Event Cancellations by StudyCove</h5>
                  <p className="text-secondary-custom mb-4">
                    If we cancel an event due to insufficient registrations, instructor unavailability, or other circumstances:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Full refund of registration fees</li>
                    <li>Option to transfer registration to similar future event</li>
                    <li>StudyCove credit for 110% of paid amount (valid for 1 year)</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">5. Refund Process</h3>
                  <h5 className="fw-semibold mb-3">How to Request a Refund</h5>
                  <ol className="text-secondary-custom mb-4">
                    <li>Contact our customer support team within 7 days of the incident</li>
                    <li>Provide your booking ID, transaction ID, and reason for refund request</li>
                    <li>Submit any supporting documentation (medical certificates, photos, etc.)</li>
                    <li>Wait for our team to review your request (typically 2-3 business days)</li>
                    <li>Receive refund confirmation and expected processing time</li>
                  </ol>

                  <h5 className="fw-semibold mb-3">Refund Processing Time</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>Credit/Debit Cards:</strong> 5-10 business days</li>
                    <li><strong>UPI/Net Banking:</strong> 2-5 business days</li>
                    <li><strong>Digital Wallets:</strong> 1-3 business days</li>
                    <li><strong>StudyCove Credits:</strong> Instant (added to your account immediately)</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Required Information for Refund Requests</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Full name and account email address</li>
                    <li>Booking ID or transaction reference number</li>
                    <li>Date and time of the booking or service</li>
                    <li>Detailed reason for refund request</li>
                    <li>Any relevant supporting documentation</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">6. StudyCove Credits</h3>
                  <p className="text-secondary-custom mb-4">
                    In some cases, we may offer StudyCove credits instead of monetary refunds. These credits:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Are valid for 12 months from the date of issue</li>
                    <li>Can be used for any StudyCove service (bookings, memberships, events)</li>
                    <li>Are non-transferable and cannot be converted back to cash</li>
                    <li>May include bonus amounts (e.g., 110% credit for event cancellations by us)</li>
                    <li>Can be combined with other payment methods</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">7. Dispute Resolution</h3>
                  <h5 className="fw-semibold mb-3">Internal Resolution</h5>
                  <p className="text-secondary-custom mb-4">
                    If you're not satisfied with our initial refund decision, you can:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Request a review by our senior customer service team</li>
                    <li>Provide additional documentation or clarification</li>
                    <li>Schedule a call with our customer service manager</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">External Dispute Resolution</h5>
                  <p className="text-secondary-custom mb-4">
                    For unresolved disputes, you may:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>File a complaint with your bank or payment provider</li>
                    <li>Contact consumer protection authorities</li>
                    <li>Seek resolution through arbitration as outlined in our Terms of Service</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">8. Special Circumstances</h3>
                  <h5 className="fw-semibold mb-3">Force Majeure Events</h5>
                  <p className="text-secondary-custom mb-4">
                    In case of natural disasters, government restrictions, pandemics, or other force majeure events that affect our operations:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Full refunds for affected bookings and unused membership periods</li>
                    <li>Option to freeze membership without charges during closure periods</li>
                    <li>Extended validity for credits and unused benefits</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Health and Safety</h5>
                  <p className="text-secondary-custom mb-4">
                    If health and safety concerns prevent you from using our services:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Medical documentation may be required for health-related refunds</li>
                    <li>Temporary membership suspension may be available instead of cancellation</li>
                    <li>Safety violations by other users may warrant partial compensation</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">9. Policy Updates</h3>
                  <p className="text-secondary-custom mb-4">
                    This refund policy may be updated from time to time to reflect changes in our services or legal requirements. Changes will be communicated through:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Email notifications to registered users</li>
                    <li>In-app notifications</li>
                    <li>Website announcements</li>
                    <li>Updated policy posted on our website</li>
                  </ul>
                  <p className="text-secondary-custom mb-4">
                    Continued use of our services after policy changes constitutes acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">10. Contact Information</h3>
                  <p className="text-secondary-custom mb-4">
                    For refund requests or questions about this policy, please contact us:
                  </p>
                  <div className="bg-muted p-4 rounded-3">
                    <p className="mb-2"><strong>Email:</strong> refunds@studycove.in</p>
                    <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
                    <p className="mb-2"><strong>Live Chat:</strong> Available on our website and mobile app</p>
                    <p className="mb-2"><strong>Address:</strong> StudyCove Customer Service, Connaught Place, New Delhi - 110001</p>
                    <p className="mb-0"><strong>Business Hours:</strong> Monday - Sunday, 9:00 AM - 9:00 PM IST</p>
                  </div>
                </section>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Refunds;
