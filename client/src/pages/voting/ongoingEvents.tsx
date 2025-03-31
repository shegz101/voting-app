import Link from "next/link";
import { Clock3, PersonStanding } from "lucide-react";
import { getStudentVotingEvents } from "@/utils/votingUtils";
import { useState, useEffect } from "react";

const OngoingEvents: React.FC = () => {
  const [events, setEvents] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getStudentVotingEvents(); // Call the utility function
        console.log("Fetched Student Voting Events: ", data); // Log the fetched events for debugging
        setEvents(data); // Set events data to state
      } catch (error) {
        setError("Failed to fetch voting events.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEvents(); // Fetch the events when the component mounts
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

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

  const getTimeLeft = (endDate: string) => {
    // Parse the end date string (ISO format) into a JavaScript Date object
    const deadline = new Date(endDate);

    // Calculate the difference between now and the end time
    const timeLeftInMs = deadline.getTime() - new Date().getTime();

    // Convert milliseconds to hours (1 hour = 1000 ms * 60 seconds * 60 minutes)
    const hoursLeft = Math.floor(timeLeftInMs / (1000 * 60 * 60));

    // You can return hours left
    return hoursLeft;
  };

  return (
    <div className="flex flex-wrap gap-20 p-4">
      {events
        .filter((event) => event.status === "ongoing")
        .map((event, index) => (
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
              <h3 className="text-lg font-bold">{event.eventName}</h3>
              <p>{event.location}</p>
              {/* <p className="text-xl font-medium">Status: {event.status}</p> */}
            </div>

            {/* Event Info */}
            <div className="absolute bottom-0 left-0 w-full bg-blue-600 p-2 text-white flex justify-between items-center rounded-b-lg">
              <div>
                <p className="flex gap-2 items-center">
                  <Clock3 />
                  {getTimeLeft(event.endTime)} hour(s) left
                </p>
              </div>
              <Link href={`/voting/${event._id}`}>
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
