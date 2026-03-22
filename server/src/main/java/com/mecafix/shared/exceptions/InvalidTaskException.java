/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Exception.java to edit this template
 */
package com.mecafix.shared.exceptions;

/**
 *
 * @author mpaula
 */
public class InvalidTaskException extends Exception {

    /**
     * Creates a new instance of <code>InvalidTaskException</code> without
     * detail message.
     */
    public InvalidTaskException() {
    }

    /**
     * Constructs an instance of <code>InvalidTaskException</code> with the
     * specified detail message.
     *
     * @param msg the detail message.
     */
    public InvalidTaskException(String msg) {
        super(msg);
    }
}
