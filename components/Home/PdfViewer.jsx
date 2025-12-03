"use client";

import { useEffect, useRef, useState } from "react";
import * as pdfjsLib from "pdfjs-dist/legacy/build/pdf";

// Set worker
pdfjsLib.GlobalWorkerOptions.workerSrc =
  `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.min.js`;

export default function PdfViewer({ fileId, onClose }) {
  const canvasRef = useRef(null);
  const pdfRef = useRef(null); // store loaded pdf
  const [numPages, setNumPages] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);

  // Load PDF ONLY once
  useEffect(() => {
    const url = `https://drive.google.com/uc?export=download&id=${fileId}`;

    const loadPdf = async () => {
      const pdf = await pdfjsLib.getDocument(url).promise;
      pdfRef.current = pdf;
      setNumPages(pdf.numPages);
      renderPage(1);
    };

    loadPdf();
  }, [fileId]);

  // Render page function
  const renderPage = async (pageNum) => {
    if (!pdfRef.current) return;
    const pdf = pdfRef.current;

    const page = await pdf.getPage(pageNum);
    const viewport = page.getViewport({ scale: 1.5 });

    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");

    canvas.height = viewport.height;
    canvas.width = viewport.width;

    await page.render({ canvasContext: context, viewport }).promise;
  };

  // When currentPage changes → render
  useEffect(() => {
    if (pdfRef.current) renderPage(currentPage);
  }, [currentPage]);

  const nextPage = () => {
    if (currentPage < numPages) setCurrentPage((p) => p + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) setCurrentPage((p) => p - 1);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full max-h-[90vh] flex flex-col items-center">
        
        <button onClick={onClose} className="self-end mb-2 font-bold">
          Close
        </button>

        <canvas ref={canvasRef} className="border rounded-xl shadow-md" />

        <div className="flex gap-4 mt-3 items-center">
          <button
            onClick={prevPage}
            disabled={currentPage === 1}
            className="px-4 py-2 bg-gray-800 text-white rounded disabled:opacity-40"
          >
            Previous
          </button>

          <span className="font-semibold text-gray-700">
            {currentPage} / {numPages}
          </span>

          <button
            onClick={nextPage}
            disabled={currentPage === numPages}
            className="px-4 py-2 bg-yellow-600 text-white rounded disabled:opacity-40"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
