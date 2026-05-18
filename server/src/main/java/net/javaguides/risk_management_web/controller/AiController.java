package net.javaguides.risk_management_web.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import net.javaguides.risk_management_web.service.GeminiAiService;

import java.util.Map;

@RestController
@RequestMapping("/ai")

public class AiController {

    private final GeminiAiService geminiAiService;

    public AiController(GeminiAiService geminiAiService) {
        this.geminiAiService = geminiAiService;
    }

    // 1. API cho trang Mục Tiêu
    @PostMapping("/objectives")
    public ResponseEntity<?> generateObjectives(@RequestBody Map<String, String> request) {
        String result = geminiAiService.generateObjectivesRisk(
                request.get("prjName"), request.get("prjLevel"),
                request.get("location"), request.get("capital"),
                request.get("pestelData"), request.get("swotData"));
        return ResponseEntity.ok(result); // result đã là chuỗi JSON chuẩn
    }

    // 2. API cho trang Đánh Giá
    @PostMapping("/assessments")
    public ResponseEntity<?> generateAssessments(@RequestBody Map<String, String> request) {
        String result = geminiAiService.generateRiskAssessment(request.get("objectiveName"));
        return ResponseEntity.ok(result);
    }

    // 3. API cho trang Giải Quyết
    @PostMapping("/solutions")
    public ResponseEntity<?> generateSolutions(@RequestBody Map<String, String> request) {
        String result = geminiAiService.generateRiskSolutions(request.get("objectiveName"));
        return ResponseEntity.ok(result);
    }

}
