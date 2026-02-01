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
import { FileIcon, Plus } from "lucide-react"
import { useFieldArray, useForm } from "react-hook-form"
import RiskList from "@/components/ui/molecules/riskList"

export default function Target() {
  const navigate = useNavigate()
  // const mockTarget = [1,2,3]
  const form = useForm({
    defaultValues: {
      targets: [
        {
          name: 'Mục tiêu 1',
          risks: [
            {name: 'Nhân sự nghỉ việc'}
          ]
        }
      ]
    }
  })
  // useFieldArray cấp 1: Quản lý mục tiêu
  const {fields, append} = useFieldArray({
    control: form.control,
    name: "targets",
  })
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const onSubmit = (data:any) => {
    console.log("Dữ liệu gửi đi", data);
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
                            name={`targets.${index}.name`}
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
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
              <Button
                variant="outline"
                size="medium"
                className="flex w-full"
                onClick={() => append({ name: `Mục tiêu ${fields.length + 1}`, risks: [] })}
              >
                <Plus/>
                Thêm mục tiêu
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      <div className="py-4 flex gap-2 justify-end sticky bottom-0  backdrop-blur p-4 border-t mt-4">
        <Button
            type="button"
            variant="outline"
            onClick={() => navigate('/projects/pestel')}
        >
            Quay lại
        </Button>
        <Button
            variant="primary"
            size='medium'
            onClick={() => navigate('/projects/evaluation')}
        >
            Tiếp theo
        </Button>
      </div>
    </div>
  )
}
