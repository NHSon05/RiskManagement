package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.dto.AssessmentRequest;
import net.javaguides.risk_management_web.entity.RiskAssessment;
import net.javaguides.risk_management_web.service.RiskAssessmentService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/risks")
@CrossOrigin
public class RiskAssessmentController {

    private final RiskAssessmentService service;

    public RiskAssessmentController(RiskAssessmentService service) {
        this.service = service;
    }

    @PostMapping("/{riskId}/assessment")
    public RiskAssessment assess(@PathVariable Long riskId,
                                 @RequestBody AssessmentRequest req) {
        return service.assess(riskId, req.probability, req.impact);
    }
}
