package net.javaguides.risk_management_web.controller;

import net.javaguides.risk_management_web.dto.ProjectRequest;
import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.service.ProjectService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/projects")
@CrossOrigin(origins = "*", methods = { RequestMethod.GET, RequestMethod.POST, RequestMethod.PUT, RequestMethod.PATCH,
        RequestMethod.DELETE })
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

    @PatchMapping(value = "/{id}/image", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> updateImage(
            @PathVariable Long id,
            @RequestParam("file") MultipartFile file) {
        try {
            Project updatedProject = service.updateBackgroundImage(id, file);
            return ResponseEntity.ok(updatedProject);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("Lỗi khi upload ảnh: " + e.getMessage());
        }
    }

    @GetMapping
    public List<Project> getByUser(@RequestParam Long userId) {
        return service.getByUser(userId);
    }

    @GetMapping("/{id}")
    public Project getById(@PathVariable Long id) {
        return service.getById(id);
    }

    @PutMapping("/{id}")
    public Project update(@PathVariable Long id, @RequestBody ProjectRequest req) {
        return service.updateProject(id, req);
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