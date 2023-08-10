import { useState, useRef, useId } from "react";
import { useInputEvent } from "@conform-to/react";
import { cn } from "@/lib/utils";
import { Label } from "./ui/label";
import { Slider } from "./ui/slider";
import { ErrorList, ListOfErrors } from "./error-list";

export interface SliderFieldProps {
  labelProps: React.LabelHTMLAttributes<HTMLLabelElement>;
  inputProps: React.InputHTMLAttributes<HTMLInputElement>;
  className?: string;
  errors?: ListOfErrors;
}

export function SliderField({
  labelProps,
  inputProps,
  className,
  errors,
}: SliderFieldProps) {
  const [value, setValue] = useState((inputProps.defaultValue as number) ?? 75);
  const baseInputRef = useRef<HTMLInputElement>(null);
  const customInputRef = useRef<HTMLInputElement>(null);
  const control = useInputEvent({
    ref: baseInputRef,
    onReset: () => setValue((inputProps.defaultValue as number) ?? 75),
  });
  const stringToNumber = (value: string | number | undefined) => {
    if (typeof value === "string") {
      return parseInt(value);
    }
    return value;
  };

  if (!inputProps.min) {
    console.warn(
      "SliderField: the inputProps.min should be set for the SliderField to work properly."
    );
  }

  if (!inputProps.max) {
    console.warn(
      "SliderField: the inputProps.max should be set for the SliderField to work properly."
    );
  }

  const parseInputValue = (value: string) => {
    const numberValue = parseInt(value);
    if (isNaN(numberValue)) return 0;
    if (typeof inputProps.max === "number") {
      if (numberValue > inputProps.max) return inputProps.max;
    }
    return numberValue;
  };
  const fallbackId = useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <div
      className={cn(
        className,
        "space-y-2 rounded-md border border-slate-800 p-2"
      )}
    >
      <div className="flex items-center justify-between w-full ">
        <Label {...labelProps} />
        <input
          value={value}
          ref={baseInputRef}
          {...inputProps}
          onChange={(e) => setValue(parseInputValue(e.target.value) ?? 0)}
          onFocus={() => customInputRef.current?.focus()}
          className="font-bold text-right bg-transparent"
        />
      </div>
      <Slider
        ref={customInputRef}
        value={[value]}
        onValueChange={(value) => control.change(value[0].toString())}
        className="cursor-pointer"
        max={stringToNumber(inputProps.max)}
        min={stringToNumber(inputProps.min)}
        step={stringToNumber(inputProps.step)}
      />
      <div className="flex justify-between">
        <span className="text-sm">min: {inputProps.min}</span>
        <span className="text-sm">max: {inputProps.max}</span>
      </div>
      <div className="min-h-[32px] px-4 pb-3 pt-1">
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
    </div>
  );
}
