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
import { type Target } from "@/types/projectType";
import { getRiskLevelBadge } from "@/utils";
import { probabilities, impacts } from "@/components/constants";
import { PageTransition } from "@/components/animated";
import { PDFViewer } from "@/components/ui/molecules";
import matrixPDF from '../../../assets/pdf/Matrix.pdf'

// ----------------✅ Ok --------------------------
export default function Evaluation() {
  const navigate = useNavigate()
  const [targets, setTargets] = useState<Target[]>(() => {
    try {
      const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}")
      if (savedData.prj_targets && Array.isArray(savedData.prj_targets)) {
        console.log(savedData.prj_targets)
        return savedData.prj_targets
      }
    } catch(error) {
      console.error("Lỗi khi đọc dữ liệu target:", error)
    }
    return []
  })
  // ✅ Flatten risks from all targets
  const allRisks = targets.flatMap((target) => 
    target.risks.map((risk) => ({
      ...risk,
      targetId: target.id,
      targetName: target.name
    }))
  )
  // Probability Handler
  const getProbability = (level: number) => {
    return probabilities.find(p => p.level === level)?.label || "";
  }
  const handleProbability = (targetId: string, riskId: string, value:string) => {
    const selectedProb = probabilities.find(p => p.label === value)
    if (!selectedProb) return;

    setTargets(prevTargets =>
      prevTargets.map(target => {
        if (target.id === targetId) {
          return {
            ...target,
            risks: target.risks.map(risk => {
              if (risk.id === riskId) {
                const newRiskLevel = selectedProb.level * risk.impact_level
                return {
                  ...risk,
                  probability_level: selectedProb.level,
                  risk_level: newRiskLevel
                }
              }
              return risk
            })
          }
        }
        return target;
      })
    )
  }
  // Impact Handler
  const getImpact = (level: number) => {
    return impacts.find(i => i.level === level)?.label || ""
  }
  const handleImpact = (targetId: string, riskId: string, value: string) => {
    const selectedImpact = impacts.find(i => i.label === value);
    if (!selectedImpact) return;

    setTargets(prevTargets => 
      prevTargets.map(target => {
        if (target.id === targetId) {
          return {
            ...target,
            risks: target.risks.map(risk => {
              if (risk.id === riskId) {
                const newRiskLevel = risk.probability_level * selectedImpact.level;
                return {
                  ...risk,
                  impact_level: selectedImpact.level,
                  risk_level: newRiskLevel
                };
              }
              return risk;
            })
          };
        }
        return target;
      })
    );
  };
  const handleNext = () => {
    const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}")
    const updatedData = {
      ...savedData,
      prj_targets: targets
    }
  localStorage.setItem("projectFormData", JSON.stringify(updatedData));
  console.log("✅ Saved before navigate");
  navigate('/projects/solution');
  }
  return (
    <PageTransition>
      <div className="mx-auto max-w-5xl space-y-4">
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
                {allRisks.map((risk,index) => (
                    <TableRow key={risk.id}>
                      <TableCell className="text-left font-medium">{index+1}</TableCell>
                      <TableCell className="text-left text-sm font-medium md:wrap-break-word md:whitespace-normal">
                        {risk.name}
                        <Description className="text-xs font-normal">
                          Mục tiêu: {risk.targetName}
                        </Description>
                      </TableCell>
                      <TableCell className="text-left">
                        <Select
                          value={getProbability(risk.probability_level)}
                          onValueChange={(value) => handleProbability(risk.targetId, risk.id, value)}
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
                                  value={probability.label}
                                  className="hover:bg-(--border)"
                                >
                                  {probability.label}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="text-left">
                        <Select
                          value={getImpact(risk.impact_level)}
                          onValueChange={(value) => handleImpact(risk.targetId, risk.id, value)}
                        >
                          <SelectTrigger className="bg-(--white)">
                            <SelectValue placeholder="Chọn mức độ ảnh hưởng"/>
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup className="bg-(--white)">
                              <SelectLabel>Probablitity</SelectLabel>
                              {impacts.map((impact) => (
                                <SelectItem key={impact.level} value={impact.label} className="hover:bg-(--border)">
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
                        {getRiskLevelBadge(risk.risk_level)}
                      </TableCell>
                    </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
          <div className="py-4 flex gap-2 justify-end sticky bottom-0 bg-white/80 backdrop-blur p-4 border-t mt-4">
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
              onClick={handleNext}
            >
                Tiếp theo
            </Button>
          </div>
      </div>
    </PageTransition>
  )
}
