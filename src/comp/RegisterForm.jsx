import React, { useState } from 'react';

const RegisterForm = () => {
  const [userFormData, setUserFormData] = useState({
    regname: '',
    regemail: '',
    regpassword: '',
  });

  const handleRegInputChange = (e) => {
    const { name, value } = e.target;
    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleRegistration = (e) => {
    e.preventDefault();
    const registrationData = {
      regname: userFormData.regname,
      regemail: userFormData.regemail,
      regpassword: userFormData.regpassword,
    };

    console.log('Registration data to be sent to the server:', registrationData);
  };

  return (
    <form action="/register" method="POST" onSubmit={handleRegistration}>
      <div className="form-group">
        <label htmlFor="registerName">Name</label>
        <input
          type="text"
          name="regname"
          value={userFormData.regname}
          className="form-control"
          id="registerName"
          onChange={handleRegInputChange}
          placeholder="Enter your name"
        />
      </div>
      <div className="form-group">
        <label htmlFor="registerEmail">Email</label>
        <input
          type="email"
          name="regemail"
          value={userFormData.regemail}
          className="form-control"
          id="registerEmail"
          onChange={handleRegInputChange}
          placeholder="Enter your email"
        />
      </div>
      <div className="form-group">
        <label htmlFor="registerPassword">Password</label>
        <input
          type="password"
          name="regpassword"
          value={userFormData.regpassword}
          className="form-control"
          id="registerPassword"
          onChange={handleRegInputChange}
          placeholder="Choose a password"
        />
      </div>
      <button type="submit" className="btn btn-success">
        Register
      </button>
    </form>
  );
};

export default RegisterForm;
