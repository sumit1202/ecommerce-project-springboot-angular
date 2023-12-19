package com.example.ecommerce.config;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.data.rest.core.config.RepositoryRestConfiguration;
import org.springframework.data.rest.webmvc.config.RepositoryRestConfigurer;
import org.springframework.http.HttpMethod;
import org.springframework.web.servlet.config.annotation.CorsRegistry;

import com.example.ecommerce.entity.Country;
import com.example.ecommerce.entity.Order;
import com.example.ecommerce.entity.Product;
import com.example.ecommerce.entity.ProductCategory;
import com.example.ecommerce.entity.State;

import jakarta.persistence.EntityManager;
import jakarta.persistence.metamodel.EntityType;

@Configuration
public class MyDataRestConfig implements RepositoryRestConfigurer {

    @Value("${allowed.origins}")
    private String[] theAllowedOrigins;

    private EntityManager entityManager;

    @Autowired // ? optional to use annotation here
    public MyDataRestConfig(EntityManager entityManager) {
        this.entityManager = entityManager;
    }

    @Override
    public void configureRepositoryRestConfiguration(RepositoryRestConfiguration config, CorsRegistry cors) {

        // ! Disabling POST, PUT, DELETE HTTP methods
        // ? This is to expose read-only REST apis
        HttpMethod[] unsupportedHttpActions = { HttpMethod.POST, HttpMethod.PUT, HttpMethod.DELETE, HttpMethod.PATCH };

        // ?? For 'Product' Repository
        disableHttpMethods(config, unsupportedHttpActions, Product.class);

        // ?? For 'ProductCategory' Repository
        disableHttpMethods(config, unsupportedHttpActions, ProductCategory.class);

        // ?? For 'Country' Repository
        disableHttpMethods(config, unsupportedHttpActions, Country.class);

        // ?? For 'State' Repository
        disableHttpMethods(config, unsupportedHttpActions, State.class);

        // ?? For 'Order' Repository
        disableHttpMethods(config, unsupportedHttpActions, Order.class);

        // ! exposing category 'id' in response for "product-category" rest url
        exposeIds(config);

        // ? configure cors mapping
        // ? now @crossOrigin annotation can be remove in dao
        // cors.addMapping("/api/**").allowedOrigins("http://localhost:4200");

        // ? instead of hard-coding making use of app.properties
        cors.addMapping(config.getBasePath() + "/**").allowedOrigins(theAllowedOrigins);
    }

    private void disableHttpMethods(RepositoryRestConfiguration config, HttpMethod[] unsupportedHttpActions,
            Class<?> theClass) {
        config.getExposureConfiguration()
                .forDomainType(theClass)
                .withItemExposure((metadata, HttpMethods) -> HttpMethods.disable(unsupportedHttpActions))
                .withCollectionExposure((metadata, HttpMethods) -> HttpMethods.disable(unsupportedHttpActions));
    }

    private void exposeIds(RepositoryRestConfiguration config) {

        // ? expose entity ids
        // ?? get a list of all entity classes from entity manager
        Set<EntityType<?>> entities = entityManager.getMetamodel().getEntities();

        // ?? create a arr list of entity types
        List<Class<?>> entityClasses = new ArrayList<>();

        // ?? get entity types from entities set
        for (EntityType<?> entityType : entities) {
            entityClasses.add(entityType.getJavaType());
        }

        // ?? expose the entity ids for the array of entity/domain types
        Class<?>[] domainTypes = entityClasses.toArray(new Class<?>[0]);
        config.exposeIdsFor(domainTypes);

    }

}
