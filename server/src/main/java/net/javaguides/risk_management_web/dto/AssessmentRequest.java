package net.javaguides.risk_management_web.dto;

public class AssessmentRequest {
    public int probability;
    public int impact;

    public int getProbability() {
        return probability;
    }

    public void setProbability(int probability) {
        this.probability = probability;
    }

    public int getImpact() {
        return impact;
    }

    public void setImpact(int impact) {
        this.impact = impact;
    }
}
