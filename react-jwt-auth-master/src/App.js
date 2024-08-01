import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
// import "bootstrap/dist/css/bootstrap.min.css";

import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";
import Profile from "./components/profile.component";

import Candidate from "./components/candidate.component";
import CandidateDetail from "./components/candidate-detail.component";

// import AuthVerify from "./common/auth-verify";
import EventBus from "./common/EventBus";
import AddCandidate from "./components/candidate-add.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      isAdmin: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        isAdmin: user.roles.includes("ROLE_ADMIN"),
      });
    }
    
    EventBus.on("logout", () => {
      this.logOut();
    });
  }

  componentWillUnmount() {
    EventBus.remove("logout");
  }

  logOut() {
    AuthService.logout();
    this.setState({
      isAdmin: false,
      currentUser: undefined,
    });
  }

  render() {
    const {currentUser, isAdmin } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand navbar-dark bg-dark">
          <Link to={"/"} className="navbar-brand">
            Home
          </Link>
          <div className="navbar-nav mr-auto">
            {isAdmin && (
              <li className="nav-item">
                <Link to={"/admin"} className="nav-link">
                  Admin Board
                </Link>
              </li>
            )}

            {currentUser && (
              <>
              <li className="nav-item">
                <Link to={"/candidates"} className="nav-link">
                  Application List
                </Link>
              </li>
              <li className="nav-item">
                <Link to={"/candidates/add"} className="nav-link">
                  Add Biodata
                </Link>
              </li>
              </>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/profile"} className="nav-link">
                  {currentUser.username}
                </Link>
              </li>
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<Profile />} />
            {/* <Route path="/user" element={<BoardUser />} />
            <Route path="/mod" element={<BoardModerator />} />
            <Route path="/admin" element={<BoardAdmin />} /> */}
            
            <Route path="/candidates" element={<Candidate />} />
            <Route path="/candidates/:id" element={<CandidateDetail />} />
            <Route path="/candidates/add" element={<AddCandidate />} />

          </Routes>
        </div>

        {/* <AuthVerify logOut={this.logOut}/> */}
      </div>
    );
  }
}

export default App;
