import { z } from "zod";
import "./App.css";
import { SliderField } from "./components/slider-field";
import { DatePicker } from "./components/datepicker";
import { useForm, conform } from "@conform-to/react";
import { parse } from "@conform-to/zod";
import { getFieldsetConstraint } from "@conform-to/zod";
import { Button } from "./components/ui/button";

const PersonSchema = z.object({
  amount: z.number(),
  dateOfBirth: z.date(),
});

function App() {
  const [form, fields] = useForm({
    id: "example-form",
    constraint: getFieldsetConstraint(PersonSchema),
    onValidate: ({ formData }) => {
      console.log(formData);
      return parse(formData, { schema: PersonSchema });
    },
  });

  const SLIDER_MIN = -100;
  const SLIDER_MAX = 200;
  const SLIDER_STEP = 1;

  return (
    <>
      <main>
        <h1 className="mb-8 text-lg font-bold">
          Conform with shadcn/ui examples
        </h1>
        <section>
          <form
            {...form.props}
            className="space-y-12"
            method="POST"
            action="https://example.com/form"
          >
            <div className="p-4 border rounded-md">
              <h2 className="mb-4 font-bold">Slider</h2>
              <SliderField
                inputProps={{
                  ...conform.input(fields.amount),
                  min: SLIDER_MIN,
                  max: SLIDER_MAX,
                  step: SLIDER_STEP,
                }}
                labelProps={{ children: "Amount" }}
              />
            </div>
            <div className="p-4 border rounded-md">
              <h2 className="mb-4 font-bold">Datepicker</h2>
              <DatePicker
                inputProps={conform.input(fields.dateOfBirth)}
                fromYear={1970}
                toYear={2015}
                errors={fields.dateOfBirth.errors}
              />
            </div>
            <Button>Submit</Button>
          </form>
        </section>
      </main>
    </>
  );
}

export default App;
