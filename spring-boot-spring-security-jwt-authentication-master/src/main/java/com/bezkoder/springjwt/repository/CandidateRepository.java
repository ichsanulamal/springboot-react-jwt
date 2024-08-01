package com.bezkoder.springjwt.repository;

import com.bezkoder.springjwt.models.Candidate;
import com.bezkoder.springjwt.models.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CandidateRepository extends JpaRepository<Candidate, Long> {
    Optional<Candidate> findById(Long id);
    List<Candidate> findByUser(User user);

    @Query("SELECT c FROM Candidate c " +
            "JOIN c.educationList e " +
            "WHERE (c.name LIKE %:name% OR :name IS NULL) " +
            "AND (c.positionApplied LIKE %:positionApplied% OR :positionApplied IS NULL) " +
            "AND (e.level LIKE %:educationLevel% OR :educationLevel IS NULL)")
    List<Candidate> searchCandidates(
            @Param("name") String name,
            @Param("positionApplied") String positionApplied,
            @Param("educationLevel") String educationLevel
    );
}