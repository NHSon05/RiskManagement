package net.javaguides.risk_management_web.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

@Entity
public class Pestel {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String political;
    private String economic;
    private String social;
    private String technological;
    private String environmental;
    private String legal;

    @OneToOne
    @JsonIgnore
    private Project project;


    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getPolitical() {
        return political;
    }

    public void setPolitical(String political) {
        this.political = political;
    }

    public String getEconomic() {
        return economic;
    }

    public void setEconomic(String economic) {
        this.economic = economic;
    }

    public String getSocial() {
        return social;
    }

    public void setSocial(String social) {
        this.social = social;
    }

    public String getTechnological() {
        return technological;
    }

    public void setTechnological(String technological) {
        this.technological = technological;
    }

    public String getEnvironmental() {
        return environmental;
    }

    public void setEnvironmental(String environmental) {
        this.environmental = environmental;
    }

    public String getLegal() {
        return legal;
    }

    public void setLegal(String legal) {
        this.legal = legal;
    }

    public Project getProject() {
        return project;
    }

    public void setProject(Project project) {
        this.project = project;
    }
}