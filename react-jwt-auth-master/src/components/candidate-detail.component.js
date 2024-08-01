import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import CandidateService from "../services/candidate.service"; // Make sure this service method is implemented

const CandidateDetail = () => {
  const { id } = useParams(); // Extract the candidate ID from the URL
  const [candidate, setCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidate = async () => {
      try {
        const response = await CandidateService.getCandidateById(id);
        setCandidate(response.data);
      } catch (error) {
        setError(error.response?.data || error.message || error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchCandidate();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  if (!candidate) return <p>No candidate found.</p>;

  return (
    <div className="container mt-5">
      <header className="jumbotron">
        <h1>Candidate Details</h1>
      </header>
      <div className="card">
        <div className="card-body">
          <dl className="row">
            <dt className="col-sm-3">ID:</dt>
            <dd className="col-sm-9">{candidate.id}</dd>

            <dt className="col-sm-3">Position Applied:</dt>
            <dd className="col-sm-9">{candidate.positionApplied}</dd>

            <dt className="col-sm-3">Name:</dt>
            <dd className="col-sm-9">{candidate.name}</dd>

            <dt className="col-sm-3">KTP Number:</dt>
            <dd className="col-sm-9">{candidate.ktpNumber}</dd>

            <dt className="col-sm-3">Birth Place:</dt>
            <dd className="col-sm-9">{candidate.birthPlace}</dd>

            <dt className="col-sm-3">Birth Date:</dt>
            <dd className="col-sm-9">{candidate.birthDate}</dd>

            <dt className="col-sm-3">Gender:</dt>
            <dd className="col-sm-9">{candidate.gender}</dd>

            <dt className="col-sm-3">Religion:</dt>
            <dd className="col-sm-9">{candidate.religion}</dd>

            <dt className="col-sm-3">Blood Type:</dt>
            <dd className="col-sm-9">{candidate.bloodType}</dd>

            <dt className="col-sm-3">Marital Status:</dt>
            <dd className="col-sm-9">{candidate.maritalStatus}</dd>

            <dt className="col-sm-3">KTP Address:</dt>
            <dd className="col-sm-9">{candidate.ktpAddress}</dd>

            <dt className="col-sm-3">Current Address:</dt>
            <dd className="col-sm-9">{candidate.currentAddress}</dd>

            <dt className="col-sm-3">Email:</dt>
            <dd className="col-sm-9">{candidate.email}</dd>

            <dt className="col-sm-3">Phone Number:</dt>
            <dd className="col-sm-9">{candidate.phoneNumber}</dd>

            <dt className="col-sm-3">Emergency Contact:</dt>
            <dd className="col-sm-9">{candidate.emergencyContact}</dd>

            <dt className="col-sm-3">Willing to Relocate:</dt>
            <dd className="col-sm-9">{candidate.willingToRelocate ? 'Yes' : 'No'}</dd>

            <dt className="col-sm-3">Expected Salary:</dt>
            <dd className="col-sm-9">{candidate.expectedSalary}</dd>
          </dl>

          <h2 className="mt-4">Education</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Level</th>
                <th>Institution Name</th>
                <th>Major</th>
                <th>Graduation Year</th>
                <th>GPA</th>
              </tr>
            </thead>
            <tbody>
              {candidate.educationList?.map((edu) => (
                <tr key={edu.id}>
                  <td>{edu.level}</td>
                  <td>{edu.institutionName}</td>
                  <td>{edu.major}</td>
                  <td>{edu.graduationYear}</td>
                  <td>{edu.gpa}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <h2 className="mt-4">Training</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Course Name</th>
                <th>Certificate</th>
                <th>Year</th>
              </tr>
            </thead>
            <tbody>
              {candidate.trainingList?.map((training) => (
                <tr key={training.id}>
                  <td>{training.courseName}</td>
                  <td>{training.certificate}</td>
                  <td>{training.year}</td>
                </tr>
              ))}
            </tbody>
          </table>


          <h2 className="mt-4">Work Experience</h2>
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Company Name</th>
                <th>Last Position</th>
                <th>Last Salary</th>
                <th>Years Worked</th>
              </tr>
            </thead>
            <tbody>
              {candidate.workExperienceList?.map((work) => (
                <tr key={work.id}>
                  <td>{work.companyName}</td>
                  <td>{work.lastPosition}</td>
                  <td>{work.lastSalary}</td>
                  <td>{work.yearsWorked}</td>
                </tr>
              ))}
            </tbody>
          </table>

        </div>
      </div>
    </div>

  );
};

export default CandidateDetail;
