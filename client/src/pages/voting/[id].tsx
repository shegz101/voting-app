import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
// import Avatar from "../../assets/favAvatar.png"; // Your avatar image
import { ChevronLeft, Clock3, Users } from "lucide-react";
import { format } from "date-fns";
import Image from "next/image";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { getVotingEventById, voteForCandidate } from "@/utils/votingUtils"; // Import the utility

// Define your event and candidate types
type Candidate = {
  _id: string;
  name: string;
  manifesto: string;
  profilePic: string;
};

type EventData = {
  _id: string;
  eventName: string;
  location: string;
  endTime: string;
  status: string;
  candidates: Candidate[];
};

const VotingDetails: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<string | null>(
    null
  ); // Track selected candidate
  const [eventData, setEventData] = useState<EventData | null>(null); // Properly typed eventData state
  const [loading, setLoading] = useState<boolean>(true); // Track loading state
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    const fetchEvents = async (id: string | any) => {
      try {
        const data = await getVotingEventById(id); // Call the utility function
        console.log("Fetched Student Voting Events: ", data);
        setEventData(data); // Set events data to state
      } catch (error) {
        setError("Failed to fetch voting events.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    if (id) fetchEvents(id); // Fetch the events when the component mounts and only if id is available
  }, [id]); // Make sure to fetch again when the id changes

  const backgroundImage =
    "https://th.bing.com/th/id/R.39929737255c6eab4e446641e3b686d0?rik=%2bnI5kXHYss4Cag&riu=http%3a%2f%2f3.bp.blogspot.com%2f-FNx0QPPSHX8%2fUtGPXzJWfgI%2fAAAAAAAACTU%2fzyb7UwB6trE%2fs1600%2fGreen_Land_by_Deinha1974.jpg&ehk=idFLtB9d1vhQCwCvpvoCdfp6QbQPobLcC%2fCS7BUeJPs%3d&risl=&pid=ImgRaw&r=0";

  // Trigger this function if a vote was successful
  const voteSuccess = async (
    name: string,
    voterId: string,
    candidateId: string
  ) => {
    try {
      const result = await voteForCandidate(candidateId, voterId); // Call the utility function to vote for the candidate

      if (result) {
        toast.success(`Thank you for voting! You voted for ${name}`, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.log("Vote successful: ", result);

        setInterval(() => {
          router.push("/voting/votingEvents");
        }, 4000); // Log success message
      } else {
        toast.error(result?.message);
      }
    } catch (error: any) {
      if (error?.response.status == 400) {
        toast.error(error?.response.data.error);
        console.log(error);
      } else {
        // Handle case where error isn't an instance of Error
        toast.error("Error voting for the candidate. Please try again.");
      }
    }
  };

  const selectedName =
    eventData?.candidates.find((c) => c._id === selectedCandidate)?.name || "";

  const selectedCandidateId =
    eventData?.candidates.find((c) => c._id === selectedCandidate)?._id || "";

  const voterId = localStorage.getItem("matricNumber") || "190805093"; // Get the voter ID from local storage
  console.log("Selected Candidate ID: ", selectedCandidateId); // Log the selected candidate ID

  if (loading) {
    return <div>Loading...</div>; // Add loading state or spinner
  }

  if (error) {
    return <div>{error}</div>; // Display error message if fetching failed
  }

  const formatTime = (dateString: string) => {
    const eventDate = new Date(dateString); // Parse the date string into a Date object

    // Format the date to a more readable format (e.g., "7/19/2025 at 10:00 AM")
    const formattedDate = format(eventDate, "M/dd/yyyy 'at' h:mm a");
    return formattedDate;
  };

  return (
    <div className="p-2 md:p-4">
      {/* Header */}
      <ToastContainer />
      <div
        className="p-4 bg-cover bg-center rounded-lg"
        style={{
          backgroundImage: `url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          height: "300px",
          position: "relative",
        }}
      >
        <div>
          <button
            onClick={() => router.push("/voting/votingEvents")}
            className="font-bold text-3xl cursor-pointer"
          >
            <ChevronLeft width={50} height={50} />
          </button>
        </div>
        <div className="absolute top-20 text-center md:left-50 bg-opacity-50 text-white p-2 rounded-br-lg">
          {/* Conditional rendering for event data */}
          <h3 className="text-2xl md:text-4xl font-bold">
            {eventData?.eventName}
          </h3>
          <p className="text-2xl">{eventData?.location}</p>
        </div>
      </div>

      {/* Voting Deatails */}
      <div className="text-center mt-2 space-y-2">
        <h2 className="text-sm text-gray-400 gap-2 font-semibold flex items-center justify-center">
          <Users />
          Total Votes
        </h2>
        {/* <p className="text-blue-500 text-2xl font-semibold">
          {formatNumberWithCommas(eventData?.no_of_voters || 0)}
        </p> */}
        <p className="text-gray-400 flex justify-center items-center gap-2">
          <Clock3 /> Voting ends on {formatTime(eventData?.endTime || "")}
        </p>
      </div>

      {/* Candidates */}
      <div className="mb-6 mt-6">
        <h2 className="text-xl text-blue-500 font-semibold mb-4">
          Select a Candidate
        </h2>
        {eventData?.candidates.map((candidate) => (
          <div
            key={candidate._id}
            className={`mb-3 flex items-center justify-between border-2 p-3 rounded-md cursor-pointer ${
              selectedCandidate === candidate._id
                ? "border-blue-700" // Highlight selected candidate
                : "border-gray-300"
            }`}
            onClick={() => {
              if (selectedCandidate !== candidate._id) {
                setSelectedCandidate(candidate._id); // Select a new candidate
              }
            }}
          >
            <div className="flex items-center gap-4">
              <Image
                src={candidate.profilePic} // Use Image component for static images
                alt={candidate.name}
                width={48} // Set width
                height={48} // Set height
                className="rounded-full"
              />
              <div>
                <h3 className="text-lg font-semibold text-black">
                  {candidate.name}
                </h3>
                <p className="text-sm text-gray-600">
                  <span className="text-black">Manifesto:</span>{" "}
                  {candidate.manifesto}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Vote Button */}
      <AlertDialog>
        {!selectedCandidate ? (
          <button
            className="bg-blue-600 w-full text-white px-4 py-2 rounded-lg"
            onClick={() => {
              if (selectedCandidate) {
                alert(
                  "You voted for " +
                    eventData?.candidates.find(
                      (c: any) => c._id === selectedCandidate
                    )?.name
                );
              } else {
                toast.error("Please select a candidate to vote.");
              }
            }}
          >
            Vote
          </button>
        ) : (
          <AlertDialogTrigger>
            <button className="bg-blue-600 w-full text-white px-4 py-2 rounded-lg">
              Vote
            </button>
          </AlertDialogTrigger>
        )}
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              Do you want to proceed to voting?
            </AlertDialogTitle>
            <AlertDialogDescription>
              This action is irreversible! Are you sure you want to vote for{" "}
              <span className="text-blue-600">
                {
                  eventData?.candidates.find(
                    (c: any) => c._id === selectedCandidate
                  )?.name
                }
                ?
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <button
                onClick={() =>
                  voteSuccess(selectedName, voterId, selectedCandidateId)
                }
              >
                Vote
              </button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VotingDetails;
