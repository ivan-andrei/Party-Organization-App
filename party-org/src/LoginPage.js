import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-image: url('https://wallpapercave.com/wp/wp2465954.jpg');
  background-size: cover;
  background-position: center;
`;

const FormContainer = styled.div`
  background-color: #fff;
  padding: 2rem;
  max-width: 350px;
  border-radius: 0.5rem;
  box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
  width: 100%;
`;

const FormTitle = styled.h2`
  font-size: 1.25rem;
  line-height: 1.75rem;
  font-weight: 600;
  text-align: center;
  color: #000;
`;

const InputContainer = styled.div`
  position: relative;
`;

const Input = styled.input`
  outline: none;
  border: 1px solid #e5e7eb;
  background-color: #fff;
  padding: 1.25rem;
  font-size: 0.875rem;
  line-height: 1.25rem;
  width: 100%; /* Full width of the container */
  max-width: 100%; /* Ensure it doesn't stretch beyond the container */
  border-radius: 0.5rem;
  box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
  margin: 8px 0;
  box-sizing: border-box; /* Include padding and border in width calculation */
`;


const SubmitButton = styled.button`
  display: block;
  padding: 0.75rem;
  background-color: #008585;
  color: #ffffff;
  font-size: 0.875rem;
  font-weight: 500;
  width: 100%;
  border-radius: 0.5rem;
  text-transform: uppercase;
  margin-top: 8px;
  cursor: pointer;
`;

const SignupLink = styled.p`
  color: #6B7280;
  font-size: 0.875rem;
  text-align: center;
`;

function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        email,
        password,
      });
      if (response.status === 200) {
        navigate('/main');
      } else {
        alert('Login failed');
      }
    } catch (error) {
      console.error(error);
      alert('An error occurred');
    }
  };

  return (
    <Container>
      <FormContainer>
        <FormTitle>Login</FormTitle>
        <InputContainer>
          <Input 
            type="email" 
            placeholder="Email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
          />
          <Input 
            type="password" 
            placeholder="Password" 
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </InputContainer>
        <SubmitButton onClick={handleLogin}>Login</SubmitButton>
        <SignupLink>
          Already have an account? <a href="/register">Register</a>
        </SignupLink>
      </FormContainer>
    </Container>
  );
}

export default LoginPage;
