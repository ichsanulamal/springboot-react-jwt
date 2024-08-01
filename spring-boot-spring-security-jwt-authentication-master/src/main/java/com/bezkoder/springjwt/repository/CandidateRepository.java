package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Candidate;
import com.bezkoder.springjwt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    Optional<Candidate> findById(Long id);
    List<Candidate> findByUser(User user);
}