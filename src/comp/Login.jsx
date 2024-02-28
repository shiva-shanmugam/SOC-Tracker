import React, { useState } from 'react';

const LoginRegisterForm = () => {
  const [activeTab, setActiveTab] = useState('login');

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card mt-5 shadow rounded">
            <div className="card-header">
              <ul className="nav nav-tabs card-header-tabs">
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'login' ? 'active' : ''}`}
                    onClick={() => handleTabChange('login')}
                  >
                    Login
                  </button>
                </li>
                <li className="nav-item">
                  <button
                    className={`nav-link ${activeTab === 'register' ? 'active' : ''}`}
                    onClick={() => handleTabChange('register')}
                  >
                    Register
                  </button>
                </li>
              </ul>
            </div>
            <div className="card-body">
              {activeTab === 'login' && (
                <form action="/login" method="POST" >
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input type="email" className="form-control" id="loginEmail" placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input type="password" className="form-control" id="loginPassword" placeholder="Enter your password" />
                  </div>
                  <button type="submit" className="btn btn-primary">Login</button>
                </form>
              )}
              {activeTab === 'register' && (
                <form action="/register" method="POST" >
                  <div className="form-group">
                    <label htmlFor="registerName">Name</label>
                    <input type="text" className="form-control" id="registerName" placeholder="Enter your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registerEmail">Email</label>
                    <input type="email" className="form-control" id="registerEmail" placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registerPassword">Password</label>
                    <input type="password" className="form-control" id="registerPassword" placeholder="Choose a password" />
                  </div>
                  <button type="submit" className="btn btn-success">Register</button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginRegisterForm;
