package com.food.notificationservice.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
public class NotificationController {

    @GetMapping("/notification")
    public String getHello(){
        log.info("wwao wao");
        return  "Hello notification";
    }
}
