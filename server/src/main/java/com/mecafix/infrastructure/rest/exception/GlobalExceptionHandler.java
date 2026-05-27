package com.mecafix.infrastructure.rest.exception;

import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

import com.mecafix.domain.exceptions.NotFoundException;
import com.mecafix.domain.exceptions.InvalidDataException;
import com.mecafix.domain.exceptions.ConflictException;

import org.springframework.web.bind.MethodArgumentNotValidException;
import jakarta.validation.ConstraintViolationException;

@RestControllerAdvice
@Slf4j
public class GlobalExceptionHandler {

    @ExceptionHandler(NotFoundException.class)
    public ResponseEntity<ErrorResponse> handleNotFound(NotFoundException ex) {
        log.warn("Recurso no encontrado: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.NOT_FOUND)
                .body(new ErrorResponse("NOT_FOUND", ex.getMessage()));
    }

    @ExceptionHandler(ConflictException.class)
    public ResponseEntity<ErrorResponse> handleConflict(ConflictException ex) {
        log.warn("Conflicto de recurso: {}", ex.getMessage());
        return ResponseEntity
                .status(HttpStatus.CONFLICT)
                .body(new ErrorResponse("CONFLICT", ex.getMessage()));
    }

    @ExceptionHandler(InvalidDataException.class)
    public ResponseEntity<ErrorResponse> handleBadRequest(InvalidDataException ex) {
        log.warn("Datos inválidos: {}", ex.getMessage());
        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse("INVALID_DATA", ex.getMessage()));
    }

    // ── Futuro: validación de sintaxis con @Valid en los controllers ────────
    // Cuando se agreguen anotaciones @Valid a los @RequestBody y se usen
    // constraints de Jakarta Validation (ej. @NotBlank, @Email), estas
    // excepciones serán lanzadas por Spring y deben traducirse a 400.

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ErrorResponse> handleValidation(MethodArgumentNotValidException ex) {
        String message = ex.getBindingResult().getFieldErrors().stream()
                .map(error -> error.getField() + ": " + error.getDefaultMessage())
                .findFirst()
                .orElse("Datos de entrada inválidos");
        log.warn("Validación de request body fallida: {}", message);
        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse("INVALID_DATA", message));
    }

    @ExceptionHandler(ConstraintViolationException.class)
    public ResponseEntity<ErrorResponse> handleConstraintViolation(ConstraintViolationException ex) {
        String message = ex.getConstraintViolations().stream()
                .map(violation -> violation.getPropertyPath() + ": " + violation.getMessage())
                .findFirst()
                .orElse("Restricción de validación violada");
        log.warn("Validación de parámetro fallida: {}", message);
        return ResponseEntity
                .badRequest()
                .body(new ErrorResponse("INVALID_DATA", message));
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorResponse> handleGeneric(Exception ex) {
        log.error("Error inesperado", ex);
        return ResponseEntity
                .internalServerError()
                .body(new ErrorResponse("INTERNAL_ERROR", "Error interno del servidor"));
    }

    public record ErrorResponse(String code, String message) {}
}
