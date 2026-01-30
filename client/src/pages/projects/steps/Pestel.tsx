/* eslint-disable @typescript-eslint/no-explicit-any */
import { useNavigate } from "react-router-dom";
import { useForm, useFieldArray, type Control } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

import {
    Title,
    Button,
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
    Input,
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui";
import { Trash2, Plus } from "lucide-react";

const itemSchema = z.object({
    value: z.string().min(1, "Nội dung không được để trống")
});

const formSchema = z.object({
    data: z.record(z.string(), z.array(itemSchema))
});

type FormValues = z.infer<typeof formSchema>;

// --- Constants ---
interface SectionConfig {
    key: string;
    title?: string;
    label: string;
    lists?: string[];
}

const pestels: SectionConfig[] = [
    { key: 'political', title: 'Chính trị', label: 'P - Political (Chính trị)', lists: ['Ảnh hưởng từ chính phủ', 'Chính sách', 'Ổn định chính trị'] },
    { key: 'economy', title: 'Kinh tế', label: 'E - Economy (Kinh tế)', lists: ['Lãi suất', 'Tỷ giá', 'Lạm phát', 'Thị trường'] },
    { key: 'social', title: 'Xã hội', label: 'S - Social (Xã hội)', lists: ['Hành vi khách hàng', 'Nhân khẩu học', 'Xu hướng xã hội'] },
    { key: 'technology', title: 'Công nghệ', label: 'T - Technology (Công nghệ)', lists: ['Đổi mới', 'Công nghệ thông tin', 'Tự động hoá'] },
    { key: 'environment', title: 'Môi trường', label: 'E - Environment (Môi trường)', lists: ['Khí hậu', 'Biến đổi môi trường', 'Thiên tai'] },
    { key: 'legal', title: 'Pháp luật', label: 'L - Legal (Pháp luật)', lists: ['Nghĩa vụ pháp luật', 'Hợp đồng', 'Trách nhiệm'] }
];

const swots: SectionConfig[] = [
    { key: 'strengths', label: 'S - Strengths (Điểm mạnh)' },
    { key: 'weakness', label: 'W - Weakness (Điểm yếu)' },
    { key: 'opportunities', label: 'O - Oppotunities (Cơ hội)' },
    { key: 'threats', label: 'T - Threats (Thách thức)' },
];

const suggests: SectionConfig[] = [
    ...pestels,
    { key: 'party', title: 'Các bên liên quan', label: 'party', lists: ['Chủ đầu tư', 'Nhà thầu chính', 'Nhà cung cấp', 'Đơn vị tư vấn thiết kế', 'Đơn vị tư vấn giám sát', 'Người sử dụng', 'Tổ chức tài chính', 'Cơ quản lý nhà nước'] }
];

// --- 2. Sub-Component: SectionEditor ---
// Component này chịu trách nhiệm quản lý danh sách array của 1 key cụ thể (VD: political)
interface SectionEditorProps {
    sectionKey: string;
    control: Control<FormValues>;
}

const SectionEditor = ({ sectionKey, control }: SectionEditorProps) => {
    const { fields, append, remove } = useFieldArray({
        control,
        name: `data.${sectionKey}` as any,
    });

    return (
        <div className="space-y-2">
            {/* Hiển thị danh sách input */}
            {fields.map((field, index) => (
                <div key={field.id} className="flex gap-2 items-start py-1">
                    <FormField
                        control={control}
                        name={`data.${sectionKey}.${index}.value` as any}
                        render={({ field }) => (
                            <FormItem className="flex-1">
                                <FormControl>
                                    <Input placeholder="Nhập nội dung..." {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <button
                        type="button"
                        onClick={() => remove(index)}
                        className="mt-2 text-(--error) hover:bg-red-50 rounded-md transition"
                    >
                        <Trash2 className="w-6 h-6" />
                    </button>
                </div>
            ))}
            {/* Nút thêm mới */}
            <Button
                type="button"
                variant="none"
                size="none"
                onClick={() => append({ value: "" })}
                className="flex items-center"
            >
                <Plus size={20} className="mr-1 h-4 w-4" />
                <span>Thêm nội dung</span>
            </Button>
        </div>
    );
};

// --- 3. Main Component ---
function Pestel() {
    const navigate = useNavigate();

    // Khởi tạo Form
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            data: {}
        }
    });

    const onSubmit = (data: FormValues) => {
        console.log("Dữ liệu submit:", data);
        navigate('/projects/target');
    };

    // Helper render layout
    const renderSectionGroup = (configs: SectionConfig[], title: string) => (
        <>
            <Title size="medium" variant="navy" className="lg:text-start mt-4">
                {title}
            </Title>
            {configs.map((config, index) => (
                <div key={config.key} className="border-2 border-(--blue-border) text-start bg-(--white) rounded-lg px-4 my-4">
                    <Accordion type="multiple" defaultValue={[`item-${index}`]}>
                        <AccordionItem value={`item-${index}`}>
                            <AccordionTrigger>
                                <Title size="small" className={`text-start text-(--primary-btn)`}>
                                    {config.label}
                                </Title>
                            </AccordionTrigger>
                            <AccordionContent>
                                {/* Gọi Component con chứa useFieldArray */}
                                <SectionEditor 
                                    sectionKey={config.key} 
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
                        {suggests.map((suggest) => (
                            <ul key={suggest.key} className="py-2">
                                <h3 className="font-medium text-lg mb-1 text-(--main-color)">
                                    {suggest.title || suggest.label}
                                </h3>
                                {suggest.lists?.map((list, idx) => (
                                    <li key={idx} className="py-0.5 text-sm text-gray-600">{list}</li>
                                ))}
                            </ul>
                        ))}
                    </div>
                    {/* Input Form */}
                    <div className="col-span-4 lg:col-span-3">
                        {renderSectionGroup(pestels, "Bối cảnh bên ngoài (Dựa trên mô hình PESTEL)")}
                        {renderSectionGroup(swots, "Bối cảnh bên trong (Dựa trên mô hình SWOT)")}
                    </div>
                </div>

                {/* Buttons Action */}
                <div className="py-4 flex gap-2 justify-end sticky bottom-0 bg-white/80 backdrop-blur p-4 border-t mt-4">
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => navigate('/projects/info')}
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