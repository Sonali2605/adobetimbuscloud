import { useEffect, useState } from "react";
import Header from "./Header";
import playiconone from "../assets/images/playiconone.png";
import ".././styles/Detailspage.css";
// import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import ModalforSuccess from ".././common/Modal/Modal";
import jsonData from "./resdata.json";
import { apis } from '.././apiServices/apis'
import axios from "axios";
interface Details {
  data?: {
    id?: string; // Add id property
    attributes?: {
      loFormat?: string;
      localizedMetadata?: Array<{ name?: string; overview?: string }>;
      bannerUrl?: string;
      name?: string; // Add name property
      avatarUrl?: string; // Add avatarUrl property
    };
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
      bannerUrl?: string;
      name?: string; // Add name property
      avatarUrl?: string; // Add avatarUrl property
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


const Detailspage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const location = useLocation();
  const[ , setlearnerToken]=useState();
  const[dateData, setDateData] =  useState<string | null>(null);
  const[enrollmentData, setEnrollmentData]= useState<LearningObjectInstanceEnrollment>();
  const[author, setAuthor]= useState<LearningObjectInstanceEnrollment>();
  const[iId, setIId]= useState<LearningObjectInstanceEnrollment>();
  const { pathname } = location;

  // Split the URL by '/'
  const parts = pathname.split('/');

  // Find the part containing 'course:'
  const coursePart = parts.find(part => part.includes('course:'));

  // Extract the value after 'course:'
  const courseId = coursePart ? coursePart.split(':')[1] : '';
  
  const isCustomerPart = parts.find(part => part.includes("isCustomer"));

// Split the isCustomer part by "=" to get the value
   const isCustomerValue = isCustomerPart?.split("=")[1];

  const [showDateValidationModal, setShowDateValidationModal] = useState(false);
  const [title] = useState(
    "Congratulations on completing the “Negotiations 101” course"
  );
  const [errorMsg] = useState("You have earned your badge!");
  /* const [img] = useState(
    "https://cpcontents.adobe.com/public/account/107442/accountassets/107442/badges/8f41853356a8453d9e263f39d4377d74/badge_blackbelt.png"
  ); */
  const [img] = useState(
    "/images/Asset_7_4x.png"
  );

  const navigate = useNavigate();
  const [details, setDetails] = useState<Details | undefined>();

  async function getLearningObjects() {
    try {
      const res = await apis.getRefreshToken()
      setlearnerToken(res.access_token)
      console.log(res?.access_token ,"response")
      const config = {
        // headers: { Authorization: "Bearer dea088ff9bbdca4e8cbbd5fa7de2d290" },
        headers: { Authorization: `oauth ${res.access_token}` },
      };
      const response = await axios.get(
        `https://learningmanager.adobe.com/primeapi/v2/learningObjects/course:${courseId}?include=instances.loResources.resources%2Cskills.skillLevel.skill%2CsubLOs.instances.subLoInstances%2CsupplementaryLOs.instances.loResources.resources%2csubLOs.instances.loResources.resources%2CprerequisiteLOs%2cenrollment.learnerBadge.badge%2cauthors%2cauthors.account`,

        config
      );
      const result = response?.data;
      const enrollment = result?.included.find((findData: LearningObjectInstanceEnrollment) => findData.type === 'learningObjectInstanceEnrollment' && findData?.id === result?.data.relationships.enrollment?.data.id);
      setEnrollmentData(enrollment);

      const author = result?.included.find((findData: LearningObjectInstanceEnrollment) => findData.type === 'user' && findData?.id === result?.data.relationships.authors?.data[0].id);
      setAuthor(author);

      const Iid = result?.included.find((findData: LearningObjectInstanceEnrollment) => findData.type === 'learningObjectInstance' && findData?.id === result?.data.relationships.instances?.data[0].id);
      console.log("+++++++++++++++++++++++++++++++",Iid);
      setIId(Iid.relationships?.loResources.data[0].id);
      const effectiveModifiedDate = new Date(result?.data?.attributes?.effectiveModifiedDate);

    // Current date
    const currentDate = new Date();

      // Calculate the difference in milliseconds
      const differenceInMs = currentDate.getTime() - effectiveModifiedDate.getTime();
      // Convert milliseconds to hours
      const differenceInHours = Math.floor(differenceInMs / (1000 * 60 * 60));

      // Calculate remaining milliseconds after removing hours
      const remainingMs = differenceInMs - (differenceInHours * (1000 * 60 * 60));

      // Convert remaining milliseconds to minutes
      const differenceInMinutes = Math.floor(remainingMs / (1000 * 60));

      // Set the difference in hours and minutes state
      setDateData(`${differenceInHours} hrs ${differenceInMinutes} mins`);

      setDetails(result);
      const previousPathname = localStorage.getItem("previousPathname");        
      localStorage.removeItem("previousPathname")
      if (previousPathname === "/fludicPlayer" && enrollment?.attributes?.progressPercent  === 100) {
        setShowDateValidationModal(true);
      }
      return result;
    } catch (error) {
      console.error("Error fetching learning objects:", error);
    }
  }

  useEffect(() => {
    console.log(jsonData, "jsonData");
    // detailsPageApi();
    getLearningObjects();
    
    
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const playCourse = (cid: string, mid?: string) => {
  //   setIsCid(cid);
  //   if (mid) {
  //     setIsCiid(mid);
  //   }
  // };

  const handleplayer = (id: string | undefined) => {
    if (enrollmentData?.attributes?.progressPercent !== 100) {
      // setIsPlayCourse(true);
      // playCourse(id);
      navigate(`/fludicPlayer?cid=${id}&mid=${iId}&back_url=${window.location.pathname}`)
    } else {
      if(isCustomerValue === "true"){
        navigate('/DashBoardPartnership')
      }else {
       navigate('/dashboard')
      }
    }
     setShowDateValidationModal(true);
  };

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };
  console.log(enrollmentData,author, "progressPercentage");
  return (
    <>
      <Header isLogin={false} />
      <img src={details?.data?.attributes?.bannerUrl} alt="Logo" style={{ maxHeight: "200px",  width: "100%", display: "block", margin: "0 auto" }}/>

      <div className="container flex ">
        <div className="my-8 flex-1 mx-5 mr-16">
          <div className="with-line">
            <p className="description-self">
              {details?.data?.attributes?.loFormat}
            </p>
            <h1 className="heading">
              {details?.data?.attributes?.localizedMetadata?.[0]?.name}
            </h1>
          </div>
          <p className="description-content">
            {details?.data?.attributes?.localizedMetadata?.[0]?.overview}
          </p>
          <div className="">
            <div className="">
              <div className="flex border-b-2">
                <button
                  className={`w-1/10 py-2 px-4 rounded-tl-lg focus:outline-none pb-2 ${
                    activeTab === 1 ? " tab-active" : "tab-unactive"
                  }`}
                  onClick={() => handleTabClick(1)}
                >
                  MODULES
                </button>
                <button
                  className={`w-1/10 py-2 px-4 rounded-tr-lg focus:outline-none pb-2 ${
                    activeTab === 2 ? " tab-active" : "tab-unactive"
                  }`}
                  onClick={() => handleTabClick(2)}
                >
                  NOTES
                </button>
              </div>
              <div className="p-8 pl-0 pr-0">
                <div
                  className={activeTab === 1 ? "" : "hidden"}
                  id="tab-content-1"
                >
                  <p className="core-content">Core Content</p>
                  <div className="rounded-lg bg-gray-200 flex justify-between p-6 pl-7">
                    <div className="flex">
                      <span className="mr-6">
                        <img
                          src={playiconone}
                          alt="Logo"
                          style={{ width: "54px", height: "53px" }}
                        />
                      </span>
                      <span className="">
                        <div>
                          <span className="module-title">
                            {
                              details?.data?.attributes?.localizedMetadata?.[0]
                                .name
                            }
                          </span>
                        </div>
                        <div>
                          <span className="module-type">
                            {details?.data?.attributes?.loFormat}
                          </span>
                        </div>
                      </span>
                    </div>
                    <div className="flex">
                      <span className="">
                        <div>
                          <span className="module-title">Last visited</span>
                        </div>
                        <div>
                          <span className="module-type">{dateData}</span>
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div
                  className={activeTab === 2 ? "" : "hidden"}
                  id="tab-content-2"
                >
                  <p></p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card mr-0 mt-8 ">
          <div className="card-content pt-9">
            <span className="course-progress">Course Progress</span>
            <div className="flex justify-between mt-7 mb-5">
              <div>
                <span className="modules-completed">1/1 modules completed</span>
              </div>
              <div>
                <span className="modules-completed">
                  {enrollmentData?.attributes?.progressPercent}% Completed
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-lg overflow-hidden mb-9">
              <div
                className="h-1 rounded-lg progress"
                style={{ width: `${enrollmentData?.attributes?.progressPercent}%` }}
              ></div>
            </div>
            <button
              /* className="bg-blue-300 rounded-lg w-full p-2 mb-8" */
              className={`  ${enrollmentData?.attributes?.progressPercent === 100
                ? "bg-green-500"
                : "bg-blue-500"} rounded-lg w-full p-2 mb-8 text-white` }
              onClick={() => handleplayer(details?.data?.id,)}
            >
              {enrollmentData?.attributes?.progressPercent !== 100
                ? "CONTINUE COURSE"
                : "COMPLETE COURSE"}
            </button>
            <p className="levels-achieved">Levels achieved after completion</p>
            <p className="levels-achieved-credit">
              Level 1 - Professional (Credit 3)
            </p>

            <div className="mt-5 ml-3">
                <p className="author">Author</p></div>
            <div className="author-info">
              <img
                src={author?.attributes?.avatarUrl}
                alt="Logo"
                style={{ width: "54px", height: "53px" }}
              />
              <div>
                <p className="username">
                  {/* {details?.data?.attributes?.authorNames[0]} */}
                  {author?.attributes?.name}
                </p>
                {/* <p className="post">{author?.attributes?.profile}</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <ModalforSuccess
        show={showDateValidationModal}
        handleClose={() => setShowDateValidationModal(false)}
        msg={errorMsg}
        title={title}
        imageUrl={img}
      />
    </>
  );
};

export default Detailspage;
