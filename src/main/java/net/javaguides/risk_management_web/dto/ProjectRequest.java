package net.javaguides.risk_management_web.dto;

import java.math.BigDecimal;

public class ProjectRequest {

    private String name;
    private String prjLevel;   // Cấp công trình
    private String location;   // Địa điểm
    private BigDecimal capital; // Nguồn vốn
    private String role;       // Vai trò

    // Getters và Setters
    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPrjLevel() { return prjLevel; }
    public void setPrjLevel(String prjLevel) { this.prjLevel = prjLevel; }

    public String getLocation() { return location; }
    public void setLocation(String location) { this.location = location; }

    public BigDecimal getCapital() { return capital; }
    public void setCapital(BigDecimal capital) { this.capital = capital; }

    public String getRole() { return role; }
    public void setRole(String role) { this.role = role; }
}