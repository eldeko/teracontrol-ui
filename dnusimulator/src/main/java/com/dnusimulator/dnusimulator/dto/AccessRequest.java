package com.dnusimulator.dnusimulator.dto;

import java.time.LocalDateTime;

public class AccessRequest {
    private String keychainCode;
    private LocalDateTime requestDateTime = LocalDateTime.now();
    private EventType eventType;
    private String serialNumber;

    public EventType getEventType() {
        return eventType;
    }

    public void setEventType(EventType eventType) {
        this.eventType = eventType;
    }

    public String getSerialNumber() {
        return serialNumber;
    }

    public void setSerialNumber(String serialNumber) {
        this.serialNumber = serialNumber;
    }

    public AccessRequest(String keychainCode, EventType eventType, String serialNumber) {
        this.keychainCode = keychainCode;

        this.eventType = eventType;
        this.serialNumber = serialNumber;
    }
 
    public String getKeychainCode() {
        return keychainCode;
    }

    public void setKeychainCode(String keychainCode) {
        this.keychainCode = keychainCode;
    }

    public LocalDateTime getRequestDateTime() {
        return requestDateTime;
    }

    public void setRequestDateTime(LocalDateTime requestDateTime) {
        this.requestDateTime = requestDateTime;
    }
}