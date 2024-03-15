import { useState } from 'react';
import Header from './Header';
import styled from 'styled-components';
import RegisterModal from './RegisterModel';
import LoginModal from './LoginModal';
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

const Login = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [showCompletePopup, setShowCompletionPopup] = useState(false);
  function handleFlipcardClick() {
    setShowLoginModal(true);
    setShowCompletionPopup(true);
  }

  const handleGoToAcademy = async () => {
    setShowCompletionPopup(false);
  }

  return (
    <div className="relative">
      {/* Header */}


      {/* Full-page image */}
      <div className="overflow-hidden relative">
        {/* Power up in the Cloud */}
        <div className="absolute inset-0 flex flex-col text-white">
          <div className='mb-20'>
            <Header isLogin={false} />
          </div>
          <div className='justify-center items-left mt-24 px-24'>
            <h1 className="text-8xl font-bold mb-8">Power up in <br />the Cloud</h1>
            <p className="text-3xl font-bold text-gray-400 mb-6">Host | Build | Deploy</p>
            <div className="flex space-x-4 mt-5">
              <button className="px-10 py-3 text-2xl rounded-full bg-[#55c1e3] text-white font-bold">Login with FB</button>
              <button className="px-10 py-3 text-2xl rounded-full bg-[#55c1e3] font-bold">Login with Google</button>
            </div>
          </div>
        </div>

        {/* Image */}
        <img className="w-full" src="/images/Login/NC/Image2.png" alt="heading1" />
      </div>

      {/* New row after image ends */}
      <div className="relative z-10 bg-[#1a4789] text-white text-center text-2xl">
        <div className="grid grid-cols-3 gap-4">
          <div className="col-span-1">
            <div className="bg-[#1a4789] text-white p-8">
              <p>#1</p>
              <p>in IaaS usability</p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="p-8">
              <p>20</p>
              <p>globally distributed data centers</p>
            </div>
          </div>
          <div className="col-span-1">
            <div className="bg-[#1a4789] text-white p-8">
              <p>99.9%</p>
              <p>uptime SLA for droplets</p>
            </div>
          </div>
        </div>
      </div>
      <div className="relative z-10 bg-[#3b7ceb] text-white text-center py-10">

        <div className='text-7xl font-extrabold mb-3'>How real businesses use <br />Nimbus Cloud to grow faster?</div>
        <div className="flex justify-center items-center px-18 py-10">
          {/* Blue card */}
          <div className="bg-[#1a4789] text-white rounded-3xl px-8 py-20 mr-5">
            <div className="flex justify-center items-center mb-6">
              <img className="w-60 h-40" src="/images/Login/NC/Image3.png" alt="Person" />
              <div className="px-5 text-2xl">
                <p className="font-bold ">CashCharge speeds up <br /> ​its payment systems <br />​with Nimbus</p>
                <p className="font-bold mt-4">Read the story here</p>
              </div>
            </div>
          </div>

          {/* Image */}
          <img className="w-1/3 h-80" src="/images/Login/NC/Image11.jpg" alt="Image" />
        </div>
      </div>
      <div className="relative z-10 bg-[#1a4789] text-white text-center py-10">
        <div className='text-7xl font-extrabold mb-3'>Join the Nimbus Academy to build <br /> ​your expertise</div>

        {/* Card grid */}
        <div className="grid grid-cols-3 gap-4 justify-center items-center px-24 mx-10">
          {/* First row of cards */}
          <div className="col-span-1/2 bg-white rounded-lg m-10 overflow-hidden relative">
            <div className="flip-card" onClick={handleFlipcardClick}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  {/* Image */}
                  <img className="w-full h-36 object-cover" src="/images/Login/NC/Image4.png" alt="Card" />
                  {/* Text */}
                  <div className="p-2 bg-white">
                    <p className="text-gray-800 font-bold">Customer Data ​Security</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <h1>Customer Data ​Security</h1>
                  <p>Join the Nimbus Academy to build your expertise section </p>
                </div>
              </div>
            </div>
          </div>
          {/* Second card */}
          <div className="col-span-1/2 bg-white rounded-lg m-10 overflow-hidden">
            <div className="flip-card" onClick={handleFlipcardClick}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img className="w-full h-36 object-cover" src="/images/Login/NC/Image6.png" alt="Card" />
                  <div className="p-2 bg-white">
                    <p className="text-gray-800 font-bold">Cloud Security with ​Nimbus</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <h1>Cloud Security with ​Nimbus</h1>
                  <p>Join the Nimbus Academy to build your expertise section </p>
                </div>
              </div>
            </div>
          </div>
          {/* Third card */}
          <div className="col-span-1/2 bg-white rounded-lg m-10 overflow-hidden">
            <div className="flip-card" onClick={handleFlipcardClick}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img className="w-full h-36 object-cover" src="/images/Login/NC/Image6.png" alt="Card" />
                  <div className="p-2 bg-white">
                    <p className="text-gray-800 font-bold">Building apps in ​Nimbus Cloud</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <h1>Building apps in ​Nimbus Cloud</h1>
                  <p>Join the Nimbus Academy to build your expertise section </p>
                </div>
              </div>
            </div>
          </div>
          {/* Fourth card */}
          <div className="col-span-1/2 bg-white rounded-lg m-10 overflow-hidden">
            <div className="flip-card" onClick={handleFlipcardClick}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img className="w-full h-36 object-cover" src="/images/Login/NC/Image7.png" alt="Card" />
                  <div className="p-2 bg-white">
                    <p className="text-gray-800 font-bold">Building AI solutions ​in Nimbus Cloud</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <h1>Building AI solutions ​in Nimbus Cloud</h1>
                  <p>Join the Nimbus Academy to build your expertise section </p>
                </div>
              </div>
            </div>
          </div>
          {/* Fifth card */}
          <div className="col-span-1/2 bg-white rounded-lg m-10 overflow-hidden">
            <div className="flip-card" onClick={handleFlipcardClick}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img className="w-full h-36 object-cover" src="/images/Login/NC/Image8.png" alt="Card" />
                  <div className="p-2 bg-white">
                    <p className="text-gray-800 font-bold">Achieving 100% ​customer satisfaction</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <h1>Achieving 100% ​customer satisfaction</h1>
                  <p>Join the Nimbus Academy to build your expertise section </p>
                </div>
              </div>
            </div>
          </div>
          {/* Sixth card */}
          <div className="col-span-1/2 bg-white rounded-lg m-10 overflow-hidden">
            <div className="flip-card" onClick={handleFlipcardClick}>
              <div className="flip-card-inner">
                <div className="flip-card-front">
                  <img className="w-full h-36 object-cover" src="/images/Login/NC/Image9.png" alt="Card" />
                  <div className="p-2 bg-white">
                    <p className="text-gray-800 font-bold">Exploring Nimbus ​Virtual Machines</p>
                  </div>
                </div>
                <div className="flip-card-back">
                  <h1>Exploring Nimbus ​Virtual Machines</h1>
                  <p>Join the Nimbus Academy to build your expertise section </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Button */}
        <button className="mt-5 bg-[#55c1e3] text-white font-bold text-2xl py-2 px-6 rounded-full" onClick={() => setShowRegisterModal(true)} >Join the Academy</button>
      </div>

      {/* Our customer section */}
      <div className="relative z-10 bg-white text-black text-center py-10">
        <div className='text-7xl font-extrabold mb-12'>Our Customers</div>
        <div className="flex justify-center items-center py-5 pl-20">
          <div className="grid grid-cols-4 gap-8 justify-center items-center">
            {/* First row of cards */}
            <div className="col-span-1 bg-white rounded-lg mr-24 overflow-hidden">
              {/* Image */}
              <img className="w-full h-44 object-cover" src="/images/Login/NC/Image10.png" alt="Card" />
            </div>
            {/* Second card */}
            <div className="col-span-1 bg-white rounded-lg mr-24 overflow-hidden">
              <img className="w-full h-44 object-cover" src="/images/Login/NC/Image13.png" alt="Card" />
            </div>
            {/* Third card */}
            <div className="col-span-1 bg-white rounded-lg mr-24 overflow-hidden">
              <img className="w-full h-44 object-cover" src="/images/Login/NC/Image14.png" alt="Card" />
            </div>
            {/* Fourth card */}
            <div className="col-span-1 bg-white rounded-lg  mr-24 overflow-hidden">
              <img className="w-full h-44 object-cover" src="/images/Login/NC/Image15.png" alt="Card" />
            </div>
          </div>
        </div>
      </div>

      {/* why choose Nimbus */}
      <div className="relative z-10 bg-[#d0f8f8] text-center text-black py-10">
        <div className='text-7xl font-extrabold mb-12'>Why choose Nimbus?</div>

        <div className="grid grid-cols-3 gap-4 justify-center items-center px-10">
          {/* First row of cards */}
          <div className="col-span-1 rounded-lg overflow-hidden h-44">
            <div className="p-2">
              <p className="text-black-800 font-bold text-2xl">Managed hosting</p>
              <p className='text-black-800 text-lg'>Nimbus Cloudpath is a fully-​managed cloud hosting solution ​for digital agencies and e ​commerce businesses. Built to ​deliver performance without ​complexity</p>
            </div>
          </div>
          {/* Second card */}
          <div className="col-span-1 rounded-lg overflow-hidden h-44">
            <div className="p-2">
              <p className="text-black-800 font-bold text-2xl">Virtual Machines</p>
              <p className='text-black-800 text-lg'>Nimbus Droplets are simple, ​scalable, virtual machines for all ​your web hosting and VPS hosting ​needs.</p>
            </div>
          </div>
          {/* Third card */}
          <div className="col-span-1 rounded-lg overflow-hidden h-44">
            <div className="p-2">
              <p className="text-black-800 font-bold text-2xl">Kubernetes</p>
              <p className='text-black-800 text-lg'>Nimbus Kubernetes is a managed ​solution that is easy to scale and ​includes a 99.5% SLA for HA and ​free control plane</p>
            </div>
          </div>
          {/* Fourth card */}
          <div className="col-span-1 rounded-lg overflow-hidden h-44">
            <div className="p-2">
              <p className="text-black-800 font-bold text-2xl">App Platform</p>
              <p className='text-black-800 text-lg'>Build and deploy apps without ​managing infrastructure with ​Nimbus Cloud’s Platform as a ​Service.</p>
            </div>
          </div>
          {/* Fifth card */}
          <div className="col-span-1 rounded-lg overflow-hidden h-44">
            <div className="p-2">
              <p className="text-black-800 font-bold text-2xl">Managed Databases</p>
              <p className='text-black-800 text-lg'>Managed MongoDB, Kafka MySQL ​PostGreSQL and Managed ​Databases for Redis, let you focus on ​your apps while we update and scale ​your databases</p>
            </div>
          </div>
          {/* Sixth card */}
          <div className="col-span-1 rounded-lg overflow-hidden h-44">
            <div className="p-2">
              <p className="text-black-800 font-bold text-2xl">Storage</p>
              <p className='text-black-800 text-lg'>Digital Ocean Spaces object ​storage and Volume block storage  ​are business-ready storage ​solutions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="relative z-10 bg-white text-center text-black py-10">
        <div className='text-7xl font-extrabold mb-12'>Start Building Today</div>
        <div>
          <p className='text-3xl px-32 mx-32'>Sign up now and you will be up and running on Nimbus ​Cloud in a few minutes. Get upto $200 off on your first 60 ​days</p>
        </div>
        <button className="mt-5 bg-[#55c1e3] text-white font-bold text-2xl py-2 px-6 rounded-full" onClick={() => setShowRegisterModal(true)}>Sign up to get started</button>
      </div>

      <div className="relative z-10 bg-[#1a4789] text-white text-center py-10">
        <div className="flex justify-center items-center py-5">
          <div className="grid grid-cols-3 gap-8 justify-center items-center font-bold">
            {/* First row of cards */}
            <div className="col-span-1 rounded-lg overflow-hidden text-xl h-82 px-8 leading-8">
              <div>
                <h1 className='text-2xl mb-3'>Company</h1>
                <p>About</p>
                <p>Leadership</p>
                <p>Blog</p>
                <p>Careers</p>
                <p>Customers</p>
                <p>Partners</p>
                <p>Referral Programs</p>
                <p>Affiliate Programs</p>
                <p>Press</p>
                <p>Legal</p>
                <p>Privacy Policy</p>
              </div>
            </div>
            {/* Second card */}
            <div className="col-span-1 rounded-lg mr-24 overflow-hidden text-xl h-82 px-8 leading-8">
              <div>
                <h1 className='text-2xl mb-3'>Products</h1>
                <p>Products Overview</p>
                <p>Droplets</p>
                <p>Kubernetes</p>
                <p>App Platform</p>
                <p>Functions</p>
                <p>Cloudpath</p>
                <p>Managed Databases</p>
                <p>Spaces</p>
                <p>Marketplace</p>
                <p>Load Balancers</p>
                <p>APIs</p>
              </div>
            </div>
            {/* Third card */}
            <div className="col-span-1 rounded-lg mr-24 overflow-hidden text-xl h-82 px-8 leading-8">
              <div>
                <h1 className='text-2xl mb-3'>Community</h1>
                <p>Learning Academy</p>
                <p>Q&A</p>
                <p>CSS Tricks</p>
                <p>Write for Donations</p>
                <p>Hatch Startup Program</p>
                <p>Deploy by Nimbus</p>
                <p>Research Program</p>
                <p>Open Source</p>
                <p>Code of Conduct</p>
                <p>Newsletters</p>
                <p>Meetups</p>
              </div>
            </div>
          </div>
        </div>
      </div>



      {/* Modal for Login */}
      {showLoginModal && (
        <LoginModal onClose={() => setShowLoginModal(false)} />
      )}
      {/* Modal for Register */}
      {showRegisterModal && (
        <RegisterModal onClose={() => setShowRegisterModal(false)} />
      )}

      {/* Modal for Login */}
      {showCompletePopup && (
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Congrats on joining the Nimbus Academy. You can now start with your courses.</ModalTitle>
              <SecondaryButton onClick={handleGoToAcademy}>Go to Academy</SecondaryButton>
            </ModalHeader>

          </ModalContent>

        </ModalContainer>

      )}

    </div>
  );
}

export default Login;
