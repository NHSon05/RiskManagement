import { useMutation } from '@tanstack/react-query';
import type { 
  GenerateAssessmentRequest, 
  GenerateObjectiveRequest, 
  GenerateSolutionRequest 
} from '@/types/ai.type';
import { aiApi } from '@/apis/ai.api';

// 1. Hook sinh Mục tiêu
export const useGenerateObjectives = () => {
  return useMutation({
    mutationFn: (body: GenerateObjectiveRequest) => aiApi.generateObjectives(body),
    onError: (error) => {
      console.error("Lỗi khi AI phân tích mục tiêu:", error);
    }
  });
};

// 2. Hook sinh Đánh giá
export const useGenerateAssessments = () => {
  return useMutation({
    mutationFn: (body: GenerateAssessmentRequest) => aiApi.generateAssessments(body),
    onError: (error) => {
      console.error("Lỗi khi AI đánh giá rủi ro:", error);
    }
  });
};

// 3. Hook sinh Giải pháp
export const useGenerateSolutions = () => {
  return useMutation({
    mutationFn: (body: GenerateSolutionRequest) => aiApi.generateSolutions(body),
    onError: (error) => {
      console.error("Lỗi khi AI đề xuất giải pháp:", error);
    }
  });
};