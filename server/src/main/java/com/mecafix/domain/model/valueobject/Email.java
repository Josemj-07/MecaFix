package com.mecafix.domain.model.valueobject;
import com.mecafix.shared.exceptions.InvalidEmailException;
import java.util.regex.Pattern;

public record Email(String address) {

    /*
     * We must declare the pattern of any email to compare
     * and validate if email received has a correct syntax
     */

    private static final Pattern EMAIL_PATTERN = Pattern.compile("^[a-zA-Z0-9+._-]+@[A-Za-z0-9._-]+$");

    public Email {
        if (address == null) {
            throw new InvalidEmailException(); //validate if email is null
        }
        address = address.trim().toLowerCase();

        if (!(EMAIL_PATTERN.matcher(address).matches())) {
            throw new InvalidEmailException(); //validate if email has a correct syntax
        }
    }

}