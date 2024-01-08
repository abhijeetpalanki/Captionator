"use client";

import SparklesIcon from "@/components/SparklesIcon";
import TranscriptionItem from "@/components/TranscriptionItem";
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
      <div className="grid grid-cols-2 gap-16">
        <div className="">
          <h2 className="mb-4 text-2xl text-white/60">Transcription</h2>
          <div className="sticky top-0 grid grid-cols-3 p-2 rounded-md bg-violet-800/80">
            <div>From</div>
            <div>End</div>
            <div>Content</div>
          </div>
          {transcriptionItems.length > 0 &&
            transcriptionItems.map((item, i) => (
              <TranscriptionItem item={item} key={i} />
            ))}
        </div>
        <div className="">
          <h2 className="mb-4 text-2xl text-white/60">Result</h2>
          <div className="mb-4">
            <button className="inline-flex gap-2 px-6 py-2 bg-green-600 border-2 rounded-full cursor-pointer border-purple-700/50">
              <SparklesIcon />
              <span>Apply Captions</span>
            </button>
          </div>
          <div className="overflow-hidden rounded-xl">
            <video
              controls
              src={"https://ayp-captionator.s3.amazonaws.com/" + filename}
            ></video>
          </div>
        </div>
      </div>
    </div>
  );
}
