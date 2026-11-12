const PrivacyPolicy = () => {
  return (
    <div className="w-full flex flex-col items-center overflow-x-hidden overflow-y-auto px-2 sm:px-4 text-black ">
      <div className="w-full sm:w-[90%] md:w-[75%] lg:w-[70%] p-4 flex flex-col my-3 border-2 border-[#ccc] rounded-lg bg-white shadow-md">
        <h1 className="text-lg sm:text-xl font-semibold mb-2">
          NOWIT SERVICES - Privacy Policy
        </h1>

        <p className="text-sm mb-2">
          Nowit Services is committed to safeguarding user privacy on the{" "}
          <span className="font-semibold">WON Bridge</span> web app. This
          policy outlines how we handle data collection, usage, and security.
        </p>

        <h2 className="text-sm text-black">
          <span className="font-semibold text-black">App Name:</span> WON Bridge
          (Web App)
        </h2>
        <h2 className="text-sm text-black">
          <span className="font-semibold text-black">Developer:</span> NOWIT
          SERVICES Pvt Ltd
        </h2>
        <h2 className="text-sm text-black mb-2">
          <span className="font-semibold text-black">Document:</span> Terms &
          conditions, Privacy policy, Refund Policy
        </h2>

        <div className="w-full h-px bg-black my-2" />

        <ol className="w-full list-decimal pl-5 text-sm space-y-3">
          <li>
            <p className="font-semibold m-0">General Terms</p>
            <span>
              This Privacy Policy forms part of the Terms of Service for this
              web app. By accessing or using this service, you accept these
              terms. If you do not agree, please refrain from using the app.
            </span>
          </li>

          <li>
            <p className="font-semibold m-0">Modification of Terms</p>
            <span>
              Our Terms may change over time. Continued use of the web app after
              updates indicates acceptance of any changes. Please review our
              Terms and Privacy Policy periodically.
            </span>
          </li>

          <li>
            <p className="font-semibold m-0">Services Provided</p>
            <span>
              This web app provides online billing, invoicing, and basic
              accounting tools for small and medium businesses. Accessible
              through web browsers, it allows for secure cloud-based storage of
              billing records. Users are responsible for compliance with any
              relevant legal and regulatory requirements.
            </span>
          </li>

          <li>
            <p className="font-semibold m-0">Charges</p>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <span className="font-semibold">Transaction Fees:</span> A
                charge of 1% will be applicable per transaction processed
                through the web app. This fee applies to all transactions made
                via the app unless otherwise stated.
              </li>
              <li>
                <span className="font-semibold">Payment Method:</span> The
                charge will be deducted automatically from the transaction
                amount at the time of payment processing. The exact charges
                applicable to your transaction will be clearly displayed before
                completing the transaction.
              </li>
              <li>
                <span className="font-semibold">Future Changes:</span> We
                reserve the right to modify or update the transaction charges at
                any time. Users will be notified of any changes prior to their
                next transaction.
              </li>
            </ul>
          </li>

          <li>
            <p className="font-semibold m-0">Data Collection and Permissions</p>
            <span>
              Initially a free web app, the service collects minimal data to
              improve the user experience, including:
            </span>
            <ul className="list-disc pl-5 mt-1 space-y-1">
              <li>
                <span className="font-semibold">Contact Information:</span> For
                invoicing, client records, and account management.
              </li>
              <li>
                <span className="font-semibold">Usage Data:</span> Includes
                session times, IP addresses, and device/browser details for
                analytics and security.
              </li>
              <li>
                <span className="font-semibold">Uploaded Documents:</span> Any
                bills or invoices you upload are stored securely to enable easy
                access across devices.
              </li>
              <li>
                <span className="font-semibold">Location Data:</span> Used to
                verify your business location and prevent fraud; collected only
                during active sessions.
              </li>
            </ul>
          </li>

          <li>
            <p className="font-semibold m-0">Data Security and Ownership</p>
            <span>
              Your data is securely stored, and you retain full ownership of all
              billing and transaction records. The service provider uses this
              data only for providing and improving the service.
              Industry-standard security protocols, including encryption and
              firewall protections, are employed.
            </span>
          </li>

          <li>
            <p className="font-semibold m-0">Data Retention & Deletion</p>
            <span>
              Your data will be retained only as long as needed for service
              provision or as required by law. You may request deletion of your
              account and data by contacting our support team.
            </span>
          </li>

          <li>
            <p className="font-semibold m-0">Notifications and Communication</p>
            <span>
              As a free service, the app may send periodic notifications and
              promotional content to registered users, in accordance with our
              Terms.
            </span>
          </li>

          <li>
            <p className="font-semibold m-0">Refund Policy</p>
            <span>
              Since this is a free web app, no fees or payments are required to
              access its features. Therefore, no refunds are applicable for
              using this service.
            </span>
          </li>

          <li>
            <p className="font-semibold m-0">Future Paid Services</p>
            <span>
              If any paid features are introduced in the future, a clear refund
              policy specific to those features will be provided and
              communicated to users in advance.
            </span>
          </li>

          <li>
            <p className="font-semibold m-0">Transaction Fees</p>
            <span>
              Any transaction fees charged per transaction are non-refundable,
              even in the case of cancellations or refunds of the main
              transaction.
            </span>
          </li>
        </ol>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
