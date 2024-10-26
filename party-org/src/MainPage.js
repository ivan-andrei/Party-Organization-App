import React, { useState } from 'react';
import styled from 'styled-components';
import Modal from 'react-modal';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Container = styled.div`
  padding: 2rem;
  background-image: url('https://wallpapercrafter.com/desktop/97227-geometry-cyberspace-digital-art-blue-lines-abstract.jpg');
  background-size: cover;
  background-position: center;
  min-height: 100vh;
  overflow: hidden; /* Prevent scroll on the main container */
`;

const TitleBox = styled.div`
  background-color: rgba(0, 133, 133, 0.8);
  padding: 1.5rem;
  border-radius: 0.5rem;
  box-shadow: 0 4px 15px rgba(0, 0, 0, 0.3);
  margin-bottom: 2rem;
  text-align: center;
`;

const Title = styled.h1`
  color: #fff;
  font-size: 2.5rem;
`;

const Options = styled.div`
  text-align: center;
  margin-bottom: 2rem;

  button {
    background-color: rgba(0, 133, 133, 0.9);
    color: white;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 0.5rem;
    cursor: pointer;
    margin: 0 1rem;
    font-size: 1rem;
    transition: background-color 0.3s, transform 0.2s;

    &:hover {
      background-color: rgba(0, 114, 114, 1);
      transform: translateY(-2px);
    }
  }
`;

const Button = styled.button`
  background-color: rgba(0, 133, 133, 0.9);
  color: white;
  padding: 1rem 1.5rem;
  border: none;
  border-radius: 0.5rem;
  cursor: pointer;
  display: inline-block;
  font-size: 1.1rem;
  transition: background-color 0.3s, transform 0.2s;

  &:hover {
    background-color: rgba(0, 114, 114, 1);
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  background-color: rgba(255, 0, 0, 0.9); /* Red background */
  &:hover {
    background-color: rgba(255, 0, 0, 1);
  }
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #e5e7eb;
  padding: 0.75rem;
  font-size: 1rem;
  border-radius: 0.5rem;
  width: 100%; /* Ensure it fills the width of the parent */
  box-sizing: border-box;
  margin-bottom: 0.5rem;
`;

const ModalContent = styled.div`
  padding: 2rem;
  background-color: #fff;
  border-radius: 0.5rem;
  width: 90%; /* Ensure it fills the width */
  max-width: 500px; /* Limit the modal width */
  max-height: 80vh; /* Limit the height of modal */
  overflow-y: auto; /* Allow scrolling if content exceeds height */
  overflow-x: hidden; /* Prevent horizontal scrolling */
  display: flex;
  flex-direction: column; /* Ensure content flows vertically */
  margin: 0 auto; /* Center the modal */
`;

const ButtonContainer = styled.div`
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
`;

const ParticipantList = styled.div`
  margin-bottom: 1rem;
  padding: 0.5rem;
  background-color: #f0f8ff;
  border-radius: 0.5rem;
  max-height: 150px; /* Set max height for the participant list */
  overflow-y: auto; /* Allow scrolling within the participant list */
`;

const ParticipantModalContent = styled(ModalContent)`
  max-height: 60vh; /* Set max height for participant modal */
`;

Modal.setAppElement('#root');

