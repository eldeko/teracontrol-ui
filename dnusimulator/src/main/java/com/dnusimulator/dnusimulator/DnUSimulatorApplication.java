package com.dnusimulator.dnusimulator;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableAsync;
import org.springframework.scheduling.annotation.EnableScheduling;

@EnableAsync
@EnableScheduling
@SpringBootApplication(exclude = {DataSourceAutoConfiguration.class })
public class DnUSimulatorApplication {

	public static void main(String[] args) {
		SpringApplication.run(DnUSimulatorApplication.class, args);
	}

}
