import { createContext, useEffect, useState } from "react";
import JobForm from "./components/JobForm";
import JobList from "./components/JobsList";
import { Job } from "./types/types";
import { useLocalStorage } from "./hooks/useLocalStorage";
import DailyCheck from "./components/DailyCheck";
import ModalButton from "./components/UI/ModalButton";

function App() {
  const { setItem, getItem } = useLocalStorage();

  const [isVisible, setIsvisible] = useState<boolean>(false);
  const [jobs, setJobs] = useState<Job[]>((): Job[] => {
    return getItem("jobs") || [];
  });
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);

  useEffect(() => {
    setItem("jobs", jobs);
  }, [jobs, setItem]);

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



  return (
    <div className="relative w-max-screen min-h-screen bg-blue-200">
      <ModalButton text={"add job"}>
        <JobForm
          onCreateJob={createJob}
          onEditJob={editJob}
          jobToEdit={jobToEdit}
          resetJobToEdit={setJobToEdit}
        />
      </ModalButton>
      <h1 className="h2-bold md:h1-bold text-center capitalize">
        JOB APPLICATION TRACKER
      </h1>
      {jobs.length !== 0 && <DailyCheck jobs={jobs} />}
      {isVisible && (
        <JobForm
          onCreateJob={createJob}
          onEditJob={editJob}
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
