import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Select, SelectContent, SelectTrigger, SelectValue,
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
  Title, Description,
  Button,
  SelectGroup, SelectItem, SelectLabel,
  Badge
} from "@/components/ui";
import { type Target } from "@/types/projectType";

// ------------------✅ OK -----------------------
// Select Items
const probabilities = [
  { label: "Hiếm khi", level: 1  },
  { label: "Ít xảy ra", level: 2  },
  { label: "Trung bình", level: 3  },
  { label: "Thường xuyên", level: 4  },
  { label: "Gần như chắc chắn", level: 5  }
]
const impacts = [
  { label: "Không đáng kể", level: 1  },
  { label: "Thấp", level: 2  },
  { label: "Trung bình", level: 3  },
  { label: "Nghiêm trọng", level: 4  },
  { label: "Rất nghiêm trọng", level: 5  }
]
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
   // ✅ Get risk level badge
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
    <div className="mx-auto">
      <Title variant="navy" size="large" className="py-4">
        Đánh giá rủi ro
      </Title>
      <Table>
        <TableHeader className="bg-(--border)">
          <TableRow>
            <TableHead className="text-left">ID</TableHead>
            <TableHead>Tên rủi ro</TableHead>
            <TableHead>Khả năng xảy ra</TableHead>
            <TableHead>Mức độ ảnh hưởng</TableHead>
            <TableHead className="text-right">Mức độ rủi ro</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="bg-(--white)">
          {allRisks.map((risk,index) => (
              <TableRow key={risk.id}>
                <TableCell className="text-left">{index+1}</TableCell>
                <TableCell className="text-left">
                  {risk.name}
                  <Description className="text-sm">
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
  )
}
