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
  ButtonGroup,
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  Title,
  Badge,
  Tabs,
  TabsList,
  TabsTrigger,
  TabsContent
} from "@/components/ui";
import { PageTransition } from "@/components/animated";
import { PDFPreviewDialog, type PDFPreviewRef } from "@/components/ui/molecules/PDFPreview";

import { useRef } from "react";
import {
  CircleDollarSign,
  Clock,
  Contact,
  Download,
  EarthIcon,
  Edit,
  Flag,
  MapPin,
  MoreHorizontalIcon,
  Trash2,
  UserCircle
} from "lucide-react";

import ImageUpload from "@/components/ui/molecules/ImageUpload";
import renderRiskLevelBadge from "@/utils/renderRiskLevelBadge";
import { useParams } from "@/hooks/useParams";
import { useGetProjectById } from "@/hooks/useProject";
import { usePestel } from "@/hooks/usePestel";
import { formatData } from "@/utils/format-data";
import { useSwot } from "@/hooks/useSwot";
import type { PestelItem, PestelRawData } from "@/types/pestel.type";
import { PESTEL_LABELS, SWOT_LABELS } from "@/_mocks/pestel_swot_config";
import { useGetObjectives } from "@/hooks/useObjective";
import type { ObjectivesResponse } from "@/types/objective.type";
import { useGetRiskRanking } from "@/hooks/useRisk";
import type { RiskResponse } from "@/types/risk.type";
import type { SolutionResponse } from "@/types/solution.type";

