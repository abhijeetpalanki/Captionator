"use client";

import axios from "axios";
import { useEffect, useState } from "react";

export default function FilePage({ params }) {
  const filename = params.filename;
  const [isTransribing, setIsTransribing] = useState(false);
  const [transcriptionItems, setTranscriptionItems] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    axios.get("/api/transcribe?filename=" + filename).then((response) => {
      const status = response.data?.status;
      const transcption = response.data?.transcription;
      if (status === "IN_PROGRESS") {
        setIsTransribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTransribing(false);
        setTranscriptionItems(transcption.results.items);
      }
    });
  }

  return (
    <div>
      {filename}
      <div>is Transcrbing: {JSON.stringify(isTransribing)}</div>
      {transcriptionItems.length > 0 &&
        transcriptionItems.map((item, i) => (
          <div key={i}>
            <span className="mr-2 text-white/50">
              {item.start_time} - {item.end_time}
            </span>
            <span>{item.alternatives[0].content}</span>
          </div>
        ))}
    </div>
  );
}
