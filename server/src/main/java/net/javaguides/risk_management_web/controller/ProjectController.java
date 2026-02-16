package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.dto.ProjectRequest;
import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/projects")
@CrossOrigin
public class ProjectController {

    private final ProjectService service;

    public ProjectController(ProjectService service) {
        this.service = service;
    }

    @PostMapping
    public Project create(@RequestParam Long userId,
                          @RequestBody ProjectRequest req) {
        return service.createProject(userId, req);
    }

    @GetMapping
    public List<Project> getByUser(@RequestParam Long userId) {
        return service.getByUser(userId);
    }

    @GetMapping("/{id}")
    public Project getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PatchMapping("/{id}/status")
    public Project updateStatus(@PathVariable Long id,
                                @RequestParam String status) {
        return service.updateStatus(id, status);
    }
    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id) {
        service.deleteProject(id);
        return "Đã xóa dự án thành công!";
    }
}