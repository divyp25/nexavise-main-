import { useState, useEffect, useRef } from "react";
import { Server, ShieldAlert, Cpu, Network, Play, Terminal, Shield, RefreshCw } from "lucide-react";

interface LogEntry {
  timestamp: string;
  type: "INFO" | "WARNING" | "CRITICAL";
  source: string;
  message: string;
}

export const SocConsole = () => {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [metrics, setMetrics] = useState({
    packetsPerSec: 1420,
    blockedIps: 348,
    activeThreats: 2,
    responseTime: 45, // ms
  });
  const [activeSimulation, setActiveSimulation] = useState<string | null>(null);
  const logEndRef = useRef<HTMLDivElement>(null);

  // Initialize logs
  useEffect(() => {
    const initialLogs: LogEntry[] = [
      { timestamp: new Date().toLocaleTimeString(), type: "INFO", source: "Firewall-01", message: "Interface eth0 initialized successfully." },
      { timestamp: new Date().toLocaleTimeString(), type: "INFO", source: "IDS-Node", message: "Rule database signature updated to v2.4.9." },
      { timestamp: new Date().toLocaleTimeString(), type: "WARNING", source: "Auth-Gate", message: "Suspicious login pattern detected from 198.51.100.42." }
    ];
    setLogs(initialLogs);
  }, []);

  // Log simulation logic
  useEffect(() => {
    const logPool = [
      { type: "INFO" as const, source: "DPI-Scanner", message: "Deep packet inspection checked SSL handshake for Session ID #8491." },
      { type: "INFO" as const, source: "Proxy-Chain", message: "Inbound Tor exit node request routed through sandboxed proxy." },
      { type: "WARNING" as const, source: "Rate-Limiter", message: "Rate limit threshold approached on API endpoint /v1/auth." },
      { type: "INFO" as const, source: "Kernel-Audit", message: "System call trace executed clean validation check." },
      { type: "CRITICAL" as const, source: "WAF-Intercept", message: "SQL Injection attack blocked from IP 203.0.113.88 targeting column /users." },
      { type: "WARNING" as const, source: "Host-Shield", message: "Unauthorized file write attempt detected in /tmp directory." },
      { type: "CRITICAL" as const, source: "DNS-Sensor", message: "DNS tunneling pattern detected on host db-replica-01.local." }
    ];

    const interval = setInterval(() => {
      const randomLog = logPool[Math.floor(Math.random() * logPool.length)];
      const newEntry: LogEntry = {
        timestamp: new Date().toLocaleTimeString(),
        ...randomLog
      };
      setLogs((prev) => [...prev.slice(-49), newEntry]); // Keep last 50 logs

      // Randomly change metrics slightly
      setMetrics((prev) => {
        const spike = activeSimulation ? 2.5 : 1;
        return {
          packetsPerSec: Math.floor(1350 + Math.random() * 180 * spike),
          blockedIps: prev.blockedIps + (Math.random() > 0.85 ? 1 : 0),
          activeThreats: activeSimulation ? 12 : Math.max(1, prev.activeThreats + (Math.random() > 0.9 ? 1 : Math.random() > 0.9 ? -1 : 0)),
          responseTime: Math.floor(40 + Math.random() * 12 * spike)
        };
      });
    }, 1500);

    return () => clearInterval(interval);
  }, [activeSimulation]);

  // Scroll to bottom of logs
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [logs]);

  // Handle Simulation triggers
  const triggerSimulation = (type: string) => {
    if (activeSimulation) return;
    setActiveSimulation(type);

    let threatName = "";
    let logsToAdd: LogEntry[] = [];

    if (type === "ddos") {
      threatName = "Simulated Layer 7 DDoS Attack";
      logsToAdd = [
        { timestamp: new Date().toLocaleTimeString(), type: "CRITICAL", source: "WAF-Intercept", message: "MASSIVE incoming request spike detected. Exceeding 10k req/sec." },
        { timestamp: new Date().toLocaleTimeString(), type: "WARNING", source: "Rate-Limiter", message: "Activating global rate limiting & IP geo-blocking pools." },
        { timestamp: new Date().toLocaleTimeString(), type: "CRITICAL", source: "Load-Balancer", message: "Backend latency elevated. Diverting traffic to cloud scrubbing center." }
      ];
    } else if (type === "bruteforce") {
      threatName = "Brute Force Attack on Admin API";
      logsToAdd = [
        { timestamp: new Date().toLocaleTimeString(), type: "WARNING", source: "Auth-Gate", message: "Multiple authentication failures (50+) detected for user 'admin'." },
        { timestamp: new Date().toLocaleTimeString(), type: "CRITICAL", source: "Host-Shield", message: "Automated IP block issued for 203.0.113.111 after excessive failed attempts." }
      ];
    } else {
      threatName = "Data Exfiltration Tunneling Attempt";
      logsToAdd = [
        { timestamp: new Date().toLocaleTimeString(), type: "CRITICAL", source: "DPI-Scanner", message: "Outbound payload matches known sensitive column pattern (Regex: PII_EMAIL)." },
        { timestamp: new Date().toLocaleTimeString(), type: "CRITICAL", source: "Firewall-01", message: "Connection terminated by Security Orchestrator (SOAR) Rule #99." }
      ];
    }

    setLogs((prev) => [...prev, ...logsToAdd]);

    // End simulation after 6 seconds
    setTimeout(() => {
      setActiveSimulation(null);
      setLogs((prev) => [
        ...prev,
        { timestamp: new Date().toLocaleTimeString(), type: "INFO", source: "System", message: `Threat mitigated: ${threatName} resolved.` }
      ]);
    }, 6000);
  };

  return (
    <div className="pt-28 pb-20 min-h-screen bg-[#06090d] text-gray-200 selection:bg-cyan-500/30">
      <div className="container mx-auto px-4 max-w-[1440px]">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10 pb-6 border-b border-white/5">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-xs font-bold text-cyan-400 mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-cyan-500 animate-ping" />
              <span>LIVE SOC CONSOLE ACTIVE</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold font-display text-white tracking-tight">
              Security Operations Center
            </h1>
            <p className="text-gray-400 text-sm mt-1">
              Real-time threat monitoring, packet telemetry logs, and simulation sandbox.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setLogs([])}
              className="px-4 py-2 rounded-xl bg-white/5 border border-white/10 text-xs font-medium hover:bg-white/10 transition-colors flex items-center gap-2"
            >
              <RefreshCw className="h-3 w-3" />
              Clear Console
            </button>
            <div className="h-10 w-[1px] bg-white/10 hidden sm:block" />
            <div className="text-right hidden sm:block">
              <div className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Security State</div>
              <div className={`text-xs font-bold ${activeSimulation ? 'text-red-500 animate-pulse' : 'text-emerald-500'}`}>
                {activeSimulation ? "ALARM ACTIVE" : "SYSTEM SECURE"}
              </div>
            </div>
          </div>
        </div>

        {/* Top Metric Cards */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Telemetry Traffic</div>
              <div className="text-2xl font-bold font-display text-white mt-1">
                {metrics.packetsPerSec.toLocaleString()} <span className="text-xs text-gray-400 font-normal">p/s</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-cyan-500/10 border border-cyan-500/20 flex items-center justify-center">
              <Network className="h-5 w-5 text-cyan-400" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Active Threats</div>
              <div className="text-2xl font-bold font-display text-white mt-1">
                {metrics.activeThreats}
              </div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center">
              <ShieldAlert className="h-5 w-5 text-amber-400" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Blocked IPs</div>
              <div className="text-2xl font-bold font-display text-white mt-1">
                {metrics.blockedIps}
              </div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
              <Shield className="h-5 w-5 text-red-400" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white/[0.02] border border-white/5 flex items-center justify-between gap-4">
            <div>
              <div className="text-xs text-gray-400 uppercase tracking-wider font-semibold">Latency</div>
              <div className="text-2xl font-bold font-display text-white mt-1">
                {metrics.responseTime} <span className="text-xs text-gray-400 font-normal">ms</span>
              </div>
            </div>
            <div className="h-10 w-10 rounded-xl bg-purple-500/10 border border-purple-500/20 flex items-center justify-center">
              <Cpu className="h-5 w-5 text-purple-400" />
            </div>
          </div>
        </div>

        {/* Dashboard Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Simulation Console Stream */}
          <div className="lg:col-span-8 flex flex-col h-[520px] bg-black/40 border border-white/5 rounded-2xl overflow-hidden shadow-inner">
            <div className="px-5 py-3.5 bg-black/60 border-b border-white/5 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Terminal className="h-4 w-4 text-cyan-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-gray-300">Live Log Feed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="h-2 w-2 rounded-full bg-cyan-400 animate-pulse" />
                <span className="text-[10px] text-gray-500 font-mono">Stream Active</span>
              </div>
            </div>

            <div className="flex-grow overflow-y-auto p-5 font-mono text-[11px] space-y-2.5">
              {logs.map((log, index) => (
                <div key={index} className="flex items-start gap-3 hover:bg-white/[0.01] p-1 rounded transition-colors">
                  <span className="text-gray-600 select-none">[{log.timestamp}]</span>
                  <span className={`font-bold select-none px-1.5 py-0.5 rounded text-[9px] ${
                    log.type === "CRITICAL" ? "bg-red-500/20 text-red-400 border border-red-500/30" : 
                    log.type === "WARNING" ? "bg-amber-500/20 text-amber-400 border border-amber-500/30" : 
                    "bg-cyan-500/10 text-cyan-400 border border-cyan-500/20"
                  }`}>
                    {log.type}
                  </span>
                  <span className="text-purple-400 select-none">[{log.source}]</span>
                  <span className="text-gray-300 flex-grow break-all">{log.message}</span>
                </div>
              ))}
              <div ref={logEndRef} />
            </div>
          </div>

          {/* Controls & Radar Section */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            {/* Simulation controls */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white mb-4 flex items-center gap-2">
                <Server className="h-4 w-4 text-cyan-400" />
                Simulation Control
              </h2>
              <p className="text-xs text-gray-400 leading-relaxed mb-5">
                Execute simulated hostile patterns to verify state change, log intercept triggers, and firewall blocking automation.
              </p>

              <div className="space-y-3">
                <button
                  disabled={activeSimulation !== null}
                  onClick={() => triggerSimulation("ddos")}
                  className={`w-full py-3 px-4 rounded-xl border font-semibold text-xs transition-all flex items-center justify-between ${
                    activeSimulation === "ddos" 
                      ? "bg-red-500/20 border-red-500/30 text-red-400 animate-pulse" 
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10 active:scale-98"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Play className="h-3.5 w-3.5" />
                    Layer 7 DDoS Attack
                  </span>
                  {activeSimulation === "ddos" ? "RUNNING" : "TRIGGER"}
                </button>

                <button
                  disabled={activeSimulation !== null}
                  onClick={() => triggerSimulation("bruteforce")}
                  className={`w-full py-3 px-4 rounded-xl border font-semibold text-xs transition-all flex items-center justify-between ${
                    activeSimulation === "bruteforce" 
                      ? "bg-red-500/20 border-red-500/30 text-red-400 animate-pulse" 
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10 active:scale-98"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Play className="h-3.5 w-3.5" />
                    Admin Brute Force
                  </span>
                  {activeSimulation === "bruteforce" ? "RUNNING" : "TRIGGER"}
                </button>

                <button
                  disabled={activeSimulation !== null}
                  onClick={() => triggerSimulation("exfil")}
                  className={`w-full py-3 px-4 rounded-xl border font-semibold text-xs transition-all flex items-center justify-between ${
                    activeSimulation === "exfil" 
                      ? "bg-red-500/20 border-red-500/30 text-red-400 animate-pulse" 
                      : "bg-white/5 border-white/10 text-white hover:bg-white/10 active:scale-98"
                  }`}
                >
                  <span className="flex items-center gap-2">
                    <Play className="h-3.5 w-3.5" />
                    Data Exfiltration Tunnel
                  </span>
                  {activeSimulation === "exfil" ? "RUNNING" : "TRIGGER"}
                </button>
              </div>
            </div>

            {/* Radar Simulation Panel */}
            <div className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 flex-grow flex flex-col justify-between overflow-hidden relative min-h-[220px]">
              <div className="absolute inset-0 pointer-events-none opacity-20 bg-[radial-gradient(circle_at_center,rgba(6,182,212,0.1)_0%,transparent_70%)] animate-pulse" />
              
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white mb-2 flex items-center gap-2 relative z-10">
                <Network className="h-4 w-4 text-cyan-400" />
                Network Node Scan
              </h2>

              <div className="relative w-44 h-44 mx-auto my-4 flex items-center justify-center border border-cyan-500/20 rounded-full">
                {/* Radar Lines */}
                <div className="absolute inset-2 border border-cyan-500/10 rounded-full" />
                <div className="absolute inset-8 border border-cyan-500/5 rounded-full" />
                <div className="absolute inset-16 border border-cyan-500/5 rounded-full" />
                <div className="absolute h-full w-[1px] bg-cyan-500/10" />
                <div className="absolute w-full h-[1px] bg-cyan-500/10" />

                {/* Radar sweep animation */}
                <div className="absolute inset-0 rounded-full border-r border-t border-cyan-500/40 animate-[spin_4s_linear_infinite]" style={{ transformOrigin: "center" }} />

                {/* Nodes */}
                <span className="absolute top-8 left-12 w-2 h-2 bg-cyan-400 rounded-full animate-ping" />
                <span className="absolute top-8 left-12 w-1.5 h-1.5 bg-cyan-400 rounded-full" />
                
                <span className="absolute bottom-10 right-14 w-1.5 h-1.5 bg-cyan-400 rounded-full opacity-60" />
                
                <span className={`absolute top-16 right-8 w-2.5 h-2.5 rounded-full transition-all duration-300 ${activeSimulation ? 'bg-red-500 animate-bounce' : 'bg-cyan-400 opacity-80'}`} />
              </div>

              <div className="text-center relative z-10 text-[10px] text-gray-500 font-mono">
                ACTIVE GATEWAY SCANNING MODE: SYSTEM NORMAL
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
