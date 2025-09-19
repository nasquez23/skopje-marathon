package com.skopjemarathon.dto.race;

public record AddReviewRequest(
        int rating,
        String comment) {
}
