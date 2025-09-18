import Icon from "@/components/Icons";
import CorrectAlert from "@/components/Icons/Correct";
import Incorrect from "@/components/Icons/Incorrect";
import Modal from "@/components/UI/Modal";
import classNames from "classnames";
import React from "react";
import { RxCross1 } from "react-icons/rx";
import { useNavigate } from "react-router-dom";
import { RiLoader5Line } from "react-icons/ri";
import { useGetCurriculumQueryQuery } from "@/store/api/curriculum/query";

enum Types {
  CORRECT = "correct",
  INCORRECT = "incorrect",
  SKIP = "skip",
  TIMEUP = "timeUp",
}

interface CurriculumAlertModalProp {
  open?: boolean;
  setIsWarningModalOpen: (open: boolean) => void;
  handleConfirm?: () => void;
  handleDispute?: () => void;
  type?: "correct" | "incorrect" | "skip" | "timeUp";
  title?: React.ReactNode | string;
  description?: React.ReactNode | string;
  isConfirmWarning?: boolean;
  hColor?: string;
  backLink?: string;
  rewardDescription?: string;
}

const CurriculumAlertModal = ({
  open,
  setIsWarningModalOpen,
  type,
  handleConfirm,
  handleDispute,
  backLink,
  rewardDescription
}: CurriculumAlertModalProp) => {
  const navigate = useNavigate();
  const handelCancel = () => {
    setIsWarningModalOpen(false);
    navigate("/");
  };
  const { isLoading, isFetching } = useGetCurriculumQueryQuery({});

  const rewards = rewardDescription?.split("\r\n");

  return (
    <Modal open={open} onOpenChange={setIsWarningModalOpen}>
      <div className="bg-neutral-2 min-w-80 rounded-xl overflow-hidden ">
        <div
          className={classNames(
            "flex justify-between  px-4 py-4",
            type === Types?.CORRECT
              ? "bg-alerts-success-3"
              : type === Types.INCORRECT
              ? "bg-alerts-error-3"
              : type === Types?.SKIP
              ? "bg-alerts-warning-5"
              : type === Types.TIMEUP
              ? "bg-alerts-warning-4"
              : ""
          )}
        >
          <div className="text-xl font-bold text-neutral-2">Quiz Result</div>
          <div
            className="p-2 bg-neutral-2 hover:opacity-90 cursor-pointer"
            onClick={() => {
              setIsWarningModalOpen(false), navigate("/");
            }}
          >
            <RxCross1 className="text-black font-semibold" />
          </div>
        </div>
        <div className="mb-4">
          {type === "correct" ? (
            <div>
              <div className="flex flex-row justify-center items-center px-7  m-2 border-solid border-b-[1px] border-black">
                <Icon icon="correct" />
                <h1 className="text-4xl font-bold text-neutral-4">Correct!</h1>
              </div>
              <div className="m-4 text-md font-bold text-neutral-4">
                <div className="flex gap-7">
                  <div className="flex flex-col">
                    <h1>You Won:</h1>
                  </div>
                  <div className="flex flex-col">
                    <h1>{rewards?.[0]}</h1>
                    <h1>{rewards?.[1]}</h1>
                  </div>
                </div>
              </div>
              <div className="ml-4 text-md font-bold text-neutral-4">
                <h1>Continue With Quiz?</h1>
              </div>
            </div>
          ) : type === "incorrect" ? (
            <div>
              <div className="flex flex-row justify-center items-center px-7  m-2 border-solid border-b-[1px] border-black">
                <Icon icon="incorrect" />
                <h1 className="text-4xl font-bold text-neutral-4">Incorrect</h1>
              </div>
              <div className="m-4 text-md font-bold text-neutral-4">
                <div className="flex gap-7">
                  <div className="flex flex-col">
                    <h1>You Didn't Win:</h1>
                  </div>
                  <div className="flex flex-col">
                    <h1>{rewards?.[0]}</h1>
                    <h1>{rewards?.[1]}</h1>
                  </div>
                </div>
              </div>
              <div className="ml-4 text-md font-bold text-neutral-4">
                <h1>Continue With Quiz?</h1>
              </div>
            </div>
          ) : type === "skip" ? (
            <div>
              <div className="flex flex-row justify-center items-center px-7  m-2 border-solid border-b-[1px] border-black">
                <Icon icon="skip" />
                <h1 className="text-4xl font-bold text-neutral-4">Skipped</h1>
              </div>
              <div className="ml-4 text-md font-bold text-neutral-4">
                <h1>Continue With Quiz?</h1>
              </div>
            </div>
          ) : type === "timeUp" ? (
            <div>
              <div className="flex flex-row justify-center items-center px-8 py-5 gap-4  m-2 border-solid border-b-[1px] border-black">
                <Icon icon="timeout" />
                <h1 className="text-4xl font-bold text-neutral-4">Time's UP</h1>
              </div>
              <div className="ml-4 text-md font-bold text-neutral-4">
                <h1>Continue With Quiz?</h1>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>

        <div className="flex flex-row gap-5 mt-4 justify-center py-4">
          <button
            className="bg-white  font-semibold shadow-lg rounded-md px-3 py-1.5 flex justify-center items-center gap-1 hover:opacity-80"
            type="button"
            onClick={handleConfirm}
            disabled={isFetching || isLoading}
          >
            <RiLoader5Line
              className={classNames(
                "animate-spin ",
                isLoading || isFetching ? "block" : "hidden"
              )}
            />
            <CorrectAlert className="w-5 h-5" />
            Yes
          </button>
          <button
            className="bg-white font-semibold shadow-lg rounded-md px-3 py-1.5 flex justify-center items-center gap-1 hover:opacity-80"
            type="button"
            color="danger"
            onClick={handelCancel}
          >
            <Incorrect className="w-5 h-5" />
            No
          </button>
        </div>
        {backLink && (
          <div
            onClick={handleDispute}
            className="cursor-pointer text-primary-2 text-sm hover:underline text-center mb-4 "
          >
            {backLink}
          </div>
        )}
      </div>
    </Modal>
  );
};

export default CurriculumAlertModal;
