package com.skopjemarathon.service.impl;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.skopjemarathon.dto.participant.ParticipantResponse;
import com.skopjemarathon.dto.participant.ParticipantStatusResponse;
import com.skopjemarathon.enums.Category;
import com.skopjemarathon.enums.PaymentStatus;
import com.skopjemarathon.enums.RaceStatus;
import com.skopjemarathon.exception.AgeRestrictionException;
import com.skopjemarathon.exception.ParticipantNotFoundException;
import com.skopjemarathon.exception.PaymentException;
import com.skopjemarathon.model.Participant;
import com.skopjemarathon.model.Payment;
import com.skopjemarathon.repository.ParticipantRepository;
import com.skopjemarathon.repository.PaymentRepository;
import com.skopjemarathon.repository.RaceRepository;
import com.skopjemarathon.service.ParticipantService;

@Service
@Transactional
public class ParticipantServiceImpl implements ParticipantService {

    private final ParticipantRepository participantRepository;
    private final PaymentRepository paymentRepository;
    private final RaceRepository raceRepository;

    public ParticipantServiceImpl(ParticipantRepository participantRepository, PaymentRepository paymentRepository,
            RaceRepository raceRepository) {
        this.participantRepository = participantRepository;
        this.paymentRepository = paymentRepository;
        this.raceRepository = raceRepository;
    }

    @Override
    public ParticipantStatusResponse checkStatus(String search) {
        // Check if it's an email
        if (search.contains("@")) {
            Optional<ParticipantStatusResponse> status = getStatusByEmail(search);
            if (status.isPresent()) {
                return status.get();
            } else {
                throw new ParticipantNotFoundException("Participant not found with email: " + search);
            }
        } else {
            // Assume it's a registration number
            Optional<ParticipantStatusResponse> status = getStatusByRegistration(search);
            if (status.isPresent()) {
                return status.get();
            } else {
                throw new ParticipantNotFoundException("Participant not found with registration number: " + search);
            }
        }
    }

    @Override
    public ParticipantResponse register(String firstName, String lastName, String email, int age, Category category) {
        if (age < 16) {
            throw new AgeRestrictionException("You must be at least 16 years old to register for this race");
        }

        try {
            // Check if email already registered for current race
            raceRepository.findTopByStatusOrderByRaceDateDesc(RaceStatus.UPCOMING)
                    .ifPresent(race -> {
                        participantRepository.findByEmail(email).ifPresent(p -> {
                            if (p.getRace() != null && p.getRace().getId().equals(race.getId())) {
                                throw new IllegalArgumentException("Email already registered for this race");
                            }
                        });
                    });

            Participant participant = new Participant();
            participant.setFirstName(firstName);
            participant.setLastName(lastName);
            participant.setEmail(email);
            participant.setAge(age);
            participant.setCategory(category);
            participant.setRegistrationNumber(generateRegistrationNumber());

            // Attach participant to current active race edition if present
            raceRepository.findTopByStatusOrderByRaceDateDesc(RaceStatus.UPCOMING)
                    .ifPresent(participant::setRace);

            participant = participantRepository.save(participant);

            Payment payment = new Payment();
            payment.setParticipant(participant);
            payment.setStatus(PaymentStatus.PENDING);
            payment.setAmount(calculateFee(category));
            payment.setTransactionId("PENDING-" + participant.getRegistrationNumber());
            paymentRepository.save(payment);

            participant.setPayment(payment);

            return mapToParticipantResponse(participant);

        } catch (Exception e) {
            System.out.println(e.getMessage());
            throw new PaymentException("Failed to register participant", e);
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
    public Page<Participant> listPaid(String nameQuery, Category category, int page, int size) {
        Pageable pageable = PageRequest.of(Math.max(page, 0), Math.max(size, 1));
        return participantRepository.findPaidParticipants(
                PaymentStatus.PAID.name(),
                nameQuery,
                category != null ? category.name() : null,
                pageable);
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

    private static ParticipantResponse mapToParticipantResponse(Participant participant) {
        return new ParticipantResponse(
                participant.getId().toString(),
                participant.getFirstName(),
                participant.getLastName(),
                participant.getEmail(),
                participant.getAge(), participant.getCategory(), participant.getRegistrationNumber(),
                participant.getStartNumber(),
                participant.getRace() != null ? participant.getRace().getEdition() : "N/A");
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
