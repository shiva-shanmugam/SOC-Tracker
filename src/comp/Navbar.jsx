import React from 'react';
import Sophos from './Sophos';
import Qradar from './Qradar';

const Navbar = ({ onSearchInputChange, onSearch, isAdmin,logout ,onChange,onDash,onDownload,onShowTickets,onRegister,Sophos,Crowdstrike,Qradar}) => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light custom-nav-bg">
      <div className="container-fluid">
        <a className="navbar-brand" href="#">SOC TRACKER</a>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
          {isAdmin && (
              <li className="nav-item">
              <a className="nav-link" href="#" onClick={onDash}>Dashboard</a>
            </li>
            )}
            {isAdmin && (
              <li className="nav-item">
              <a className="nav-link" href="#" onClick={onRegister}>Register</a>
            </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={Qradar}>QRADAR</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={Sophos}>SOPHOS</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={Crowdstrike}>CROWDSTRIKE</a>
            </li>
            {isAdmin && (
              <li className="nav-item">
              <a className="nav-link" href="#" onClick={onDownload}>Download</a>
            </li>
            )}
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={onChange}>Change Password</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#" onClick={onShowTickets}>Current Tickets</a>
            </li>
          </ul>
          <form className="d-flex">
            <input className="form-control me-2" style={{backgroundColor:"#e2a378"}} type="search" placeholder="Ex.: QRADAR:12" onChange={onSearchInputChange}  aria-label="Search" />
            <button className="btn btn-success"  onClick={onSearch} type="submit">Search</button>
          </form>
          <button style={{ marginLeft:"10px" }} className="btn btn-danger"  onClick={logout} type="submit">Log Out</button>

        </div>
      </div>
    </nav>
  );
};

export default Navbar;
