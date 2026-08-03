// =========================================================================
// File: OpticsPOSView.tsx
// Description: Mastering React.lazy for high-performance code splitting
// =========================================================================
import React, { useState, lazy, Suspense } from 'react';

// =========================================================================
// 🚀 LAZY IMPORT MAGIC (Standard React)
// The scanner code never enters the main page bundle!
// It is fetched as an independent chunk only when needed.
// =========================================================================
const LazyBarcodeScannerModal = lazy(() => import('./OpticsBarcodeScannerModal'));

/**
 * ============================================================================
 * MECHANICS: On-Demand Lazy Loading
 * ----------------------------------------------------------------------------
 * Unlike route-based code splitting, this example demonstrates component-level
 * code splitting. The LazyBarcodeScannerModal is only loaded when `isScannerOpen`
 * becomes true. Until then, its chunk is never requested over the network.
 * ============================================================================
 */
export const OpticsPOSView = () => {
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const [scannedItem, setScannedItem] = useState<string | null>(null);

  const handleBarcodeFound = (barcode: string) => {
    setScannedItem(barcode);
    setIsScannerOpen(false);
  };

  return (
    <div className="p-8 bg-slate-950 min-h-screen text-white font-mono flex flex-col items-center justify-center gap-6">
      <div className="p-6 bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full text-center space-y-4 shadow-2xl">
        <h1 className="text-lg font-bold text-cyan-400">👓 Optics Store POS System</h1>
        <p className="text-xs text-slate-400">
          This page is extremely lightweight and fast; we haven't loaded any heavy code yet!
        </p>

        {/* The button that will trigger fetching the component from the server when clicked */}
        <button
          type="button"
          onClick={() => setIsScannerOpen(true)}
          className="w-full py-3 bg-cyan-600 hover:bg-cyan-500 rounded-xl text-xs font-bold transition shadow-lg shadow-cyan-600/20 cursor-pointer"
        >
          📷 Launch Camera Barcode Scanner (Lazy Load)
        </button>

        {scannedItem && (
          <div className="p-3 bg-emerald-950/50 border border-emerald-500/30 rounded-xl text-xs text-emerald-300">
            ✓ Product captured: <strong className="font-bold">{scannedItem}</strong>
          </div>
        )}
      </div>

      {/* 
        Here is the magic! This component won't ask the browser to fetch its file 
        until isScannerOpen becomes true! We use Suspense to handle the loading state.
      */}
      {isScannerOpen && (
        <Suspense fallback={
          <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 font-mono text-xs text-cyan-400">
            ⏳ Fetching camera and scanner libraries from the server...
          </div>
        }>
          <LazyBarcodeScannerModal
            isOpen={isScannerOpen}
            onClose={() => setIsScannerOpen(false)}
            onBarcodeDetected={handleBarcodeFound}
          />
        </Suspense>
      )}
    </div>
  );
};