import { useWizard } from 'react-use-wizard';
import { Form, Formik } from "formik";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import Label from "@/components/UI/Form/Label";
import { UserRegister } from "@/api/modernCommuneApi";
import ElementWrapper from "./ElementWrapper";
import { useWizardContext } from './WizardContext';
import { useRegisterMemberMutation } from "@/store/api/auth/mutation";
import { useNavigate } from "react-router-dom";
import { ROUTES } from "@/constants/routes";
import { convertPhoneNumber, convertNotification } from "@/utils/general";

const Step4 = () => {
  const { previousStep } = useWizard();
  const { formValues } = useWizardContext();

  const navigate = useNavigate();

  const [ register, { isLoading: registerLoading } ] = useRegisterMemberMutation();

  const handleRegister = async (values: UserRegister) => {
    try {
      const response = await register({
        userRegister: {
          email: values.email,
          firstName: values.firstName,
          lastName: values.lastName,
          alias: values.alias,
          password: values.password,
          country: values.country,
          address: values.address,
          unit: values.unit,
          city: values.city,
          state: values.state,
          postalCode: values.postalCode,
          phone: convertPhoneNumber(values.phone),
          notifications: convertNotification(values.notifications),
          isPhoneVerification: values.isPhoneVerification,
          promoCode: values.promoCode
        },
      });

      if ("data" in response) {
        const payload = {
          email: values.email
        };

        navigate(ROUTES.VERIFY, { state: payload });
      }
    }
    catch (e) {
      console.log("error message", e);
    }
  };
  
  return (
    <Formik<UserRegister>
    initialValues={formValues}
    onSubmit={handleRegister}
    >
    {({ submitForm }) => (
      <Form>
        <h2 className="text-3xl mb-6 font-poppins text-center text-neutral-4 font-extrabold">
          Account Verification
        </h2>
        <div className="flex flex-col gap-8 max-w-[800px]">
          <div>
            <Label className="font-bold">Referral Code</Label>
            <p>
            If another Member has given you a Referral Code to use during registration, please enter it below.
            </p>
          </div>
          <ElementWrapper title="Enter Referral Code">
            <Input
              type="text"
              name="promoCode"
            />
          </ElementWrapper>
          <div>
            <Label className="font-bold">Account Verification</Label>
            <p>Please click on the "Verify Account" button below to complete your registation.</p>
            <p>You will receive an email with a link to verify your account, along with your unique Promo Code.</p>
            <p>You can give this Promo Code to friends and aquaintances to use as they shop in the Try Davey store.</p>
          </div>
        </div>
        <div className="mt-8 flex items-center justify-end gap-4">
          <Button
            className="text-white w-fit rounded-lg border-0 py-2 px-6 text-sm"
            variant="primary"
            size="lg"
            onClick={() => previousStep()}
            type="button"
          >
            Previous
          </Button>
          <Button
            className="text-white w-fit rounded-lg border-0 py-2 px-6 text-sm"
            variant="primary"
            size="lg"
            onClick={submitForm}
            type="button"
            loading={registerLoading}
          >
            Verify Account
          </Button>
        </div>
      </Form>
    )}
    </Formik>
  );
};

export default Step4;