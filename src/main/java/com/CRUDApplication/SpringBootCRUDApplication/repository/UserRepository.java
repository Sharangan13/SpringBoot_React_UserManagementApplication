package com.CRUDApplication.SpringBootCRUDApplication.repository;


import com.CRUDApplication.SpringBootCRUDApplication.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User,Long> {


}
