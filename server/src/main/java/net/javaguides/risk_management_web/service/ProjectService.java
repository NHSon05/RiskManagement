package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.ProjectRequest;
import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.entity.User;
import net.javaguides.risk_management_web.repository.ProjectRepository;
import net.javaguides.risk_management_web.repository.UserRepository;
import net.javaguides.risk_management_web.repository.RiskRepository;
import net.javaguides.risk_management_web.repository.ObjectiveRepository;
import net.javaguides.risk_management_web.repository.SwotRepository;
import net.javaguides.risk_management_web.repository.PestelRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.util.Map;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final UserRepository userRepository;
    private final Cloudinary cloudinary;
    private final RiskRepository riskRepository;
    private final ObjectiveRepository objectiveRepository;
    private final SwotRepository swotRepository;
    private final PestelRepository pestelRepository;

    public ProjectService(ProjectRepository projectRepository,
            UserRepository userRepository, Cloudinary cloudinary,
            RiskRepository riskRepository, ObjectiveRepository objectiveRepository,
            SwotRepository swotRepository, PestelRepository pestelRepository) {
        this.projectRepository = projectRepository;
        this.userRepository = userRepository;
        this.cloudinary = cloudinary;
        this.riskRepository = riskRepository;
        this.objectiveRepository = objectiveRepository;
        this.swotRepository = swotRepository;
        this.pestelRepository = pestelRepository;
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
        p.setCapital(req.getCapital()); // Nguồn vốn
        p.setRole(req.getRole()); // Vai trò

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

    public Project updateProject(Long id, ProjectRequest req) {
        Project p = getById(id);

        // Update fields if provided
        if (req.getName() != null)
            p.setName(req.getName());
        if (req.getPrjLevel() != null)
            p.setPrjLevel(req.getPrjLevel());
        if (req.getLocation() != null)
            p.setLocation(req.getLocation());
        if (req.getCapital() != null)
            p.setCapital(req.getCapital());
        if (req.getRole() != null)
            p.setRole(req.getRole());

        return projectRepository.save(p);
    }

    @Transactional
    public void deleteProject(Long id) {
        if (!projectRepository.existsById(id)) {
            throw new RuntimeException("Project not found with id: " + id);
        }
        
        // Delete related entities first to avoid foreign key constraints
        riskRepository.deleteByProjectId(id);
        objectiveRepository.deleteByProjectId(id);
        swotRepository.deleteByProjectId(id);
        pestelRepository.deleteByProjectId(id);
        
        projectRepository.deleteById(id);
    }

    public Project updateBackgroundImage(Long projectId, MultipartFile file) throws IOException {
        Project p = getById(projectId);

        if (p.getBackgroundImageId() != null) {
            cloudinary.uploader().destroy(p.getBackgroundImageId(), ObjectUtils.emptyMap());
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());

        String newImageUrl = uploadResult.get("secure_url").toString();
        String newId = uploadResult.get("public_id").toString();

        p.setBackgroundImageUrl(newImageUrl);
        p.setBackgroundImageId(newId);

        return projectRepository.save(p);
    }

    public Project deleteBackgroundImage(Long projectId) throws IOException {
        Project p = getById(projectId);
        if (p.getBackgroundImageId() != null) {
            cloudinary.uploader().destroy(p.getBackgroundImageId(), ObjectUtils.emptyMap());
            p.setBackgroundImageUrl(null);
            p.setBackgroundImageId(null);
        }

        return projectRepository.save(p);
    }
}