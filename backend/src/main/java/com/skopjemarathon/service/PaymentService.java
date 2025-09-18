package com.skopjemarathon.service;

import com.skopjemarathon.enums.PaymentStatus;
import java.util.UUID;

public interface PaymentService {
    PaymentStatus processPayment(UUID participantId, String cardNumber, int expMonth, int expYear, String cardHolder, String cvv);
}
