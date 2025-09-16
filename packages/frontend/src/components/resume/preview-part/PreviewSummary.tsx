import { ResumeFormValues } from "../ZodSchema";

export function PreviewSummary({ data }: { data: Partial<ResumeFormValues> }) {
  if (!data.summary) return null;
  return (
    <section>
      <h2 className="text-lg font-semibold uppercase tracking-wide text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">
        Summary
      </h2>
      <p className="text-sm text-slate-600">{data.summary}</p>
    </section>
  );
}