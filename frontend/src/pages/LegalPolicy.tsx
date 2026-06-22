import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Shield, FileText, Cookie } from 'lucide-react';

export const LegalPolicy = () => {
  const location = useLocation();
  
  let title = "Legal Policy";
  let content = "This is a placeholder for the legal policy.";
  let Icon = FileText;
  
  if (location.pathname === "/privacy-policy") {
    title = "Privacy Policy";
    content = "This Privacy Policy describes how Nexavise Consulting collects, uses, and shares your personal information. We are committed to protecting your privacy and ensuring your data is secure.";
    Icon = Shield;
  } else if (location.pathname === "/terms-of-service") {
    title = "Terms of Service";
    content = "These Terms of Service govern your use of the Nexavise Consulting website and services. By using our website, you agree to these terms.";
    Icon = FileText;
  } else if (location.pathname === "/cookie-policy") {
    title = "Cookie Policy";
    content = "Our Cookie Policy explains how we use cookies and similar technologies to recognize you when you visit our website. You can control your cookie preferences through your browser settings.";
    Icon = Cookie;
  }

  return (
    <div className="pt-32 pb-24 min-h-[70vh] flex flex-col">
      <Helmet>
        <title>{title} | Nexavise</title>
      </Helmet>
      
      <div className="container mx-auto px-6 max-w-[1440px] flex-grow">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <div className="p-3 bg-cyan-500/10 rounded-2xl border border-cyan-500/20 text-cyan-600 dark:text-cyan-400">
              <Icon className="h-8 w-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white uppercase tracking-tight">
              {title}
            </h1>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-400 prose-p:leading-relaxed">
            <p className="text-xl leading-relaxed mb-8">
              {content}
            </p>
            <p>
              For any questions regarding our legal policies, please contact our team at <a href="mailto:nexaviseconsulting@gmail.com" className="text-cyan-600 dark:text-cyan-400 hover:underline">nexaviseconsulting@gmail.com</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
