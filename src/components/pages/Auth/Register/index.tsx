import ModernCommLogo from "@/components/Icons/ModernCommLogo";
import Label from "@/components/UI/Form/Label";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store";
import { Link, Navigate, useLocation } from "react-router-dom";
import { WizardProvider } from './WizardContext';
import { Wizard } from 'react-use-wizard';
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'

const RegisterPage = () => {
  const location = useLocation();

  const { token } = useAppSelector((state) => state.member);

  return token ? (
    <Navigate to={ROUTES.HOME} replace state={{ from: location }} />
  ) : (
    <div className="flex flex-col justify-center items-center bg-neutral-2 w-full h-screen">
      <div className="rounded-lg overflow-hidden w-fit bg-neutral-1">
        <div className="bg-primary-2 px-6 py-4 flex items-center justify-center">
          <ModernCommLogo />
        </div>
        <div className="p-6">
          <WizardProvider>
            <Wizard>
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
            </Wizard>
          </WizardProvider>
        </div>
      </div>
      <div className="overflow-hidden w-fit h-fit mt-5">
        <Label className="normal-case mr-3">Alerady have account?</Label>
        <Link
          className="w-full text-center"
          to={ROUTES.LOGIN}
        >
          <button>Log in</button>
        </Link>
      </div>
    </div>
  );
};

export default RegisterPage;
