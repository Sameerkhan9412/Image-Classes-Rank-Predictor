"use client";

type Props = {
  form: any;
  setForm: any;
  back: () => void;
  submit: () => void;
  loading: boolean;
};

export default function Step4Extra({
  form,
  setForm,
  back,
  submit,
  loading,
}: Props) {
  return (
    <>
      <label className="flex items-center gap-2 mb-3">
        <input
          type="checkbox"
          checked={form.isImageStudent}
          onChange={(e) =>
            setForm({
              ...form,
              isImageStudent: e.target.checked,
            })
          }
        />
        Are you Image Classes student?
      </label>

      <input
        type="text"
        placeholder="Roll Number (optional)"
        value={form.rollNo}
        onChange={(e) =>
          setForm({ ...form, rollNo: e.target.value })
        }
        className="w-full border p-2 mb-3 rounded"
      />

      <div className="flex gap-2">
        <button
          onClick={back}
          className="w-1/2 bg-gray-300 py-2 rounded"
        >
          Back
        </button>

        <button
          onClick={submit}
          disabled={loading}
          className="w-1/2 bg-primary text-white py-2 rounded"
        >
          {loading ? "Predicting..." : "Predict Rank"}
        </button>
      </div>
    </>
  );
}