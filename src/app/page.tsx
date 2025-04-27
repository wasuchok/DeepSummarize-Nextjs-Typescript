"use client";

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function Home() {
  const [text, setText] = useState('');
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSummarize = async () => {
    if (!text.trim()) return;
    setLoading(true);
    setSummary('');

    try {
      const res = await fetch('/summarize', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setSummary(data.summary);
    } catch (error) {
      setSummary('เกิดข้อผิดพลาด กรุณาลองใหม่');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 py-8 bg-black text-gray-200">
      <motion.h1
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-8 text-center tracking-tight"
      >
        สรุปข้อความเนื้อหาด้วย AI
      </motion.h1>

      <div className="w-full max-w-2xl bg-[#111111] rounded-xl p-4 flex flex-col gap-4 border border-gray-800">
        <textarea
          className="w-full min-h-[160px] p-4 rounded-lg bg-[#181818] border border-gray-700 focus:border-white focus:ring-0 outline-none resize-none text-gray-100 placeholder-gray-500 text-base"
          placeholder="พิมพ์ข้อความที่นี่..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <button
          className="w-full py-3 rounded-lg border border-gray-600 text-gray-100 hover:bg-white hover:text-black transition disabled:opacity-40"
          onClick={handleSummarize}
          disabled={loading}
        >
          {loading ? 'กำลังสรุป...' : 'สรุปข้อความ'}
        </button>

        {summary && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="mt-4 p-4 bg-[#181818] rounded-lg text-gray-300 border border-gray-700"
          >
            <h2 className="text-xl font-semibold mb-3">ผลลัพธ์:</h2>
            <p className="leading-relaxed">{summary}</p>
          </motion.div>
        )}
      </div>

      <div className="text-center mt-8 text-gray-600 text-xs">
        พัฒนาโดย <span className="font-semibold text-gray-400">นายวสุโชค ใจน้ำ</span> © 2025
      </div>
    </div>
  );
}
