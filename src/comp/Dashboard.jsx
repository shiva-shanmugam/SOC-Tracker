import React, { useState, useEffect } from 'react';
import UserFormDetails from './UserFormDetails';

function Dashboard({loggedInEmail , isOpen,closeModal,setIsOpen}) {
  const [userDetails, setUserDetails] = useState([]);
  const [formDetails, setFormDetails] = useState([]);
  const [sophosFormDetails, setSophosFormDetails] = useState([]);

  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const API_URL_USER_DETAILS = "http://localhost:3001/api/userDetails/"
  const API_URL_USER_FORM_DETAILS = "http://localhost:3001/api/formDetails/"
  const API_URL_USER_SOPHOS_FORM_DETAILS = "http://localhost:3001/api/sophosFormDetails/"
  useEffect(() => {
    fetch(API_URL_USER_DETAILS+"admin")
      .then((response) => response.json())
      .then((data) => {
        setUserDetails(data); 
        //console.log(data)
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
  }, []);


  const showUserFormDetails = (user) => {
   // console.log(user)
    setIsOpen(true);
    fetch(API_URL_USER_SOPHOS_FORM_DETAILS+user.regname) 
      .then((response) => response.json())
      .then((data) => {
        setSophosFormDetails(data);
        //console.log(data)
        setLoading(false);
        //console.log(formDetails)
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
      fetch(API_URL_USER_FORM_DETAILS+user.regname) 
      .then((response) => response.json())
      .then((data) => {
        setFormDetails(data); 
        //console.log(data)
        setLoading(false);
        //console.log(formDetails)
      })
      .catch((error) => {
        console.error('Error fetching user details:', error);
        setLoading(false);
      });
    setSelectedUser(user.regname);
    //console.log(formDetails)

  };

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      {loading ? (
        <p>Loading user details...</p>
      ) : (
        <div >
          {userDetails.map((user) => (
            <div className='note' key={user.id}>
              <p>Name: {user.regname}</p>
              <p>Email: {user.regemail}</p>
              <p>Role: {user.role}</p>
              {/* //{console.log(formDetails)} */}

              <button className='btn btn-outline-success' onClick={() => showUserFormDetails(user)}>Show Form Details</button>
              {selectedUser === user.regname && (
                <UserFormDetails formData={formDetails} sophosFormData={sophosFormDetails} isOpen={isOpen} closeModal={closeModal} />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Dashboard;
