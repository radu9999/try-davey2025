import { useState } from 'react';
import { useWizard } from 'react-use-wizard';
import { Form, Formik } from "formik";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import { UserRegister } from "@/api/modernCommuneApi";
import ElementWrapper from "./ElementWrapper";
import { useWizardContext } from './WizardContext';
import { step2ValidationSchema } from "./schema";
import { useSendSMSMutation, useVerifySMSMutation } from "@/store/api/auth/mutation";
import { convertPhoneNumber } from "@/utils/general";

const Step2 = () => {
  const { previousStep, nextStep } = useWizard();
  const { formValues, setFormValues } = useWizardContext();
  const [ isChecked, setChecked ] = useState<boolean>(formValues.isAlert || false);
  const [ isConfirmCode, setConfirmCode ] = useState<boolean>(formValues.isPhoneVerification);
  const [ isSendCode, setSendCode ] = useState<boolean>(formValues.isPhoneVerification);
  const [ isNext, setNext ] = useState<boolean>(false);

  const [ sendSMS, { isLoading: sendLoading } ] = useSendSMSMutation();
  const [ verifySMS, { isLoading: verifyLoading } ] = useVerifySMSMutation();

  const onChangeEvent = (e: any) => {
    setChecked(e.target.checked);
  }

  const handleNext = (values: UserRegister) => {
    values.isAlert = isChecked;
    setFormValues(values);
    nextStep();
  };

  const sendCode = async (values: UserRegister) => {
    try {
      const response = await sendSMS({
        userSMS: {
          email: values.email,
          phone: convertPhoneNumber(values.phone)
        }
      });

      if ("data" in response) {
        setSendCode(true);
      }
    }
    catch (e) {
      console.log("error message", e);
    }
  };

  const handleSubmit = async (values: UserRegister, isNext: boolean) => {
    if (isNext) {
      handleNext(values);
    } else {
      sendCode(values);
    }
  }

  const verifyCode = async (formik: any) => {
    try {
      const response = await verifySMS({
        userSMSVerify: {
          email: formik.values.email,
          phone: convertPhoneNumber(formik.values.phone),
          code: formik.values.phoneCode
        }
      });

      if ("data" in response) {
        formik.values.isPhoneVerification = true;
        setConfirmCode(true);
      }
    }
    catch (e) {
      console.log("error message", e);
    }
  };
  
  return (
    <Formik<UserRegister>
      initialValues={formValues}
      onSubmit={(values) => handleSubmit(values, isNext)}
      validationSchema={step2ValidationSchema}
    >
    {({ submitForm, ...formik }) => (
      <Form>
        <h2 className="text-3xl mb-6 font-poppins text-center text-neutral-4 font-extrabold">
          Phone, Text, Notifications
        </h2>
        <div className="flex flex-row gap-8">
          <div className="flex flex-col gap-4">
            <ElementWrapper title="Phone Number">
              <Input
                type="text"
                name="phone"
                placeholder="(212) 555-2343"
              />
            </ElementWrapper>
            <Input
              type="checkbox"
              name="isAlert"
              label="Text me at this number"
              checked={isChecked} 
              onChange={(e) => onChangeEvent(e)}
            />
            <Button
              className="text-white rounded-lg border-0 py-2 px-6 text-sm w-full"
              variant="primary"
              size="lg"
              type="button"
              onClick={() => {
                setNext(false);
                submitForm();
              }}
              disabled={isSendCode}
              loading={sendLoading}
            >
              Send Code
            </Button>
            {!isConfirmCode ? (
            <div className="flex flex-row gap-4">
              <Input
                type="text"
                name="phoneCode"
                label="Enter Verification Code"
              />
              <Button
                className="text-white rounded-lg border-0 py-2 px-6 text-sm w-full mt-8"
                variant="primary"
                size="lg"
                type="button"
                onClick={() => verifyCode(formik)}
                loading={verifyLoading}
              >
                Verify
              </Button>
            </div>
            ) : (
            <div className='text-alerts-success-2 text-center'>Phone has been Verified</div>
            )}
          </div>
          
          <div className="flex flex-col gap-4">
            <Input
              type="checkbox"
              name="notifications[0]"
              label="Text me when I receive a new notification"
              disabled={!isChecked} 
            />
            <Input
              type="checkbox"
              name="notifications[1]"
              label="Text me when my challenges are about to begin"
              disabled={!isChecked} 
            />
            <Input
              type="checkbox"
              name="notifications[2]"
              label="Text me when my challenges begin"
              disabled={!isChecked} 
            />
            <Input
              type="checkbox"
              name="notifications[3]"
              label="Text me when my challenges are about to end"
              disabled={!isChecked} 
            />
            <Input
              type="checkbox"
              name="notifications[4]"
              label="Text me when my challenges end"
              disabled={!isChecked} 
            />
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
            onClick={() => {
              setNext(true);
              submitForm();
            }}
            type="button"
          >
            Next
          </Button>
        </div>
      </Form>
    )}
    </Formik>
  );
};

export default Step2;