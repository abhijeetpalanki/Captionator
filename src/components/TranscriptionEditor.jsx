import TranscriptionItem from "./TranscriptionItem";

export default function TranscriptionEditor({
  transcriptionItems,
  setTranscriptionItems,
}) {
  function updateTranscriptionItem(index, prop, ev) {
    const newItems = [...transcriptionItems];
    const newItem = { ...newItems[index] };
    newItem[prop] = ev.target.value;
    newItems[index] = newItem;
    setTranscriptionItems(newItems);
  }

  return (
    <>
      <div className="sticky top-0 grid grid-cols-3 p-2 rounded-md bg-violet-800/80">
        <div>From</div>
        <div>End</div>
        <div>Content</div>
      </div>
      {transcriptionItems.length > 0 && (
        <div>
          {transcriptionItems.map((item, key) => (
            <div key={key}>
              <TranscriptionItem
                item={item}
                handleStartTimeChange={(ev) =>
                  updateTranscriptionItem(key, "start_time", ev)
                }
                handleEndTimeChange={(ev) =>
                  updateTranscriptionItem(key, "end_time", ev)
                }
                handleContentChange={(ev) =>
                  updateTranscriptionItem(key, "content", ev)
                }
              />
            </div>
          ))}
        </div>
      )}
    </>
  );
}
