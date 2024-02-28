import React , { useState } from "react";


const Crowdstrike = ({handleChkChange,handleFormSubmit,handleInpChange,selectedHandl,formData,handleInputChange,editable,inputValue,selectedResol,status,falsePos,userData,loggedInEmail,setSelectedHandl,setFalsePos,setSelectedResol,setStatus}) => {
return(
    <form onSubmit={handleFormSubmit} className="container-cover">
    <div className="container-cover">
      <div className="cover-note">
        <div className="note">
          <p>
            Date and Time
            <input
            name="datAndTime"
              value={inputValue}
              onChange={handleInpChange}
              readOnly={editable}
              placeholder="Ex.:26/10/2023, 8:29:31 pm"
            ></input>
            <p>
              Manual
              <input
                className="check"
                onChange={handleChkChange}
                type="checkbox"
                checked={!editable}
              ></input>
            </p>
          </p>
          <h1>Host Details</h1>
          <p>
            Host Name <input name="hostName" value={formData.hostName} onChange={handleInputChange} placeholder="Hostname" />
          </p>
          <p>
            OS <input name="OS" value={formData.OS} onChange={handleInputChange}  placeholder="Ex.:Windows,Linux" />
          </p>
          <p>
            Local IP <input name="localIP" value={formData.localIP} onChange={handleInputChange}  placeholder="Ex.:10.0.2.15" />
          </p>
          
        </div>
        <div className="note">
          <h1>User Details</h1>
          <p>
            User Name <input name="userName" value={formData.userName} onChange={handleInputChange} placeholder="Username" />
          </p>
        </div>
        <div className="note">
          <h1>Alert Details</h1>
          <p>
            Severity
            <input name="severity" value={formData.severity} onChange={handleInputChange} placeholder="Ex.:High,low.." />
          </p>
          <p>
            Objective
            <input name="objective" value={formData.objective} onChange={handleInputChange} placeholder="Objective" />
          </p>
          <p>
            Tactic & Technique
            <input name="tacticAndTech" value={formData.tacticAndTech} onChange={handleInputChange} placeholder="Tactic & Technique"></input>
          </p>
          <p>
            Technique ID
            <input name="techID" value={formData.techID} onChange={handleInputChange} placeholder="Technique ID" />
          </p>
          <p>
            Command Line
            <input name="cmdLine" value={formData.cmdLine} onChange={handleInputChange} placeholder="Command Line" />
          </p>
          <p>
            File Path
            <input name="filePath" value={formData.filePath} onChange={handleInputChange} placeholder="File path" />
          </p>
          </div>
          <div className="note">
          <p>
            Escalated By
            <input name="escalatedBy" value={formData.escalatedBy} onChange={handleInputChange} placeholder="Escalated By" />
          </p>
          <p>
            Ticket ID
            <input name="ticketID" value={formData.ticketID} onChange={handleInputChange} placeholder="Ticket ID" />
          </p>
          <p>
            Comments
            <input name="comments" value={formData.comments} onChange={handleInputChange} placeholder="Comments" />
          </p>
          <p>
          Status
                <select style={{ display:"flex",marginLeft:"75%" ,}} value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
          </p>
          </div>
        <div className="note button-note" style={{ alignItems:"center",justifyContent:"center"}} ><button className="btn btn-outline-success" type="submit">Save</button></div>
      </div>
      <div
        style={{
          justifyContent: "end",
          alignItems: "end",
          
        }}
        className="left-container"
      >
        {userData ? (
          <div>
          <h1>CROWDSTRIKE</h1>
            <h2>Welcome,<h2 style={{color:"#f26f22"}} >{userData.username}</h2></h2>
            <h3>Your User Data</h3>
            <p>Email: {loggedInEmail}</p>
            <p>Role: {userData.role}</p>
          </div>
        ) : (
          <p>Loading user data...</p>
        )}


      </div>
    </div>
    
  </form>
);
        }
export default Crowdstrike;