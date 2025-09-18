import { Form, Formik } from "formik";

import EnvelopeIcon from "@/components/Icons/Envelope";
import ModernCommLogo from "@/components/Icons/ModernCommLogo";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { ForgotPasswordInitials } from "./type";

const ForgotInput = Input<ForgotPasswordInitials>;

const ForgotPasswordPage = () => {
  const location = useLocation();

  const { token } = useAppSelector((state) => state.member);

  const navigate = useNavigate();
  // TODO : replace with real login
  const handleReset = () => {
    localStorage.setItem("modern-token", "any-token");
    navigate(ROUTES.HOME);
  };

  return token ? (
    <Navigate to={ROUTES.HOME} replace state={{ from: location }} />
  ) : (
    <div className="flex justify-center items-center bg-neutral-2 w-full h-screen">
      <div className="rounded-lg overflow-hidden w-fit bg-neutral-1">
        <div className="bg-primary-2 px-6 py-4 flex items-center justify-center">
          <ModernCommLogo />
        </div>
        <div className="p-6">
          <h2 className="text-3xl mb-2 font-poppins text-center text-neutral-4 font-extrabold">
            Forgot Password
          </h2>
          <p className="pb-8 px-16 text-neutral-4 text-base font-normal text-center leading-tight">
            Enter your email address <br /> to get password reset link.
          </p>
          <Formik<ForgotPasswordInitials>
            initialValues={{
              email: "",
            }}
            onSubmit={handleReset}
          >
            {({ submitForm }) => (
              <Form>
                <div className="flex flex-col">
                  <div className="w-full flex flex-col gap-8">
                    <ForgotInput
                      type="text"
                      name="email"
                      placeholder="Email"
                      Icon={EnvelopeIcon}
                    />
                  </div>

                  <div className="mt-3 mb-8 text-sm text-right text-primary-2">
                    <Link className="w-full text-center" to={ROUTES.LOGIN}>
                      <button>Login</button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center">
                    <Button
                      className="text-white w-fit rounded-lg border-0 py-2 px-6 text-sm"
                      variant="primary"
                      size="lg"
                      onClick={submitForm}
                    >
                      Send Reset Link
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
