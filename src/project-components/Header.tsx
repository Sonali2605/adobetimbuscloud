import { useState } from 'react';
import styled from 'styled-components';
import axios from 'axios';
import RegisterModal from './RegisterModel';
import { clientId, clientSecreat, refreshToken, base_adobe_url } from "../AppConfig"
import ".././styles/common.css";

const HeaderContainer = styled.div`
  position: relative;
  z-index: 2;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 30px;
  margin: 1px 15px;
  color: #ffffff;
`;

const Logo = styled.div`
  font-weight: bold;
  font: normal normal normal 24px Impact;
`;

const Menu = styled.div`
  display: flex;
  gap: 20px;
  font: normal normal bold 25px Adobe Clean;

  /* Nested Menu Items */
  & > .products-menu {
    position: relative;
  }

  /* Submenu Container */
  .submenu {
    position: absolute;
    top: 100%;
    left: 0;
    background-color: transparent;
    border-radius: 8px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    padding: 10px;
    display: none;
    width: max-content;
  }

  /* Submenu Text Color */
  .submenu .adobe-font {
    color: #ffffff;
  }

  /* Increase space between submenu items */
  .submenu .adobe-font:not(:last-child) {
    margin-bottom: 10px; /* Adjust the margin as needed */
  }

  /* Show Submenu on Hover */
  .products-menu:hover .submenu {
    display: block;
  }
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
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalContent = styled.div`
  background-color: white;
  padding: 40px 20px;
  border-radius: 8px;
  width: 360px;
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
  font-size: 12px;
  color: rgba(142, 161, 180, 1);
`;

const ModalTitle = styled.div`
  font-size: 24px;
  font-weight: bold;
  font: normal normal normal 24px Impact;
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
  margin: 0 auto;
  margin-top: 20px;
`;

const PrimaryButton = styled(Button)`
  background-color: #4471e8;
  color: #ffffff;
  padding: 10px 40px;
`;

const SecondaryButton = styled(Button)`
  background-color: #ffffff;
  color: #4471e8;
  border: 1px solid #4471e8;
  padding: 10px 40px;
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

const Header = ({ isLogin }: { isLogin: boolean }) => {
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
      }, {
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
      const url = `${base_adobe_url}/oauth/token/refresh`;
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
            Authorization: `Bearer dea088ff9bbdca4e8cbbd5fa7de2d290`,
          },
        }
      );

      const userId = userDataResponse.data?.data?.[0]?.id;

      localStorage.setItem('userId', userId);
      const isManager = userDataResponse.data?.data?.[0]?.attributes?.roles.includes('Manager');

      const newPath = isManager ? '/managerDashboard' : '/dashboard';

      if (location.pathname !== newPath) {
        window.location.href = newPath;
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
      <Logo>NIMBUS CLOUD</Logo>
      <Menu >
        <MenuItem className='adobe-font products-menu'>
          PRODUCTS
          <div className="submenu">
            <MenuItem className='adobe-font'>Product 1</MenuItem>
            <MenuItem className='adobe-font'>Product 2</MenuItem>
            {/* Add more submenu items as needed */}
          </div>
        </MenuItem>
        <MenuItem className='adobe-font'>SOLUTIONS</MenuItem>
        <MenuItem className='adobe-font'>DEVELOPER ACADEMY</MenuItem>
        <MenuItem className='adobe-font'>PRICING</MenuItem>
        <MenuItem className='adobe-font' onClick={() => setShowLoginModal(true)}>LOGIN</MenuItem>
      </Menu>

      {showLoginModal && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalCloseButton onClick={() => setShowLoginModal(false)}>&#10005;</ModalCloseButton>
              <ModalTitle>Welcome</ModalTitle>
              <div className='w-full pt-4 pb-4'>
                <LoginLineLeft>&nbsp;</LoginLineLeft>
                <span className='text-black'>Login</span>
                <LoginLineRight>&nbsp;</LoginLineRight>
              </div>
            </ModalHeader>
            <InputField className='border-2 rounded-md' type="text" placeholder="Agency ID" value={agencyId}
              onChange={(e) => setAgencyId(e.target.value)} />
            <InputField className='border-2 rounded-md' type="email" placeholder="Email Address" value={username}
              onChange={(e) => setUsername(e.target.value)} />
            <InputField className='border-2 rounded-md' type="password" placeholder="Password" value={password}
              onChange={(e) => setPassword(e.target.value)} />
            {error && <div style={{ color: 'red' }}>{error}</div>}
            <div className='text-center mt-3'>
              <a href="javascript:void(0)" className='text-blue-500' rel="noopener noreferrer">Forgot Password?</a>
            </div>
            <PrimaryButton className='w-8/12' onClick={handleLogin}>LOGIN</PrimaryButton>
          </ModalContent>
        </ModalContainer>
      )}

      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}
    </HeaderContainer >
  );
};

export default Header;
