package com.web.project.repository;

import org.springframework.data.repository.CrudRepository;

import com.web.project.dto.Test;

public interface Repository extends CrudRepository<Test, Integer> {

}
