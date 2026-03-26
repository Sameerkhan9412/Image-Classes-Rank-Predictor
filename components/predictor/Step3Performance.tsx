"use client";

type Props = {
  form: any;
  setForm: any;
  next: () => void;
  back: () => void;
};

export default function Step3Performance({
  form,
  setForm,
  next,
  back,
}: Props) {
  return (
    <>
      <input
        type="number"
        placeholder="Enter Your Marks"
        value={form.marks}
        onChange={(e) =>
          setForm({ ...form, marks: e.target.value })
        }
        className="w-full border p-2 mb-2 rounded"
      />

      <p className="text-xs text-gray-500 mb-3">
        Enter your expected marks based on answer key
      </p>

      <div className="flex gap-2">
        <button
          onClick={back}
          className="w-1/2 bg-gray-300 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={next}
          className="w-1/2 bg-primary text-white py-2 rounded"
        >
          Next
        </button>
      </div>
    </>
  );
}