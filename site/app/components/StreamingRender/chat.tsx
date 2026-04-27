'use client';

import { Pause, Play, Send } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Select } from '../Select';
import { CHART_DATA } from './chartData';
import StreamingRender from './index';

type Message = {
  id: string;
  role: 'user' | 'llm';
  content: string;
  code?: string;
};

export default function ChatDemo() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'llm-welcome',
      role: 'llm',
      content:
        "Hello! I'm ready to visualize your data. Try asking me to generate a chart, and you'll see it stream in real-time.",
    },
  ]);
  const [selectedId, setSelectedId] = useState(CHART_DATA[0].id);
  const [status, setStatus] = useState<'idle' | 'streaming' | 'paused'>('idle');
  const messagesContainerRef = useRef<HTMLDivElement>(null);
  const isUserScrolledUp = useRef(false);

  const handleScroll = () => {
    const el = messagesContainerRef.current;
    if (!el) return;
    isUserScrolledUp.current = el.scrollHeight - el.scrollTop - el.clientHeight > 30;
  };

  useEffect(() => {
    const el = messagesContainerRef.current;
    if (!el) return;
    const observer = new MutationObserver(() => {
      if (status === 'streaming' && !isUserScrolledUp.current) {
        el.scrollTop = el.scrollHeight;
      }
    });
    observer.observe(el, { subtree: true, childList: true, characterData: true });
    return () => observer.disconnect();
  }, [status]);

  const lastLlmId = [...messages].reverse().find((m) => m.role === 'llm')?.id;

  const handleSend = () => {
    const chart = CHART_DATA.find((d) => d.id === selectedId);
    if (!chart) return;
    isUserScrolledUp.current = false;

    const userMsg: Message = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: `Draw a ${chart.title}`,
    };
    const llmMsg: Message = {
      id: `llm-${Date.now()}`,
      role: 'llm',
      content: '',
      code: chart.code,
    };

    setMessages((prev) => [...prev, userMsg, llmMsg]);
    setStatus('streaming');
  };

  const handlePause = () => setStatus('paused');
  const handleResume = () => setStatus('streaming');
  const handleComplete = () => setStatus('idle');

  return (
    <div className="flex flex-col h-[520px] md:h-[700px] rounded-2xl border border-gray-200 bg-gray-50 overflow-hidden">
      {/* Messages */}
      <div
        ref={messagesContainerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto px-6 py-6 flex flex-col gap-6"
      >
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-start gap-3 ${msg.role === 'user' ? 'flex-row' : 'flex-row-reverse'}`}
          >
            {/* Avatar */}
            <div
              className={`w-9 h-9 rounded-full shrink-0 flex items-center justify-center text-sm font-bold text-white shadow-sm ${
                msg.role === 'user' ? 'bg-gray-400' : 'bg-primary'
              }`}
            >
              {msg.role === 'user' ? 'U' : 'G'}
            </div>

            {/* Content */}
            {msg.role === 'user' ? (
              <div className="max-w-xs px-4 py-2.5 rounded-2xl rounded-tl-sm bg-white border border-gray-200 text-sm text-gray-800 shadow-sm">
                {msg.content}
              </div>
            ) : msg.code ? (
              <div className="flex-1 min-w-0">
                <StreamingRender
                  code={msg.code}
                  streaming={msg.id === lastLlmId && status === 'streaming'}
                  onComplete={msg.id === lastLlmId ? handleComplete : undefined}
                />
              </div>
            ) : (
              <div className="max-w-xs px-4 py-2.5 rounded-2xl rounded-tr-sm bg-primary/10 border border-primary/20 text-sm text-gray-800 shadow-sm">
                {msg.content}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Input */}
      <div className="border-t border-gray-200 bg-white px-5 py-4 flex items-center gap-3">
        <span className="text-sm text-gray-500 shrink-0">Draw a</span>
        <Select
          value={selectedId}
          disabled={status !== 'idle'}
          onChange={setSelectedId}
          options={CHART_DATA.map((item) => ({ value: item.id, label: item.title }))}
          className="flex-1"
        />

        {status === 'streaming' && (
          <button
            onClick={handlePause}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-amber-500 hover:bg-amber-600 text-white text-sm font-medium transition-colors"
          >
            <Pause className="w-4 h-4" />
            Pause
          </button>
        )}
        {status === 'paused' && (
          <button
            onClick={handleResume}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-green-500 hover:bg-green-600 text-white text-sm font-medium transition-colors"
          >
            <Play className="w-4 h-4" />
            Resume
          </button>
        )}
        {status === 'idle' && (
          <button
            onClick={handleSend}
            className="shrink-0 inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-primary hover:bg-primary/90 text-white text-sm font-medium transition-colors"
          >
            <Send className="w-4 h-4" />
            Send
          </button>
        )}
      </div>
    </div>
  );
}
