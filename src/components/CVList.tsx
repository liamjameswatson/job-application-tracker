import { useForm } from "react-hook-form";
import { CV } from "../types/types";
import { useState } from "react";
function CVList() {
  const [cvList, setcVList] = useState<CV[]>([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CV>({ mode: "onChange" });

  function onSubmit(data: CV) {
    const newCv: CV = { ...data, id: Date.now() };
    setcVList((cvList) => [...cvList, newCv]);
    localStorage.setItem("cvList", JSON.stringify(cvList));
  }

  return (
    <div className="">
      {cvList.map((cv) => (
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
