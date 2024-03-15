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

interface Certificate {
  imageUrl: string;
  name: string;
  description: string;
}

const DashBoardCustomer = () => {
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
          <div className='text-4xl mb-10'>Welcome Olivia Clarke</div>
          {/* <div className="grid grid-rows-3 grid-flow-col gap-4 px-10 ">
            <div className="row-start-1 row-span-4 max-w-xs">
              <ProfileCard name="Olivia Clarke" />
              <Badges />
              {certificate && (
                <CertificateCard
                  imageUrl={certificate.imageUrl}
                  name={certificate.name}
                  description={certificate.description}
                />
              )}
            </div>
            <div className="row-start-1 row-end-4">
              <LineChart />
              <NewProduct/>
            </div>
            <div className="row-start-1 row-end-4">
              <ComplianceTraining/>
              <SkillProgress/>
            </div>
          </div> */}
          <div className="flex mt-4">
            {/* <div style={{width:"60%"}}>
              <Network/>
            </div> */}
            <div className="ml-4 flex-grow" style={{marginTop: "-45px"}}>
            <div className='mt-4 mb-10 justify-center' style={{ display: 'flex'}}>
                <div><img
            className="w-60 h-60 rounded-full mt-10"
            src="./images/maryJaneStewart.png"
            alt="Profile"
          /></div>
                <div style={{ width: '40%', marginRight: '10px' }}>
                  <CalendarCourse date={selectedDate ? selectedDate.toISOString() : null} />
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
              <div className='mt-4 bg-[#1a4789]'>              
                <CourseExplore isCustomer= {true}/>
                <div className="mt-4">
          <h2 className="text-2xl text-white font-bold mt-10 mb-8">Courses Taken By Your Peers</h2>
          <div className="grid grid-cols-4 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="max-w-xs bg-white overflow-hidden shadow-lg rounded-lg px-4">
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

export default DashBoardCustomer;
