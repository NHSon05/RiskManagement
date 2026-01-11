package net.javaguides.risk_management_web.repository;

import net.javaguides.risk_management_web.entity.Pestel;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PestelRepository extends JpaRepository<Pestel, Long> {

    Optional<Pestel> findByProjectId(Long projectId);
}