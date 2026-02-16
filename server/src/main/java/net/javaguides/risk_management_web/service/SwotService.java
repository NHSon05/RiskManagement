package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.entity.Swot;
import net.javaguides.risk_management_web.repository.ProjectRepository;
import net.javaguides.risk_management_web.repository.SwotRepository;
import org.springframework.stereotype.Service;

@Service
public class SwotService {

    private final SwotRepository swotRepo;
    private final ProjectRepository projectRepo;

    public SwotService(SwotRepository swotRepo,
                       ProjectRepository projectRepo) {
        this.swotRepo = swotRepo;
        this.projectRepo = projectRepo;
    }

    public Swot save(Long projectId, Swot swot) {
        Project project = projectRepo.findById(projectId).orElseThrow();
        swot.setProject(project);
        return swotRepo.save(swot);
    }

    public Swot getByProject(Long projectId) {
        return swotRepo.findByProjectId(projectId).orElse(null);
    }
}
