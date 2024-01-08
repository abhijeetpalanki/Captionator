import { useState } from "react";

export default function TranscriptionItem({ item }) {
  const [startSeconds, setStartSeconds] = useState(item.start_time);
  const [endSeconds, setEndSeconds] = useState(item.end_time);
  const [content, setContent] = useState(item.content);

  return (
    <div className="grid grid-cols-3 gap-1 my-1">
      <input
        type="text"
        className="p-1 rounded-md bg-white/20"
        value={startSeconds}
        onChange={(e) => setStartSeconds(e.target.value)}
      />
      <input
        type="text"
        className="p-1 rounded-md bg-white/20"
        value={endSeconds}
        onChange={(e) => setEndSeconds(e.target.value)}
      />
      <input
        type="text"
        className="p-1 rounded-md bg-white/20"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
    </div>
  );
}
