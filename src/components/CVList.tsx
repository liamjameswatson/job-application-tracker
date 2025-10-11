import { useForm } from "react-hook-form";
import { CV } from "../types/types";
// import { useEffect, useState } from "react";
// import { useLocalStorage } from "../hooks/useLocalStorage";

type CVListProps = {
  onSetCVlist: React.Dispatch<React.SetStateAction<CV[]>>;
  cvList: CV[];
  onNewCV: (cv: CV) => void;
};

function CVList({ onSetCVlist, cvList, onNewCV }: CVListProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CV>({ mode: "onChange" });

  function onSubmit(data: CV) {
    const newCv: CV = { ...data, id: Date.now() };
    // console.log("from CVLIST", newCv);
    onSetCVlist((cvList) => [...cvList, newCv]);
    onNewCV(newCv);
  }

  return (
    <div className="">
      {cvList?.map((cv) => (
        <p key={cv.id}>
          {cv.id}
          {cv.title}
        </p>
      ))}

      <div onSubmit={handleSubmit(onSubmit)} className="">
        <fieldset className="flex justify-evenly ">
          <div className="flex flex-col mb-4">
            <input
              className="ring-2 m-5"
              type="text"
              {...register("title", { required: "A CV name/role is require" })}
            />
            {errors.title && <p>{errors.title.message}</p>}
          </div>
          <div className="flex flex-col mb-2">
            <input
              className="ring-2 m-5"
              type="text"
              {...register("link", {
                required: "Copy and paste your link to your cv",
              })}
            />
            {errors.link && <p>{errors.link.message}</p>}
          </div>
          <div className="m-5">
            <button
              type="button"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              onClick={handleSubmit(onSubmit)}
            >
              Add CV
            </button>
          </div>
        </fieldset>
      </div>
    </div>
  );
}
export default CVList;
