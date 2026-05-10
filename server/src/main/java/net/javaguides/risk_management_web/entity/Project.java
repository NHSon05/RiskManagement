package net.javaguides.risk_management_web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;

//import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Entity
@Table(name = "projects")
public class Project {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String prjLevel;
    private String location;
    private String capital;

    private String role;
    private String backgroundImageUrl;

    @JsonIgnore
    private String backgroundImageId;

    @ManyToOne
    @JoinColumn(name = "user_id")
    @JsonIgnoreProperties({ "password", "phoneNumber", "company", "role", "active" })
    private User user;

    private String status;
    private LocalDateTime createdAt;
    private LocalDateTime finishAt;

    // QUAN TRỌNG: THÊM ĐOẠN NÀY VÀO ĐỂ XỬ LÝ RÀNG BUỘC KHÓA NGOẠI VÀ XÓA DÂY CHUYỀN
    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Objective> objectives;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Risk> risks;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Pestel> pestels;

    @OneToMany(mappedBy = "project", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonIgnore
    private List<Swot> swots;

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

    public String getPrjLevel() {
        return prjLevel;
    }

    public void setPrjLevel(String prjLevel) {
        this.prjLevel = prjLevel;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public String getCapital() {
        return capital;
    }

    public void setCapital(String capital) {
        this.capital = capital;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public User getUser() {
        return user;
    }

    public void setUser(User user) {
        this.user = user;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getFinishAt() {
        return finishAt;
    }

    public void setFinishAt(LocalDateTime finishAt) {
        this.finishAt = finishAt;
    }

    public String getBackgroundImageUrl() {
        return backgroundImageUrl;
    }

    public void setBackgroundImageUrl(String backgroundImageUrl) {
        this.backgroundImageUrl = backgroundImageUrl;
    }

    public String getBackgroundImageId() {
        return backgroundImageId;
    }

    public void setBackgroundImageId(String backgroundImageId) {
        this.backgroundImageId = backgroundImageId;
    }
}
