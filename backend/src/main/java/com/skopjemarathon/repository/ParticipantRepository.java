package com.skopjemarathon.repository;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.skopjemarathon.dto.participant.ParticipantStatusResponse;
import com.skopjemarathon.model.Participant;

public interface ParticipantRepository extends JpaRepository<Participant, UUID> {

    Optional<Participant> findByEmail(String email);

    Optional<Participant> findByRegistrationNumber(String registrationNumber);

    @Query("SELECT pay.status, part.id, part.registrationNumber, part.startNumber FROM Participant part JOIN part.payment pay WHERE part.id = :id")
    Optional<ParticipantStatusResponse> getStatusDataById(@Param("id") UUID id);

    @Query("SELECT pay.status, part.id, part.registrationNumber, part.startNumber FROM Participant part JOIN part.payment pay WHERE part.registrationNumber = :reg")
    Optional<ParticipantStatusResponse> getStatusDataByRegistration(@Param("reg") String registrationNumber);

    @Query("""
            SELECT pay.status, part.id, part.registrationNumber, part.startNumber
            FROM Participant part
            JOIN part.payment pay
            WHERE part.email = :email
            """)
    Optional<ParticipantStatusResponse> getStatusDataByEmail(@Param("email") String email);

    @Query(value = """
            SELECT p.*
            FROM participants p
            JOIN payments pay ON pay.participant_id = p.id
            WHERE pay.status = :status
              AND (
                    :nameQuery IS NULL OR (
                        p.first_name ILIKE CONCAT('%', CAST(:nameQuery AS TEXT), '%')
                        OR p.last_name ILIKE CONCAT('%', CAST(:nameQuery AS TEXT), '%')
                    )
                  )
              AND (:category IS NULL OR p.category = :category)
            ORDER BY p.created_at DESC
            """,
            countQuery = """
            SELECT COUNT(1)
            FROM participants p
            JOIN payments pay ON pay.participant_id = p.id
            WHERE pay.status = :status
              AND (
                    :nameQuery IS NULL OR (
                        p.first_name ILIKE CONCAT('%', CAST(:nameQuery AS TEXT), '%')
                        OR p.last_name ILIKE CONCAT('%', CAST(:nameQuery AS TEXT), '%')
                    )
                  )
              AND (:category IS NULL OR p.category = :category)
            """,
            nativeQuery = true)
    Page<Participant> findPaidParticipants(
            @Param("status") String status,
            @Param("nameQuery") String nameQuery,
            @Param("category") String category,
            Pageable pageable);
}
