import { 
  Select,
  SelectContent,
  SelectTrigger,
  SelectValue,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Title,
  Button
} from "@/components/ui";
import { SelectGroup, SelectItem, SelectLabel } from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

interface RiskType {
  name: string;
  probability: string;
  probability_index: number;
  impact: string;
  impact_index: number
  risk_level: number
}

interface ProbabilityType {
  label: string;
  index: number;
}
interface ImpactType {
  label: string;
  index: number;
}
const probabilities: ProbabilityType[] = [
  { label: "Hiếm khi", index: 1  },
  { label: "Ít xảy ra", index: 2  },
  { label: "Trung bình", index: 3  },
  { label: "Thường xuyên", index: 4  },
  { label: "Gần như chắc chắn", index: 5  }
]
const impacts: ImpactType[] = [
  { label: "Không đáng kể", index: 1  },
  { label: "Thấp", index: 2  },
  { label: "Trung bình", index: 3  },
  { label: "Nghiêm trọng", index: 4  },
  { label: "Rất nghiêm trọng", index: 5  }
]
const risks:RiskType[] = [
  {
    name: 'Lỗi phần mềm nghiêm trọng',
    probability: "Cao",
    probability_index: 4,
    impact: "Nghiêm trọng",
    impact_index: 4,
    risk_level: 16
  },
  {
    name: 'Lỗi phần cứng nghiêm trọng',
    probability: "Thấp",
    probability_index: 1,
    impact: "Nghiêm trọng",
    impact_index: 4,
    risk_level: 4
  },
  {
    name: 'Lỗi OS',
    probability: "Cao",
    probability_index: 4,
    impact: "Nghiêm trọng",
    impact_index: 4,
    risk_level: 16
  }
]

export default function Evaluation() {
  const navigate = useNavigate()
  return (
    <div>
      <Title variant="navy" size="large">
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
          {risks.map((risk,index) => (
            <TableRow key={index+1}>
              <TableCell className="text-left">{index+1}</TableCell>
              <TableCell className="text-left">{risk.name}</TableCell>
              <TableCell className="text-left">
                <Select>
                  <SelectTrigger className="bg-(--white)">
                    <SelectValue placeholder="Chọn khả năng xảy ra"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-(--white)">
                      <SelectLabel>Probablitity</SelectLabel>
                      {probabilities.map((probability) => (
                        <SelectItem key={probability.index} value={probability.label} className="hover:bg-(--border)">
                          {probability.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </TableCell>
              <TableCell className="text-left">
                <Select>
                  <SelectTrigger className="bg-(--white)">
                    <SelectValue placeholder="Chọn mức độ ảnh hưởng"/>
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup className="bg-(--white)">
                      <SelectLabel>Probablitity</SelectLabel>
                      {impacts.map((impact) => (
                        <SelectItem key={impact.index} value={impact.label} className="hover:bg-(--border)">
                          {impact.label}
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
                </TableCell>
              <TableCell className="text-right rounded-2xl">
                <span className="text-(--error) rounded-xl">
                  {risk.risk_level}
                </span>
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
            onClick={() => navigate('/projects/solution')}
          >
              Tiếp theo
          </Button>
        </div>
    </div>
  )
}
