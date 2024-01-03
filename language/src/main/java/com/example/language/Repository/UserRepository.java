package com.example.language.Repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.example.language.model.register;

@Repository
public interface UserRepository extends JpaRepository<register, Long> {

    register findByUsername(String username);

}
