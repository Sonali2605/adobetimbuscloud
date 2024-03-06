import { Link } from 'react-router-dom'; // Import Link from React Router

const CourseExplore = () => {
  // Dummy data for courses taken by peers
  const courses = [
    { name: "Negotiations 101", imageUrl: "./images/Peers/img3.png" },
    { name: "React Fundamentals", imageUrl: "./images/Peers/img1.png" },
    { name: "JavaScript Basics", imageUrl: "./images/Peers/img2.png" },
    { name: "CSS Styling", imageUrl: "./images/Peers/img4.png" },
    { name: "Web Design", imageUrl: "./images/Peers/img5.png" }
  ];

  return (
    <div>
      <h2 className="text-lg font-bold mb-4">Courses to Explore</h2>
      <div className="flex">
        {courses.map((course, index) => (
          <div key={index} className="max-w-xs mx-2 bg-white overflow-hidden shadow-lg rounded-lg relative">
            <div className="relative">
              <img
                className="w-full h-50 object-cover rounded-t-lg"
                src={course.imageUrl}
                alt={course.name}
              />
              <div className="absolute top-0 left-0 w-full text-center py-2">
                <h2 className="text-sm text-white font-bold">{course.name}</h2>
              </div>
              <div className="absolute bottom-0 left-0 w-full text-center py-2 mb-3">
                {/* Replace button with Link component */}
                <Link to="/detailspage" className="text-blue-500 text-sm bg-white px-4 py-2 rounded-md">Explore</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CourseExplore;
