import React, { useState, useEffect } from "react";
import CandidateService from "../services/candidate.service"; // Assuming this service handles API requests
import { Link } from "react-router-dom"; // Assuming you are using React Router

const Candidate = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await CandidateService.getCandidates();
        console.log(response.data);
        setCandidates(response.data);
      } catch (error) {
        setError(error.response?.data || error.message || error.toString());
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);

  return (
    <>
    <h1 className="mb-4">Applied Jobs</h1>
    <div className="container mt-5 card">
      
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <ul>
          {candidates.length === 0 ? (
            <li>No candidates found.</li>
          ) : (
            candidates.map(candidate => (
              <li key={candidate.id}>
                <Link to={`/candidates/${candidate.id}`}><p><strong>{candidate.positionApplied} #{candidate.id}</strong></p></Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
    </>
  );
};

export default Candidate;
