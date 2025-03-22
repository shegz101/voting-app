import { useState, useEffect } from "react";

interface TypeWriterProps {
  text: string;
  styling?: string;
}

function TypeWriter({ text, styling }: TypeWriterProps) {
  const [displayedText, setDisplayedText] = useState("");
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, 100); // Adjust typing speed here (in milliseconds)

      return () => clearTimeout(timeout);
    }
  }, [index, text]);

  return <h2 className={styling}>{displayedText}</h2>;
}

export default TypeWriter;
