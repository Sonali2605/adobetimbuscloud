import  { useEffect, useState } from 'react';
import Header from './Header';
import DashboardHeading from './DashboardHeading';
import LineChart from './LineChart';
import ProfileCard from './ProfileCard';
import Badges from './Badges';
import CertificateCard from './Certificate';
import axios from 'axios';
import NewProduct from './NewProducts';
import ComplianceTraining from './ComplainceTraining';
import SkillProgress from './SkillProgress';
import Network from './Network';
import Leaderboard from './Leaderboard';
import CourseExplore from './ExploreCourse';
import CalendarCourse from './CalenderCourse';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import ".././styles/common.css";
import MyLearning from './MyLearning';

interface Certificate {
  imageUrl: string;
  name: string;
  description: string;
}

const DashBoardPartnership = () => {
    const [certificate, setCertificate] = useState<Certificate | null>(null);
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());
    const courses = [
      { name: "React Fundamentals", imageUrl: "./images/Peers/img1.png" },
      { name: "JavaScript Basics", imageUrl: "./images/Peers/img2.png" },
      { name: "HTML5 Essentials", imageUrl: "./images/Peers/img3.png" },
      { name: "CSS Styling", imageUrl: "./images/Peers/img4.png" },
      { name: "Web Design", imageUrl: "./images/Peers/img5.png" }
    ];
    useEffect(() => {
      const token = localStorage.getItem("access_token");
      const fetchData = async () => {
        try {
          const response = await axios.get(
            'https://learningmanager.adobe.com/primeapi/v2/learningObjects?include=subLOs&page[limit]=1&filter.loTypes=certification&sort=-date&filter.ignoreEnhancedLP=true',
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
  
          const certificateData = response.data?.data?.[0];
          if (certificateData) {
            const certificateName = certificateData.attributes.localizedMetadata.find(
              (metadata: { name: string }) => metadata.name === 'Consultative Selling'
            );
  
            if (certificateName) {
              const imageUrl = certificateData.attributes.imageUrl;
              const name = certificateName.name;
              const description = certificateName.description;
  
              setCertificate({ imageUrl, name, description });
            }
          }
        } catch (error) {
          console.error('Error fetching certificate:', error);
        }
      };
  
      fetchData();
    }, []);
  
    const handleDateChange = (date: Date | null) => {
      setSelectedDate(date);
    };
  
    return (
      <>
        <Header isLogin={false} />
        <div className="mt-5 justify-center text-center">
          <div className="flex mt-4">
            {/* <div style={{width:"60%"}}>
              <Network/>
            </div> */}
            <div className="ml-4 flex-grow px-0 ml-0" style={{marginTop: "-45px"}}>
            <div className='mt-4 mb-10 justify-center ' style={{ display: 'flex'}}>
          <div className='mt-14' style= {{ width: '30%' }} >
          <div style={{backgroundImage: 'url("./images/customer_Heading1.png")', backgroundColor: 'black', padding: '30px 35px', position: 'relative', display: 'flex', alignItems: 'center'}}>
          <img
            className="w-20 h-20 rounded-full"
            src="./images/maryJaneStewart.png"
            alt="Profile"
          />
  <div style={{ marginLeft: '20px' }}>
    <h1 className="text-white text-xl mb-2 mt-4">Welcome, <br/>Olivia Clarke</h1>
    <div className='text-white inline'>
      <img src="/images/level.png" alt="Level" className='w-10 h-15'/>
      <p>Level 1</p>
      <p className='font-bold'>Starter</p>
    </div>
  </div>
</div>

            </div>
                <div style={{ width: '25%', marginRight: '10px' }} className='mt-10'>
                  <MyLearning isCustomer={true}/>
                </div>
                <div style={{ width: '30%', marginTop:'60px' }}>
                  <Calendar
                    onChange={handleDateChange as any} // Explicitly cast to any to avoid TypeScript error
                    value={selectedDate}
                    calendarType="US"
                    locale="en-US"
                  />
                </div>
              </div>
              <div className='mt-4 bg-[#1a4789] py-6 px-12'>              
                <CourseExplore isCustomer= {true}/>
                <div className="mt-4">
          <h2 className="text-2xl text-white font-bold mt-10 mb-8 text-left">Courses Taken By Your Peers</h2>
          <div className="grid grid-cols-4 gap-24">
            {courses.map((course, index) => (
              <div key={index} className="max-w-xs overflow-hidden shadow-lg rounded-lg px-6">
                <img
                  className="w-full h-40 object-cover mb-4 rounded-t-lg"
                  src={course.imageUrl}
                  alt={course.name}
                />
                <div className="px-3">
                  <div className="text-sm mb-2 text-center">{course.name}</div>
                  <button className="bg-blue-500 hover:bg-blue-700 text-white py-1 px-2 rounded w-full text-sm mb-3">
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
              </div>
              
            </div>
          </div>
        </div>
      </>
    );
  }

export default DashBoardPartnership;
