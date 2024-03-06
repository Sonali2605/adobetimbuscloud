import { useState } from 'react';

const Leaderboard = () => {
  // Dummy data for network members with existing user images
  const networkMembers = [
    { name: "88 points", imageUrl: "https://randomuser.me/api/portraits/men/1.jpg" },
    { name: "87 points", imageUrl: "https://randomuser.me/api/portraits/women/2.jpg" },
    { name: "93 points", imageUrl: "https://randomuser.me/api/portraits/men/3.jpg" },
    { name: "95 points", imageUrl: "https://randomuser.me/api/portraits/women/4.jpg" },
    { name: "105 points", imageUrl: "https://randomuser.me/api/portraits/men/5.jpg" },
    { name: "88 points", imageUrl: "https://randomuser.me/api/portraits/women/6.jpg" },
    { name: "88 points", imageUrl: "https://randomuser.me/api/portraits/men/7.jpg" },
    { name: "88 points", imageUrl: "https://randomuser.me/api/portraits/women/8.jpg" },
    { name: "88 points", imageUrl: "https://randomuser.me/api/portraits/men/9.jpg" },
    { name: "88 points", imageUrl: "https://randomuser.me/api/portraits/women/10.jpg" },
    { name: "88 points", imageUrl: "https://randomuser.me/api/portraits/women/11.jpg" },
    { name: "88 points", imageUrl: "https://randomuser.me/api/portraits/men/12.jpg" }
  ];

  // Dummy data for courses taken by peers
  const courses = [
    { name: "React Fundamentals", imageUrl: "./images/Peers/img1.png" },
    { name: "JavaScript Basics", imageUrl: "./images/Peers/img2.png" },
    { name: "HTML5 Essentials", imageUrl: "./images/Peers/img3.png" },
    { name: "CSS Styling", imageUrl: "./images/Peers/img4.png" },
    { name: "Web Design", imageUrl: "./images/Peers/img5.png" }
  ];

  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="mx-auto bg-white overflow-hidden shadow-lg p-4">
      <h2 className="text-md font-bold mb-2">Leaderboard</h2>
      <div className="grid grid-cols-5 gap-4">
        {networkMembers.slice(0, 5).map((member, index) => (
          <div key={index} className="flex flex-col items-center">
            <div className="relative rounded-full overflow-hidden w-12 h-12">
              <img
                className="object-cover w-full h-full"
                src={member.imageUrl}
                alt={member.name}
              />
              {index < 4 && <div className="absolute top-0 left-0 right-0 bottom-0 border border-gray-300 rounded-full"></div>}
            </div>
            <div className="mt-1">
              <h2 className="text-xs">{member.name}</h2>
            </div>
          </div>
        ))}
      </div>
      {!expanded && 
      <div className="text-center mt-8">
        <button
          className="border border-blue-500 hover:border-blue-700 text-blue-500 text-sm py-2 px-2 rounded"
          onClick={toggleExpanded}
        >
         VIEW COURSES TAKEN BY YOUR PEERS
        </button>
      </div>
    }
      {expanded && (
        <div className="mt-4">
          <h2 className="text-md font-bold mt-10 mb-8">Courses Taken By Your Peers</h2>
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
          <div className="text-center mt-4">
            <button
              className="text-blue-500 font-bold"
              onClick={toggleExpanded}
            >
              Show Less
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Leaderboard;
