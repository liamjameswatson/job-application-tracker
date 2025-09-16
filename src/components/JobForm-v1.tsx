import { useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { CV, Job } from "../types/types";
import { JOB_DEFAULTS } from "../constants/jobDefaults"; //
import cvsTempList from "../assets/cvs.json";

type JobFormProps = {
  onCreateJob: (newJob: Job) => void;
  onSetIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  jobToEdit: number | null;
};

function JobForm({ onCreateJob, onSetIsVisible, jobToEdit }: JobFormProps) {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Job>({ mode: "onChange", defaultValues: JOB_DEFAULTS });

  // const [isVisible, setIsvisible] = useState<boolean>(true);
  const [contact, setContact] = useState<boolean>(false);
  const [coverLetter, setCoverLetter] = useState<boolean>(false);

  function onSubmit(data: Job) {
    console.log("form data", data);

    const newJob: Job = { ...data, id: Date.now() };

    onCreateJob(newJob);

    onSetIsVisible(false);
  }
  if (jobToEdit) console.log({ jobToEdit });

  return (
    <>
      ( // Container - overlay
      <div
        className="fixed bg-black/90 min-h-screen inset-0 flex 
        items-center justify-center"
        onClick={() => onSetIsVisible(false)}
      >
        {/* Wrapper */}
        <div
          className="bg-blue-50 rounded max-h-[90vh] w-[90%] md:w-[600px] overflow-y-auto relative"
          onClick={(e) => e.stopPropagation()} // stop onClick overlay reaching the form
        >
          <button
            className="absolute top-2 right-2 text-gray-600 hover-text-gray-900 font-bold text-xl cursor-pointer px-2 py-1 bg-blue-300 rounded-lg"
            onClick={() => onSetIsVisible(false)}
          >
            X
          </button>

          <form
            className="text-lg space-y-4 p-2"
            onSubmit={handleSubmit(onSubmit)}
          >
            <h1 className="text-2xl font-bold mb-6 text-center mt-4">
              Add Job
            </h1>

            {/* TITLE */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold" htmlFor="title">
                Title
              </label>
              <input
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                type="text"
                id="title"
                placeholder="title...."
                {...register("title")}
              />
            </div>

            {/* COMPANY */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold" htmlFor="company">
                Company
              </label>
              <input
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                id="company"
                placeholder="company..."
                {...register("company")}
              />
            </div>

            {/* PLATFORM */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold" htmlFor="platform">
                Platform
              </label>
              <input
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                id="platform"
                placeholder="platform...."
                {...register("platform")}
              />
            </div>

            {/* APPLIED ON  */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold" htmlFor="platformApplied">
                What platform did you apply on?
              </label>
              <input
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                id="platformApplied"
                placeholder="platform..."
                {...register("platformApplied")}
              />
            </div>

            {/* JOB WEBSITE */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold" htmlFor="link">
                Job Website
              </label>
              <input
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                id="link"
                placeholder="URL..."
                {...register("link")}
              />
            </div>

            {/* STATUS */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold" htmlFor="status">
                Status
              </label>
              <input
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                id="status"
                placeholder="status..."
                {...register("status")}
              />
            </div>

            {/* DATE APPLIED */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold" htmlFor="dateApplied">
                When did you apply?
              </label>
              <input
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                id="dateApplied"
                defaultValue={new Date().toISOString().split("T")[0]}
                type="date"
                {...register("dateApplied")}
              />
            </div>

            {/* CV APPLIED */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold" htmlFor="resumeVersion">
                What CV did you apply with?
              </label>
              <select
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                id="resumeVersion"
                {...register("resumeVersion.title")}
              >
                <option value="" disabled>
                  Select a CV...
                </option>
                {cvsTempList.map((cv) => (
                  <option className="bg-red-500" key={cv.id} value={cv.title}>
                    {cv.title}
                  </option>
                ))}
              </select>
            </div>

            {/* CONTACT */}
            <div className="">
              <div className="">
                <label className="uppercase font-bold" htmlFor="contact">
                  Do you have a contact?
                </label>
                <div className="flex items-center justify-evenly">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="false"
                      className="h-4 w-4 accent-blue-500 mx-1"
                      checked={contact === false}
                      onChange={() => setContact(false)}
                    />
                    No
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      value="true"
                      className="h-4 w-4 accent-blue-500 mx-1"
                      checked={contact === true}
                      onChange={() => setContact(true)}
                    />
                    Yes
                  </label>
                </div>
              </div>
              <div className={`${contact ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-1">
                  <label className="uppercase font-bold" htmlFor="contactName">
                    Contact Name
                  </label>
                  <input
                    type="text"
                    className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                    placeholder="name..."
                    {...register("contact.name", {
                      pattern: {
                        value: /^[0-9+()-\s]+$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                </div>
              </div>
              <div className={`${contact ? "block" : "hidden"}`}>
                <div className="flex flex-col gap-1">
                  <label className="uppercase font-bold" htmlFor="contactName">
                    Contact Phone Number
                  </label>
                  <input
                    type="text"
                    className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                    placeholder="phone number"
                    {...register("contact.phoneNumber", {
                      pattern: {
                        value: /^[0-9+()-\s]+$/,
                        message: "Invalid phone number",
                      },
                    })}
                  />
                </div>
                <div className="flex flex-col gap-1">
                  <label className="uppercase font-bold" htmlFor="contactEmail">
                    Contact Email
                  </label>
                  <input
                    className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                    type="email"
                    id="contactEmail"
                    placeholder="Contact email..."
                    {...register("contact.email", {
                      pattern: {
                        value: /^[^@ ]+@[^@ ]+\.[^@ .]{2,}$/,
                        message: "Invalid email",
                      },
                    })}
                  />
                </div>
              </div>
            </div>
            {/*END OF CONTACT */}

            {/* COVER LETTER */}
            <div className="">
              <div className="flex flex-col gap-1">
                <label className="uppercase font-bold" htmlFor="coverLetter">
                  Did you send a cover letter?
                </label>
                <div className="flex items-center justify-evenly">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="coverLetter"
                      value="false"
                      className="h-4 w-4 accent-blue-500 mx-1"
                      checked={coverLetter === false}
                      onChange={() => setCoverLetter(false)}
                    />
                    No
                  </label>
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="radio"
                      name="coverLetter"
                      value="true"
                      className="h-4 w-4 accent-blue-500 mx-1"
                      checked={coverLetter === true}
                      onChange={() => setCoverLetter(true)}
                    />
                    Yes
                  </label>
                </div>
              </div>
              <div
                className={`${
                  coverLetter ? "block" : "hidden"
                } flex flex-col gap-1`}
              >
                <label
                  className="uppercase font-bold"
                  htmlFor="coverLetterContent"
                >
                  Cover Letter Content
                </label>
                <input
                  className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                  type="text-area"
                  id="coverLetterContent"
                  placeholder="Cover Letter Content"
                  {...register("coverLetter")}
                />
              </div>
            </div>
            {/* END OF COVER LETTER */}
            <button>Submit</button>
          </form>
          <DevTool control={control} />
        </div>
      </div>
      )
    </>
  );
}

export default JobForm;
