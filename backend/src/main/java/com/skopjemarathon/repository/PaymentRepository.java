package com.skopjemarathon.repository;

import com.skopjemarathon.enums.PaymentStatus;
import com.skopjemarathon.model.Payment;
import java.util.UUID;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {

    @Query("select p.status from Payment p where p.participant.id = :participantId")
    PaymentStatus findStatusByParticipantId(@Param("participantId") UUID participantId);

    @Query("select p.status from Payment p join p.participant part where part.registrationNumber = :registrationNumber")
    PaymentStatus findStatusByRegistrationNumber(@Param("registrationNumber") String registrationNumber);
}
