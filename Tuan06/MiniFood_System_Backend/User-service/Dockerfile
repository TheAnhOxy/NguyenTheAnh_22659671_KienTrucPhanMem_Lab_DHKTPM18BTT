FROM openjdk:21

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} authentication-service.jar

ENTRYPOINT ["java", "-jar", "user-service.jar"]

EXPOSE 8081