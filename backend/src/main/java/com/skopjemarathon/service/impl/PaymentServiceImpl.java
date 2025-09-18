package com.skopjemarathon.service.impl;

import java.time.YearMonth;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skopjemarathon.enums.PaymentStatus;
import com.skopjemarathon.model.Participant;
import com.skopjemarathon.model.Payment;
import com.skopjemarathon.repository.ParticipantRepository;
import com.skopjemarathon.repository.PaymentRepository;
import com.skopjemarathon.service.PaymentService;

@Service
@Transactional
public class PaymentServiceImpl implements PaymentService {

    private final ParticipantRepository participantRepository;
    private final PaymentRepository paymentRepository;

    public PaymentServiceImpl(ParticipantRepository participantRepository, PaymentRepository paymentRepository) {
        this.participantRepository = participantRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public PaymentStatus processPayment(UUID participantId, String cardNumber, int expMonth, int expYear,
            String cardHolder, String cvv) {
        Participant participant = participantRepository.findById(participantId)
                .orElseThrow(() -> new IllegalArgumentException("Participant not found"));

        Payment payment = participant.getPayment();
        boolean success = isValidCard(cardNumber, expMonth, expYear, cvv);
        if (success) {
            payment.setStatus(PaymentStatus.PAID);
            payment.setTransactionId("TX-" + UUID.randomUUID());
            if (participant.getStartNumber() == null) {
                participant.setStartNumber(String.valueOf((int) (Math.random() * 90000) + 10000));
            }
        } else {
            payment.setStatus(PaymentStatus.FAILED);
        }
        paymentRepository.save(payment);
        participantRepository.save(participant);
        return payment.getStatus();
    }

    private boolean isValidCard(String number, int month, int year, String cvv) {
        System.out.println("Validating card: " + number + " " + month + " " + year + " " + cvv);
        if (number == null || cvv == null || number.isBlank() || cvv.isBlank()) {
            System.out.println("Card number or CVV is null or blank");
            return false;
        }

        // 1) Luhn check for card number
        if (!luhnValid(number.trim())) {
            System.out.println("Luhn check failed");
            return false;
        }

        // 2) expiry in the future
        try {
            YearMonth exp = YearMonth.of(year, month);
            if (exp.isBefore(YearMonth.now())) {
                System.out.println("Expiry date is in the past");
                return false;
            }
        } catch (Exception e) {
            return false;
        }

        // 3) basic cvv length
        if (cvv.length() < 3 || cvv.length() > 4) {
            System.out.println("CVV length is not valid");
            return false;
        }
        return true;
    }

    private boolean luhnValid(String number) {
        int sum = 0;
        boolean alt = false;
        for (int i = number.length() - 1; i >= 0; i--) {
            char c = number.charAt(i);
            if (!Character.isDigit(c)) {
                System.out.println("Character is not a digit");
                return false;
            }
            int n = c - '0';
            if (alt) {
                n *= 2;
                if (n > 9)
                    n -= 9;
            }
            sum += n;
            alt = !alt;
        }
        return sum % 10 == 0;
    }
}
