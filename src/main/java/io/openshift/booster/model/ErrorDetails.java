package io.openshift.booster.model;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * ErrorDetails
 */
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ErrorDetails {
    private String code;

    @JsonProperty(value = "el-GR")
    private String messageEl;

    @JsonProperty(value = "en-US")
    private String messageEn;
}
