import { Badge } from "@/components/ui";

export default function renderRiskLevelBadge(riskLevel: number) {
  if (riskLevel >= 16) {
    return <Badge className="bg-red-200 text-(--error)">
      Rất cao
    </Badge>;
  } else if (riskLevel >= 10) {
    return <Badge className="bg-orange-200 text-(--warning)">
      Cao
    </Badge>;
  } else if (riskLevel >= 4) {
    return <Badge className="bg-yellow-100 text-(--rarely)">
      Trung bình</Badge>;
  } else if (riskLevel > 0) {
    return <Badge className="bg-green-100 text-(--solution)">
      Yếu
    </Badge>;
  } else if (riskLevel == 0) {
    return <Badge className="text-(--description)">
      Chưa đánh giá
    </Badge>;
  }
}
