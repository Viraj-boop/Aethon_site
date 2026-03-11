import React from 'react';

export default function Dashboard() {
  const stats = [
    { client: "Junction Cake Box", metric: "+40%", label: "Increase in Online Orders", trend: "up" },
    { client: "Green Bakers", metric: "2k+", label: "Monthly Active Users", trend: "up" },
    { client: "Tatwa Interiors", metric: "3x", label: "Lead Generation Rate", trend: "up" },
    { client: "South & Spices", metric: "< 1.2s", label: "Global Load Time", trend: "neutral" }
  ];

  return (
    <section className="py-24 px-4 md:px-12 bg-[#1c1b19] text-[#e6e2d3] relative z-10 border-t border-[#c4a277]/10">
      <div className="max-w-7xl mx-auto">
        <div className="mb-16 md:mb-24">
          <h2 className="text-xs md:text-sm font-mono text-[#c4a277] uppercase tracking-widest mb-4 flex items-center gap-2">
            <span className="w-8 h-[1px] bg-[#c4a277]" /> Business Growth
          </h2>
          <h3 className="text-3xl md:text-5xl lg:text-6xl font-display font-bold tracking-tight max-w-3xl">
            We don't just build websites.<br/><span className="text-[#c4a277] italic">We build revenue.</span>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => (
            <div key={i} className="p-6 md:p-8 rounded-xl border border-[#c4a277]/20 bg-[#242320] flex flex-col gap-4 hover:border-[#c4a277]/50 transition-colors group">
              <div className="text-xs font-mono text-gray-400 uppercase tracking-widest">{stat.client}</div>
              <div className="text-5xl md:text-6xl font-display text-[#c4a277] group-hover:scale-105 transition-transform origin-left">{stat.metric}</div>
              <div className="text-sm font-sans text-gray-300">{stat.label}</div>
              <div className="mt-auto pt-6 border-t border-[#c4a277]/10">
                <div className="h-10 w-full flex items-end gap-1 opacity-40 group-hover:opacity-80 transition-opacity">
                  {[...Array(8)].map((_, j) => (
                    <div key={j} className="flex-1 bg-[#c4a277] rounded-t-sm" style={{ height: `${20 + Math.random() * 80}%`, transition: 'height 0.5s ease' }} />
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
