package com.example.ecommerce.config;

import com.okta.spring.boot.oauth.Okta;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.web.accept.ContentNegotiationStrategy;
import org.springframework.web.accept.HeaderContentNegotiationStrategy;

@Configuration
public class SecurityConfig {

    @Bean
    protected SecurityFilterChain filterChain(HttpSecurity httpSec) throws Exception {

        //? protect endpoint "/api/orders"
        httpSec.authorizeHttpRequests(requests -> requests
                .requestMatchers("/api/orders/**")
                .authenticated()
                .anyRequest().permitAll())
                .oauth2ResourceServer(oauth2ResourceServer -> oauth2ResourceServer.jwt(Customizer.withDefaults()));

        //? + CORS filters
        httpSec.cors(Customizer.withDefaults());

        //? + content negotiation strategy
        httpSec.setSharedObject(ContentNegotiationStrategy.class, new HeaderContentNegotiationStrategy());

        //? + non-empty response body for 401 (more friendly)
        Okta.configureResourceServer401ResponseBody(httpSec);

        //? we are not using Cookies for session tracking >> disable CSRF
        httpSec.csrf(AbstractHttpConfigurer::disable);

        return httpSec.build();
    }

}
