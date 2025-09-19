package com.skopjemarathon.controller;

import java.util.UUID;

import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.skopjemarathon.dto.participant.ParticipantResponse;
import com.skopjemarathon.dto.participant.ParticipantStatusResponse;
import com.skopjemarathon.dto.participant.PaymentRequest;
import com.skopjemarathon.dto.participant.RegisterParticipantRequest;
import com.skopjemarathon.enums.Category;
import com.skopjemarathon.enums.PaymentStatus;
import com.skopjemarathon.service.ParticipantService;
import com.skopjemarathon.service.PaymentService;

@RestController
@RequestMapping("/api/participants")
public class ParticipantController {

    private final ParticipantService participantService;
    private final PaymentService paymentService;

    public ParticipantController(ParticipantService participantService, PaymentService paymentService) {
        this.participantService = participantService;
        this.paymentService = paymentService;
    }

    @PostMapping("/register")
    public ResponseEntity<ParticipantResponse> register(@RequestBody RegisterParticipantRequest req) {
        return ResponseEntity.ok(participantService.register(req.getFirstName(), req.getLastName(), req.getEmail(),
                req.getAge(), req.getCategory()));
    }

    @PostMapping("/{id}/pay")
    public ResponseEntity<PaymentStatus> processPayment(@PathVariable UUID id, @RequestBody PaymentRequest req) {
        return ResponseEntity.ok(paymentService.processPayment(id, req.cardNumber(), req.expMonth(), req.expYear(),
                req.cardHolder(), req.cvv()));
    }

    @GetMapping("/status")
    public ResponseEntity<ParticipantStatusResponse> status(@RequestParam String search) {
        return ResponseEntity.ok(participantService.checkStatus(search));
    }

    @GetMapping
    public ResponseEntity<Page<ParticipantResponse>> listPaid(
            @RequestParam(required = false) String name,
            @RequestParam(required = false) Category category,
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size) {
        Page<ParticipantResponse> list = participantService.listPaid(name, category, page, size)
                .map(p -> new ParticipantResponse(
                        p.getId().toString(), p.getFirstName(), p.getLastName(), p.getEmail(), p.getAge(),
                        p.getCategory(), p.getRegistrationNumber(), p.getStartNumber(),
                        p.getRace() != null ? p.getRace().getEdition() : "N/A"));
        return ResponseEntity.ok(list);
    }
}
