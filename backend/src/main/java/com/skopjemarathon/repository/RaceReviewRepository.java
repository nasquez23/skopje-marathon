package com.skopjemarathon.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.skopjemarathon.model.RaceReview;
import java.util.UUID;

public interface RaceReviewRepository extends JpaRepository<RaceReview, UUID> {
    boolean existsByRaceIdAndUserId(UUID raceId, UUID userId);

    Page<RaceReview> findByRaceId(UUID raceId, Pageable pageable);

    long countByRaceId(UUID raceId);

    @Query("select avg(r.rating) from RaceReview r where r.race.id = :raceId")
    Double averageRatingByRaceId(@Param("raceId") UUID raceId);
}
