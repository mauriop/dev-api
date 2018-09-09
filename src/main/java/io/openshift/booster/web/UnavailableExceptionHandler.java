package io.openshift.booster.web;

import io.openshift.booster.model.ErrorDetails;
import io.openshift.booster.model.UnavailableException;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.context.request.WebRequest;
import org.springframework.web.servlet.mvc.method.annotation.ResponseEntityExceptionHandler;

import java.util.Locale;

/**
 * UnavailableExceptionHandler
 */
@ControllerAdvice
@RestController
public class UnavailableExceptionHandler extends ResponseEntityExceptionHandler {
    private final MessageSource templateMessage;

    public UnavailableExceptionHandler(MessageSource templateMessage) {
        this.templateMessage = templateMessage;
    }

    @ExceptionHandler(UnavailableException.class)
    public final ResponseEntity<ErrorDetails> handleUnavailableException(UnavailableException ex, WebRequest request) {
        return new ResponseEntity<>(ErrorDetails.builder()
                .code(ex.getErrorCode())
                .messageEl(templateMessage.getMessage(ex.getErrorCode(), null, Locale.forLanguageTag("el")))
                .messageEn(templateMessage.getMessage(ex.getErrorCode(), null, Locale.forLanguageTag("en")))
                .build(), HttpStatus.SERVICE_UNAVAILABLE);
    }
}
