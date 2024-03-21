import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

// interface CalendarCourseProps {
//   dotDates: string[];
//   selectedDate: Date | null;
//   isDottedDate: Date | null;
// }

interface Course {
  title: string;
  description: string;
  // Add other properties as needed
}

const CalendarCourse = ({ selectedDate, selectedCourse }: { selectedDate: Date | null; selectedCourse: Course | null }) => {
  
  return (
    <div className="max-w-xs mx-auto overflow-hidden ">
      <h2 className="font-bold py-4 text-black text-lg">Courses Enrolled</h2>
      <div className="wrapper shadow-lg text-white relative">
        <div className="bg-black p-10 relative" style={{ height: '150px' }}>
          <div className="absolute top-0" style={{ right: '10px' }}>
            <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
            <span className="text-xs">
            {selectedDate && typeof selectedDate === 'object' && (
  <span className="text-xs">{selectedDate.toLocaleDateString()}</span>
)}
{!selectedDate && <span className="text-xs">No Date</span>}

              </span> {/* Handle null case */}
          </div>
          <div
        className={`px-4 py-2 absolute bottom-0 left-0 w-full ${
          selectedDate ? '' : ''
        }`} // Add a class for dotted dates
      >           <div className="font-bold text-sm mb-1">{selectedCourse?.title || 'No Course Selected'} 

</div>
          </div>
        </div>
        <div className="p-4 bg-white text-black">
          <p className="text-xs mb-2">{selectedCourse?.description || ''}</p>
          <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md w-full">
            REGISTER HERE
          </button>
        </div>
      </div>
    </div>
  );
};

export default CalendarCourse;
