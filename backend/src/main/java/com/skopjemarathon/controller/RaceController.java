package com.skopjemarathon.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skopjemarathon.dto.race.AddReviewRequest;
import com.skopjemarathon.dto.race.CreateRaceRequest;
import com.skopjemarathon.dto.race.RaceResponse;
import com.skopjemarathon.dto.race.RaceReviewResponse;
import com.skopjemarathon.model.User;
import com.skopjemarathon.service.RaceService;

@RestController
@RequestMapping("/api/races")
public class RaceController {

    private final RaceService raceService;

    public RaceController(RaceService raceService) {
        this.raceService = raceService;
    }

    @GetMapping
    public ResponseEntity<Iterable<RaceResponse>> list() {
        return ResponseEntity.ok(raceService.listRaces());
    }

    @GetMapping("/{id}")
    public ResponseEntity<RaceResponse> get(@PathVariable UUID id) {
        return ResponseEntity.ok(raceService.getRace(id));
    }

    @PostMapping
    public ResponseEntity<RaceResponse> create(@RequestBody CreateRaceRequest req) {
        return ResponseEntity.ok(raceService.createRace(req));
    }

    @PutMapping("/{id}")
    public ResponseEntity<RaceResponse> update(@PathVariable UUID id, @RequestBody CreateRaceRequest req) {
        return ResponseEntity.ok(raceService.updateRace(id, req));
    }

    @PostMapping("/{id}/reviews")
    public ResponseEntity<Void> addReview(@PathVariable UUID id, @RequestBody AddReviewRequest req,
            @AuthenticationPrincipal User user) {
        try {
            raceService.addReview(id, req, user);
            return ResponseEntity.ok().build();
        } catch (RuntimeException e) {
            if (e.getMessage().contains("already reviewed")) {
                return ResponseEntity.status(409).build();
            }
            return ResponseEntity.status(500).build();
        }
    }

    @GetMapping("/{id}/reviews")
    public ResponseEntity<Page<RaceReviewResponse>> listReviews(
            @PathVariable UUID id,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        return ResponseEntity.ok(raceService.listReviews(id, page, size));
    }

}
