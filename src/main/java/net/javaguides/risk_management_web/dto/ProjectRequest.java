package net.javaguides.risk_management_web.dto;

import java.math.BigDecimal;

public class ProjectRequest {

    private String name;
    private String prjLevel;
    private String location;
    private BigDecimal capital;
    private String role;

    // ===== GETTERS =====
    public String getName() {
        return name;
    }

    public String getPrjLevel() {
        return prjLevel;
    }

    public String getLocation() {
        return location;
    }

    public BigDecimal getCapital() {
        return capital;
    }

    public String getRole() {
        return role;
    }

    // ===== SETTERS =====
    public void setName(String name) {
        this.name = name;
    }

    public void setPrjLevel(String prjLevel) {
        this.prjLevel = prjLevel;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public void setCapital(BigDecimal capital) {
        this.capital = capital;
    }

    public void setRole(String role) {
        this.role = role;
    }
}
