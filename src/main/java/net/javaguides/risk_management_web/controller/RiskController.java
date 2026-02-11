package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.dto.RiskRequest;
import net.javaguides.risk_management_web.dto.SolutionRequest;
import net.javaguides.risk_management_web.entity.Risk;
import net.javaguides.risk_management_web.entity.RiskSolution;
import net.javaguides.risk_management_web.service.RiskService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class RiskController {

    private final RiskService service;

    public RiskController(RiskService service) {
        this.service = service;
    }

    // 1. Tạo Rủi ro
    @PostMapping("/objectives/{objectiveId}/risks")
    public Risk create(@PathVariable Long objectiveId,
                       @RequestBody RiskRequest req,
                       @RequestParam(defaultValue = "false") boolean addToLibrary) {
        return service.create(objectiveId, req, addToLibrary);
    }

    // 2. Thêm Giải pháp & Người phụ trách
    // URL: /risks/{riskId}/solutions?updateLibrary=true
    @PostMapping("/risks/{riskId}/solutions")
    public RiskSolution addSolution(@PathVariable Long riskId,
                                    @RequestBody SolutionRequest req,
                                    @RequestParam(defaultValue = "false") boolean updateLibrary) {
        return service.addSolution(riskId, req, updateLibrary);
    }

    @GetMapping("/objectives/{objectiveId}/risks")
    public List<Risk> getByObjective(@PathVariable Long objectiveId) {
        return service.getByObjective(objectiveId);
    }

    @GetMapping("/projects/{projectId}/risks/ranking")
    public List<Risk> getRanking(@PathVariable Long projectId) {
        return service.getByProject(projectId);
    }

    @DeleteMapping("/risks/{id}")
    public String delete(@PathVariable Long id) {
        service.delete(id);
        return "Đã xóa rủi ro thành công!";
    }

    @PutMapping("/risks/{id}")
    public Risk update(@PathVariable Long id,
                       @RequestBody RiskRequest req) {
        return service.update(id, req);
    }
}