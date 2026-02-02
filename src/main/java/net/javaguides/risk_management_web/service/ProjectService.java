package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.ProjectRequest;
import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.entity.User;
import net.javaguides.risk_management_web.repository.ProjectRepository;
import net.javaguides.risk_management_web.repository.UserRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

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

    @Transactional
    public Project createProject(Long userId, ProjectRequest req) {
        // 1. Kiểm tra User tồn tại
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("User not found"));

        // 2. Map dữ liệu từ Request sang Entity
        Project p = new Project();
        p.setName(req.getName());
        p.setPrjLevel(req.getPrjLevel()); // Cấp công trình
        p.setLocation(req.getLocation()); // Địa điểm
        p.setCapital(req.getCapital());   // Nguồn vốn
        p.setRole(req.getRole());         // Vai trò

        // 3. Thiết lập các thông tin mặc định
        p.setUser(user);
        p.setStatus("ACTIVE");
        p.setCreatedAt(LocalDateTime.now());

        // 4. Lưu vào Database
        return projectRepository.save(p);
    }

    public List<Project> getByUser(Long userId) {
        return projectRepository.findByUserId(userId);
    }

    public Project getById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Project not found with id: " + id));
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
            throw new RuntimeException("Project not found with id: " + id);
        }
        projectRepository.deleteById(id);
    }
}