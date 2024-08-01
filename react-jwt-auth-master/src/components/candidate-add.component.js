import React, { useState } from "react";
import CandidateService from "../services/candidate.service";
import { useNavigate } from "react-router-dom"; // Replacing useHistory

const AddCandidate = () => {
  const [candidate, setCandidate] = useState({
    positionApplied: "",
    name: "",
    ktpNumber: "",
    birthPlace: "",
    birthDate: "",
    gender: "",
    religion: "",
    bloodType: "",
    maritalStatus: "",
    ktpAddress: "",
    currentAddress: "",
    email: "",
    phoneNumber: "",
    emergencyContact: "",
    willingToRelocate: false,
    expectedSalary: "",
    educationList: [],
    trainingList: [],
    workExperienceList: [],
  });
  const navigate = useNavigate(); // Using useNavigate for navigation

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCandidate({ ...candidate, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setCandidate({ ...candidate, [name]: checked });
  };

  const handleAddEducation = () => {
    setCandidate({
      ...candidate,
      educationList: [
        ...candidate.educationList,
        { level: "", institutionName: "", major: "", graduationYear: "", gpa: "" },
      ],
    });
  };

  const handleEducationChange = (index, e) => {
    const { name, value } = e.target;
    const updatedEducationList = candidate.educationList.map((edu, eduIndex) =>
      index === eduIndex ? { ...edu, [name]: value } : edu
    );
    setCandidate({ ...candidate, educationList: updatedEducationList });
  };

  const handleRemoveEducation = (index) => {
    setCandidate({
      ...candidate,
      educationList: candidate.educationList.filter((_, eduIndex) => index !== eduIndex),
    });
  };

  const handleAddTraining = () => {
    setCandidate({
      ...candidate,
      trainingList: [
        ...candidate.trainingList,
        { courseName: "", certificate: "", year: "" },
      ],
    });
  };

  const handleTrainingChange = (index, e) => {
    const { name, value } = e.target;
    const updatedTrainingList = candidate.trainingList.map((training, trainIndex) =>
      index === trainIndex ? { ...training, [name]: value } : training
    );
    setCandidate({ ...candidate, trainingList: updatedTrainingList });
  };

  const handleRemoveTraining = (index) => {
    setCandidate({
      ...candidate,
      trainingList: candidate.trainingList.filter((_, trainIndex) => index !== trainIndex),
    });
  };

  const handleAddWorkExperience = () => {
    setCandidate({
      ...candidate,
      workExperienceList: [
        ...candidate.workExperienceList,
        { companyName: "", lastPosition: "", lastSalary: "", yearsWorked: "" },
      ],
    });
  };

  const handleWorkExperienceChange = (index, e) => {
    const { name, value } = e.target;
    const updatedWorkExperienceList = candidate.workExperienceList.map((work, workIndex) =>
      index === workIndex ? { ...work, [name]: value } : work
    );
    setCandidate({ ...candidate, workExperienceList: updatedWorkExperienceList });
  };

  const handleRemoveWorkExperience = (index) => {
    setCandidate({
      ...candidate,
      workExperienceList: candidate.workExperienceList.filter((_, workIndex) => index !== workIndex),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(candidate);
      await CandidateService.addCandidate(candidate);
      navigate("/"); // Redirect to the home page or candidate list
    } catch (error) {
      console.error("Error adding candidate", error);
    }
  };

  return (
    <div className="container">
      <h1>Add New Candidate</h1>
      <form onSubmit={handleSubmit}>
        {/* Personal Information Fields */}
        <div>
          <label>Position Applied</label>
          <input type="text" name="positionApplied" value={candidate.positionApplied} onChange={handleInputChange} />
        </div>
        <div>
          <label>Name</label>
          <input type="text" name="name" value={candidate.name} onChange={handleInputChange} />
        </div>
        <div>
          <label>KTP Number</label>
          <input type="text" name="ktpNumber" value={candidate.ktpNumber} onChange={handleInputChange} />
        </div>
        <div>
          <label>Birth Place</label>
          <input type="text" name="birthPlace" value={candidate.birthPlace} onChange={handleInputChange} />
        </div>
        <div>
          <label>Birth Date</label>
          <input type="date" name="birthDate" value={candidate.birthDate} onChange={handleInputChange} />
        </div>
        <div>
          <label>Gender</label>
          <input type="text" name="gender" value={candidate.gender} onChange={handleInputChange} />
        </div>
        <div>
          <label>Religion</label>
          <input type="text" name="religion" value={candidate.religion} onChange={handleInputChange} />
        </div>
        <div>
          <label>Blood Type</label>
          <input type="text" name="bloodType" value={candidate.bloodType} onChange={handleInputChange} />
        </div>
        <div>
          <label>Marital Status</label>
          <input type="text" name="maritalStatus" value={candidate.maritalStatus} onChange={handleInputChange} />
        </div>
        <div>
          <label>KTP Address</label>
          <input type="text" name="ktpAddress" value={candidate.ktpAddress} onChange={handleInputChange} />
        </div>
        <div>
          <label>Current Address</label>
          <input type="text" name="currentAddress" value={candidate.currentAddress} onChange={handleInputChange} />
        </div>
        <div>
          <label>Email</label>
          <input type="email" name="email" value={candidate.email} onChange={handleInputChange} />
        </div>
        <div>
          <label>Phone Number</label>
          <input type="text" name="phoneNumber" value={candidate.phoneNumber} onChange={handleInputChange} />
        </div>
        <div>
          <label>Emergency Contact</label>
          <input type="text" name="emergencyContact" value={candidate.emergencyContact} onChange={handleInputChange} />
        </div>
        <div>
          <label>Willing to Relocate</label>
          <input type="checkbox" name="willingToRelocate" checked={candidate.willingToRelocate} onChange={handleCheckboxChange} />
        </div>
        <div>
          <label>Expected Salary</label>
          <input type="text" name="expectedSalary" value={candidate.expectedSalary} onChange={handleInputChange} />
        </div>

        {/* Education Fields */}
        <div>
          <h2>Education</h2>
          {candidate.educationList.map((edu, index) => (
            <div key={index}>
              <label>Level</label>
              <input type="text" name="level" value={edu.level} onChange={(e) => handleEducationChange(index, e)} />
              <label>Institution Name</label>
              <input type="text" name="institutionName" value={edu.institutionName} onChange={(e) => handleEducationChange(index, e)} />
              <label>Major</label>
              <input type="text" name="major" value={edu.major} onChange={(e) => handleEducationChange(index, e)} />
              <label>Graduation Year</label>
              <input type="text" name="graduationYear" value={edu.graduationYear} onChange={(e) => handleEducationChange(index, e)} />
              <label>GPA</label>
              <input type="text" name="gpa" value={edu.gpa} onChange={(e) => handleEducationChange(index, e)} />
              <button type="button" onClick={() => handleRemoveEducation(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddEducation}>Add Education</button>
        </div>

        <div>
          <h2>Education</h2>
          {candidate.educationList.map((edu, index) => (
            <div key={index}>
              <label>Level</label>
              <input type="text" name="level" value={edu.level} onChange={(e) => handleEducationChange(index, e)} />
              <label>Institution Name</label>
              <input type="text" name="institutionName" value={edu.institutionName} onChange={(e) => handleEducationChange(index, e)} />
              <label>Major</label>
              <input type="text" name="major" value={edu.major} onChange={(e) => handleEducationChange(index, e)} />
              <label>Graduation Year</label>
              <input type="text" name="graduationYear" value={edu.graduationYear} onChange={(e) => handleEducationChange(index, e)} />
              <label>GPA</label>
              <input type="text" name="gpa" value={edu.gpa} onChange={(e) => handleEducationChange(index, e)} />
              <button type="button" onClick={() => handleRemoveEducation(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddEducation}>Add Education</button>
        </div>
        <div>
          <h2>Training</h2>
          {candidate.trainingList.map((training, index) => (
            <div key={index}>
              <label>Course Name</label>
              <input type="text" name="courseName" value={training.courseName} onChange={(e) => handleTrainingChange(index, e)} />
              <label>Certificate</label>
              <input type="text" name="certificate" value={training.certificate} onChange={(e) => handleTrainingChange(index, e)} />
              <label>Year</label>
              <input type="text" name="year" value={training.year} onChange={(e) => handleTrainingChange(index, e)} />
              <button type="button" onClick={() => handleRemoveTraining(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddTraining}>Add Training</button>
        </div>
        <div>
          <h2>Work Experience</h2>
          {candidate.workExperienceList.map((work, index) => (
            <div key={index}>
              <label>Company Name</label>
              <input type="text" name="companyName" value={work.companyName} onChange={(e) => handleWorkExperienceChange(index, e)} />
              <label>Last Position</label>
              <input type="text" name="lastPosition" value={work.lastPosition} onChange={(e) => handleWorkExperienceChange(index, e)} />
              <label>Last Salary</label>
              <input type="text" name="lastSalary" value={work.lastSalary} onChange={(e) => handleWorkExperienceChange(index, e)} />
              <label>Years Worked</label>
              <input type="text" name="yearsWorked" value={work.yearsWorked} onChange={(e) => handleWorkExperienceChange(index, e)} />
              <button type="button" onClick={() => handleRemoveWorkExperience(index)}>Remove</button>
            </div>
          ))}
          <button type="button" onClick={handleAddWorkExperience}>Add Work Experience</button>
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCandidate;
