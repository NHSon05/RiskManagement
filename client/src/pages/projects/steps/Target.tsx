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
  CardTitle,
} from "@/components/ui"
import { Plus, Trash2 } from "lucide-react"
import { useFieldArray, useForm, useWatch } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { nanoid } from 'nanoid'
import { useEffect, useState } from "react"
import { titleCase } from "@/utils"
import { PageTransition } from "@/components/animated"
import { PDFViewer,RiskList } from "@/components/ui/molecules"
import pdf from '../../../assets/pdf/RISK-CHECKLIST.pdf'
import { fishBoneChart, swotModel } from "@/assets/imgs"
import { RISK_CHECKLIST } from "@/components/constants"


const riskSchema = z.object({
  id: z.string(),
  name: z.string().min(1),
  probability_level: z.number().default(0),
  impact_level: z.number().default(0),
  risk_level: z.number().default(0),
  strategy: z.string().default(""),
  response_plans: z.array(z.object({
    id: z.string(),
    owner: z.string(),
    name: z.string()
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

  // get data from localStorage
  const [data] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem("projectFormData") || "{}")
      return saved
    } catch (error) {
      console.log("Lỗi khi lấy dữ liệu", error)
      alert("Lỗi khi lấy dữ liệu")
    }
  })
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
      const updatedData = {
        ...savedData, 
        prj_targets: data.prj_targets.map(target => ({
          id: target.id, 
          name: titleCase(target.name), 
          risks: target.risks.map(risk => ({
            id: risk.id, 
            name: titleCase(risk.name),
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
    <PageTransition>
      <div className="mx-auto md:p-2  space-y-4">
        {/* Headers */}
        <Card className="bg-(--white) shadow-sm border-none">
          <CardContent className="flex flex-col items-center p-8 space-y-4">
            <Title variant="navy" size="large">
              Quản lý mục tiêu và rủi ro dự án
              <Description className="">
                Sử dụng công cụ này để xác định và phân loại các rủi ro tiềm ẩn cho dự án của bạn
              </Description>
            </Title>
            <p className="text-[16px] px-24 hidden md:block"
              >Phân tích và theo dõi các rủi ro trong dự án của bạn một cách hiệu quả. Bấm vào nút bên dưới để mở tệp tham khảo chứa danh sách các loại rủi ro thường gặp, giúp bạn trong quá trình xác định
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
                    <span className="py-2 px-8  bg-[#002F7C] text-white text-lg rounded-full font-semibold">BIỂU ĐỒ XƯƠNG CÁ</span>
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
                    <span className="py-2 px-8  bg-[#F97316] text-white text-lg rounded-full font-semibold shadow-sm">MÔ HÌNH SWOT</span>
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
              Vai trò của đơn vị thực hiện: <span className="text-(--black)">{data.prj_role}</span>
            </p>
            {/* Target List */}
            <Card className="shadow-sm border-none bg-(--white)">
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
                    <div className="py-4 flex gap-2 justify-end sticky bottom-0  backdrop-blur border-t mt-4">
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
          <Card className="bg-(--white) border-none shadow-sm h-fit hidden md:block">
            <CardContent>
              <Accordion type="multiple" className="max-w-lg">
                {RISK_CHECKLIST.map((risk, index) => (
                  <AccordionItem value={risk.value} key={index}>
                    <AccordionTrigger className="text-md cursor-pointer">{risk.label}</AccordionTrigger>
                    <AccordionContent className="space-y-2">
                      <ul className="space-y-1 list-disc">
                        {risk.items.map((item, index) => (
                          <li key={index}
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
