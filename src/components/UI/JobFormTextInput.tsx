type JobFormTextInputProps = {
  label: string;
  requiredMessage?: string;
};

function JobFormTextInput({ label, requiredMessage }: JobFormTextInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <label className="uppercase font-bold" htmlFor={label}>
        {label}
      </label>
      <input
        className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
        type="text"
        id={label}
        placeholder="title...."
        {...register(
          { label },
          {
            required: { requiredMessage },
            minLength: {
              value: 3,
              message: " Job role must have at least 3 characters",
            },
            maxLength: {
              value: 200,
              message: "Job role cannot excedd 200 characters",
            },
          }
        )}
      />
      <p className="text-red-600">
        {errors.title && <span>{errors.title.message}</span>}
      </p>
    </div>
  );
}

export default JobFormTextInput;
