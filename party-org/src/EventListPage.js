import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import axios from 'axios';

const Container = styled.div`
  padding: 2rem;
  background-image: url('https://wallpapercrafter.com/desktop/97227-geometry-cyberspace-digital-art-blue-lines-abstract.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  overflow: hidden;
`;

const TitleBox = styled.div`
  background-color: rgba(0, 133, 133, 0.8);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  text-align: left;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
`;

const EventList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const ListItem = styled.li`
  cursor: pointer;
  padding: 10px;
  border: 1px solid rgba(0, 183, 235, 0.8);
  margin: 10px 0;
  border-radius: 10px;
  background-color: rgba(0, 133, 133, 0.8);
  color: white;
  font-weight: bold;
  transition: background-color 0.3s, border-color 0.3s;

  &:hover {
    background-color: rgba(0, 160, 160, 0.8);
    border-color: rgba(0, 183, 235, 1);
  }
`;

const ModalContent = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
`;

const CloseButton = styled.button`
  margin-top: 1rem;
  background-color: #f44336;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const ParticipantDetailsButton = styled.button`
  margin-left: 1rem;
  background-color: #2196F3;
  color: #fff;
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
`;

const ResponsibilitiesList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 1rem 0;
`;

const ResponsibilityItem = styled.li`
  margin: 0.5rem 0;
`;

Modal.setAppElement('#root');

function EventListPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [participantModalIsOpen, setParticipantModalIsOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedParticipant, setSelectedParticipant] = useState(null);

  useEffect(() => {
    const fetchEvents = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('http://localhost:5000/events');
        setEvents(response.data);
      } catch (error) {
        console.error('Failed to fetch events:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchEvents();
  }, []);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setModalIsOpen(true);
  };

  const closeEventModal = () => {
    setModalIsOpen(false);
    setSelectedEvent(null);
  };

  const openParticipantModal = (participant) => {
    setSelectedParticipant(participant);
    setParticipantModalIsOpen(true);
  };

  const closeParticipantModal = () => {
    setParticipantModalIsOpen(false);
    setSelectedParticipant(null);
  };

  return (
    <Container>
      <TitleBox>
        <Title>Your Events</Title>
      </TitleBox>
      <EventList>
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          events.map((event) => (
            <ListItem key={event._id} onClick={() => openEventModal(event)}>
              {event.name} - {new Date(event.date).toLocaleDateString()}
            </ListItem>
          ))
        )}
      </EventList>
      {selectedEvent && (
        <Modal
          isOpen={modalIsOpen}
          onRequestClose={closeEventModal}
          contentLabel="Event Details Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            content: {
              maxWidth: '500px',
              margin: 'auto',
              borderRadius: '0.5rem',
            },
          }}
        >
          <ModalContent>
            <h2>{selectedEvent.name}</h2>
            <p>Date: {new Date(selectedEvent.date).toLocaleDateString()}</p>

            <ResponsibilitiesList>
              {selectedEvent.participants && selectedEvent.participants.length > 0 ? (
                selectedEvent.participants.map((participant, index) => (
                  <ResponsibilityItem key={index}>
                    {participant.name} 
                    <ParticipantDetailsButton onClick={() => openParticipantModal(participant)}>
                      Details
                    </ParticipantDetailsButton>
                  </ResponsibilityItem>
                ))
              ) : (
                <ResponsibilityItem>No participants yet.</ResponsibilityItem>
              )}
            </ResponsibilitiesList>

            <CloseButton onClick={closeEventModal}>Close</CloseButton>
          </ModalContent>
        </Modal>
      )}
      {selectedParticipant && (
        <Modal
          isOpen={participantModalIsOpen}
          onRequestClose={closeParticipantModal}
          contentLabel="Participant Details Modal"
          style={{
            overlay: {
              backgroundColor: 'rgba(0, 0, 0, 0.7)',
            },
            content: {
              maxWidth: '400px',
              margin: 'auto',
              borderRadius: '0.5rem',
            },
          }}
        >
          <ModalContent>
            <h2>{selectedParticipant.name}</h2>
            {selectedParticipant.email && <p>Email: {selectedParticipant.email}</p>}
            {selectedParticipant.responsibility && <p>Responsibility: {selectedParticipant.responsibility}</p>}
            {selectedParticipant.budget && <p>Budget: {selectedParticipant.budget}</p>}
            <CloseButton onClick={closeParticipantModal}>Close</CloseButton>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default EventListPage;
