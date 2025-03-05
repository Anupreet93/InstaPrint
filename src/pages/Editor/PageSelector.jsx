// src/pages/Editor/PageSelector.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';

const PageSelector = ({
  show,
  onClose,
  thumbnails,
  selectedPages,
  setSelectedPages,
  generatingThumbnails,
  generateHighResPreview,
  setPreviewPage,
}) => {
  return (
    <AnimatePresence>
      {show && (
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
                      onClick={onClose}
                      className="px-6 py-2 bg-gray-300 rounded-full hover:bg-gray-400 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={onClose}
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
};

export default PageSelector;
