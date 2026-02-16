package net.javaguides.risk_management_web.repository;

import net.javaguides.risk_management_web.entity.RiskAssessment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RiskAssessmentRepository
        extends JpaRepository<RiskAssessment, Long> {

    Optional<RiskAssessment> findByRiskId(Long riskId);
}
