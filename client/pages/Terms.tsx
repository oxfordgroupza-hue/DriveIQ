export default function Terms() {
  const updated = new Date().toISOString().slice(0, 10);
  return (
    <div className="container py-16 md:py-24">
      <article className="prose prose-slate max-w-none dark:prose-invert">
        <h1>Terms of Service</h1>
        <p>Effective: {updated}</p>
        <p>
          These Terms of Service ("Terms") govern your access to and use of DriveIQ, including K53 learning, DriveIQ Pilot simulator, DriveIQ Vision screening, DriveIQ Connect institution portal, DriveIQ Go mobile access, and DriveIQ Academy. By using DriveIQ, you agree to these Terms.
        </p>

        <h2>1. Accounts and Eligibility</h2>
        <ul>
          <li>You must have legal capacity to enter into these Terms and comply with applicable laws.</li>
          <li>Institution administrators and instructors are responsible for their authorized users and learner data.</li>
          <li>You must provide accurate information and keep your credentials secure.</li>
        </ul>

        <h2>2. Early Bird Offer</h2>
        <ul>
          <li>R99 once-off grants access to K53 theory and AI vision screening, plus pilot simulator credits where available.</li>
          <li>Learners are responsible for exam and transport costs at local testing centers.</li>
          <li>Slots are limited and may close at our discretion; access is subject to capacity and eligibility.</li>
          <li>Except where required by law, fees are non-refundable. We may offer goodwill refunds at our discretion.</li>
        </ul>

        <h2>3. Referrals</h2>
        <ul>
          <li>We may provide a unique referral code and link for sharing. You agree not to spam, mislead, or misuse referral features.</li>
          <li>We may revoke or adjust referral programs at any time, including for suspected abuse or policy violations.</li>
        </ul>

        <h2>4. Simulator and Vision Screening</h2>
        <ul>
          <li>The simulator provides educational scenarios to practice defensive driving; it is not real-world driving and cannot guarantee exam success or on-road safety.</li>
          <li>DriveIQ Vision provides AI screening outputs only. It is not a medical diagnosis; a qualified optometrist must verify suitability before practical training.</li>
          <li>We may require vision clearance for participation in simulator or on-road sessions to support safety and compliance.</li>
        </ul>

        <h2>5. Institution Portal (DriveIQ Connect)</h2>
        <ul>
          <li>Institutions may monitor learner progress, AI screening results, and simulator performance consistent with applicable law and consents.</li>
          <li>Institution administrators must implement appropriate policies, permissions, and safeguards for their users.</li>
        </ul>

        <h2>6. Acceptable Use</h2>
        <ul>
          <li>Do not copy, distribute, or reverse engineer the services or content except as allowed by law.</li>
          <li>Do not attempt unauthorized access, interfere with systems, or upload malicious code.</li>
          <li>Do not harass, abuse, or violate the rights of others, including privacy and intellectual property rights.</li>
        </ul>

        <h2>7. Intellectual Property</h2>
        <p>
          DriveIQ, including its content, logos, software, and educational materials, is owned by or licensed to us and is protected by applicable laws. Subject to these Terms, we grant you a limited, non-exclusive, non-transferable license to use the services for personal, educational, or institutional purposes.
        </p>

        <h2>8. Payment and Taxes</h2>
        <p>
          You authorize our payment provider to charge applicable fees and taxes. Prices and features may change; we will notify you of material changes where required.
        </p>

        <h2>9. Disclaimers</h2>
        <p>
          The services are provided "as is" and "as available" without warranties of any kind, express or implied, including accuracy, reliability, or fitness for a particular purpose. We do not warrant that the services will be uninterrupted, error-free, or that defects will be corrected promptly.
        </p>

        <h2>10. Limitation of Liability</h2>
        <p>
          To the maximum extent permitted by law, we are not liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of data, profits, or revenues, arising from or related to your use of the services. Our total liability for any claim shall not exceed the amount paid by you in the 12 months preceding the event giving rise to the claim.
        </p>

        <h2>11. Indemnification</h2>
        <p>
          You agree to defend, indemnify, and hold harmless DriveIQ and its affiliates, officers, employees, and partners from any claims, liabilities, damages, losses, and expenses (including reasonable legal fees) arising from your use of the services or violation of these Terms.
        </p>

        <h2>12. Term and Termination</h2>
        <p>
          We may suspend or terminate access for any breach or suspected abuse. You may stop using the services at any time. Certain sections survive termination, including intellectual property, disclaimers, limitations of liability, and indemnity.
        </p>

        <h2>13. Governing Law</h2>
        <p>
          These Terms are governed by the laws of the Republic of South Africa, without regard to conflict of laws principles. Venue for disputes shall be in competent courts within South Africa.
        </p>

        <h2>14. Changes to the Terms</h2>
        <p>
          We may update these Terms from time to time. Material changes will be communicated through the app. Continued use after updates signifies acceptance of the revised Terms.
        </p>
      </article>
    </div>
  );
}
