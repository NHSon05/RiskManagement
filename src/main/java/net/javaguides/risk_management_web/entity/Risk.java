package net.javaguides.risk_management_web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

@Entity
public class Risk {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String category;

    private String personInCharge;

    @ManyToOne
    @JsonIgnoreProperties({"project", "risks"})
    private Objective objective;

    @ManyToOne
    @JsonIgnore
    private Project project;

    @OneToOne(mappedBy = "risk", cascade = CascadeType.ALL)
    private RiskAssessment assessment;

    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getCategory() { return category; }
    public void setCategory(String category) { this.category = category; }

    public String getPersonInCharge() { return personInCharge; }
    public void setPersonInCharge(String personInCharge) { this.personInCharge = personInCharge; }

    public Objective getObjective() { return objective; }
    public void setObjective(Objective objective) { this.objective = objective; }

    public Project getProject() { return project; }
    public void setProject(Project project) { this.project = project; }

    public RiskAssessment getAssessment() { return assessment; }
    public void setAssessment(RiskAssessment assessment) { this.assessment = assessment; }
}