import { CharityBalance } from "@/api/modernCommuneApi";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import { SetStateAction } from "react";
import Input from "@/components/UI/Form/Input";
import { Form, Formik } from "formik";
import { amountValidationSchema } from "./schema";
import { useCreateCouponMutation } from "@/store/api/member/mutation";
import toast from "react-hot-toast";

interface StoreCreditModalProps {
  isOpen: boolean;
  setModalOpen: (value: SetStateAction<boolean>) => void;
  onOpenChange: (value: SetStateAction<boolean>) => void;
  onGetCommissionList: () => void;
  CharityBalance?: CharityBalance;
}

const StoreCreditModal = ({
  isOpen,
  onOpenChange,
  setModalOpen,
  onGetCommissionList,
  CharityBalance
}: StoreCreditModalProps) => {
  const [ createCoupon, { isLoading: submitLoading } ] = useCreateCouponMutation();

  const handleOk = async (values: any) => {
    try {
      const data = {
        amount: values.amount
      };

      const response = await createCoupon({payload: data});

      if ("data" in response) {
        toast.success(
          `Get Store Credit Successfully!`,
          {
            style: {
              whiteSpace: "nowrap",
              minWidth: "fit-content",
            },
          }
        );

        setModalOpen(false);
        onGetCommissionList();
      }
    }
    catch (e) {
      console.log("error message", e);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange} title="" description="">
      <Formik
        initialValues={{amount: ""}}
        onSubmit={handleOk}
        validationSchema={amountValidationSchema(CharityBalance)}
      >
        {({ submitForm }) => (
          <Form>
            <div className="w-[400px] bg-neutral-1">
              <div className="bg-primary-3 px-2 py-4 flex gap-2 w-full box-border justify-center">
                <p className="text-white text-xl font-bold">
                  Purchase to store credit
                </p>
              </div>
              <p className="p-5 text-center">Please enter an amount between 5 and {CharityBalance?.commissionBalance}.</p>
              <div className="flex justify-center p-3 text-xl">
                <div className="flex flex-row gap-4 items-center">
                  <label>Amount:</label>
                  <Input
                    type="text"
                    name="amount"
                    className="text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-center py-4">
                <div className="flex flex-row gap-6 items-center">
                  <Button
                    size="md"
                    onClick={submitForm}
                    className="text-center mb-4 mt-8 w-fit px-6 py-2 bg-primary-2 text-neutral-1 text-sm font-normal rounded-md"
                    loading={submitLoading}
                  >
                    OK
                  </Button>
                  <Button
                    size="md"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                    className="text-center mb-4 mt-8 w-fit px-6 py-2 bg-primary-2 text-neutral-1 text-sm font-normal rounded-md"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </Modal>
  );
};

export default StoreCreditModal;
