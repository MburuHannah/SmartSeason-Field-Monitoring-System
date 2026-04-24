interface StatusBadgeProps {
  status: "active" | "at-risk" | "completed" | undefined;
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles: Record<string, string> = {
    active:    "bg-green-100 text-green-800",
    "at-risk": "bg-red-100 text-red-800",
    completed: "bg-gray-100 text-gray-800",
  };

  const labels: Record<string, string> = {
    active:    "Active",
    "at-risk": "At Risk",
    completed: "Completed",
  };

  const resolvedStatus = status ?? "active";   // safe fallback

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${
        styles[resolvedStatus] ?? styles["active"]
      }`}
    >
      {labels[resolvedStatus] ?? "Active"}
    </span>
  );
}
