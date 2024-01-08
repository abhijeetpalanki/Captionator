export function clearTranscriptionItems(items) {
  items.forEach((item, key) => {
    if (!item.start_time) {
      const previousItem = items[key - 1];
      previousItem.alternatives[0].content += item.alternatives[0].content;
      delete items[key];
    }
  });
  return items.map((item) => {
    const { start_time, end_time } = item;
    const content = item.alternatives[0].content;
    return { start_time, end_time, content };
  });
}
