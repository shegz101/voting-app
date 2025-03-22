import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import TypeWriter from "@/utils/TypeWriter";
import CardItem from "@/utils/cardItem";

// Register chart components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const EventDb: React.FC = () => {
  const votingEventsData = [
    {
      name: "CSC Presidential Election",
      candidates: [
        { name: "John Doe", votes: 1000 },
        { name: "Jane Smith", votes: 500 },
        { name: "Alex Brown", votes: 300 },
      ],
    },
    {
      name: "CSC Vice President Election",
      candidates: [
        { name: "Sally Doe", votes: 800 },
        { name: "Mark Smith", votes: 600 },
      ],
    },
    {
      name: "CSC Secretarial Election",
      candidates: [
        { name: "Samuel Brown", votes: 400 },
        { name: "Lisa White", votes: 200 },
      ],
    },
  ];

  const generateChartData = (candidates: { name: string; votes: number }[]) => {
    const labels = candidates.map((candidate) => candidate.name);
    const data = candidates.map((candidate) => candidate.votes);
    return {
      labels,
      datasets: [
        {
          label: "Votes",
          data,
          backgroundColor: "rgb(27, 45, 233)",
        },
      ],
    };
  };

  return (
    <div className="p-4 text-black">
      <TypeWriter text={`Hello, Admin 👋`} styling="font-bold text-3xl" />
      <p className="text-gray-500">
        Here is an Overview of all the Voting Events
      </p>

      <CardItem />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {votingEventsData.map((event, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{event.name}</h2>
            <Bar
              data={generateChartData(event.candidates)}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: "Votes per Candidate",
                  },
                  legend: {
                    position: "top",
                  },
                },
                scales: {
                  x: {
                    beginAtZero: true,
                  },
                  y: {
                    beginAtZero: true,
                  },
                },
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventDb;
