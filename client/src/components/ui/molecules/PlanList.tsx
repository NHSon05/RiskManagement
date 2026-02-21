import { useState } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";
import { nanoid } from "nanoid";

import { type ResponsePlan } from "@/types/projectType";

import { Label } from "../label";
import Input from "../input";
import Button from "../button";
import { Plus, Trash2 } from "lucide-react";

// -------- SUB COMPONENT: PLAN LIST ---------
export default function PlanList({
  nestIndex,
  control,
  register
} : {
  nestIndex: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  register: UseFormRegister<any>;
}) {
  const [planAction, setPlanAction] = useState("")
  const [owner, setOwner] = useState("")
  // Nested useFieldArray for response_plans
  const {fields, append, remove} = useFieldArray({
    control,
    name: `risks.${nestIndex}.response_plans`,
  })
  
  const titleCase = (str:string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  const uppercaseTitle = (str:string) => {
    const convertToArray = str.toLowerCase().split(' ')
    const result = convertToArray.map(val => {
      return val.replace(val.charAt(0), val.charAt(0).toUpperCase())
    })
    return result.join(' ')
  }
  
  const handleQuickAdd = () => {
    if (!planAction.trim()) return
    const newPlan = {
      id: nanoid(),
      owner: uppercaseTitle(owner),
      name: titleCase(planAction)
    }
    append(newPlan)
    setPlanAction("")
    setOwner("")
  }
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault()
      handleQuickAdd()
    }
  }
  return (
    <div>
      <Label>2. Kế hoạch ứng phó</Label>
      <div className="grid grid-cols-1 md:grid-cols-12 p-4 bg-(--secondary-btn) border border-(--border) rounded-lg gap-4">
        {/* Input Plan Action */}
        <div className="md:col-span-7 space-y-2">
          <Label>Hành động</Label>
          <Input
            placeholder="Nhập kế hoạch..."
            value={planAction}
            className="bg-(--white)"
            onChange={(e) => setPlanAction(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* Input Owner */}
        <div className="md:col-span-4 space-y-2">
          <Label>Người chịu trách nhiệm</Label>
          <Input
            placeholder="Nhập tên người chịu trách nhiệm..."
            value={owner}
            className="bg-(--white)"
            onChange={(e) => setOwner(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* Added Button */}
        <div className="md:col-span-1 flex items-end">
          <Button
            variant="none"
            onClick={handleQuickAdd}
            type="button"
            size="none"
            >
            <Plus className=" h-10"/>
          </Button>
        </div>
      </div>
      {/* List rendering */}
      <div>  
        {fields.map((field,index) => {
          const plan = field as ResponsePlan
          return (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-12 p-4 bg-(--secondary-btn) border border-(--border) rounded-lg gap-4 mt-2"
            >
              <div className="md:col-span-7">
                <div 
                  className=" bg-(--white) font-medium text-sm text-gray-700 placeholder:text-gray-400 border h-10 w-full min-w-0 rounded-md px-2 py-2 text-start shadow-xs"
                >
                  {plan.name}
                </div>
                <input 
                  type="hidden" 
                  {...register(`risks.${nestIndex}.response_plans.${index}.name`)} 
                />
              </div>

              {/* Hiển thị & Chỉnh sửa Người phụ trách */}
              <div className="md:col-span-4">
                <div 
                  className=" bg-(--white) font-medium text-(--black) text-sm placeholder:text-gray-400 border h-10 w-full min-w-0 rounded-md px-2 py-2 text-start shadow-xs"
                >
                  {plan.owner}
                </div>
                <input 
                  type="hidden" 
                  {...register(`risks.${nestIndex}.response_plans.${index}.owner`)} 
                />
              </div>
              {/* Nút Xóa */}
              <div className="md:col-span-1 flex items-center justify-between">
                <button
                  onClick={() => remove(index)}
                  type="button"
                  >
                  <Trash2 size={24} className="text-(--error)"/>
                </button>
              </div>
            </div>
          )})
        }
        {fields.length === 0 && (
          <div className="text-center py-4 bg-gray-50 rounded border border-dashed border-gray-200 mt-2">
            <p className="text-xs text-gray-400 italic">Chưa có phương pháp nào. Hãy nhập vào ô bên trên.</p>
          </div>
      )}
      </div>
    </div>
  )
}