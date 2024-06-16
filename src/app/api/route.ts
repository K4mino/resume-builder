 // pages/api/generateResumePdf.js
import generatePdf from '../utils/generatePdf';
import type { NextApiRequest, NextApiResponse } from 'next'
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({ message: 'Hello - GET' });
}

export async function POST() {
   // Your existing logic for POST requests
   const htmlContent = `
   <html>
     <head>
       <title>Resume</title>
     </head>
     <body>
       <h1>Your Resume Content Goes Here</h1>
       <!-- Include your resume content in HTML format -->
     </body>
   </html>
 `;

 try {
   const pdfBuffer = await generatePdf(htmlContent);
   // Set headers to indicate attachment and specify the file name
   return NextResponse.json(pdfBuffer, {
     headers: {
       'Content-Disposition': 'attachment; filename=resume_test.pdf',
       'Content-Type': 'application/pdf',
     },
   });
 } catch (error) {
   console.error('Error generating PDF:', error);
   return NextResponse.json({ success: false, message: 'Error generating PDF' });
 }
}

export async function PUT() {
  return NextResponse.json({ message: 'Hello - PUT' });
}

export async function DELETE() {
  return NextResponse.json({ message: 'Hello - DELETE' });
}