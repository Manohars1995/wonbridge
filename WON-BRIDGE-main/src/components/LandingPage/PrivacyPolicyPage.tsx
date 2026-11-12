import { useState } from "react";

import LandingHeader from "./Elements/Header";
import Footer from "./Elements/Footer";
import EnquiryForm from "./Elements/Contact";
import PrivacyPolicy from "./PrivacyPolicy";

const PrivacyPolicyPage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);
  const onOpen = () => setIsOpen(true);
  return (
    <div className="bg-white rounded-xl pt-14 px-3 pb-3">
      <LandingHeader openForm={onOpen} />
      <PrivacyPolicy />
      <Footer />
      <EnquiryForm isOpen={isOpen} close={onClose} />
    </div>
  );
};

export default PrivacyPolicyPage;
