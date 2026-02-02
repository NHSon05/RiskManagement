package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.RiskRequest;
import net.javaguides.risk_management_web.entity.Objective;
import net.javaguides.risk_management_web.entity.Risk;
import net.javaguides.risk_management_web.entity.RiskLibrary;
import net.javaguides.risk_management_web.repository.ObjectiveRepository;
import net.javaguides.risk_management_web.repository.RiskLibraryRepository;
import net.javaguides.risk_management_web.repository.RiskRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class RiskService {

    private final RiskRepository riskRepo;
    private final ObjectiveRepository objectiveRepo;
    private final RiskLibraryRepository libraryRepo;

    public RiskService(RiskRepository riskRepo,
                       ObjectiveRepository objectiveRepo,
                       RiskLibraryRepository libraryRepo) {
        this.riskRepo = riskRepo;
        this.objectiveRepo = objectiveRepo;
        this.libraryRepo = libraryRepo;
    }

    @Transactional
    public Risk create(Long objectiveId, RiskRequest req, boolean addToLibrary) {
        // 1. Tìm mục tiêu cha
        Objective obj = objectiveRepo.findById(objectiveId)
                .orElseThrow(() -> new RuntimeException("Objective not found with id: " + objectiveId));

        // 2. Tạo rủi ro mới và map dữ liệu
        Risk r = new Risk();
        r.setName(req.getName());
        r.setCategory(req.getCategory());
        r.setPersonInCharge(req.getPersonInCharge()); // Lưu người phụ trách

        r.setObjective(obj);
        r.setProject(obj.getProject()); // Gán vào dự án của mục tiêu đó

        // 3. Lưu rủi ro
        Risk savedRisk = riskRepo.save(r);

        // 4. Logic lưu vào thư viện mẫu (nếu được chọn)
        if (addToLibrary) {
            RiskLibrary lib = new RiskLibrary();
            lib.setName(req.getName());
            lib.setCategory(req.getCategory());
            // Lưu ý: Không lưu personInCharge vào thư viện vì mỗi dự án người phụ trách khác nhau
            libraryRepo.save(lib);
        }

        return savedRisk;
    }

    public Risk update(Long id, RiskRequest req) {
        Risk r = riskRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Risk not found with id: " + id));

        r.setName(req.getName());
        r.setCategory(req.getCategory());
        r.setPersonInCharge(req.getPersonInCharge()); // Cập nhật người phụ trách

        return riskRepo.save(r);
    }

    public void delete(Long id) {
        if (!riskRepo.existsById(id)) {
            throw new RuntimeException("Risk not found with id: " + id);
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