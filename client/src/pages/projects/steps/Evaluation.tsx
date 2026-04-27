import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Select, SelectContent, SelectTrigger, SelectValue,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Title, Description,
  Button,
  SelectGroup, SelectItem, SelectLabel,
  Card,
  CardContent,
} from "@/components/ui";
// import { type Target } from "@/types/projectType";
import { getRiskLevelBadge } from "@/utils";
import { probabilities, impacts } from "@/components/constants";
import { PageTransition } from "@/components/animated";
import { PDFViewer } from "@/components/ui/molecules";
import matrixPDF from '../../../assets/pdf/Matrix.pdf'
import { useGetObjectives } from "@/hooks/useObjective";
import { useGetRisk } from "@/hooks/useRisk";
import type { RiskWithObjective, UpdateAssessmentRequest } from "@/types/risk.type";
import { assessmentApi } from "@/apis/assessment.api";

// ----------------✅ Ok --------------------------
export default function Evaluation() {
  const navigate = useNavigate()

  // Get ProjectId
  const projectId = Number(localStorage.getItem("currentProjectId"))
  // Get ObjectiveId
  const data = useGetObjectives(projectId)
  const objectiveIds = data.data?.data?.map(item => item.id) || []
  // Get Risk
  const riskData = useGetRisk(objectiveIds)
  // Flatten allRisks
  const allRisks = riskData.flatMap(query => query.data || []) as RiskWithObjective[]
  console.log(allRisks)

  // const [targets, setTargets] = useState<Target[]>(() => {
  //   try {
  //     const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}")
  //     if (savedData.prj_targets && Array.isArray(savedData.prj_targets)) {
  //       return savedData.prj_targets
  //     }
  //   } catch(error) {
  //     console.error("Lỗi khi đọc dữ liệu target:", error)
  //   }
  //   return []
  // })

  // ✅ Flatten risks from all targets
  // const allRisk = targets.flatMap((target) => 
  //   target.risks.map((risk) => ({
  //     ...risk,
  //     targetId: target.id,
  //     targetName: target.name
  //   }))
  // )

  const [assessment, setAssessment] = useState<Record<number, UpdateAssessmentRequest>>({})
  console.log(assessment)

  const handleSaveAssessment = async () => {
    // Get RiskId
    const riskIds = Object.keys(assessment)

    if (riskIds.length === 0) {
      return;
    }
    try {
      // 1. Create an Array contains promise to call api
      const apiCalls = riskIds.map((id) => {
        const riskId = Number(id)

        // Get data to update
        const payload = {
          probability: assessment[riskId].probability,
          impact: assessment[riskId].impact
        }

        if (payload.probability && payload.impact) {
          // call api assessment
          return assessmentApi.updateAssessment(riskId, payload)
        }
        return Promise.resolve()
      })
      // 2. Active all api 
      await Promise.all(apiCalls)
      // 3. Handle after success
      alert("Đánh giá rủi ro thành công!")
      // Delete after push to server
      setAssessment({})
      // call refetch to reload new data
      navigate('/projects/solution');
      
    } catch (error) {
      console.error("Lỗi khi lưu đánh giá:", error);
      alert("Có lỗi xảy ra khi lưu đánh giá, vui lòng thử lại!");
    }

  // Update Risk
  
  }

  // Function update state
  const handleSelectChange = (riskId: number, field : "probability" | "impact", value: string) => {
    setAssessment((prev) => ({
      ...prev,
      [riskId]: {
        ...prev[riskId],
        [field]: Number(value)
      }
    }))
  }

  return (
    <PageTransition>
      <div className="mx-auto md:px-2 space-y-4">
        <Card className="bg-(--white) shadow-sm border-none">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <Title variant="navy" size="large">
              Đánh giá rủi ro
              <Description className="">
                Sử dụng công cụ này để đánh giá các rủi ro cho dự án của bạn
              </Description>
            </Title>
            <p className="text-[16px] px-24 hidden md:block"
              >Phân tích và theo dõi các rủi ro trong dự án của bạn một cách hiệu quả. Bấm vào nút bên dưới để mở tệp tham khảo ma trận 5x5, giúp bạn trong quá trình đánh giá
            </p>
            {/* View PDF */}
            <PDFViewer
              fileUrl={matrixPDF}
              fileName="Risk_CheckList.pdf"
            />
          </CardContent>
        </Card>
        <Card className="bg-(--white) shadow-sm border-none">
          <CardContent className="px-6 py-2 space-y-4" >
            <Table className="md:table-fixed">
              <TableHeader>
                <TableRow>
                  <TableHead className="md:w-[5%] text-left">ID</TableHead>
                  <TableHead className=" md:w-[30%]">Tên rủi ro</TableHead>
                  <TableHead className="md:w-[25%]">Khả năng xảy ra</TableHead>
                  <TableHead className="md:w-[25%]">Mức độ ảnh hưởng</TableHead>
                  <TableHead className="md:w-[15%] text-right">Mức độ rủi ro</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody className="bg-(--white)">
                {allRisks.map((risk,index) => {

                  const currentProbability = assessment[risk.id]?.probability || risk.assessment?.probability;
                  const currentImpact = assessment[risk.id]?.impact || risk.assessment?.impact;
                  console.log(currentProbability)
                  console.log(currentImpact)

                  return (
                    <TableRow key={risk.id}>
                      <TableCell className="text-left font-medium">{index+1}</TableCell>
                      <TableCell className="text-left text-sm font-medium md:wrap-break-word md:whitespace-normal">
                        {risk.name}
                        <Description className="text-xs font-normal">
                          Mục tiêu: {risk.objective.name}
                        </Description>
                      </TableCell>
                      <TableCell className="text-left">
                        {/* PROBABILITY */}
                        <Select
                          value={currentProbability ? String(currentProbability) : ""}
                          onValueChange={(value) => handleSelectChange( Number(risk.id), "probability", value)}
                        >
                          <SelectTrigger className="bg-(--white)">
                            <SelectValue placeholder="Chọn khả năng xảy ra"/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup className="bg-(--white)">
                              <SelectLabel>Probablitity</SelectLabel>
                              {probabilities.map((probability) => (
                                <SelectItem 
                                  key={probability.level}
                                  value={String(probability.level)}
                                  className="hover:bg-(--border)"
                                >
                                  {probability.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      {/* IMPACT */}
                      <TableCell className="text-left">
                        <Select
                          value={currentImpact ? String(currentImpact) : ""}
                          onValueChange={(value) => handleSelectChange(Number(risk.id), "impact", value)}
                        >
                          <SelectTrigger className="bg-(--white)">
                            <SelectValue placeholder="Chọn mức độ ảnh hưởng"/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup className="bg-(--white)">
                              <SelectLabel>Impact</SelectLabel>
                              {impacts.map((impact) => (
                                <SelectItem 
                                  key={impact.level}
                                  value={String(impact.level)}
                                  className="hover:bg-(--border)"
                                >
                                  {impact.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-right rounded-2xl">
                        {/* <span className="text-(--error) rounded-xl">
                          {risk.risk_level}
                        </span> */}
                        {getRiskLevelBadge(currentProbability || 0, currentImpact || 0)}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
          <div className="py-4 flex gap-2 justify-end bottom-0 bg-white/80 backdrop-blur p-4 border-t mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => navigate('/projects/target')}
            >
                Quay lại
            </Button>
            <Button 
              variant="primary"
              size='medium'
              onClick={handleSaveAssessment}
            >
                Tiếp theo
            </Button>
          </div>
      </div>
    </PageTransition>
  )
}