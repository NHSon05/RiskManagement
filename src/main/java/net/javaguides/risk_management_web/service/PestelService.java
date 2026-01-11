package net.javaguides.risk_management_web.service;

import net.javaguides.risk_management_web.entity.Pestel;
import net.javaguides.risk_management_web.entity.Project;
import net.javaguides.risk_management_web.repository.PestelRepository;
import net.javaguides.risk_management_web.repository.ProjectRepository;
import org.springframework.stereotype.Service;

@Service
public class PestelService {

    private final PestelRepository pestelRepo;
    private final ProjectRepository projectRepo;

    public PestelService(PestelRepository pestelRepo,
                         ProjectRepository projectRepo) {
        this.pestelRepo = pestelRepo;
        this.projectRepo = projectRepo;
    }

    public Pestel save(Long projectId, Pestel pestel) {
        Project project = projectRepo.findById(projectId).orElseThrow();
        pestel.setProject(project);
        return pestelRepo.save(pestel);
    }

    public Pestel getByProject(Long projectId) {
        return pestelRepo.findByProjectId(projectId).orElse(null);
    }
}
