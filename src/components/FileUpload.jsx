import React, { useState } from 'react';
import QRCode from 'qrcode';
import { getDocument, GlobalWorkerOptions } from 'pdfjs-dist/legacy/build/pdf';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUpload, faEye } from '@fortawesome/free-solid-svg-icons';
import { motion, AnimatePresence } from 'framer-motion';

GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.15.349/pdf.worker.min.js`;

const FileUploadAndPrint = () => {
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('No file chosen');
  const [currentPage, setCurrentPage] = useState('upload');
  const [copies, setCopies] = useState(1);
  const [paperSize, setPaperSize] = useState('A4');
  const [pageCount, setPageCount] = useState(0);
  const [printType, setPrintType] = useState('single');
  const [colorPrint, setColorPrint] = useState('Black & White');
  const [paymentAmount, setPaymentAmount] = useState(0);
  const [paymentMethod, setPaymentMethod] = useState('UPI');
  const [upiApp, setUpiApp] = useState('PhonePe');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [paymentConfirmed, setPaymentConfirmed] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedPages, setSelectedPages] = useState([]);
  const [thumbnails, setThumbnails] = useState([]);
  const [showPageSelector, setShowPageSelector] = useState(false);
  const [generatingThumbnails, setGeneratingThumbnails] = useState(false);
  const [previewPage, setPreviewPage] = useState(null); // For high-res preview
  const [pdfDoc, setPdfDoc] = useState(null); // Store the PDF document for re-rendering previews

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
    setCurrentPage('print');
  };

  const calculatePayment = () => {
    const baseCost = colorPrint === 'Color' ? 3 : 1.5;
    const selectedPageCount = selectedPages.length;
    const adjustedPageCount = printType === 'double'
      ? Math.ceil(selectedPageCount / 2)
      : selectedPageCount;
    return adjustedPageCount * copies * baseCost;
  };

  // This function now creates a UPI payment URI and redirects the user to the chosen payment app.
  const handlePaymentAppClick = (appName) => {
    setUpiApp(appName);
    let upiId;
    switch (appName) {
      case 'PhonePe': 
        upiId = 'merchant-phonepe-id@upi'; 
        break;
      case 'GooglePay': 
        upiId = 'merchant-googlepay-id@upi'; 
        break;
      case 'Paytm': 
        upiId = 'merchant-paytm-id@upi'; 
        break;
      default: 
        upiId = 'default-merchant-id@upi';
    }
    // Generate the UPI URI with the payment amount.
    const upiUri = `upi://pay?pa=${upiId}&pn=InstaPrint&am=${paymentAmount}&cu=INR`;
    // Redirect to the UPI app. (On mobile, this should launch the corresponding app if installed.)
    window.location.href = upiUri;
  };

  const generateQRCode = async (amount) => {
    try {
      let upiId;
      switch (upiApp) {
        case 'PhonePe': upiId = 'merchant-phonepe-id@upi'; break;
        case 'GooglePay': upiId = 'merchant-googlepay-id@upi'; break;
        case 'Paytm': upiId = 'merchant-paytm-id@upi'; break;
        default: upiId = 'default-merchant-id@upi';
      }
      const qrData = `upi://pay?pa=${upiId}&pn=InstaPrint&am=${amount}&cu=INR`;
      const qrCode = await QRCode.toDataURL(qrData);
      setQrCodeUrl(qrCode);
    } catch {
      alert('Failed to generate QR Code.');
    }
  };

  const handlePrintSubmit = async (e) => {
    e.preventDefault();
    const amount = calculatePayment();
    setPaymentAmount(amount);
    if (paymentMethod === 'UPI') {
      // Generate a QR code for display (optional)
      await generateQRCode(amount);
      setCurrentPage('payment');
    } else if (paymentMethod === 'Cash') {
      alert('Please pay the total amount in cash to proceed.');
      setPaymentConfirmed(true);
      resetForm();
    }
  };

  const handlePaymentVerification = async () => {
    try {
      const response = await axios.post('/api/payment/verify', {
        amount: paymentAmount,
        status: 'success',
      });
      if (response.data.status === 'success') {
        setPaymentConfirmed(true);
        alert('Payment successful! Printing process started.');
        resetForm();
      } else {
        alert('Payment verification failed. Please try again.');
      }
    } catch {
      alert('Error verifying payment. Please try again later.');
    }
  };

  const resetForm = () => {
    setFile(null);
    setFileName('No file chosen');
    setPageCount(0);
    setPaymentAmount(0);
    setQrCodeUrl('');
    setPaymentMethod('UPI');
    setCopies(1);
    setPaperSize('A4');
    setPrintType('single');
    setColorPrint('Black & White');
    setSelectedPages([]);
    setThumbnails([]);
    setCurrentPage('upload');
    setPreviewPage(null);
    setPdfDoc(null);
  };

  // Generates a high resolution preview for a specific page
  const generateHighResPreview = async (pageNumber) => {
    if (!pdfDoc) return;
    try {
      const page = await pdfDoc.getPage(pageNumber);
      const scale = 1; // Higher scale for better clarity
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
  };

  // Renders a modal to display the high-resolution preview
  const renderPreviewModal = () => {
    if (!previewPage) return null;
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 max-w-3xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4">Preview - Page {previewPage.pageNumber}</h3>
            <img 
              src={previewPage.imgSrc} 
              alt={`Page ${previewPage.pageNumber}`} 
              className="w-full object-contain"
            />
            <button
              onClick={() => setPreviewPage(null)}
              className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              Close Preview
            </button>
          </motion.div>
        </motion.div>
      </AnimatePresence>
    );
  };

  // Renders the page selector with thumbnails and preview buttons
  const renderPageSelector = () => (
    <AnimatePresence>
      {showPageSelector && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-white rounded-3xl p-6 max-w-4xl w-full max-h-[90vh] overflow-y-auto"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0.8 }}
          >
            <h3 className="text-xl font-bold mb-4">Select Pages to Print</h3>
            {generatingThumbnails ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                <p className="mt-4 text-gray-600">Generating previews...</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-4 gap-4">
                  {thumbnails.map((thumb, index) => {
                    const pageNumber = index + 1;
                    const isSelected = selectedPages.includes(pageNumber);
                    return (
                      <motion.div
                        key={pageNumber}
                        className={`relative cursor-pointer border-2 rounded-lg overflow-hidden ${
                          isSelected 
                            ? 'border-blue-600 ring-2 ring-blue-600' 
                            : 'border-gray-200'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        onClick={() => {
                          setSelectedPages(prev =>
                            prev.includes(pageNumber)
                              ? prev.filter(p => p !== pageNumber)
                              : [...prev, pageNumber]
                          );
                        }}
                      >
                        <img 
                          src={thumb} 
                          alt={`Page ${pageNumber}`} 
                          className="w-full h-40 object-contain bg-gray-100"
                        />
                        <div className="absolute top-2 right-2 bg-white rounded-full p-1 shadow">
                          <input
                            type="checkbox"
                            checked={isSelected}
                            readOnly
                            className="h-4 w-4 text-blue-600 rounded focus:ring-blue-500"
                          />
                        </div>
                        {/* Preview button */}
                        <div 
                          className="absolute top-2 left-2 bg-white rounded-full p-1 shadow cursor-pointer"
                          onClick={async (e) => {
                            e.stopPropagation();
                            const highResImg = await generateHighResPreview(pageNumber);
                            if (highResImg) {
                              setPreviewPage({ pageNumber, imgSrc: highResImg });
                            }
                          }}
                        >
                          <FontAwesomeIcon icon={faEye} className="text-blue-600" />
                        </div>
                        <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-center py-1">
                          Page {pageNumber}
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
                <div className="mt-6 flex justify-between items-center">
                  <div className="text-gray-600">
                    Selected: {selectedPages.length} pages
                  </div>
                  <div className="space-x-4">
                    <button
                      onClick={() => setShowPageSelector(false)}
                      className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => setShowPageSelector(false)}
                      className="px-6 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
                    >
                      Confirm Selection
                    </button>
                  </div>
                </div>
              </>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gray-50 font-sans">
      <main className="flex-grow container mx-auto p-6">
        {currentPage === 'upload' && (
          <motion.div 
            className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
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
          </motion.div>
        )}

        {currentPage === 'print' && (
          <motion.div 
            className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-10"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold text-center mb-8">Print Settings</h2>
            <form onSubmit={handlePrintSubmit} className="space-y-6">
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
              <div>
                <label className="block text-gray-700 font-medium mb-2">Payment Method</label>
                <select
                  value={paymentMethod}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="w-full border border-gray-300 rounded-full p-3 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-colors"
                >
                  <option value="UPI">UPI</option>
                  <option value="Cash">Cash</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-full hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-lg"
              >
                Calculate & Proceed
              </button>
            </form>
            {renderPageSelector()}
          </motion.div>
        )}

        {currentPage === 'payment' && (
          <motion.div 
            className="max-w-xl mx-auto bg-white shadow-2xl rounded-3xl p-10 text-center"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <h2 className="text-2xl font-bold mb-6">Payment</h2>
            <p className="text-gray-700 mb-6 text-lg">
              Amount to be Paid: <span className="font-extrabold">₹{paymentAmount.toFixed(2)}</span>
            </p>
            {paymentMethod === 'UPI' && (
              <>
                <h3 className="text-lg font-bold mb-4">Select UPI App</h3>
                <div className="flex justify-center space-x-6 mb-6">
                  {[
                    { name: 'PhonePe', img: "data:image/png;base64,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", ring: 'ring-blue-600' },
                    { name: 'GooglePay', img: "https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg", ring: 'ring-blue-600' },
                    { name: 'Paytm', img: "https://upload.wikimedia.org/wikipedia/commons/4/42/Paytm_logo.png", ring: 'ring-blue-600' },
                  ].map((app) => (
                    <div
                      key={app.name}
                      onClick={() => handlePaymentAppClick(app.name)}
                      className={`cursor-pointer p-4 rounded-2xl bg-white shadow-md hover:shadow-xl transition-shadow ${
                        upiApp === app.name ? `ring-4 ${app.ring}` : ''
                      }`}
                    >
                      <img src={app.img} alt={app.name} className="h-12 mx-auto" />
                      <p className="mt-2 font-semibold text-gray-700">{app.name}</p>
                    </div>
                  ))}
                </div>
                {qrCodeUrl && (
                  <>
                    <img src={qrCodeUrl} alt="QR Code" className="mx-auto w-56 h-56 mb-6" />
                    <p className="text-sm text-gray-500 mb-4">
                      Scan the QR Code with {upiApp} to pay.
                    </p>
                  </>
                )}
                <button
                  onClick={handlePaymentVerification}
                  className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 text-white py-3 rounded-full mt-6 hover:from-blue-700 hover:to-cyan-600 transition-colors shadow-lg"
                >
                  Confirm Payment
                </button>
              </>
            )}
            {paymentMethod === 'Cash' && (
              <p className="text-gray-700 text-lg">Please pay in cash to proceed.</p>
            )}
            <button
              onClick={resetForm}
              className="w-full bg-gray-300 text-gray-800 py-3 rounded-full mt-6 hover:bg-gray-400 transition-colors shadow"
            >
              Cancel and Start Over
            </button>
          </motion.div>
        )}
      </main>
      {/* Render the high-res preview modal if active */}
      {renderPreviewModal()}
      <footer className="bg-gray-900 text-gray-300 text-center py-6">
        <p>© {new Date().getFullYear()} InstaPrint. All Rights Reserved.</p>
      </footer>
    </div>
  );
};

export default FileUploadAndPrint;
