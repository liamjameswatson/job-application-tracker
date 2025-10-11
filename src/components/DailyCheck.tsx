import { Job } from "../types/types";

type DailyCheckProps = {
  jobs: Job[];
};

function DailyCheck({ jobs }: DailyCheckProps) {
  // Get today's date in yyyy-mm-dd format (same as typical stored date strings)
  const today = new Date().toISOString().split("T")[0];

  const todaysFollowUps = jobs.filter((job) => {
    if (!job.followUpDate) return false; // handle undefined/null
    const jobDate = new Date(job.followUpDate).toISOString().split("T")[0];
    return jobDate === today;
  });

  return (
    <>
      {todaysFollowUps.length === 0 && <p>No follow-ups today ✅</p>}

      {todaysFollowUps.map((job) => (
        <div key={job.id} className="bg-white p-4 rounded-lg shadow space-y-2 ">
          <p className="font-bold">{job.title}</p>
          <p>{job.company}</p>
          <p>
            Follow up on:{" "}
            {new Date(job.followUpDate).toLocaleDateString("en-GB")}
          </p>
        </div>
      ))}
    </>
  );
}

export default DailyCheck;
