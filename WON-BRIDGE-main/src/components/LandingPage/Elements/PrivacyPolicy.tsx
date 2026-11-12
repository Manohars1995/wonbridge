const PrivacyPolicyModal = () => {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md overflow-y-auto max-h-[90vh]">
      <h1 className="text-2xl font-bold mb-4 text-center">
        NOWIT SERVICES - Privacy Policy
      </h1>

      <p className="mb-4 text-gray-700">
        Nowit Services is committed to safeguarding user privacy on the{" "}
        <span className="font-semibold text-black">WON Bridge</span> web app. This policy outlines how we handle data collection, usage, and security.
      </p>

      <h2 className="font-semibold text-lg mb-1">
        <span className="font-bold text-black">App Name:</span> WON Bridge (Web App)
      </h2>
      <h2 className="font-semibold text-lg mb-1">
        <span className="font-bold text-black">Developer:</span> NOWIT SERVICES Pvt Ltd
      </h2>
      <h2 className="font-semibold text-lg mb-4">
        <span className="font-bold text-black">Document:</span> Terms & conditions, Privacy policy, Refund Policy
      </h2>

      <ol className="list-decimal list-inside space-y-4">
        <li>
          <h3 className="font-semibold text-lg">General Terms</h3>
          <p className="text-gray-700">
            This Privacy Policy forms part of the Terms of Service for this web app.
            By accessing or using this service, you accept these terms. If you do not agree, please refrain from using the app.
          </p>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Modification of Terms</h3>
          <p className="text-gray-700">
            Our Terms may change over time. Continued use of the web app after updates indicates acceptance of any changes.
            Please review our Terms and Privacy Policy periodically.
          </p>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Services Provided</h3>
          <p className="text-gray-700">
            This web app provides online billing, invoicing, and basic accounting tools for small and medium businesses.
            Accessible through web browsers, it allows for secure cloud-based storage of billing records.
            Users are responsible for compliance with any relevant legal and regulatory requirements.
          </p>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Charges</h3>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Transaction Fees:</span> A charge of 1% will be applicable per transaction processed through the web app.
              This fee applies to all transactions made via the app unless otherwise stated.
            </li>
            <li>
              <span className="font-semibold">Payment Method:</span> The charge will be deducted automatically from the transaction amount at the time of payment processing.
              The exact charges applicable to your transaction will be clearly displayed before completing the transaction.
            </li>
            <li>
              <span className="font-semibold">Future Changes:</span> We reserve the right to modify or update the transaction charges at any time.
              Users will be notified of any changes prior to their next transaction.
            </li>
          </ul>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Data Collection and Permissions</h3>
          <p className="text-gray-700 mb-2">
            Initially a free web app, the service collects minimal data to improve the user experience, including:
          </p>
          <ul className="list-disc list-inside ml-4 space-y-2 text-gray-700">
            <li>
              <span className="font-semibold">Contact Information:</span> For invoicing, client records, and account management.
            </li>
            <li>
              <span className="font-semibold">Usage Data:</span> Includes session times, IP addresses, and device/browser details for analytics and security.
            </li>
            <li>
              <span className="font-semibold">Uploaded Documents:</span> Any bills or invoices you upload are stored securely to enable easy access across devices.
            </li>
            <li>
              <span className="font-semibold">Location Data:</span> Used to verify your business location and prevent fraud; collected only during active sessions.
            </li>
          </ul>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Data Security and Ownership</h3>
          <p className="text-gray-700">
            Your data is securely stored, and you retain full ownership of all billing and transaction records.
            The service provider uses this data only for providing and improving the service.
            Industry-standard security protocols, including encryption and firewall protections, are employed.
          </p>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Data Retention & Deletion</h3>
          <p className="text-gray-700">
            Your data will be retained only as long as needed for service provision or as required by law.
            You may request deletion of your account and data by contacting our support team.
          </p>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Notifications and Communication</h3>
          <p className="text-gray-700">
            As a free service, the app may send periodic notifications and promotional content to registered users,
            in accordance with our Terms.
          </p>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Refund Policy</h3>
          <p className="text-gray-700">
            Since this is a free web app, no fees or payments are required to access its features.
            Therefore, no refunds are applicable for using this service.
          </p>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Future Paid Services</h3>
          <p className="text-gray-700">
            If any paid features are introduced in the future, a clear refund policy specific to those features will be
            provided and communicated to users in advance.
          </p>
        </li>

        <li>
          <h3 className="font-semibold text-lg">Transaction Fees</h3>
          <p className="text-gray-700">
            Any transaction fees charged per transaction are non-refundable, even in the case of cancellations or refunds of the main transaction.
          </p>
        </li>
      </ol>
    </div>
  );
};

export default PrivacyPolicyModal;
