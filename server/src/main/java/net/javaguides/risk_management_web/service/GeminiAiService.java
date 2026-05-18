package net.javaguides.risk_management_web.service;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class GeminiAiService {

  @Value("${gemini.api.url}")
  private String apiUrl;

  @Value("${gemini.api.key}")
  private String apiKey;

  private final RestTemplate restTemplate;
  private final ObjectMapper objectMapper;

  public GeminiAiService(RestTemplate restTemplate, ObjectMapper objectMapper) {
    this.restTemplate = restTemplate;
    this.objectMapper = objectMapper;
  }

  // =========================================================================
  // GỌI GEMINI API VÀ ÉP KIỂU TRẢ VỀ JSON
  // =========================================================================
  private String callGeminiApi(String prompt) {
    try {
      String fullUrl = apiUrl + apiKey;

      // Xây dựng body theo đúng chuẩn của Gemini API
      Map<String, Object> requestBody = new HashMap<>();
      requestBody.put("contents", List.of(
          Map.of("parts", List.of(Map.of("text", prompt)))));

      // Ép Gemini trả về định dạng JSON (Rất quan trọng để tránh lỗi Parse)
      requestBody.put("generationConfig", Map.of(
          "responseMimeType", "application/json"));

      HttpHeaders headers = new HttpHeaders();
      headers.setContentType(MediaType.APPLICATION_JSON);

      HttpEntity<Map<String, Object>> entity = new HttpEntity<>(requestBody, headers);

      // Bắn request
      String response = restTemplate.postForObject(fullUrl, entity, String.class);

      // Bóc tách JSON response để lấy phần text cốt lõi
      JsonNode rootNode = objectMapper.readTree(response);
      return rootNode.path("candidates").get(0)
          .path("content")
          .path("parts").get(0)
          .path("text").asText();

    } catch (Exception e) {
      throw new RuntimeException("Lỗi khi gọi Gemini API: " + e.getMessage());
    }
  }

  // =========================================================================
  // 1. TRANG MỤC TIÊU
  // =========================================================================
  public String generateObjectivesRisk(String prjName, String prjLevel, String location,
      String capital, String pestelData, String swotData) {
    String promptTemplate = """
        Bạn là chuyên gia Quản lý Rủi Ro. Hãy phân tích rủi ro cho dự án dựa trên thông tin sau:
        - Tên dự án: %s
        - Cấp công trình: %s
        - Địa điểm: %s
        - Nguồn vốn: %s
        - Phân tích PESTEL: %s
        - Phân tích SWOT: %s

        YÊU CẦU: Hãy trả lời dưới dạng văn bản Markdown thân thiện, sử dụng in đậm,
        gạch đầu dòng rõ ràng để người dùng dễ đọc chỉ trả ra 2 phần là mục tiêu và rủi ro tương ứng. Còn lại không trả những thông tin dư thừa
        """;
    String prompt = String.format(promptTemplate, prjName, prjLevel, location, capital, pestelData, swotData);
    return callGeminiApi(prompt);
  }

  // =========================================================================
  // 2. TRANG ĐÁNH GIÁ
  // =========================================================================
  public String generateRiskAssessment(String objectiveName) {
    String promptTemplate = """
        Đánh giá mức độ rủi ro cho mục tiêu dự án sau: "%s"

        YÊU CẦU: Hãy phân tích và trả về ĐÚNG MỘT OBJECT JSON chứa xác suất (probability)
        và mức độ ảnh hưởng (impact). Thang điểm từ 1 đến 5 (1 là thấp nhất, 5 là cao nhất).
        Cấu trúc JSON:
        {
          "objectiveName": "%s",
          "probability": 4,
          "impact": 5,
          "reasoning": "Giải thích ngắn gọn lý do đánh giá"
        }
        """;
    String prompt = String.format(promptTemplate, objectiveName, objectiveName);
    return callGeminiApi(prompt);
  }

  // =========================================================================
  // 3. TRANG GIẢI QUYẾT
  // =========================================================================
  public String generateRiskSolutions(String objectiveName) {
    String promptTemplate = """
        Đề xuất các chiến lược ứng phó rủi ro cho mục tiêu sau: "%s"

        YÊU CẦU: Hãy phân tích và trả về một OBJECT JSON chứa 4 chiến lược ứng phó tiêu chuẩn:
        "Tránh rủi ro" (Avoid), "Giảm thiểu rủi ro" (Mitigate), "Chấp nhận rủi ro" (Accept), "Chuyển giao rủi ro" (Transfer).
        Cấu trúc JSON:
        {
          "objectiveName": "%s",
          "strategies": {
            "avoid": ["Giải pháp tránh 1", "Giải pháp tránh 2"],
            "mitigate": ["Giải pháp giảm thiểu"],
            "accept": ["Hành động chấp nhận"],
            "transfer": ["Hành động chuyển giao (ví dụ: mua bảo hiểm)"]
          }
        }
        """;
    String prompt = String.format(promptTemplate, objectiveName, objectiveName);
    return callGeminiApi(prompt);
  }
}