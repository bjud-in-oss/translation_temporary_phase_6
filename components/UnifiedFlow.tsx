import React, { useState, useLayoutEffect, useRef } from 'react';
import { useAppStore, UnifiedEvent } from '../stores/useAppStore';

export const UnifiedFlow: React.FC = () => {
  const { events } = useAppStore();
  const [isExpanded, setIsExpanded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const clickTargetRef = useRef<HTMLDivElement | null>(null);

  // Scroll Anchoring
  useLayoutEffect(() => {
    if (isExpanded && clickTargetRef.current && containerRef.current) {
      // Scroll to the clicked element so it stays in view
      clickTargetRef.current.scrollIntoView({ behavior: 'auto', block: 'center' });
    }
  }, [isExpanded]);

  // Deduplicate for Collapsed View
  const getCollapsedEvents = () => {
    const latestEventsMap = new Map<string, UnifiedEvent>();
    events.forEach(event => {
      latestEventsMap.set(event.senderId, event);
    });
    // Sort by timestamp
    return Array.from(latestEventsMap.values()).sort((a, b) => a.timestamp - b.timestamp);
  };

  const displayEvents = isExpanded ? events.slice(-100) : getCollapsedEvents();

  const handleEventClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!isExpanded) {
      clickTargetRef.current = e.currentTarget;
      setIsExpanded(true);
    } else {
      setIsExpanded(false);
      clickTargetRef.current = null;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="absolute inset-0 z-30 overflow-y-auto overflow-x-hidden scrollbar-hide px-6 md:px-12 flex flex-col"
    >
      <div className="mt-auto pt-[30vh] pb-[50vh] flex flex-col gap-4 max-w-2xl mx-auto w-full transition-all">
        {displayEvents.map((event) => (
          <div 
            key={event.id} 
            onClick={handleEventClick}
            className={`p-4 rounded-xl cursor-pointer transition-all duration-300 ${isExpanded ? 'bg-slate-800/80 hover:bg-slate-700/80' : 'bg-indigo-900/40 hover:bg-indigo-800/40'} border border-slate-700/50 backdrop-blur-sm`}
          >
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs font-bold text-indigo-300 uppercase tracking-wider">
                {event.senderName || 'Okänd'}
              </span>
              <span className="text-[10px] text-slate-500">
                {new Date(event.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
            <div className="text-slate-200 text-sm md:text-base leading-relaxed">
              {event.type === 'transcript' && (
                <p>{event.text}</p>
              )}
              {event.type === 'hand_raised' && (
                <p className="italic text-yellow-400">✋ Räcker upp handen</p>
              )}
              {event.type === 'status' && (
                <p className="italic text-slate-400">{event.text}</p>
              )}
            </div>
          </div>
        ))}
        {events.length === 0 && (
          <div className="text-center text-slate-500 italic text-sm">
            Inga händelser ännu...
          </div>
        )}
      </div>
    </div>
  );
};

export default UnifiedFlow;
