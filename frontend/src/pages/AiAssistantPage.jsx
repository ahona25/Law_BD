import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Send,
  Scale,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  User,
  Bot,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function AiAssistantPage() {
  const { lang, t } = useLanguage();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: lang === 'bn'
        ? `আসসালামু আলাইকুম। আমি **Law_BD AI Legal Assistant**। 
আমি বাংলাদেশের সংবিধান, দণ্ডবিধি (Penal Code), ফৌজদারি কার্যবিধি (CrPC), পারিবারিক আদালত আইন, নতুন ভূমি অপরাধ আইন ২০২৩ এবং সাইবার নিরাপত্তা আইন ২০২৩ এর যাচাইকৃত ডেটাবেজের ভিত্তিতে আপনাকে আইনি তথ্য ও ধারার ব্যাখ্যা দিয়ে সাহায্য করতে পারি। 

আপনার প্রশ্ন বা ঘটনার বিবরণ লিখুন।`
        : `Assalamu Alaikum. I am the **Law_BD AI Legal Assistant**.
I provide legal information strictly grounded in verified statutes of the People’s Republic of Bangladesh (Penal Code, CrPC, CPC, Land Crime Act 2023, Cyber Security Act, Muslim Family Laws, and NI Act).

Describe your incident or ask about any statutory section to begin.`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  const handleSend = async (customPrompt) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim()) return;

    const userMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setLoading(true);

    try {
      const res = await api.aiChat({
        message: textToSend,
        language: lang
      });

      if (res.success) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: res.reply,
            groundedLaw: res.groundedLaw,
            recommendedLawyers: res.recommendedLawyers
          }
        ]);
      }
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          role: 'assistant',
          text: '⚠️ I encountered an error retrieving legal statutes. Please try asking again.'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };

  const samplePrompts = [
    { label: 'ভূমি অপরাধ আইন ২০২৩ এর শাস্তি', prompt: 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী জমি দখলের শাস্তি ও বিধান কী?' },
    { label: 'NI Act 138 Cheque Notice', prompt: 'What are the strict limitation deadlines for serving legal notice in a bounced cheque case under Section 138?' },
    { label: 'তালাক ও দেনমোহর আদায়', prompt: 'মুসলিম পারিবারিক আইনে স্বামী ডিভোর্স দিলে স্ত্রী কিভাবে দেনমোহর ও ভরণপোষণ আদায় করতে পারে?' },
    { label: 'Anticipatory Bail (CrPC 498)', prompt: 'How to obtain anticipatory bail from the High Court Division under Section 498 CrPC?' },
    { label: 'Cyber Blackmail / CSA 2023', prompt: 'What legal action can be taken against private photo blackmail under Cyber Security Act 2023?' }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAF9] py-10 flex flex-col justify-between">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        
        {/* Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-200 mb-6">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-bdGreen-800 text-white flex items-center justify-center shadow-md relative">
              <div className="absolute w-5 h-5 rounded-full bg-bdRed-500 opacity-90 -mr-1"></div>
              <Sparkles className="relative z-10 w-6 h-6 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="font-serif font-bold text-xl sm:text-2xl text-slate-900">
                  {lang === 'bn' ? 'এআই লিগ্যাল অ্যাসিস্ট্যান্ট' : 'Grounded AI Legal Assistant'}
                </h1>
                <span className="px-2 py-0.5 text-[10px] uppercase font-bold bg-emerald-100 text-bdGreen-900 rounded">
                  Grounded in BD Code
                </span>
              </div>
              <p className="text-xs text-slate-500 font-medium">
                Official Bangladesh Statutes & Procedural Retrieval
              </p>
            </div>
          </div>

          <button
            onClick={() => setMessages([messages[0]])}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 text-xs font-semibold text-slate-600 hover:bg-slate-100 transition-colors"
            title="Reset Chat"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </button>
        </div>

        {/* Quick Sample Prompts */}
        <div className="mb-4">
          <span className="text-xs font-semibold text-slate-400 block mb-2">
            {lang === 'bn' ? 'প্রস্তাবিত আইনি প্রশ্ন (ক্লিক করে জানুন):' : 'Suggested legal queries:'}
          </span>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                onClick={() => handleSend(p.prompt)}
                className="px-3 py-1 rounded-xl bg-white border border-slate-200 hover:border-emerald-500 text-xs text-slate-700 font-medium transition-colors shadow-2xs"
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat History Container */}
        <div className="flex-1 bg-white rounded-3xl border border-slate-200 shadow-sm p-4 sm:p-6 overflow-y-auto max-h-[560px] space-y-6">
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-bdGreen-800 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs">
                    <Scale className="w-4 h-4" />
                  </div>
                )}

                <div
                  className={`max-w-2xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-bdGreen-800 text-white shadow-xs font-medium'
                      : 'bg-slate-50 border border-slate-200/80 text-slate-800'
                  }`}
                >
                  <div className="whitespace-pre-line">
                    {msg.text}
                  </div>

                  {/* Grounded Law Badge & Link */}
                  {msg.groundedLaw && (
                    <div className="mt-4 pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs text-slate-500">
                      <span>Source: <strong>{msg.groundedLaw.title}</strong></span>
                      <Link
                        to={`/laws/${msg.groundedLaw.id}`}
                        className="text-bdGreen-800 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>View Act</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {/* Recommended Lawyers */}
                  {msg.recommendedLawyers && msg.recommendedLawyers.length > 0 && (
                    <div className="mt-3 pt-3 border-t border-slate-200/80 space-y-2">
                      <span className="text-[10px] uppercase font-bold text-slate-400 block">Recommended Advocates:</span>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                        {msg.recommendedLawyers.map((l) => (
                          <div key={l.id} className="p-2.5 bg-white rounded-xl border border-slate-200 flex items-center justify-between gap-2">
                            <div>
                              <p className="font-bold text-xs text-slate-900">{l.name}</p>
                              <p className="text-[10px] text-slate-500">{l.feeDisplay}</p>
                            </div>
                            <Link
                              to={`/booking/${l.id}`}
                              className="px-2.5 py-1 bg-bdGreen-800 text-white rounded text-[10px] font-bold"
                            >
                              Consult
                            </Link>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div className="w-9 h-9 rounded-xl bg-slate-200 text-slate-700 flex items-center justify-center shrink-0 mt-1">
                    <User className="w-4 h-4" />
                  </div>
                )}
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-4 items-center text-slate-400 text-xs p-4">
              <div className="w-8 h-8 rounded-xl bg-bdGreen-800 text-white flex items-center justify-center">
                <Scale className="w-4 h-4 animate-spin" />
              </div>
              <span className="animate-pulse">Retrieving and analyzing relevant Bangladeshi statutory provisions...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="flex items-center gap-2 bg-white rounded-2xl border-2 border-slate-200 focus-within:border-bdGreen-800 p-2 shadow-sm"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={lang === 'bn' ? 'আপনার আইনি সমস্যা বা প্রশ্ন লিখুন (বাংলা বা ইংরেজি)...' : 'Ask any legal question in English or Bengali...'}
              className="flex-1 px-4 py-3 text-sm focus:outline-none bg-transparent"
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-bdGreen-800 hover:bg-bdGreen-700 disabled:opacity-40 text-white rounded-xl transition-all shadow-xs"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Legal Disclaimer Pill */}
          <p className="text-[11px] text-slate-400 text-center mt-2.5">
            ⚠️ Grounded strictly in official Bangladesh statutory data. Does not substitute formal advocate legal advice.
          </p>
        </div>

      </div>
    </div>
  );
}
