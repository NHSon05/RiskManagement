import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
  Card,
  CardContent,
} from "@/components/ui";
import type { ResponsePlan, Risk, Target } from "@/types/projectType";
import { useRef, useState } from "react";
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf'

export default function ProjectDetail() {
  const printRef = useRef(null)
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const dataUrl = await toPng(element, { quality: 0.95 });

      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "px",
        format: "a4"
      });

      const pdfWidth = pdf.internal.pageSize.getWidth();
      const imgProps = pdf.getImageProperties(dataUrl);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(dataUrl, 'PNG', 0, 0, pdfWidth, imgHeight);
      pdf.save('Project_Report.pdf');
    } catch (err) {
      console.error('Lỗi xuất PDF:', err);
    }
  };
  
  const [data] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("projectFormData") || "{}")
    } catch (error) {
       console.error('Lỗi khi lấy dữ liệu', error)
      return {}
    }
  })
  // console.log(data.prj_targets)

  if (!data) {
    return (
      <h2 className="p-6 text-center text-(--description)">
        Đang tải dữ liệu...
      </h2>
    )
  }

  const getRiskLevelBadge = (riskLevel: number) => {
  if (riskLevel >= 16) {
    return <p className="text-(--error)">Rất cao</p>;
  } else if (riskLevel >= 10) {
    return <p className="text-(--warning)">Cao</p>;
  } else if (riskLevel >= 4) {
    return <p className="text-(--rarely)">Trung bình</p>;
  } else if (riskLevel > 0) {
    return <p className="text-(--solution)">Yếu</p>;
  } else if (riskLevel == 0) {
    return <p className="text-(--description">Chưa đánh giá</p>;
  }
};

  // Flatten all risks from all targets
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const allRisks = data.prj_targets?.flatMap((target : Target, targetIndex: any) => 
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    target.risks?.map((risk: Risk, riskIndex: any) => ({
      ...risk,
      targetName: target.name,
      targetIndex,
      riskIndex
    })) || []
  ) || []
  return (
    <div>
      <Card className="bg-(--white) shadow-sm border-none mx-auto max-w-5xl">
        <CardContent className="p-4 space-y-4" ref={printRef}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-center">STT</TableHead>
                <TableHead>Rủi ro</TableHead>
                <TableHead>Mức độ</TableHead>
                <TableHead>Giải pháp</TableHead>
                <TableHead>Kế hoạch</TableHead>
                <TableHead className="text-right">Người chịu trách nhiệm</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {allRisks.map((risk: Risk, index: number) => (
                <TableRow key={risk.id}>
                  <TableCell className="text-center">{index + 1}</TableCell>
                  <TableCell className="text-left">{risk.name}</TableCell>
                  <TableCell className="text-left">{getRiskLevelBadge(risk.risk_level)}</TableCell>
                  <TableCell className="text-left">{risk.strategy}</TableCell>
                  <TableCell className="text-left space-y-1">
                    {risk.response_plans.map((plan: ResponsePlan ,index : number) => (
                      <div key={index}>
                        {plan.name}
                      </div>
                    ))}
                  </TableCell>
                  <TableCell className="text-right space-y-1">
                    {risk.response_plans.map((plan: ResponsePlan ,index : number) => (
                      <div key={index}>
                        {plan.owner}
                      </div>
                    ))}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table> 
        </CardContent>
      </Card>
      <Button
        onClick={handleDownloadPdf}
      >
        Download PDF
      </Button>

    </div>
  )
}
