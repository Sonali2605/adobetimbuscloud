import styled from 'styled-components';
import ".././styles/common.css";


const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index:9998;
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


const CompletionPopup = ({ showCompletionPopup, onClose }) => {
  const handleGoToAcademy = () => {
    onClose();
    // Any additional logic when "Go to Academy" button is clicked
  };

  return (
    showCompletionPopup && (
      <ModalContainer>
        <ModalContent>
          <ModalHeader>
            <ModalTitle>Congrats on joining the Nimbus Academy. You can now start with your courses.</ModalTitle>
            
            <SecondaryButton onClick={handleGoToAcademy}>Go to Academy</SecondaryButton>
          </ModalHeader>
        </ModalContent>
      </ModalContainer>
    )
  );
};

export default CompletionPopup;