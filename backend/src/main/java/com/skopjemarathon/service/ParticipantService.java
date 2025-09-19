package com.skopjemarathon.service;

import org.springframework.data.domain.Page;

import java.util.Optional;

import com.skopjemarathon.dto.participant.ParticipantResponse;
import com.skopjemarathon.dto.participant.ParticipantStatusResponse;
import com.skopjemarathon.enums.Category;
import com.skopjemarathon.model.Participant;

public interface ParticipantService {

    ParticipantStatusResponse checkStatus(String search);

    ParticipantResponse register(String firstName, String lastName, String email, int age, Category category);

    Optional<ParticipantStatusResponse> getStatusByEmail(String email);

    Optional<ParticipantStatusResponse> getStatusByRegistration(String registrationNumber);

    Page<Participant> listPaid(String nameQuery, Category category, int page, int size);

    Optional<Participant> findByEmail(String email);

    Optional<Participant> findByRegistrationNumber(String registrationNumber);
}
