package com.skopjemarathon.dto.race;

import java.time.LocalDateTime;

public record RaceReviewResponse(
                String id,
                int rating,
                String comment,
                LocalDateTime createdAt) {
}
