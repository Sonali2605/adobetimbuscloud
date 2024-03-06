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

const Dashboard = () => {
  const [certificate, setCertificate] = useState<Certificate | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

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
      <div className="mt-5">
        <DashboardHeading />
        <div className="grid grid-rows-3 grid-flow-col gap-4 px-10 ">
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
        </div>
        <div className="flex mt-4 px-10">
          <div style={{width:"23rem"}}>
            <Network/>
          </div>
          <div className="ml-4 flex-grow" style={{marginTop: "-45px"}}>
            <Leaderboard />
            <div className='mt-4'>              
              <CourseExplore/>
            </div>
            <div className='mt-4 mb-10' style={{ display: 'flex'}}>
              <div style={{ width: '40%', marginRight: '10px' }}>
                <CalendarCourse date={selectedDate ? selectedDate.toISOString() : null} />
              </div>
              <div style={{ width: '30%' }}>
                <Calendar
                  onChange={handleDateChange as any} // Explicitly cast to any to avoid TypeScript error
                  value={selectedDate}
                  calendarType="US"
                  locale="en-US"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
