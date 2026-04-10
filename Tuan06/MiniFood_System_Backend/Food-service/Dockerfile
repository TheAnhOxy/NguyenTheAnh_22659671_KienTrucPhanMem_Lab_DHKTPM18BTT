FROM openjdk:21

ARG JAR_FILE=target/*.jar

COPY ${JAR_FILE} food-service.jar

ENTRYPOINT ["java", "-jar", "order-service.jar"]

EXPOSE 8082