import React, { useState, useEffect } from "react";
import CandidateService from "../services/candidate.service";
import { useNavigate, useParams } from "react-router-dom";

const UpdateCandidate = () => {
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
  const { id } = useParams(); // To get the candidate ID from the route parameters
  const navigate = useNavigate(); // For navigation

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await CandidateService.getCandidateById(id);
        setCandidate(response.data);
      } catch (error) {
        console.error("Error fetching candidate", error);
      }
    };
    fetchCandidate();
  }, [id]);

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
    console.log(candidate);
    try {
      await CandidateService.updateCandidate(candidate); // Update the candidate
      navigate("/"); // Redirect to the home page or candidate list
    } catch (error) {
      console.error("Error updating candidate", error);
    }
  };

  return (
    <>
    <header className="jumbotron">
        <h1>Add New Candidate</h1>  
      </header>
    <div className="container mt-5 card">
      <form onSubmit={handleSubmit}>
        {/* Personal Information Fields */}
        <div className="mb-3">
          <label className="form-label">Position Applied</label>
          <input type="text" className="form-control" name="positionApplied" value={candidate.positionApplied} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="text" className="form-control" name="name" value={candidate.name} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">KTP Number</label>
          <input type="text" className="form-control" name="ktpNumber" value={candidate.ktpNumber} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Birth Place</label>
          <input type="text" className="form-control" name="birthPlace" value={candidate.birthPlace} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Birth Date</label>
          <input type="date" className="form-control" name="birthDate" value={candidate.birthDate} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Gender</label>
          <input type="text" className="form-control" name="gender" value={candidate.gender} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Religion</label>
          <input type="text" className="form-control" name="religion" value={candidate.religion} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Blood Type</label>
          <input type="text" className="form-control" name="bloodType" value={candidate.bloodType} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Marital Status</label>
          <input type="text" className="form-control" name="maritalStatus" value={candidate.maritalStatus} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">KTP Address</label>
          <input type="text" className="form-control" name="ktpAddress" value={candidate.ktpAddress} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Current Address</label>
          <input type="text" className="form-control" name="currentAddress" value={candidate.currentAddress} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" name="email" value={candidate.email} onChange={handleInputChange} />
        </div>
        <div className="mb-3">
          <label className="form-label">Phone Number</label>
          <input type="text" className="form-control" name="phoneNumber" value={candidate.phoneNumber} onChange={handleInputChange} />
        </div>
        <div className="mb-3 form-check">
          <input type="checkbox" className="form-check-input" name="willingToRelocate" checked={candidate.willingToRelocate} onChange={handleCheckboxChange} />
          <label className="form-check-label">Willing to Relocate</label>
        </div>
        <div className="mb-3">
          <label className="form-label">Expected Salary</label>
          <input type="text" className="form-control" name="expectedSalary" value={candidate.expectedSalary} onChange={handleInputChange} />
        </div>

        {/* Education Fields */}
        <div className="mb-4">
          <h2>Education</h2>
          {candidate.educationList.map((edu, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label">Level</label>
                  <input type="text" className="form-control" name="level" value={edu.level} onChange={(e) => handleEducationChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Institution Name</label>
                  <input type="text" className="form-control" name="institutionName" value={edu.institutionName} onChange={(e) => handleEducationChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Major</label>
                  <input type="text" className="form-control" name="major" value={edu.major} onChange={(e) => handleEducationChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Graduation Year</label>
                  <input type="text" className="form-control" name="graduationYear" value={edu.graduationYear} onChange={(e) => handleEducationChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">GPA</label>
                  <input type="text" className="form-control" name="gpa" value={edu.gpa} onChange={(e) => handleEducationChange(index, e)} />
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-danger" onClick={() => handleRemoveEducation(index)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={handleAddEducation}>Add Education</button>
        </div>

        {/* Training Fields */}
        <div className="mb-4">
          <h2>Training</h2>
          {candidate.trainingList.map((training, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label">Course Name</label>
                  <input type="text" className="form-control" name="courseName" value={training.courseName} onChange={(e) => handleTrainingChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Certificate</label>
                  <input type="text" className="form-control" name="certificate" value={training.certificate} onChange={(e) => handleTrainingChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Year</label>
                  <input type="text" className="form-control" name="year" value={training.year} onChange={(e) => handleTrainingChange(index, e)} />
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-danger" onClick={() => handleRemoveTraining(index)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={handleAddTraining}>Add Training</button>
        </div>

        {/* Work Experience Fields */}
        <div className="mb-4">
          <h2>Work Experience</h2>
          {candidate.workExperienceList.map((work, index) => (
            <div key={index} className="mb-3 p-3 border rounded">
              <div className="row">
                <div className="col-md-6 mb-2">
                  <label className="form-label">Company Name</label>
                  <input type="text" className="form-control" name="companyName" value={work.companyName} onChange={(e) => handleWorkExperienceChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Last Position</label>
                  <input type="text" className="form-control" name="lastPosition" value={work.lastPosition} onChange={(e) => handleWorkExperienceChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Last Salary</label>
                  <input type="text" className="form-control" name="lastSalary" value={work.lastSalary} onChange={(e) => handleWorkExperienceChange(index, e)} />
                </div>
                <div className="col-md-6 mb-2">
                  <label className="form-label">Years Worked</label>
                  <input type="text" className="form-control" name="yearsWorked" value={work.yearsWorked} onChange={(e) => handleWorkExperienceChange(index, e)} />
                </div>
                <div className="col-md-6">
                  <button type="button" className="btn btn-danger" onClick={() => handleRemoveWorkExperience(index)}>Remove</button>
                </div>
              </div>
            </div>
          ))}
          <button type="button" className="btn btn-primary" onClick={handleAddWorkExperience}>Add Work Experience</button>
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
    </>
  );
};

export default UpdateCandidate;
