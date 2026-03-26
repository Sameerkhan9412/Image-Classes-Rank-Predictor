"use client";

type Props = {
  form: any;
  setForm: any;
  next: () => void;
  back: () => void;
};

export default function Step2Exam({ form, setForm, next, back }: Props) {
  return (
    <>
      <select
        value={form.exam}
        onChange={(e) =>
          setForm({ ...form, exam: e.target.value })
        }
        className="w-full border p-2 mb-3 rounded"
      >
        <option value="">Select Exam</option>
        <option value="AMU">AMU</option>
        <option value="JMI">JMI</option>
      </select>

      <select
        value={form.className}
        onChange={(e) =>
          setForm({ ...form, className: e.target.value })
        }
        className="w-full border p-2 mb-3 rounded"
      >
        <option value="">Select Class</option>
        <option value="6">6th</option>
        <option value="9">9th</option>
        <option value="11">11th</option>
      </select>

      <select
        value={form.stream}
        onChange={(e) =>
          setForm({ ...form, stream: e.target.value })
        }
        className="w-full border p-2 mb-3 rounded"
      >
        <option value="">Select Stream</option>
        <option value="PCM">PCM</option>
        <option value="Commerce">Commerce</option>
        <option value="Arts">Arts</option>
      </select>

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