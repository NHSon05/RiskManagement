import { useFieldArray, type Control } from "react-hook-form";
import { FormControl, FormField, FormItem } from "../form";
import Input from "../input";
import { Plus, Trash2 } from "lucide-react";
import Button from "../button";
// import Button from "../button";

interface PesTelInputProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  // placeholder: string;
}
export default function PestelInput({control, name}:PesTelInputProps) {
  const {fields , append, remove} = useFieldArray({
    control,
    name: name
  });

  return (
    <div className="space-y-2">
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-start py-1">
          <FormField
            control={control}
            name={`${name}.${index}.content`}
            render={({field}) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    {...field} 
                    placeholder="Nhập nội dung"
                    value={field.value ?? ""}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <Trash2 
            className="w-6 h-6 mt-2 text-(--error) hover:bg-red-50 rounded-md transition cursor-pointer"
            onClick={() => remove(index)}
          />
        </div>
      ))}
      <Button
        variant="none"
        size="none"
        onClick={() => append({ value: "" })}
        className="flex items-center"
      >
        <Plus size={20} className="mr-1 h-4 w-4" />
        <span>Thêm nội dung</span>
      </Button>
    </div>
  )
}
