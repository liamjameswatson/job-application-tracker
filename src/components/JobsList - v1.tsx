// import jobs from "../assets/jobs.json";
import { Job } from "../types/types";
import { formatStringDate } from "../utilities/date";

type JobListProps = {
  jobList: Job[];
  onSetIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onSetDeleteJob: (id: number) => void;
  onIsEditing: (job: Job) => void;
};

function JobList({
  jobList,
  onSetIsVisible,
  onSetDeleteJob,
  onIsEditing,
}: JobListProps) {
  const jobs = jobList;
  return (
    <div className="p-5">
      {/* TABLE */}
      <h1>Jobs List</h1>
      <div className="overflow-auto rounded-lg shadow hidden md:block">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-50 border-b-2 border-gray-200">
              <th className="border p-3 text-sm tracking-wide text-left">
                Title
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Company
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Location
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Platform
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Platform Applied
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Date Applied
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Link
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Status
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Contact
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                CV Version
              </th>
              <th className="border p-3 text-sm tracking-wide text-left">
                Cover Letter
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody className="divide-y-4 divide-gray-100">
            {jobs.map((job: Job, index: number) => (
              <tr
                key={job.id}
                className={`${index % 2 === 0 ? "bg-gray-200" : "bg-gray-100"}`}
              >
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap ">
                  {job.title}
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap ">
                  {job.company}
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap ">
                  {job.location}
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap ">
                  {job.platform}
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap ">
                  {job.platformApplied}
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap  text-center">
                  {formatStringDate(job.dateApplied)}
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap  text-center">
                  <a
                    href={job.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-600 underline"
                  >
                    View Job
                  </a>
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap  text-center">
                  {job.status}
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap ">
                  {job.contact?.email}
                </td>

                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap ">
                  {job.resumeVersion.title}
                </td>
                <td className="p-3 text-sm text-gray-700 capitalize whitespace-nowrap ">
                  {job.coverLetter}
                </td>

                <td>
                  <button
                    onClick={() => {
                      onSetIsVisible(true), onIsEditing(job);
                    }}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* CARD */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:hidden">
        {/* Wrapper */}
        {jobs.map((job: Job) => (
          <div
            key={job.id}
            className="bg-white p-4 rounded-lg shadow space-y-2 "
          >
            <div className="flex items-center space-x-2 text-sm">
              <div>Title</div>
              <div>{job.title}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>Company</div>
              <div>{job.company}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>Platform</div>
              <div>{job.platform}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>Platform Applied</div>
              <div>{job.platformApplied}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>Date Applied</div>
              <div>{formatStringDate(job.dateApplied)}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm truncate">
              <div>Link</div>
              <a
                href={job.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Job
              </a>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>Contact</div>
              <div>{job.contact?.email}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>Status</div>
              <div>{job.status}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>CV Version</div>
              <div>{job.resumeVersion.title}</div>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <div>Cover Letter</div>
              <div>{job.coverLetter}</div>
            </div>
            <div className="flex justify-around space-x-2 text-sm">
              <button
                onClick={() => {
                  onSetIsVisible(true), onIsEditing(job);
                }}
              >
                Edit
              </button>
              <button onClick={() => onSetDeleteJob(job.id)}> Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default JobList;
