package net.javaguides.risk_management_web.repository;

import net.javaguides.risk_management_web.entity.Objective;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ObjectiveRepository extends JpaRepository<Objective, Long> {

    List<Objective> findByProjectId(Long projectId);
}
