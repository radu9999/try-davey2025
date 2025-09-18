import CorrectAlert from "@/components/Icons/Correct";
import Incorrect from "@/components/Icons/Incorrect";
import Input from "@/components/UI/Form/Input";
import Modal from "@/components/UI/Modal";
import { Formik } from "formik";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { RiLoader5Line } from "react-icons/ri";
import { object, string } from "yup";
import classNames from "classnames";

const disputeSchema = object({
  disputeComments: string()
    .required("required")
    .max(1000, "max 1000 character allow"),
});
interface MemberQuestionEditorPopupProp {
  open?: boolean;
  setIsWarningModalOpen: (open: boolean) => void;
  handleConfirm?: () => void;
  handleDispute: (disputeValue: string) => void;
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  isConfirmWarning?: boolean;
  loading: boolean;
}

type initialValueProp = {
  disputeComments: string;
};

const initialValue: initialValueProp = {
  disputeComments: "",
};

const MemberQuestionEditorPopup = ({
  open,
  setIsWarningModalOpen,
  handleDispute,
  loading,
}: MemberQuestionEditorPopupProp) => {
  const handelCancel = () => {
    setIsWarningModalOpen(false);
  };

  const handelDisputeForm = (values: initialValueProp) => {
    setIsWarningModalOpen(false);
    handleDispute(values.disputeComments);
  };

  return (
    <Modal open={open} onOpenChange={setIsWarningModalOpen}>
      <Formik
        initialValues={initialValue}
        validationSchema={disputeSchema}
        onSubmit={handelDisputeForm}
      >
        {({ values, handleSubmit, setFieldTouched, handleChange }) => (
          <div className="bg-neutral-2 max-w-96 rounded-xl overflow-hidden ">
            <div className="flex justify-between bg-white  px-6 py-3">
              <div className="text-lg font-bold text-neutral-3">
                Member Question Editor
              </div>
              <div
                className="p-2 bg-white font-semibold hover:text-red-600 cursor-pointer"
                onClick={() => handelCancel()}
              >
                <RxCross1 />
              </div>
            </div>
            <div className="mb-4">
              <div className="w-3/4 text-black ml-6 pt-5">
                Please briefly describe why you believe this ruling is
                incorrect?
              </div>

              <div className="flex flex-col gap-3">
                <div className="mx-6 mt-6  ">
                  <Input
                    name="disputeComments"
                    as="textarea"
                    onChange={(e) => {
                      setFieldTouched("disputeComments");
                      handleChange(e);
                    }}
                  />
                </div>
                <div className="ml-6 text-sm  text-neutral-3">
                  <h1>
                    {1000 - values.disputeComments.length >= 0
                      ? 1000 - values.disputeComments.length
                      : 0}{" "}
                    characters left
                  </h1>
                </div>
              </div>
            </div>

            <div className="flex flex-row gap-5 justify-end mx-8 py-5">
              <button
                className="bg-white font-semibold shadow-lg rounded-md px-4 py-1.5 flex justify-center items-center gap-1 hover:opacity-80"
                type="button"
                onClick={() => handleSubmit()}
                disabled={loading}
              >
                <RiLoader5Line
                  className={classNames(
                    "animate-spin ",
                    loading ? "block" : "hidden"
                  )}
                />
                <CorrectAlert className="w-5 h-5" />
                OK
              </button>
              <button
                className="bg-white font-semibold shadow-lg rounded-md px-3 py-1.5 flex justify-center items-center gap-1 hover:opacity-80"
                type="button"
                color="danger"
                onClick={() => setIsWarningModalOpen(false)}
              >
                <Incorrect className="w-5 h-5" />
                Cancel
              </button>
            </div>
          </div>
        )}
      </Formik>
    </Modal>
  );
};

export default MemberQuestionEditorPopup;
