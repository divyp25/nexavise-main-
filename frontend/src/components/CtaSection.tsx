export const CtaSection = () => {
  return (
    <section className="py-16 sm:py-24">
      <div className="container mx-auto px-4 sm:px-6 max-w-6xl">
        <div className="bg-white dark:bg-[#0a0e14] border border-gray-200 dark:border-white/5 rounded-[2rem] sm:rounded-[3rem] p-8 sm:p-12 md:p-16 text-left shadow-2xl">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-gray-900 dark:text-gray-200 mb-4 sm:mb-6 tracking-tight">
            Looking for a custom project quote?
          </h2>
          <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base max-w-2xl mb-8 sm:mb-10 leading-relaxed">
            Submit your system architecture size, regulatory requirements, or penetration testing scope target, and receive a proposal within 4 hours.
          </p>
          <button className="w-full sm:w-auto px-8 py-4 rounded-full bg-gray-900 dark:bg-white text-white dark:text-gray-900 font-bold text-base sm:text-lg hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors shadow-sm dark:shadow-md">
            Talk to an Expert
          </button>
        </div>
        {/* Certifications Section */}
        <div className="mt-16 pt-12 border-t border-gray-200 dark:border-white/5 text-center">
          <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-8">
            Our Official Certifications
          </h3>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 opacity-80 hover:opacity-100 transition-opacity duration-300">
            {/* MSME India Logo */}
            <div className="flex items-center justify-center bg-white dark:bg-[#0d131b]/60 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all w-[250px] h-[130px] sm:w-[280px] sm:h-[145px] p-4 overflow-hidden grayscale hover:grayscale-0">
              <img src="/msme_new.svg" alt="MSME India" className="max-h-full max-w-full object-contain scale-[1.2]" />
            </div>
            
            {/* DPIIT Startup India Logo */}
            <div className="flex items-center justify-center bg-white dark:bg-[#0d131b]/60 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all w-[250px] h-[130px] sm:w-[280px] sm:h-[145px] p-4 overflow-hidden grayscale hover:grayscale-0">
              <img src="/startup_india_new.svg" alt="Startup India DPIIT" className="max-h-full max-w-full object-contain scale-[1.2]" />
            </div>
 
            {/* Certification Logo */}
            <div className="flex items-center justify-center bg-white dark:bg-[#0d131b]/60 rounded-3xl border border-gray-200 dark:border-white/10 shadow-sm hover:shadow-md transition-all w-[250px] h-[130px] sm:w-[280px] sm:h-[145px] p-4 overflow-hidden">
              <img src="/new_logo.svg" alt="Certification Logo" className="max-h-full max-w-full object-contain scale-[1.2]" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
