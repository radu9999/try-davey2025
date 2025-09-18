import { QuizQuestion } from "@/api/modernCommuneApi";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import classNames from "classnames";
import { useFormikContext } from "formik";

export interface Options {
  options: readonly string[] | null | undefined;
}
interface RadioGroupProps {
  options: Options["options"];
  disableOption: boolean | undefined;
  correctAns: number;
}

export default function RadioOptions({
  options,
  disableOption,
  correctAns,
}: RadioGroupProps) {
  const { setFieldValue, values } = useFormikContext<
    QuizQuestion & { selectedOption: string }
  >();
  const handleChange = (el: string) => {
    const memberQuestionNumber = values?.choices?.indexOf(el);

    setFieldValue("memberAnswer", Number(memberQuestionNumber || 0) + 1);
    setFieldValue("selectedOption", el);
  };

  return (
    <ToggleGroup.Root
      onValueChange={handleChange}
      type="single"
      className="flex flex-col gap-6"
      value={values?.selectedOption}
      disabled={disableOption}
    >
      <div className="grid grid-cols-2 gap-7">
        {options?.map((option, i) => (
          <RadioOption
            key={i}
            option={option}
            index={i + 1}
            correctAns={correctAns}
            selectedOption={values?.selectedOption}
          />
        ))}
      </div>
    </ToggleGroup.Root>
  );
}

function RadioOption({
  option,
  index,
  correctAns,
  selectedOption,
}: {
  option: string;
  index: number;
  correctAns: number;
  selectedOption: string | undefined;
}) {
  const isSelected = option === selectedOption;
  return (
    <ToggleGroup.Item
      className={classNames(
        "group shadow-md flex items-center gap-3 rounded bg-white p-3 text-text-3 hover:text-primary-900  data-[state=on]:text-primary-900",
        correctAns &&
          isSelected &&
          "bg-alerts-error-1 border border-alerts-error-2",
        {
          "data-[state=on]:bg-alerts-success-1 border border-alerts-success-2":
            index === correctAns,
        }
      )}
      value={option}
    >
      <span
        className={classNames(
          "flex h-6 w-6 items-center justify-center rounded-full border-2 bg-background-1 transition-colors",
          "group-hover:bg-primary-100 group-focus:shadow group-data-[state=on]:border-primary-900 group-data-[state=on]:bg-primary-500"
        )}
      >
        {correctAns ? (
          <span className="h-3.5 w-3.5 rounded-full group-data-[state=on]:bg-primary-2"></span>
        ) : (
          <span className="h-3.5 w-3.5 rounded-full group-data-[state=on]:bg-primary-2"></span>
        )}
      </span>
      <div className="text-left">{option}</div>
    </ToggleGroup.Item>
  );
}
