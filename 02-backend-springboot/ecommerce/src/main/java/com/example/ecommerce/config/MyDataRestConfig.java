package com.example.ecommerce.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.ProductCategory;

@Configuration 
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        // ? Disabling POST, PUT, DELETE HTTP methods
        // ? This is to expose read-only REST api
        HttpMethod[] unsupportedHttpActions = { HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE };

        // ? For 'Product' Entity
        config.getExposureConfiguration()
                .forDomainType(Product.class)
                .withItemExposure((metadata, HttpMethods) -> HttpMethods.disable(unsupportedHttpActions))
                .withCollectionExposure((metadata, HttpMethods) -> HttpMethods.disable(unsupportedHttpActions));

        // ? For 'ProductCaregory' Entity
        config.getExposureConfiguration()
                .forDomainType(ProductCategory.class)
                .withItemExposure((metadata, HttpMethods) -> HttpMethods.disable(unsupportedHttpActions))
                .withCollectionExposure((metadata, HttpMethods) -> HttpMethods.disable(unsupportedHttpActions));
    }

}
