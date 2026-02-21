package net.javaguides.risk_management_web.entity;

import jakarta.persistence.*;

@Entity
public class RiskLibrary {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    // Đã xóa category

    @Column(columnDefinition = "TEXT")
    private String suggestedSolution; // Giải pháp gợi ý lưu trong thư viện

    // Getters & Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }
    public String getSuggestedSolution() { return suggestedSolution; }
    public void setSuggestedSolution(String suggestedSolution) { this.suggestedSolution = suggestedSolution; }
}