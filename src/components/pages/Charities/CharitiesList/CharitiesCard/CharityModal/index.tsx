import { CharityCard, CharityBalance } from "@/api/modernCommuneApi";
import Button from "@/components/UI/Button";
import Modal from "@/components/UI/Modal";
import { SetStateAction } from "react";
import Input from "@/components/UI/Form/Input";
import { Form, Formik } from "formik";
import { donateValidationSchema } from "./schema";
import { useDonateMutation } from "@/store/api/charities/mutation";
import toast from "react-hot-toast";

interface CharityModalProps {
  isOpen: boolean;
  setModalOpen: (value: SetStateAction<boolean>) => void;
  onOpenChange: (value: SetStateAction<boolean>) => void;
  CharityCardDetails?: CharityCard;
  CharityBalance?: CharityBalance;
}

const initialValues: any = {
  amount: ""
};

const CharityModal = ({
  isOpen,
  onOpenChange,
  setModalOpen,
  CharityCardDetails,
  CharityBalance
}: CharityModalProps) => {

  const [ donate, { isLoading: donateLoading } ] = useDonateMutation();

  const handleDonate = async (values: any) => {
    try {
      const payload = {
        amount: values.amount,
        charityId: CharityCardDetails?.id,
        charityName: CharityCardDetails?.name
      };

      const response = await donate({donateInfo: payload});

      if ("data" in response) {
        toast.success(
          `Donated Successfully!`,
          {
            style: {
              whiteSpace: "nowrap",
              minWidth: "fit-content",
            },
          }
        );

        setModalOpen(false);
      }
    }
    catch (e) {
      console.log("error message", e);
    }
  };

  return (
    <Modal open={isOpen} onOpenChange={onOpenChange} title="" description="">
      <Formik
        initialValues={initialValues}
        onSubmit={handleDonate}
        validationSchema={donateValidationSchema(CharityBalance)}
      >
        {({ submitForm }) => (
          <Form>
            <div className="w-[400px] bg-neutral-1">
              <div className="bg-primary-3 px-2 py-4 flex gap-2 w-full box-border justify-center">
                <p className="text-white text-xl font-bold">
                  Donate
                </p>
              </div>
              <div className="flex justify-center py-4">
                <p className="text-2xl font-bold text-center">
                  {CharityCardDetails?.name}
                </p>
              </div>
              <div className="flex gap-4 justify-center p-3 text-xl">
                <div className="flex flex-col">
                  <p>Minimum Donation:</p>
                  <p>Commission Balance:</p>
                </div>
                <div className="flex flex-col">
                  <p>${CharityBalance?.minimumDonation}</p>  
                  <p>${CharityBalance?.commissionBalance}</p>
                </div>
              </div>
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
                    loading={donateLoading}
                  >
                    Donate
                  </Button>
                  <Button
                    size="md"
                    onClick={() => {
                      setModalOpen(false);
                    }}
                    className="text-center mb-4 mt-8 w-fit px-6 py-2 bg-primary-2 text-neutral-1 text-sm font-normal rounded-md"
                  >
                    Close
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

export default CharityModal;
