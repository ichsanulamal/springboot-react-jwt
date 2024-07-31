package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Candidate;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    List<Candidate> findByUserId(Long userId);
}