import React, { useState, useEffect } from "react";
import LoginRegisterForm from "./Login";
import Navbar from "./Navbar";
import SearchResultsModal from './SearchResultsModal';
import * as XLSX from 'xlsx';
import Modal from "./Modal";
import Sophos from "./Sophos";
import Qradar from "./Qradar";
import Crowdstrike from "./Crowdstrike";
import RegisterModal from "./RegisterModal";
import Dashboard from "./Dashboard";
import ShowTickets from "./ShowTickets";
import ChangePassword from "./ChangePassword";
function App() {
  var time = new Date().toLocaleString();
  const [showTickets,setShowTickets] = useState(false);
  const [editable, setEditable] = useState(true);
  const [inputValue, setInputValue] = useState(time);
  const [status, setStatus] = useState("Open");
  const [escalatedTo, setEscalatedTo] = useState("Nil");
  const [resolution,setResolution] = useState("Resolved-By-SOC")
  const [falsePos, setFalsePos] = useState("Yes");
  const [formData, setFormData] = useState({});
  const [selectedResol,setSelectedResol] = useState("");
  const [selectedHandl,setSelectedHandl] = useState("");
  const [offenceStatus, setOffenceStatus] = useState("Open");
  const [falsePositive, setFalsePositive] = useState("Yes");
  const [activeTab, setActiveTab] = useState('login');
  const [userFormData, setUserFormData] = useState({});
  const [userData, setUserData] = useState({});
  const [location,setLocation] = useState("Chennai");
  const [shift,setShift] = useState("APEC");
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedInEmail, setLoggedInEmail] = useState(userFormData.loginemail);
  const [searchInput, setSearchInput] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searchFormResult, setSearchFormResult] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showRegistrationForm, setShowRegistrationForm] = useState(false);
  const [showRegistrationModal, setShowRegistrationModal] = useState(false);
  const [showSophos,setShowSophos] = useState(false);
  const [showCrowdstrike,setShowCrowdstrike] = useState(false);
  const [showQradar,setShowQradar] = useState(true);
  const [sophosFormData,setSophosFormData] = useState({});
  const [crowdstrikeFormData,setCrowdstrikeFormData] = useState({});
  const [itVal,setItVal] = useState("Completed");
  const [searchBtn,setSearchBtn] = useState("false");
  const [showDashboard,setShowDashboard] = useState("false");
  const [isFormModalOpen, setFormModalOpen] = useState(false);
  const [showChangePassword,setShowChangePassword] = useState(false);
  const [showChangePasswordModal,setShowChangePasswordModal] = useState(false);
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [editableStatus, setEditableStatus] = useState('');
  const [isEditMode, setIsEditMode] = useState(false);
  const [sophosEditableStatus, setSophosEditableStatus] = useState('');
  const [isSophosEditMode, setIsSophosEditMode] = useState(false);
  const [crowdstrikeEditableStatus, setCrowdstrikeEditableStatus] = useState('');
  const [isCrowdstrikeEditMode, setIsCrowdstrikeEditMode] = useState(false);
  const handleChangePassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('New passwords do not match');
      return;
    }

    const response = await fetch(API_CHANGE_PASSWORD+userData.username, {
      method: 'POST',
      body: JSON.stringify({ oldPassword, newPassword }),
      headers: { 'Content-Type': 'application/json' },
    });

    if (response.status === 200) {
      setMessage('Password changed successfully');
    } else {
      const data = await response.json();
      setMessage(data.error || 'An error occurred');
    }
  };

  const openModal = () => {
    setModalOpen(true);
  };
  const openFormModal = () => {
    setFormModalOpen(true);
  };
  const handleShowDashboard = () => {
    setShowDashboard(true);
  }

  const handleShowSophos = () => {
      setShowDashboard(false);
      setShowQradar(false);
      setShowCrowdstrike(false);
      setShowSophos(true);
      setShowTickets(false);
  }
  const handleShowQradar = () => {
    // if(showQradar){
    //   setShowQradar(false);
    //   }else{
      setShowDashboard(false);
        setShowQradar(true);
        setShowCrowdstrike(false);
        setShowSophos(false);
        setShowTickets(false);
      //}
  }
  const handleShowCrowdstrike = () => {
    // if(showCrowdstrike){
    //   setShowCrowdstrike(false);
    //   }else{
      setShowDashboard(false);
        setShowQradar(false);
        setShowCrowdstrike(true);
        setShowSophos(false);
      //}
      setShowTickets(false);
  }
  const closeModal = () => {
    setModalOpen(false);
    
  };
  const closeFormModal = () => {
    setFormModalOpen(false);
    
  };
  const handleShowRegistrationModal = () => {
    setShowRegistrationModal(true);
  }

  const handleShowChangePasswordModal = () => {
    setShowChangePasswordModal(true);
  }
  const handleHideChangePasswordModal = () => {
    setShowChangePasswordModal(false);
  }

  const handleHideRegistrationModal = () => {
    setShowRegistrationModal(false);
  }
  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };
  const loadNewGraph = (text) => {
    setOffenceStatus(text);
  };

  const loadNewGraph0 = (text) => {
    setFalsePositive(text);
  };

  const handleChkChange = () => {
    setEditable(!editable);
    setInputValue(editable ? "" : time);
  };

  const handleInpChange = (e) => {
    setInputValue(e.target.value);
  };
