import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { registerCompany } from "../../../../slices/RegisterCompanySlice";

import CompanyDataForm1 from "./components/CompanyDataForm1";
import CompanyDataForm2 from "./components/CompanyDataForm2";
import CompanyDataForm3 from "./components/CompanyDataForm3";

const CompanyRegisterParent = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Redux state
    const { loading, data, error } = useSelector((state) => state.registerCompany);

    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        password: "",
        password_confirmation: "",
        city: "",
        region: "",
        address: "",
        postalcode: "",
        house_number: "",
        company_name: "",
        contact_person: "",
        tax_id: "",
    });

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    // -------- Handle Final Submit -----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(registerCompany(formData));

        if (registerCompany.fulfilled.match(result)) {
            alert("🎉 Company registered successfully!");
            navigate("/login");
        }

        if (registerCompany.rejected.match(result)) {
            alert("❌ Registration failed. Please try again.");
        }
    };
    // ------------------------------------------------

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <CompanyDataForm1
                        data={formData}
                        setData={setFormData}
                        nextStep={nextStep}
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

            case 3:
                return (
                    <CompanyDataForm3
                        data={formData}
                        setData={setFormData}
                        prevStep={prevStep}
                        handleSubmit={handleSubmit}
                        loading={loading}    
                    />
                );

            default:
                return <p>Step not found</p>;
        }
    };

    return renderStep();
};

export default CompanyRegisterParent;
