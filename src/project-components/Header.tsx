import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RegisterModal from './RegisterModel';
import {clientId,clientSecreat,refreshToken, base_adobe_url} from "../AppConfig"

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  margin: 1px 15px;
  color: #000000; /* Change the text color as needed */
`;

const Logo = styled.div`
  font-weight: bold;
  font: normal normal normal 24px Impact;
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;
  font: normal normal bold 18px Adobe Clean;
`;

const MenuItem = styled.div`
  cursor: pointer;
`;

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
  top: -13px;
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
`;

// const ModalSubheader = styled.div`
//   font-size: 18px;
//   margin-top: 10px;
//   text-align: center;
//   margin-top: 5px;
//   margin-bottom: 10px;
// `;

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

// const PrimaryButton = styled(Button)`
//   background-color: #FFFFFF;
//   color: #4471E8;
//   border-color: #4471E8;
//   padding: 1px 3px
// `;

// const SecondaryButton = styled(Button)`
//   background-color: #4471E8;
//   color: #FFFFFF;
//   padding: 1px 3px
// `;
const PrimaryButton = styled(Button)`
  background-color: #4471E8;
  color: #FFFFFF;
  padding: 10px 40px;
`;

const SecondaryButton = styled(Button)`
  background-color: #FFFFFF;
  color: #4471E8;
  border: 1px solid #4471E8;
  padding: 10px 40px;
`;
const Header = ({isLogin}:{isLogin: boolean}) => {
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [agencyId, setAgencyId] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string>('');
  const handleLogin = async () => {
    try {
      const response = await axios.post('https://viku.space/renault/reapi.php', {
        action: 'login',
        username: username,
        password: password,
      },{
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6InlhdGluIn0.SXp3ID7mgUcLGYMVkvb3RJgc_tJ1hGv2NR_08s5SYNM'
        }
      });
        const client_id = clientId;
        const client_secret = clientSecreat;
        const refresh_token = refreshToken;

        const params = new URLSearchParams({
            client_id,
            client_secret,
            refresh_token
        });
        const url =  `${base_adobe_url}/oauth/token/refresh`;
        const responseToken = await axios.post(
            `${url}`,
            params,
            {
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }
        );
        const tokenData = responseToken.data;
      localStorage.setItem(
        'access_token',
        tokenData.access_token
      );

      const userDataResponse = await axios.get(
        `${base_adobe_url}/primeapi/v2/users?page[offset]=0&page[limit]=10&sort=id&ids=email:${username}`,
        {
          headers: {
            // Authorization: `Bearer ${tokenData.access_token}`,
            Authorization: `Bearer dea088ff9bbdca4e8cbbd5fa7de2d290`,
          },
        }
      );
  
      // Extract user ID from the response data
      const userId = userDataResponse.data?.data?.[0]?.id;
  
      // Store the user ID in localStorage
      localStorage.setItem('userId', userId);
      const isManager = userDataResponse.data?.data?.[0]?.attributes?.roles.includes('Manager');

      // Navigate based on the user's role
      const newPath = isManager ? '/managerDashboard' : '/dashboard';
      
      if (location.pathname !== newPath) {
        window.location.href = newPath; // Redirect to the new path
      }

      console.log('Login successful', response.data);
      setShowLoginModal(false);
      setAgencyId('');
      setUsername('');
      setPassword('');
      setError('');
    } catch (error) {
      setError("Issue with Login");
    }
  };
  
  return (
    <HeaderContainer>
      <Logo>Premier Protect Academy</Logo>
      <Menu>
        {isLogin ? (
        <>
          <MenuItem onClick={() => setShowLoginModal(true)}>
            <SecondaryButton>Login</SecondaryButton>
          </MenuItem>
          <MenuItem onClick={() => setShowRegisterModal(true)}>
            <PrimaryButton>Register</PrimaryButton>
          </MenuItem>
        </>
        ):(
        <>
          <MenuItem>Home</MenuItem>
          <MenuItem>Products</MenuItem>
          <MenuItem>Claims</MenuItem>
          <MenuItem>Services</MenuItem>
        </>
        )
      }
      </Menu>

      {/* Login Modal */}
      {/* {showLoginModal && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton onClick={() => setShowLoginModal(false)}>X</ModalCloseButton>
              <ModalTitle>Welcome</ModalTitle>
            </ModalHeader>
            <ModalSubheader>Login</ModalSubheader>
            <InputField type="text" placeholder="Agency ID" />
            <InputField type="email" placeholder="Email Address" />
            <InputField type="password" placeholder="Password" />
            <a href="#" style={{ color: 'blue', marginTop: '10px', display: 'block', textAlign:'center' }}>Forgot Password?</a>
            <PrimaryButton>Login</PrimaryButton>
          </ModalContent>
        </ModalContainer>
      )} */}
       {showLoginModal && (
        <ModalContainer>
          <ModalContent>
          <ModalHeader>
              <ModalCloseButton onClick={() => setShowLoginModal(false)}>&#10005;</ModalCloseButton>
              <ModalTitle>Welcome</ModalTitle>
            </ModalHeader>
            <InputField type="text" placeholder="Agency ID"  value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)}/>
            <InputField type="email" placeholder="Email Address"  value={username}
              onChange={(e) => setUsername(e.target.value)}/>
            <InputField type="password" placeholder="Password"  value={password}
              onChange={(e) => setPassword(e.target.value)}/>
            {/* Error message display */}
            {error && <div style={{ color: 'red' }}>{error}</div>}
            {/* Login button */}
            <PrimaryButton onClick={handleLogin}>Login</PrimaryButton>
          </ModalContent>
        </ModalContainer>
      )}
 {showRegisterModal && (
        <RegisterModal onClose={()=>setShowRegisterModal(false)}/>
      )}
    </HeaderContainer>
  );
};

export default Header;
