import React, { useState, useEffect } from 'react';
import {
  Activity,
  AlertTriangle,
  Radio,
  Users,
  Shield,
  Zap,
  ArrowUpRight,
  TrendingUp,
  RotateCw,
  Sliders,
  CheckCircle2,
  Terminal,
} from 'lucide-react';

interface ZoneData {
  id: string;
  name: string;
  capacity: number;
  currentOccupancy: number;
  flowRate: number; // people per min
  riskLevel: 'OPTIMAL' | 'ELEVATED' | 'CRITICAL';
  recommendedAction?: string;
}

export const StadiumOperationsCockpit: React.FC = () => {
  const [zones, setZones] = useState<ZoneData[]>([
    {
      id: 'gate-a',
      name: 'North Gate Concourse A',
      capacity: 12000,
      currentOccupancy: 8400,
      flowRate: 340,
      riskLevel: 'OPTIMAL',
    },
    {
      id: 'gate-b',
      name: 'East Turnstile Plaza B',
      capacity: 15000,
      currentOccupancy: 13950,
      flowRate: 680,
      riskLevel: 'ELEVATED',
      recommendedAction: 'Predictive surge: Open aux lane 7-10 & reroute South Concourse.',
    },
    {
      id: 'concourse-c',
      name: 'Lower Tier Promenade C',
      capacity: 22000,
      currentOccupancy: 17800,
      flowRate: 410,
      riskLevel: 'OPTIMAL',
    },
    {
      id: 'vip-west',
      name: 'West Club Ingress D',
      capacity: 8000,
      currentOccupancy: 4200,
      flowRate: 150,
      riskLevel: 'OPTIMAL',
    },
  ]);

  const [simulatingSurge, setSimulatingSurge] = useState<boolean>(false);
  const [activeAlerts, setActiveAlerts] = useState<string[]>([
    'Predictive Agent: Ingress bottleneck expected at East Plaza in 12m',
    'Sentinel Agent: Gate B-4 automated ticket scanner velocity normal',
  ]);
  const [selectedZoneId, setSelectedZoneId] = useState<string>('gate-b');

  // Periodic subtle live data movement
  useEffect(() => {
    const interval = setInterval(() => {
      setZones((prev) =>
        prev.map((zone) => {
          const jitter = Math.floor(Math.random() * 21) - 10;
          const newOcc = Math.max(1000, Math.min(zone.capacity, zone.currentOccupancy + jitter));
          const percentage = (newOcc / zone.capacity) * 100;
          let risk: 'OPTIMAL' | 'ELEVATED' | 'CRITICAL' = 'OPTIMAL';
          if (percentage > 90) risk = 'CRITICAL';
          else if (percentage > 80) risk = 'ELEVATED';

          return {
            ...zone,
            currentOccupancy: newOcc,
            riskLevel: risk,
          };
        })
      );
    }, 2800);

    return () => clearInterval(interval);
  }, []);

  const triggerCrowdSurge = () => {
    setSimulatingSurge(true);
    setZones((prev) =>
      prev.map((zone) =>
        zone.id === 'gate-b'
          ? {
              ...zone,
              currentOccupancy: 14850,
              flowRate: 920,
              riskLevel: 'CRITICAL',
              recommendedAction:
                'URGENT: Autonomous mitigation activated. Dispatching 6 usher units & opening emergency overflow gate.',
            }
          : zone
      )
    );

    setActiveAlerts((prev) => [
      `CRITICAL ALERT [${new Date().toLocaleTimeString()}]: Turnstile Plaza B capacity at 99%! Mitigation orders sent.`,
      ...prev.slice(0, 3),
    ]);

    setTimeout(() => {
      setSimulatingSurge(false);
    }, 5000);
  };

  const selectedZone = zones.find((z) => z.id === selectedZoneId) || zones[0];
  const totalOccupancy = zones.reduce((sum, z) => sum + z.currentOccupancy, 0);
  const totalCapacity = zones.reduce((sum, z) => sum + z.capacity, 0);

  return (
    <div className="rounded-2xl bg-[#090d16] border border-cyan-500/30 p-5 sm:p-6 text-slate-200 backdrop-blur-xl relative overflow-hidden shadow-2xl">
      {/* Top Telemetry Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/30 text-cyan-400">
            <Radio className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-cyan-400 uppercase tracking-widest">
                REAL-TIME OPERATIONS COCKPIT
              </span>
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
            </div>
            <h4 className="text-lg font-bold text-white font-mono">
              STADIUMMIND_AI // NODE_01
            </h4>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={triggerCrowdSurge}
            disabled={simulatingSurge}
            className={`px-3 py-1.5 rounded-lg text-xs font-mono transition-all flex items-center gap-2 ${
              simulatingSurge
                ? 'bg-red-500/20 border border-red-500/50 text-red-300'
                : 'bg-slate-900 border border-slate-700 hover:border-red-500/50 hover:text-red-300 text-slate-300'
            }`}
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{simulatingSurge ? 'Surge In Progress...' : 'Simulate Surge Spike'}</span>
          </button>
        </div>
      </div>

      {/* Aggregate Stats Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 my-4">
        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">TOTAL INGRESS COUNT</span>
          <span className="text-xl font-bold font-mono text-white">
            {totalOccupancy.toLocaleString()}
          </span>
          <span className="text-[10px] font-mono text-slate-500 block">/ {totalCapacity.toLocaleString()} max</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">AGGREGATE DENSITY</span>
          <span className="text-xl font-bold font-mono text-cyan-400">
            {((totalOccupancy / totalCapacity) * 100).toFixed(1)}%
          </span>
          <span className="text-[10px] font-mono text-emerald-400 block">Optimal throughput</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">STREAM LATENCY</span>
          <span className="text-xl font-bold font-mono text-emerald-400">18 ms</span>
          <span className="text-[10px] font-mono text-slate-500 block">WebSocket Cloud Run</span>
        </div>

        <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800">
          <span className="text-[10px] font-mono text-slate-400 block mb-1">ACTIVE AI AGENTS</span>
          <span className="text-xl font-bold font-mono text-violet-400">4 Synchronized</span>
          <span className="text-[10px] font-mono text-violet-300 block">Predictive & Sentinel</span>
        </div>
      </div>

      {/* Zone Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-4">
        {zones.map((zone) => {
          const occPct = (zone.currentOccupancy / zone.capacity) * 100;
          const isSelected = selectedZoneId === zone.id;

          let badgeColor = 'bg-emerald-950/60 border-emerald-500/30 text-emerald-300';
          let barColor = 'bg-emerald-500';

          if (zone.riskLevel === 'ELEVATED') {
            badgeColor = 'bg-amber-950/60 border-amber-500/30 text-amber-300';
            barColor = 'bg-amber-500';
          } else if (zone.riskLevel === 'CRITICAL') {
            badgeColor = 'bg-red-950/60 border-red-500/40 text-red-300';
            barColor = 'bg-red-500';
          }

          return (
            <button
              key={zone.id}
              onClick={() => setSelectedZoneId(zone.id)}
              className={`p-3.5 rounded-xl border text-left transition-all ${
                isSelected
                  ? 'bg-slate-900 border-cyan-400 shadow-lg shadow-cyan-500/10'
                  : 'bg-slate-950/50 border-slate-800 hover:border-slate-700'
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold text-xs text-white">{zone.name}</span>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${badgeColor}`}>
                  {zone.riskLevel}
                </span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-1.5 rounded-full bg-slate-800 overflow-hidden mb-2">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${barColor}`}
                  style={{ width: `${Math.min(occPct, 100)}%` }}
                />
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-slate-400">
                <span>{zone.currentOccupancy.toLocaleString()} attendees</span>
                <span className="text-white font-medium">{occPct.toFixed(0)}% Cap</span>
                <span className="text-cyan-400">{zone.flowRate} p/min</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Live AI Decision Support Output */}
      {selectedZone.recommendedAction ? (
        <div className="p-3.5 rounded-xl bg-violet-950/40 border border-violet-500/40 font-mono text-xs flex items-start gap-2.5 mb-4">
          <Zap className="w-4 h-4 text-violet-400 shrink-0 mt-0.5 animate-pulse" />
          <div>
            <span className="text-violet-300 font-bold block mb-0.5">
              GEMINI AGENT DISPATCH RECOMMENDATION:
            </span>
            <span className="text-slate-300">{selectedZone.recommendedAction}</span>
          </div>
        </div>
      ) : (
        <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 font-mono text-xs text-slate-400 flex items-center gap-2 mb-4">
          <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          <span>Nominal operational baseline. Autonomous agents continuously monitoring flow gradients.</span>
        </div>
      )}

      {/* Terminal Log Output */}
      <div className="p-3 rounded-xl bg-black/80 border border-slate-800 font-mono text-[11px] space-y-1">
        <div className="flex items-center gap-1.5 text-slate-500 text-[10px] mb-1">
          <Terminal className="w-3.5 h-3.5 text-cyan-400" />
          <span>LIVE DISPATCH EVENT STREAM</span>
        </div>
        {activeAlerts.map((alert, i) => (
          <div key={i} className="text-slate-300 truncate">
            <span className="text-cyan-400">›</span> {alert}
          </div>
        ))}
      </div>
    </div>
  );
};
