import { Yup } from "@/utils/yupExport";

export const LoginSchema = Yup.object().shape({
  userName: Yup.string().required("The User Name field is required."),
  password: Yup.string().required("The password field is required."),
});
