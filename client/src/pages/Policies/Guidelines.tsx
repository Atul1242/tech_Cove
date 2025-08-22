import React from 'react';
import { motion } from 'framer-motion';

const Guidelines: React.FC = () => {
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
          <h1 className="font-display fw-bold mb-3" data-testid="community-guidelines-title">
            Community Guidelines
          </h1>
          <p className="fs-5 text-secondary-custom">
            Creating a respectful and productive study environment for everyone
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
                  <h3 className="font-display fw-semibold mb-3">1. Our Community Values</h3>
                  <p className="text-secondary-custom mb-4">
                    StudyCove is built on the foundation of creating the perfect study environment for students. Our community guidelines ensure that every member can focus, learn, and achieve their academic goals in a respectful and supportive atmosphere.
                  </p>
                  <h5 className="fw-semibold mb-3">Core Principles</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>Respect:</strong> Treat all community members with courtesy and consideration</li>
                    <li><strong>Focus:</strong> Maintain a quiet, distraction-free environment</li>
                    <li><strong>Cleanliness:</strong> Keep all spaces clean and organized for the next user</li>
                    <li><strong>Responsibility:</strong> Take ownership of your actions and their impact on others</li>
                    <li><strong>Collaboration:</strong> Support fellow students in their academic journey</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">2. Study Environment Standards</h3>
                  <h5 className="fw-semibold mb-3">Noise Level Guidelines</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>Silent Zones:</strong> Maintain complete silence - no talking, phone calls, or typing loudly</li>
                    <li><strong>Quiet Zones:</strong> Whisper conversations only - keep discussions brief and work-related</li>
                    <li><strong>Collaborative Areas:</strong> Normal conversation permitted, but be mindful of volume</li>
                    <li><strong>Phone Policy:</strong> Keep phones on silent; take calls outside the study area</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Workspace Etiquette</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Claim only the space you need - don't spread belongings across multiple seats</li>
                    <li>Clean your workspace when leaving - wipe down surfaces and dispose of trash</li>
                    <li>Report damaged equipment or facilities to staff immediately</li>
                    <li>Don't save seats for others - all bookings must be made through the app</li>
                    <li>Respect time limits - check out promptly when your booking ends</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Personal Belongings</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Secure your valuables - StudyCove is not responsible for lost or stolen items</li>
                    <li>Don't leave belongings unattended for extended periods</li>
                    <li>Use provided lockers when available</li>
                    <li>Label your items with your name and contact information</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">3. Respectful Interaction</h3>
                  <h5 className="fw-semibold mb-3">Communication Guidelines</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Greet staff and fellow members politely</li>
                    <li>Ask permission before sitting near someone in quiet areas</li>
                    <li>Use "please" and "thank you" in all interactions</li>
                    <li>Be patient with others who may be learning the guidelines</li>
                    <li>Offer help to new members when appropriate</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Conflict Resolution</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Address minor issues politely and directly when safe to do so</li>
                    <li>Report persistent problems to staff immediately</li>
                    <li>Don't confront other members aggressively</li>
                    <li>Use the in-app reporting feature for serious concerns</li>
                    <li>Seek mediation from staff for disputes</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">4. Technology and Equipment Use</h3>
                  <h5 className="fw-semibold mb-3">Device Guidelines</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Keep device volumes at zero or use headphones</li>
                    <li>Use silent typing keyboards when possible</li>
                    <li>Charge devices responsibly - don't monopolize power outlets</li>
                    <li>Keep screen brightness at appropriate levels</li>
                    <li>Use privacy screens when working with sensitive information</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Shared Equipment</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Sign up for shared resources (monitors, whiteboards) through the app</li>
                    <li>Clean equipment after use</li>
                    <li>Report any technical issues to staff</li>
                    <li>Don't modify or tamper with settings</li>
                    <li>Share resources fairly during peak hours</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Wi-Fi and Internet Usage</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Use internet responsibly - avoid bandwidth-heavy activities during peak hours</li>
                    <li>No streaming of entertainment content during study hours</li>
                    <li>Respect network security policies</li>
                    <li>Don't share Wi-Fi passwords with non-members</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">5. Food and Beverage Policies</h3>
                  <h5 className="fw-semibold mb-3">Permitted Items</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Water is allowed in all areas - use spill-proof containers</li>
                    <li>Light snacks are permitted in designated eating areas only</li>
                    <li>Hot beverages allowed with secure lids</li>
                    <li>Pre-packaged, quiet snacks (no crunchy or aromatic foods)</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Restricted Items</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Full meals - use designated dining areas or common spaces</li>
                    <li>Strong-smelling foods that may distract others</li>
                    <li>Alcoholic beverages</li>
                    <li>Foods requiring heating or preparation</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Cleanliness Standards</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Clean up spills immediately</li>
                    <li>Dispose of trash in appropriate bins</li>
                    <li>Don't eat over keyboards or electronics</li>
                    <li>Wash hands before and after eating</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">6. Health and Safety</h3>
                  <h5 className="fw-semibold mb-3">Personal Health</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Stay home if you're feeling unwell</li>
                    <li>Follow current health guidelines and protocols</li>
                    <li>Maintain good personal hygiene</li>
                    <li>Use hand sanitizer stations regularly</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Emergency Procedures</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Familiarize yourself with emergency exits</li>
                    <li>Follow staff instructions during emergencies</li>
                    <li>Report safety hazards immediately</li>
                    <li>Don't block emergency exits or safety equipment</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Incident Reporting</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Report accidents or injuries to staff immediately</li>
                    <li>Document incidents using the in-app reporting system</li>
                    <li>Provide witness information when possible</li>
                    <li>Cooperate with any investigations</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">7. Community Events and Activities</h3>
                  <h5 className="fw-semibold mb-3">Event Participation</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Register for events in advance through the app</li>
                    <li>Arrive on time and be prepared to participate</li>
                    <li>Respect event facilitators and fellow participants</li>
                    <li>Stay for the entire event unless there's an emergency</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Event Etiquette</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Engage positively in group activities and discussions</li>
                    <li>Ask questions respectfully</li>
                    <li>Don't dominate conversations</li>
                    <li>Help set up and clean up when asked</li>
                    <li>Provide constructive feedback when requested</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">8. Prohibited Behavior</h3>
                  <h5 className="fw-semibold mb-3">Zero Tolerance Policies</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>Harassment:</strong> Verbal, physical, or digital harassment of any kind</li>
                    <li><strong>Discrimination:</strong> Based on race, gender, religion, sexual orientation, or any other characteristic</li>
                    <li><strong>Theft:</strong> Taking someone else's belongings without permission</li>
                    <li><strong>Violence:</strong> Physical altercations or threats</li>
                    <li><strong>Substance Abuse:</strong> Use of illegal drugs or excessive alcohol consumption</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Disruptive Behavior</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Loud conversations in quiet zones</li>
                    <li>Playing music or videos without headphones</li>
                    <li>Monopolizing shared resources</li>
                    <li>Inappropriate use of technology</li>
                    <li>Sleeping in study areas for extended periods</li>
                    <li>Loitering without a valid booking</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Commercial Activities</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Selling products or services without permission</li>
                    <li>Soliciting other members for business purposes</li>
                    <li>Using spaces for business meetings without approval</li>
                    <li>Advertising or promotional activities</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">9. Enforcement and Consequences</h3>
                  <h5 className="fw-semibold mb-3">Warning System</h5>
                  <p className="text-secondary-custom mb-4">
                    StudyCove follows a progressive enforcement approach:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li><strong>First Offense:</strong> Verbal warning and guidance on proper behavior</li>
                    <li><strong>Second Offense:</strong> Written warning and potential brief suspension</li>
                    <li><strong>Third Offense:</strong> Temporary suspension and mandatory community guidelines review</li>
                    <li><strong>Severe Violations:</strong> Immediate suspension or permanent ban</li>
                  </ul>

                  <h5 className="fw-semibold mb-3">Appeal Process</h5>
                  <ul className="text-secondary-custom mb-4">
                    <li>Submit appeals through the customer service portal within 7 days</li>
                    <li>Provide detailed explanation and any supporting evidence</li>
                    <li>Appeal will be reviewed by management team</li>
                    <li>Decision will be communicated within 3-5 business days</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">10. Feedback and Suggestions</h3>
                  <p className="text-secondary-custom mb-4">
                    We value your input in making StudyCove better for everyone:
                  </p>
                  <ul className="text-secondary-custom mb-4">
                    <li>Use the in-app feedback feature to share suggestions</li>
                    <li>Participate in community surveys and focus groups</li>
                    <li>Report issues or concerns promptly</li>
                    <li>Suggest improvements to guidelines and policies</li>
                    <li>Share positive experiences and success stories</li>
                  </ul>
                </section>

                <section>
                  <h3 className="font-display fw-semibold mb-3">11. Contact Information</h3>
                  <p className="text-secondary-custom mb-4">
                    For questions about these guidelines or to report violations:
                  </p>
                  <div className="bg-muted p-4 rounded-3">
                    <p className="mb-2"><strong>Email:</strong> community@studycove.in</p>
                    <p className="mb-2"><strong>Phone:</strong> +91 98765 43210</p>
                    <p className="mb-2"><strong>In-App:</strong> Use the "Report Issue" feature</p>
                    <p className="mb-2"><strong>Address:</strong> StudyCove Community Team, Connaught Place, New Delhi - 110001</p>
                    <p className="mb-0"><strong>Hours:</strong> Monday - Sunday, 8:00 AM - 10:00 PM IST</p>
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

export default Guidelines;