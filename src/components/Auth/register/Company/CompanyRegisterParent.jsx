import { useState } from "react";
import CompanyDataForm1 from "./components/CompanyDataForm1";
import CompanyDataForm2 from "./components/CompanyDataForm2";
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

            case 2:
                return (
                    <CompanyDataForm2
                        data={formData}
                        setData={setFormData}
                        nextStep={nextStep}
                        prevStep={prevStep}
                    />
                );

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

    return (renderStep());
};

export default CompanyRegisterParent;
