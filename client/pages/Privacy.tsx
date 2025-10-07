export default function Privacy() {
  const updated = new Date().toISOString().slice(0, 10);
  return (
    <div className="container py-16 md:py-24">
      <article className="prose prose-slate max-w-none dark:prose-invert">
        <h1>Privacy Policy</h1>
        <p>Effective: {updated}</p>
        <p>
          This Privacy Policy explains how DriveIQ ("DriveIQ", "we", "us") collects, uses, discloses, and safeguards personal information when you use our services, including K53 theory learning, the DriveIQ Pilot simulator, DriveIQ Vision AI screening, DriveIQ Connect institution portal, DriveIQ Go mobile access, and DriveIQ Academy.
        </p>

        <h2>1. Information We Collect</h2>
        <ul>
          <li>
            Identity and Contact Data: name, email address, WhatsApp number, institution affiliation (if applicable).
          </li>
          <li>
            Account and Usage Data: authentication identifiers, device information, IP address, logs, pages viewed, clicks, session duration, and crash reports.
          </li>
          <li>
            Learning and Performance Data: K53 lesson progress, quiz answers, scores, simulator scenarios completed, hazard perception responses, reaction times, and instructor feedback.
          </li>
          <li>
            Vision Screening Data: results produced by DriveIQ Vision AI (e.g., screening outcomes, recommended prescription ranges). These screening results are not a medical diagnosis and require optometrist verification.
          </li>
          <li>
            Referral and Marketing Data: referral codes, unique links, share events, campaign attribution.
          </li>
          <li>
            Payment Data: limited billing metadata relating to the Early Bird once-off fee where applicable. Card details are processed by our payment provider and are not stored on our servers.
          </li>
          <li>
            Cookies and Similar Technologies: analytics, session, and preference cookies to provide and improve the service.
          </li>
        </ul>

        <h2>2. How We Use Information</h2>
        <ul>
          <li>Provide, operate, and improve DriveIQ features across web and mobile.</li>
          <li>Personalize content, measure learning progress, and provide instructor/institution insights.</li>
          <li>Conduct AI-powered screening and surface results for optometrist verification and safety gating.</li>
          <li>Process Early Bird payments, manage slots, and generate referral links.</li>
          <li>Communicate service updates, reminders, and important notices.</li>
          <li>Detect, prevent, and address fraud, abuse, or security incidents.</li>
          <li>Comply with legal obligations and enforce our Terms of Service.</li>
        </ul>

        <h2>3. Lawful Bases</h2>
        <p>
          We process personal information based on consent, contract performance, legitimate interests (such as service improvement and security), and legal obligations. Where consent is used, you may withdraw it at any time without affecting prior lawful processing.
        </p>

        <h2>4. Sharing and Disclosure</h2>
        <ul>
          <li>
            Service Providers: hosting, analytics, messaging, and payment partners who process data on our behalf under contractual safeguards.
          </li>
          <li>
            Optometrist Partners: for verification of AI screening results and vision compliance recording.
          </li>
          <li>
            Simulator and Hardware Partners: where needed to deliver or improve simulation experiences.
          </li>
          <li>
            Institutions: TVET colleges, NSFAS administrators, and instructors may access learner progress where an institution account and appropriate permissions are in place.
          </li>
          <li>
            Legal: where required by law, court order, or to protect rights, property, or safety.
          </li>
          <li>
            Business Transfers: in connection with a merger, sale, or reorganization, subject to continued protection of your information.
          </li>
        </ul>

        <h2>5. International Transfers</h2>
        <p>
          Data may be processed in jurisdictions outside your country. We implement appropriate safeguards, such as contractual clauses and technical measures, to protect your information.
        </p>

        <h2>6. Data Retention</h2>
        <p>
          We retain personal information only as long as needed for the purposes described in this Policy, to comply with legal obligations, or to resolve disputes. Learning, simulator, and screening records may be retained to support compliance and audit requirements for institutions.
        </p>

        <h2>7. Your Rights</h2>
        <p>
          Depending on your location, you may have rights of access, correction, deletion, restriction, portability, and objection. For South Africa (POPIA) and the EU/UK (GDPR), you also have the right to lodge a complaint with the relevant regulator. To exercise rights, submit a request via the in-app support channel.
        </p>

        <h2>8. Children and Learners</h2>
        <p>
          DriveIQ is intended for learners in compliance with applicable age and consent laws. Where required, parental or institutional authorization may be needed. Instructors and institutions are responsible for ensuring lawful processing of learner data within their programs.
        </p>

        <h2>9. Security</h2>
        <p>
          We use administrative, technical, and organizational measures to protect information. No method of transmission or storage is fully secure; users should maintain strong credentials and promptly report suspected incidents.
        </p>

        <h2>10. Cookies</h2>
        <p>
          We use necessary cookies for core functionality and optional analytics cookies to understand usage and improve performance. You can manage preferences in your browser settings; disabling some cookies may impact certain features.
        </p>

        <h2>11. AI Vision Screening Disclaimer</h2>
        <p>
          DriveIQ Vision is a screening tool and not a medical device. Screening outputs are informational and must be verified by a qualified optometrist. Learners may be blocked from practical training until verification confirms suitability. Always follow professional medical advice.
        </p>

        <h2>12. Changes to this Policy</h2>
        <p>
          We may update this Privacy Policy from time to time. Material changes will be communicated through the app. Continued use of the services after updates signifies acceptance of the revised Policy.
        </p>
      </article>
    </div>
  );
}