const handleInputChange = (e) => {
  const {name,value} = e.target;
  if(showQradar){
  setFormData({
    ...formData,
    [name]:value,
  });
}else if(showCrowdstrike){
  setCrowdstrikeFormData({
    ...crowdstrikeFormData,
    [name]:value,
  });
}
else if(showSophos){
  setSophosFormData({
    ...sophosFormData,
    [name]:value,
  });
}
}
const handleRegInputChange = (e) => {
  const {name,value} = e.target;
  //setLoggedInEmail(e.target.value);
  setUserFormData({
    ...userFormData,
    [name]:value,
  });
}
const API_CHANGE_PASSWORD = "http://localhost:3001/api/change-password/";
const API_URL = "http://localhost:3001/api/saveFormData";
const API_URL_SOPHOS_FORM = "http://localhost:3001/api/saveSophosFormData";
const API_URL_CROWDSTRIKE_FORM = "http://localhost:3001/api/saveCrowdstrikeFormData";
const API_URL_USER = "http://localhost:3001/api/users";
const API_URL_USER_LOGIN = "http://localhost:3001/api/login";
const API_URL_USER_FETCH = "http://localhost:3001/api/user/"
const API_URL_SEARCH = "http://localhost:3001/api/search-data/"
const API_URL_DOWNLOAD = "http://localhost:3001/api/download/"

const handleLogin = async (e) => {
  e.preventDefault();
  setShowRegistrationModal(true);
  const userFormData = {
    regname: e.target.regname.value, 
    regemail: e.target.regemail.value,
    regpassword: e.target.regpassword.value,
    role: e.target.role.value

  };

  try {
    const response = await fetch(API_URL_USER, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userFormData),
    });

    if (response.status === 201) {
      alert("Registered successfully");
    } else {
      alert("Error saving form data");
    }
  } catch (error) {
    alert("Network error:", error);
  }
  //setLoggedIn(true);
};
const handleLogout = () => {
  localStorage.clear();
  localStorage.removeItem(SESSION_KEY);
  setLoggedIn(false);
  setLoggedInEmail("");
  setUserData(null);
  setIsAdmin(false);
  window.location.reload();

};

