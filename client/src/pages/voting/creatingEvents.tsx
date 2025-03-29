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
import { Calendar as CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Input } from "@/components/ui/input";

const CreatingEvents: React.FC = () => {
  const [date, setDate] = React.useState<Date>();
  const [time, setTime] = React.useState<{ hour: string; minute: string }>({
    hour: "",
    minute: "",
  });
  const [ampm, setAmpm] = React.useState<"AM" | "PM">("AM");
  const [eventName, setEventName] = React.useState<string>("");
  const [location, setLocation] = React.useState<string>("");
  const [candidates, setCandidates] = React.useState<
    Array<{ name: string; manifesto: string; image: string }>
  >([]);
  const maxCandidates = 5; // Limit the number of candidates to add

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

  // const formatTime = (): string => {
  //   const { hour, minute } = time;
  //   return `${hour}:${minute} ${ampm}`;
  // };

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

  // Handle form submission and log the data
  const handleSubmit = () => {
    if (!date) {
      // Handle the case when date is not provided (optional, depending on your app logic)
      console.error("Event date is not selected.");
      return; // Prevent submission or handle accordingly
    }
    const eventData = {
      eventName,
      endTime: format(date, "yyyy-MM-dd'T'HH:mm:ss.SSS'Z'"), // Format the end time
      status: "ongoing",
      location,
      candidates,
    };

    // Log all the event data (including candidates' image URLs)
    console.log("Event Data Being Sent: ", eventData);
  };

  return (
    <div className="text-black">
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

        <DialogContent>
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
    </div>
  );
};

export default CreatingEvents;
