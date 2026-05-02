import { useState } from "react";
import { type Control, type UseFormRegister, useFieldArray } from "react-hook-form";
import { nanoid } from "nanoid";
import { Label } from "../label";
import Input from "../input";
import Button from "../button";
import { Plus, Trash2 } from "lucide-react";
import { uppercaseName } from "@/utils";
import type { SolutionResponse } from "@/types/solution.type";
import type { RiskWithObjective } from "@/types/risk.type";

export default function PlanList({
  nestIndex,
  control,
  register
} : {
  nestIndex: number;
  control: Control<{risks: RiskWithObjective[]}>;
  register: UseFormRegister<{risks: RiskWithObjective[]}>;
}) {
  const [contentAction, setContentAction] = useState("")
  const [personInCharge, setPersonInCharge] = useState("")
  // Nested useFieldArray for response_plans
  const {fields, append, remove} = useFieldArray({
    control,
    name: `risks.${nestIndex}.solutions`,
  })
  
  const titleCase = (str:string) => str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
  
  const handleQuickAdd = () => {
    if (!contentAction.trim()) return
    const newPlan = {
      id: nanoid(),
      content: titleCase(contentAction),
      personInCharge: uppercaseName(personInCharge)
    }
    append(newPlan)
    setContentAction("")
    setPersonInCharge("")
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
            value={contentAction}
            className="bg-(--white)"
            onChange={(e) => setContentAction(e.target.value)}
            onKeyDown={handleKeyDown}
          />
        </div>
        {/* Input Owner */}
        <div className="md:col-span-4 space-y-2">
          <Label>Người chịu trách nhiệm</Label>
          <Input
            placeholder="Nhập tên người chịu trách nhiệm..."
            value={personInCharge}
            className="bg-(--white)"
            onChange={(e) => setPersonInCharge(e.target.value)}
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
          const plan = field as SolutionResponse
          return (
            <div
              key={field.id}
              className="grid grid-cols-1 md:grid-cols-12 p-4 bg-(--secondary-btn) border border-(--border) rounded-lg gap-4 mt-2"
            >
              <div className="md:col-span-7">
                <div 
                  className=" bg-(--white) font-medium text-sm text-(--description) placeholder:text-(--description/80) border min-h-10 w-full min-w-0 rounded-md px-2 py-2 text-start shadow-xs"
                >
                  {plan.content}
                </div>
                <input 
                  type="hidden" 
                  {...register(`risks.${nestIndex}.solutions.${index}.content`)} 
                />
              </div>

              {/* Hiển thị & Chỉnh sửa Người phụ trách */}
              <div className="md:col-span-4">
                <div 
                  className=" bg-(--white) font-medium text-(--black) text-sm placeholder:text-gray-400 border min-h-10 w-full min-w-0 rounded-md px-2 py-2 text-start shadow-xs"
                >
                  {plan.personInCharge}
                </div>
                <input 
                  type="hidden" 
                  {...register(`risks.${nestIndex}.solutions.${index}.personInCharge`)} 
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