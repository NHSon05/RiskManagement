import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

import { Button, Input, Title } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Card,
  CardContent,
  CardHeader
} from "@/components/ui";
import { nanoid } from "nanoid";
import { PageTransition } from "@/components/animated";

const infoSchema = z.object({
  prj_id: z.string(),
  prj_name: z.string().min(1, "Vui lòng nhập tên dự án"),
  prj_level: z.string().min(1, "Vui lòng nhập cấp công trình"),
  prj_location: z.string().min(1, "Vui lòng nhập địa điểm"),
  prj_fund: z.string().min(1, "Vui lòng nhập nguồn vốn"),
  prj_role: z.string().min(1, "Vui lòng chọn vai trò"),
});

export default function Info() {
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}");

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      prj_id: nanoid(),
      prj_name: savedData.prj_name || "",
      prj_level: savedData.prj_level || "",
      prj_location: savedData.prj_location || "",
      prj_fund: savedData.prj_fund || "",
      prj_role: savedData.prj_role || "",
    },
  });
  function onSubmit(values: z.infer<typeof infoSchema>) {
    localStorage.setItem("projectFormData", JSON.stringify({ ...savedData, ...values }));
    navigate("/projects/pestel");
  }
  const handleCancel = () => {
    localStorage.removeItem("projectFormData");
    navigate("/home")
  }

  return (
    <PageTransition>
      <div className="flex justify-center md:p-6 bg-gray-50 min-h-[calc(100vh-100px)]">
        <Card className="w-full max-w-2xl shadow-sm h-fit bg-(--white)">
          <CardHeader>
            <Title variant="navy" size="large">Thông tin dự án</Title>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">   
                {/* Tên dự án */}
                <FormField control={form.control} name="prj_name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên dự án</FormLabel>
                    <FormControl><Input placeholder="Nhập tên dự án" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* Cấp công trình */}
                <FormField control={form.control} name="prj_level" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cấp công trình</FormLabel>
                    <FormControl><Input placeholder="Nhập cấp công trình" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* Địa điểm */}
                <FormField control={form.control} name="prj_location" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa điểm</FormLabel>
                    <FormControl><Input placeholder="Ví dụ: TP. Đà Nẵng" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* Nguồn vốn */}
                <FormField control={form.control} name="prj_fund" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nguồn vốn</FormLabel>
                    <FormControl><Input placeholder="Nhập nguồn vốn của bạn" {...field} /></FormControl>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* Vai trò (Select) */}
                <FormField control={form.control} name="prj_role" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vai trò</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Chọn vai trò của bạn" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="Nhà đầu tư" className="bg-white hover:bg-(--border)">Chủ đầu tư</SelectItem>
                        <SelectItem value="Nhà thầu" className="bg-white hover:bg-(--border)">Nhà thầu</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )} />
                {/* Button */}
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Quay lại
                  </Button>
                  <Button type="submit" variant="primary">
                    Tiếp theo
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </PageTransition>
  );
}