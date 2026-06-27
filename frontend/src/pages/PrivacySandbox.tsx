import { useState } from "react";
import { Shield, Database, Search, Link2, CheckCircle, Play, Check } from "lucide-react";

export const PrivacySandbox = () => {
  const [activeTab, setActiveTab] = useState<"pii" | "dsar" | "webhooks">("pii");

  // PII Auditor State
  const [piiColumns, setPiiColumns] = useState([
    { table: "users", column: "email", type: "Email Address", status: "Untested", confidence: 0 },
    { table: "users", column: "password_hash", type: "Secret Hash", status: "Untested", confidence: 0 },
    { table: "orders", column: "billing_address", type: "Physical Location", status: "Untested", confidence: 0 },
    { table: "sessions", column: "ip_address", type: "Network Identifier", status: "Untested", confidence: 0 },
    { table: "feedback", column: "comment_text", type: "Freeform Text", status: "Untested", confidence: 0 },
  ]);
  const [auditingIndex, setAuditingIndex] = useState<number | null>(null);

  // DSAR Sweep State
  const [dsarInput, setDsarInput] = useState("");
  const [dsarSteps, setDsarSteps] = useState<{ step: string; status: "pending" | "running" | "done" }[]>([]);
  const [dsarResult, setDsarResult] = useState<any>(null);

  // Webhooks State
  const [webhookLog, setWebhookLog] = useState<string>("");
  const [activeConnectors, setActiveConnectors] = useState<string[]>(["stripe"]);

  // Trigger PII Audit
  const auditColumn = (index: number) => {
    if (auditingIndex !== null) return;
    setAuditingIndex(index);
    setPiiColumns((prev) => {
      const updated = [...prev];
      updated[index].status = "Scanning";
      return updated;
    });

    setTimeout(() => {
      setPiiColumns((prev) => {
        const updated = [...prev];
        updated[index].status = "Audited";
        updated[index].confidence = updated[index].column === "password_hash" ? 99 : 92;
        return updated;
      });
      setAuditingIndex(null);
    }, 1500);
  };

  // Run DSAR Sweep
  const runDsarSweep = (e: React.FormEvent) => {
    e.preventDefault();
    if (!dsarInput) return;
    
    setDsarResult(null);
    const steps = [
      { step: "Scanning Auth Database logs", status: "running" as const },
      { step: "Crawling object storage & backup vault S3 buckets", status: "pending" as const },
      { step: "Scanning customer feedback text sentiment indices", status: "pending" as const },
      { step: "Compiling PII data lineage report", status: "pending" as const },
    ];
    setDsarSteps(steps);

    const executeStep = (stepIdx: number) => {
      if (stepIdx >= steps.length) {
        setDsarResult({
          timestamp: new Date().toISOString(),
          foundRecords: 14,
          dataTypes: ["Email", "IP Address", "Billing Address", "Feedback Text"],
          complianceStatus: "GDPR Section 17 Shredding Available"
        });
        return;
      }

      setTimeout(() => {
        setDsarSteps((prev) => {
          const updated = [...prev];
          updated[stepIdx].status = "done";
          if (stepIdx + 1 < updated.length) {
            updated[stepIdx + 1].status = "running";
          }
          return updated;
        });
        executeStep(stepIdx + 1);
      }, 1000);
    };

    executeStep(0);
  };

  // Toggle webhooks
  const toggleConnector = (id: string) => {
    setActiveConnectors((prev) => 
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  // Simulate webhook payload send
  const sendSampleWebhook = () => {
    const payloads = [
      {
        event: "privacy.ledger.sync",
        id: "evt_priv_9482710",
        timestamp: new Date().toISOString(),
        data: {
          subject_ref: "usr_99831",
          consent_actions: [
            { category: "analytics", granted: false, timestamp: new Date().toISOString() },
            { category: "marketing", granted: true, timestamp: new Date().toISOString() }
          ]
        }
      },
      {
        event: "dsar.purge.requested",
        id: "evt_dsar_118491",
        timestamp: new Date().toISOString(),
        data: {
          request_id: "req_shred_84920",
          hashed_identifier: "8f5a9e33b8a1ad354d5b7a1dfa01e3",
          systems_cleared: ["auth", "billing", "logs"]
        }
      }
    ];

    const randomPayload = payloads[Math.floor(Math.random() * payloads.length)];
    setWebhookLog(JSON.stringify(randomPayload, null, 2));
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#06090d] text-gray-200 selection:bg-cyan-500/30">
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Header */}
        <div className="mb-10 pb-6 border-b border-white/5">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-3">
            <Shield className="h-3.5 w-3.5" />
            <span>AI PRIVACY COMPLIANCE SANDBOX</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
            Privacy Sandbox
          </h1>
          <p className="text-gray-400 text-sm mt-1">
            Simulate PII data discovery, automate user right sweeps, and coordinate Zero-Code ledger endpoints.
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex border-b border-white/5 mb-8">
          <button
            onClick={() => setActiveTab("pii")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "pii" 
                ? "border-cyan-500 text-white" 
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            <Database className="h-4 w-4" />
            PII Classifier Auditor
          </button>
          <button
            onClick={() => setActiveTab("dsar")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "dsar" 
                ? "border-cyan-500 text-white" 
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            <Search className="h-4 w-4" />
            DSAR Sweep Agent
          </button>
          <button
            onClick={() => setActiveTab("webhooks")}
            className={`px-5 py-3 text-sm font-semibold border-b-2 transition-all flex items-center gap-2 ${
              activeTab === "webhooks" 
                ? "border-cyan-500 text-white" 
                : "border-transparent text-gray-500 hover:text-gray-300"
            }`}
          >
            <Link2 className="h-4 w-4" />
            Zero-Code Webhooks
          </button>
        </div>

        {/* Content Area */}
        <div className="bg-white/[0.01] border border-white/5 rounded-2xl p-6 md:p-8">
          
          {/* TAB 1: PII Classifier */}
          {activeTab === "pii" && (
            <div>
              <h2 className="text-xl font-bold text-white mb-2">Automated PII Database Audit</h2>
              <p className="text-sm text-gray-400 mb-6 max-w-3xl">
                Scan database table schemas using our AI classification engine to discover exposed phone numbers, email addresses, or unhashed passwords.
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-white/5 text-gray-400 text-xs font-semibold uppercase tracking-wider">
                      <th className="py-4 px-4">Database Location</th>
                      <th className="py-4 px-4">Type Guess</th>
                      <th className="py-4 px-4">Audit Status</th>
                      <th className="py-4 px-4">AI Confidence</th>
                      <th className="py-4 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 text-sm">
                    {piiColumns.map((col, index) => (
                      <tr key={index} className="hover:bg-white/[0.01] transition-colors">
                        <td className="py-4 px-4 font-mono text-cyan-400">
                          {col.table}.{col.column}
                        </td>
                        <td className="py-4 px-4 text-gray-300">
                          {col.type}
                        </td>
                        <td className="py-4 px-4">
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${
                            col.status === "Audited" ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" :
                            col.status === "Scanning" ? "bg-amber-500/10 text-amber-400 border border-amber-500/20 animate-pulse" :
                            "bg-white/5 text-gray-400"
                          }`}>
                            {col.status}
                          </span>
                        </td>
                        <td className="py-4 px-4">
                          {col.status === "Audited" ? (
                            <div className="flex items-center gap-1">
                              <CheckCircle className="h-4 w-4 text-emerald-400" />
                              <span>{col.confidence}% Match</span>
                            </div>
                          ) : (
                            <span className="text-gray-600">--</span>
                          )}
                        </td>
                        <td className="py-4 px-4 text-right">
                          <button
                            disabled={col.status !== "Untested"}
                            onClick={() => auditColumn(index)}
                            className="px-3 py-1.5 rounded-lg bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                          >
                            {col.status === "Audited" ? "Completed" : "Audit Column"}
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: DSAR Sweep */}
          {activeTab === "dsar" && (
            <div className="max-w-4xl">
              <h2 className="text-xl font-bold text-white mb-2">Automated Data Subject Access Requests (DSAR)</h2>
              <p className="text-sm text-gray-400 mb-6">
                Query individual user databases, application storage buckets, and cached logging endpoints simultaneously to aggregate or delete matching user information.
              </p>

              <form onSubmit={runDsarSweep} className="flex gap-3 mb-8">
                <input
                  type="email"
                  required
                  placeholder="Enter customer email (e.g. user@example.com)"
                  value={dsarInput}
                  onChange={(e) => setDsarInput(e.target.value)}
                  className="flex-grow bg-black/30 border border-white/10 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-cyan-500 text-white"
                />
                <button
                  type="submit"
                  className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-sm transition-colors flex items-center gap-2"
                >
                  <Search className="h-4 w-4" />
                  Run Sweep
                </button>
              </form>

              {/* Steps timeline */}
              {dsarSteps.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h3 className="text-xs uppercase font-bold tracking-wider text-gray-400">Search Sequence</h3>
                  <div className="space-y-3">
                    {dsarSteps.map((step, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <span className={`h-2 w-2 rounded-full ${
                          step.status === "done" ? "bg-emerald-500" :
                          step.status === "running" ? "bg-cyan-400 animate-ping" :
                          "bg-white/10"
                        }`} />
                        <span className={`text-xs ${step.status === "done" ? "text-gray-400" : step.status === "running" ? "text-white" : "text-gray-600"}`}>
                          {step.step}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Sweep Results */}
              {dsarResult && (
                <div className="p-6 rounded-2xl bg-emerald-500/5 border border-emerald-500/20">
                  <div className="flex items-start justify-between gap-4 flex-wrap">
                    <div>
                      <div className="flex items-center gap-2 text-emerald-400 font-bold mb-2">
                        <Check className="h-5 w-5" />
                        <span>Sweep Compiled Successfully</span>
                      </div>
                      <p className="text-xs text-gray-400 leading-relaxed max-w-xl">
                        Found {dsarResult.foundRecords} unique instances of user records across {dsarResult.dataTypes.length} tables. Ready for regulatory extraction/purge.
                      </p>
                      
                      <div className="mt-4 flex flex-wrap gap-2">
                        {dsarResult.dataTypes.map((type: string, i: number) => (
                          <span key={i} className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-gray-300 font-mono">
                            {type}
                          </span>
                        ))}
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        alert("Cryptographic shredding task dispatched to active ledger queues.");
                        setDsarResult(null);
                        setDsarInput("");
                        setDsarSteps([]);
                      }}
                      className="px-4 py-2.5 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 hover:bg-red-500/20 text-xs font-semibold transition-colors"
                    >
                      Trigger Safe Deletion
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* TAB 3: Webhooks */}
          {activeTab === "webhooks" && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
              <div>
                <h2 className="text-xl font-bold text-white mb-2">Zero-Code Ledger Integration</h2>
                <p className="text-sm text-gray-400 mb-6 leading-relaxed">
                  Toggle platform hooks to capture active user consent alterations and feed them to external customer systems in compliance with CCPA / GDPR regulations.
                </p>

                <div className="space-y-3">
                  {[
                    { id: "stripe", name: "Stripe Billing Consent Connector", desc: "Sync active user privacy preferences to billing profiles." },
                    { id: "salesforce", name: "Salesforce CRM Consent Sync", desc: "Lock out marketing campaigns for opt-out customers." },
                    { id: "shopify", name: "Shopify Customer Data Purger", desc: "Sync user deletion events to associated e-commerce stores." }
                  ].map((connector) => (
                    <div key={connector.id} className="p-4 rounded-xl bg-black/20 border border-white/5 flex items-center justify-between gap-4">
                      <div>
                        <div className="text-sm font-semibold text-white">{connector.name}</div>
                        <div className="text-xs text-gray-400 mt-1">{connector.desc}</div>
                      </div>
                      <button
                        onClick={() => toggleConnector(connector.id)}
                        className={`w-12 h-6 rounded-full p-1 transition-all ${
                          activeConnectors.includes(connector.id) ? "bg-cyan-500 text-black flex justify-end" : "bg-white/10 text-white flex justify-start"
                        }`}
                      >
                        <span className="w-4 h-4 rounded-full bg-white shadow" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* Webhook log simulator */}
              <div className="p-5 rounded-2xl bg-black/40 border border-white/5 flex flex-col h-[320px] overflow-hidden">
                <div className="flex items-center justify-between pb-3 border-b border-white/5 mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-gray-400">Endpoint Live Feed</span>
                  <button
                    onClick={sendSampleWebhook}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-600 text-black font-semibold text-xs transition-colors flex items-center gap-1.5"
                  >
                    <Play className="h-3 w-3" />
                    Send Event
                  </button>
                </div>

                <div className="flex-grow overflow-auto bg-black/60 p-4 rounded-xl border border-white/5 font-mono text-xs">
                  {webhookLog ? (
                    <pre className="text-cyan-400">{webhookLog}</pre>
                  ) : (
                    <div className="h-full flex items-center justify-center text-gray-600 text-center">
                      No webhook traffic recorded yet. Click 'Send Event' to simulate.
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
