import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { registerRenter } from "../../../../slices/RegisterRenterSlice";
import RenterDataForm1 from "./components/RenterDataForm1";
import RenterDataForm2 from "./components/RenterDataForm2";

const RenterRegisterParent = () => {
    const dispatch = useDispatch();

    // Redux state
    const { loading, data, error } = useSelector((state) => state.registerRenter);

    const [currentStep, setCurrentStep] = useState(1);

    const [formData, setFormData] = useState({
        full_name: "",
        email: "",
        phone: "",
        contact_person: "",
        password: "",
        password_confirmation: "",
        city: "",
        region: "",
        address: "",
        house_number: "",
        postalcode: "",
        tax_id: "",
    });

    const nextStep = () => setCurrentStep((prev) => prev + 1);
    const prevStep = () => setCurrentStep((prev) => prev - 1);

    // -------- Handle Final Submit -----------------
    const handleSubmit = async (e) => {
        e.preventDefault();

        const result = await dispatch(registerRenter(formData));

        if (registerRenter.fulfilled.match(result)) {
            alert("🎉 Company registered successfully!");
        }

        if (registerRenter.rejected.match(result)) {
            alert("❌ Registration failed. Please try again.");
        }
    };
    // ------------------------------------------------

    const renderStep = () => {
        switch (currentStep) {
            case 1:
                return (
                    <RenterDataForm1
                        data={formData}
                        setData={setFormData}
                        nextStep={nextStep}
                    />
                );

            case 2:
                return (
                    <RenterDataForm2
                        data={formData}
                        setData={setFormData}
                        prevStep={prevStep}
                        handleSubmit={handleSubmit}
                        loading={loading}   // 👈 مهم جدًا
                    />
                );

            default:
                return <p>Step not found</p>;
        }
    };

    return renderStep();
};

export default RenterRegisterParent;
