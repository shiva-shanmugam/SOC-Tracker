import React , { useState } from "react";


const Sophos = ({handleChkChange,handleFormSubmit,handleInpChange,itVal,setItVal,selectedHandl,resolution,setResolution,shift,setShift,location,setLocation,escalatedTo,formData,handleInputChange,setEscalatedTo,editable,inputValue,selectedResol,status,falsePos,userData,loggedInEmail,setSelectedHandl,setFalsePos,setSelectedResol,setStatus}) => {
return(
    <form onSubmit={handleFormSubmit} className="container-cover">
    <div className="container-cover">
      <div className="cover-note">
        <div className="note">
          <h1>Ticket Details</h1>
          <p>
            Ticket ID <input name="ticketID" value={formData.ticketID} onChange={handleInputChange} placeholder="Ticket ID" />
          </p>
          <p>
          Location
                <select style={{ display:"flex",marginLeft:"75%" ,}} value={location} onChange={(e) => setLocation(e.target.value)}>
                  <option value="Chennai">Chennai</option>
                  <option value="Bangalore">Bangalore</option>
                  <option value="USA">USA</option>
                  <option value="Manila">Manila</option>
                  <option value="Gurugram">Gurugram</option>
                </select>
          </p>
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
        </div>
        <div className="note">
          <h1>Offence Details</h1>
          <p>
            Alert Category
            <input name="alertCategory" value={formData.alertCategory} onChange={handleInputChange} placeholder="Alert Category" />
          </p>
          <p>
            Alert Time
            <input name="alertTime" value={formData.alertTime} onChange={handleInputChange} placeholder="Ex.:26/10/2023, 8:29:31 pm"></input>{" "}
          </p>
          <p>
          Shift Name
                <select style={{ display:"flex",marginLeft:"75%" ,}} value={shift} onChange={(e) => setShift(e.target.value)}>
                  <option value="APEC">APEC</option>
                  <option value="EMEA">EMEA</option>
                  <option value="USA">USA</option>
                </select>
          </p>
          <p>
            Escalated Time
            <input name="escalatedTime" value={formData.escalatedTime} onChange={handleInputChange} placeholder="Ex.:26/10/2023, 8:29:31 pm" />
          </p>
          <p>
            Escalated By
            <input name="escalatedBy" value={formData.escalatedBy} onChange={handleInputChange} placeholder="Escalated By" />
          </p>
          <p>
            Severity
            <input name="severity" value={formData.severity} onChange={handleInputChange} placeholder="Ex.:High" />
          </p>
          <p>
            User Details
            <input name="userDetails" value={formData.userDetails} onChange={handleInputChange} placeholder="User Details" />
          </p>
          <p>
            Device Name
            <input name="deviceName" value={formData.deviceName} onChange={handleInputChange} placeholder="Device Name" />
          </p>
          <p>
            Offence Description
            <input name="offenceDesc" value={formData.offenceDesc} onChange={handleInputChange} placeholder="Description" />
          </p>
          {/* <p>
            SLA
            <input name="sla" value={formData.sla} onChange={handleInputChange} placeholder="SLA" />
          </p> */}
          <p>
            First Time To Response
            <input name="firstTimeToResponse" value={formData.firstTimeToResponse} onChange={handleInputChange} placeholder="Nov 7, 2023 15:00" />
          </p>
          <p>
            Response Status
            <input name="responseStatus" value={formData.responseStatus} onChange={handleInputChange} placeholder="Response Status" />
          </p>
          <p>
          Status
                <select style={{ display:"flex",marginLeft:"75%" ,}} value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
          </p>
          <p>
            Escalated To
                <select style={{ display:"flex",marginLeft:"75%" ,}} value={escalatedTo} onChange={(e) => setEscalatedTo(e.target.value)}>
                  <option value="Nil">Nil</option>
                  <option value="IT">IT</option>

                </select>
          </p>
          <p>
            Closed Time
            <input name="closedDateAndTime" value={formData.closedDateAndTime} onChange={handleInputChange} placeholder="Nov 7, 2023 18:00" />
          </p>
          <p>
            Resolution
                <select style={{ display:"flex",marginLeft:"75%" ,}} value={resolution} onChange={(e) => setResolution(e.target.value)}>
                  <option value="Resolved-By-SOC">Resolved-By-SOC</option>
                  <option value="Resolved-By-IT">Resolved-By-IT</option>
                  <option value="In IT Queue">In IT Queue</option>
                  <option value="In SOC Queue">In SOC Queue</option>
                  <option value="Self-Resolved">Self-Resolved</option>
                  <option value="Ignored">Ignored</option>

                </select>
          </p>
          <p>
            IT Validation / Comments
                <select style={{ display:"flex",marginLeft:"75%" ,}} value={itVal} onChange={(e) => setItVal(e.target.value)}>
                  <option value="Completed">Completed</option>
                  <option value="1st-escalation">1st-escalation</option>


                </select>
          </p>
          <p>
            Comments
            <input name="comments" value={formData.comments} onChange={handleInputChange} placeholder="Comments" />
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
          <h1>SOPHOS</h1>
            <h2>Welcome, <h2 style={{color:"#f26f22"}} >{userData.username}</h2></h2>
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
export default Sophos;