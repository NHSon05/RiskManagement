import { 
  BarChart3, 
  CheckCircle2, 
  AlertCircle, 
  Plus, 
  Clock 
} from "lucide-react"; // Bộ icon chuẩn của Shadcn

import { Button } from "@/components/ui";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui";

// --- DỮ LIỆU GIẢ LẬP (MOCK DATA) ---
// Sau này bạn sẽ thay bằng dữ liệu lấy từ API React Query

const statsData = [
  {
    title: "Tổng số dự án",
    value: "12",
    description: "Số lượng dự án bạn đăng ký",
    icon: <BarChart3 className="h-6 w-6 text-green-500" />,
    borderColor: "border-green-500", // Để trang trí nếu cần
  },
  {
    title: "Dự án đang hoạt động",
    value: "7",
    description: "Số dự án hiện đang được tiến hành",
    icon: <CheckCircle2 className="h-6 w-6 text-blue-500" />,
    borderColor: "border-blue-500",
  },
  {
    title: "Dự án rủi ro cao",
    value: "3",
    description: "Dự án cần sự chú ý khẩn cấp",
    icon: <AlertCircle className="h-6 w-6 text-orange-500" />,
    borderColor: "border-orange-500",
  },
];

const recentProjects = [
  {
    id: 1,
    name: "Xây dựng Cầu Tứ Liên Giai đoạn 1",
    status: "Đang tiến hành",
    time: "Cập nhật 2 ngày trước",
    variant: "default", // Xanh dương
  },
  {
    id: 2,
    name: "Đánh giá rủi ro Tuyến Metro X",
    status: "Hoàn thành",
    time: "Cập nhật 5 ngày trước",
    variant: "success", // Xanh lá
  },
  {
    id: 3,
    name: "Dự án phát triển siêu thị Mega",
    status: "Đang tiến hành",
    time: "Cập nhật 1 tuần trước",
    variant: "default",
  },
  {
    id: 4,
    name: "Nghiên cứu mở rộng nhà máy công nghiệp",
    status: "Đang tiến hành",
    time: "Cập nhật 2 ngày trước",
    variant: "default",
  },
  {
    id: 5,
    name: "Dự án năng lượng tái tạo",
    status: "Hoàn thành",
    time: "Cập nhật 5 ngày trước",
    variant: "success",
  },
  {
    id: 6,
    name: "Thiết kế hạ tầng thành phố thông minh",
    status: "Tạm dừng",
    time: "Cập nhật 1 tuần trước",
    variant: "destructive", // Màu cam/đỏ
  },
];

// Hàm helper để chọn màu Badge
const getBadgeColor = (status: string) => {
  switch (status) {
    case "Hoàn thành": return "bg-green-500 hover:bg-green-600";
    case "Đang tiến hành": return "bg-blue-500 hover:bg-blue-600";
    case "Tạm dừng": return "bg-orange-500 hover:bg-orange-600";
    default: return "bg-gray-500";
  }
};

export default function Homepage() {
  return (
    <div className="space-y-8 p-6 bg-gray-50 min-h-screen">
      
      {/* 1. HERO SECTION */}
      <div className="bg-blue-100 rounded-xl p-8 flex flex-col md:flex-row justify-between items-start md:items-center shadow-sm">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-slate-800">
            Xin chào, Nguyễn Văn A!
          </h1>
          <p className="text-slate-600">
            Chào mừng bạn đến với <span className="text-blue-600 font-semibold">Risk Management</span>. Bắt đầu quản lý rủi ro dự án của bạn một cách hiệu quả.
          </p>
        </div>
        <Button className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white" title="Thêm dự án">
          <Plus className="mr-2 h-4 w-4" />
        </Button>
      </div>

      {/* 2. STATS SECTION (Tổng quan) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Tổng quan dự án của tôi</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {statsData.map((stat, index) => (
            <Card key={index} className="border-none shadow-md hover:shadow-lg transition-shadow duration-200">
              <CardContent className="p-6">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-sm font-medium text-slate-600">{stat.title}</p>
                    <h3 className={`text-4xl font-bold mt-2 ${
                        index === 0 ? "text-green-600" : 
                        index === 1 ? "text-blue-600" : "text-orange-600"
                    }`}>
                      {stat.value}
                    </h3>
                  </div>
                  <div className="p-2 bg-gray-100 rounded-full">
                    {stat.icon}
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-2">{stat.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* 3. RECENT PROJECTS SECTION (Dự án gần đây) */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-slate-800">Dự án gần đây</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recentProjects.map((project) => (
            <Card key={project.id} className="border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer">
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <CardTitle className="text-base font-bold text-slate-800 line-clamp-2 leading-tight h-10">
                  {project.name}
                </CardTitle>
                <Badge className={`${getBadgeColor(project.status)} text-white border-none whitespace-nowrap`}>
                  {project.status}
                </Badge>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-gray-400 text-xs mt-4">
                  <Clock className="mr-1 h-3 w-3" />
                  {project.time}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
    </div>
  );
}