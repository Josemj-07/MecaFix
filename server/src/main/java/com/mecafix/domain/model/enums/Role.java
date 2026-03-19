package com.mecafix.domain.model.enums;

public enum Role {
    
    ADMINISTRATOR("Administrator"), OWNER("Owner");

    private final String displayName;

    Role(String displayName) {
        this.displayName = displayName;
    }

    public String getDisplayName() {
        return this.displayName;
    }
    public boolean isAdministrator() {
        return this == ADMINISTRATOR;
    }

}
