import { ResumeFormValues } from './ZodSchema';
import { PreviewHeader } from './preview-part/PreviewHeader';
import { PreviewSummary } from './preview-part/PreviewSummary';
import { PreviewExperience } from './preview-part/PreviewExperience';
import { PreviewEducation } from './preview-part/PreviewEducation';
import { PreviewSkills } from './preview-part/PreviewSkills';

interface ResumePreviewProps {
  data: Partial<ResumeFormValues>;
}

export function ResumePreview({ data }: ResumePreviewProps) {
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-4xl mx-auto">
      <PreviewHeader data={data} />
      <PreviewSummary data={data} />
      <PreviewExperience data={data} />
      <PreviewEducation data={data} />
      <PreviewSkills data={data} />
    </div>
  );
}