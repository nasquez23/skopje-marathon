package com.skopjemarathon.service.impl;

import com.skopjemarathon.enums.Category;
import com.skopjemarathon.enums.PaymentStatus;
import com.skopjemarathon.model.Participant;
import com.skopjemarathon.model.Payment;
import com.skopjemarathon.repository.ParticipantRepository;
import com.skopjemarathon.repository.PaymentRepository;
import com.skopjemarathon.service.ParticipantService;
import com.skopjemarathon.dto.participant.ParticipantStatusResponse;
import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

    private final ParticipantRepository participantRepository;
    private final PaymentRepository paymentRepository;

    public ParticipantServiceImpl(ParticipantRepository participantRepository, PaymentRepository paymentRepository) {
        this.participantRepository = participantRepository;
        this.paymentRepository = paymentRepository;
    }

    @Override
    public Participant register(String firstName, String lastName, String email, int age, Category category) {
        try {
            participantRepository.findByEmail(email).ifPresent(p -> {
                throw new IllegalArgumentException("Email already registered");
            });

            Participant participant = new Participant();
            participant.setFirstName(firstName);
            participant.setLastName(lastName);
            participant.setEmail(email);
            participant.setAge(age);
            participant.setCategory(category);
            participant.setRegistrationNumber(generateRegistrationNumber());

            participant = participantRepository.save(participant);

            Payment payment = new Payment();
            payment.setParticipant(participant);
            payment.setStatus(PaymentStatus.PENDING);
            payment.setAmount(calculateFee(category));
            payment.setTransactionId("PENDING-" + participant.getRegistrationNumber());
            paymentRepository.save(payment);

            participant.setPayment(payment);

            return participant;

        } catch (Exception e) {
            throw new RuntimeException("Failed to register participant", e);
        }
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ParticipantStatusResponse> getStatusByEmail(String email) {
        return participantRepository.getStatusDataByEmail(email)
                .map(this::mapToStatusResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<ParticipantStatusResponse> getStatusByRegistration(String registrationNumber) {
        return participantRepository.getStatusDataByRegistration(registrationNumber)
                .map(this::mapToStatusResponse);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Participant> listPaid(Optional<String> nameQuery, Optional<Category> category) {
        return participantRepository.findPaidParticipants(
                PaymentStatus.PAID,
                nameQuery.orElse(null),
                category.orElse(null));
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Participant> findByEmail(String email) {
        return participantRepository.findByEmail(email);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Participant> findByRegistrationNumber(String registrationNumber) {
        return participantRepository.findByRegistrationNumber(registrationNumber);
    }

    private static String generateRegistrationNumber() {
        return "REG-" + UUID.randomUUID().toString().substring(0, 8).toUpperCase();
    }

    private static BigDecimal calculateFee(Category category) {
        return switch (category) {
            case _5KM -> BigDecimal.valueOf(10);
            case _10KM -> BigDecimal.valueOf(15);
            case HALF_MARATHON -> BigDecimal.valueOf(20);
            case MARATHON -> BigDecimal.valueOf(30);
        };
    }

    private ParticipantStatusResponse mapToStatusResponse(ParticipantStatusResponse data) {
        return new ParticipantStatusResponse(
                data.status(),
                data.participantId(),
                data.registrationNumber(),
                data.startNumber());
    }
}
