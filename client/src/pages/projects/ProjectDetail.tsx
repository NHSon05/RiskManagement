/* eslint-disable @typescript-eslint/no-explicit-any */
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
import type { PestelSwot, PestelSwotItem, ResponsePlan, Risk, Target } from "@/types/projectType";
import { useRef, useState } from "react";
import { toPng } from 'html-to-image';
import jsPDF from 'jspdf'
// import { useNavigate } from "react-router-dom";
import { getRiskLevelBadge } from "@/utils";
import { CircleDollarSign, Clock, Contact, Download, Edit, MapPin, MoreHorizontalIcon, Trash2, UserCircle } from "lucide-react";
import { FaTwitter, FaFacebookF, FaInstagram } from 'react-icons/fa';
import { PageTransition } from "@/components/animated";
import building from '../../assets/imgs/DaNang.png';


export default function ProjectDetail() {
  // const navigate = useNavigate()
  const printRef = useRef<HTMLDivElement>(null)
  const handleDownloadPdf = async () => {
    const element = printRef.current;
    if (!element) return;

    try {
      const dataUrl = await toPng(element, { 
        quality: 0.95,
        backgroundColor: '#ffffff',
        cacheBust: true,
      });

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
      const saved = localStorage.getItem("projectFormData")
      return saved ? JSON.parse(saved) : { prj_targets: []}
    } catch (error) {
       console.error('Lỗi khi lấy dữ liệu', error)
      return { prj_targets: [] }
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
  // Flatten all risks from all targets
  const allRisks = data.prj_targets?.flatMap((target : Target, targetIndex: any) => 
    target.risks?.map((risk: Risk, riskIndex: any) => ({
      ...risk,
      targetName: target.name,
      targetIndex,
      riskIndex
    })) || []
  ) || []
  return (
    <PageTransition>
    <div className="mx-auto max-w-6xl space-y-8">
      <Card className="bg-(--white) shadow-sm border-none">
        <CardContent className="space-y-8">
          {/* Img */}
          <div
            className="h-[40vh] bg-center bg-cover flex items-center justify-center rounded-xl
            shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)]"
            style={{ backgroundImage: `url(${building})` }}>
          </div>
          {/* Information */}
          <div className="text-start space-y-2">
            <div className="flex justify-between">
              <Title variant="dark" size="medium">
                {data.prj_name}
              </Title>
              <Badge className="bg-green-100 text-(--solution) text-sm">Đang tiến hành</Badge>
            </div>
            <h2 className="text-sm text-(--political) italic font-medium flex items-center">
              <UserCircle size={20} className="mr-1"/> 
              Nguyễn Văn A
            </h2>
            <h2 className="text-sm text-(--political) italic font-medium flex items-center">
              <Contact size={20} className="mr-1"/>
              {data.prj_role}
            </h2>
            <h2 className="text-sm text-(--political) italic font-medium flex items-center">
              <Clock size={20} className="mr-1"/>
              01/01/2026
            </h2>
            <h2 className="text-sm text-(--political) italic font-medium flex items-center">
              <MapPin size={20} className="mr-1"/>
              {data.prj_location}
            </h2>
            <h2 className="text-sm text-(--political) italic font-medium flex items-center">
              <CircleDollarSign size={20} className="mr-1"/>
              {data.prj_fund}
            </h2>
            <div className="flex space-x-2 items-center my-2">
              <span>Chia sẻ</span>
              <div className="flex space-x-1 items-center">
                <a href="#" className="bg-(--main-color) w-8 h-8 flex items-center justify-center rounded-full"><FaTwitter size={16} className="text-white"/></a>
                <a href="#" className="bg-(--main-color) w-8 h-8 flex items-center justify-center rounded-full"><FaFacebookF size={16} className="text-white" /></a>
                <a href="#" className="bg-pink-500 w-8 h-8 flex items-center justify-center rounded-full"><FaInstagram size={16} className="text-white"/></a>
              </div>
            </div>
          </div>
          <Tabs defaultValue="overview" className="">
            <TabsList>
              <TabsTrigger value="pestel">Bối cảnh bên ngoài</TabsTrigger>
              <TabsTrigger value="swot">Bối cảnh bên trong</TabsTrigger>
            </TabsList>
            <TabsContent value="pestel">
              <PageTransition>
                <div className="space-y-4">
                  {data.pestel.map((pestel: PestelSwot) => (
                      <div key={pestel.code} className="text-start px-4">
                        <Title variant="navy" size="small">{pestel.label}</Title>
                        <ul className="space-y-1 list-disc px-8">
                          {pestel.items.map((item: PestelSwotItem, index: any) => (
                            <li className="flex text-sm display-list-item" 
                                key={index}
                                style={{ display: 'list-item' }}
                            >
                              {/* <Dot className="w-8 h-8 mr-2"/> */}
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
                  {data.swot.map((swot: PestelSwot) => (
                    <div key={swot.code} className="text-start px-4">
                      <Title variant="navy" size="small">{swot.label}</Title>
                      <ul className="space-y-1 list-disc px-8">
                        {swot.items.map((item: PestelSwotItem, index: any) => (
                          <li className="flex text-sm display-list-item" 
                                key={index}
                                style={{ display: 'list-item' }}
                          >
                            {/* <Dot className="w-8 h-8 mr-2"/> */}
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
          <div className="text-start">
            <Title variant="dark" size="small">Mục tiêu</Title>
            <div className="relative p-2">
              {/* Đường line dọc chạy suốt timeline */}
              <div className="absolute left-4.75 top-2 bottom-2 w-[1.5px] bg-green-200" />
              <div className="space-y-12">
                {data.prj_targets.map((target: Target) => (
                  <div key={target.id} className="relative pl-10">
                    {/* Icon tròn nằm trên đường line */}
                    <div className="absolute left-0 top-1 z-10 h-6 w-6 rounded-full bg-green-100 ring-2 ring-white flex items-center justify-center">
                    {/* Chấm tròn nhỏ đậm bên trong nếu muốn giống 100% hình mẫu */}
                      <div className="h-2 w-2 rounded-full bg-green-500" />
                    </div>
                    <h3 className="text-md font-medium leading-relaxed">
                      {target.name}
                    </h3>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      {/* Label */}
      <div className="flex justify-between mb-2 items-center">
        <Title size="small">Bảng báo cáo</Title>
        <ButtonGroup className="ml-0 max-w-5xl">
          <Button onClick={handleDownloadPdf} size="extra-small" className="flex">
            <Download size={16} className="mr-1"/>Tải xuống PDF
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="extra-small">
                <MoreHorizontalIcon/>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-40">
              <DropdownMenuGroup>
                <DropdownMenuItem className="bg-(--white) hover:bg-(--border)">
                    <Download size={16} className="mr-1"/>Tải xuống trang
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-(--white) hover:bg-(--border)">
                    <Edit size={16} className="mr-1"/>Chỉnh sửa
                </DropdownMenuItem>
                <DropdownMenuItem className="bg-(--white) hover:bg-(--border)">
                    <Trash2 size={16} className="mr-1"/>Xoá bảng
                </DropdownMenuItem>
              </DropdownMenuGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </ButtonGroup>
      </div>

      {/* Risk Table */}
      <Card className="bg-(--white) shadow-sm border-none">
        <CardContent className="px-6 py-2 space-y-4" ref={printRef}>
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
              {allRisks.map((risk: Risk, index: number) => (
                <TableRow key={risk.id} className="hover:bg-(--bg-search) transition-colors">
                  <TableCell className="text-center font-semibold">{index + 1}</TableCell>
                  <TableCell className="text-left font-medium text-sm wrap-break-word whitespace-normal">{risk.name}</TableCell>
                  <TableCell className="text-left">{getRiskLevelBadge(risk.risk_level)}</TableCell>
                  <TableCell className="text-left font-medium text-sm wrap-break-word whitespace-normal">{risk.strategy}</TableCell>
                  <TableCell className="p-0">
                    <ul className="flex flex-col divide-y divide-slate-200">
                      {risk.response_plans.map((plan: ResponsePlan, index: number) => (
                        <li key={index} className="p-2 min-h-10 flex text-left items-center text-sm wrap-break-word whitespace-normal">
                          {plan.name}
                        </li>
                      ))}
                    </ul>
                  </TableCell>
                  <TableCell className="p-0 text-left">
                    <div className="flex flex-col divide-y divide-slate-200">
                      {risk.response_plans.map((plan: ResponsePlan, index: number) => (
                        <div key={index} className="px-4 py-2 min-h-10 flex items-center text-(--political) italic font-medium">
                          <UserCircle size={16} className="mr-2"/> 
                          {plan.owner}
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
    </div>
    </PageTransition>
  )
}
