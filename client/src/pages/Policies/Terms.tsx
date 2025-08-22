import React from 'react';
import { motion } from 'framer-motion';

const Terms: React.FC = () => {
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
          <h1 className="font-display fw-bold mb-3" data-testid="terms-of-service-title">
            Terms of Service
          </h1>
          <p className="fs-5 text-secondary-custom">
            The terms and conditions governing your use of StudyCove services
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
                  <h3 className="font-display fw-semibold mb-3">1. Acceptance of Terms</h3>
                  <p className="text-secondary-custom mb-4">
                    By accessing or using StudyCove services, including our website, mobile application, and physical study spaces, you agree to be bound by these Terms of Service ("Terms"). If you do not agree to these Terms, please do not use our services.
                  </p>
                  <p className="text-secondary-custom mb-4">
                    These Terms constitute a legally binding agreement between you and StudyCove Private Limited ("StudyCove," "we," "us," or "our"). We reserve the right to modify these Terms at any time, and such modifications will be effective immediately upon posting.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">2. Description of Services</h3>
                  <p className="text-secondary-custom mb-4">
                    StudyCove provides premium study spaces and related services including:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Access to study spaces and facilities at various locations</li>
                    <li>Online booking and reservation system</li>
                    <li>Membership plans and day passes</li>
                    <li>Educational events, workshops, and networking opportunities</li>
                    <li>Community features and student resources</li>
                    <li>Customer support services</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">3. User Accounts and Registration</h3>
                  <h5 className="fw-semibold mb-3">Account Creation</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>You must be at least 16 years old to create an account</li>
                    <li>You must provide accurate, current, and complete information</li>
                    <li>You are responsible for maintaining the confidentiality of your account credentials</li>
                    <li>You are responsible for all activities that occur under your account</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Account Verification</h5>
                  <p className="text-secondary-custom mb-4">
                    For student discounts, you may be required to provide valid student identification. We reserve the right to verify your student status and may request additional documentation.
                  </p>

                  <h5 className="fw-semibold mb-3">Account Suspension</h5>
                  <p className="text-secondary-custom mb-4">
                    We reserve the right to suspend or terminate your account if you violate these Terms or engage in conduct that we determine is harmful to our community or business.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">4. Booking and Reservation Policies</h3>
                  <h5 className="fw-semibold mb-3">Booking Process</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Bookings are confirmed only upon successful payment</li>
                    <li>You can book up to 30 days in advance</li>
                    <li>Maximum of 3 active bookings per user at any time</li>
                    <li>Seat assignments are based on availability and preferences</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Check-in and Check-out</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Check-in is required within 15 minutes of your booking start time</li>
                    <li>Failure to check in may result in no-show charges</li>
                    <li>You must check out at the end of your booking period</li>
                    <li>Extensions may be available subject to availability and additional charges</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Cancellation Policy</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Free cancellation up to 2 hours before booking start time</li>
                    <li>Cancellations within 2 hours are subject to a 50% cancellation fee</li>
                    <li>No-shows are charged the full booking amount</li>
                    <li>Membership bookings follow specific cancellation terms</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">5. Membership Terms</h3>
                  <h5 className="fw-semibold mb-3">Membership Plans</h5>
                  <p className="text-secondary-custom mb-4">
                    We offer various membership plans with different benefits and pricing. Membership terms include:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Monthly memberships auto-renew unless cancelled</li>
                    <li>Cancellation requires 7 days advance notice</li>
                    <li>Refunds are provided according to our refund policy</li>
                    <li>Membership benefits are non-transferable</li>
                    <li>Unused benefits expire at the end of the membership period</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Membership Suspension</h5>
                  <p className="text-secondary-custom mb-4">
                    We may suspend membership benefits for violations of facility rules or Terms of Service. Suspended members may still be charged membership fees during the suspension period.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">6. Facility Rules and Conduct</h3>
                  <h5 className="fw-semibold mb-3">General Conduct</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Maintain a quiet, respectful study environment</li>
                    <li>Keep your workspace clean and organized</li>
                    <li>Respect other users and their personal space</li>
                    <li>Follow all posted facility rules and staff instructions</li>
                    <li>No disruptive behavior, including loud conversations or noise</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Prohibited Activities</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Smoking, vaping, or consuming alcohol on premises</li>
                    <li>Bringing outside food or drinks (except water)</li>
                    <li>Using facilities for commercial purposes without permission</li>
                    <li>Harassment, discrimination, or inappropriate behavior</li>
                    <li>Damage to property or equipment</li>
                    <li>Unauthorized access to restricted areas</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Security and Safety</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Follow all security procedures and emergency protocols</li>
                    <li>Report suspicious activities or safety concerns immediately</li>
                    <li>Do not prop open doors or circumvent security measures</li>
                    <li>Secure your personal belongings at all times</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">7. Payment Terms</h3>
                  <h5 className="fw-semibold mb-3">Payment Methods</h5>
                  <p className="text-secondary-custom mb-4">
                    We accept various payment methods including credit cards, debit cards, UPI, and net banking. All payments are processed securely through third-party payment processors.
                  </p>

                  <h5 className="fw-semibold mb-3">Pricing and Fees</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>All prices are in Indian Rupees (INR) and include applicable taxes</li>
                    <li>Prices are subject to change with 30 days advance notice</li>
                    <li>Additional fees may apply for late cancellations, no-shows, or damages</li>
                    <li>Student discounts require valid verification</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Billing and Auto-renewal</h5>
                  <p className="text-secondary-custom mb-4">
                    Memberships automatically renew on their renewal date unless cancelled. You will be charged the then-current membership fee. Failed payments may result in service suspension.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">8. Intellectual Property</h3>
                  <p className="text-secondary-custom mb-4">
                    All content, features, and functionality of StudyCove services, including but not limited to text, graphics, logos, software, and design, are owned by StudyCove and protected by copyright, trademark, and other intellectual property laws.
                  </p>
                  <p className="text-secondary-custom mb-4">
                    You may not reproduce, distribute, modify, or create derivative works of our content without our written permission.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">9. Privacy and Data Protection</h3>
                  <p className="text-secondary-custom mb-4">
                    Your privacy is important to us. Our collection, use, and protection of your personal information is governed by our Privacy Policy, which is incorporated into these Terms by reference.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">10. Disclaimers and Limitation of Liability</h3>
                  <h5 className="fw-semibold mb-3">Service Availability</h5>
                  <p className="text-secondary-custom mb-4">
                    We strive to provide uninterrupted service but cannot guarantee 100% uptime. Services may be temporarily unavailable due to maintenance, technical issues, or force majeure events.
                  </p>

                  <h5 className="fw-semibold mb-3">Limitation of Liability</h5>
                  <p className="text-secondary-custom mb-4">
                    To the maximum extent permitted by law, StudyCove shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including but not limited to loss of profits, data, or business opportunities.
                  </p>

                  <h5 className="fw-semibold mb-3">Personal Property</h5>
                  <p className="text-secondary-custom mb-4">
                    StudyCove is not responsible for lost, stolen, or damaged personal property. Users are advised to secure their belongings and not leave valuables unattended.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">11. Indemnification</h3>
                  <p className="text-secondary-custom mb-4">
                    You agree to indemnify, defend, and hold harmless StudyCove from and against any claims, liabilities, damages, losses, and expenses arising out of or in any way connected with your use of our services or violation of these Terms.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">12. Governing Law and Dispute Resolution</h3>
                  <p className="text-secondary-custom mb-4">
                    These Terms are governed by the laws of India. Any disputes arising from these Terms or your use of our services shall be subject to the exclusive jurisdiction of the courts in New Delhi, India.
                  </p>
                  <p className="text-secondary-custom mb-4">
                    We encourage you to contact us first to resolve any disputes informally. If informal resolution is not possible, disputes may be resolved through binding arbitration under the Arbitration and Conciliation Act, 2015.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">13. Contact Information</h3>
                  <p className="text-secondary-custom mb-4">
                    If you have any questions about these Terms of Service, please contact us:
                  </p>
                  <div className="bg-muted p-4 rounded-3">
                    <p className="mb-2"><strong>Email:</strong> legal@studycove.in</p>
                    <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
                    <p className="mb-2"><strong>Address:</strong> StudyCove Legal Department, Connaught Place, New Delhi - 110001</p>
                    <p className="mb-0"><strong>Business Hours:</strong> Monday - Friday, 9:00 AM - 6:00 PM IST</p>
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

export default Terms;
