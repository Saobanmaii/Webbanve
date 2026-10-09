# ---- Build: dong goi file jar bang Maven ----
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
# Tai dependency truoc de lan build sau dung lai cache neu pom.xml khong doi
RUN mvn -q -B dependency:go-offline
COPY src ./src
RUN mvn -q -B -DskipTests package

# ---- Run: chi can JRE, image nho hon ----
FROM eclipse-temurin:17-jre
WORKDIR /app
# Gio Viet Nam: suat chieu seed theo LocalDateTime.now()
ENV TZ=Asia/Ho_Chi_Minh
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
# Goi free chi co 512MB RAM -> gioi han heap
ENTRYPOINT ["java", "-XX:MaxRAMPercentage=75", "-Duser.timezone=Asia/Ho_Chi_Minh", "-jar", "app.jar"]
