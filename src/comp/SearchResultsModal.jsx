import React from 'react';

const SearchResultsModal = ({ results, onClose, onDownload }) => {
  return (
    <div className="modal-background">
      <div className="modal-content" style={{ maxHeight: '80vh', overflowY: 'auto' }}>
        <h2>Search Results</h2>
        <ul>
          {results.map((result) => (
            <li key={result._id}>{result.sourceIPAndPort}</li>
          ))}
        </ul>
        <button onClick={onDownload}>Download as Excel</button>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default SearchResultsModal;
