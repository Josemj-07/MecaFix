package com.mecafix;

import io.github.cdimascio.dotenv.Dotenv;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class MecaFixApplication {

    public static void main(String[] args) {
        // Load .env: find it by walking up from the compiled class location
        String classPath = MecaFixApplication.class
                .getProtectionDomain().getCodeSource().getLocation().getPath();
        java.io.File dir = new java.io.File(classPath);
        while (dir != null && !new java.io.File(dir, ".env").exists()) {
            dir = dir.getParentFile();
        }

        Dotenv dotenv = Dotenv.configure()
                .directory(dir != null ? dir.getAbsolutePath() : ".")
                .ignoreIfMissing()
                .load();
        dotenv.entries().forEach(entry -> System.setProperty(entry.getKey(), entry.getValue()));

        SpringApplication.run(MecaFixApplication.class, args);
    }

}
