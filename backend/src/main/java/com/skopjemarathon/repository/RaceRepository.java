package com.skopjemarathon.repository;

import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.skopjemarathon.enums.RaceStatus;
import com.skopjemarathon.model.Race;

public interface RaceRepository extends JpaRepository<Race, UUID> {
    Optional<Race> findTopByStatusOrderByRaceDateDesc(RaceStatus status);
    List<Race> findAllByOrderByRaceDateDesc();
}
