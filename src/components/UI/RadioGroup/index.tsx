import * as RadioGroup from '@radix-ui/react-radio-group';
import { RadioType } from "./type";
import { ChangeEventHandler } from "react";

interface RadioProps {
  defaultValue?: string;
  options: RadioType[];
  onValueChange: ChangeEventHandler<HTMLInputElement> | any;
}

const RadioCompoent = ({defaultValue, options, onValueChange}: RadioProps) => {
  return (
    <RadioGroup.Root
      className="flex gap-4"
      defaultValue={defaultValue}
      onValueChange={onValueChange}
    >
      {options?.map((option: any) => (
        <div className="flex items-center">
          <RadioGroup.Item
            className="bg-white w-[25px] h-[25px] rounded-full shadow-[0_2px_10px] shadow-primary-2 focus:shadow-[0_0_0_2px] focus:shadow-primary-2 outline-none cursor-default"
            value={option.value}
          >
            <RadioGroup.Indicator className="flex items-center justify-center w-full h-full relative after:content-[''] after:block after:w-[11px] after:h-[11px] after:rounded-[50%] after:bg-primary-2" />
          </RadioGroup.Item>
          <label className="text-[15px] leading-none pl-[10px]">
            {option.label}
          </label>
        </div>  
      ))}
    </RadioGroup.Root>
  );
};

export default RadioCompoent;