function MainPage() {
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [viewParticipantsModalIsOpen, setViewParticipantsModalIsOpen] = useState(false);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventBudget, setEventBudget] = useState(''); // Added budget state
  const [newParticipant, setNewParticipant] = useState({ name: '', email: '', responsibilities: '' });
  const [participants, setParticipants] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const openModal = () => {
    setModalIsOpen(true);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setEventName('');
    setEventDate('');
    setEventBudget(''); // Reset budget
    setNewParticipant({ name: '', email: '', responsibilities: '' });
    setParticipants([]);
    setModalIsOpen(false);
    document.body.style.overflow = 'auto';
  };

  const openViewParticipantsModal = () => {
    setViewParticipantsModalIsOpen(true);
  };

  const closeViewParticipantsModal = () => {
    setViewParticipantsModalIsOpen(false);
  };

  const handleAddParticipant = () => {
    if (newParticipant.name && newParticipant.email && newParticipant.responsibilities) {
      const updatedParticipants = [
        ...participants,
        {
          name: newParticipant.name,
          email: newParticipant.email,
          responsibilities: newParticipant.responsibilities.split(',').map(res => res.trim()), // Split and trim responsibilities
        },
      ];
      setParticipants(updatedParticipants);
      setNewParticipant({ name: '', email: '', responsibilities: '' }); // Reset input fields
    } else {
      alert('Please fill out all participant details.');
    }
  };  

  const handleParticipantInputChange = (field, value) => {
    setNewParticipant({ ...newParticipant, [field]: value });
  };

  const handleCreateEvent = async () => {
    if (eventName && eventDate && participants.length > 0) {
      setIsLoading(true);
      const newEvent = {
        name: eventName,
        date: new Date(eventDate).toISOString(), // Ensure date is in ISO format
        budget: eventBudget, // Add the budget here
        participants: participants.map(participant => ({
          name: participant.name,
          email: participant.email,
          responsibilities: participant.responsibilities // This should now work
        })),
      };
      try {
        const response = await axios.post('http://localhost:5000/events', newEvent);
        if (response.status !== 201) {
          throw new Error('Failed to create event');
        }
        closeModal();
        navigate('/main/events');
      } catch (error) {
        console.error('Server error creating event:', error.response?.data || error.message);
        alert('Failed to create event: ' + (error.response?.data || error.message));
      } finally {
        setIsLoading(false);
      }
    } else {
      alert('Please complete all event details and add at least one participant.');
    }
  };  

  return (
    <Container>
      <TitleBox>
        <Title>Welcome to FestiPlan!</Title>
      </TitleBox>
      <Options>
        <button onClick={openModal}>Create New Event</button>
        <Link to="/main/events">
          <button>View My Events</button>
        </Link>
      </Options>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Create Event Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            maxWidth: '500px',
            margin: 'auto',
            borderRadius: '0.5rem',
            height: 'auto', // Let the height adjust to content
            display: 'flex',
            flexDirection: 'column', // Make it column flex
            justifyContent: 'flex-start', // Align content to the start
            alignItems: 'stretch', // Stretch items to fill width
            overflowX: 'hidden', // Prevent horizontal overflow
          },
        }}
      >
        <ModalContent>
          <h2>Create Event</h2>
          <Input
            type="text"
            placeholder="Event Name"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
          />
          <Input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
          />
          <Input
            type="number"
            placeholder="Event Budget"
            value={eventBudget}
            onChange={(e) => setEventBudget(e.target.value)}
          />
          <h3>Participants</h3>
          <Button onClick={openViewParticipantsModal}>View Participants</Button>
          <Input
            type="text"
            placeholder="Participant Name"
            value={newParticipant.name}
            onChange={(e) => handleParticipantInputChange('name', e.target.value)}
          />
          <Input
            type="email"
            placeholder="Participant Email"
            value={newParticipant.email}
            onChange={(e) => handleParticipantInputChange('email', e.target.value)}
          />
          <Input
            type="text"
            placeholder="Responsibilities (comma separated)"
            value={newParticipant.responsibilities}
            onChange={(e) => handleParticipantInputChange('responsibilities', e.target.value)}
          />
          <Button onClick={handleAddParticipant}>Add Participant</Button>
          <ButtonContainer>
            <CancelButton onClick={closeModal}>Cancel</CancelButton>
            <Button onClick={handleCreateEvent} disabled={isLoading}>
              {isLoading ? 'Creating...' : 'Create Event'}
            </Button>
          </ButtonContainer>
        </ModalContent>
      </Modal>
      <Modal
        isOpen={viewParticipantsModalIsOpen}
        onRequestClose={closeViewParticipantsModal}
        contentLabel="View Participants Modal"
        style={{
          overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
          },
          content: {
            maxWidth: '400px',
            margin: 'auto',
            borderRadius: '0.5rem',
            height: 'auto',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'flex-start',
            alignItems: 'stretch',
            overflowX: 'hidden',
          },
        }}
      >
        <ParticipantModalContent>
          <h2>Participants</h2>
          <ParticipantList>
            {participants.map((participant, index) => (
              <div key={index}>
                <strong>{participant.name}</strong> - {participant.email}
                <div>
                  Responsibilities: {participant.responsibilities.join(', ')}
                </div>
              </div>
            ))}
          </ParticipantList>
          <Button onClick={closeViewParticipantsModal}>Close</Button>
        </ParticipantModalContent>
      </Modal>
    </Container>
  );
}

export default MainPage;
