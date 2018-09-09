package io.openshift.booster.model;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * UnavailableException
 */
@ResponseStatus(HttpStatus.SERVICE_UNAVAILABLE)
public class UnavailableException extends RuntimeException {

    public UnavailableException(String code) {
        super(code);
    }

    @ResponseBody
    public String getErrorCode() {
        return "Error Code";
    }
}
