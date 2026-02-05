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
  Form,
  FormField,
  FormItem,
  FormControl,
  Input,
} from "@/components/ui"
import { FileIcon, Plus, Trash2 } from "lucide-react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import RiskList from "@/components/ui/molecules/riskList"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from 'nanoid'
import { useEffect } from "react"


const riskSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  probability_level: z.number().default(0),
  impact_level: z.number().default(0),
  risk_level: z.number().default(0),
  strategy: z.string().default(""),
  response_plans: z.array(z.object({
    owner: z.string(),
    content: z.string()
  })).default([])
})
const targetSchema = z.object({
  id: z.string(),
  name: z.string().min(1, "Tên mục tiêu không được để trống"),
  risks: z.array(riskSchema)
})
const formSchema = z.object({
  prj_targets: z.array(targetSchema)
})
type FormValues = z.infer<typeof formSchema>

export default function Target() {
  const navigate = useNavigate()
  const loadSavedData = () => {
    const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}")
    if (savedData.prj_targets && savedData.prj_targets.length > 0) {
      return savedData.prj_targets
    }
    return [{
      id: nanoid(),
      name: "",
      risks: [] 
    }]
  }
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      prj_targets: loadSavedData()
    }
  })
  // useFieldArray cấp 1: Quản lý mục tiêu
  const {fields, append, remove} = useFieldArray({
    control: form.control,
    name: "prj_targets",
  })
  useEffect(() => {
    const lastestData = loadSavedData()
    form.reset({
      prj_targets: lastestData
    })
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[])

  // watch form values and auto-save to localStorage (debounced)
  const watchedValues = useWatch({ control: form.control, name: "prj_targets" })

  useEffect(() => {
    const timer = setTimeout(() => {
      if (watchedValues && Array.isArray(watchedValues)) {
        const currentStorage = JSON.parse(localStorage.getItem("projectFormData") || "{}")
        const updatedData = {
          ...currentStorage,
          prj_targets: watchedValues
        }
        localStorage.setItem("projectFormData", JSON.stringify(updatedData))
      }
    }, 700)

    return () => clearTimeout(timer)
  }, [watchedValues])
  const onSubmit = (data: FormValues) => {
    console.log("Dữ liệu gửi đi:", JSON.stringify(data, null, 2))
    
    try {
      const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}")
      
      // ✅ Lưu data với đầy đủ thông tin
      const updatedData = {
        ...savedData,
        prj_targets: data.prj_targets.map(target => ({
          id: target.id, // ✅ Giữ lại ID
          name: target.name,
          risks: target.risks.map(risk => ({
            id: risk.id, // ✅ Giữ lại ID của risk
            name: risk.name,
            probability_level: risk.probability_level ?? 0,
            impact_level: risk.impact_level ?? 0,
            risk_level: risk.risk_level ?? 0,
            strategy: risk.strategy ?? "",
            response_plans: risk.response_plans ?? []
          }))
        }))
      }
      
      localStorage.setItem("projectFormData", JSON.stringify(updatedData))
      console.log("✅ Saved to localStorage")

      // Ensure form state matches saved data, then navigate
      try {
        form.reset({ prj_targets: updatedData.prj_targets })
      } catch (e) {
        console.warn('reset form failed', e)
      }
      navigate('/projects/evaluation')
      
    } catch (error) {
      console.error("❌ Error saving data:", error)
    }
  }
  return (
    <div className="mx-auto">
      {/* Headers */}
      <Card className="bg-(--white) shadow-sm border-none">
        <CardContent className="flex flex-col items-center p-8 space-y-4">
          <Title variant="navy" size="large">
            Quản lý mục tiêu và rủi ro dự án
            <Description className="">
              Sử dụng công cụ này để xác định và phân loại các rủi ro tiềm ẩn cho dự án của bạn
            </Description>
          </Title>
          <p className="text-[20px] px-24 hidden md:block"
            >Phân tích và theo dõi các rủi ro trong dự án của bạn một cách hiệu quả. Bấm vào nút bên dưới để mở tệp tham khảo chứa danh sách các loại rủi ro thường gặp, giúp bạn trong quá trình xác định
          </p>
          <Button variant="primary" size="large">
            <div className="flex items-center">
              <FileIcon className="mr-2"/>
              Tệp tham khảo
            </div>
          </Button>
        </CardContent>
      </Card>
      {/* Target List */}
      <Card className="shadow-sm border-none bg-(--white) mt-4">
        <CardContent className="p-8">
          <Title variant="navy" size="medium" className="text-start">
            Danh sách mục tiêu và rủi ro liên quan tới mục tiêu
          </Title>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <Accordion type="single" collapsible className="w-full space-y-4 my-4">
                {fields.map((field,index) => (
                  <AccordionItem
                    key={field.id}
                    value={field.id}
                    className="border-2 border-(--blue-border) text-start bg-(--white) rounded-lg px-4 my-4 data-[state=open]:border-b data-[state=open]:mb-4"
                  >
                    <AccordionTrigger className="hover:no-underline py-4">
                      <div className="flex items-center justify-between w-full pr-4">
                        <div 
                          className="flex-1 mr-4"
                          onClick={(e) => e.stopPropagation()} //stop click
                        >
                          <FormField
                            control={form.control}
                            name={`prj_targets.${index}.name`}
                            render={({field}) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    {...field}
                                    className="border-none shadow-none bg-transparent font-medium text-(--black) h-auto p-0 focus-visible:ring-0 placeholder:text-gray-400"
                                    placeholder="Nhập tên mục tiêu..."
                                  />
                                </FormControl>
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent>
                      <RiskList control={form.control} nestIndex={index}/>
                      <Button
                        variant="none"
                        size="none"
                        onClick={() => remove(index)}
                        className="mt-2"
                      >
                        <p className="text-(--error) hover:text-red-400 flex items-center space-x-1">
                          <Trash2 className="w-4 h-4"/>
                          <span>
                            Xoá mục tiêu
                          </span>
                        </p>
                      </Button>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button
                variant="outline"
                size="medium"
                className="flex w-full"
                onClick={() => append({ id: nanoid(), name: "", risks: [] })}
              >
                <Plus/>
                Thêm mục tiêu
              </Button>
              <div className="py-4 flex gap-2 justify-end sticky bottom-0  backdrop-blur p-4 border-t mt-4">
                <Button
                    type="button"
                    variant="outline"
                    onClick={() => navigate('/projects/pestel')}
                >
                  Quay lại
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  size='medium'
                  onClick={() => navigate('/projects/evaluation')}
                >
                  Tiếp theo
                </Button>
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>

    </div>
  )
}
