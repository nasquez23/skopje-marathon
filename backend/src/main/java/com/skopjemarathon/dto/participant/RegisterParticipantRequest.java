package com.skopjemarathon.dto.participant;

import com.skopjemarathon.enums.Category;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import lombok.Data;

@Data
public class RegisterParticipantRequest {
    @NotBlank(message = "First name is required")
    @Size(min = 2, message = "First name must be at least 2 characters long")
    private String firstName;

    @NotBlank(message = "Last name is required")
    @Size(min = 2, message = "Last name must be at least 2 characters long")
    private String lastName;

    @NotBlank(message = "Email is required")
    @Email(message = "Invalid email format")
    private String email;

    @NotBlank(message = "Age is required")
    @Min(value = 16, message = "Age must be at least 16")
    private Integer age;

    @NotNull(message = "Category is required")
    private Category category;
}
