package net.javaguides.risk_management_web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class RiskSolution {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(columnDefinition = "TEXT")
    private String content; // Nội dung giải pháp

    private String personInCharge; // Người chịu trách nhiệm cho giải pháp này

    @ManyToOne
    @JoinColumn(name = "risk_id")
    @JsonIgnore
    private Risk risk;

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }
    public String getPersonInCharge() { return personInCharge; }
    public void setPersonInCharge(String personInCharge) { this.personInCharge = personInCharge; }
    public Risk getRisk() { return risk; }
    public void setRisk(Risk risk) { this.risk = risk; }
}