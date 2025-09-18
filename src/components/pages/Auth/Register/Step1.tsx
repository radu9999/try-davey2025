import { useWizard } from 'react-use-wizard';
import { Form, Formik } from "formik";
import Button from "@/components/UI/Button";
import Input from "@/components/UI/Form/Input";
import Select, { Option } from "@/components/UI/Select";
import { step1ValidationSchema } from "./schema";
import ElementWrapper from "./ElementWrapper";
import { useWizardContext } from './WizardContext';
import { UserRegister } from "@/api/modernCommuneApi";
import { useCheckUserMutation } from "@/store/api/auth/mutation";

const Step1 = () => {
  const { nextStep } = useWizard();
  const { formValues, setFormValues } = useWizardContext();
  const [ checkUser, { isLoading: checkLoading } ] = useCheckUserMutation();

  const countryOptions: Option[] = [
    { label: "United States", value: "USA" }
  ];

  const stateOptions: Option[] = [
    { label: "Alabama", value: "AL" },
    { label: "Alaska", value: "AK" },
    { label: "Arizona", value: "AZ" },
    { label: "Arkansas", value: "AR" },
    { label: "California", value: "CA" },
    { label: "Colorado", value: "CO" },
    { label: "Connecticut", value: "CT" },
    { label: "Delaware", value: "DE" },
    { label: "District Of Columbia", value: "DC" },
    { label: "Florida", value: "FL" },
    { label: "Georgia", value: "GA" },
    { label: "Hawaii", value: "HI" },
    { label: "Idaho", value: "ID" },
    { label: "Illinois", value: "IL" },
    { label: "Indiana", value: "IN" },
    { label: "Iowa", value: "IA" },
    { label: "Kansas", value: "KS" },
    { label: "Kentucky", value: "KY" },
    { label: "Louisiana", value: "LA" },
    { label: "Maine", value: "ME" },
    { label: "Maryland", value: "MD" },
    { label: "Massachusetts", value: "MA" },
    { label: "Michigan", value: "MI" },
    { label: "Minnesota", value: "MN" },
    { label: "Mississippi", value: "MS" },
    { label: "Missouri", value: "MO" },
    { label: "Montana", value: "MT" },
    { label: "Nebraska", value: "NE" },
    { label: "Nevada", value: "NV" },
    { label: "New Hampshire", value: "NH" },
    { label: "New Jersey", value: "NJ" },
    { label: "New Mexico", value: "NM" },
    { label: "New York", value: "NY" },
    { label: "North Carolina", value: "NC" },
    { label: "North Dakota", value: "ND" },
    { label: "Ohio", value: "OH" },
    { label: "Oklahoma", value: "OK" },
    { label: "Oregon", value: "OR" },
    { label: "Pennsylvania", value: "PA" },
    { label: "Rhode Island", value: "RI" },
    { label: "South Carolina", value: "SC" },
    { label: "South Dakota", value: "SD" },
    { label: "Tennessee", value: "TN" },
    { label: "Texas", value: "TX" },
    { label: "Utah", value: "UT" },
    { label: "Vermont", value: "VT" },
    { label: "Virginia", value: "VA" },
    { label: "Washington", value: "WA" },
    { label: "West Virginia", value: "WV" },
    { label: "Wisconsin", value: "WI" },
    { label: "Wyoming", value: "WY" }
  ];

  const handleRegister = async (values: UserRegister) => {
    if (!values.isUserCheck) {
      try {
        const response = await checkUser({
          userInfo: {
            email: values.email,
            password: values.password
          }
        });
  
        if ("data" in response) {
          values.isUserCheck = true;
          setFormValues(values);
          nextStep();
        }
      }
      catch (e) {
        console.log("error message", e);
      }
    } else {
      setFormValues(values);
      nextStep();
    }
  };

  return (
    <Formik<UserRegister>
      initialValues={formValues}
      onSubmit={handleRegister}
      validationSchema={step1ValidationSchema}
    >
    {({ submitForm }) => (
      <Form>
        <h2 className="text-3xl mb-6 font-poppins text-center text-neutral-4 font-extrabold">
          Personal Information
        </h2>
        <div className="flex flex-col gap-8">
          <div className="flex flex-row gap-4">
            <ElementWrapper title="Email / Username">
              <Input
                type="text"
                name="email"
                tabIndex={1}
              />
            </ElementWrapper>
            <ElementWrapper title="Country">
              <Select
                size="lg"
                name="country"
                options={countryOptions}
                classNameProps="py-4"
                tabIndex={7}
              />
            </ElementWrapper>
          </div>
          <div className="flex flex-row gap-4">
            <ElementWrapper title="First Name">
              <Input
                type="text"
                name="firstName"
                tabIndex={2}
              />
            </ElementWrapper>
            <ElementWrapper title="Street">
              <Input
                type="text"
                name="address"
                tabIndex={8}
              />
            </ElementWrapper>
          </div>
          <div className="flex flex-row gap-4">
            <ElementWrapper title="Last Name">
              <Input
                type="text"
                name="lastName"
                tabIndex={3}
              />
            </ElementWrapper>
            <ElementWrapper title="Unit, Apt">
              <Input
                type="text"
                name="unit"
                tabIndex={9}
              />
            </ElementWrapper>
          </div>
          <div className="flex flex-row gap-4">
            <ElementWrapper title="Alias">
              <Input
                type="text"
                name="alias"
                tabIndex={4}
              />
            </ElementWrapper>
            <ElementWrapper title="City">
              <Input
                type="text"
                name="city"
                tabIndex={10}
              />
            </ElementWrapper>
          </div>
          <div className="flex flex-row gap-4">
            <ElementWrapper title="Password">
              <Input
                type="password"
                name="password"
                tabIndex={5}
              />
            </ElementWrapper>
            <ElementWrapper title="State / Region">
              <Select
                size="lg"
                name="state"
                options={stateOptions}
                classNameProps="py-4"
                tabIndex={11}
              />
            </ElementWrapper>
          </div>
          <div className="flex flex-row gap-4">
            <ElementWrapper title="Confirm Password">
              <Input
                type="password"
                name="confirmPassword"
                tabIndex={6}
              />
            </ElementWrapper>
            <ElementWrapper title="Zip / Postal Code">
              <Input
                type="text"
                name="postalCode"
                tabIndex={12}
              />
            </ElementWrapper>
          </div>
          <div className="mt-8 flex items-center justify-end gap-4">
            <Button
              className="text-white w-fit rounded-lg border-0 py-2 px-6 text-sm"
              variant="primary"
              size="lg"
              onClick={submitForm}
              loading={checkLoading}
              type="button"
              tabIndex={13}
            >
              Next
            </Button>
          </div>
        </div>
      </Form>
    )}
    </Formik>
  );
};

export default Step1;