import { useRef, useState } from 'react';

interface SketchfabModelProps {
  modelId?: string;
  className?: string;
  onLoad?: () => void;
  theme?: 'light' | 'dark';
}

/**
 * SketchfabModel — embeds a public Sketchfab 3D model via their Viewer API iframe.
 *
 * Model IDs that work well for fashion/male mannequin:
 * - "1b3fdce74abe4b85b7d0cd2a4f7e1c74" — Male Anatomy / Body
 * - "f5e51bf1badf434a93b5d95a817fb68b" — Male character
 * - "7b39ed4c8a674965a8e73e73a9bde7d1" — Stylized Man
 *
 * Sketchfab Viewer API docs: https://sketchfab.com/developers/viewer
 */
const SketchfabModel = ({
  // Verified model from Sketchfab API (574K views, 8K likes, high quality PBR human character)
  modelId = '96340701c2ed4d37851c7d9109eee9c0',
  className = '',
  onLoad: externalOnLoad,
  theme = 'dark',
}: SketchfabModelProps) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const [loaded, setLoaded] = useState(false);

  // Build Sketchfab Viewer API embed URL with all UI stripped
  const params = new URLSearchParams({
    autostart: '1',
    autospin: '0',
    ui_theme: theme,
    ui_controls: '0',
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
    transparent: '1',
    camera: '0',
    preload: '1',
  });

  const embedUrl = `https://sketchfab.com/models/${modelId}/embed?${params.toString()}`;

  return (
    <div className={`relative w-full h-full ${className}`}>
      {/* Loading state */}
      {!loaded && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-black">
          <div className="relative w-20 h-20 mb-6">
            <div className="absolute inset-0 rounded-full border-2 border-purple-500/30 animate-ping" />
            <div className="absolute inset-2 rounded-full border-2 border-purple-500 border-t-transparent animate-spin" />
          </div>
          <p className="text-purple-400 text-xs tracking-[0.4em] uppercase">Loading 3D Model</p>
        </div>
      )}

      {/* Sketchfab Viewer iframe */}
      <iframe
        ref={iframeRef}
        title="Interactive 3D Fashion Model"
        src={embedUrl}
        frameBorder="0"
        allow="autoplay; fullscreen; xr-spatial-tracking"
        loading="lazy"
        onLoad={() => {
          setLoaded(true);
          if (externalOnLoad) externalOnLoad();
        }}
        className="w-full h-full border-0"
        style={{ display: loaded ? 'block' : 'none' }}
      />
    </div>
  );
};

export default SketchfabModel;
