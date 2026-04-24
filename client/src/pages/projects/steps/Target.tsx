import { useNavigate } from "react-router-dom"
import { 
  Button,
  Card,
  CardContent,
  Description,
  Title,
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
  Input,
  CardTitle,
} from "@/components/ui"
import { Plus, Trash2 } from "lucide-react"
import { useState } from "react"
import { titleCase } from "@/utils"
import { PageTransition } from "@/components/animated"
import { PDFViewer, RiskList } from "@/components/ui/molecules"
import pdf from '../../../assets/pdf/RISK-CHECKLIST.pdf'
import { fishBoneChart, swotModel } from "@/assets/imgs"
import { RISK_CHECKLIST } from "@/components/constants"
import { 
  useGetObjectives, 
  useCreateObjective, 
  useUpdateObjective, 
  useDeleteObjective 
} from "@/hooks/useObjective"

export default function Target() {
  const navigate = useNavigate()
  const projectId = Number(localStorage.getItem("currentProjectId"));

  const { data: objectivesResponse, isLoading } = useGetObjectives(projectId);
  const createObjective = useCreateObjective();
  const updateObjective = useUpdateObjective();
  const deleteObjective = useDeleteObjective();

  const objectives = objectivesResponse?.data || [];

  // get general data from localStorage for role display
  const [localData] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem("projectFormData") || "{}")
    } catch {
      return {}
    }
  })

  const handleAddObjective = () => {
    if (!projectId) {
      alert("Không tìm thấy ID dự án, vui lòng tạo dự án trước.");
      return;
    }
    createObjective.mutate({ projectId, body: { name: "Mục tiêu mới" } });
  }

  const handleNext = async () => {
    navigate('/projects/evaluation')
  }
  
  return (
    <PageTransition>
      <div className="mx-auto md:p-2 space-y-4">
        {/* Headers */}
        <Card className="bg-(--white) shadow-sm border-none">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <Title variant="navy" size="large">
              Quản lý mục tiêu và rủi ro dự án
              <Description>
                Sử dụng công cụ này để xác định và phân loại các rủi ro tiềm ẩn cho dự án của bạn
              </Description>
            </Title>
            <p className="text-[16px] px-24 hidden md:block">
              Phân tích và theo dõi các rủi ro trong dự án của bạn một cách hiệu quả. Bấm vào nút bên dưới để mở tệp tham khảo chứa danh sách các loại rủi ro thường gặp, giúp bạn trong quá trình xác định
            </p>
            {/* View PDF */}
            <PDFViewer
              fileUrl={pdf}
              fileName="Risk_CheckList.pdf"
            />
          </CardContent>
        </Card>
        <div className="md:grid md:grid-cols-3 gap-4">
          {/* Chart */}
          <div className="col-span-2">
            <div className="grid md:grid-cols-2 gap-4">
              <Card className="bg-(--white) shadow-sm border-none">
                <CardContent className="py-8">
                  <CardTitle className="mb-4">
                    <span className="py-2 px-8 bg-[#002F7C] text-white text-lg rounded-full font-semibold">BIỂU ĐỒ XƯƠNG CÁ</span>
                  </CardTitle>
                  <div className="w-fit rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] overflow-hidden">
                    <img
                      src={fishBoneChart}
                      alt="Fishbone Chart"
                      className="max-w-full h-auto block"
                    />
                  </div>
                </CardContent>
              </Card>
              <Card className="bg-(--white) shadow-sm border-none">
                <CardContent className="py-8">
                  <CardTitle className="mb-4">
                    <span className="py-2 px-8 bg-[#F97316] text-white text-lg rounded-full font-semibold shadow-sm">MÔ HÌNH SWOT</span>
                  </CardTitle>
                  <div className="w-fit rounded-xl shadow-[4.0px_8.0px_8.0px_rgba(0,0,0,0.38)] overflow-hidden">
                    <img
                      src={swotModel}
                      alt="Swot model"
                      className="max-w-full h-auto block"
                    />
                  </div>
                </CardContent>
              </Card>
            </div>
            {/* Role */}
            <p className="font-semibold mt-4 mb-1 text-start text-(--description)">
              Vai trò của đơn vị thực hiện: <span className="text-(--black)">{localData.info?.role || ''}</span>
            </p>
            {/* Target List */}
            <Card className="shadow-sm border-none bg-(--white)">
              <CardContent className="p-8">
                <Title variant="navy" size="medium" className="text-start">
                  Danh sách mục tiêu và rủi ro liên quan tới mục tiêu
                </Title>
                {isLoading ? (
                  <p className="py-4 text-gray-500">Đang tải danh sách mục tiêu...</p>
                ) : (
                  <>
                    {objectives.length === 0 ? (
                      <div className="text-center py-6 bg-(--secondary-btn) rounded-lg border border-dashed border-(--blue-border) my-4">
                        <p className="text-sm text-(--description) italic">Chưa có mục tiêu nào. Hãy nhấn "Thêm mục tiêu" bên dưới.</p>
                      </div>
                    ) : (
                      <Accordion type="single" collapsible className="w-full space-y-4 my-4">
                      {objectives.map((objective) => (
                        <AccordionItem
                          key={objective.id}
                          value={objective.id}
                          className="border-2 border-(--blue-border) text-start bg-(--white) rounded-lg px-4 my-4 data-[state=open]:border-b data-[state=open]:mb-4"
                        >
                          <AccordionTrigger className="hover:no-underline py-4">
                            <div className="flex items-center justify-between w-full pr-4">
                              <div
                                className="flex-1 mr-4"
                                onClick={(e) => e.stopPropagation()}
                              >
                                <Input
                                  defaultValue={objective.name}
                                  onBlur={(e) => {
                                    const newName = e.target.value.trim();
                                    if (newName && newName !== objective.name) {
                                      updateObjective.mutate({ 
                                        projectId,
                                        objectiveId: objective.id, 
                                        body: { name: titleCase(newName) } 
                                      });
                                    }
                                  }}
                                  className="border-none shadow-none bg-transparent font-medium text-(--black) h-auto p-0 focus-visible:ring-0 placeholder:text-gray-400"
                                  placeholder="Nhập tên mục tiêu..."
                                />
                              </div>
                            </div>
                          </AccordionTrigger>
                          <AccordionContent>
                            {/* Risk List */}
                            <RiskList 
                              projectId={projectId} 
                              objectiveId={objective.id} 
                              risks={objective.risks || []} 
                            />
                            <Button
                              variant="none"
                              size="none"
                              onClick={() => deleteObjective.mutate({ projectId, objectiveId: objective.id })}
                              className="mt-2"
                              disabled={deleteObjective.isPending}
                            >
                              <p className="text-(--error) hover:text-red-400 flex items-center space-x-1">
                                <Trash2 className="w-4 h-4"/>
                                <span>Xoá mục tiêu</span>
                              </p>
                            </Button>
                          </AccordionContent>
                        </AccordionItem>
                      ))}
                    </Accordion>
                    )}
                    <Button
                      variant="outline"
                      size="medium"
                      className="flex w-full"
                      onClick={handleAddObjective}
                      disabled={createObjective.isPending}
                    >
                      <Plus/>
                      {createObjective.isPending ? "Đang thêm..." : "Thêm mục tiêu"}
                    </Button>
                  </>
                )}

                <div className="py-4 flex gap-2 justify-end bottom-0 backdrop-blur border-t mt-4">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/projects/pestel')}
                  >
                    Quay lại
                  </Button>
                  <Button
                    type="button"
                    variant="primary"
                    size='medium'
                    onClick={handleNext}
                  >
                    Tiếp theo
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          {/* Risk CheckList */}
          <Card className="bg-(--white) border-none shadow-sm h-fit hidden md:block">
            <CardContent>
              <Accordion type="multiple" className="max-w-lg">
                {RISK_CHECKLIST.map((risk, index) => (
                  <AccordionItem value={risk.value} key={index}>
                    <AccordionTrigger className="text-md cursor-pointer">{risk.label}</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <ul className="space-y-1 list-disc">
                        {risk.items.map((item, idx) => (
                          <li key={idx}
                              className="text-sm text-start display-list-item"
                              style={{ display: 'list-item' }}
                          >
                            {item}
                          </li>
                        ))}
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageTransition>
  )
}
