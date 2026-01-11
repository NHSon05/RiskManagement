package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.RiskRequest;
import net.javaguides.risk_management_web.entity.Objective;
import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.entity.Risk;
import net.javaguides.risk_management_web.repository.ObjectiveRepository;
import net.javaguides.risk_management_web.repository.RiskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class RiskService {

    private final RiskRepository riskRepo;
    private final ObjectiveRepository objectiveRepo;

    public RiskService(RiskRepository riskRepo,
                       ObjectiveRepository objectiveRepo) {
        this.riskRepo = riskRepo;
        this.objectiveRepo = objectiveRepo;
    }

    public Risk create(Long objectiveId, RiskRequest req) {
        Objective obj = objectiveRepo.findById(objectiveId)
                .orElseThrow(() -> new RuntimeException("Objective not found"));
        Project project = obj.getProject();

        Risk r = new Risk();
        r.setName(req.getName());
        r.setCategory(req.getCategory());
        r.setDescription(req.getDescription()); // Lưu mô tả
        r.setObjective(obj);
        r.setProject(project);

        return riskRepo.save(r);
    }

    public Risk update(Long id, RiskRequest req) {
        Risk r = riskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk not found"));

        r.setName(req.getName());
        r.setCategory(req.getCategory());
        r.setDescription(req.getDescription()); // Cập nhật mô tả

        return riskRepo.save(r);
    }

    public void delete(Long id) {
        if (!riskRepo.existsById(id)) {
            throw new RuntimeException("Risk not found");
        }
        riskRepo.deleteById(id);
    }

    public List<Risk> getByObjective(Long objectiveId) {
        return riskRepo.findByObjectiveId(objectiveId);
    }

    public List<Risk> getByProject(Long projectId) {
        return riskRepo.findByProjectIdOrderByAssessment_RiskLevelDesc(projectId);
    }
}