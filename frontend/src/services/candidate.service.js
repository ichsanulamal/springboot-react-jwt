import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8080/api/candidates';

class CandidateService {
  getCandidates() {
    return axios.get(API_URL + '', { headers: authHeader()  } );
  }

  addCandidate(candidate) {
    return axios.post(API_URL + '', candidate, { headers: authHeader(  ) });
  }

  getCandidateById(id) {
    return axios.get(API_URL + `/${id}`, { headers: authHeader()  } );
  }

  updateCandidate(candidate) {
    return axios.put(API_URL + '', candidate, { headers: authHeader(  ) });
  }

  searchCandidate(params) {
    return axios.get(API_URL + '/search', {params: params ,headers: authHeader()  } );
  }
  
}

export default new CandidateService();
