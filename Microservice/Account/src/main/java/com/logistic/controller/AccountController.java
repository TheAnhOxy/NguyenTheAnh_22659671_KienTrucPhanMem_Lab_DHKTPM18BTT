package com.logistic.controller;


import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@Slf4j
@RequestMapping("/accounts")
public class AccountController {

    @GetMapping("/hello")
    public String getHello(){
        log.info("wwao wao");
        return  "Hello Account";
    }
}
