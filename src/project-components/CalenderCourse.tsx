import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/free-solid-svg-icons';

interface CalendarCourseProps {
  date: string | null; // Update the type to accept string or null
}

const CalendarCourse: React.FC<CalendarCourseProps> = ({ date }) => {
  return (
    <div className="max-w-xs mx-auto overflow-hidden shadow-lg text-white relative">
      <div className="bg-black p-10 relative" style={{ height: '150px' }}>
        <div className="absolute top-0" style={{ right: '10px' }}>
          <FontAwesomeIcon icon={faCalendarAlt} className="mr-2" />
          <span className="text-xs">{date ? date : 'No Date'}</span> {/* Handle null case */}
        </div>
        <div className="px-4 py-2 absolute bottom-0 left-0 w-full">
          <div className="font-bold text-sm mb-1">Achieving Peak Performance in Insurance Sale</div>
        </div>
      </div>
      <div className="p-4 bg-white text-black">
        <p className="text-xs mb-2">Check out this webinar to see how peak performers at Premier Protect read body language and keywords to pursue their customers.</p>
        <button className="bg-blue-500 hover:bg-blue-700 text-white  py-2 px-4 rounded-md w-full">
          Register Here
        </button>
      </div>
    </div>
  );
};

export default CalendarCourse;
