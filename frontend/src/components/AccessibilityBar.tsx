export const AccessibilityBar = () => {
  return (
    <>
      {/* Skip to Main Content Link (WCAG requirement) */}
      <a 
        href="#main-content" 
        className="fixed left-4 -translate-y-20 focus:translate-y-4 transition-transform bg-primary text-primary-foreground px-4 py-2 rounded-md font-bold focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-background z-[100]"
      >
        Skip to main content
      </a>
    </>
  );
};
