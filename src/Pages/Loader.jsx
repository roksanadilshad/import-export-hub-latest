import React from 'react';

const Loader = () => {
  return (
    <div className="fixed inset-0 min-h-screen bg-[var(--color-primary)] flex flex-col items-center justify-center z-[999] transition-colors duration-500">
      <div className="relative flex flex-col items-center">
        
        {/* The Animated Square Spinner */}
        <div className="relative w-16 h-16 border-2 border-[var(--color-accent)]/10 flex items-center justify-center">
          <div className="absolute inset-0 border-t-2 border-[var(--color-secondary)] animate-spin"></div>
          
          {/* Inner Static Core */}
          <div className="w-6 h-6 bg-[var(--color-accent)] animate-pulse"></div>
        </div>

        {/* Technical Text */}
        <div className="mt-8 text-center space-y-2">
          <h2 className="text-[10px] font-black uppercase tracking-[0.5em] text-[var(--color-accent)]">
            Synchronizing <span className="text-[var(--color-secondary)]">Manifest</span>
          </h2>
          
          {/* Progress Bar Decoration */}
          <div className="w-32 h-[1px] bg-[var(--color-accent)]/10 mx-auto overflow-hidden">
            <div className="w-full h-full bg-[var(--color-secondary)] -translate-x-full animate-[progress_1.5s_infinite_linear]"></div>
          </div>
        </div>
      </div>

      {/* Tailwind Custom Keyframe in your global CSS is recommended, 
          but here is a purely inline way to handle the progress bar if needed */}
      <style dangerouslySetInnerHTML={{ __html: `
        @keyframes progress {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }
      `}} />
    </div>
  );
};

export default Loader;