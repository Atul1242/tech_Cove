import React from 'react';
import { motion } from 'framer-motion';

const Privacy: React.FC = () => {
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
          <h1 className="font-display fw-bold mb-3" data-testid="privacy-policy-title">
            Privacy Policy
          </h1>
          <p className="fs-5 text-secondary-custom">
            How we collect, use, and protect your personal information
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
                  <h3 className="font-display fw-semibold mb-3">1. Information We Collect</h3>
                  <p className="text-secondary-custom mb-4">
                    At StudyCove, we collect information to provide better services to our users. We collect information in the following ways:
                  </p>
                  
                  <h5 className="fw-semibold mb-3">Personal Information</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Name, email address, and phone number when you create an account</li>
                    <li>Payment information when you make bookings or purchase memberships</li>
                    <li>Student verification documents when applying for student discounts</li>
                    <li>Profile photo and preferences when you customize your account</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Usage Information</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Booking history, check-in/check-out times, and seat preferences</li>
                    <li>App usage data, including pages visited and features used</li>
                    <li>Device information, IP address, and browser type</li>
                    <li>Location data when you use location-based features</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">2. How We Use Your Information</h3>
                  <p className="text-secondary-custom mb-4">
                    We use the information we collect to:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Provide, maintain, and improve our services</li>
                    <li>Process bookings and payments</li>
                    <li>Send you booking confirmations and reminders</li>
                    <li>Provide customer support and respond to your inquiries</li>
                    <li>Analyze usage patterns to enhance user experience</li>
                    <li>Send promotional content and marketing communications (with your consent)</li>
                    <li>Comply with legal obligations and protect against fraudulent activity</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">3. Information Sharing and Disclosure</h3>
                  <p className="text-secondary-custom mb-4">
                    We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>Service Providers:</strong> With third-party vendors who help us operate our platform (payment processors, cloud storage providers)</li>
                    <li><strong>Legal Requirements:</strong> When required by law, regulation, or court order</li>
                    <li><strong>Safety and Security:</strong> To protect the rights, property, or safety of StudyCove, our users, or others</li>
                    <li><strong>Business Transfers:</strong> In connection with any merger, sale, or acquisition of all or a portion of our company</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">4. Data Security</h3>
                  <p className="text-secondary-custom mb-4">
                    We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. These measures include:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Encryption of data in transit and at rest</li>
                    <li>Regular security audits and vulnerability assessments</li>
                    <li>Access controls and authentication mechanisms</li>
                    <li>Employee training on data protection practices</li>
                    <li>Secure data centers with physical security measures</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">5. Data Retention</h3>
                  <p className="text-secondary-custom mb-4">
                    We retain your personal information for as long as necessary to provide our services and fulfill the purposes outlined in this policy. Specifically:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Account information is retained while your account is active</li>
                    <li>Booking history is retained for 3 years for operational and legal purposes</li>
                    <li>Payment information is retained as required by financial regulations</li>
                    <li>Marketing preferences are retained until you opt out</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">6. Your Rights and Choices</h3>
                  <p className="text-secondary-custom mb-4">
                    You have the following rights regarding your personal information:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>Access:</strong> Request a copy of the personal information we hold about you</li>
                    <li><strong>Correction:</strong> Request correction of inaccurate or incomplete information</li>
                    <li><strong>Deletion:</strong> Request deletion of your personal information (subject to legal requirements)</li>
                    <li><strong>Portability:</strong> Request transfer of your data in a machine-readable format</li>
                    <li><strong>Objection:</strong> Object to processing of your personal information for marketing purposes</li>
                    <li><strong>Withdraw Consent:</strong> Withdraw consent for data processing where applicable</li>
                  </ul>
                  <p className="text-secondary-custom mb-4">
                    To exercise these rights, please contact us at privacy@studycove.in
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">7. Cookies and Tracking Technologies</h3>
                  <p className="text-secondary-custom mb-4">
                    We use cookies and similar technologies to enhance your experience on our platform:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>Essential Cookies:</strong> Necessary for the platform to function properly</li>
                    <li><strong>Performance Cookies:</strong> Help us understand how users interact with our platform</li>
                    <li><strong>Functional Cookies:</strong> Remember your preferences and settings</li>
                    <li><strong>Marketing Cookies:</strong> Used to deliver relevant advertisements (with your consent)</li>
                  </ul>
                  <p className="text-secondary-custom mb-4">
                    You can control cookie preferences through your browser settings or our cookie preference center.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">8. International Data Transfers</h3>
                  <p className="text-secondary-custom mb-4">
                    Your information may be transferred to and processed in countries other than your country of residence. We ensure that such transfers are subject to appropriate safeguards, including standard contractual clauses approved by relevant authorities.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">9. Children's Privacy</h3>
                  <p className="text-secondary-custom mb-4">
                    Our services are not intended for children under 16 years of age. We do not knowingly collect personal information from children under 16. If we become aware that we have collected personal information from a child under 16, we will delete such information promptly.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">10. Changes to This Policy</h3>
                  <p className="text-secondary-custom mb-4">
                    We may update this Privacy Policy from time to time. We will notify you of any material changes by:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Posting the updated policy on our website</li>
                    <li>Sending you an email notification</li>
                    <li>Displaying a prominent notice on our platform</li>
                  </ul>
                  <p className="text-secondary-custom mb-4">
                    Your continued use of our services after any changes indicates your acceptance of the updated policy.
                  </p>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">11. Contact Us</h3>
                  <p className="text-secondary-custom mb-4">
                    If you have any questions about this Privacy Policy or our data practices, please contact us:
                  </p>
                  <div className="bg-muted p-4 rounded-3">
                    <p className="mb-2"><strong>Email:</strong> privacy@studycove.in</p>
                    <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
                    <p className="mb-2"><strong>Address:</strong> StudyCove Privacy Office, Connaught Place, New Delhi - 110001</p>
                    <p className="mb-0"><strong>Data Protection Officer:</strong> dpo@studycove.in</p>
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

export default Privacy;
