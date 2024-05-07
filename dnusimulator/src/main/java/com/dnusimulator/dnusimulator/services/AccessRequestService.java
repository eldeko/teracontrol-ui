package com.dnusimulator.dnusimulator.services;

import com.dnusimulator.dnusimulator.dto.EventType;
import com.dnusimulator.dnusimulator.dto.AccessRequest;

import java.time.Duration;
import java.util.Random;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestTemplate;

@Service
public class AccessRequestService {

    private static final Logger logger = LoggerFactory.getLogger(AccessRequestService.class);
    private RestTemplate restTemplate;

    private Random random = new Random();

    @Value("${teracontrol.url}${accessRequestEndpoint}")
    private String url;

    public AccessRequestService() {
        this.restTemplate = new RestTemplate();
    }

    public void generateRandomAccessRequests() throws InterruptedException {
        int maxRequests = 5000;
        int requestCount = 0;
        int toSleep = 150;

        for (int i = 0; i < maxRequests; i++) {

            AccessRequest req = new AccessRequest(diceAKeyCode(), generateRandomEventType(), generateRandomDSN());
            logger.info("Sending request: {}, {}, {}", req.getKeychainCode(), req.getEventType(), req.getSerialNumber());
            
            tryOpenDoor(req);
            Thread.sleep(toSleep);
            requestCount++;

            logger.info("Sleeping: {} miliseconds", toSleep);

        }
        logger.info("Total requests sent: {}", requestCount);

    }

    private String generateRandomDSN() {

        String[] serialNumbers = {
                "SN-1",
                "SN-2",
                "SN-3",
                "SN-4",
                "SN-5",
                "SN-6"
        };
        this.random = new Random();
        int randomIndex = random.nextInt(serialNumbers.length);
        return serialNumbers[randomIndex];
    }

    private EventType generateRandomEventType() {
        boolean isEntry = random.nextBoolean();
        return isEntry ? EventType.ENTRY : EventType.EXIT;
    }

    private String diceAKeyCode() {

        String[] keys = {
                "0123456789ABCDEF",
                "FEDCBA9876543210",
                "13579BDF2468ACE0",
                "ABCDEF0123456789",
                "02468ACE13579BDF",
                "A1B2C3D4E5F67890",
                "9876543210ABCDEF",
                "F0E1D2C3B4A59687",
                "543210ABCDEF9876",
                "3210FEDCBA987653"
        };
        this.random = new Random();
        int randomIndex = random.nextInt(keys.length);
        return keys[randomIndex];
    }

    public void tryOpenDoor(AccessRequest accessRequest) {

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        String requestJson = "{"
                + "\"keylockCode\":\"" + accessRequest.getKeychainCode() + "\","
                + "\"eventType\":\"" + accessRequest.getEventType() + "\","
                + "\"serialNumber\":\"" + accessRequest.getSerialNumber() + "\""
                + "}";

        HttpEntity<String> entity = new HttpEntity<>(requestJson, headers);

        try {
         restTemplate.postForObject(url, entity, String.class);
} catch (ResourceAccessException e) {
    logger.error("Timeout occurred", e);
} catch (Exception e) {
    logger.error("An error occurred", e);
}
       
    }

    @Bean
    public CommandLineRunner run() {
        return args -> {
            try {
                generateRandomAccessRequests();

            } catch (Exception e) {

            }

        };
    }

    @Bean
private RestTemplate restTemplate(RestTemplateBuilder builder) {
    return builder
        .setConnectTimeout(Duration.ofMillis(5000))
        .setReadTimeout(Duration.ofMillis(5000))
        .build();
}
}