import { useState } from 'react';
import Header from './Header';
import RegisterModal from './RegisterModel';
import ".././styles/common.css";
const Login = () => {
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  return (
    <div>
      {/* Header */}
      <Header isLogin={true} />

      {/* Full-page image */}
      <div className="overflow-hidden">
        <img className="w-full h-80" src="/images/header1.png" alt="heading1" />
      </div>

      {/* Grid for images */}
      <div className="grid grid-cols-12 mt-1 pb-6 pl-9 pr-9 pt-6">
        {/* Heading 2 (6 columns) */}
        <div className="col-span-6 flex justify-center items-center">
          <img className="h-100" src="/images/header2.png" alt="heading" style={{ maxHeight: '100%' }} />
        </div>
        
        {/* Text with Button (6 columns) */}
        <div className="col-span-6 flex justify-center items-center">
          <div className='px-20 leading-2'>
            <p className='mb-2'>The Premier Protect Academy portal provides tools and resources to help you boost your efficiency, close your quota faster, and keep your book of business with Premier Protect at its peak. Key features include Commissions report, sales numbers, Learning Programs, Updates, Application Tracking, Learning Programs, and Order ID cards for members.</p>
            <p className='mb-2'>Recently added features include a new 1-299 Group Broker portal where you can submit your small group bid requests online and receive an instant quote as well as a personalized workbench where you can track your group activity and complete group documents on behalf of your Group Benefit Administrator.</p>
            <button className="w-8/12 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded" onClick={() => setShowRegisterModal(true)} >REGISTER HERE</button>
          </div>
        </div>
      </div>
      {showRegisterModal && (
        <RegisterModal onClose={()=>setShowRegisterModal(false)}/>
      )}
      {/* Heading for Our Latest News */}
      <div className='px-10'>
      <h2 className="text-xl font-bold mt-8">Our latest news</h2>

{/* Grid for three images */}
<div className="grid grid-cols-3 gap-4 mt-4 mb-4">
  {/* Heading 3 */}
  <div className="flex flex-col justify-center items-center w-80">
    <img className="mb-2" src="/images/header3.png" alt="heading3" />
    <div className="text-container">
      <div className="font-bold">Premier Protect launches new plan to address Diabetes</div>
      <div className="text-gray-50" style={{color:'#909090'}}>1 day ago</div>
    </div>
  </div>

  {/* Heading 4 */}
  <div className="flex flex-col justify-center items-center w-80">
    <img className="mb-2" src="/images/header4.png" alt="heading4" />
    <div className="text-container">
      <div className="font-bold">Premier Protect awarded best Provider of Healthcare Insurance</div>
      <div className="text-gray-50" style={{color:'#909090'}}>4 day ago</div>
    </div>
  </div>

  {/* Heading 5 */}
  <div className="flex flex-col justify-center items-center w-80">
    <img className="mb-2" src="/images/header5.png" alt="heading5" />
    <div className="text-container">
      <div className="font-bold">Premier Protect partners with Trimester Healthcare Alliance</div>
      <div className="text-gray-50" style={{color:'#909090'}}>7 day ago</div>
    </div>
  </div>
  </div>
</div>

    </div>
  );
}

export default Login;
