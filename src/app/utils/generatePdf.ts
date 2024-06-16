import puppeteer from "puppeteer";

const generatePdf = async (htmlContent: any) => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();

  await page.setContent(htmlContent);
  const pdfBuffer = await page.pdf({ format: 'A4' });

  await browser.close();

  return pdfBuffer;
};

export default generatePdf;
