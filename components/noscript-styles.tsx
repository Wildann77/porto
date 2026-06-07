export default function NoScriptStyles() {
  return (
    <noscript>
      <style
        dangerouslySetInnerHTML={{
          __html: `
        /* Hide elements that require JavaScript */
        .js-only {
          display: none !important;
        }
        
        /* Show no-js alternatives */
        .no-js {
          display: block !important;
        }
        
        /* Ensure all sections are visible without animations */
        .animate-in, 
        [data-motion="hidden"] {
          opacity: 1 !important;
          transform: none !important;
        }
        
        /* Ensure the header is visible and fixed with glassmorphism */
        header {
          position: fixed !important;
          top: 0 !important;
          left: 0 !important;
          right: 0 !important;
          background-color: color-mix(in oklch, var(--background), transparent 30%) !important;
          backdrop-filter: blur(10px) !important;
          z-index: 50 !important;
          border-bottom: 1px solid color-mix(in oklch, var(--border), transparent 70%) !important;
        }

        /* Add padding to the body to account for the fixed header */
        body {
          padding-top: 4rem !important; /* 64px, matches the header height */
        }
        
        /* Dark mode adjustments */
        .dark header {
          background-color: color-mix(in oklch, var(--background), transparent 30%) !important;
          border-bottom: 1px solid color-mix(in oklch, var(--border), transparent 70%) !important;
        }
        
        /* Ensure mobile menu is accessible */
        .md\\:hidden {
          display: block !important;
          height: auto !important;
        }
        
        /* Hide animated background */
        .animated-background {
          display: none;
        }
      `,
        }}
      />
    </noscript>
  )
}
