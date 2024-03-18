import React, { useState, ChangeEvent } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import ".././styles/common.css";

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5); /* semi-transparent black background */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:9999;
`;

const ModalContent = styled.div`
  background-color: white;
 padding: 40px 20px;
  border-radius: 8px;
 width: 660px; /* Adjust the width as needed */
`;

const ModalHeader = styled.div`
  position: relative;
  text-align: center;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: -30px;
  right: -13px;
  background: none;
  border: 2px solid rgba(142, 161, 180, 1);
  cursor: pointer;
  font-size: 14px;
  width: 23px;
  height: 23px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size:12px;
  color:rgba(142, 161, 180, 1);
`;

const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  font: normal normal normal 24px Impact;
`;

const ModalSubheader = styled.div`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 80%;
  padding: 1px;
  margin-top: 10px;
  text-align: center;
  transform: translateX(12%);
  border: 1px solid #000;
  border-radius: 0;
  color: #000;
`;

const Button = styled.button`
  color: white;
  border: none;
  padding: 10px 20px;
  margin-top: 20px;
  cursor: pointer;
  border-radius: 4px;
  display: block;
  margin: 0 auto; /* Align button to center */
  margin-top: 20px;
`;

const SecondaryButton = styled(Button)`
background-color: #2d9dd8;
color: #ffffff;
border: 1px solid #000;
padding: 0px 60px;
`;

const LoginLineRight = styled.span`
display: inline-block;
    width: 95px;
    height: 2px;
    background: linear-gradient(90deg, hsla(210, 39%, 75%, 1) 0%, hsla(0, 0%, 100%, 1) 100%, hsla(0, 0%, 100%, 1) 100%);
    opacity: 1;
    vertical-align: middle;
    margin: 0 10px;
`;
const LoginLineLeft = styled.span`
display: inline-block;
    width: 95px;
    height: 2px;
    background: linear-gradient(90deg, hsla(0, 0%, 100%, 1) 0%, hsla(210, 39%, 75%, 1) 100%, hsla(0, 0%, 100%, 1) 100%);
    opacity: 1;
    vertical-align: middle;
    margin: 0 10px;
`;

interface RegisterModalProps {
  onClose: () => void; // Define the type of onClose prop
}

const RegisterModal: React.FC<RegisterModalProps> = ({ onClose }) => {
  const [formData, setFormData] = useState({
    id: '',
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  const checkUsername = async () => {
    try {
      const response = await axios.post('https://viku.space/renault/reapi.php', {
        action: 'checkUsername',
        username: formData.username
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlhdGluIn0.SXp3ID7mgUcLGYMVkvb3RJgc_tJ1hGv2NR_08s5SYNM',
          'header1': 'test'
        }
      });

      if (response.data.exists) {
        alert('Username already exists. Please choose another one.');
        return false;
      } else {
        return true;
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
      return false;
    }
  };

  const handleSubmit = async () => {
    // Validation: Check if any field is empty
    if (formData.username === '' || formData.password === '') {
      alert('Please fill in all fields.');
      return;
    }

    // Check if username already exists
    const usernameAvailable = await checkUsername();
    if (!usernameAvailable) {
      return;
    }

    // Proceed with registration if username is available
    try {
      // API Call for registration using Axios
      const response = await axios.post('https://viku.space/renault/reapi.php', {
        action: 'register',
        username: formData.username,
        password: formData.password
      }, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlhdGluIn0.SXp3ID7mgUcLGYMVkvb3RJgc_tJ1hGv2NR_08s5SYNM'
        }
      });

      // Handle API response
      console.log(response.data);
      // Close modal and show success message if API call is successful
      if (response.data.success) {
        onClose(); // Close modal
        alert('Registration successful!');
      } else {
        // Handle API response indicating failure
        alert('Registration failed. Please try again.');
      }
    } catch (error) {
      // Handle errors
      console.error('Error:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <ModalContainer>
      <ModalContent>
        <ModalHeader>
          <ModalCloseButton onClick={onClose}>&#10005;</ModalCloseButton>
          <ModalTitle>Thanks for showing interest in the Nimbus Cloud Academy. 
            <br></br>Please fill in your details. </ModalTitle>
        </ModalHeader>
        <ModalSubheader>

          {/* <div className='w-full pt-4 pb-4'>
            <LoginLineLeft>&nbsp;</LoginLineLeft>
            <LoginLineRight>&nbsp;</LoginLineRight>
          </div> */}

        </ModalSubheader>
        <InputField className='border-2 rounded-md'
          type="email"
          value={formData.username}
          onChange={handleChange}
          name="username"
          placeholder="Company email"
        />
        <InputField className='border-2 rounded-md'
          type="password"
          value={formData.password}
          onChange={handleChange}
          name="password"
          placeholder="Password"
        />
        <InputField className='border-2 rounded-md'
          type="text"
          value={formData.id}
          onChange={handleChange}
          name="id"
          placeholder="Industry"
        />
        <InputField className='border-2 rounded-md'
          type="text"
          value={formData.id}
          onChange={handleChange}
          name="id"
          placeholder="Company"
        />
        <InputField className='border-2 rounded-md'
          type="text"
          value={formData.id}
          onChange={handleChange}
          name="id"
          placeholder="Designation"
        />
        <InputField className='border-2 rounded-md'
          type="text"
          value={formData.id}
          onChange={handleChange}
          name="id"
          placeholder="Country"
        />

      <InputField className='border-2 rounded-md'
          type="text"
          value={formData.id}
          onChange={handleChange}
          name="id"
          placeholder="Dashboard"
        />

        <SecondaryButton onClick={handleSubmit}>Submit</SecondaryButton>
      </ModalContent>
    </ModalContainer>
  );
};

export default RegisterModal;
