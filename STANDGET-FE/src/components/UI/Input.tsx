import { InputProps } from "../../utils/interfaces";

export default function Input({ label, id, textarea, ...props }: InputProps) {
  const inputOrTextArea = textarea ? (
    <textarea
      className="px-3 py-2 border rounded-md "
      id={id}
      name={id}
      {...props}
    />
  ) : (
    <input
      className="px-3 py-2 border rounded-md "
      id={id}
      name={id}
      {...props}
    />
  );
  return (
    <p className="control gap-2">
      <label className="text-sm font-bold mt-2" htmlFor={id}>
        {label}
      </label>
      {inputOrTextArea}
    </p>
  );
}
