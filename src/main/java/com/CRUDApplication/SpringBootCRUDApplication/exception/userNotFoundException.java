package com.CRUDApplication.SpringBootCRUDApplication.exception;

public class userNotFoundException extends RuntimeException{
    public userNotFoundException(Long id){
        System.out.println("Coud not find the user with id "+id);
    }
}
