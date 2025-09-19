package com.skopjemarathon.model;

import java.time.LocalDate;
import java.util.List;

import com.skopjemarathon.enums.RaceStatus;
import com.skopjemarathon.model.base.BaseEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.OneToMany;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Table;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Table(name = "races")
@Getter
@Setter
@NoArgsConstructor
public class Race extends BaseEntity {
    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String edition;

    @Column(nullable = false)
    private String description;

    @Column(nullable = false)
    private String location;

    @Column(nullable = false, name = "race_date")
    private LocalDate raceDate;

    @Column(nullable = false)
    @Enumerated(EnumType.STRING)
    private RaceStatus status;

    @OneToMany(mappedBy = "race", cascade = CascadeType.ALL)
    private List<RaceReview> reviews;
}
