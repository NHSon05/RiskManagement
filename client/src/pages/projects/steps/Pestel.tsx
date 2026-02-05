import { useNavigate } from "react-router-dom";
import { useFieldArray, useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

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

// --- Constants ---
const PESTEL_CONFIG = [
    { code: 'P', title: 'Chính trị', label: 'P - Political (Chính trị)', lists: ['Ảnh hưởng từ chính phủ', 'Chính sách', 'Ổn định chính trị'] },
    { code: 'E', title: 'Kinh tế', label: 'E - Economy (Kinh tế)', lists: ['Lãi suất', 'Tỷ giá', 'Lạm phát', 'Thị trường'] },
    { code: 'S', title: 'Xã hội', label: 'S - Social (Xã hội)', lists: ['Hành vi khách hàng', 'Nhân khẩu học', 'Xu hướng xã hội'] },
    { code: 'T', title: 'Công nghệ', label: 'T - Technology (Công nghệ)', lists: ['Đổi mới', 'Công nghệ thông tin', 'Tự động hoá'] },
    { code: 'E2', title: 'Môi trường', label: 'E - Environment (Môi trường)', lists: ['Khí hậu', 'Biến đổi môi trường', 'Thiên tai'] },
    { code: 'L', title: 'Pháp luật', label: 'L - Legal (Pháp luật)', lists: ['Nghĩa vụ pháp luật', 'Hợp đồng', 'Trách nhiệm'] }
];
const SWOT_CONFIG = [
    { code: 'S', label: 'S - Strengths (Điểm mạnh)' },
    { code: 'W', label: 'W - Weakness (Điểm yếu)' },
    { code: 'O', label: 'O - Oppotunities (Cơ hội)' },
    { code: 'T', label: 'T - Threats (Thách thức)' },
];
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
// ------ zod -------
const itemSchema = z.object({
  content: z.string().min(1, "Nội dung không được để trống")
});

const categorySchema = z.object({
  code: z.string(),
  label: z.string(),
  items: z.array(itemSchema)
});

const formSchema = z.object({
  pestel: z.array(categorySchema),
  swot: z.array(categorySchema)
})
type FormValues = z.infer<typeof formSchema>;
// --- 3. Main Component ---
function Pestel() {
  const navigate = useNavigate();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const createDefaultValues = (config: typeof PESTEL_CONFIG | typeof SWOT_CONFIG, savedArr?: any[]) => {
    if (savedArr && Array.isArray(savedArr) && savedArr.length>0) return savedArr;
    return config.map((c) => (
      {
        code: c.code,
        label: c.label,
        items:  [{ content: ""}]
      }
    ))
  }
  const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}")
  // Initialize Form
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      pestel: createDefaultValues(PESTEL_CONFIG, savedData.pestel),
      swot: createDefaultValues(SWOT_CONFIG, savedData.swot)
    }
  });
  // use useFieldArray to manage 2 arrays
  const {fields : pestelFields } = useFieldArray({
    control: form.control,
    name: 'pestel'
  })
  const {fields : swotFields } = useFieldArray({
    control: form.control,
    name: 'swot'
  })
  // handle onSubmit
  const onSubmit = (data: FormValues) => {
    const flattenForDB = (arr: typeof data.pestel, type: 'PESTEL' | 'SWOT') => {
      return arr.flatMap(cat => 
        cat.items
          .filter(i => i.content && i.content.trim() != "")
          .map(i => ({
            model_type: type,
            category_code: cat.code,
            content: i.content,
          }))
      )
    }
    const dbPayload = [
      ...flattenForDB(data.pestel, 'PESTEL'),
      ...flattenForDB(data.swot, 'SWOT')
    ];
    console.log("Dữ liệu chuẩn:", dbPayload);
    const finalData = { ...savedData, pestel: data.pestel, swot: data.swot };
    localStorage.setItem("projectFormData", JSON.stringify(finalData));
    navigate('/projects/target');
  };
  // Helper render layout
  const renderSectionGroup = (
    fields: typeof pestelFields,
    formKey: "pestel" | "swot",
    title: string
  ) => (
    <>
      <Title size="medium" variant="navy" className="lg:text-start mt-4">
          {title}
      </Title>
      {fields.map((field, index) => (
        <div key={field.id} className="border-2 border-(--blue-border) text-start bg-(--white) rounded-lg px-4 my-4">
          <Accordion type="multiple" defaultValue={[`item-${index}`]}>
            <AccordionItem value={`item-${index}`}>
              <AccordionTrigger>
                <Title size="small" className={`text-start text-(--primary-btn)`}>
                  {field.label}
                </Title>
              </AccordionTrigger>
              <AccordionContent>
                {/* Gọi Component con chứa useFieldArray */}
                <PestelInput 
                  name={`${formKey}.${index}.items`}
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
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Title size="large" variant="navy" className="py-8">Bối cảnh của dự án</Title>
        <div className="grid grid-cols-4 gap-4">
          {/* Static) */}
          <div className="hidden lg:block col-span-1 border-2 border-(--blue-border) text-start bg-(--white) rounded-2xl p-4 shadow-2xl shadow-blue-500/20 h-fit">
            <div className="flex items-center justify-between">
              <Title size="medium" variant="navy" className="">Đề xuất</Title>
              <span className="text-(--main-color) text-sm cursor-pointer hover:italic hover:underline">Xem thêm</span>
            </div>
            {SIDEBAR_SUGGESTS.map((suggest,index) => (
              <ul key={index} className="py-2">
                  <h3 className="font-medium text-lg mb-1 text-(--main-color)">
                      {suggest.title}
                  </h3>
                  {suggest.lists?.map((list, idx) => (
                      <li key={idx} className="py-0.5 text-sm text-gray-600">{list}</li>
                  ))}
              </ul>
            ))}
          </div>
          {/* Input Form */}
          <div className="col-span-4 lg:col-span-3">
            {renderSectionGroup(pestelFields, "pestel","Bối cảnh bên ngoài (Dựa trên mô hình PESTEL)")}
            {renderSectionGroup(swotFields, "swot","Bối cảnh bên trong (Dựa trên mô hình SWOT)")}
          </div>
        </div>

        {/* Buttons Action */}
        <div className="py-4 flex gap-2 justify-end sticky bottom-0 bg-white/80 backdrop-blur p-4 border-t mt-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => {
              navigate('/projects/info')
            }}
          >
              Quay lại
          </Button>
          <Button 
            type="submit"
            variant="primary"
            size='medium'
          >
              Tiếp theo
          </Button>
        </div>
      </form>
    </Form>
  );
}

export default Pestel;