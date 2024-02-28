import React , { useState } from "react";


const Qradar = ({handleChkChange,handleFormSubmit,handleInpChange,selectedHandl,formData,handleInputChange,editable,inputValue,selectedResol,status,falsePos,userData,loggedInEmail,setSelectedHandl,setFalsePos,setSelectedResol,setStatus,location,setLocation,shift,setShift}) => {
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
            Engineer Name <input name="engineerName" value={formData.engineerName} onChange={handleInputChange} placeholder="Engineer Name" />
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
            Offence ID
            <input name="offenceID" value={formData.offenceID} onChange={handleInputChange} placeholder="Offence ID" />
          </p>
          <p>
            Source IP <input name="sourceIP" value={formData.sourceIP} onChange={handleInputChange}  placeholder="Ex.:10.0.2.15" />
          </p>
          <p>
            Source port <input name="sourcePort" value={formData.sourcePort} onChange={handleInputChange}  placeholder="Ex.:3002" />
          </p>
          <p>
            Destination IP <input name="destinationIP" value={formData.destinationIP} onChange={handleInputChange}  placeholder="Ex.:10.0.2.15" />
          </p>
          <p>
            Destination port <input name="destinationPort" value={formData.destinationPort} onChange={handleInputChange}  placeholder="Ex.:3002" />
          </p>
          <p>
            Incident Type
            <input name="incidentType" value={formData.incidentType} onChange={handleInputChange} placeholder="Incident Type" />
          </p>
          <p>
            Incident Time
            <input name="incidentTime" value={formData.incidentTime} onChange={handleInputChange} placeholder="Nov 7, 2023 15:00"></input>{" "}
          </p>
          <p>
            Escalated Time
            <input name="escalatedTime" value={formData.escalatedTime} onChange={handleInputChange} placeholder="Ex.:26/10/2023, 8:29:31 pm"></input>{" "}
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
            Last Username
            <input name="lastUsername" value={formData.lastUsername} onChange={handleInputChange} placeholder="Last Username" />
          </p>
          <p>
            Offence Description
            <input name="offenceDesc" value={formData.offenceDesc} onChange={handleInputChange} placeholder="Description" />
          </p>
          <p>
            Response
            <input name="response" value={formData.response} onChange={handleInputChange} placeholder="Response" />
          </p>
          <p>
            Close Time
            <input name="closeTime" value={formData.closeTime} onChange={handleInputChange} placeholder="Nov 7, 2023 18:00" />
          </p>
          <p className="field">
            Resolved by
            <p style={{ marginRight: "20%", marginLeft: "2px" }}>
              SOC
              <input
              checked={selectedResol === "SOC"} onChange = {() => setSelectedResol("SOC")}
                style={{
                  width: "10rem",
                  position: "absolute",
                  marginTop: "4px",
                  marginLeft: "4px",
                }}
                className="check"
                type="checkbox"
              />
            </p>
            <p style={{ marginRight: "200px" }}>
              IT
              <input
              checked={selectedResol === "IT"} onChange = {() => setSelectedResol("IT")}
                style={{
                  width: "10rem",
                  position: "absolute",
                  marginTop: "4px",
                  marginLeft: "4px",
                }}
                className="check"
                type="checkbox"
              />
            </p>
          </p>
          <p>
            Comments
            <input name="comments" value={formData.comments} onChange={handleInputChange} placeholder="Comments" />
          </p>
          <p className="field">
            Handled by
            <p style={{ marginRight: "20%", marginLeft: "2px" }}>
              SOC
              <input
              checked={selectedHandl === "SOC"} onChange = {() => setSelectedHandl("SOC")}
                style={{
                  width: "10rem",
                  position: "absolute",
                  marginTop: "4px",
                  marginLeft: "4px",
                }}
                className="check"
                type="checkbox"
              />
            </p>
            <p style={{ marginRight: "200px" }}>
              IT
              <input
              checked={selectedHandl === "IT"} onChange = {() => setSelectedHandl("IT")}
                style={{
                  width: "10rem",
                  position: "absolute",
                  marginTop: "4px",
                  marginLeft: "4px",
                }}
                className="check"
                type="checkbox"
              />
            </p>
          </p>
          <p>
            Status
                <select style={{ display:"flex",marginLeft:"75%" ,}} value={status} onChange={(e) => setStatus(e.target.value)}>
                  <option value="Open">Open</option>
                  <option value="Close">Close</option>
                </select>
          </p>
          <p>
            False Positive
            <select style={{ display:"flex",marginLeft:"75%" }} value={falsePos} onChange={(e) => setFalsePos(e.target.value)}>
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
          </p>
          <p>
            Ticket Closer Update
            <input name="ticketCloserUpdate" value={formData.ticketCloserUpdate} onChange={handleInputChange} placeholder="Ticket Closer Update" />
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
          <h1>Qradar</h1>
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
export default Qradar;