import { useState, useEffect } from "react";
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
import { getAllVotingEvents } from "@/utils/votingUtils";

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
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVotingEvents = async () => {
      try {
        const response = await getAllVotingEvents();
        console.log(response);
        setEvents(response);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching voting events:", error);
      }
    };

    fetchVotingEvents();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  console.log("all voting events: ", events);

  const noOfEvents = events.length;

  const getTotalCandidates = (events: any) => {
    return events.reduce(
      (total: number, event: any) => total + event.candidates.length,
      0
    );
  };

  const getTotalVotes = (events: any) => {
    return events.reduce(
      (total: number, event: any) =>
        total +
        event.candidates.reduce(
          (sum: number, candidate: any) => sum + candidate.votes,
          0
        ),
      0
    );
  };

  const generateChartData = (
    candidates: {
      name: string;
      manifesto: string;
      profilePic: string;
      _id: string;
      votes: number;
    }[]
  ) => {
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

      <CardItem
        noOfEvents={noOfEvents}
        totalCandidates={getTotalCandidates(events)}
        totalVotes={getTotalVotes(events)}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
        {events.map((event, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-4">{event.eventName}</h2>
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
