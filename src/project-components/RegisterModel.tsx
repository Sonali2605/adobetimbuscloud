import React,{ useState }from 'react';
import axios from 'axios';
import styled from 'styled-components';

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
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px; /* Adjust the width as needed */
`;

const ModalHeader = styled.div`
  position: relative;
  text-align: center;
`;

const ModalCloseButton = styled.button`
  position: absolute;
  top: -21px;
  right: -18px;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 14px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const ModalSubheader = styled.div`
  font-size: 18px;
  margin-top: 10px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const InputField = styled.input`
  width: 93%;
  padding: 8px;
  margin-top: 10px;
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
  background-color: #FFFFFF;
  color: #4471E8;
  border: 1px solid #4471E8;
  padding: 10px 40px;
`;

const RegisterModal = ({ onClose }) => {
    const [formData, setFormData] = useState({
        id: '',
        username: '',
        password: '',
      });
    
      const handleChange = (e) => {
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
          <ModalCloseButton onClick={onClose}>X</ModalCloseButton>
          <ModalTitle>Welcome</ModalTitle>
        </ModalHeader>
        <ModalSubheader>Register</ModalSubheader>
        <InputField 
        type="text" 
        value={formData.id} 
        onChange={handleChange}
        name="id"
        placeholder="Agency ID" 
        />
        <InputField 
        type="email" 
        value={formData.username} 
        onChange={handleChange}
        name="username"
        placeholder="Email Address" 
        />
        <InputField 
        type="password" 
        value={formData.password}
        onChange={handleChange}
        name="password"
        placeholder="Password" 
        />

<SecondaryButton onClick={handleSubmit}>Register</SecondaryButton>

      </ModalContent>
    </ModalContainer>
  );
};

export default RegisterModal;
