package com.example.hr.controllers;

import com.example.hr.models.*;
import com.example.hr.models.*;
import com.example.hr.payload.response.MessageResponse;
import com.example.hr.repository.*;
import com.example.hr.repository.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequestMapping("/api/candidates")
public class CandidateController {

  @Autowired
  CandidateRepository candidateRepository;
  @Autowired
  EducationRepository educationRepository;
  @Autowired
  WorkExperienceRepository workExperienceRepository;
  @Autowired
  TrainingRepository trainingRepository;
  @Autowired
  UserRepository userRepository;

  @GetMapping("/all")
  public String allAccess() {
    return "Public Content.";
  }

  @GetMapping("/user")
  @PreAuthorize("hasRole('USER') or hasRole('MODERATOR') or hasRole('ADMIN')")
  public String userAccess() {
    return "User Content.";
  }

  public User getCurrentUser() {
    Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
    String username = authentication.getName();
    return userRepository.findByUsername(username)
            .orElseThrow(() -> new UsernameNotFoundException("User Not Found with username: " + username));
  }

  public boolean isAdmin() {
    User user =  getCurrentUser();
    for (Role role : user.getRoles()) {
      if (role.getName().equals(ERole.ROLE_ADMIN)) {
        return true;
      }
    }
    return false;
  }


  @GetMapping("/mod")
  @PreAuthorize("hasRole('MODERATOR')")
  public String moderatorAccess() {
    return "Moderator Board.";
  }

  @GetMapping("/admin")
  @PreAuthorize("hasRole('ADMIN')")
  public String adminAccess() {
    return "Admin Board.";
  }

  @GetMapping("")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<List<Candidate>> getCandidatesForCurrentUser() {
    User user =  getCurrentUser();

    if (user == null) {
      return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
    } else if (isAdmin()) {
      List<Candidate> candidates = candidateRepository.findAll();
      return new ResponseEntity<>(candidates, HttpStatus.OK);
    } else {
      List<Candidate> candidates = candidateRepository.findByUser(user);
      return new ResponseEntity<>(candidates, HttpStatus.OK);
    }
//    return new ResponseEntity<>(candidates, HttpStatus.OK);
  }

  // addition

  @GetMapping("/search")
  @PreAuthorize("hasRole('ADMIN')")
  public List<Candidate> searchCandidates(
          @RequestParam(required = false) String name,
          @RequestParam(required = false) String positionApplied,
          @RequestParam(required = false) String educationLevel
  ) {
    return candidateRepository.searchCandidates(name, positionApplied, educationLevel);
  }

  @GetMapping("/{id}")
  @PreAuthorize("hasRole('USER') or hasRole('ADMIN')")
  public ResponseEntity<Candidate> getCandidateById(@PathVariable Long id) {
    Candidate candidate = candidateRepository.findById(id).orElse(null);

    if (isAdmin()) {
      return new ResponseEntity<>(candidate, HttpStatus.OK);
    } else if (candidate == null || !candidate.getUser().getId().equals(getCurrentUser().getId())) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    return new ResponseEntity<>(candidate, HttpStatus.OK);
  }

  @PostMapping
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<MessageResponse> addCandidate(@RequestBody Candidate candidate) {

    candidate.setUser(getCurrentUser());

    Candidate savedCandidate = candidateRepository.save(candidate);

    for (Education e: savedCandidate.getEducationList()) {
      e.setCandidate(savedCandidate);
      educationRepository.save(e);
    }

    for (Training t: savedCandidate.getTrainingList()) {
      t.setCandidate(savedCandidate);
      trainingRepository.save(t);
    }

    for (WorkExperience w: savedCandidate.getWorkExperienceList()) {
      w.setCandidate(savedCandidate);
      workExperienceRepository.save(w);
    }

    return ResponseEntity.ok(new MessageResponse("Candidate registered successfully!"));
  }

  @PutMapping
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<MessageResponse> updateCandidate(@RequestBody Candidate candidate) {
    Candidate oldCandidate = candidateRepository.findById(candidate.getId()).orElse(null);

    if (oldCandidate == null || !oldCandidate.getUser().getId().equals(getCurrentUser().getId())) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }
    
    candidate.setUser(getCurrentUser());
    Candidate savedCandidate = candidateRepository.save(candidate);

    for (Education e: savedCandidate.getEducationList()) {
      e.setCandidate(savedCandidate);
      educationRepository.save(e);
    }

    for (Training t: savedCandidate.getTrainingList()) {
      t.setCandidate(savedCandidate);
      trainingRepository.save(t);
    }

