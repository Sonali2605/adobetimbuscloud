import { useEffect, useState } from 'react';
import Header from './Header';
import axios from 'axios';
import CourseExplore from './ExploreCourse';
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
  const [, setCertificate] = useState<Certificate | null>(null);
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
          <div>
            <div className='heroSection'>
                <div className="userDetails">
                  <img
                    className="userAvatar"
                    src="./images/maryJaneStewart.png"
                    alt="Profile"
                  />
                  <div>
                    <h1 className="adobe-font">Welcome, <br />Olivia Clarke</h1>
                    <div className='text-white d-flex align-items-center mt-3'>
                      <img src="/images/level.png" alt="Level" className='w-10 h-15' />
                      <div>
                        <p>Level 1</p>
                        <p className='font-bold'>Starter</p>
                      </div>
                    </div>
                  </div>
                </div>
              <div className='myLearning shadowBox'>
                <MyLearning isCustomer={true} />
              </div>
              <div style={{ width: '30%', marginTop: '0px', padding: '15px' }} className="shadowBox">
                <Calendar
                  onChange={handleDateChange as any} // Explicitly cast to any to avoid TypeScript error
                  value={selectedDate}
                  calendarType="US"
                  locale="en-US"
                />
              </div>
            </div>
            <div className='mt-4 bg-[#1a4789] py-6 recommended-course'>
              <CourseExplore isCustomer={true} />
              <div className="mt-4">
                <h2 className="text-2xl text-white font-bold mt-10 mb-8 text-left">Courses Taken By Your Peers</h2>
                <div className="cardView">
                  {courses.map((course, index) => (
                    <div key={index} className="max-w-xs overflow-hidden rounded-lg customCard">
                      <img
                        className="w-full h-40 object-cover mb-4 rounded-t-lg"
                        src={course.imageUrl}
                        alt={course.name}
                      />
                      <div className="px-3">
                        <h2 className="text-center">{course.name}</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded w-full text-md mb-3">
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
