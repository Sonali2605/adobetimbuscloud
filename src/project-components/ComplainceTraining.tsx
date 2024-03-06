import ".././styles/common.css";
const ComplianceTraining = () => {
  // Dummy data for product name and due date
  const products = [
    { name: "Third Party Risk Management", dueDate: "Due Date: 29th April 2023" },
    { name: "Anti Money Laundering Solution", dueDate: "Due Date: 5th May 2023" },
    { name: "Anti Money Laundering Solution", dueDate: "Due Date: 16th May 2023" }
  ];

  // Function to determine the color based on the index
  const getColor = (index: number) => {
    if (index === 0) {
      return 'text-red-500'; // Red color for index 0
    } else if (index === 1) {
      return 'text-yellow-500'; // Yellow color for index 1
    } else {
      return 'text-green-500'; // Green color for index 2 and beyond
    }
  };

  return (
    <div className="max-w-xs mx-auto bg-white overflow-hidden shadow-lg p-4 rounded-md">
      <h2 className="text-md font-bold mb-4">Pending Compliance Training</h2>
      {products.map((product, index) => (
        <div key={index} className="flex justify-between items-center border-b pb-2">
          <div className="flex items-center">
            <div className="px-3 py-2">
              <div className={`text-sm mb-1`}>{product.name}</div> {/* Apply color based on the index */}
              <p className={`text-gray-700 text-xs ${getColor(index)}`}>{product.dueDate}</p> {/* Apply color based on the index */}
            </div>
          </div>
          <button className="adobe-font bg-blue-500 hover:bg-blue-700 text-white py-1 px-6 rounded">
            START
          </button>
        </div>
      ))}
    </div>
  );
};

export default ComplianceTraining;
