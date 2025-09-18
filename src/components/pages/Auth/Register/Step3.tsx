import { useWizard } from 'react-use-wizard';
import { Form, Formik } from "formik";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import { UserRegister } from "@/api/modernCommuneApi";
import { useWizardContext } from './WizardContext';
import { step3ValidationSchema } from "./schema";

const Step3 = () => {
  const { previousStep, nextStep } = useWizard();
  const { formValues, setFormValues } = useWizardContext();

  const handleRegister = (values: UserRegister) => {
    setFormValues(values);
    nextStep();
  };
  
  return (
    <Formik<UserRegister>
    initialValues={formValues}
    onSubmit={handleRegister}
    validationSchema={step3ValidationSchema}
  >
    {({ submitForm }) => (
      <Form>
        <h2 className="text-3xl mb-6 font-poppins text-center text-neutral-4 font-extrabold">
          Terms of Service
        </h2>
        <div className="flex flex-col gap-8 max-w-[800px]">
          <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Enim neque volutpat ac tincidunt vitae semper. In aliquam sem fringilla ut morbi tincidunt augue. Feugiat vivamus at augue eget arcu dictum varius duis at. Aenean sed adipiscing diam donec
          </p>
          <p>
          Turpis nunc eget lorem dolor sed viverra ipsum. Maecenas ultricies mi eget mauris pharetra et ultrices neque ornare. Risus pretium quam vulputate dignissim suspendisse in est ante. Sagittis id consectetur purus ut faucibus. Facilisis leo vel fringilla est ullamcorper eget nulla facilisi etiam. In egestas erat imperdiet sed. Id 
          </p>
          <Input
            type="checkbox"
            name="terms"
            label="I agree to the Terms of Service"
          />
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
          >
            Next
          </Button>
        </div>
      </Form>
    )}
    </Formik>
  );
};

export default Step3;