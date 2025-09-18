package com.skopjemarathon.service;

import java.util.List;
import java.util.Optional;

import com.skopjemarathon.dto.participant.ParticipantStatusResponse;
import com.skopjemarathon.enums.Category;
import com.skopjemarathon.model.Participant;

public interface ParticipantService {

    Participant register(String firstName, String lastName, String email, int age, Category category);

    Optional<ParticipantStatusResponse> getStatusByEmail(String email);

    Optional<ParticipantStatusResponse> getStatusByRegistration(String registrationNumber);

    List<Participant> listPaid(String nameQuery, Category category);

    Optional<Participant> findByEmail(String email);

    Optional<Participant> findByRegistrationNumber(String registrationNumber);
}
