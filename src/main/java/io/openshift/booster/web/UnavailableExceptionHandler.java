package io.openshift.booster.web;

import io.openshift.booster.model.ErrorDetails;
import io.openshift.booster.model.UnavailableException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

/**
 * UnavailableExceptionHandler
 */
@ControllerAdvice
@RestController
public class UnavailableExceptionHandler extends ResponseEntityExceptionHandler {

    @ExceptionHandler(UnavailableException.class)
    public final ResponseEntity<ErrorDetails> handleUnavailableException(UnavailableException ex, WebRequest request) {
        return new ResponseEntity<>(ErrorDetails.builder()
                .code(ex.getErrorCode())
                .messageEl("el")
                .messageEn("en")
                .build(), HttpStatus.SERVICE_UNAVAILABLE);
    }
}
