package com.skopjemarathon.model;

import com.skopjemarathon.enums.Category;
import com.skopjemarathon.model.base.BaseEntity;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import jakarta.persistence.Table;
import jakarta.persistence.CascadeType;
import jakarta.validation.constraints.Min;

@Entity
@Table(name = "participants")
@Getter
@Setter
@NoArgsConstructor
public class Participant extends BaseEntity {
    @Column(nullable = false, name = "first_name")
    private String firstName;

    @Column(nullable = false, name = "last_name")
    private String lastName;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    @Min(16)
    private Integer age;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private Category category;

    @Column(unique = true, name = "registration_number")
    private String registrationNumber;

    @Column(unique = true, name = "start_number")
    private String startNumber;

    @OneToOne(mappedBy = "participant", fetch = FetchType.LAZY, cascade = CascadeType.ALL, optional = false)
    private Payment payment;

    // @ManyToOne(fetch = FetchType.LAZY)
    // @JoinColumn(name = "user_id", nullable = false)
    // private User user;
}
