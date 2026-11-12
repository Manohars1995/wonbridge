const alerts = [
  {
    id: 1,
    type: "info",
    title: "System Update",
    message: "A new update will be deployed at 2:00 AM tonight.",
    timestamp: "2025-06-06T10:30:00Z",
    read: false
  },
  {
    id: 2,
    type: "warning",
    title: "High Memory Usage",
    message: "Server-3 is experiencing high memory usage.",
    timestamp: "2025-06-06T09:45:00Z",
    read: false
  },
  {
    id: 3,
    type: "error",
    title: "Backup Failed",
    message: "Automatic backup failed due to permission issues.",
    timestamp: "2025-06-05T23:10:00Z",
    read: true
  },
  {
    id: 4,
    type: "success",
    title: "Deployment Successful",
    message: "Version 2.5.1 was successfully deployed.",
    timestamp: "2025-06-05T20:00:00Z",
    read: true
  },
  {
    id: 5,
    type: "critical",
    title: "Unauthorized Access Attempt",
    message: "A login attempt was blocked from an unrecognized device.",
    timestamp: "2025-06-06T05:12:00Z",
    read: false
  }
];

const NotifyModal = () => {
  return (
    <div className="flex flex-col gap-3 mt-2 
                    max-h-[70vh] overflow-y-auto 
                    pr-1">

      {alerts.map((each) => (
        <div
          key={each.id}
          className="
            flex flex-col sm:flex-row
            sm:justify-between
            gap-2
            p-3
            rounded-xl
            bg-gray-100
            shadow-sm
            hover:bg-gray-200
            transition-shadow
          "
        >
          {/* Left side */}
          <div className="flex-1 min-w-0">
            <h5 className="text-sm sm:text-base font-semibold text-[#343a40]">
              {each.title}
            </h5>

            <p className="
                text-xs sm:text-sm
                text-gray-600
                line-clamp-2 sm:line-clamp-1
              ">
              {each.message}
            </p>
          </div>

          {/* Right side */}
          <div className="
              flex flex-row sm:flex-col
              justify-between sm:justify-start
              sm:items-end
              text-right
              gap-1
              shrink-0
            ">
            <p className="text-xs sm:text-sm font-semibold">
              {each.type}
            </p>
            <p className="text-[10px] sm:text-xs text-gray-500">
              {each.timestamp}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default NotifyModal;
