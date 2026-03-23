import { useRef, useState } from 'react';

interface SketchfabModelProps {
  modelId?: string;
  className?: string;
  onLoad?: () => void;
  theme?: 'light' | 'dark';
}

/**
 * SketchfabModel — embeds a public Sketchfab 3D model via their Viewer API iframe.
 * Loads immediately (no lazy/in-view delay) for maximum speed.
 */
const SketchfabModel = ({
  modelId = '96340701c2ed4d37851c7d9109eee9c0',
  className = '',
  onLoad: externalOnLoad,
  theme = 'dark',
}: SketchfabModelProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Optimized Sketchfab embed URL — all unnecessary UI stripped, max performance params
  const params = new URLSearchParams({
    autostart: '1',        // Start immediately, don't wait for user click
    autospin: '0',         // No auto rotation (saves GPU)
    ui_theme: theme,
    ui_controls: '0',      // Hide all controls
    ui_infos: '0',
    ui_inspector: '0',
    ui_stop: '0',
    ui_ar: '0',
    ui_help: '0',
    ui_settings: '0',
    ui_vr: '0',
    ui_fullscreen: '0',
    ui_annotations: '0',
    ui_watermark: '0',
    transparent: '1',      // Transparent background
    camera: '0',
    preload: '1',          // Preload model data aggressively
    dnt: '1',              // Do Not Track — removes analytics overhead
    double_click: '0',     // Disable double click to enter fullscreen
    scrollwheel: '0',      // Disable scroll wheel zoom (no accidental page hijack)
    fps_speed: '1',        // Normal speed, less GPU
  });

  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?${params.toString()}`;

  return (
    <div ref={containerRef} className={`relative w-full h-full ${className}`}>
      {/* Sketchfab Viewer iframe - Loads immediately on mount for maximum speed */}
      <iframe
        ref={iframeRef}
        title="Interactive 3D Fashion Model"
        src={embedUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        onLoad={() => {
          setLoaded(true);
          if (externalOnLoad) externalOnLoad();
        }}
        className={`w-full h-full border-0 transition-opacity duration-1000 ${loaded ? 'opacity-100' : 'opacity-0'}`}
        style={{ display: 'block' }}
      />
    </div>
  );
};

export default SketchfabModel;
