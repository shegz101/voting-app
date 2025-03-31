import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Clock3, PersonStanding } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import {
  createEvent,
  addCandidates,
  getVotingEvents,
  deleteEvent,
} from "@/utils/votingUtils";
import { toast, ToastContainer } from "react-toastify";
import { useState } from "react";

const CreatingEvents: React.FC = () => {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<{ hour: string; minute: string }>({
    hour: "",
    minute: "",
  });
  const [events, setEvents] = useState<any[]>([]); // Store events in state
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const [ampm, setAmpm] = React.useState<"AM" | "PM">("AM");
  const [eventName, setEventName] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [candidates, setCandidates] = React.useState<
    Array<{ name: string; manifesto: string; image: string }>
  >([]);
  const maxCandidates = 5; // Limit the number of candidates to add

  React.useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await getVotingEvents(); // Call the utility function
        console.log("Fetched Events: ", data); // Log the fetched events for debugging
        setEvents(data); // Set events data to state
      } catch (error) {
        setError("Failed to fetch voting events.");
      } finally {
        setLoading(false); // Stop loading
      }
    };

    fetchEvents(); // Fetch the events when the component mounts
  }, []);

  const refreshData = async () => {
    getVotingEvents();
  };

  // Handlers for managing the input fields
  const handleTimeChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    field: "hour" | "minute"
  ) => {
    setTime((prev) => ({
      ...prev,
      [field]: e.target.value,
    }));
  };

  const handleAmpmChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setAmpm(e.target.value as "AM" | "PM");
  };

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

  const handleCandidateChange = (
    index: number,
    field: "name" | "manifesto" | "image",
    value: string
  ) => {
    const updatedCandidates = [...candidates];
    updatedCandidates[index] = {
      ...updatedCandidates[index],
      [field]: value,
    };
    setCandidates(updatedCandidates);
  };

  const addCandidate = () => {
    if (candidates.length < maxCandidates) {
      setCandidates([...candidates, { name: "", manifesto: "", image: "" }]);
    }
  };

  const handleImageUpload = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      handleCandidateChange(index, "image", imageUrl); // Store the temporary URL
    }
  };

  const status = "ongoing";

  const handleSubmit = async () => {
    if (!date) {
      // Handle the case when date is not provided (optional, depending on your app logic)
      console.error("Event date is not selected.");
      return; // Prevent submission or handle accordingly
    }
    let endTime = format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'");
    try {
      // Call API here with student login function
      const result = await createEvent(
        eventName,
        endTime,
        status,
        location,
        candidates
      );

      if (result) {
        // If login is successful, store the role in localStorage
        toast.success(result?.message || "Event created successfully");
        console.log("Event Data Being Sent to server: ", result);

        // add a candidate
        try {
          for (const candidate of candidates) {
            const candidateResult = await addCandidates(
              candidate.name,
              candidate.manifesto,
              candidate.image,
              result?._id // Assuming the event ID is returned in the result
            );
            console.log(
              "Candidate Data Being Sent to server: ",
              candidateResult
            );
          }
          toast.success("Candidates added successfully");
        } catch {
          toast.error("Error adding candidates");
        }
        // Redirect to voting events page
      } else {
        toast.error(result?.error || "Error creating an event");
      }
      refreshData(); // Refresh the events after creating a new one
    } catch (error: any) {
      toast.error(error?.response?.data?.message || "Error logging in");
    }
    setEventName("");
    setLocation("");
    setDate(undefined);
    setTime({ hour: "", minute: "" }); // Reset time state
    setCandidates([]); // Reset candidates state
    setAmpm("AM"); // Reset AM/PM state
  };

  const handleDelete = async (id: string) => {
    try {
      setLoading(true);
      const result = await deleteEvent(id); // Call the deleteEvent function
      console.log(result); // Handle success (e.g., show a success message)
      toast.success(result.message || "Event deleted successfully");
      refreshData(); // Refresh the events after deletion
    } catch (error: any) {
      setError("Failed to delete event");
      toast.error("Error deleting event:", error);
    } finally {
      setLoading(false);
    }
  };

  const backgroundImage =
    "https://th.bing.com/th/id/R.39929737255c6eab4e446641e3b686d0?rik=%2bnI5kXHYss4Cag&riu=http%3a%2f%2f3.bp.blogspot.com%2f-FNx0QPPSHX8%2fUtGPXzJWfgI%2fAAAAAAAACTU%2fzyb7UwB6trE%2fs1600%2fGreen_Land_by_Deinha1974.jpg&ehk=idFLtB9d1vhQCwCvpvoCdfp6QbQPobLcC%2fCS7BUeJPs%3d&risl=&pid=ImgRaw&r=0";

  function formatNumberWithCommas(number: number): string {
    return number.toLocaleString(); // This will automatically add commas to large numbers
  }

  return (
    <div className="text-black">
      {error && <div className="text-red-500 mt-2">{error}</div>}
      <Dialog>
        <DialogTrigger asChild>
          <div
            className="bg-slate-100 mt-5 p-10 font-bold items-center flex flex-col rounded-md 
            border-dashed border-2 hover:shadow-md cursor-pointer"
          >
            <h2 className="text-3xl">+</h2>
            <h2>Create New Voting Event</h2>
          </div>
        </DialogTrigger>

        <DialogContent className="overflow-y-auto overflow-x-hidden max-h-[85vh]">
          <DialogHeader>
            <DialogTitle>Create a Voting Event</DialogTitle>
            <DialogDescription>
              <div className="space-y-4">
                {/* Voting Event Name */}
                <div className="mt-2">
                  <h1 className="text-black font-bold my-1">
                    Voting Event Name
                  </h1>
                  <Input
                    placeholder="e.g. CSC Presidential Election"
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                  />
                </div>

                {/* Voting Location */}
                <div className="mt-2">
                  <p className="text-black font-bold my-1">Voting Location</p>
                  <Input
                    placeholder="e.g. Unilag"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {/* Voting Deadline */}
                <div className="mt-2">
                  <p className="text-black font-bold my-1">Voting Deadline</p>
                  <div className="flex gap-4 w-full">
                    <div className="flex gap-2 w-full sm:w-auto">
                      {/* Hour Input */}
                      <Input
                        type="number"
                        placeholder="Hour"
                        value={time.hour}
                        onChange={(e) => handleTimeChange(e, "hour")}
                        className="w-1/4 sm:w-20"
                      />
                      {/* Minute Input */}
                      <Input
                        type="number"
                        placeholder="Minute"
                        value={time.minute}
                        onChange={(e) => handleTimeChange(e, "minute")}
                        className="w-1/4 sm:w-20"
                      />
                      {/* AM/PM Selector */}
                      <select
                        value={ampm}
                        onChange={handleAmpmChange}
                        className="w-1/4 sm:w-20 border p-2 rounded-md"
                      >
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>

                    {/* Date Picker */}
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-[200px] justify-start text-left font-normal",
                            !date && "text-muted-foreground"
                          )}
                        >
                          <CalendarIcon />
                          {date ? (
                            format(date, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                  </div>
                </div>

                {/* Add a Candidate Section */}
                <div className="mt-4">
                  <p className="text-black font-bold my-1">Add a Candidate</p>
                  <Button
                    onClick={addCandidate}
                    className="mb-4 bg-blue-500 hover:bg-blue-400"
                    disabled={candidates.length >= maxCandidates}
                  >
                    Add
                  </Button>

                  {candidates.map((candidate, index) => (
                    <div key={index} className="space-y-2">
                      <div>
                        <Input
                          placeholder="Candidate Name"
                          value={candidate.name}
                          onChange={(e) =>
                            handleCandidateChange(index, "name", e.target.value)
                          }
                        />
                      </div>
                      <div>
                        <Input
                          placeholder="Manifesto"
                          value={candidate.manifesto}
                          onChange={(e) =>
                            handleCandidateChange(
                              index,
                              "manifesto",
                              e.target.value
                            )
                          }
                        />
                      </div>
                      <div>
                        <input
                          type="file"
                          onChange={(e) => handleImageUpload(index, e)}
                          accept="image/*"
                          className="w-full p-2 rounded-md"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </DialogDescription>
          </DialogHeader>
          {/* Dialog Footer */}
          <DialogFooter className="sm:justify-start">
            <DialogClose asChild>
              <Button
                className="text-white bg-blue-600 hover:bg-blue-400 mt-5 w-full"
                onClick={handleSubmit} // Trigger data logging
              >
                Create Event
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <div className="flex flex-wrap gap-20 p-4">
        {events.map((event, index) => (
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
              <p className="text-xl font-medium">Status: {event.status}</p>
            </div>

            {/* Event Info */}
            <div className="absolute bottom-0 left-0 w-full bg-blue-600 p-2 text-white flex justify-between items-center rounded-b-lg">
              <div>
                <p className="flex gap-2 items-center">
                  <Clock3 />
                  {getTimeLeft(event.endTime)} hour(s) left
                </p>
                {/* <p className="flex gap-2 items-center">
                  <PersonStanding />{" "}
                  {formatNumberWithCommas(event.no_of_voters)} voters
                </p> */}
              </div>
              <button
                onClick={() => handleDelete(event._id)}
                disabled={loading}
                className="bg-red-500 text-white px-4 py-2 rounded-md"
              >
                {loading ? "Deleting..." : "Delete Event"}
              </button>
            </div>
          </div>
        ))}
      </div>
      <ToastContainer />
    </div>
  );
};

export default CreatingEvents;
