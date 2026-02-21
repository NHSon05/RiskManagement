import {
  Title,
  Button,
  Card,
  CardContent,
  Badge,
  Label,
  Form,
} from "@/components/ui";
import PlanList from "@/components/ui/molecules/PlanList";
import { motion } from "motion/react"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  useFieldArray,
  useForm,
  useWatch,
} from "react-hook-form";

import { type Risk, type Target } from "@/types/projectType";
import { cardVariants } from "@/types/CardVariants";

// ----------------- Strategy config -------------------
const STRATEGIES = [
  { value: 'avoid', label: 'Tránh rủi ro', color: 'border-(--progress) text-(--progress) hover:bg-(--bg-search)' },
  { value: 'mitigate', label: 'Giảm thiểu rủi ro', color: 'border-(--warning) text-(--warning) hover:bg-(--bg-report)' },
  { value: 'accept', label: 'Chấp nhận rủi ro', color: 'border-(--solution) text-(--solution) hover:bg-(--bg-solution)' },
  { value: 'transfer', label: 'Chuyển giao rủi ro', color: 'border-(--report) text-(--report) hover:bg-(--bg-analyst)' },
];

type FormValues = {
  risks: (Risk & { targetId: string; targetName: string })[];
};
// ---------------- ✅ Get Risk Badge -------------------
const getRiskLevelBadge = (riskLevel: number) => {
  if (riskLevel >= 16) {
    return <Badge className="bg-(--error) hover:bg-red-700 text-white">Rất cao</Badge>;
  } else if (riskLevel >= 10) {
    return <Badge className="bg-(--warning) hover:bg-orange-600 text-white">Cao</Badge>;
  } else if (riskLevel >= 4) {
    return <Badge className="bg-(--rarely) hover:bg-yellow-400 text-white">Trung bình</Badge>;
  } else if (riskLevel > 0) {
    return <Badge className="bg-(--solution) hover:bg-green-600 text-white">Yếu</Badge>;
  } else if (riskLevel == 0) {
    return <Badge className="bg-(--description) hover:bg-gray-500 text-white">Chưa đánh giá</Badge>;
  }
};
// ------------------------------------------
export default function Solution() {
  const navigate = useNavigate();
  
  const form  = useForm<FormValues>({
    defaultValues: {risks: []}
  })
  const {fields} = useFieldArray({
    control: form.control,
    name: "risks"
  })
  const strategies = useWatch({
    control: form.control,
    name: "risks"
  })
  useEffect(() => {
    try {
      const saveData = JSON.parse(localStorage.getItem("projectFormData") || "{}")
      if (saveData.prj_targets && Array.isArray(saveData.prj_targets)) {
        const flatRisks = saveData.prj_targets.flatMap((target: Target) => 
          target.risks.map((risk: Risk) => ({
            ...risk,
            targetId: target.id,
            targetName: target.name,
            strategy: risk.strategy || "", 
            response_plans: risk.response_plans || []
          }))
        )
        flatRisks.sort((a:Risk , b: Risk) => b.risk_level - a.risk_level)
        form.reset({risks: flatRisks})
      }
    } catch (error) {
      console.error("Lỗi khi đọc dữ liệu target:", error)
    }
  },[form])
  const onSubmit = (data: FormValues) => {
    try {
      const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}")
      const currentTargets = savedData.prj_targets || []

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const updateData = currentTargets.map((target: any) => ({
        ...target,
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        risks: target.risks.map((risk: any) => {
          const modifiedRisk = data.risks.find(r => r.id === risk.id)

          if (modifiedRisk) {
            return {
              ...risk,
              strategy: modifiedRisk.strategy,
              response_plans: modifiedRisk.response_plans
            }
          }
          return risk
        })
      }))
      const newData = {
        ...savedData,
        prj_targets: updateData
      }
      localStorage.setItem("projectFormData", JSON.stringify(newData));
      console.log("Saved Successfully:", newData);
      alert("Lưu thành công!");
    } catch (error) {
      console.error("Lỗi khi lưu dữ liệu", error)
    }
  }
  return (
    <div>
      {/* Header */}
      <div className="py-4">
        <Title variant="navy" size="large">Giải pháp ứng phó rủi ro</Title>
        <p className="text-(--description)">
          Xác định chiến lược và kế hoạch hành động cho từng rủi ro
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="mx-auto max-w-5xl">
          {/* List of risk */}
          <div className="space-y-8 mt-4">
            {fields.map((field,index) => {
              const currentStrategy = strategies[index]?.strategy
              return (
                // Risk Card
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  variants={cardVariants}
                  key={field.id}
                >
                  <Card className="bg-(--white) shadow-sm border-none">
                    <CardContent className="p-8 space-y-4">
                      {/* Risk Name and Level */}
                      <div className="flex justify-between">
                        <Title variant="dark" size="small">{field.name}</Title>
                        {getRiskLevelBadge(field.risk_level)}
                      </div>
                      {/* ------------------------------------------- */}
                      {/* Strategy */}
                      <div className="">
                        <div className="space-y-2">
                          <Label className="text-start">1. Ứng phó rủi ro</Label>
                          <div className="md:flex flex-start space-x-4">
                            {STRATEGIES.map((strategy) => {
                              const isSelected = currentStrategy === strategy.label;
                              return (
                                <button
                                  type="button"
                                  onClick={() => form.setValue(`risks.${index}.strategy`, strategy.label, { shouldDirty: true })}
                                  key={strategy.label}
                                  // className={`${strategy.color} border p-2 rounded-4xl text-sm`}
                                  className={`
                                  px-4 py-2 rounded-full text-sm font-medium border transition-all
                                  ${isSelected 
                                    ? 'bg-slate-800 text-white border-slate-800 shadow-md' 
                                    : `${strategy.color} bg-white hover:opacity-80`
                                  }
                                `}
                                >
                                  {strategy.label}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      </div>
                      {/* ------------------------------------------- */}
                      {/* Response Plan */}
                      <div>
                        <PlanList nestIndex={index} control={form.control} register={form.register}/>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              )
            })}
          </div>
            <div className="py-4 flex gap-2 justify-end sticky bottom-0  backdrop-blur p-4 border-t mt-4">
              <Button
                  type="button"
                  variant="outline"
                  onClick={() => navigate('/projects/evaluation')}
                  >
                Quay lại
              </Button>
              <Button
                type="submit"
                variant="primary"
                size='medium'
              >
                Hoàn thành
              </Button>
            </div>
        </form>
      </Form>
    </div>
  )
}
