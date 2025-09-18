import Button from "@/components/UI/Button";
import React, { useEffect, useState } from "react";
import CurriculumAlertModal from "../Question Result Popup";
import RadioOptions from "@/components/UI/ToggleRadioGroup";
import { Formik, FormikState } from "formik";
import CountdownTimer from "@/utils/CountdownTimer";
import MemberQuestionEditorPopup from "../MemberQuestionEditorPopup";
import Icon from "@/components/Icons";
import { useGetCurriculumQueryQuery } from "@/store/api/curriculum/query";
import { usePutCurriculumQueryMutation } from "@/store/api/curriculum/mutation";
import { QuizQuestion, QuizResult } from "@/api/modernCommuneApi";
import SmallLoader from "@/components/UI/SmallLoader";
import DataNotFound from "@/components/UI/DataNotFound";
type PopupNameProp = "correct" | "incorrect" | "skip" | "timeout";

const QuizPage = () => {
  const [openCorrect, setOpenCorrect] = useState(false);
  const [openIncorrect, setOpenIncorrect] = useState(false);
  const [openSkipped, setOpenSkipped] = useState(false);
  const [openTimeOut, setOpenTimeOut] = useState(false);
  const [memberQuestionEdit, setMemberQuestionEdit] = useState(false);
  const [backLink, setBackLink] = useState(true);
  const incorrectBackLink = backLink ? "Click here to dispute this ruling" : "";
  const [isPause, setIsPause] = useState(false);
  const [correctAns, setCorrectAns] = useState<number>(0);
  const [rewardDescription, setRewardDescription] = useState<string>("");

  const closePopup = (popupName: PopupNameProp) => {
    switch (popupName) {
      case "correct":
        setOpenCorrect((prevState) => !prevState);
        break;
      case "incorrect":
        setOpenIncorrect((prevState) => !prevState);
        break;
      case "skip":
        setOpenSkipped((prevState) => !prevState);
        break;
      default:
        setOpenTimeOut((prevState) => !prevState);
        break;
    }
  };

  const {
    data,
    refetch: getNewQuestion,
    isLoading: loadingGetNewQuestion,
  } = useGetCurriculumQueryQuery({});

  const [checkQuizAnswer, { isLoading: submitLoading }] =
    usePutCurriculumQueryMutation();

  const curriculumHandelSubmit = async (
    values: QuizQuestion & {
      selectedOption: string;
    }
  ) => {
    setIsPause(!isPause);
    const answerData = await checkQuizAnswer({
      id: String(values?.questionId),
      quizQuestion: values,
    });
    if ("data" in answerData) {
      const { data } = answerData;
      if (data.result == 1) {
        setOpenCorrect(!openCorrect);
      } else if (data.result == 2) {
        setOpenIncorrect(!openIncorrect);
      } else if (data.result == 128) {
        setOpenTimeOut(!openTimeOut);
      } else if (data.result == 256) {
        setOpenSkipped(!openSkipped);
      }
      setCorrectAns(data.correctAnswer!);
      setRewardDescription(data.rewardDescription ?? "");
    }
  };
  useEffect(() => {
    getNewQuestion();
    setCorrectAns(0);
  }, [getNewQuestion]);

  const timeUpFun = () => {
    setOpenTimeOut(true);
  };

  async function handelYes(
    resetForm: (
      nextState?: Partial<
        FormikState<QuizQuestion & { selectedOption: string }>
      >
    ) => void,
    popupName: PopupNameProp
  ) {
    const value = await getNewQuestion();
    resetForm({ values: { ...value.data?.[0], selectedOption: "" } || {} });
    closePopup(popupName);

    if (popupName !== "timeout" && popupName !== "skip") {
      setIsPause(!isPause);
    }
    if (popupName === "incorrect") {
      setBackLink(true);
    }
    setCorrectAns(0);
  }

  const handelDispute = async (
    values: QuizQuestion & {
      selectedOption: string;
    },
    disputeValue: string
  ) => {
    await checkQuizAnswer({
      id: String(values?.questionId),
      quizQuestion: { ...values, disputeComments: disputeValue },
    });
    setBackLink(false);
  };
  // handelSkip
  const handelSkip = async (
    values: QuizQuestion & {
      selectedOption: string;
    }
  ) => {
    await checkQuizAnswer({
      id: String(values?.questionId),
      quizQuestion: { ...values, result: QuizResult.NUMBER_256 },
    });
  };

  //handleTimeUp
  const handelTimeUp = async (
    values: QuizQuestion & {
      selectedOption: string;
    }
  ) => {
    await checkQuizAnswer({
      id: String(values?.questionId),
      quizQuestion: { ...values, result: QuizResult.NUMBER_128 },
    });
  };
  return (
    <div className="relative min-h-screen p-4 rounded-lg w-full h-full ">
      {loadingGetNewQuestion ? (
        <div className="flex justify-center items-center mt-[30%]">
          <SmallLoader />
        </div>
      ) : !data ? (
        <DataNotFound />
      ) : (
        <Formik<QuizQuestion & { selectedOption: string }>
          initialValues={{ ...data?.[0], selectedOption: "" } || {}}
          onSubmit={curriculumHandelSubmit}
        >
          {({ values, handleSubmit, resetForm }) => {
            return (
              <div>
                <CurriculumAlertModal
                  open={openCorrect}
                  type="correct"
                  setIsWarningModalOpen={() => setOpenCorrect(!openCorrect)}
                  handleConfirm={() => handelYes(resetForm, "correct")}
                  rewardDescription={rewardDescription}
                />
                <CurriculumAlertModal
                  open={openIncorrect}
                  type="incorrect"
                  setIsWarningModalOpen={() => setOpenIncorrect(!openIncorrect)}
                  backLink={incorrectBackLink}
                  handleDispute={() =>
                    setMemberQuestionEdit(!memberQuestionEdit)
                  }
                  handleConfirm={() => handelYes(resetForm, "incorrect")}
                  rewardDescription={rewardDescription}
                />
                <CurriculumAlertModal
                  open={openSkipped}
                  type="skip"
                  setIsWarningModalOpen={() => {
                    setOpenSkipped(!openSkipped);
                  }}
                  handleConfirm={() => {
                    handelSkip(values), handelYes(resetForm, "skip");
                  }}
                />
                <CurriculumAlertModal
                  open={openTimeOut}
                  type="timeUp"
                  setIsWarningModalOpen={() => {
                    setOpenTimeOut(!openTimeOut);
                  }}
                  handleConfirm={() => {
                    handelTimeUp(values), handelYes(resetForm, "timeout");
                  }}
                />
                <MemberQuestionEditorPopup
                  open={memberQuestionEdit}
                  setIsWarningModalOpen={() => {
                    setMemberQuestionEdit(!memberQuestionEdit);
                  }}
                  handleDispute={(disputeValue: string) =>
                    handelDispute(values, disputeValue)
                  }
                  loading={submitLoading}
                />

                <div>
                  <div className="flex text-neutral-4   justify-between">
                    <div className="text-xl font-bold">
                      Category :{values.categoryName}
                    </div>
                    <div className="text-xl font-bold flex gap-2">
                      Time Left :
                      {
                        <CountdownTimer
                          onTimerEnd={timeUpFun}
                          timeInSeconds={Number(values.allottedTime)}
                          data={data}
                          isPaused={isPause}
                        />
                      }
                    </div>
                  </div>
                  <div className="mt-5 text-neutral-4">
                    {values.questionText}
                  </div>

                  <div className="my-8">
                    {
                      <RadioOptions
                        options={values.choices}
                        disableOption={false}
                        correctAns={correctAns}
                      />
                    }
                  </div>
                  <div className="flex flex-col gap-3 justify-center items-center ">
                    <Button
                      size="lg"
                      type="submit"
                      className="w-fit !h-14"
                      icon={<Icon icon="arrow-right" className="w-6 h-6" />}
                      onClick={() => handleSubmit()}
                      loading={submitLoading}
                      disabled={values.memberAnswer == 0}
                    >
                      Submit Answer
                    </Button>
                    <p
                      onClick={() => setOpenSkipped(!openSkipped)}
                      className=" text-primary-2 hover:underline cursor-pointer"
                    >
                      {" "}
                      Skip this Question
                    </p>
                  </div>
                </div>
              </div>
            );
          }}
        </Formik>
      )}
    </div>
  );
};

export default QuizPage;
