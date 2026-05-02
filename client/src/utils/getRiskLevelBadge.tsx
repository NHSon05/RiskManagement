import { Badge } from "@/components/ui";
import renderRiskLevelBadge from "./renderRiskLevelBadge";

const getRiskLevelBadge = (probability: number, impact: number) => {

  if (probability === 0 || impact === 0) {
    return <Badge className="text-(--description)">
      Chưa đánh giá
    </Badge>
  }

  const riskLevel = probability * impact;

  return renderRiskLevelBadge(riskLevel)
}

export { getRiskLevelBadge }

