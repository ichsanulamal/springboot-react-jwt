package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Training;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TrainingRepository extends JpaRepository<Training, Long> {
    List<Training> findByCandidateId(Long candidateId);
}