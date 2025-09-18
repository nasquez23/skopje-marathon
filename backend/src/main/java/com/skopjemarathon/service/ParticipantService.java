package com.skopjemarathon.service;

import com.skopjemarathon.enums.Category;
import com.skopjemarathon.model.Participant;
import com.skopjemarathon.dto.participant.ParticipantStatusResponse;
import java.util.List;
import java.util.Optional;

public interface ParticipantService {

    Participant register(String firstName, String lastName, String email, int age, Category category);

    Optional<ParticipantStatusResponse> getStatusByEmail(String email);

    Optional<ParticipantStatusResponse> getStatusByRegistration(String registrationNumber);

    List<Participant> listPaid(Optional<String> nameQuery, Optional<Category> category);

    Optional<Participant> findByEmail(String email);

    Optional<Participant> findByRegistrationNumber(String registrationNumber);
}
