package net.javaguides.risk_management_web.repository;

import net.javaguides.risk_management_web.entity.Swot;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface SwotRepository extends JpaRepository<Swot, Long> {

    Optional<Swot> findByProjectId(Long projectId);
}