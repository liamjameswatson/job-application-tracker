import { useState, useEffect } from "react";
import { Job } from "../types/types";

import { useLocalStorage } from "./useLocalStorage";

function useJobs() {
  const { setItem, getItem } = useLocalStorage();

  const [jobs, setJobs] = useState<Job[]>((): Job[] => {
    return getItem("jobs") || [];
  });
  const [jobToEdit, setJobToEdit] = useState<Job | null>(null);



  useEffect(() => {
    setItem("jobs", jobs);
  }, [jobs, setItem]);

  // Create Job
  function createJob(newJob: Job) {
    console.log(newJob);
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

  return {
    jobs,
    jobToEdit,
    setJobToEdit,
    createJob,
    editJob,
    deleteJob,
    setJobs,
  };
}

export default useJobs;
