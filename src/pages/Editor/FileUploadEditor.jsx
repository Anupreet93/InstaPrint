// src/pages/Editor/FileUploadEditor.js
import React, { useState } from 'react';
import QRCode from 'qrcode';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import { motion } from 'framer-motion';
import PageSelector from './PageSelector';
import PreviewModal from './PreviewModal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload } from '@fortawesome/free-solid-svg-icons';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.15.349/pdf.worker.min.js`;

const FileUploadEditor = ({ onProceedToPayment }) => {
  // Editor state
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState('A4');
  const [pageCount, setPageCount] = useState(0);
  const [printType, setPrintType] = useState('single');
  const [colorPrint, setColorPrint] = useState('Black & White');
  const [selectedPages, setSelectedPages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [showPageSelector, setShowPageSelector] = useState(false);
  const [generatingThumbnails, setGeneratingThumbnails] = useState(false);
  const [previewPage, setPreviewPage] = useState(null);
  const [pdfDoc, setPdfDoc] = useState(null);

  const handleFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
    setFileName(selectedFile ? selectedFile.name : 'No file chosen');
    setPageCount(0);
    setIsProcessing(false);
    setSelectedPages([]);
    setThumbnails([]);
    setPdfDoc(null);

    if (selectedFile && selectedFile.type === 'application/pdf') {
      setIsProcessing(true);
      setGeneratingThumbnails(true);
      const fileReader = new FileReader();

      fileReader.onload = async () => {
        try {
          const typedArray = new Uint8Array(fileReader.result);
          const pdf = await getDocument(typedArray).promise;
          setPdfDoc(pdf);
          const totalPages = pdf.numPages;
          setPageCount(totalPages);
          setSelectedPages(Array.from({ length: totalPages }, (_, i) => i + 1));

          // Generate low-res thumbnails for each page
          const thumbPromises = [];
          for (let pageNum = 1; pageNum <= totalPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const viewport = page.getViewport({ scale: 0.3 });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: context, viewport }).promise;
            thumbPromises.push(canvas.toDataURL());
          }
          setThumbnails(thumbPromises);
        } catch (error) {
          alert('Error processing the PDF. Please try again.');
        } finally {
          setIsProcessing(false);
          setGeneratingThumbnails(false);
        }
      };

      fileReader.readAsArrayBuffer(selectedFile);
    } else {
      alert('Only PDF files are supported.');
    }
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!file) {
      alert('Please select a file to upload.');
      return;
    }
    if (isProcessing) {
      alert('Please wait for the PDF to finish processing.');
      return;
    }
    if (pageCount === 0) {
      alert('The PDF file seems invalid or contains no pages.');
      return;
    }
    // Stay on the same page to let the user configure print settings
  };

  // Calculate payment amount based on selections
  const calculatePayment = () => {
    const baseCost = colorPrint === 'Color' ? 3 : 1.5;
    const selectedPageCount = selectedPages.length;
    const adjustedPageCount =
      printType === 'double' ? Math.ceil(selectedPageCount / 2) : selectedPageCount;
    return adjustedPageCount * copies * baseCost;
  };

  const handlePrintSubmit = (e) => {
    e.preventDefault();
    const amount = calculatePayment();
    // Pass print settings and amount to the payment page via the parent callback
    onProceedToPayment({
      paymentAmount: amount,
      paymentMethod: 'UPI', // default payment method; you can expand this later
      copies,
      paperSize,
      printType,
      colorPrint,
      selectedPages,
    });
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-10 mt-20">

      {/* File Upload Section */}
      <h2 className="text-2xl font-bold text-center mb-8">Upload Your Document</h2>
      <form onSubmit={handleUpload} className="space-y-8">
        <label className="block border-2 border-dashed border-blue-300 rounded-3xl p-10 text-center bg-blue-50 hover:bg-blue-100 transition-colors cursor-pointer">
          <FontAwesomeIcon icon={faUpload} className="text-blue-600 text-5xl mb-4" />
          <p className="text-gray-700 font-semibold">Drag and drop a file or click to upload</p>
          <input type="file" onChange={handleFileChange} className="hidden" accept=".pdf" />
        </label>
        <p className="text-sm text-gray-600 text-center">{fileName}</p>
        <p className="text-sm text-blue-600 text-center">
          {isProcessing ? 'Processing...' : pageCount > 0 && `Pages: ${pageCount}`}
        </p>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-full hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-lg"
        >
          Upload Document
        </button>
      </form>

      {/* Print Settings Section */}
      {pageCount > 0 && (
        <form onSubmit={handlePrintSubmit} className="space-y-6 mt-10">
          <h2 className="text-2xl font-bold text-center mb-8">Print Settings</h2>
          <div>
            <button
              type="button"
              onClick={() => setShowPageSelector(true)}
              className="w-full bg-blue-50 border-2 border-dashed border-blue-200 text-blue-600 py-3 rounded-full hover:bg-blue-100 transition-colors"
            >
              {selectedPages.length === pageCount
                ? `All Pages Selected (${pageCount})`
                : `${selectedPages.length} of ${pageCount} Pages Selected`}
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Click to select specific pages
            </p>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Number of Copies</label>
            <input
              type="number"
              min="1"
              value={copies}
              onChange={(e) => setCopies(Number(e.target.value))}
              className="w-full border border-gray-300 rounded-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Paper Size</label>
            <select
              value={paperSize}
              onChange={(e) => setPaperSize(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              <option value="A4">A4</option>
              <option value="A3">A3</option>
              <option value="Letter">Letter</option>
              <option value="Legal">Legal</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Print Type</label>
            <select
              value={printType}
              onChange={(e) => setPrintType(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              <option value="single">Single-Sided</option>
              <option value="double">Double-Sided</option>
            </select>
          </div>
          <div>
            <label className="block text-gray-700 font-medium mb-2">Color Mode</label>
            <select
              value={colorPrint}
              onChange={(e) => setColorPrint(e.target.value)}
              className="w-full border border-gray-300 rounded-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
            >
              <option value="Black & White">Black & White</option>
              <option value="Color">Color</option>
            </select>
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-full hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-lg"
          >
            Calculate & Proceed
          </button>
        </form>
      )}

      {/* Page Selector Modal */}
      <PageSelector 
        show={showPageSelector} 
        onClose={() => setShowPageSelector(false)} 
        thumbnails={thumbnails}
        selectedPages={selectedPages}
        setSelectedPages={setSelectedPages}
        generatingThumbnails={generatingThumbnails}
        pdfDoc={pdfDoc}
        generateHighResPreview={async (pageNumber) => {
          if (!pdfDoc) return null;
          try {
            const page = await pdfDoc.getPage(pageNumber);
            const scale = 1; // High-res scale
            const viewport = page.getViewport({ scale });
            const canvas = document.createElement('canvas');
            const context = canvas.getContext('2d');
            canvas.height = viewport.height;
            canvas.width = viewport.width;
            await page.render({ canvasContext: context, viewport }).promise;
            return canvas.toDataURL();
          } catch (error) {
            alert('Error generating high resolution preview.');
            return null;
          }
        }}
        setPreviewPage={setPreviewPage}
      />

      {/* Preview Modal */}
      <PreviewModal previewPage={previewPage} setPreviewPage={setPreviewPage} />
    </div>
  );
};

export default FileUploadEditor;
