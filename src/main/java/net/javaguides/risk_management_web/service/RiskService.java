package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.RiskRequest;
import net.javaguides.risk_management_web.dto.SolutionRequest;
import net.javaguides.risk_management_web.entity.*;
import net.javaguides.risk_management_web.repository.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RiskService {

    private final RiskRepository riskRepo;
    private final ObjectiveRepository objectiveRepo;
    private final RiskLibraryRepository libraryRepo;
    private final RiskSolutionRepository solutionRepo;

    public RiskService(RiskRepository riskRepo,
                       ObjectiveRepository objectiveRepo,
                       RiskLibraryRepository libraryRepo,
                       RiskSolutionRepository solutionRepo) {
        this.riskRepo = riskRepo;
        this.objectiveRepo = objectiveRepo;
        this.libraryRepo = libraryRepo;
        this.solutionRepo = solutionRepo;
    }

    // 1. Tạo Rủi ro (Chỉ có tên)
    @Transactional
    public Risk create(Long objectiveId, RiskRequest req, boolean addToLibrary) {
        Objective obj = objectiveRepo.findById(objectiveId)
                .orElseThrow(() -> new RuntimeException("Objective not found"));

        Risk r = new Risk();
        r.setName(req.getName());
        // Không set category/personInCharge ở đây nữa
        r.setObjective(obj);
        r.setProject(obj.getProject());
        Risk savedRisk = riskRepo.save(r);

        // Lưu tên rủi ro vào thư viện
        if (addToLibrary) {
            RiskLibrary lib = new RiskLibrary();
            lib.setName(req.getName());
            libraryRepo.save(lib);
        }
        return savedRisk;
    }

    // 2. Thêm Giải pháp cho Rủi ro (Kèm người phụ trách)
    @Transactional
    public RiskSolution addSolution(Long riskId, SolutionRequest req, boolean updateLibrary) {
        Risk risk = riskRepo.findById(riskId)
                .orElseThrow(() -> new RuntimeException("Risk not found"));

        RiskSolution sol = new RiskSolution();
        sol.setContent(req.getContent());
        sol.setPersonInCharge(req.getPersonInCharge()); // Người phụ trách gắn với giải pháp
        sol.setRisk(risk);
        RiskSolution savedSol = solutionRepo.save(sol);

        // Cập nhật giải pháp mẫu vào thư viện
        if (updateLibrary) {
            List<RiskLibrary> libs = libraryRepo.findAll();
            for (RiskLibrary lib : libs) {
                // Logic đơn giản: cập nhật cho các item cùng tên trong library
                if (lib.getName().equalsIgnoreCase(risk.getName())) {
                    lib.setSuggestedSolution(req.getContent());
                    libraryRepo.save(lib);
                }
            }
        }
        return savedSol;
    }

    // Cập nhật tên rủi ro
    public Risk update(Long id, RiskRequest req) {
        Risk r = riskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk not found"));
        r.setName(req.getName());
        return riskRepo.save(r);
    }

    public void delete(Long id) {
        if (!riskRepo.existsById(id)) throw new RuntimeException("Risk not found");
        riskRepo.deleteById(id);
    }

    public List<Risk> getByObjective(Long objectiveId) {
        return riskRepo.findByObjectiveId(objectiveId);
    }

    public List<Risk> getByProject(Long projectId) {
        return riskRepo.findByProjectIdOrderByAssessment_RiskLevelDesc(projectId);
    }
}