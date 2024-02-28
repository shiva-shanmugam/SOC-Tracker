import React , { useState } from 'react';
import FormModal from './FormModal';
function UserFormDetails({ formData ,sophosFormData ,isOpen,closeModal}) {
    const [userDetails, setUserDetails] = useState([]);

  return (
    <div className="user-form-details">
    <FormModal isOpen={isOpen} closeModal={closeModal}>
            <div className='col-content'>
            <div className='column'>
            <h1>QRADAR</h1>
            
          {formData.map((form) => (
            <div key={formData.id}>
              <p>Ticket ID: {form._id}</p>
              <p>SLA: {form.sla}</p>


              {/* <p>Role: {form.role}</p> */}
              </div>
          ))}
          </div>
          <div className='column'>
          <h1>SOPHOS</h1>
          {sophosFormData.map((form) => (
            <div key={sophosFormData.id}>
              <p>Ticket ID: {form._id}</p>
              <p>SLA: {form.sla}</p>


              {/* <p>Role: {form.role}</p> */}
              </div>
          ))}
          </div>
          </div>
          </FormModal>
    </div>
  );
}

export default UserFormDetails;
