import React, { useState, useEffect } from "react";

const ShowTickets = ({ userData, handleStatusUpdate }) => {
  const API_URL_SHOW_TICKETS = "http://localhost:3001/api/open-tickets/";

  const [openQradarTickets, setOpenQradarTickets] = useState([]);
  const [openSophosTickets, setOpenSophosTickets] = useState([]);
  const [openCrowdstrikeTickets, setOpenCrowdstrikeTickets] = useState([]);

  const handleTicketStatusChange = (ticketId, value, tool) => {
    const ticketsMap = {
      QRADAR: setOpenQradarTickets,
      SOPHOS: setOpenSophosTickets,
      CROWDSTRIKE: setOpenCrowdstrikeTickets,
    };

    ticketsMap[tool]((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, editableStatus: value } : ticket
      )
    );
  };

  const handleEditClick = (ticketId, tool) => {
    const ticketsMap = {
      QRADAR: setOpenQradarTickets,
      SOPHOS: setOpenSophosTickets,
      CROWDSTRIKE: setOpenCrowdstrikeTickets,
    };

    ticketsMap[tool]((prevTickets) =>
      prevTickets.map((ticket) =>
        ticket._id === ticketId ? { ...ticket, isEditMode: true } : ticket
      )
    );
  };

  useEffect(() => {
    const fetchOpenTickets = async () => {
      try {
        const response = await fetch(
          API_URL_SHOW_TICKETS + userData.username
        );
        if (response.status === 200) {
          const data = await response.json();
          setOpenSophosTickets(data.openSophosTickets);
          setOpenCrowdstrikeTickets(data.openCrowdstrikeTickets);
          setOpenQradarTickets(data.openQradarTickets);
        } else {
          console.error("Error fetching open tickets");
        }
      } catch (error) {
        console.error("Network error:", error);
      }
    };

    fetchOpenTickets();
  }, []);

  return (
    <div>
      <div className="note">
        <h2>Total Open Qradar Tickets: {openQradarTickets.length}</h2>
        <ul>
          {openQradarTickets.map((ticket) => (
            <li key={ticket._id}>
              <p>Ticket ID: {ticket._id}</p>
              <p>Engineer Name: {ticket.engineer}</p>
              <p>Status: {ticket.status}</p>
              <p>Comments: {ticket.comments}</p>
              {ticket.isEditMode ? (
                <div>
                  <select
                    value={ticket.editableStatus}
                    onChange={(e) =>
                      handleTicketStatusChange(
                        ticket._id,
                        e.target.value,
                        "QRADAR"
                      )
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="Close">Resolved</option>
                  </select>
                  <button
                    style={{ marginLeft: "3px" }}
                    className="btn btn-outline-info"
                    onClick={() => {
                      handleStatusUpdate(ticket._id, ticket.editableStatus, "QRADAR");
                      setOpenQradarTickets((prevTickets) =>
                        prevTickets.map((t) =>
                          t._id === ticket._id ? { ...t, isEditMode: false } : t
                        )
                      );
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p>
                  Status: {ticket.editableStatus ? ticket.editableStatus : ticket.status}
                  <button
                    style={{ marginLeft: "3px" }}
                    className="btn btn-outline-info"
                    onClick={() => handleEditClick(ticket._id, "QRADAR")}
                  >
                    Edit
                  </button>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="note">
        <h2>Total Open Sophos Tickets: {openSophosTickets.length}</h2>
        <ul>
          {openSophosTickets.map((ticket) => (
            <li key={ticket._id}>
              <p>Ticket ID: {ticket._id}</p>
              <p>Engineer Name: {ticket.engineer}</p>
              <p>Status: {ticket.status}</p>
              <p>Comments: {ticket.comments}</p>
              {ticket.isEditMode ? (
                <div>
                  <select
                    value={ticket.editableStatus}
                    onChange={(e) =>
                      handleTicketStatusChange(
                        ticket._id,
                        e.target.value,
                        "SOPHOS"
                      )
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="Close">Resolved</option>
                  </select>
                  <button
                    style={{ marginLeft: "3px" }}
                    className="btn btn-outline-info"
                    onClick={() => {
                      handleStatusUpdate(ticket._id, ticket.editableStatus, "SOPHOS");
                      setOpenSophosTickets((prevTickets) =>
                        prevTickets.map((t) =>
                          t._id === ticket._id ? { ...t, isEditMode: false } : t
                        )
                      );
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p>
                  Status: {ticket.editableStatus ? ticket.editableStatus : ticket.status}
                  <button
                    style={{ marginLeft: "3px" }}
                    className="btn btn-outline-info"
                    onClick={() => handleEditClick(ticket._id, "SOPHOS")}
                  >
                    Edit
                  </button>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>

      <div className="note">
        <h2>Total Open Crowdstrike Tickets: {openCrowdstrikeTickets.length}</h2>
        <ul>
          {openCrowdstrikeTickets.map((ticket) => (
            <li key={ticket._id}>
              <p>Ticket ID: {ticket._id}</p>
              <p>Engineer Name: {ticket.engineer}</p>
              <p>Status: {ticket.status}</p>
              <p>Comments: {ticket.comments}</p>
              {ticket.isEditMode ? (
                <div>
                  <select
                    value={ticket.editableStatus}
                    onChange={(e) =>
                      handleTicketStatusChange(
                        ticket._id,
                        e.target.value,
                        "CROWDSTRIKE"
                      )
                    }
                  >
                    <option value="Open">Open</option>
                    <option value="Close">Resolved</option>
                  </select>
                  <button
                    style={{ marginLeft: "3px" }}
                    className="btn btn-outline-info"
                    onClick={() => {
                      handleStatusUpdate(ticket._id, ticket.editableStatus, "CROWDSTRIKE");
                      setOpenCrowdstrikeTickets((prevTickets) =>
                        prevTickets.map((t) =>
                          t._id === ticket._id ? { ...t, isEditMode: false } : t
                        )
                      );
                    }}
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p>
                  Status: {ticket.editableStatus ? ticket.editableStatus : ticket.status}
                  <button
                    style={{ marginLeft: "3px" }}
                    className="btn btn-outline-info"
                    onClick={() => handleEditClick(ticket._id, "CROWDSTRIKE")}
                  >
                    Edit
                  </button>
                </p>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ShowTickets;
