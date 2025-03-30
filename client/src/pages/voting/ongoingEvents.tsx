import Link from "next/link";
// import axios from "axios";
import { Clock3, PersonStanding } from "lucide-react";
// import { useState, useEffect } from "react";

const ongoingEvents = [
  {
    id: 1,
    name: "CSC Presidential Election",
    location: "Unilag",
    date: "7/19/2025",
    time: "10:00 AM",
    no_of_voters: 1000,
  },
  {
    id: 2,
    name: "CSC Vice President Election",
    location: "Unilag",
    date: "7/19/2025",
    time: "8:00 AM",
    no_of_voters: 500,
  },
  {
    id: 3,
    name: "CSC Secretarial Election",
    location: "Unilag",
    date: "7/19/2025",
    time: "10:00 AM",
    no_of_voters: 300,
  },
];

const OngoingEvents: React.FC = () => {
  // const [events, setEvents] = useState<any[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  // const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const fetchVotingEvents = async () => {
  //     try {
  //       const response = await axios.get(
  //         "http://localhost:5000/api/student/voting-events"
  //       );
  //       setEvents(response.data); // Assuming the response data contains the list of events
  //       console.log(response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError("Failed to fetch events.");
  //       setLoading(false);
  //     }
  //   };

  //   fetchVotingEvents();
  // }, []); // Empty dependency array means this will run once when the component mounts

  // if (loading) {
  //   return <div>Loading...</div>;
  // }

  // if (error) {
  //   return <div>{error}</div>;
  // }

  const backgroundImage =
    "https://th.bing.com/th/id/R.39929737255c6eab4e446641e3b686d0?rik=%2bnI5kXHYss4Cag&riu=http%3a%2f%2f3.bp.blogspot.com%2f-FNx0QPPSHX8%2fUtGPXzJWfgI%2fAAAAAAAACTU%2fzyb7UwB6trE%2fs1600%2fGreen_Land_by_Deinha1974.jpg&ehk=idFLtB9d1vhQCwCvpvoCdfp6QbQPobLcC%2fCS7BUeJPs%3d&risl=&pid=ImgRaw&r=0";

  // Helper function to calculate hours remaining
  const calculateTimeLeft = (eventTime: string) => {
    const eventDate = new Date(`${eventTime} UTC`);
    const currentDate = new Date();
    const diff = eventDate.getTime() - currentDate.getTime();
    return Math.floor(diff / (1000 * 60 * 60)); // Convert to hours
  };

  function formatNumberWithCommas(number: number): string {
    return number.toLocaleString(); // This will automatically add commas to large numbers
  }

  return (
    <div className="flex flex-wrap gap-20 p-4">
      {ongoingEvents.map((event, index) => (
        <div
          key={index}
          className="w-[380px] cursor-pointer p-4 bg-cover bg-center rounded-lg"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "300px",
            position: "relative",
          }}
        >
          {/* Event Name and Location */}
          <div className="absolute top-0 left-0 bg-opacity-50 text-white p-2 rounded-br-lg">
            <h3 className="text-lg font-bold">{event.name}</h3>
            <p>{event.location}</p>
          </div>

          {/* Event Info */}
          <div className="absolute bottom-0 left-0 w-full bg-blue-600 p-2 text-white flex justify-between items-center rounded-b-lg">
            <div>
              <p className="flex gap-2 items-center">
                <Clock3 />
                {calculateTimeLeft(`${event.date} ${event.time}`)} hours left
              </p>
              <p className="flex gap-2 items-center">
                <PersonStanding /> {formatNumberWithCommas(event.no_of_voters)}{" "}
                voters
              </p>
            </div>
            <Link href={`/voting/${event.id}`}>
              <button className="bg-white cursor-pointer text-blue-600 px-4 py-2 rounded-lg">
                Vote
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
};

export default OngoingEvents;
