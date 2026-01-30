import { useFieldArray, type Control } from "react-hook-form"

import { Title } from "../title"
import { FormControl, FormField, FormItem } from "../form"
import Input from "../input";
// import Button from "../button";
import { Plus, Trash2 } from "lucide-react";
import Button from "../button";

interface ListRiskProps{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  nestIndex:number;
}
export default function RiskList({control, nestIndex}:ListRiskProps) {
  const {fields, append, remove} = useFieldArray({
    control,
    name: `targets.${nestIndex}.risks`,
  })
  return (
    <div className="p-4 bg-(--secondary-btn) rounded-lg">
      <div className="flex justify-between">
        <Title variant="dark" size="small">Rủi ro của bạn</Title>
        <Button
          onClick={() => append({name: ""})}
          variant="none"
          size="none"
        >
          <Plus className="h-6 w-6"/>
        </Button>
      </div>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center py-2">
          <FormField
            control={control}
            name={`targets.${nestIndex}.risks.${index}.name`}
            render={({field}) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input placeholder="Nhập tên rủi ro..." {...field} className="bg-white" />
                </FormControl>
              </FormItem>
            )}
          />
          <button
            type="button"
            onClick={() => remove(index)}
          >
            <Trash2 className="h-6 w-6 text-(--error)"/>
          </button>
        </div>
      ))}
    </div>
  )
}
