import { useEffect, useState } from "react";
import Header from "./Header";
import dpageone from "../assets/images/dpageone.png";
import playiconone from "../assets/images/playiconone.png";
import profileimage from "../assets/images/profileimage.png";
import ".././styles/Detailspage.css";
// import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import CoursePlayer from "./CoursePlayer";
import ModalforSuccess from ".././common/Modal/Modal";
import jsonData from "./resdata.json";
import { cid } from "../AppConfig";

interface Details {
  data?: {
    attributes?: {
      loFormat?: string;
      localizedMetadata?: Array<{ name?: string; overview?: string }>;
    };
  };
}

const Detailspage = () => {
  const [activeTab, setActiveTab] = useState(1);
  const [isPlayCourse, setIsPlayCourse] = useState(false);
  const [isCid, setIsCid] = useState<string | undefined>();
  const [isCiid, setIsCiid] = useState<string | null>(null);
  const location = useLocation();
  const currentUrl = location.pathname;
  const [showDateValidationModal, setShowDateValidationModal] = useState(false);
  const [title] = useState(
    "Congratulations on completing the “Negotiations 101” course"
  );
  const [errorMsg] = useState("You have earned your badge!");
  const [img] = useState(
    "https://cpcontents.adobe.com/public/account/107442/accountassets/107442/badges/8f41853356a8453d9e263f39d4377d74/badge_blackbelt.png"
  );

  const [progressPercentage, setProgressPercentage] = useState(0);
  const navigate = useNavigate();
  const [details, setDetails] = useState<Details | undefined>();
  async function getLearningObjects() {
    try {
      // const loId = "course:9180283"
      // const config = {
      //   // headers: { Authorization: "Bearer dea088ff9bbdca4e8cbbd5fa7de2d290" },
      //   headers: { Authorization: "Bearer b09cdf4e0b972e2cc595f17e341f3b3b" },
      // };
      // const response = await axios.get(
      //   `https://learningmanager.adobe.com/primeapi/v2/learningObjects/course:9180283?include=instances.loResources.resources%2Cskills.skillLevel.skill%2CsubLOs.instances.subLoInstances%2CsupplementaryLOs.instances.loResources.resources%2csubLOs.instances.loResources.resources%2CprerequisiteLOs%2cenrollment.learnerBadge.badge`,

      //   config
      // );
      const result = jsonData?.data;
      setDetails(jsonData);
      return result;
    } catch (error) {
      console.error("Error fetching learning objects:", error);
    }
  }

  useEffect(() => {
    console.log(jsonData, "jsonData");
    getLearningObjects();
  }, []);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const playCourse = (cid: string, mid?: string) => {
    setIsCid(cid);
    if (mid) {
      setIsCiid(mid);
    }
  };

  const handleplayer = (id: string) => {
    if (progressPercentage === 100) {
      navigate("/dashboard");
    } else {
      setIsPlayCourse(true);
      playCourse(id);
    }
  };

  const handleTabClick = (tabNumber: number) => {
    setActiveTab(tabNumber);
  };
  console.log(showDateValidationModal, "progressPercentage");
  return (
    <>
      {isPlayCourse && isCid ? (
        <CoursePlayer
          cid={isCid}
          mid={isCiid!}
          goBackUrl={currentUrl}
          setProgressPercentage={setProgressPercentage}
          setShowDateValidationModal={setShowDateValidationModal}
          setIsPlayCourse={setIsPlayCourse}
        />
      ) : null}
      <Header isLogin={false} />
      <img src={dpageone} alt="Logo" />

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
                          <span className="module-type">2 hrs 15 mins ago</span>
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
                  {progressPercentage}% Completed
                </span>
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-lg overflow-hidden mb-9">
              <div
                className="h-1 rounded-lg progress"
                style={{ width: `${progressPercentage}%` }}
              ></div>
            </div>
            <button
              className="bg-blue-300 rounded-lg w-full p-2 mb-8"
              onClick={() => handleplayer(cid)}
            >
              {progressPercentage === 100
                ? "COMPLETE COURSE"
                : "CONTINUE COURSE"}
            </button>
            <p className="levels-achieved">Levels achieved after completion</p>
            <p className="levels-achieved-credit">
              Level 1 - Professional (Credit 3)
            </p>
            <div className="author-info">
              <img
                src={profileimage}
                alt="Logo"
                style={{ width: "54px", height: "53px" }}
              />
              <div>
                <p className="author">Author</p>
                <p className="username">
                  {/* {details?.data?.attributes?.authorNames[0]} */}
                  Sonali Dhiman
                </p>
                <p className="post">Director of Partnerships</p>
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