    for (WorkExperience w: savedCandidate.getWorkExperienceList()) {
      w.setCandidate(savedCandidate);
      workExperienceRepository.save(w);
    }

    return ResponseEntity.ok(new MessageResponse("Candidate updated successfully!"));
  }

  // education
  @PostMapping("/{candidateId}/education")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Education> addEducation(@PathVariable Long candidateId, @RequestBody Education education) {
    Candidate candidate = candidateRepository.findById(candidateId).orElse(null);

    if (candidate == null || !candidate.getUser().getId().equals(getCurrentUser().getId())) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    education.setCandidate(candidate);
    educationRepository.save(education);

    return new ResponseEntity<>(education, HttpStatus.OK);
  }

  @PutMapping("/{candidateId}/education")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Education> updateEducation(@PathVariable Long candidateId, @RequestBody Education education) {
    Candidate currentCandidate = educationRepository.findById(education.getId()).orElse(null).getCandidate();
    if (currentCandidate.getUser().getId().equals(getCurrentUser().getId())) {
      education.setCandidate(currentCandidate);
      educationRepository.save(education);
      return new ResponseEntity<>(education, HttpStatus.OK);
    }

    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }

  @DeleteMapping("/{candidateId}/education/{educationId}")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Void> deleteEducation(@PathVariable Long candidateId, @PathVariable Long educationId) {
    Candidate currentCandidate = educationRepository.findById(educationId).orElse(null).getCandidate();
    if (currentCandidate.getUser().getId().equals(getCurrentUser().getId())) {
      educationRepository.deleteById(educationId);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }

  // training
  @PostMapping("/{candidateId}/training")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Training> addTraining(@PathVariable Long candidateId, @RequestBody Training training) {
    Candidate candidate = candidateRepository.findById(candidateId).orElse(null);

    if (candidate == null || !candidate.getUser().getId().equals(getCurrentUser().getId())) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    training.setCandidate(candidate);
    trainingRepository.save(training);

    return new ResponseEntity<>(training, HttpStatus.OK);
  }

  @PutMapping("/{candidateId}/training")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Training> updateTraining(@PathVariable Long candidateId, @RequestBody Training training) {
    Candidate currentCandidate = trainingRepository.findById(training.getId()).orElse(null).getCandidate();
    if (currentCandidate.getUser().getId().equals(getCurrentUser().getId())) {
      training.setCandidate(currentCandidate);
      trainingRepository.save(training);
      return new ResponseEntity<>(training, HttpStatus.OK);
    }

    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }

  @DeleteMapping("/{candidateId}/training/{trainingId}")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Void> deleteTraining(@PathVariable Long candidateId, @PathVariable Long trainingId) {
    Candidate currentCandidate = trainingRepository.findById(trainingId).orElse(null).getCandidate();
    if (currentCandidate.getUser().getId().equals(getCurrentUser().getId())) {
      trainingRepository.deleteById(trainingId);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }

  // work experience

  @PostMapping("/{candidateId}/workExperience")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<WorkExperience> addWorkExperience(@PathVariable Long candidateId, @RequestBody WorkExperience workExperience) {
    Candidate candidate = candidateRepository.findById(candidateId).orElse(null);

    if (candidate == null || !candidate.getUser().getId().equals(getCurrentUser().getId())) {
      return new ResponseEntity<>(HttpStatus.NOT_FOUND);
    }

    workExperience.setCandidate(candidate);
    workExperienceRepository.save(workExperience);

    return new ResponseEntity<>(workExperience, HttpStatus.OK);
  }

  @PutMapping("/{candidateId}/workExperience")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<WorkExperience> updateWorkExperience(@PathVariable Long candidateId, @RequestBody WorkExperience workExperience) {
    Candidate currentCandidate = workExperienceRepository.findById(workExperience.getId()).orElse(null).getCandidate();
    if (currentCandidate.getUser().getId().equals(getCurrentUser().getId())) {
      workExperience.setCandidate(currentCandidate);
      workExperienceRepository.save(workExperience);
      return new ResponseEntity<>(workExperience, HttpStatus.OK);
    }

    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }

  @DeleteMapping("/{candidateId}/workExperience/{workExperienceId}")
  @PreAuthorize("hasRole('USER')")
  public ResponseEntity<Void> deleteWorkExperience(@PathVariable Long candidateId, @PathVariable Long workExperienceId) {
    Candidate currentCandidate = workExperienceRepository.findById(workExperienceId).orElse(null).getCandidate();
    if (currentCandidate.getUser().getId().equals(getCurrentUser().getId())) {
      workExperienceRepository.deleteById(workExperienceId);
      return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    return new ResponseEntity<>(HttpStatus.UNAUTHORIZED);
  }


}
