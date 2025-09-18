package com.skopjemarathon.dto.participant;

import java.util.UUID;

import com.skopjemarathon.enums.PaymentStatus;

public record ParticipantStatusResponse(PaymentStatus status, UUID participantId, String registrationNumber,
        String startNumber) {
}
