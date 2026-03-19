import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate, Link } from "react-router-dom";

// --- SHADCN IMPORTS ---
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
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { toast } from 'react-toastify';
import { Description } from "@/components/ui/title";
import { PageTransition } from "@/components/animated";
import { useAuth } from "@/hooks/useAuth";


// --- 1. ĐỊNH NGHĨA SCHEMA (VALIDATION) ---
const formSchema = z.object({
  email: z.email({
    message: "Email không hợp lệ.",
  }),
  password: z.string().min(6, {
    message: "Mật khẩu phải có ít nhất 6 ký tự.",
  }),
});
export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useAuth()
  const { isPending } = login;

  // --- 2. SETUP FORM ---
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // --- 3. XỬ LÝ SUBMIT ---
  function onSubmit(values: z.infer<typeof formSchema>) {
    login.mutate(values, {
      onSuccess: () => {
        toast.success("Đăng nhập thành công!");
        navigate("/home");
      },
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      onError: (error: any) => {
        console.error(error);
        const message =
          error?.response?.data?.message ||
          "Sai tài khoản hoặc mật khẩu";
        toast.error(message);
      },
    });
  }

  return (
    <PageTransition>
      <div className="flex items-center justify-center min-h-screen p-4 relative">
        {/* Container Card */}
        <Card className="w-full max-w-md shadow-lg bg-(--white)">
          <CardHeader>
            <Title size="medium" variant="navy" className="text-center">Chào mừng trở lại</Title>
            <Description className="text-center">Hệ thống quản lý rủi ro dự án</Description>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                {/*Email */}
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl> 
                        <Input placeholder="admin@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                {/* Password */}
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mật khẩu</FormLabel>
                      <FormControl>
                        <Input type="password" placeholder="••••••" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit */}
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? "Đang đăng nhập..." : "Đăng nhập"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="flex justify-center">
            <p className="text-sm text-gray-500">
              Chưa có tài khoản?{" "}
              <Link to="/register" className="text-(--main-color) hover:underline font-semibold">
                Đăng ký ngay
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </PageTransition>
  );
}