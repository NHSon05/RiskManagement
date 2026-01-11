package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.ProjectRequest;
import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.entity.User;
import net.javaguides.risk_management_web.repository.ProjectRepository;
import net.javaguides.risk_management_web.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;

    public ProjectService(ProjectRepository projectRepository,
                          UserRepository userRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
    }

    public Project createProject(Long userId, ProjectRequest req) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        Project p = new Project();
        p.setName(req.getName());
        p.setPrjLevel(req.getPrjLevel());
        p.setLocation(req.getLocation());
        p.setCapital(req.getCapital());
        p.setRole(req.getRole());
        p.setUser(user);
        p.setStatus("ACTIVE");
        p.setCreatedAt(LocalDateTime.now());

        return projectRepository.save(p);
    }

    public List<Project> getByUser(Long userId) {
        return projectRepository.findByUserId(userId);
    }

    public Project getById(Long id) {
        return projectRepository.findById(id).orElseThrow();
    }

    public Project updateStatus(Long id, String status) {
        Project p = getById(id);
        p.setStatus(status);

        if ("COMPLETED".equalsIgnoreCase(status)) {
            p.setFinishAt(LocalDateTime.now());
        }

        return projectRepository.save(p);
    }

    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found");
        }
        projectRepository.deleteById(id);
    }
}