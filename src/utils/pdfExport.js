import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

/**
 * Captures a DOM element and downloads it as a PDF file.
 * @param {string} elementId - The ID of the element to capture
 * @param {string} filename - The output PDF filename
 */
export async function downloadPDF(elementId, filename = 'resume.pdf') {
  const element = document.getElementById(elementId);
  if (!element) {
    console.error(`Element with id "${elementId}" not found`);
    return;
  }

  const canvas = await html2canvas(element, {
    scale: 2,
    useCORS: true,
    backgroundColor: '#ffffff',
    logging: false,
  });

  const imgData = canvas.toDataURL('image/jpeg', 0.95);

  // A4 dimensions in mm
  const pdfWidth = 210;
  const pdfHeight = 297;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;

  // Scale image to fit A4 width
  const imgWidth = pdfWidth;
  const imgHeight = (canvasHeight * pdfWidth) / canvasWidth;

  let heightLeft = imgHeight;
  let position = 0;

  pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
  heightLeft -= pdfHeight;

  // Add additional pages if content overflows
  while (heightLeft > 0) {
    position = heightLeft - imgHeight;
    pdf.addPage();
    pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight);
    heightLeft -= pdfHeight;
  }

  pdf.save(filename);
}
