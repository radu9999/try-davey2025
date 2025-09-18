import { Yup } from "@/utils/yupExport";

export const step1ValidationSchema = Yup.object().shape({
  email: Yup.string().required("The User Name / Email field is required."),
  alias: Yup.string().required("The Alias is required."),
  firstName: Yup.string().required("The First Name is required."),
  lastName: Yup.string().required("The Last Name is required."),
  country: Yup.string().required("The Country is required."),
  state: Yup.string().required("The State is required."),
  address: Yup.string().required("The Address is required."),
  city: Yup.string().required("The City is required."),
  postalCode: Yup.string().required("The Postal Code is required."),
  password: Yup
    .string()
    .required('Password Required!')
    .min(8, 'Password is too short - should be 8 chars minimum')
    .matches(/(?=.*[A-Z])/, 'Password must contain at least one uppercase letter')
    .matches(/(?=.*[0-9])/, 'Password must contain at least one digit')
    .matches(/[^\w\d]/, 'Password must contain at least one non-alphanumeric character'),
  confirmPassword: Yup.string().required('Confirm password is reqired!').oneOf([Yup.ref('password')], 'Passwords must match'),
});

export const step2ValidationSchema = Yup.object().shape({
  phone: Yup.string().required("The Phone is required.").matches(/^[(]{0,1}[0-9]{3}[)]{0,1}[-\s\.]{0,1}[0-9]{3}[-\s\.]{0,1}[0-9]{4}$/, 'Phone number is not valid.'),
});

export const step3ValidationSchema = Yup.object().shape({
  terms: Yup.boolean().oneOf([true],'Please accept the Terms of Service before continuing')
});