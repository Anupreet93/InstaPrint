// src/pages/Editor/PreviewModal.js
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PreviewModal = ({ previewPage, setPreviewPage }) => {
  return (
    <AnimatePresence>
      {previewPage && (
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
      )}
    </AnimatePresence>
  );
};

export default PreviewModal;
