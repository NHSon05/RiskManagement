import { Badge } from "@/components/ui";

const getRiskLevelBadge = (probability: number, impact: number) => {

  if (probability === 0 || impact === 0) {
    return <Badge className="text-(--description)">
      Chưa đánh giá
    </Badge>
  }

  const riskLevel = probability * impact;

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

export { getRiskLevelBadge }

