import React, { useState } from "react";
import { useRouter } from "next/router";
import { ToastContainer, toast } from "react-toastify";
import Avatar from "../../assets/favAvatar.png"; // Your avatar image
import { ChevronLeft, Clock3, Users } from "lucide-react";
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

// Sample data for candidates
const candidates = [
  {
    id: 1,
    image: Avatar,
    manifesto: "I will bring in various Tech Opportunities",
    name: "John Doe",
  },
  {
    id: 2,
    image: Avatar,
    manifesto: "I will bring in various Tech Opportunities",
    name: "Jane Smith",
  },
  {
    id: 3,
    image: Avatar,
    manifesto: "I will bring in various Tech Opportunities",
    name: "Alex Brown",
  },
];

const VotingDetails: React.FC = () => {
  const [selectedCandidate, setSelectedCandidate] = useState<number | null>(
    null
  ); // Track selected candidate
  const router = useRouter();
  // const { id } = router.query;

  // Background image and event data
  const backgroundImage =
    "https://th.bing.com/th/id/R.39929737255c6eab4e446641e3b686d0?rik=%2bnI5kXHYss4Cag&riu=http%3a%2f%2f3.bp.blogspot.com%2f-FNx0QPPSHX8%2fUtGPXzJWfgI%2fAAAAAAAACTU%2fzyb7UwB6trE%2fs1600%2fGreen_Land_by_Deinha1974.jpg&ehk=idFLtB9d1vhQCwCvpvoCdfp6QbQPobLcC%2fCS7BUeJPs%3d&risl=&pid=ImgRaw&r=0";

  const eventData = {
    name: "CSC Presidential Election",
    location: "Unilag",
    date: "7/19/2025",
    time: "10:00 AM",
    no_of_voters: 1000,
  };

  function formatNumberWithCommas(number: number): string {
    return number.toLocaleString(); // This will automatically add commas to large numbers
  }

  //   Trigger this function if a vote was successful
  const voteSuccess = (name: string) => {
    toast.success(`Thank you for voting! You voted for ${name}`, {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
    setInterval(() => {
      router.push("/voting/ongoingEvents");
    }, 4000);
  };

  const selectedName =
    candidates.find((c) => c.id === selectedCandidate)?.name || "";

  return (
    <div className="p-4">
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
            onClick={() => router.push("/voting/ongoingEvents")}
            className="font-bold text-3xl cursor-pointer"
          >
            <ChevronLeft width={50} height={50} />
          </button>
        </div>
        <div className="absolute top-20 text-center left-50 bg-opacity-50 text-white p-2 rounded-br-lg">
          <h3 className="text-4xl font-bold">{eventData.name}</h3>
          <p className="text-2xl">{eventData.location}</p>
        </div>
      </div>

      {/* Voting Deatails */}
      <div className="text-center mt-2 space-y-2">
        <h2 className="text-sm text-gray-400 gap-2 font-semibold flex items-center justify-center">
          <Users />
          Total Votes
        </h2>
        <p className="text-blue-500 text-2xl font-semibold">
          {formatNumberWithCommas(eventData.no_of_voters)}
        </p>
        <p className="text-gray-400 flex justify-center items-center gap-2">
          <Clock3 /> Voting ends on {eventData.date} at {eventData.time}
        </p>
      </div>

      {/* Candidates */}
      <div className="mb-6">
        <h2 className="text-xl text-blue-500 font-semibold mb-4">
          Select a Candidate
        </h2>
        {candidates.map((candidate) => (
          <div
            key={candidate.id}
            className={`mb-3 flex items-center justify-between border-2 p-3 rounded-md cursor-pointer ${
              selectedCandidate === candidate.id
                ? "border-blue-700" // Highlight selected candidate
                : "border-gray-300"
            }`}
            onClick={() => {
              if (selectedCandidate !== candidate.id) {
                setSelectedCandidate(candidate.id); // Select a new candidate
              }
            }}
          >
            <div className="flex items-center gap-4">
              <Image
                src={candidate.image} // Use Image component for static images
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
                    candidates.find((c) => c.id === selectedCandidate)?.name
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
              This action is irreversible! Are you you want to vote for{" "}
              <span className="text-blue-600">
                {candidates.find((c) => c.id === selectedCandidate)?.name}?
              </span>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction>
              <button onClick={() => voteSuccess(selectedName)}>Vote</button>
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default VotingDetails;
