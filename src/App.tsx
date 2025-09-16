import { useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobsList";
import { Job } from "./types/types";
import CVList from "./components/CVList";
function App() {
  const [isVisible, setIsvisible] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>([]);
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

  // Create Job
  function createJob(newJob: Job) {
    setJobs((jobs) => [...jobs, newJob]);
  }

  // Edit Job
  function editJob(updatedJob: Job) {
    setJobs(
      jobs.map((job) =>
        job.id === updatedJob.id ? { ...job, ...updatedJob } : job
      )
    );
  }

  //Delete Job
  function deleteJob(id: number) {
    setJobs(jobs.filter((jobs) => jobs.id !== id));
  }

  // console.log({ jobs });

  return (
    <div className="relative w-max-screen min-h-screen bg-blue-200">
      <button
        className="btn-primary"
        onClick={() => setIsvisible((prev) => !prev)}
      >
        Add Job +
      </button>
      <h1 className="h2-bold md:h1-bold text-center capitalize">
        JOB APPLICATION TRACKER
      </h1>
      {isVisible && (
        <JobForm
          onCreateJob={createJob}
          onEditJob={editJob}
          onSetIsVisible={setIsvisible}
          jobToEdit={jobToEdit}
          resetJobToEdit={setJobToEdit}
        />
      )}
      <JobList
        jobList={jobs}
        onSetIsVisible={setIsvisible}
        onSetDeleteJob={deleteJob}
        onIsEditing={setJobToEdit}
      />
      <CVList />
    </div>
  );
}

export default App;

// Array.from({ length: 20 }, (_, i) => i + 1);

// lift state up
// form
// table
// filter
// do today
// local storage
