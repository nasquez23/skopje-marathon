package com.skopjemarathon.service;

import java.util.UUID;

import org.springframework.data.domain.Page;

import com.skopjemarathon.dto.race.AddReviewRequest;
import com.skopjemarathon.dto.race.CreateRaceRequest;
import com.skopjemarathon.dto.race.RaceResponse;
import com.skopjemarathon.dto.race.RaceReviewResponse;
import com.skopjemarathon.model.User;

public interface RaceService {

    Iterable<RaceResponse> listRaces();

    RaceResponse getRace(UUID id);

    RaceResponse createRace(CreateRaceRequest request);

    RaceResponse updateRace(UUID id, CreateRaceRequest request);

    void addReview(UUID raceId, AddReviewRequest request, User user);

    Page<RaceReviewResponse> listReviews(UUID raceId, int page, int size);

    boolean hasUserReviewedRace(UUID raceId, UUID userId);
}
