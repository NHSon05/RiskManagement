import { useFieldArray, type Control, type Path } from "react-hook-form";
import { FormControl, FormField, FormItem, FormMessage } from "../form";
import Input from "../input";
import { Plus, Trash2 } from "lucide-react";
import Button from "../button";
import { useState } from "react";
import type { FormValues } from "@/pages/projects/steps/Pestel";

interface PesTelInputProps {
  control: Control<FormValues>;
  name: Path<FormValues>;
}

export default function PestelInput({control, name}:PesTelInputProps) {
  const [tempItemValue, setTempItemValue] = useState("");
  const {fields , append, remove} = useFieldArray({
    control,
    name: name as never
  });

  return (
    <div className="space-y-2">
      {fields.map((item, index) => (
        <div key={item.id} className="flex gap-2 items-start py-1">
          <FormField
            control={control}
            name={`${name}.${index}` as Path<FormValues>}
            render={({field}) => (
              <FormItem className="flex-1">
                <FormControl>
                  <Input 
                    {...field} 
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        append("");
                      }
                    }}
                    placeholder="Nhập nội dung"
                    value={(field.value as string) ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Trash2 
            className="w-6 h-6 mt-2 text-(--error) hover:bg-red-50 rounded-md transition cursor-pointer"
            onClick={() => remove(index)}
          />
        </div>
      ))}
      <div className="flex gap-2 py-2">
        <Input 
          placeholder="Nhập nội dung rồi ấn Enter..." 
          className="bg-(--secondary-btn) border-(--blue-border) focus:bg-(--white) transition-colors"
          value={tempItemValue}
          onChange={(e) => setTempItemValue(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (tempItemValue.trim()) {
                append(tempItemValue as never);
                setTempItemValue("");
              }
            }
          }}
        />
        <Button
          type="button"
          onClick={() => {
            if (tempItemValue.trim()) {
              append(tempItemValue as never);
              setTempItemValue("");
            }
          }}
          variant="none"
          size="none"
        >
          <Plus className="h-6 w-6"/>
        </Button>
      </div>
    </div>
  )
}
