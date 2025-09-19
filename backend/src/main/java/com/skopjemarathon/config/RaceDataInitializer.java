package com.skopjemarathon.config;

import java.time.LocalDate;

import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

import com.skopjemarathon.enums.RaceStatus;
import com.skopjemarathon.model.Race;
import com.skopjemarathon.repository.RaceRepository;

@Component
public class RaceDataInitializer implements CommandLineRunner {

    private final RaceRepository raceRepository;

    public RaceDataInitializer(RaceRepository raceRepository) {
        this.raceRepository = raceRepository;
    }

    @Override
    public void run(String... args) throws Exception {
        if (raceRepository.count() == 0) {
            createSampleRaces();
        }
    }

    private void createSampleRaces() {
        // Skopje Marathon 2023
        Race race2023 = new Race();
        race2023.setName("Skopje Marathon");
        race2023.setEdition("2023");
        race2023.setDescription("The inaugural Skopje Marathon featuring multiple race categories through the heart of Macedonia's capital.");
        race2023.setLocation("Skopje, North Macedonia");
        race2023.setRaceDate(LocalDate.of(2023, 10, 1));
        race2023.setStatus(RaceStatus.FINISHED);
        raceRepository.save(race2023);

        // Skopje Marathon 2024
        Race race2024 = new Race();
        race2024.setName("Skopje Marathon");
        race2024.setEdition("2024");
        race2024.setDescription("Second edition of Skopje Marathon with improved routes and enhanced participant experience.");
        race2024.setLocation("Skopje, North Macedonia");
        race2024.setRaceDate(LocalDate.of(2024, 10, 6));
        race2024.setStatus(RaceStatus.FINISHED);
        raceRepository.save(race2024);

        // Skopje Marathon 2025 (Current/Upcoming)
        Race race2025 = new Race();
        race2025.setName("Skopje Marathon");
        race2025.setEdition("2025");
        race2025.setDescription("Third edition of Skopje Marathon - bigger, better, and more exciting than ever!");
        race2025.setLocation("Skopje, North Macedonia");
        race2025.setRaceDate(LocalDate.of(2025, 10, 5));
        race2025.setStatus(RaceStatus.UPCOMING);
        raceRepository.save(race2025);

        System.out.println("Sample races created successfully!");
    }
}
