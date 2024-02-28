import React from 'react';

const FormModal = ({ isOpen, closeModal, children }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
      {children}
        <button onClick={closeModal} className="modal-close-button btn btn-danger">
          Close
        </button>
        
      </div>
    </div>
  );
};

export default FormModal;