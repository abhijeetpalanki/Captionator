"use client";

import TranscriptionEditor from "@/components/TranscriptionEditor";
import VideoResult from "@/components/VideoResult";
import { clearTranscriptionItems } from "@/libs/awsTranscriptionHelpers";
import axios from "axios";
import { useEffect, useState } from "react";

export default function FilePage({ params }) {
  const filename = params.filename;
  const [isTransribing, setIsTransribing] = useState(false);
  const [isFetchingInfo, setIsFetchingInfo] = useState(false);
  const [transcriptionItems, setTranscriptionItems] = useState([]);

  useEffect(() => {
    getTranscription();
  }, [filename]);

  function getTranscription() {
    setIsFetchingInfo(true);
    axios.get("/api/transcribe?filename=" + filename).then((response) => {
      setIsFetchingInfo(false);
      const status = response.data?.status;
      const transcription = response.data?.transcription;
      if (status === "IN_PROGRESS") {
        setIsTransribing(true);
        setTimeout(getTranscription, 3000);
      } else {
        setIsTransribing(false);

        setTranscriptionItems(
          clearTranscriptionItems(transcription.results.items)
        );
      }
    });
  }

  if (isTransribing) {
    return <div>Transcribing your video...</div>;
  }

  if (isFetchingInfo) {
    return <div>Fetching information...</div>;
  }

  return (
    <div>
      <div className="grid gap-8 sm:gap-16 sm:grid-cols-2">
        <div className="">
          <h2 className="mb-4 text-2xl text-white/60">Transcription</h2>
          <TranscriptionEditor
            transcriptionItems={transcriptionItems}
            setTranscriptionItems={setTranscriptionItems}
          />
        </div>
        <div className="">
          <h2 className="mb-4 text-2xl text-white/60">Result</h2>
          <VideoResult
            filename={filename}
            transcriptionItems={transcriptionItems}
          />
        </div>
      </div>
    </div>
  );
}
