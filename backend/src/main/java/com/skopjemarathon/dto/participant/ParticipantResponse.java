package com.skopjemarathon.dto.participant;

import com.skopjemarathon.enums.Category;

public record ParticipantResponse(
        String id,
        String firstName,
        String lastName,
        String email,
        int age,
        Category category,
        String registrationNumber,
        String startNumber) {
}
