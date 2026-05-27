import React from 'react';

export default function SectionBackground({ config }: { config: any }) {
  if (!config || !config.url) return null;
  const opacity = (config.opacity || 20) / 100;
  
  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ opacity }}>
      {config.type === 'video' ? (
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={config.url} type="video/mp4" />
        </video>
      ) : (
        <img src={config.url} className="w-full h-full object-cover" alt="Background" />
      )}
    </div>
  );
}
