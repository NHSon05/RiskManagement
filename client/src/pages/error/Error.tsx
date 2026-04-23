import { updatingFeature } from "@/assets/imgs";
import { PageTransition } from "@/components/animated";
import { Button, Title } from "@/components/ui";
import { Link, useNavigate } from "react-router-dom";

export default function Error() {
  const navigate = useNavigate();

  return (
    <PageTransition>
      <div className="flex flex-col items-center justify-center min-h-[calc(100vh-100px)] p-6 text-center space-y-6">
        <div className="max-w-md w-full">
          <img 
            src={updatingFeature} 
            alt="Feature Under Construction" 
            className="w-full h-auto drop-shadow-xl rounded-2xl"
          />
        </div>
        
        <div className="space-y-2">
          <Title variant="navy" size="large">
            Tính Năng Đang Cập Nhật
          </Title>
          <p className="text-(--description) text-lg max-w-lg mx-auto">
            Chúng tôi đang làm việc chăm chỉ để phát triển và hoàn thiện tính năng này. Hãy quay lại sau nhé!
          </p>
        </div>

        <div className="pt-4 space-x-4 flex items-center justify-center">
          <Button 
            variant="outline" 
            size="medium"
            onClick={() => navigate(-1)}
          >
            Quay lại
          </Button>
          <Link to="/home">
            <Button variant="primary" size="medium">
              Về trang chủ
            </Button>
          </Link>
        </div>
      </div>
    </PageTransition>
  );
}
