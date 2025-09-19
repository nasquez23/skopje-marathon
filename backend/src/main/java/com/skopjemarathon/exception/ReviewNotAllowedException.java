package com.skopjemarathon.exception;

public class ReviewNotAllowedException extends RuntimeException {
    public ReviewNotAllowedException(String message) {
        super(message);
    }
    
    public ReviewNotAllowedException(String message, Throwable cause) {
        super(message, cause);
    }
}
