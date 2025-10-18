import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import { CV, Job } from "../types/types";
import { JOB_DEFAULTS } from "../constants/jobDefaults";
import CVList from "./CVList";
import { useLocalStorage } from "../hooks/useLocalStorage";
import { Status } from "../types/types";
import { getFollowUpDate } from "../utilities/date";
import { statuses } from "../constants/statuses";

type JobFormProps = {
  onCreateJob: (newJob: Job) => void;
  onEditJob: (editJob: Job) => void;
  onSetIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  jobToEdit: Job | null;
  resetJobToEdit: (job: null) => void;
};

function JobForm({
  onCreateJob,
  onSetIsVisible,
  jobToEdit = null,
  onEditJob,
  resetJobToEdit,
}: JobFormProps) {
  // If editJob

  const { setItem, getItem } = useLocalStorage();

  let editJobValues: Omit<Job, "id"> | undefined;

  if (jobToEdit) {
    const { id: editId, ...rest } = jobToEdit; // separate out id
    editJobValues = rest; // assign the rest
  }

  // React Hook Form
  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm<Job>({
    mode: "onChange",
    defaultValues: editJobValues ? editJobValues : JOB_DEFAULTS,
  });

  const [contact, setContact] = useState<boolean>(false);
  const [coverLetter, setCoverLetter] = useState<boolean>(false);
  const [newCv, setNewCV] = useState<CV | null>(null);
  const [statusList, setStatusList] = useState<Set<Status>>(new Set(statuses));

  const [cvList, setcVList] = useState<CV[]>(() => {
    return getItem<CV[]>("cvList") || [];
  });

  useEffect(() => {
    setItem("cvList", cvList);
  }, [cvList, setItem]);

  useEffect(() => {
    if (newCv) {
      // console.log("New CV in parent:", newCv.title);
      setValue("resumeVersion.title", newCv.title as string);
    }
  }, [newCv, setValue]);

  const cvValue = watch("resumeVersion.title");

  function onSubmit(data: Job) {
    // follow up date
    const followUpDate = getFollowUpDate(data.dateApplied);

    const jobDataWithFollowUp = { ...data, followUpDate };

    // To edit job
    if (jobToEdit !== null) {
      const editJob: Job = { ...jobDataWithFollowUp, id: jobToEdit.id };
      onEditJob(editJob);
      jobToEdit = null;
      onSetIsVisible(false);
      resetJobToEdit(null);
    } else {
      // To create new job
      const newJob: Job = { ...jobDataWithFollowUp, id: Date.now() };

      onCreateJob(newJob);

      onSetIsVisible(false);
    }
  }
  if (jobToEdit) console.log({ jobToEdit });

  return (
    <>
      ({/* Container Overlay */}
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
                {...register("title", {
                  required: "Please enter a job role",
                  minLength: {
                    value: 3,
                    message: " Job role must have at least 3 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Job role cannot excedd 200 characters",
                  },
                })}
              />
              <p className="text-red-600">
                {errors.title && <span>{errors.title.message}</span>}
              </p>
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
                {...register("company", {
                  required: "Please enter a company or add self-employed",
                  minLength: {
                    value: 3,
                    message: " Company must have at least 3 characters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Company cannot excedd 200 characters",
                  },
                })}
              />
              <p className="text-red-600">
                {errors.company && <span>{errors.company.message}</span>}
              </p>
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
                {...register("platformApplied", {
                  required: "Enter where or how you applied for this job",
                  minLength: {
                    value: 1,
                    message: "Please enter one or more chacters",
                  },
                  maxLength: {
                    value: 200,
                    message: "Please enter a value less than 200 characters",
                  },
                })}
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
              <select
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
                id="status"
                {...register("status")}
              >
                {[...statusList].map((status) => (
                  <option key={status}>{status}</option>
                ))}
              </select>
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
                defaultValue={new Date().toISOString().split("T")[0]} //Today
                max={new Date().toISOString().split("T")[0]} // ⬅️ disables future dates
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
                  rounded p-1 hover:bg-black"
                id="resumeVersion"
                {...register("resumeVersion.title", {
                  validate: (value) =>
                    value !== "Add new CV" || "Please select a CV option",
                })}
              >
                <option value="" disabled>
                  Select a CV...
                </option>
                <option>No CV</option>
                {cvList.map((cv) => (
                  <option
                    className=" hover:bg-black"
                    key={cv.id}
                    value={cv.title}
                  >
                    {cv.title}
                  </option>
                ))}
                <option value="Add new CV">Add new CV</option>
              </select>
            </div>

            {/* ADD CV */}
            {cvValue === "Add new CV" && (
              <CVList
                onSetCVlist={setcVList}
                cvList={cvList}
                onNewCV={setNewCV}
              />
            )}

            {/* {-----------------------------------------------------------------------------------------------} */}
            {/* OR CV LIST FROM LOCAL STORAGE. LENGTH === 0 */}
            {/* {-----------------------------------------------------------------------------------------------} */}

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
                    {...register("contact.name")}
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
                <textarea
                  className="bg-blue-50 ring-2 ring-gray-600 
                  focus:bg-blue-200 
                  rounded p-1"
                  rows={4}
                  id="coverLetterContent"
                  placeholder="Cover Letter Content"
                  {...register("coverLetter")}
                />
              </div>
            </div>
            {/* END OF COVER LETTER */}
            <div className="flex flex-col gap-1">
              <label className="uppercase font-bold " htmlFor="notes">
                Notes
              </label>
              <textarea
                className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 rounded p-1"
                id="notes"
                rows={4}
                placeholder="Anything else...."
                {...register("notes")}
              ></textarea>
            </div>

            <button>{jobToEdit !== null ? "Update" : "Add"}</button>
            {/* <button>Submit</button> */}
          </form>
          <DevTool control={control} />
        </div>
      </div>
      )
    </>
  );
}

export default JobForm;
