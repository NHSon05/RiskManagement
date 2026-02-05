import { useFieldArray, type Control } from "react-hook-form"

import { Title } from "../title"
import { FormControl, FormField, FormItem } from "../form"
import Input from "../input";
// import Button from "../button";
import { Plus, Trash2 } from "lucide-react";
import Button from "../button";
import { useState  } from "react";
import { nanoid } from "nanoid";

interface ListRiskProps{
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  nestIndex:number;
}
export default function RiskList({control, nestIndex}:ListRiskProps) {
const [tempRiskName, setTempRiskName] = useState("");
  const {fields, append, remove} = useFieldArray({
    control,
    name: `prj_targets.${nestIndex}.risks`,
    keyName: "id",
  })
  const handleQuickAdd = () => {
    if (!tempRiskName.trim()) return
    const newRisk = {
      id: nanoid(),
      name: tempRiskName,
      probability_level: 0,
      impact_level: 0,
      risk_level: 0,
      strategy: "",
      response_plans: [],
    }
    append(newRisk)
    setTempRiskName("")
  }
  const handleKeyDown = ( e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleQuickAdd()
    }
  }
  return (
    <div className="p-4 bg-(--secondary-btn) rounded-lg">
      <div className="flex gap-2 py-2">
        <Input 
          placeholder="Nhập tên rủi ro rồi ấn Enter..." 
          className="bg-gray-50 border-gray-200 focus:bg-white transition-colors"
          value={tempRiskName}
          onChange={(e) => setTempRiskName(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <Button
          type="button"
          onClick={handleQuickAdd}
          variant="none"
          size="none"
        >
          <Plus className="h-6 w-6"/>
        </Button>
      </div>
      <Title variant="dark" size="small">Danh sách rủi ro</Title>
      {fields.map((field, index) => (
        <div key={field.id} className="flex gap-2 items-center py-2">
          <FormField
            control={control}
            name={`prj_targets.${nestIndex}.risks.${index}.name`}
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
      {fields.length === 0 && (
          <div className="text-center py-4 bg-gray-50 rounded border border-dashed border-gray-200">
            <p className="text-xs text-gray-400 italic">Chưa có rủi ro nào. Hãy nhập vào ô bên trên.</p>
          </div>
      )}
    </div>
  )
}
