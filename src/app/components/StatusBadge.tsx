interface StatusBadgeProps {
  status: "active" | "at-risk" | "completed";
}

export default function StatusBadge({ status }: StatusBadgeProps) {
  const styles = {
    active: "bg-green-100 text-green-800",
    "at-risk": "bg-red-100 text-red-800",
    completed: "bg-gray-100 text-gray-800",
  };

  const labels = {
    active: "Active",
    "at-risk": "At Risk",
    completed: "Completed",
  };

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs ${styles[status]}`}
    >
      {labels[status]}
    </span>
  );
}
