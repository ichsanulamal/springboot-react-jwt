import React, { useState, useEffect } from "react";

const Home = () => {
  const [content, setContent] = useState("");

  useEffect(() => {
    setContent("Welcome!");
    // UserService.getPublicContent().then(
    //   response => {
    //     setContent(response.data);
    //   },
    //   error => {
    //     setContent(
    //       (error.response && error.response.data) ||
    //       error.message ||
    //       error.toString()
    //     );
    //   }
    // );
  }, []);

  return (
    <div className="container">
      <header className="jumbotron">
        <h1>Welcome!</h1>
      </header>
    </div>
  );
};

export default Home;