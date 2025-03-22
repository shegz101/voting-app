import { useState } from "react";
import OngoingEvents from "./ongoingEvents";

const VotingEvents: React.FC = () => {
  const [activeTab, setActiveTab] = useState(0);

  const tabs = [
    {
      title: "Ongoing",
      content: <OngoingEvents />,
    },
    {
      title: "Upcoming",
      content: "Here are your upcoming voting events.",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* Tab Navigation */}
      <div className="mb-4 flex space-x-4 border-b-2 border-gray-300">
        {tabs.map((tab, index) => (
          <button
            key={index}
            onClick={() => setActiveTab(index)}
            className={`text-lg font-semibold pb-2 ${
              activeTab === index
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-600"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="pt-4">
        <div className="text-xl font-medium">{tabs[activeTab].content}</div>
      </div>
    </div>
  );
};

export default VotingEvents;