const handleShowTickets = () => {
  setShowDashboard(false);
  setShowQradar(false);
  setShowCrowdstrike(false);
  setShowSophos(false);
//}
setShowTickets(true);
}
const handleFormSubmit = async (e) => {
    e.preventDefault();
    const incidentDateParts = e.target.incidentTime.value.split(" ");
    const closeDateParts = e.target.closeTime.value.split(" ");
    const incidenttime = incidentDateParts[3];
    const closetime = closeDateParts[3];
    const [startHours, startMinutes] = incidenttime.split(":").map(Number);
    const [endHours, endMinutes] = closetime.split(":").map(Number);
    const timeDiff = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
    let sl;
    if (timeDiff > 15) {
       sl = "Breached";
    } else {
       sl = timeDiff+" minutes";
    }
    const formData = {
      _id: e.target.ticketID.value, 
      engineer: userData.username,
      sourceIP: e.target.sourceIP.value,
      sourcePort: e.target.sourcePort.value,
      destinationIP: e.target.destinationIP.value,
      destinationPort: e.target.destinationPort.value,
      dateAndTime: inputValue,
      closeTime: e.target.closeTime.value,
      engineerName: e.target.engineerName.value, 
      offenceID: e.target.offenceID.value,
      incidentType: e.target.incidentType.value,
      sla: sl,
      incidentTime: e.target.incidentTime.value,
      shiftName: e.target.shiftName.value,
      escalatedTime: e.target.escalatedTime.value, 
      lastUsername: e.target.lastUsername.value,
      location: e.target.location.value, 
      offenceDesc: e.target.offenceDesc.value,
      resolvedBy: selectedResol,
      comments: e.target.comments.value,
      response: e.target.response.value, 
      handledBy: selectedHandl,
      status:status,
      falsePositive: falsePos,
      ticketCloserUpdate: e.target.ticketCloserUpdate.value
    };
  
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.status === 201) {
        alert("Form data saved successfully");
        setFormData({});
      } else {
        alert("Error saving form data");
      }
    } catch (error) {
      alert("Network error:", error);
    }
};
const handleSophosFormSubmit = async (e) => {
  e.preventDefault();
  const incidentDateParts = e.target.firstTimeToResponse.value.split(" ");
  const closeDateParts = e.target.closedDateAndTime.value.split(" ");
  const incidenttime = incidentDateParts[3];
  const closetime = closeDateParts[3];

  const [startHours, startMinutes] = incidenttime.split(":").map(Number);
  const [endHours, endMinutes] = closetime.split(":").map(Number);
  const timeDiff = (endHours * 60 + endMinutes) - (startHours * 60 + startMinutes);
  let sl;
  if (timeDiff > 15) {
     sl = "Breached";
  } else {
     sl = timeDiff+" minutes";
  }
  //console.log(sl);
  const sophosFormData = {
    _id: e.target.ticketID.value, 
    engineer: userData.username,
    location: e.target.location.value, 
    escalatedTime: e.target.escalatedTime.value, 
    escalatedBy: e.target.escalatedBy.value, 
    severity: e.target.severity.value, 
    userDetails: e.target.userDetails.value, 
    deviceName: e.target.deviceName.value, 
    sla: sl,
    firstTimeToResponse: e.target.firstTimeToResponse.value, 
    responseStatus: e.target.responseStatus.value,
    escalatedTo: escalatedTo,
    closedDateAndTime:e.target.closedDateAndTime.value,
    resolution:resolution,
    itVal:itVal,
    dateAndTime: inputValue,
    alertCategory: e.target.alertCategory.value,
    alertTime: e.target.alertTime.value,
    shiftName: e.target.shiftName.value,
    offenceDesc: e.target.offenceDesc.value,
    comments: e.target.comments.value,
    status:status,
  };

  try {
    const response = await fetch(API_URL_SOPHOS_FORM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(sophosFormData),
    });

    if (response.status === 201) {
      alert("Form data saved successfully");

    } else {
      alert("Error saving form data");
    }
  } catch (error) {
    alert("Network error:", error);
  }
};
const handleSearchBtn = async (e) => {
  setSearchBtn(true);
}
const handleCrowdstrikeFormSubmit = async (e) => {
  e.preventDefault();

  const crowdstrikeFormData = {
    _id: e.target.ticketID.value, 
    engineer: userData.username,
    hostName: e.target.hostName.value,
    OS: e.target.OS.value,
    dateAndTime: inputValue,
    userName: e.target.userName.value,
    severity: e.target.severity.value,
    objective: e.target.objective.value,
    tacticAndTech: e.target.tacticAndTech.value,
    techID: e.target.techID.value,
    cmdLine: e.target.cmdLine.value,
    filePath: e.target.filePath.value,
    escalatedBy: e.target.escalatedBy.value,
    comments: e.target.comments.value,
    localIP: e.target.localIP.value,
    status: status

  };

  try {
    const response = await fetch(API_URL_CROWDSTRIKE_FORM, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(crowdstrikeFormData),
    });

    if (response.status === 201) {
      alert("Form data saved successfully");
    } else {
      alert("Error saving form data");
    }
  } catch (error) {
    alert("Network error:", error);
  }
};
const handleLoginRequest = async (e) => {
    e.preventDefault();
    
    const loginData = {
      regemail: e.target.loginemail.value ,
      regpassword: e.target.loginpassword.value, 
     // role: userData.role
    };
    setLoggedInEmail(loginData.regemail);

    try {
      const response = await fetch(API_URL_USER_LOGIN, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(loginData),
      });


      if (response.status === 200) {

        const userResponse = await fetch(API_URL_USER_FETCH + loginData.regemail);

        if (userResponse.status === 200) {
          const contentType = userResponse.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await userResponse.json();
            setUserData(data);
            if(data.role==="admin"){
              setIsAdmin(true);
              localStorage.setItem('userRole', 'admin');

            }
          }
        }
        setLoggedIn(true);
        fetchUserData(loginData.regemail);
        //setLoggedInEmail(loginData.regemail);
        if(userData.role==="admin"){
          setIsAdmin(true);

        }
      localStorage.setItem(SESSION_KEY, JSON.stringify({
          loginTime: Date.now(),
          userEmail: loginData.regemail,
          //role: loginData.role,
        }));
      } else {
      }
    } catch (error) {
      console.error("Network error:", error);
    }
};

