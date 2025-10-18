import { UseFormRegisterReturn, FieldError } from "react-hook-form";
import Label from "./Label";

type FormFieldProps = {
  id: string;
  placeholder?: string;
  type?: string;
  register: UseFormRegisterReturn;
  error?: FieldError;
  label: string;
};

function FormField({
  id,
  placeholder,
  type = "text",
  register,
  error,
  label,
}: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label htmlFor={id}>{label}</Label>
      <input
        className="bg-blue-50 ring-2 ring-gray-600 focus:bg-blue-200 
                  rounded p-1"
        type={type}
        id={id}
        placeholder={placeholder}
        {...register}
      />
      <p className="text-red-600">{error && <span>{error.message}</span>}</p>
    </div>
  );
}

export default FormField;
