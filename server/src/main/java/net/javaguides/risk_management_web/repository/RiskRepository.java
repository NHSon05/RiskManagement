package net.javaguides.risk_management_web.repository;

import net.javaguides.risk_management_web.entity.Risk;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface RiskRepository extends JpaRepository<Risk, Long> {

    List<Risk> findByObjectiveId(Long objectiveId);

    List<Risk> findByProjectIdOrderByAssessment_RiskLevelDesc(Long projectId);
}
