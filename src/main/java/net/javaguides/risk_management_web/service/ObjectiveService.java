package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.dto.ObjectiveRequest;
import net.javaguides.risk_management_web.entity.Objective;
import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.repository.ObjectiveRepository;
import net.javaguides.risk_management_web.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ObjectiveService {

    private final ObjectiveRepository objectiveRepo;
    private final ProjectRepository projectRepo;

    public ObjectiveService(ObjectiveRepository objectiveRepo,
                            ProjectRepository projectRepo) {
        this.objectiveRepo = objectiveRepo;
        this.projectRepo = projectRepo;
    }

    public Objective create(Long projectId, ObjectiveRequest req) {
        Project project = projectRepo.findById(projectId).orElseThrow();

        Objective obj = new Objective();
        obj.setName(req.name);
        obj.setProject(project);

        return objectiveRepo.save(obj);
    }

    public List<Objective> getByProject(Long projectId) {
        return objectiveRepo.findByProjectId(projectId);
    }

    public void delete(Long id) {
        objectiveRepo.deleteById(id);
    }

    public Objective update(Long id, ObjectiveRequest req) {
        Objective obj = objectiveRepo.findById(id)
                .orElseThrow(() -> new RuntimeException("Objective not found"));

        obj.setName(req.name);

        return objectiveRepo.save(obj);
    }
}
