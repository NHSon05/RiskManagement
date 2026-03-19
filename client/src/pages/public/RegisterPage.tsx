// import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Link, useNavigate } from "react-router-dom";

<<<<<<< HEAD
import {
  Button, Title, Input,
  Form, FormControl, FormField, FormItem, FormLabel, FormMessage,
  Card,CardContent, CardDescription, CardFooter, CardHeader,
} from "@/components/ui";

import { toast } from "react-toastify";
import { PageTransition } from "@/components/animated";
import { useAuth } from "@/hooks/useAuth";
=======
import { useRegisterMutation } from "@/apis/authService";

import { Button, Title, Input } from "@/components/ui";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from "react-toastify";
import { PageTransition } from "@/components/animated";
>>>>>>> ee8c5eeda4918403019f3ed8b846c5254dec8704

// --- 1. ĐỊNH NGHĨA SCHEMA ---
const registerSchema = z
  .object({
    fullName: z.string().min(2, "Họ tên phải có ít nhất 2 ký tự"),
    email: z.email("Email không hợp lệ"),
<<<<<<< HEAD
    phoneNumber: z.string().min(10, "Số điện thoại không hợp lệ").regex(/^[0-9]+$/, "Chỉ được nhập số"),
=======
    phone: z.string().min(10, "Số điện thoại không hợp lệ").regex(/^[0-9]+$/, "Chỉ được nhập số"),
>>>>>>> ee8c5eeda4918403019f3ed8b846c5254dec8704
    organization: z.string().min(2, "Tên đơn vị quá ngắn"),
    password: z.string().min(6, "Mật khẩu phải có ít nhất 6 ký tự"),
    confirmPassword: z.string().min(6, "Vui lòng xác nhận mật khẩu"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormValues = z.infer<typeof registerSchema>;

export default function RegisterPage() {
  const navigate = useNavigate();

<<<<<<< HEAD
  const { register } = useAuth()
  const { isPending } = register
=======
  const { mutate, isPending } = useRegisterMutation();
>>>>>>> ee8c5eeda4918403019f3ed8b846c5254dec8704

  // Setup Form
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      fullName: "",
      email: "",
<<<<<<< HEAD
      password: "",
      confirmPassword: "",
      phoneNumber: "",
      organization: "",
    },
  });

 function onSubmit(values: RegisterFormValues) {
  register.mutate(
    {
      name: values.fullName,
      email: values.email,
      password: values.password,
      confirmPassword: values.confirmPassword,
      phoneNumber: values.phoneNumber,
      company: values.organization
    },
    {
      onSuccess: () => {
        toast.success("Đăng ký thành công!");
        navigate("/home");
      },

      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error(error);

        const message =
          error?.response?.data?.message ||
          "Đăng ký thất bại. Vui lòng thử lại.";

        form.setError("root", {
          type: "server",
          message
        });
      }
    }
  );
}
=======
      phone: "",
      organization: "",
      password: "",
      confirmPassword: "",
    },
  });

  function onSubmit(values: RegisterFormValues) {
    mutate(values, {
      onSuccess: () => {
        toast("Đăng ký thành công!");
        navigate("/home");
      },
      onError: () => {
        form.setError("root", { message: "Đăng ký thất bại. Vui lòng thử lại." });
      },
    });
  }

>>>>>>> ee8c5eeda4918403019f3ed8b846c5254dec8704
  return (
    <PageTransition>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
        <Card className="w-full max-w-lg shadow-lg">
          <CardHeader className="space-y-1">
            <Title className="text-2xl font-bold text-center" size="medium" variant="navy">
              Tạo tài khoản mới
            </Title>
            <CardDescription className="text-center">
              Bắt đầu quản lý rủi ro của bạn
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/* Name */}
                <FormField
                  control={form.control}
                  name="fullName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Họ và tên</FormLabel>
                      <FormControl>
                        <Input placeholder="Nguyễn Văn A" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Địa chỉ email</FormLabel>
                      <FormControl>
                        <Input placeholder="nguyenvana@gmail.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Phone */}
                <FormField
                  control={form.control}
<<<<<<< HEAD
                  name="phoneNumber"
=======
                  name="phone"
>>>>>>> ee8c5eeda4918403019f3ed8b846c5254dec8704
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Số điện thoại</FormLabel>
                      <FormControl>
                        <Input placeholder="09xx.xxx.xxx" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Đơn vị */}
                <FormField
                  control={form.control}
                  name="organization"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Đơn vị</FormLabel>
                      <FormControl>
                        <Input placeholder="Công ty ABC / Phòng IT..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Mật khẩu</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Nhập mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Xác nhận mật khẩu</FormLabel>
                        <FormControl>
                          <Input type="password" placeholder="Nhập lại mật khẩu" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/*Submit */}
                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 mt-4" 
                  disabled={isPending}
                >
<<<<<<< HEAD
                  {isPending ? "Đang đăng ký" : "Đăng ký ngay"}
=======
                  Đăng ký ngay
>>>>>>> ee8c5eeda4918403019f3ed8b846c5254dec8704
                </Button>
              </form>
            </Form>
          </CardContent>

          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Đã có tài khoản?{" "}
              <Link to="/login" className="text-(--main-color) hover:underline font-semibold">
                Đăng nhập ngay
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
}