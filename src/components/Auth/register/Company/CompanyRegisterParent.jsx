import { useState } from "react";
import CompanyDataForm1 from "./components/CompanyDataForm1";
// import CompanyDataForm2 from "./CompanyDataForm2";  // هتضيفه بعد ما تبعته
// import CompanyDataForm3 from "./CompanyDataForm3";

const CompanyRegisterParent = () => {
  const [currentStep, setCurrentStep] = useState(1);

  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    phone: "",
    password: "",
    password_confirmation: "",
    // باقي البيانات بتاعة Step2 و Step3 هتضاف هنا لما تبعتهالي
  });

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  // --- Switch Steps ---
  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CompanyDataForm1
            data={formData}
            setData={setFormData}
            nextStep={nextStep}
            prevStep={prevStep}
          />
        );

      // case 2:
      //   return (
      //     <CompanyDataForm2
      //       data={formData}
      //       setData={setFormData}
      //       nextStep={nextStep}
      //       prevStep={prevStep}
      //     />
      //   );

      // case 3:
      //   return (
      //     <CompanyDataForm3
      //       data={formData}
      //       setData={setFormData}
      //       prevStep={prevStep}
      //     />
      //   );

      default:
        return <p>Step not found</p>;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 bg-equipmentBg">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-2xl p-8 border border-gray-100 animate-[fadeIn_0.5s_ease-out]">
        {/* Header Tabs ثابتة فوق كل Step */}
        <div className="flex justify-center mb-8 space-x-6 text-gray-500">
          <a
            href="/login"
            className="hover:text-primaryBtn transition-colors duration-200"
          >
            Login
          </a>

          <span className="text-primaryBtn font-semibold border-b-2 border-primaryBtn pb-1">
            Register
          </span>
        </div>

        {/* Render steps */}
        {renderStep()}
      </div>
    </div>
  );
};

export default CompanyRegisterParent;
