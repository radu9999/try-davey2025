import { Form, Formik } from "formik";

import { UserLogin } from "@/api/modernCommuneApi";
import EnvelopeIcon from "@/components/Icons/Envelope";
import LockIcon from "@/components/Icons/Lock";
import ModernCommLogo from "@/components/Icons/ModernCommLogo";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import Label from "@/components/UI/Form/Label";
import { ROUTES } from "@/constants/routes";
import { useAppSelector } from "@/store";
import { useLoginMemberMutation } from "@/store/api/auth/mutation";
import toast from "react-hot-toast";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { LoginSchema } from "./schema";

const LoginInput = Input<UserLogin>;

const LoginPage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const { token } = useAppSelector((state) => state.member);

  // Login Hook
  const [login, { isLoading: loginLoading }] = useLoginMemberMutation();

  // TODO : replace with real login
  const handleLogin = async (values: UserLogin) => {
    try {
      const response = await login({
        userLogin: {
          userName: values.userName,
          password: values.password,
        },
      });

      if ("data" in response) {
        toast.success(
          `${response.data?.memberName}, Welcome to ModernCommune!`,
          {
            style: {
              whiteSpace: "nowrap",
              minWidth: "fit-content",
            },
          }
        );
        navigate(ROUTES.MEMBER_DASHBOARD);
      }
    } catch (e) {
      console.log("error message", e);
    }

    // localStorage.setItem("modern-token", "any-token");
    // navigate(ROUTES.HOME);
  };

  return token ? (
    <Navigate to={ROUTES.HOME} replace state={{ from: location }} />
  ) : (
    <div className="flex flex-col justify-center items-center bg-neutral-2 w-full h-screen">
      <div className="rounded-lg shadow-lg overflow-hidden w-fit h-fit bg-neutral-1">
        <div className="bg-primary-2 px-6 py-4 flex items-center justify-center">
          <ModernCommLogo />
        </div>
        <div className="px-7 py-8 ">
          <h2 className="text-3xl mb-1 font-poppins text-center text-neutral-4 font-black">
            Sign In
          </h2>
          <p className="pb-8 text-neutral-4 px-10 text-lg  font-normal text-center leading-tight">
            Enter your email address and password <br /> to access account.
          </p>
          <Formik<UserLogin>
            initialValues={{
              userName: "",
              password: "",
            }}
            onSubmit={handleLogin}
            validationSchema={LoginSchema}
          >
            {({ submitForm }) => (
              <Form>
                <div className="flex flex-col">
                  <div className="w-full flex flex-col gap-8">
                    <LoginInput
                      type="text"
                      name="userName"
                      placeholder="UserName"
                      Icon={EnvelopeIcon}
                      login={true}
                    />
                    <LoginInput
                      placeholder="Password"
                      type="password"
                      name="password"
                      Icon={LockIcon}
                      login={true}
                    />
                  </div>

                  <div className="mt-3 mb-8 text-sm text-right text-primary-2">
                    <Link
                      className="w-full text-center"
                      to={ROUTES.FORGET_PASS}
                    >
                      <button>Forgot Password</button>
                    </Link>
                  </div>

                  <div className="flex items-center justify-center">
                    <Button
                      className="text-white font-bold w-fit rounded-lg border-0 py-2 px-6 text-sm"
                      variant="primary"
                      size="lg"
                      onClick={submitForm}
                      type="button"
                      loading={loginLoading}
                    >
                      Login
                    </Button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div className="overflow-hidden w-fit h-fit mt-5">
        <Label className="normal-case mr-3">Don't you have account?</Label>
        <Link
          className="w-full text-center"
          to={ROUTES.REGISTER}
        >
          <button>Register</button>
        </Link>
      </div>

    </div>
  );
};

export default LoginPage;
