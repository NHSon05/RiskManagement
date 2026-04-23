import { useNavigate } from "react-router-dom";
import { useForm, type Path } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { PESTEL_CONFIG } from "@/components/constants";
import { pestelSchema, swotSchema } from "@/projectSchema/projectSchema";

import {
    Title,
    Button,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Form,
} from "@/components/ui";
import PestelInput from "@/components/ui/molecules/PestelInput";
import { PageTransition } from "@/components/animated";
import { usePestel } from "@/hooks/usePestel";
import { useSwot } from "@/hooks/useSwot";
import { PESTEL_MAP, SWOT_MAP } from "@/components/constants/pestel-swot-config";

const SIDEBAR_SUGGESTS = [
    ...PESTEL_CONFIG.map((i) => (
      {
        title: i.title,
        lists: i.lists
      }
    )),
    {
      title: 'Các bên liên quan',
      lists: ['Chủ đầu tư', 'Nhà thầu chính', 'Nhà cung cấp', 'Đơn vị tư vấn thiết kế', 'Đơn vị tư vấn giám sát', 'Người sử dụng', 'Tổ chức tài chính', 'Cơ quản lý nhà nước']
    }
];

const formSchema = z.object({
  pestel: pestelSchema,
  swot: swotSchema
});

export type FormValues = z.infer<typeof formSchema>;

function Pestel() {
  const navigate = useNavigate();
  const projectId = Number(localStorage.getItem("currentProjectId"));

  const { savePestelMutation } = usePestel(projectId);
  const { saveSwotMutation } = useSwot(projectId);

  const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}");

  // Initialize Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema) as never,
    defaultValues: {
      pestel: {
        political: savedData.pestel?.political || [],
        economic: savedData.pestel?.economic || [],
        social: savedData.pestel?.social || [],
        technological: savedData.pestel?.technological || [],
        environmental: savedData.pestel?.environmental || [],
        legal: savedData.pestel?.legal || []
      },
      swot: {
        strengths: savedData.swot?.strengths || [],
        weaknesses: savedData.swot?.weaknesses || [],
        opportunities: savedData.swot?.opportunities || [],
        threats: savedData.swot?.threats || []
      }
    }
  });

  // // Pre-fill form from API
  // useEffect(() => {
  //   if (pestelQuery.data?.data) {
  //     const d = pestelQuery.data.data;
  //     const parseStr = (str?: string) => {
  //       if (!str) return [];
  //       try { return JSON.parse(str); } catch { return []; }
  //     };
  //     form.setValue('pestel', {
  //       political: parseStr(d.political),
  //       economic: parseStr(d.economic),
  //       social: parseStr(d.social),
  //       technological: parseStr(d.technological),
  //       environmental: parseStr(d.environmental),
  //       legal: parseStr(d.legal),
  //     });
  //   }
  // }, [pestelQuery.data, form]);

  // useEffect(() => {
  //   if (swotQuery.data?.data) {
  //     const d = swotQuery.data.data;
  //     const parseStr = (str?: string) => {
  //       if (!str) return [];
  //       try { return JSON.parse(str); } catch { return []; }
  //     };
  //     form.setValue('swot', {
  //       strengths: parseStr(d.strengths),
  //       weaknesses: parseStr(d.weaknesses),
  //       opportunities: parseStr(d.opportunities),
  //       threats: parseStr(d.threats),
  //     });
  //   }
  // }, [swotQuery.data, form]);

  const onSubmit = async (data: FormValues) => {
    if (!projectId) {
      alert("Không tìm thấy dự án! Vui lòng tạo dự án trước.");
      return;
    }

    try {
      await savePestelMutation.mutateAsync(data.pestel);
      await saveSwotMutation.mutateAsync(data.swot);
      
      const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}");
      const finalData = { ...savedData, pestel: data.pestel, swot: data.swot };
      localStorage.setItem("projectFormData", JSON.stringify(finalData));
      
      navigate('/projects/target');
    } catch (e) {
      console.error(e);
      alert("Có lỗi xảy ra khi lưu dữ liệu, vui lòng thử lại.");
    }
  };

  const renderSectionGroup = (
    mapList: { key: string, label: string }[],
    formKey: "pestel" | "swot",
    title: string
  ) => (
    <>
      <Title size="medium" variant="navy" className="lg:text-start mt-4">
          {title}
      </Title>
      {mapList.map((item, index) => (
        <div key={item.key} className="border-2 border-(--blue-border) text-start bg-(--white) rounded-lg px-4 my-4">
          <Accordion type="multiple" defaultValue={[`item-${index}`]}>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                <Title size="small" className={`text-start text-(--primary-btn)`}>
                  {item.label}
                </Title>
              </AccordionTrigger>
              <AccordionContent>
                <PestelInput 
                  name={`${formKey}.${item.key}` as Path<FormValues>}
                  control={form.control} 
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      ))}
    </>
  );

  return (
    <PageTransition>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit as never)}>
          <Title size="large" variant="navy" className="py-2">Bối cảnh của dự án</Title>
          <div className="grid grid-cols-4 gap-4">
            
            {/* Input Form */}
            <div className="col-span-4 lg:col-span-3">
              {renderSectionGroup(PESTEL_MAP, "pestel", "Bối cảnh bên ngoài (Dựa trên mô hình PESTEL)")}
              {renderSectionGroup(SWOT_MAP, "swot", "Bối cảnh bên trong (Dựa trên mô hình SWOT)")}
            </div>

            {/* Sidebar Suggestions */}
            <div className="hidden lg:block col-span-1 border-2 border-(--blue-border) text-start bg-(--white) rounded-2xl p-4 shadow-2xl shadow-blue-500/20 h-fit">
              <div className="flex items-center justify-between">
                <Title size="medium" variant="navy" className="">Đề xuất</Title>
                <span className="text-(--main-color) text-sm cursor-pointer hover:italic hover:underline">Xem thêm</span>
              </div>
              {SIDEBAR_SUGGESTS.map((suggest, index) => (
                <ul key={index} className="py-2">
                    <h3 className="font-medium text-lg mb-1 text-(--main-color)">
                        {suggest.title}
                    </h3>
                    {suggest.lists?.map((list, idx) => (
                        <li key={idx} className="py-0.5 text-sm text-(--description)">{list}</li>
                    ))}
                </ul>
              ))}
            </div>
          </div>

          {/* Buttons Action */}
          <div className="py-4 flex gap-2 justify-end bottom-0 bg-white/80 backdrop-blur p-4 border-t mt-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                const currentData = form.getValues();
                const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}");
                localStorage.setItem("projectFormData", JSON.stringify({ ...savedData, pestel: currentData.pestel, swot: currentData.swot }));
                navigate('/projects/info')
              }}
            >
                Quay lại
            </Button>
            <Button 
              type="submit"
              variant="primary"
              size='medium'
              disabled={savePestelMutation.isPending || saveSwotMutation.isPending}
            >
              {(savePestelMutation.isPending || saveSwotMutation.isPending) ? "Đang lưu..." : "Tiếp theo"}
            </Button>
          </div>
        </form>
      </Form>
    </PageTransition>
  );
}

export default Pestel;