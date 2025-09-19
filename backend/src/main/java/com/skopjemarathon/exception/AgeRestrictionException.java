package com.skopjemarathon.exception;

public class AgeRestrictionException extends RuntimeException {
    public AgeRestrictionException(String message) {
        super(message);
    }
    
    public AgeRestrictionException(String message, Throwable cause) {
        super(message, cause);
    }
}
