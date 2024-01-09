export default function TranscriptionItem({
  item,
  handleStartTimeChange,
  handleEndTimeChange,
  handleContentChange,
}) {
  if (!item) {
    return "";
  }
  return (
    <div className="grid grid-cols-3 gap-1 my-1">
      <input
        type="text"
        className="p-1 rounded-md bg-white/20"
        value={item.start_time}
        onChange={handleStartTimeChange}
      />
      <input
        type="text"
        className="p-1 rounded-md bg-white/20"
        value={item.end_time}
        onChange={handleEndTimeChange}
      />
      <input
        type="text"
        className="p-1 rounded-md bg-white/20"
        value={item.content}
        onChange={handleContentChange}
      />
    </div>
  );
}
