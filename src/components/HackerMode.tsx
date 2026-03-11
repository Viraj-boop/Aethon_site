import React, { useState } from 'react';
import { Terminal, Folder, FileJson, FileCode2, X, Maximize2, Minus } from 'lucide-react';

export default function HackerMode({ onClose }: { onClose: () => void }) {
  const [activeFile, setActiveFile] = useState('Bio.json');

  const files = {
    'Bio.json': `{
  "name": "Aethon Agency",
  "type": "Digital Engineering Studio",
  "location": "Global",
  "mission": "To strip away the superfluous and reveal the essential core of every brand through precision engineering.",
  "founded": 2020,
  "team": [
    { "name": "Elena Rostova", "role": "Founder & Creative Director" },
    { "name": "Marcus Chen", "role": "Head of Engineering" },
    { "name": "Sarah Jenkins", "role": "Lead Designer" }
  ]
}`,
    'package.json': `{
  "name": "aethon-skills",
  "version": "1.0.0",
  "dependencies": {
    "react": "^18.2.0",
    "next": "^14.0.0",
    "three": "^0.160.0",
    "@react-three/fiber": "^8.15.0",
    "tailwindcss": "^3.4.0",
    "framer-motion": "^11.0.0",
    "typescript": "^5.3.0"
  },
  "devDependencies": {
    "creativity": "latest",
    "precision": "latest",
    "performance": "latest"
  }
}`,
    'Projects/FortuneStar.ts': `export const project = {
  name: "Fortune Star Bakery",
  stack: ["Next.js", "Shopify", "Tailwind"],
  impact: {
    conversionIncrease: "42%",
    lighthouseScore: 98,
    seoGrowth: "150%"
  },
  status: "Deployed"
};`,
    'Projects/TatwaInteriors.ts': `export const project = {
  name: "Tatwa Interiors",
  stack: ["React", "Three.js", "WebGL"],
  impact: {
    conversionIncrease: "28%",
    lighthouseScore: 95,
    seoGrowth: "85%"
  },
  status: "Deployed"
};`
  };

  return (
    <div className="fixed inset-0 z-[999999] bg-[#1e1e1e] text-[#d4d4d4] font-mono flex flex-col h-screen w-screen overflow-hidden">
      {/* Title Bar */}
      <div className="h-8 bg-[#323233] flex items-center justify-between px-4 select-none">
        <div className="flex items-center gap-2">
          <Terminal className="w-4 h-4 text-blue-400" />
          <span className="text-xs text-gray-400">Aethon IDE - Hacker Mode</span>
        </div>
        <div className="flex items-center gap-4">
          <Minus className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer" />
          <Maximize2 className="w-3 h-3 text-gray-400 hover:text-white cursor-pointer" />
          <X className="w-4 h-4 text-gray-400 hover:text-red-500 cursor-pointer" onClick={onClose} />
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar */}
        <div className="w-64 bg-[#252526] border-r border-[#3c3c3c] flex flex-col">
          <div className="px-4 py-2 text-[11px] uppercase tracking-wider text-gray-400 font-semibold">
            Explorer
          </div>
          <div className="flex-1 overflow-y-auto py-2">
            <div className="px-2">
              <div className="flex items-center gap-1 px-2 py-1 hover:bg-[#2a2d2e] cursor-pointer text-sm">
                <Folder className="w-4 h-4 text-blue-400" />
                <span>Aethon</span>
              </div>
              
              <div className="ml-4">
                <div 
                  className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-sm ${activeFile === 'Bio.json' ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                  onClick={() => setActiveFile('Bio.json')}
                >
                  <FileJson className="w-4 h-4 text-yellow-400" />
                  <span>Bio.json</span>
                </div>
                
                <div 
                  className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-sm ${activeFile === 'package.json' ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                  onClick={() => setActiveFile('package.json')}
                >
                  <FileJson className="w-4 h-4 text-yellow-400" />
                  <span>package.json</span>
                </div>

                <div className="flex items-center gap-1 px-2 py-1 mt-2 text-sm">
                  <Folder className="w-4 h-4 text-blue-400" />
                  <span>Projects</span>
                </div>
                
                <div className="ml-4">
                  <div 
                    className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-sm ${activeFile === 'Projects/FortuneStar.ts' ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                    onClick={() => setActiveFile('Projects/FortuneStar.ts')}
                  >
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <span>FortuneStar.ts</span>
                  </div>
                  <div 
                    className={`flex items-center gap-2 px-2 py-1 cursor-pointer text-sm ${activeFile === 'Projects/TatwaInteriors.ts' ? 'bg-[#37373d] text-white' : 'hover:bg-[#2a2d2e]'}`}
                    onClick={() => setActiveFile('Projects/TatwaInteriors.ts')}
                  >
                    <FileCode2 className="w-4 h-4 text-blue-400" />
                    <span>TatwaInteriors.ts</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col bg-[#1e1e1e]">
          {/* Tabs */}
          <div className="flex bg-[#2d2d2d] overflow-x-auto">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#1e1e1e] border-t-2 border-blue-500 text-sm min-w-fit">
              {activeFile.includes('.json') ? (
                <FileJson className="w-4 h-4 text-yellow-400" />
              ) : (
                <FileCode2 className="w-4 h-4 text-blue-400" />
              )}
              <span className="text-white">{activeFile.split('/').pop()}</span>
              <X className="w-3 h-3 ml-2 text-gray-400 hover:text-white cursor-pointer" />
            </div>
          </div>

          {/* Code Content */}
          <div className="flex-1 p-4 overflow-auto">
            <pre className="text-sm leading-relaxed">
              <code dangerouslySetInnerHTML={{ 
                __html: files[activeFile as keyof typeof files]
                  .replace(/"([^"]+)":/g, '<span class="text-[#9cdcfe]">"$1"</span>:')
                  .replace(/"([^"]+)"/g, '<span class="text-[#ce9178]">"$1"</span>')
                  .replace(/([0-9]+)/g, '<span class="text-[#b5cea8]">$1</span>')
                  .replace(/(export|const|let|var)/g, '<span class="text-[#569cd6]">$1</span>')
              }} />
            </pre>
          </div>
          
          {/* Status Bar */}
          <div className="h-6 bg-[#007acc] flex items-center px-4 text-white text-xs gap-4 select-none">
            <div className="flex items-center gap-1">
              <Terminal className="w-3 h-3" />
              <span>main*</span>
            </div>
            <div className="flex items-center gap-1">
              <span>0 errors, 0 warnings</span>
            </div>
            <div className="ml-auto flex items-center gap-4">
              <span>UTF-8</span>
              <span>TypeScript React</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
