import { Yup } from "@/utils/yupExport";
import { CharityBalance } from "@/api/modernCommuneApi";

export const amountValidationSchema = (charityBalance?: CharityBalance) => {
  const min = charityBalance?.minimumDonation ?? 0;
  const max = charityBalance?.commissionBalance ?? 0;

  return Yup.object().shape({
    amount: Yup.number()
      .required("The amount field is required.")
      .min(min, `Amount must be at least ${min}`)
      .max(max, `Amount must be at most ${max}`),
  });
};