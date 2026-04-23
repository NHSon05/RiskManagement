package net.javaguides.risk_management_web.dto;

public class LoginResponse {
    private String message;
    private String accessToken;
    private Long userId;

    public LoginResponse(String message, String accessToken, Long userId) {
        this.message = message;
        this.accessToken = accessToken;
        this.userId = userId;
    }

    // Getters và Setters
    public String getMessage() { return message; }
    public void setMessage(String message) { this.message = message; }
    public String getAccessToken() { return accessToken; }
    public void setAccessToken(String accessToken) { this.accessToken = accessToken; }
    public Long getUserId() { return userId; }
    public void setUserId(Long userId) { this.userId = userId; }
}