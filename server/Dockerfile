FROM eclipse-temurin:25-jdk

WORKDIR /app

COPY . .

RUN chmod +x gradlew && ./gradlew build -x test

EXPOSE 8080

ENTRYPOINT ["sh", "-c", "java -jar build/libs/*.jar"]