const fetchUserData = async (username) => {
  try {
    const response = await fetch(API_URL_USER_FETCH + username);

    if (response.status === 200) {
      const contentType = response.headers.get("content-type");
      if (contentType && contentType.includes("application/json")) {
        const data = await response.json();
        setUserData(data);
      } else {
        console.error("Response is not valid JSON");
      }
    } else if (response.status === 404) {
      console.log("User not found");
    } else {
      console.error("Error fetching user data");
    }
  } catch (error) {
    console.error("Network error:", error);
  }
};

const downloadResultsAsExcel = (tool,searchFormResult) => {
  if (searchFormResult && searchFormResult.length > 0) {
  const ws = XLSX.utils.json_to_sheet(searchFormResult);
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'SearchResults');
  if(tool==="Qradar"){
  XLSX.writeFile(wb, 'Qradar ('+time+').xlsx');
  }else if(tool==="Sophos"){
    XLSX.writeFile(wb, 'Sophos ('+time+').xlsx');
  }else if(tool==="Crowdstrike"){
    XLSX.writeFile(wb, 'Crowdstrike ('+time+').xlsx');
  }else{
    alert("Select a Tool");
  }
  }else{
    alert('No data to export to Excel');
  }
};
const [prefix, id] =searchInput.split(":").map(String);
const handleSearch = async (e) => {
  e.preventDefault();
  setModalOpen(true);
  if (searchInput) {
    try {
      const response = await fetch(API_URL_SEARCH+searchInput);
      
      if (response.status === 200) {
        const contentType = response.headers.get("content-type");
        if (contentType && contentType.includes("application/json")) {
          const data = await response.json();
          const searchResultsArray = Array.isArray(data) ? data : [data];
          setSearchResult(searchResultsArray);
         // openModal();
        } else {
          console.error("Response is not valid JSON");
          setSearchResult(null);
        }
      } else if (response.status === 404) {
        setSearchResult(null);
        alert("Form data not found");
      } else {
        alert("Error searching form data");
        setSearchResult(null);
      }
    } catch (error) {
      alert("Network error:", error);
      setSearchResult(null);
    }
  }};
  const handleDownload = async (e) => {
    e.preventDefault();
    let tool;
    if(showQradar){
      tool="Qradar";
    }else if(showSophos){
      tool="Sophos";
    }else if(showCrowdstrike){
      tool="Crowdstrike";
    }

    //setModalOpen(true);
    
      try {
        const response = await fetch(API_URL_DOWNLOAD+tool);

        if (response.status === 200) {
          const contentType = response.headers.get("content-type");
          if (contentType && contentType.includes("application/json")) {
            const data = await response.json();
            const searchFormResultsArray = Array.isArray(data) ? data : [data];
            setSearchFormResult(searchFormResultsArray);
            downloadResultsAsExcel(tool,searchFormResultsArray);
           // openModal();
          } else {
            console.error("Response is not valid JSON");
            setSearchFormResult(null);
          }
        } else if (response.status === 404) {
          setSearchFormResult(null);
          alert("Form data not found (or) Not selected any Tool");
        } else {
          console.error("Error searching form data");
          setSearchFormResult(null);
        }
      } catch (error) {
        console.error("Network error:", error);
        setSearchFormResult(null);
      }

    };
