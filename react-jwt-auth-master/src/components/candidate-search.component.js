import React, { useState, useEffect    } from 'react'; 
import candidateService from '../services/candidate.service';


const SearchCandidates = () => {
  // State variables for form fields and results
  const [name, setName] = useState('');
  const [positionApplied, setPositionApplied] = useState('');
  const [educationLevel, setEducationLevel] = useState('');
  const [candidates, setCandidates] = useState([]);
  const [error, setError] = useState('');

  // Fetch candidates when the page loads
  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        // Make the API request using the service
        const results = await candidateService.searchCandidate(
          { name, positionApplied, educationLevel }
        );
        // Update state with the results
        console.log(results.data);
        setCandidates(results.data);
        setError('');
      } catch (err) {
        // Handle error
        setError(err.message);
      }
    };

    fetchCandidates();
  }, []); // Empty dependency array means this effect runs only once after the initial render 

  // Handle form submission
  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      // Make the API request using the service
      const results = await candidateService.searchCandidate(
        {name,
        positionApplied,
        educationLevel}
      );
      // Update state with the results

      console.log(results.data);
      setCandidates(results.data);
      setError('');
    } catch (err) {
      // Handle error
      setError(err.message);
    }
  };

  return (
    <>
    <h1 className="mb-4">Search Candidates</h1>
    <div className="container mt-4">
      <form onSubmit={handleSearch} className="mb-4 container mt-5 card">
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name:</label>
          <input
            type="text"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="positionApplied" className="form-label">Position Applied:</label>
          <input
            type="text"
            id="positionApplied"
            className="form-control"
            value={positionApplied}
            onChange={(e) => setPositionApplied(e.target.value)}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="educationLevel" className="form-label">Education Level:</label>
          <input
            type="text"
            id="educationLevel"
            className="form-control"
            value={educationLevel}
            onChange={(e) => setEducationLevel(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary">Search</button>
      </form>

      {/* Display error if any */}
      {error && <div className="alert alert-danger" role="alert">{error}</div>}

      {/* Display search results */}
      <div>
        <h1 className="mt-4">Results:</h1>
        {error && <div className="alert alert-danger" role="alert">Error: {error}</div>}
        {candidates.length === 0 ? (
          <p className="text-muted">No candidates found.</p>
        ) : (
          <table className="table table-striped">
            <thead>
              <tr>
                <th>Name</th>
                <th>Birth Place</th>
                <th>Birth Date</th>
                <th>Position Applied</th>
                <th>Education Level</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {candidates.map(candidate => (
                <tr key={candidate.id}>
                  <td>{candidate.name}</td>
                  <td>{candidate.birthPlace}</td>
                  <td>{candidate.birthDate}</td>
                  <td>{candidate.positionApplied}</td>
                  <td>{candidate.educationList && candidate.educationList.length > 0 ? candidate.educationList[0].level : 'N/A'}</td>
                  <td>
                    <a href={`/candidates/${candidate.id}`} className="btn btn-info btn-sm" target="_blank" rel="noopener noreferrer">View Details</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>  
    </>
  );
};

export default SearchCandidates;
