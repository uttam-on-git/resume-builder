import { ResumeFormValues } from "../ZodSchema";

export function PreviewSkills({ data }: { data: Partial<ResumeFormValues> }) {
    if (!data.skills || data.skills.length === 0) return null;
    return (
        <section className="mt-6">
            <h2 className="text-lg font-semibold uppercase tracking-wide text-slate-700 border-b-2 border-slate-300 pb-1 mb-2">
                Skills
            </h2>
            <div className="flex flex-wrap gap-2 mt-2">
                {data.skills.map((skill, index) => (
                    <span key={index} className="bg-slate-200 text-slate-800 text-xs font-medium px-3 py-1 rounded-full">
                        {skill.name}
                    </span>
                ))}
            </div>
        </section>
    );
}