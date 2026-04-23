package net.javaguides.risk_management_web.dto;

public class UserResponse {
    private Long id;
    private String name;
    private String email;
    private String role;
    private String phoneNumber;
    private String company;
    private boolean active;

    public Long getId() { return id; }

    public void setId(Long id) { this.id = id; }

    public String getName() { return name; }

    public void setName(String name) { this.name = name; }

    public String getEmail() { return email; }

    public void setEmail(String email) { this.email = email; }

    public String getRole() { return role; }

    public void setRole(String role) { this.role = role; }

    public String getPhoneNumber() { return phoneNumber; }

    public void setPhoneNumber(String phoneNumber) { this.phoneNumber = phoneNumber; }

    public String getCompany() { return company; }

    public void setCompany(String company) { this.company = company; }

    public boolean isActive() { return active; }

    public void setActive(boolean active) { this.active = active; }
}
