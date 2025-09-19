export function formatDateTime(value) {
  if (!value) return "null";

  const date = new Date(value);
  return date.toLocaleString("en-US", {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

// Format Duration (joined_at - left_at)
export function formatDuration(startTime, endTime) {
  if (!startTime || !endTime) return "null";

  const start = new Date(startTime);
  const end = new Date(endTime);

  const diffMs = end - start; // difference in milliseconds
  if (diffMs < 0) return "0s";

  const totalSeconds = Math.floor(diffMs / 1000);
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  return `${minutes}m ${seconds}s`;
}
