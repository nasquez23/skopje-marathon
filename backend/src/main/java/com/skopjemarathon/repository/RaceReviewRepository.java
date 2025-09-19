package com.skopjemarathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skopjemarathon.model.RaceReview;
import java.util.UUID;

public interface RaceReviewRepository extends JpaRepository<RaceReview, UUID> {
    boolean existsByRaceIdAndUserId(UUID raceId, UUID userId);
}