export default function ProjectDetail() {

  // Document Handler
  const contentRef = useRef<HTMLDivElement>(null);
  const pdfPreviewRef = useRef<PDFPreviewRef>(null);

  const handleGeneratePDF = async () => {
    if (contentRef.current && pdfPreviewRef.current) {
      await pdfPreviewRef.current.generatePreview(contentRef.current);
    }
  };

  // API Data
  const { projectId } = useParams();
  const { data: projectData, isPending: isProjectPending, isError: isProjectError } = useGetProjectById(Number(projectId));
  const { pestelQuery} = usePestel(Number(projectId))
  const { swotQuery } = useSwot(Number(projectId))
  const { data: objectivesQuery, isPending: isObjectivePending, isError: isObjectiveError } = useGetObjectives(Number(projectId))
  const { data: riskRankings, isPending: isRiskPending, isError: isRiskError } = useGetRiskRanking(Number(projectId))

  const rawPestelData = pestelQuery.data?.data
  const rawSwotData = swotQuery.data?.data
  const objectivesData = objectivesQuery?.data
  

  if (isProjectPending || pestelQuery.isPending || swotQuery.isPending || isObjectivePending || isRiskPending) {
    return <h2 className="p-6 text-center text-(--description)">Đang tải dữ liệu...</h2>
  }
  
  if (isProjectError || pestelQuery.isError || isObjectiveError || isRiskError) {
    return <h2 className="p-6 text-center text-(--error)">Có lỗi xảy ra vui lòng thử lại!</h2>
  }

  const pestelData = formatData(rawPestelData, PESTEL_LABELS)
  const swotData = formatData(rawSwotData, SWOT_LABELS)
  
  return (
    <PageTransition>
      <div className="mx-auto max-w-6xl space-y-8" ref={contentRef}>
        <Card className="bg-(--white) shadow-sm border-none">
          <CardContent className="text-start space-y-1">
            <Badge className="bg-green-100 text-(--solution) text-sm">Đang tiến hành</Badge>
            <Title variant="dark" size="large">{projectData.name}</Title>
            <div className="flex space-x-8 text-md font-medium">
              <h2 className="text-(--primary-btn) flex items-center">
                <UserCircle size={20} className="mr-1" />
                <span className="text-(--black) ml-1">
                  {projectData.user.name}
                </span>
              </h2>
              <h2 className=" text-(--primary-btn) flex items-center">
                <Contact size={20} className="mr-1" />
                <span className="text-(--black) ml-1">
                  {projectData.role}
                </span>
              </h2>
              <h2 className=" text-(--primary-btn) flex items-center">
                <Clock size={20} className="mr-1" />
                <span className="text-(--black) ml-1">
                  01/01/2026
                </span>
              </h2>
            </div>
            <h2 className="text-md text-(--primary-btn) flex items-center font-medium">
              <MapPin size={20} className="mr-1" />
              <span className="text-(--black) ml-1">
                {projectData.location}
              </span>
            </h2>
            <h2 className="text-md text-(--primary-btn) font-medium flex items-center">
              <CircleDollarSign size={20} className="mr-1" />
              <span className="text-(--black) ml-1">
                {projectData.capital}
              </span>
            </h2>
          </CardContent>
        </Card>
        <Card className="bg-(--white) shadow-sm border-none">
          <CardContent className="space-y-8">
            {/* Img */}
            <ImageUpload projectId={Number(projectId)} currentImageUrl={projectData?.backgroundImageUrl || undefined} />
            {/* PESTEL and SWOT */}

            {/* Desktop View - 2 cột song song */}
            <div className="hidden md:grid md:grid-cols-3 gap-6 text-start">
              {/* Bối cảnh bên ngoài */}
              <Card className="bg-(--white) shadow-sm border-none col-span-2">
                <CardContent className="space-y-4">
                  <h3 className="text-[24px] font-semibold text-(--logo) border-b-2 pb-2 flex items-center">
                    <EarthIcon size={24} className="mr-2"/>
                    Bối cảnh bên ngoài (PESTEL)
                  </h3>
                  <PageTransition>
                    <div className="space-y-4">
                      {pestelData.map((pestel: PestelRawData) => (
                        <div key={pestel.code} className="text-start">
                          <Title size="small" className="text-(--primary-btn)">{pestel.label}</Title>
                          <ul className="space-y-2 list-disc pl-6 mt-2">
                            {pestel.items.map((item: PestelItem, index: number) => (
                              <li key={index} className="text-md text-(--description)">
                                {item.content}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </PageTransition>
                </CardContent>
                {/* Bối cảnh bên trong */}
                <CardContent className="space-y-4">
                  <h3 className="text-[24px] font-semibold text-(--logo) border-b-2 pb-2 flex items-center">
                    <MapPin size={24} className="mr-2"/>
                    Bối cảnh bên trong (SWOT)
                  </h3>
                  <PageTransition>
                    <div className="space-y-4">
                      {swotData.map((swot: PestelRawData) => (
                        <div key={swot.code} className="text-start">
                          <Title size="small" className="text-(--primary-btn)">{swot.label}</Title>
                          <ul className="space-y-2 list-disc pl-6 mt-2">
                            {swot.items.map((item: PestelItem, index: number) => (
                              <li key={index} className="text-md text-(--description)">
                                {item.content}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </PageTransition>
                </CardContent>
              </Card>
              {/* Target */}
              <div className="col-span-1 space-y-4">
                <Card className="bg-(--white) shadow-sm border-none col-span-1 self-start">
                  <CardContent className="text-start space-y-2">
                    <h3 className="text-[24px] font-semibold text-(--logo) pb-2 flex items-center">
                      <Flag size={24} className="mr-2"/>
                      Mục tiêu dự án
                    </h3>
                    <div className="relative">
                      <div className="space-y-4">
                        {objectivesData?.map((objective: ObjectivesResponse) => (
                          <div key={objective.id} className="relative pl-8">
                            <div className="absolute left-0 top-1 z-10 h-6 w-6 rounded-full bg-green-100 ring-2 ring-white flex items-center justify-center">
                              <div className="h-2 w-2 rounded-full bg-green-500" />
                            </div>
                            <h3 className="text-md leading-relaxed">
                              {objective.name}
                            </h3>
                          </div>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-(--blue-border)">
                  <CardContent className="text-start">
                    <h4 className="text-sm font-bold text-(--main-color) uppercase tracking-wide mb-2">
                      Lời nhắc Risk Manager
                    </h4>
                    <p className="text-sm leading-relaxed text-(--description)">
                      Đừng quên cập nhật báo cáo rủi ro hàng tuần vào mỗi chiều thứ 6.
                    </p>
                  </CardContent>
                </Card>
              </div>
            </div>
            {/* Mobile-View */}
            <Tabs defaultValue="pestel" className="md:hidden">
              <div>
                <TabsList variant="line" className="text-xl font-medium text-(--logo)">
                  <TabsTrigger value="pestel">
                    Bối cảnh bên ngoài
                  </TabsTrigger>
                  <TabsTrigger value="swot">Bối cảnh bên trong</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="pestel">
                <PageTransition>
                  <div className="space-y-4">
                    {pestelData.map((pestel: PestelRawData) => (
                      <div key={pestel.code} className="text-start px-4">
                        <Title size="small" className="text-(--political)">{pestel.label}</Title>
                        <ul className="space-y-1 list-disc px-8">
                          {pestel.items.map((item: PestelItem, index: number) => (
                            <li className="flex text-md display-list-item"
                              key={index}
                              style={{ display: 'list-item' }}
                            >
                              {item.content}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </PageTransition>
              </TabsContent>
              <TabsContent value="swot" className="space-y-2">
                <PageTransition>
                  <div className="space-y-4">
                    {swotData.map((swot: PestelRawData) => (
                      <div key={swot.code} className="text-start px-4">
                        <Title size="small" className="text-(--political)">{swot.label}</Title>
                        <ul className="space-y-1 list-disc px-8">
                          {swot.items.map((item: PestelItem, index: number) => (
                            <li className="flex text-md display-list-item"
                              key={index}
                              style={{ display: 'list-item' }}
                            >
                              {item.content}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                </PageTransition>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        {/* Table */}
        <div className="flex justify-between mb-2 items-center">
          <Title size="small">Bảng báo cáo</Title>
          <ButtonGroup className="ml-0 max-w-5xl no-print">
            <Button onClick={handleGeneratePDF} size="extra-small" className="flex">
              <Download size={16} className="mr-1" />Tải xuống PDF
            </Button>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="extra-small">
                  <MoreHorizontalIcon />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-40">
                <DropdownMenuGroup>
                  <DropdownMenuItem className="bg-(--white) hover:bg-(--border)">
                    <Download size={16} className="mr-1" />Tải xuống trang
                  </DropdownMenuItem>
                  <DropdownMenuItem className="bg-(--white) hover:bg-(--border)">
                    <Edit size={16} className="mr-1" />Chỉnh sửa
                  </DropdownMenuItem>
                  <DropdownMenuItem className="bg-(--white) hover:bg-(--border)">
                    <Trash2 size={16} className="mr-1" />Xoá bảng
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </ButtonGroup>
        </div>

        <Card className="bg-(--white) shadow-sm border-none">
          <CardContent className="px-6 py-2 space-y-4">
            <Table className="max-w-6xl lg:w-full table-fixed">
              <TableHeader>
                <TableRow className="text-(--description)">
                  <TableHead className="text-center w-[5%]">STT</TableHead>
                  <TableHead className="w-[20%]">Rủi ro</TableHead>
                  <TableHead className="w-[10%]">Mức độ</TableHead>
                  <TableHead className="lg:w-[15%]">Giải pháp</TableHead>
                  <TableHead className="lg:w-[25%]">Kế hoạch</TableHead>
                  <TableHead className="text-left px-4 lg:w-[15%]">Người chịu trách nhiệm</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {riskRankings?.map((risk: RiskResponse, index: number) => (
                  <TableRow key={risk.id} className="hover:bg-(--bg-search) transition-colors">
                    <TableCell className="text-center font-semibold">{index + 1}</TableCell>
                    <TableCell className="text-left font-medium text-sm break-all whitespace-normal">{risk.name}</TableCell>
                    <TableCell className="text-left">{renderRiskLevelBadge(risk.assessment?.riskLevel)}</TableCell>
                    <TableCell className="text-left font-medium text-sm break-all whitespace-normal">{risk.strategy}</TableCell>
                    <TableCell className="p-0">
                      <ul className="flex flex-col divide-y divide-slate-200">
                        {risk.solutions.map((solution: SolutionResponse, index: number) => (
                          <li key={index} className="p-2 min-h-10 flex text-left items-center text-sm wrap-break-word whitespace-normal">
                            {solution.content}
                          </li>
                        ))}
                      </ul>
                    </TableCell>
                    <TableCell className="p-0 text-left">
                      <div className="flex flex-col divide-y divide-slate-200">
                        {risk.solutions.map((solution: SolutionResponse, index: number) => (
                          <div key={index} className="px-4 py-2 min-h-10 flex items-center text-(--political) italic font-medium break-all whitespace-normal">
                            {solution.personInCharge}
                          </div>
                        ))}
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
        <PDFPreviewDialog
          ref={pdfPreviewRef}
          fileName="Bao_cao_du_an.pdf"
        />
      </div>
    </PageTransition>
  )
}
