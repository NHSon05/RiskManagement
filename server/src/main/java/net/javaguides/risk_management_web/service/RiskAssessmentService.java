package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.entity.Risk;
import net.javaguides.risk_management_web.entity.RiskAssessment;
import net.javaguides.risk_management_web.repository.RiskAssessmentRepository;
import net.javaguides.risk_management_web.repository.RiskRepository;
import org.springframework.stereotype.Service;

@Service
public class RiskAssessmentService {

    private final RiskRepository riskRepo;
    private final RiskAssessmentRepository assessmentRepo;

    public RiskAssessmentService(RiskRepository riskRepo,
                                 RiskAssessmentRepository assessmentRepo) {
        this.riskRepo = riskRepo;
        this.assessmentRepo = assessmentRepo;
    }

    public RiskAssessment assess(Long riskId, int probability, int impact) {
        // 1. Validate điểm số
        if (probability < 1 || probability > 5 || impact < 1 || impact > 5) {
            throw new IllegalArgumentException("Điểm xác suất và tác động phải từ 1 đến 5");
        }

        Risk risk = riskRepo.findById(riskId)
                .orElseThrow(() -> new RuntimeException("Risk not found"));

        RiskAssessment ra = assessmentRepo.findByRiskId(riskId)
                .orElse(new RiskAssessment());

        ra.setProbability(probability);
        ra.setImpact(impact);
        ra.setRiskLevel(calculateRiskLevel(probability, impact));
        ra.setRisk(risk);

        return assessmentRepo.save(ra);
    }

    private int calculateRiskLevel(int p, int i) {
        return p * i;
    }
}