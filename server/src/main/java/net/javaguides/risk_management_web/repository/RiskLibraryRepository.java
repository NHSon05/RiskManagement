package net.javaguides.risk_management_web.repository;

import net.javaguides.risk_management_web.entity.RiskLibrary;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RiskLibraryRepository extends JpaRepository<RiskLibrary, Long> {
}