useEffect(() => {
  if (loggedIn && loggedInEmail) {
    fetchUserData(loggedInEmail);
  }
}, [loggedIn, loggedInEmail]);

const handleShowRegistrationForm = async (e) => {
  setShowRegistrationForm(true);

}
const handleStatusUpdate = async (id, status) => {
  try {
    const response = await fetch(`http://localhost:3001/api/update-status/${searchInput}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (response.status === 200) {
      setIsEditMode(false);
      setIsSophosEditMode(false);
      setIsCrowdstrikeEditMode(false);
    }
  } catch (error) {
    alert('Error updating status:', error);
  }
};
const handleStatusUpdateFromShowTickets = async (id, status, tool) => {
  try {
    const response = await fetch(`http://localhost:3001/api/update-status/${tool}/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ status }),
    });

    if (response.status === 200) {
      setIsEditMode(false);
      setIsSophosEditMode(false);
      setIsCrowdstrikeEditMode(false);
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

const SESSION_KEY = "userSession";

useEffect(() => {

  const handleUserActivity = () => {
    const storedSession = localStorage.getItem(SESSION_KEY);

    if (storedSession) {
      const session = JSON.parse(storedSession);
      const { loginTime, userEmail, role } = session;

      setLoggedIn(true);
      setLoggedInEmail(userEmail);
      if (role === "admin") {
        setIsAdmin(true);
      }

      localStorage.setItem(SESSION_KEY, JSON.stringify({
        loginTime: Date.now(),
        userEmail,
        role,
      }));
    }
  };

  const checkSession = () => {
    const storedSession = localStorage.getItem(SESSION_KEY);

    if (storedSession) {
      const session = JSON.parse(storedSession);
      const { loginTime, userEmail, role } = session;

      const currentTime = Date.now();
      if (currentTime - loginTime < 15*60 * 1000) {
        setLoggedIn(true);
        setLoggedInEmail(userEmail);
        if (role === "admin") {
          setIsAdmin(true);
        }
      } else {
        localStorage.removeItem(SESSION_KEY);
        setLoggedIn(false);
        setLoggedInEmail("");
        setIsAdmin(false);
        window.location.reload();

      }
    }
  };

  const interval = setInterval(checkSession, 60*1000 ); 
  checkSession();

  document.addEventListener('mousemove', handleUserActivity);
  document.addEventListener('keydown', handleUserActivity);

  return () => {
    clearInterval(interval);
    document.removeEventListener('mousemove', handleUserActivity);
    document.removeEventListener('keydown', handleUserActivity);
  };
}, []);

useEffect(() => {
  const storedUserRole = localStorage.getItem('userRole');
  if (storedUserRole === 'admin') {
    setIsAdmin(true);
    setShowQradar(false);
    setShowDashboard(true);
  }
}, []);

return (
    <div className= 'outer-cover'>
    {loggedIn ? (
      <div>
        <Navbar 
            onSearchInputChange={(e) => setSearchInput(e.target.value)}
            onSearch={handleSearch}
            onShowTickets={handleShowTickets}
            onDash={handleShowDashboard}
            isAdmin={isAdmin}
            logout={handleLogout}
            onRegister={handleShowRegistrationModal}
            Sophos={handleShowSophos}
            Qradar={handleShowQradar}
            Crowdstrike={handleShowCrowdstrike}
            //xl={downloadResultsAsExcel}
            onDownload={handleDownload}
            onChange={handleShowChangePasswordModal}
        />
      {isAdmin ? (
        <>
        {showDashboard ? (          
          <Dashboard userData={userData} loggedInEmail={loggedInEmail} isOpen={isFormModalOpen} setIsOpen={setFormModalOpen} closeModal={closeFormModal}/>
        
        ):(<>
          {showQradar && (
        <Qradar 
        location={location}
        setLocation={setLocation}
        shift={shift}
        setShift={setShift}
          handleChkChange={handleChkChange}
          handleFormSubmit={handleFormSubmit}
          handleInpChange={handleInpChange}
          selectedHandl={selectedHandl}
          formData={formData}
          handleInputChange={handleInputChange}
          editable={editable}
          inputValue={inputValue}
          selectedResol={selectedResol}
          status={status}
          falsePos={falsePos}
          userData={userData}
          loggedInEmail={loggedInEmail}
          setSelectedHandl={setSelectedHandl}
          setFalsePos={setFalsePos}
          setSelectedResol={setSelectedResol}
          setStatus={setStatus}
        />
      )}

      {showCrowdstrike && (
        <Crowdstrike 
          handleChkChange={handleChkChange}
          handleFormSubmit={handleCrowdstrikeFormSubmit}
          handleInpChange={handleInpChange}
          selectedHandl={selectedHandl}
          formData={crowdstrikeFormData}
          handleInputChange={handleInputChange}
          editable={editable}
          inputValue={inputValue}
          selectedResol={selectedResol}
          status={status}
          falsePos={falsePos}
          userData={userData}
          loggedInEmail={loggedInEmail}
          setSelectedHandl={setSelectedHandl}
          setFalsePos={setFalsePos}
          setSelectedResol={setSelectedResol}
          setStatus={setStatus}
        />
      )}
       
      {showSophos && (
        <Sophos 
                location={location}
        setLocation={setLocation}
        shift={shift}
        setShift={setShift}
          setItVal={setItVal}
          itVal={itVal}
          setResolution={setResolution}
          resolution={resolution}
          handleChkChange={handleChkChange}
          handleFormSubmit={handleSophosFormSubmit}
          handleInpChange={handleInpChange}
          selectedHandl={selectedHandl}
          formData={sophosFormData}
          handleInputChange={handleInputChange}
          editable={editable}
          inputValue={inputValue}
          selectedResol={selectedResol}
          status={status}
          escalatedTo={escalatedTo}
          falsePos={falsePos}
          userData={userData}
          loggedInEmail={loggedInEmail}
          setSelectedHandl={setSelectedHandl}
          setFalsePos={setFalsePos}
          setSelectedResol={setSelectedResol}
          setStatus={setStatus}
          setEscalatedTo={setEscalatedTo}
        />
      )}
      {showTickets && (
        <ShowTickets userData={userData} handleStatusUpdate={handleStatusUpdateFromShowTickets}/>
      )}
      </>
      )}
        </>
      ) : (
        <>
      {showQradar && (
        <Qradar 
                location={location}
        setLocation={setLocation}
        shift={shift}
        setShift={setShift}
          handleChkChange={handleChkChange}
          handleFormSubmit={handleFormSubmit}
          handleInpChange={handleInpChange}
          selectedHandl={selectedHandl}
          formData={formData}
          handleInputChange={handleInputChange}
          editable={editable}
          inputValue={inputValue}
          selectedResol={selectedResol}
          status={status}
          falsePos={falsePos}
          userData={userData}
          loggedInEmail={loggedInEmail}
          setSelectedHandl={setSelectedHandl}
          setFalsePos={setFalsePos}
          setSelectedResol={setSelectedResol}
          setStatus={setStatus}
        />
      )}

      {showCrowdstrike && (
        <Crowdstrike 
          handleChkChange={handleChkChange}
          handleFormSubmit={handleCrowdstrikeFormSubmit}
          handleInpChange={handleInpChange}
          selectedHandl={selectedHandl}
          formData={crowdstrikeFormData}
          handleInputChange={handleInputChange}
          editable={editable}
          inputValue={inputValue}
          selectedResol={selectedResol}
          status={status}
          falsePos={falsePos}
          userData={userData}
          loggedInEmail={loggedInEmail}
          setSelectedHandl={setSelectedHandl}
          setFalsePos={setFalsePos}
          setSelectedResol={setSelectedResol}
          setStatus={setStatus}
        />
      )}
       
      {showSophos && (
        <Sophos 
                location={location}
        setLocation={setLocation}
        shift={shift}
        setShift={setShift}
          setItVal={setItVal}
          itVal={itVal}
          setResolution={setResolution}
          resolution={resolution}
          handleChkChange={handleChkChange}
          handleFormSubmit={handleSophosFormSubmit}
          handleInpChange={handleInpChange}
          selectedHandl={selectedHandl}
          formData={sophosFormData}
          handleInputChange={handleInputChange}
          editable={editable}
          inputValue={inputValue}
          selectedResol={selectedResol}
          status={status}
          escalatedTo={escalatedTo}
          falsePos={falsePos}
          userData={userData}
          loggedInEmail={loggedInEmail}
          setSelectedHandl={setSelectedHandl}
          setFalsePos={setFalsePos}
          setSelectedResol={setSelectedResol}
          setStatus={setStatus}
          setEscalatedTo={setEscalatedTo}
        />
      )}
      {showTickets && (
        <ShowTickets userData={userData} handleStatusUpdate={handleStatusUpdateFromShowTickets} />
      )}
      </>
      )}
      <Modal isOpen={isModalOpen} closeModal={closeModal}>

        {searchResult &&
          searchResult.map((result) => (
            <div key={result._id}>
            {prefix === 'QRADAR' && (
        <>
              <p>TicketID : {result._id}</p>
              <p>Souce IP : {result.sourceIP}</p>
              <p>Souce Port : {result.sourcePort}</p>

              <p>Destination IP : {result.destinationIP}</p>
              <p>Destination Port : {result.destinationPort}</p>

              <p>Date and Time : {result.dateAndTime}</p>
              <p>Offence ID : {result.offenceID}</p>
              <p>Incident Type : {result.incidentType}</p>
              <p>Incident Time : {result.incidentTime}</p>
              <p>Shift Name : {result.shiftName}</p>
              <p>Escalated Time : {result.escalatedTime}</p>

              <p>Last Username : {result.lastUsername}</p>
              <p>Close Time : {result.closeTime}</p>
              <p>Location : {result.location}</p>

              <p>Offence Description : {result.offenceDesc}</p>
              <p>Resolved By : {result.resolvedBy}</p>
              <p>Comments : {result.comments}</p>
              <p>Response : {result.response}</p>

              <p>Handled By : {result.handledBy}</p>
              {/* <p>Status : {result.status}</p> */}
              {isEditMode ? (
            <select
              value={editableStatus}
              onChange={(e) => setEditableStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="Close">Resolved</option>
            </select>
          ) : (
            <p>
              Status: {editableStatus ? editableStatus : result.status}
              <button style={{marginLeft:"3px"}} className="btn btn-outline-info" onClick={() => setIsEditMode(true)}>Edit</button>
            </p>
          )}
          {isEditMode && (
            <button onClick={() => handleStatusUpdate(result._id, editableStatus)}>
              Save
            </button>
          )}
              <p>False Positive : {result.falsePositive}</p>
              <p>Ticket Closer Update : {result.ticketCloserUpdate}</p>

        </>
      )}

      {prefix === 'SOPHOS' && (
        <>
              <p>TicketID : {result._id}</p>
              <p>Date and Time : {result.dateAndTime}</p>
              <p>Shift Name : {result.shiftName}</p>
              <p>Alert Category : {result.alertCategory}</p>
              <p>Alert Time : {result.alertTime}</p>
              <p>Severity : {result.severity}</p>
              <p>User Details : {result.userDetails}</p>
              <p>Device Name : {result.deviceName}</p>
              <p>First Time To Response : {result.firstTimeToResponse}</p>
              <p>Response Status : {result.responseStatus}</p>
              <p>Escalated To : {result.escalatedTo}</p>
              <p>Close Time : {result.closedDateAndTime}</p>
              <p>Resolution : {result.resolution}</p>
              <p>IT Validation : {result.itVal}</p>
              <p>Escalated Time : {result.escalatedTime}</p>
              <p>Escalated By : {result.escalatedBy}</p>
              <p>Location : {result.location}</p>
              <p>Offence Description : {result.offenceDesc}</p>
              <p>Comments : {result.comments}</p>
              {isSophosEditMode ? (
            <select
              value={sophosEditableStatus}
              onChange={(e) => setSophosEditableStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="Close">Resolved</option>
            </select>
          ) : (
            <p>
              Status: {sophosEditableStatus ? sophosEditableStatus : result.status}
              <button onClick={() => setIsSophosEditMode(true)}>Edit</button>
            </p>
          )}
          {isSophosEditMode && (
            <button style={{marginLeft:"3px"}} className="btn btn-outline-info" onClick={() => handleStatusUpdate(result._id, sophosEditableStatus)}>
              Save
            </button>
          )}
        </>
      )}

      {prefix === 'CROWDSTRIKE' && (
        <>
          <p>Ticket ID : {result._id}</p>
          <p>Host Name : {result.hostName}</p>
          <p>OS : {result.OS}</p>
          <p>Date And Time : {result.dateAndTime}</p>
          <p>Username : {result.userName}</p>
          <p>Severity : {result.severity}</p>
          <p>Objective : {result.objective}</p>
          <p>Tactic And Technology : {result.tacticAndTech}</p>
          <p>Technique ID : {result.techID}</p>
          <p>Command Line : {result.cmdLine}</p>
          <p>File Path : {result.filePath}</p>
          <p>Escalated By : {result.escalatedBy}</p>
          <p>Comments: {result.comments}</p>
          <p>Local IP: {result.localIP}</p>
          {isCrowdstrikeEditMode ? (
            <select
              value={crowdstrikeEditableStatus}
              onChange={(e) => setCrowdstrikeEditableStatus(e.target.value)}
            >
              <option value="Open">Open</option>
              <option value="Close">Resolved</option>
            </select>
          ) : (
            <p>
              Status: {crowdstrikeEditableStatus ? crowdstrikeEditableStatus : result.status}
              <button onClick={() => setIsCrowdstrikeEditMode(true)}>Edit</button>
            </p>
          )}
          {isCrowdstrikeEditMode && (
            <button style={{marginLeft:"3px"}} className="btn btn-outline-info" onClick={() => handleStatusUpdate(result._id, crowdstrikeEditableStatus)}>
              Save
            </button>
          )}
        </>
      )}
            </div>
          ))
        }
      </Modal>
      
      </div>
    ) : (
        
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
              </ul>
            </div>
            <div className="card-body">
                <form action="/login" method="POST" onSubmit={handleLoginRequest}>
                  <div className="form-group">
                    <label htmlFor="loginEmail">Email</label>
                    <input type="email" name="loginemail" value={userFormData.loginemail} className="form-control" id="loginEmail" onChange={handleRegInputChange} placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="loginPassword">Password</label>
                    <input type="password" name="loginpassword" value={userFormData.loginpassword} className="form-control" id="loginPassword" onChange={handleRegInputChange} placeholder="Enter your password" />
                  </div>
                  <button type="submit" className="btn btn-primary" style={{marginTop:"10px"}}>Login</button>
                </form>

            </div>
          </div>
        </div>
      </div>
        </div>
      )}
              {showRegistrationModal && (
          
          <RegisterModal closeModal={handleHideRegistrationModal}>
                <h1>Register</h1>
                <form action="/register" method="POST" onSubmit={handleLogin} >
                  <div className="form-group">
                    <label htmlFor="registerName">Name</label>
                    <input type="text" name="regname" value={userFormData.regname} className="form-control" id="registerName" onChange={handleRegInputChange} placeholder="Enter your name" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registerEmail">Email</label>
                    <input type="email" name="regemail" value={userFormData.regemail} className="form-control" id="registerEmail" onChange={handleRegInputChange} placeholder="Enter your email" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="role">Role</label>
                    <input type="text" name="role" value={userFormData.role} className="form-control" id="registerEmroleail" onChange={handleRegInputChange} placeholder="Enter your role" />
                  </div>
                  <div className="form-group">
                    <label htmlFor="registerPassword">Password</label>
                    <input type="password" name="regpassword" value={userFormData.regpassword} className="form-control" id="registerPassword" onChange={handleRegInputChange} placeholder="Choose a password" />
                  </div>
                  <button type="submit" style={{marginTop:"10px"}} className="btn btn-success">Register</button>
                </form>
     
              </RegisterModal>
            )}
            {showChangePasswordModal && (
              <RegisterModal closeModal={handleHideChangePasswordModal}>
              <h1>Change Password</h1>
              <form style={{padding:"10px"}}>
              <div className="form-group">
              <label htmlFor="oldPassword">Old Password</label>
                <input
                className="form-control"
                  type="password"
                  placeholder="Old Password"
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                />
                </div>
                <div className="form-group">
                    <label htmlFor="newPassword">New Password</label>
                <input
                className="form-control"
                  type="password"
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                </div>
                <div className="form-group">
                    <label htmlFor="confirmNewPassword">Confirm New Password</label>
                <input
                className="form-control"
                  type="password"
                  placeholder="Confirm New Password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                </div>
                <button type="submit" style={{marginTop:"5px"}} className="btn btn-success" onClick={handleChangePassword}>Change Password</button>
                <div>{message}</div>
              </form>
              </RegisterModal>
            )}
    </div>
  
  )
}

export default App;