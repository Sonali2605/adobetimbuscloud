import { useEffect, useState } from 'react';
import axios from 'axios';
import {useNavigate, useParams } from "react-router-dom";
interface Course {
  attributes: {
    imageUrl: string;
    localizedMetadata?: {
      name: string;
    }[];
  };
}
interface LearningObjectInstanceEnrollment {
  id?: string;
  type?: string;
  attributes: {
      dateEnrolled?: string;
      dateStarted?: string;
      enrollmentSource?: string;
      hasPassed?: boolean;
      progressPercent?: number;
      score?: number;
      state?: string;
  };
  relationships?: {
      learner?: {
          data?: {
              id?: string;
              type?: string;
          };
      };
      learningObject?: {
          data?: {
              id?: string;
              type?: string;
          };
      };
      loInstance?: {
          data?: {
              id?: string;
              type?: string;
          };
      };
      loResourceGrades?: {
          data?: {
              id?: string;
              type?: string;
          }[];
      };
  };
}


const MyLearning = () => {
  const [courseData, setCourseData] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { isLearning } = useParams();

  // Extract the value of isLearning from the URL
  const isLearningValue = isLearning === 'true';

  useEffect(() => {
    getMyLearningData();
  }, []);

  async function getMyLearningData() {
    try {
      const token = localStorage.getItem("access_token");
      const config = {
        headers: { Authorization: `oauth ${token}` },
      };
      const response = await axios.get(
        `https://learningmanager.adobe.com/primeapi/v2/learningObjects?include=enrollment&page[limit]=10&filter.catalogIds=174313&sort=name&filter.learnerState=enrolled&filter.learnerState=started&filter.learnerState=completed&filter.ignoreEnhancedLP=true`,
        config
      );
      const result = response?.data?.data;
      for (const item of result) {
        const enrollment = item.relationships?.enrollment?.data;
        let state = null;
      
        if (enrollment) {
          const enrollmentId = enrollment.id;
          const includedItem = response?.data?.included.find(included => included.id === enrollmentId);
          state = includedItem?.attributes?.state || null;
        }
      
        item.state = state;
      }
      setCourseData(result);
    } catch (error) {
      console.error("Error fetching learning objects:", error);
    }
  }

  const customStyles = `
    .course-carousel-container {
      max-width: 100%;
      overflow-x: hidden;
    }

    .course-carousel {
      display: flex;
      justify-content: flex-start;
      overflow-x: auto;
      scrollbar-width: none; /* Firefox */
      -ms-overflow-style: none; /* Internet Explorer 10+ */
    }

    .course-carousel::-webkit-scrollbar {
      display: none; /* WebKit */
    }

    .course-card {
      width: calc(20% - 20px); /* Adjust spacing between cards as needed */
      margin-right: 20px;
      flex-shrink: 0;
      position: relative;
    }

    .course-image {
      width: 100%;
      height: 200px;
      object-fit: cover;
      border-radius: 8px;
    }

    .course-details {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      padding: 10px;
      border-top-left-radius: 8px;
      border-top-right-radius: 8px;
      text-align: center;
    }

    .course-title {
      font-size: 18px;
      font-weight: bold;
      color: #fff;
    }

    .enroll-link {
      position: absolute;
      bottom: 10px;
      left: 50%;
      transform: translateX(-50%);
      background-color: #007bff;
      color: #fff;
      text-decoration: none;
      font-size: 16px;
      border: 1px solid #007bff;
      padding: 5px 10px;
      border-radius: 4px;
    }

    .enroll-link:hover {
      background-color: #0056b3;
      color: #fff;
    }
  `;

  const  EnrollHandle = async(cid:number) =>{
   const course = (courseData as any).find(obj => obj?.id === cid);
    const Iid =  course.relationships?.instances?.data?.[0].id;
    
    setLoading(true);
    const token = localStorage.getItem("access_token")
    try {
        // const response = await fetch('https://learningmanager.adobe.com/primeapi/v2/enrollments?loId=' + cid + '&loInstanceId=' + encodeURIComponent(Iid), {
        //     method: 'POST',
        //     headers: {
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        // });

        // if (!response.ok) {
        //     navigate('/dashboard')
        //     throw new Error('Failed to enroll');
        // } else {
          navigate(`/learning_object/${cid}/instance/${Iid}/isLearning=false/detailspage`);
        // }
        setLoading(false);
    } catch (error) {
        setLoading(false);
    }
   
  }
  return (
    <div>
      <h2 className="text-lg font-bold mb-4">My Learning</h2>
      <style>{customStyles}</style>
      <div className="course-carousel-container">
        <div className="course-carousel">
          {courseData.map((course, index) => (
            <div key={index} className="course-card">
              <img
                className="course-image"
                src={course?.attributes?.imageUrl}
                alt={course?.attributes?.localizedMetadata?.[0]?.name || ''}
              />
              <div className="course-details">
                <h2 className="course-title">{course?.attributes?.localizedMetadata?.[0]?.name}</h2>
              </div>
              <button className="enroll-link" onClick={()=>EnrollHandle(course?.id)}>{course?.state}</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyLearning;