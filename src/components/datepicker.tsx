"use client";
// THIS CODE WAS COPIED FROM: https://gist.github.com/mjbalcueva/1fbcb1be9ef68a82c14d778b686a04fa

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { ErrorList, ListOfErrors } from "./error-list";

export interface DatePickerProps {
  inputProps: React.HTMLAttributes<HTMLElement>;
  fromYear: number;
  toYear: number;
  errors?: ListOfErrors;
}

export function DatePicker({
  fromYear,
  toYear,
  errors,
  inputProps,
}: DatePickerProps) {
  const [date, setDate] = React.useState<Date>();

  const fallbackId = React.useId();
  const id = inputProps.id ?? fallbackId;
  const errorId = errors?.length ? `${id}-error` : undefined;
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={"outline"}
          className={cn(
            "w-[240px] justify-start text-left font-normal",
            !date && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="w-4 h-4 mr-2" />
          {date ? format(date, "PPP") : <span>Pick a date</span>}
        </Button>
      </PopoverTrigger>
      <div className="min-h-[32px] px-4 pb-3 pt-1">
        {errorId ? <ErrorList id={errorId} errors={errors} /> : null}
      </div>
      <PopoverContent align="start" className="w-auto p-0 ">
        <Calendar
          mode="single"
          captionLayout="dropdown-buttons"
          selected={date}
          onSelect={setDate}
          fromYear={fromYear}
          toYear={toYear}
        />
      </PopoverContent>
    </Popover>
  );
}
