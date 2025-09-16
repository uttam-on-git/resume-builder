import puppeteer from 'puppeteer';
import handlebars from 'handlebars';
import fs from 'fs/promises';
import path from 'path';

handlebars.registerHelper('formatDate', (dateString: string | undefined | null) => {
  if (!dateString) return 'Present';
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = { month: 'short', year: 'numeric', timeZone: 'UTC' };
  return new Intl.DateTimeFormat('en-US', options).format(date);
});

export const generatePdfFromData = async (resumeData: any): Promise<Buffer> => {
  const templatePath = path.resolve(process.cwd(), 'src/templates/resume.hbs');
  const templateHtml = await fs.readFile(templatePath, 'utf-8');
  const template = handlebars.compile(templateHtml);

  const dataForTemplate = {
    ...resumeData,
    experiences: resumeData.experiences.map((exp: any) => ({
      ...exp,
      startDate: exp.startDate?.toISOString(),
      endDate: exp.endDate?.toISOString(),
    })),
    educations: resumeData.educations.map((edu: any) => ({
      ...edu,
      startDate: edu.startDate?.toISOString(),
      endDate: edu.endDate?.toISOString(),
    })),
  };

  const finalHtml = template(dataForTemplate);

  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });
  const page = await browser.newPage();
  
  await page.setContent(finalHtml, { waitUntil: 'domcontentloaded' });

  const pdfBuffer = await page.pdf({
    format: 'A4',
    printBackground: true,
    margin: { top: '25px', right: '25px', bottom: '25px', left: '25px' },
  });

  await browser.close();

  return Buffer.from(pdfBuffer);
};