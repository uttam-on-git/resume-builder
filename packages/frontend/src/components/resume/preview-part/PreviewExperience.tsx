import { formatDate } from "@/lib/utils";
import { ResumeFormValues } from "../ZodSchema";

export function PreviewExperience({ data }: { data: Partial<ResumeFormValues> }) {
  if (!data.experiences || data.experiences.length === 0) return null;
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold uppercase tracking-wide text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">
        Experience
      </h2>
      <div className="space-y-4">
        {data.experiences.map((exp, index) => (
          <div key={index}>
            <div className="flex justify-between items-baseline">
              <h3 className="text-base font-semibold text-slate-800">{exp.jobTitle}</h3>
              <div className="text-xs font-medium text-slate-500">
                <span>{formatDate(exp.startDate)}</span> - <span>{formatDate(exp.endDate)}</span>
              </div>
            </div>
            <div className="flex justify-between items-baseline">
              <p className="text-sm font-medium text-slate-600">{exp.company}</p>
              <p className="text-xs text-slate-500">{exp.location}</p>
            </div>
            <p className="mt-1 text-sm text-slate-600 whitespace-pre-line">{exp.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}