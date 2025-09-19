package com.skopjemarathon.dto.race;

import java.time.LocalDate;

import com.skopjemarathon.enums.RaceStatus;

public record RaceResponse(
        String id,
        String name,
        String edition,
        String description,
        String location,
        LocalDate raceDate,
        RaceStatus status,
        double averageRating,
        long reviewsCount) {
}
