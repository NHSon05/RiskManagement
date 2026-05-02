package net.javaguides.risk_management_web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import java.util.List;

@Entity
public class Risk {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String strategy;
    // Đã xóa category và personInCharge theo yêu cầu

    @ManyToOne
    @JsonIgnoreProperties({ "project", "risks" })
    private Objective objective;

    @ManyToOne
    @JsonIgnore
    private Project project;

    @OneToOne(mappedBy = "risk", cascade = CascadeType.ALL)
    private RiskAssessment assessment;

    // Mối quan hệ 1 Rủi ro - Nhiều Giải pháp
    @OneToMany(mappedBy = "risk", cascade = CascadeType.ALL)
    private List<RiskSolution> solutions;

    // Getters & Setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getStrategy() {
        return strategy;
    }

    public void setStrategy(String strategy) {
        this.strategy = strategy;
    }

    public Objective getObjective() {
        return objective;
    }

    public void setObjective(Objective objective) {
        this.objective = objective;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }

    public RiskAssessment getAssessment() {
        return assessment;
    }

    public void setAssessment(RiskAssessment assessment) {
        this.assessment = assessment;
    }

    public List<RiskSolution> getSolutions() {
        return solutions;
    }

    public void setSolutions(List<RiskSolution> solutions) {
        this.solutions = solutions;
    }
}