package com.skopjemarathon.service.impl;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skopjemarathon.dto.race.AddReviewRequest;
import com.skopjemarathon.dto.race.CreateRaceRequest;
import com.skopjemarathon.dto.race.RaceResponse;
import com.skopjemarathon.dto.race.RaceReviewResponse;
import com.skopjemarathon.model.Race;
import com.skopjemarathon.model.RaceReview;
import com.skopjemarathon.model.User;
import com.skopjemarathon.repository.RaceRepository;
import com.skopjemarathon.repository.RaceReviewRepository;
import com.skopjemarathon.service.RaceService;
import com.skopjemarathon.exception.RaceNotFoundException;
import com.skopjemarathon.exception.ReviewNotAllowedException;
import com.skopjemarathon.exception.DuplicateReviewException;

@Service
@Transactional
public class RaceServiceImpl implements RaceService {

    private final RaceRepository raceRepository;
    private final RaceReviewRepository reviewRepository;

    public RaceServiceImpl(RaceRepository raceRepository, RaceReviewRepository reviewRepository) {
        this.raceRepository = raceRepository;
        this.reviewRepository = reviewRepository;
    }

    @Override
    @Transactional(readOnly = true)
    public List<RaceResponse> listRaces() {
        return raceRepository.findAllByOrderByRaceDateDesc().stream()
                .map(this::mapToResponse)
                .toList();
    }

    @Override
    @Transactional(readOnly = true)
    public RaceResponse getRace(UUID id) {
        Race race = raceRepository.findById(id)
                .orElseThrow(() -> new RaceNotFoundException("Race not found with id: " + id));
        return mapToResponse(race);
    }

    @Override
    public RaceResponse createRace(CreateRaceRequest request) {
        Race race = new Race();
        race.setName(request.name());
        race.setEdition(request.edition());
        race.setDescription(request.description());
        race.setLocation(request.location());
        race.setRaceDate(request.raceDate());
        race.setStatus(request.status());

        race = raceRepository.save(race);
        return mapToResponse(race);
    }

    @Override
    public RaceResponse updateRace(UUID id, CreateRaceRequest request) {
        Race race = raceRepository.findById(id)
                .orElseThrow(() -> new RaceNotFoundException("Race not found with id: " + id));

        race.setName(request.name());
        race.setEdition(request.edition());
        race.setDescription(request.description());
        race.setLocation(request.location());
        race.setRaceDate(request.raceDate());
        race.setStatus(request.status());

        race = raceRepository.save(race);
        return mapToResponse(race);
    }

    @Override
    public void addReview(UUID raceId, AddReviewRequest request, User user) {
        Race race = raceRepository.findById(raceId)
                .orElseThrow(() -> new RaceNotFoundException("Race not found with id: " + raceId));

        if (race.getStatus().name().equals("UPCOMING")) {
            throw new ReviewNotAllowedException(
                    "Cannot review upcoming races. Reviews are only allowed for finished races.");
        }

        if (reviewRepository.existsByRaceIdAndUserId(race.getId(), user.getId())) {
            throw new DuplicateReviewException("You have already reviewed this race");
        }

        RaceReview review = new RaceReview();
        review.setRace(race);
        review.setRating(request.rating());
        review.setComment(request.comment());
        review.setUser(user);

        reviewRepository.save(review);
    }

    @Override
    @Transactional(readOnly = true)
    public Page<RaceReviewResponse> listReviews(UUID raceId, int page, int size) {
        Race race = raceRepository.findById(raceId)
                .orElseThrow(() -> new RaceNotFoundException("Race not found with id: " + raceId));

        List<RaceReview> reviews = race.getReviews();
        int from = Math.max(0, Math.min(page * size, reviews.size()));
        int to = Math.max(from, Math.min(from + size, reviews.size()));

        List<RaceReviewResponse> slice = reviews.subList(from, to).stream()
                .map(rr -> new RaceReviewResponse(
                        rr.getId().toString(),
                        rr.getRating(),
                        rr.getComment(),
                        rr.getCreatedAt(),
                        rr.getUser() != null ? rr.getUser().getFirstName() : "Anonymous",
                        rr.getUser() != null ? rr.getUser().getLastName() : ""))
                .toList();

        return new PageImpl<>(slice, PageRequest.of(page, size), reviews.size());
    }

    @Override
    @Transactional(readOnly = true)
    public boolean hasUserReviewedRace(UUID raceId, UUID userId) {
        return reviewRepository.existsByRaceIdAndUserId(raceId, userId);
    }

    private RaceResponse mapToResponse(Race race) {
        List<RaceReview> reviews = race.getReviews();
        long count = reviews == null ? 0 : reviews.size();
        double avg = 0.0;
        if (count > 0 && reviews != null) {
            avg = reviews.stream().mapToInt(RaceReview::getRating).average().orElse(0.0);
        }

        return new RaceResponse(
                race.getId().toString(),
                race.getName(),
                race.getEdition(),
                race.getDescription(),
                race.getLocation(),
                race.getRaceDate(),
                race.getStatus(),
                avg,
                count);
    }
}
