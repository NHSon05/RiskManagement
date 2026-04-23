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
import { PageTransition } from "@/components/animated";
import { useCreateProject, useUpdateProject } from "@/hooks/useProject";
import { useAuth } from "@/hooks/useAuth";
import { infoSchema } from "@/projectSchema/projectSchema";

export default function Info() {
  const navigate = useNavigate();
  const savedData = JSON.parse(localStorage.getItem("projectFormData") || "{}");

  // hook api
  const { mutate: createProject, isPending: isCreating } = useCreateProject();
  const { isPending: isUpdating } = useUpdateProject();
  const isPending = isCreating || isUpdating;

  // global auth
  const { profile } = useAuth();

  const form = useForm<z.infer<typeof infoSchema>>({
    resolver: zodResolver(infoSchema),
    defaultValues: {
      name: savedData.name || "",
      prjLevel: savedData.prjLevel || "",
      location: savedData.location || "",
      capital: savedData.capital || "",
      role: savedData.role || "",
    },
  });
  function onSubmit(values: z.infer<typeof infoSchema>) {
    // get user object from global profile state instead of unverified localStorage
    const userId = profile.data?.data?.id;

    if (!userId) {
      alert("Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại");
      return;
    }

    // Push API to backend
    createProject(
      {userId, body: values},
      {
        onSuccess: (res) => {
          localStorage.setItem("currentProjectId", res.data.id.toString());
          localStorage.setItem("projectFormData", JSON.stringify({ ...savedData, ...values }));
          navigate("/projects/pestel");
        }
      }
    )
  }
  const handleCancel = () => {
    form.reset();
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
                <FormField control={form.control} name="name" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tên dự án</FormLabel>
                    <FormControl><Input placeholder="Hệ thống quản lý kho ERP" {...field} /></FormControl>
                    <FormMessage className="text-start"/>
                  </FormItem>
                )} />
                {/* Cấp công trình */}
                <FormField control={form.control} name="prjLevel" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Cấp công trình</FormLabel>
                    <FormControl><Input placeholder="Nhập cấp công trình" {...field} /></FormControl>
                    <FormMessage className="text-start" />
                  </FormItem>
                )} />
                {/* Địa điểm */}
                <FormField control={form.control} name="location" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Địa điểm</FormLabel>
                    <FormControl><Input placeholder="Ví dụ: TP. Đà Nẵng" {...field} /></FormControl>
                    <FormMessage className="text-start" />
                  </FormItem>
                )} />
                {/* Nguồn vốn */}
                <FormField control={form.control} name="capital" render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nguồn vốn</FormLabel>
                    <FormControl>
                      <Input placeholder="Nhập nguồn vốn của bạn" {...field} />
                    </FormControl>
                    <FormMessage className="text-start"/>
                  </FormItem>
                )} />
                {/* Vai trò (Select) */}
                <FormField control={form.control} name="role" render={({ field }) => (
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
                    <FormMessage className="text-start"/>
                  </FormItem>
                )} />
                {/* Button */}
                <div className="flex justify-between pt-4">
                  <Button type="button" variant="outline" onClick={handleCancel}>
                    Quay lại
                  </Button>
                  <Button type="submit" variant="primary" disabled={isPending}>
                    {isPending? "Đang tạo" : "Tiếp theo"}
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