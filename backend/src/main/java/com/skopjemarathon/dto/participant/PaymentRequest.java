package com.skopjemarathon.dto.participant;

public record PaymentRequest(
    String cardNumber,
    int expMonth,
    int expYear,
    String cardHolder,
    String cvv
) {}
