import ModernCommLogo from "@/components/Icons/ModernCommLogo";
import { useLocation } from "react-router-dom";

const VerifyPage = () => {
  const location = useLocation();
  const payload = location.state;

  return (
    <div className="flex flex-col justify-center items-center bg-neutral-2 w-full h-screen">
      <div className="rounded-lg overflow-hidden w-fit bg-neutral-1">
        <div className="bg-primary-2 px-6 py-4 flex items-center justify-center">
          <ModernCommLogo />
        </div>
        <div className="p-6">
          <h2 className="text-3xl mb-2 font-poppins text-center text-neutral-4 font-extrabold">
            Email Verification
          </h2>
          <p className="pb-8 px-16 text-neutral-4 text-base font-normal text-center leading-tight">
            We just sent an email to the address: {payload.email} <br/>
            Please check your email and select the link provided to verify your address.
          </p>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
