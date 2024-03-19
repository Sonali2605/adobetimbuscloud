import styled from 'styled-components';
import ".././styles/common.css";
import { useState } from 'react';

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:99999;
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

const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  font: normal normal normal 24px Impact;
`;


const Button = styled.button`
color: white;
border: none;
padding: 10px 20px;
margin-top: 20px;
cursor: pointer;
border-radius: 4px;
display: block;
margin: 0 auto;
margin-top: 20px;
`;


const SecondaryButton = styled(Button)`
  background-color: #ffffff;
  color: #4471e8;
  border: 1px solid #4471e8;
  padding: 10px 40px;
`;

const LoginRadio = styled.div`
display: flex;
color: #000;
justify-content: center;
& > label:nth-child(2) {
  margin-left: 15px;
}
& > label > input {
  width: auto;
  margin-right: 8px;
  top: 2px;
  position: relative;
}
`;
const InputField = styled.input`
width: 80%;
padding: 1px;
margin-top: 10px;
text-align: center;
transform: translateX(12%);
border: 1px solid #000;
border-radius: 0;
color: #000
`;


const CompletionPopup = ({ onClose }) => {
  const [dashboard, setDashboard] = useState('customer'); // Default selection
  const handleGoToAcademy = () => {
    const newPath = dashboard === 'customer' ? '/dashboard' : '/dashboardPartnership';

    if (location.pathname !== newPath) {
       window.location.href = newPath;
     } 
    onClose();
    // Any additional logic when "Go to Academy" button is clicked
  };
  
 

  return (    
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Congrats on joining the Nimbus Academy. You can now start with your courses.</ModalTitle>
            <LoginRadio>
            <label>
              <InputField 
                type="radio" 
                value="customer" 
                checked={dashboard === 'customer'} 
                onChange={() => setDashboard('customer')} 
              />
               Customer Dashboard
              </label>
              <label>

              
              <InputField 
                type="radio" 
                value="partnership" 
                checked={dashboard === 'partnership'} 
                onChange={() => setDashboard('partnership')} 
              />
              Partnership Dashboard
              </label>
            </LoginRadio>            
            <SecondaryButton onClick={handleGoToAcademy}>Go to Academy</SecondaryButton>
          </ModalHeader>
        </ModalContent>
      </ModalContainer>    
  );
};

export default CompletionPopup;