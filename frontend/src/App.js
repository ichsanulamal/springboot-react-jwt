import React, { useEffect, useState } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import './App.css';

import AuthService from './services/auth.service';
import EventBus from './common/EventBus';

import Login from './components/login.component';
import Register from './components/register.component';
import Home from './components/home.component';
import Profile from './components/profile.component';
import Candidate from './components/candidate.component';
import CandidateDetail from './components/candidate-detail.component';
import AddCandidate from './components/candidate-add.component';
import UpdateCandidate from './components/candidate-update.component';
import SearchCandidates from './components/candidate-search.component';

const App = () => {
  const [currentUser, setCurrentUser] = useState(undefined);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      setIsAdmin(user.roles.includes('ROLE_ADMIN'));
    }

    const handleLogout = () => {
      logOut();
    };

    EventBus.on('logout', handleLogout);

    return () => {
      EventBus.remove('logout');
    };
  }, []);

  const logOut = () => {
    AuthService.logout();
    setCurrentUser(undefined);
    setIsAdmin(false);
  };

  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <Link to="/" className="navbar-brand">
          Home
        </Link>
        <div className="navbar-nav mr-auto">
          {isAdmin && (
            <li className="nav-item">
              <Link to="/candidates/search" className="nav-link">
                Job Search
              </Link>
            </li>
          )}
          {currentUser && !isAdmin && (
            <>
              <li className="nav-item">
                <Link to="/candidates" className="nav-link">
                  Applied Jobs
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/candidates/add" className="nav-link">
                  Apply
                </Link>
              </li>
            </>
          )}
        </div>

        <div className="navbar-nav ml-auto">
          {currentUser ? (
            <>
              <li className="nav-item">
                <Link to="/profile" className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={logOut}>
                  LogOut
                </a>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-link">
                  Sign Up
                </Link>
              </li>
            </>
          )}
        </div>
      </nav>

      <div className="container mt-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/candidates" element={<Candidate />} />
          <Route path="/candidates/:id" element={<CandidateDetail />} />
          <Route path="/candidates/add" element={<AddCandidate />} />
          <Route path="/candidates/:id/update" element={<UpdateCandidate />} />
          <Route path="/candidates/search" element={<SearchCandidates />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;
