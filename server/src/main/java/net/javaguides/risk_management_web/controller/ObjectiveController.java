package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.dto.ObjectiveRequest;
import net.javaguides.risk_management_web.entity.Objective;
import net.javaguides.risk_management_web.service.ObjectiveService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects/{projectId}/objectives")
@CrossOrigin
public class ObjectiveController {

    private final ObjectiveService service;

    public ObjectiveController(ObjectiveService service) {
        this.service = service;
    }

    @PostMapping
    public Objective create(@PathVariable Long projectId,
                            @RequestBody ObjectiveRequest req) {
        return service.create(projectId, req);
    }

    @GetMapping
    public List<Objective> getAll(@PathVariable Long projectId) {
        return service.getByProject(projectId);
    }
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long projectId, @PathVariable Long id) {
        service.delete(id);
        return "Đã xóa mục tiêu!";
    }

    @PutMapping("/{id}")
    public Objective update(@PathVariable Long projectId,
                            @PathVariable Long id,
                            @RequestBody ObjectiveRequest req) {
        return service.update(id, req);
    }
}
