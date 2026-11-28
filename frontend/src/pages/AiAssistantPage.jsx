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
  ChevronRight,
  Star,
  MapPin,
  Calendar,
  Briefcase,
  HelpCircle,
  CheckCircle2,
  RefreshCw,
  Cpu
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useTheme } from '../context/ThemeContext';
import { api } from '../services/api';

/**
 * Custom Legal Text Formatter
 * Nicely structures markdown headers (###), bold spans (**), lists (•, -), and alert quotes (> )
 */
function FormattedLegalContent({ text, isDark }) {
  if (!text) return null;

  const lines = text.split('\n');
  const elements = [];
  let currentList = [];
  let listKey = 0;

  const flushList = () => {
    if (currentList.length > 0) {
      elements.push(
        <ul key={`list-${listKey++}`} className="space-y-1.5 my-2.5 pl-1">
          {currentList.map((item, idx) => (
            <li
              key={idx}
              className={`flex items-start gap-2 text-xs sm:text-sm leading-relaxed ${
                isDark ? 'text-slate-200' : 'text-slate-700'
              }`}
            >
              <span
                className={`font-bold shrink-0 mt-0.5 ${
                  isDark ? 'text-emerald-400' : 'text-bdGreen-700'
                }`}
              >
                •
              </span>
              <div>{renderInline(item)}</div>
            </li>
          ))}
        </ul>
      );
      currentList = [];
    }
  };

  const renderInline = (str) => {
    // Parse bold **text**
    const parts = str.split(/(\*\*[^*]+\*\*)/g);
    return parts.map((part, i) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        return (
          <strong
            key={i}
            className={`font-bold ${isDark ? 'text-emerald-300' : 'text-bdGreen-900'}`}
          >
            {part.slice(2, -2)}
          </strong>
        );
      }
      return part;
    });
  };

  lines.forEach((line, lineIdx) => {
    const trimmed = line.trim();

    if (!trimmed) {
      flushList();
      return;
    }

    // Header 3 (###)
    if (trimmed.startsWith('### ')) {
      flushList();
      const headerText = trimmed.replace(/^###\s+/, '');
      elements.push(
        <div
          key={`h3-${lineIdx}`}
          className={`pt-3 pb-1 border-b mb-2 mt-2 ${
            isDark ? 'border-emerald-800/60' : 'border-emerald-200'
          }`}
        >
          <h4
            className={`font-serif font-bold text-sm sm:text-base flex items-center gap-1.5 ${
              isDark ? 'text-emerald-400' : 'text-bdGreen-800'
            }`}
          >
            {renderInline(headerText)}
          </h4>
        </div>
      );
      return;
    }

    // Horizontal Rule (---)
    if (trimmed === '---') {
      flushList();
      elements.push(
        <hr
          key={`hr-${lineIdx}`}
          className={`my-3 ${isDark ? 'border-emerald-800/40' : 'border-slate-200'}`}
        />
      );
      return;
    }

    // Blockquote (> )
    if (trimmed.startsWith('> ')) {
      flushList();
      const quoteText = trimmed.replace(/^>\s+/, '');
      elements.push(
        <div
          key={`quote-${lineIdx}`}
          className={`my-3 p-3 rounded-xl border text-xs sm:text-[13px] leading-relaxed flex items-start gap-2 shadow-2xs ${
            isDark
              ? 'bg-amber-950/40 border-amber-600/40 text-amber-200'
              : 'bg-amber-50 border-amber-200 text-amber-900'
          }`}
        >
          <AlertTriangle
            className={`w-4 h-4 shrink-0 mt-0.5 ${
              isDark ? 'text-amber-400' : 'text-amber-600'
            }`}
          />
          <div className="flex-1">{renderInline(quoteText)}</div>
        </div>
      );
      return;
    }

    // List item (•, -, or 1.)
    if (/^[•\-\*]\s+/.test(trimmed) || /^\d+\.\s+/.test(trimmed)) {
      const content = trimmed.replace(/^[•\-\*]\s+/, '').replace(/^\d+\.\s+/, '');
      currentList.push(content);
      return;
    }

    // Regular paragraph
    flushList();
    elements.push(
      <p
        key={`p-${lineIdx}`}
        className={`text-xs sm:text-sm leading-relaxed my-1.5 ${
          isDark ? 'text-slate-200' : 'text-slate-700'
        }`}
      >
        {renderInline(trimmed)}
      </p>
    );
  });

  flushList();
  return <div className="space-y-1">{elements}</div>;
}

export default function AiAssistantPage() {
  const { lang, t } = useLanguage();
  const { isDark } = useTheme();
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      text: lang === 'bn'
        ? `### ⚖️ আসসালামু আলাইকুম! আমি Law_BD AI লিগ্যাল অ্যাসিস্ট্যান্ট
আমি বাংলাদেশের সুপ্রিম কোর্ট ও জেলা আদালতের প্র্যাকটিস এবং সরকারি **বাংলাদেশ কোড (Bangladesh Code)**-এর যাচাইকৃত আইনের ভিত্তিতে আপনাকে আইনি পরামর্শ ও দিকনির্দেশনা দিতে প্রস্তুত।

**আমি যেভাবে সাহায্য করতে পারি:**
• আপনার বাস্তব জীবনের যেকোনো আইনি ঘটনা বা সমস্যা বাংলা বা ইংরেজিতে লিখুন।
• আমি তাৎক্ষণিকভাবে প্রযোজ্য আইন, ধারা, শাস্তি, মামলা দায়েরের নিয়ম ও করণীয় বিশ্লেষণ করব।
• আপনার সমস্যার ধরণ অনুযায়ী আমাদের ডেটাবেজ থেকে শীর্ষ বিশেষজ্ঞ আইনজীবীদের সুপারিশ করব।

আপনার সমস্যা বা ঘটনার বিবরণ নিচে লিখুন:`
        : `### ⚖️ Assalamu Alaikum! I am Law_BD AI Legal Assistant
I provide structured statutory analysis strictly grounded in verified statutes of the People’s Republic of Bangladesh (Penal Code, CrPC, CPC, Land Crime Act 2023, Cyber Security Act, Muslim Family Laws, and NI Act).

**How I can assist you:**
• Describe any real-life dispute or incident in everyday English or Bengali.
• I will identify applicable Bangladesh Acts, sections, penalties, legal procedures, and immediate remedies.
• I will recommend specialized verified advocates from the Law_BD database suited for your case.

Describe your legal matter below to begin:`
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [lastFailedMessage, setLastFailedMessage] = useState(null);
  const [aiStatus, setAiStatus] = useState(null);
  const chatContainerRef = useRef(null);

  const scrollToBottomIfNear = () => {
    const container = chatContainerRef.current;
    if (!container) return;
    const distanceFromBottom = container.scrollHeight - container.scrollTop - container.clientHeight;
    // Only auto-scroll if user is already within 150px of the bottom
    if (distanceFromBottom < 150) {
      container.scrollTop = container.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottomIfNear();
  }, [messages, loading]);

  // Check backend AI readiness on mount
  useEffect(() => {
    api.getAiStatus()
      .then(res => {
        if (res.success) setAiStatus(res);
      })
      .catch(() => {
        // Fallback status
        setAiStatus({ activeProvider: 'Grounded BD Statutory Engine' });
      });
  }, []);

  const handleSend = async (customPrompt) => {
    const textToSend = customPrompt || input;
    if (!textToSend.trim() || loading) return;

    setErrorMessage(null);
    setLastFailedMessage(null);

    const userMessage = { role: 'user', text: textToSend };
    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setInput('');
    setLoading(true);

    try {
      // Pass full conversation history for continuous multi-turn legal context
      const conversationHistory = updatedMessages.map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await api.aiChat({
        message: textToSend,
        conversationHistory,
        language: lang
      });

      if (res.success) {
        setMessages(prev => [
          ...prev,
          {
            role: 'assistant',
            text: res.reply,
            groundedLaw: res.groundedLaw,
            recommendedLawyers: res.recommendedLawyers,
            suggestedQueries: res.suggestedQueries,
            provider: res.provider
          }
        ]);
      } else {
        throw new Error(res.error || 'Failed to process inquiry');
      }
    } catch (err) {
      console.error('AI Chat Error:', err);
      setErrorMessage(
        lang === 'bn'
          ? 'আইনি ডেটাবেজ থেকে তথ্য প্রক্রিয়াকরণে কিছুটা সমস্যা হয়েছে। পুনরায় চেষ্টা করুন।'
          : 'Encountered an issue processing your query with the legal database. Please try again.'
      );
      setLastFailedMessage(textToSend);
    } finally {
      setLoading(false);
    }
  };

  const handleResetChat = () => {
    setMessages([messages[0]]);
    setErrorMessage(null);
    setLastFailedMessage(null);
    setInput('');
  };

  const samplePrompts = [
    {
      label: lang === 'bn' ? 'ভূমি অপরাধ আইন ২০২৩ (জমি দখল)' : 'Land Crime Act 2023 (Disputes)',
      prompt: lang === 'bn'
        ? 'ভূমি অপরাধ প্রতিরোধ ও প্রতিকার আইন ২০২৩ অনুযায়ী জাল দলিল তৈরি ও জোরপূর্বক জমি দখলের শাস্তি ও থানায় মামলা দায়েরের নিয়ম কী?'
        : 'What are the penalties and legal procedure for filing a case against forged deed land encroachment under Land Crime Act 2023?'
    },
    {
      label: lang === 'bn' ? 'চেক ডিজঅনার নোটিশ (NI Act ১৩৮)' : 'Bounced Cheque (NI Act 138)',
      prompt: lang === 'bn'
        ? 'ব্যবসায়িক পাওনা বাবদ পাওয়া চেক ব্যাংকে বাউন্স করলে ১৩৮ ধারায় ৩০ দিনের লিগ্যাল নোটিশ ও সিআর মামলা করার সঠিক সময়সীমা কত?'
        : 'What are the strict statutory deadlines and notice requirements for a bounced cheque under Section 138 of Negotiable Instruments Act 1881?'
    },
    {
      label: lang === 'bn' ? 'দেনমোহর ও ভরণপোষণ আদায়' : 'Divorce & Dower Recovery',
      prompt: lang === 'bn'
        ? 'মুসলিম পারিবারিক আইনে স্বামী ডিভোর্স দিলে স্ত্রী কীভাবে বকেয়া দেনমোহর ও ইদ্দতকালীন ভরণপোষণ পারিবারিক আদালতে আদায় করতে পারে?'
        : 'How can an estranged wife claim prompt dower (denmohur) and maintenance in Family Court under Muslim Family Laws 1961?'
    },
    {
      label: lang === 'bn' ? 'আগাম জামিন (CrPC ৪৯৮)' : 'Anticipatory Bail (CrPC 498)',
      prompt: lang === 'bn'
        ? 'ফৌজদারি মামলায় মিথ্যা অভিযোগের প্রেক্ষিতে হাইকোর্ট ডিভিশন থেকে আগাম জামিন (Anticipatory Bail) পাওয়ার নিয়ম কী?'
        : 'What is the exact procedure and ground for obtaining Anticipatory Bail from the High Court Division under Section 498 CrPC?'
    },
    {
      label: lang === 'bn' ? 'সাইবার ব্ল্যাকমেইলিং ও মামলা' : 'Cyber Harassment & Blackmail',
      prompt: lang === 'bn'
        ? 'ফেসবুক বা হোয়াটসঅ্যাপে ব্যক্তিগত ছবি ও ভিডিও দিয়ে ব্ল্যাকমেইল করলে সাইবার নিরাপত্তা আইন ২০২৩ এর অধীনে কীভাবে দ্রুত প্রতিকার পাব?'
        : 'What immediate legal action can be taken against digital blackmail and photo manipulation under Cyber Security Act 2023?'
    }
  ];

  return (
    <div
      className={`min-h-screen py-8 sm:py-10 flex flex-col justify-between transition-colors duration-300 ${
        isDark
          ? 'bg-gradient-to-b from-bdDark-950 via-bdDark-900 to-bdGreen-950 text-slate-100'
          : 'bg-[#F8FAF9] text-slate-800'
      }`}
    >
      <div className="max-w-4xl mx-auto px-3 sm:px-6 lg:px-8 w-full flex-1 flex flex-col">
        
        {/* Header Bar */}
        <div
          className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b mb-5 ${
            isDark ? 'border-emerald-900/60' : 'border-slate-200'
          }`}
        >
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-bdGreen-800 to-bdGreen-950 text-white flex items-center justify-center shadow-lg relative shrink-0 border border-emerald-600/40">
              <div className="absolute w-4 h-4 rounded-full bg-bdRed-500 opacity-90 -mr-0.5"></div>
              <Scale className="relative z-10 w-6 h-6 text-white drop-shadow-xs" />
            </div>
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h1
                  className={`font-serif font-bold text-xl sm:text-2xl tracking-tight ${
                    isDark ? 'text-white' : 'text-slate-900'
                  }`}
                >
                  {lang === 'bn' ? 'Law_BD এআই লিগ্যাল অ্যাসিস্ট্যান্ট' : 'Law_BD AI Legal Assistant'}
                </h1>
                <span
                  className={`px-2 py-0.5 text-[10px] uppercase font-bold rounded-md border ${
                    isDark
                      ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                      : 'bg-emerald-50 text-bdGreen-900 border-emerald-200'
                  }`}
                >
                  Grounded in BD Code
                </span>
              </div>
              <div
                className={`flex items-center gap-2 text-xs font-medium mt-0.5 ${
                  isDark ? 'text-slate-400' : 'text-slate-500'
                }`}
              >
                <span className="flex items-center gap-1">
                  <ShieldCheck
                    className={`w-3.5 h-3.5 ${isDark ? 'text-emerald-400' : 'text-bdGreen-700'}`}
                  />
                  Official Bangladesh Statutes & Procedural Intelligence
                </span>
                {aiStatus?.activeProvider && (
                  <span
                    className={`hidden md:inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full border font-semibold ${
                      isDark
                        ? 'bg-bdDark-950/80 text-emerald-300 border-emerald-800/40'
                        : 'bg-white text-bdGreen-800 border-emerald-200'
                    }`}
                  >
                    <Cpu className={`w-3 h-3 ${isDark ? 'text-emerald-400' : 'text-bdGreen-700'}`} />
                    {aiStatus.activeProvider}
                  </span>
                )}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
            <button
              type="button"
              onClick={handleResetChat}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-bold transition-all shadow-sm cursor-pointer ${
                isDark
                  ? 'bg-bdDark-900 hover:bg-bdDark-800 border-emerald-800/60 hover:border-emerald-700 text-slate-300 hover:text-white'
                  : 'bg-white hover:bg-slate-50 border-slate-200 hover:border-slate-300 text-slate-700 hover:text-slate-900'
              }`}
              title="Reset Chat and Start New Incident"
            >
              <RotateCcw className={`w-3.5 h-3.5 ${isDark ? 'text-slate-400' : 'text-slate-500'}`} />
              <span>{lang === 'bn' ? 'নতুন করে শুরু' : 'Reset Chat'}</span>
            </button>
          </div>
        </div>

        {/* Quick Sample Prompts Section */}
        <div className="mb-4">
          <div className="flex items-center justify-between mb-2">
            <span
              className={`text-xs font-bold flex items-center gap-1.5 ${
                isDark ? 'text-slate-400' : 'text-slate-600'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-500" />
              {lang === 'bn' ? 'প্রস্তাবিত আইনি প্রশ্নসমূহ (ক্লিক করে জানুন):' : 'Suggested legal scenarios:'}
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {samplePrompts.map((p, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => handleSend(p.prompt)}
                disabled={loading}
                className={`px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-sm text-left cursor-pointer ${
                  isDark
                    ? 'bg-bdDark-900/90 hover:bg-bdDark-800 border-emerald-800/60 hover:border-emerald-500 text-slate-300 hover:text-emerald-300'
                    : 'bg-white hover:bg-emerald-50 border-slate-200 hover:border-bdGreen-700 text-slate-700 hover:text-bdGreen-900'
                }`}
              >
                {p.label}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Conversation Container */}
        <div
          ref={chatContainerRef}
          className={`flex-1 backdrop-blur-md rounded-3xl border p-4 sm:p-6 overflow-y-auto max-h-[620px] space-y-6 transition-colors ${
            isDark
              ? 'bg-bdDark-950/90 border-emerald-800/50 shadow-2xl'
              : 'bg-white border-slate-200 shadow-lg'
          }`}
        >
          {messages.map((msg, index) => {
            const isUser = msg.role === 'user';
            return (
              <div
                key={index}
                className={`flex gap-3 sm:gap-4 ${isUser ? 'justify-end' : 'justify-start'}`}
              >
                {!isUser && (
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-bdGreen-800 to-bdGreen-950 text-white flex items-center justify-center shrink-0 mt-1 shadow-xs border border-emerald-700/40">
                    <Scale className="w-4 h-4 text-emerald-300" />
                  </div>
                )}

                <div
                  className={`max-w-3xl rounded-2xl p-4 sm:p-5 text-xs sm:text-sm leading-relaxed ${
                    isUser
                      ? 'bg-gradient-to-br from-bdGreen-800 to-bdGreen-900 text-white shadow-md border border-emerald-600/40 font-medium'
                      : isDark
                      ? 'bg-bdDark-900/95 border border-emerald-700/40 text-slate-200 shadow-md'
                      : 'bg-slate-50 border border-slate-200 text-slate-800 shadow-xs'
                  }`}
                >
                  {/* Formatted Message Content */}
                  {isUser ? (
                    <div className="whitespace-pre-line text-white font-medium">
                      {msg.text}
                    </div>
                  ) : (
                    <FormattedLegalContent text={msg.text} isDark={isDark} />
                  )}

                  {/* Grounded Bangladesh Statute Badge & Link */}
                  {msg.groundedLaw && (
                    <div
                      className={`mt-4 pt-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs p-3 rounded-xl border ${
                        isDark
                          ? 'bg-bdDark-950/90 border-emerald-600/50'
                          : 'bg-white border-emerald-200'
                      }`}
                    >
                      <div className="flex items-center gap-2">
                        <ShieldCheck
                          className={`w-4 h-4 shrink-0 ${
                            isDark ? 'text-emerald-400' : 'text-bdGreen-700'
                          }`}
                        />
                        <div>
                          <span
                            className={`text-[10px] uppercase font-bold block ${
                              isDark ? 'text-emerald-400' : 'text-bdGreen-700'
                            }`}
                          >
                            {lang === 'bn' ? 'সংশ্লিষ্ট বাংলাদেশ আইন ও ধারা:' : 'Verified Statutory Source:'}
                          </span>
                          <span
                            className={`font-bold text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}
                          >
                            {lang === 'bn' && msg.groundedLaw.banglaTitle ? msg.groundedLaw.banglaTitle : msg.groundedLaw.title}
                          </span>
                          {msg.groundedLaw.actNoYear && (
                            <span
                              className={`text-[11px] ml-1 ${
                                isDark ? 'text-slate-400' : 'text-slate-500'
                              }`}
                            >
                              ({msg.groundedLaw.actNoYear})
                            </span>
                          )}
                        </div>
                      </div>
                      <Link
                        to={`/laws/${msg.groundedLaw.id}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-bdGreen-800 hover:bg-bdGreen-700 text-white font-bold text-xs shadow-xs transition-colors shrink-0 self-start sm:self-auto border border-emerald-600/40"
                      >
                        <span>{lang === 'bn' ? 'পুরো আইনটি পড়ুন' : 'View Statute Details'}</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  )}

                  {/* Recommended Advocates Section */}
                  {msg.recommendedLawyers && msg.recommendedLawyers.length > 0 && (
                    <div
                      className={`mt-4 pt-4 border-t space-y-3 ${
                        isDark ? 'border-emerald-800/40' : 'border-slate-200'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span
                          className={`text-xs font-bold flex items-center gap-1.5 uppercase tracking-wide ${
                            isDark ? 'text-emerald-400' : 'text-bdGreen-800'
                          }`}
                        >
                          <Briefcase
                            className={`w-3.5 h-3.5 ${
                              isDark ? 'text-emerald-400' : 'text-bdGreen-700'
                            }`}
                          />
                          {lang === 'bn' ? 'এই বিষয়ের বিশেষায়িত আইনজীবীগণ (Law_BD Verified):' : 'Recommended Specialized Advocates:'}
                        </span>
                        <Link
                          to="/lawyers"
                          className={`text-[11px] font-bold hover:underline flex items-center gap-0.5 ${
                            isDark ? 'text-emerald-400' : 'text-bdGreen-800'
                          }`}
                        >
                          <span>{lang === 'bn' ? 'সকল দেখুন' : 'View All'}</span>
                          <ChevronRight className="w-3 h-3" />
                        </Link>
                      </div>

                      <div className="grid grid-cols-1 gap-2.5">
                        {msg.recommendedLawyers.map((lawyer) => (
                          <div
                            key={lawyer.id}
                            className={`p-3.5 rounded-2xl border hover:shadow-lg transition-all flex flex-col sm:flex-row sm:items-center justify-between gap-3 ${
                              isDark
                                ? 'bg-bdDark-950/90 border-emerald-800/50 hover:border-emerald-500/70'
                                : 'bg-white border-slate-200 hover:border-emerald-300'
                            }`}
                          >
                            <div className="flex items-start gap-3">
                              {/* Avatar Initials */}
                              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-bdGreen-800 to-bdGreen-950 text-white font-bold text-sm flex items-center justify-center shrink-0 shadow-sm border border-emerald-600/40">
                                {lawyer.initials || lawyer.name?.slice(0, 2) || 'AD'}
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-1.5 flex-wrap">
                                  <h5
                                    className={`font-bold text-xs sm:text-sm ${
                                      isDark ? 'text-white' : 'text-slate-900'
                                    }`}
                                  >
                                    {lawyer.name}
                                  </h5>
                                  {lawyer.verified && (
                                    <span
                                      className={`inline-flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[10px] font-bold border ${
                                        isDark
                                          ? 'bg-emerald-950/80 text-emerald-300 border-emerald-700/60'
                                          : 'bg-emerald-50 text-bdGreen-800 border-emerald-200'
                                      }`}
                                    >
                                      <ShieldCheck className="w-3 h-3" />
                                      Enrolled
                                    </span>
                                  )}
                                </div>
                                <p
                                  className={`text-[11px] font-medium ${
                                    isDark ? 'text-slate-400' : 'text-slate-500'
                                  }`}
                                >
                                  {lawyer.courtLevel} • {lawyer.district || lawyer.location}
                                </p>
                                <div
                                  className={`flex items-center gap-2 text-[11px] flex-wrap ${
                                    isDark ? 'text-slate-400' : 'text-slate-500'
                                  }`}
                                >
                                  <span className="font-bold text-amber-500 flex items-center gap-0.5">
                                    <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                                    {lawyer.rating || '4.9'} ({lawyer.reviewsCount || '30+'})
                                  </span>
                                  <span>•</span>
                                  <span
                                    className={`font-semibold ${
                                      isDark ? 'text-slate-300' : 'text-slate-700'
                                    }`}
                                  >
                                    {lawyer.experienceYears}+ Yrs Exp
                                  </span>
                                  <span>•</span>
                                  <span
                                    className={`font-bold ${
                                      isDark ? 'text-emerald-300' : 'text-bdGreen-800'
                                    }`}
                                  >
                                    {lawyer.feeDisplay || '৳1,500'}
                                  </span>
                                </div>
                                {lawyer.specialties && lawyer.specialties.length > 0 && (
                                  <div className="flex gap-1 flex-wrap pt-0.5">
                                    {lawyer.specialties.slice(0, 3).map((spec, sIdx) => (
                                      <span
                                        key={sIdx}
                                        className={`px-1.5 py-0.5 rounded border text-[10px] font-semibold ${
                                          isDark
                                            ? 'bg-bdDark-800 text-slate-300 border-emerald-900/60'
                                            : 'bg-slate-100 text-slate-700 border-slate-200'
                                        }`}
                                      >
                                        {spec}
                                      </span>
                                    ))}
                                  </div>
                                )}
                              </div>
                            </div>

                            {/* Dual Action Buttons: View Profile & Book Appointment */}
                            <div
                              className={`flex items-center gap-2 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 justify-end ${
                                isDark ? 'border-emerald-900/40' : 'border-slate-100'
                              }`}
                            >
                              <Link
                                to={`/lawyers/${lawyer.id}`}
                                className={`px-3 py-1.5 border rounded-xl text-xs font-bold transition-all shadow-xs whitespace-nowrap ${
                                  isDark
                                    ? 'bg-bdDark-900 hover:bg-bdDark-800 border-emerald-700/50 text-slate-200 hover:text-white'
                                    : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700 hover:text-slate-900'
                                }`}
                              >
                                {lang === 'bn' ? 'প্রোফাইল দেখুন' : 'View Profile'}
                              </Link>
                              <Link
                                to={`/booking/${lawyer.id}`}
                                className="px-3.5 py-1.5 bg-bdGreen-700 hover:bg-bdGreen-600 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1 whitespace-nowrap border border-emerald-500/40"
                              >
                                <Calendar className="w-3.5 h-3.5" />
                                <span>{lang === 'bn' ? 'অ্যাপয়েন্টমেন্ট নিন' : 'Book Appointment'}</span>
                              </Link>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Dynamic Suggested Follow-up Questions Chips */}
                  {msg.suggestedQueries && msg.suggestedQueries.length > 0 && (
                    <div
                      className={`mt-4 pt-3.5 border-t ${
                        isDark ? 'border-emerald-800/40' : 'border-slate-200'
                      }`}
                    >
                      <span
                        className={`text-[11px] font-bold block mb-2 flex items-center gap-1 ${
                          isDark ? 'text-slate-400' : 'text-slate-500'
                        }`}
                      >
                        <HelpCircle
                          className={`w-3.5 h-3.5 ${
                            isDark ? 'text-emerald-400' : 'text-bdGreen-700'
                          }`}
                        />
                        {lang === 'bn' ? 'প্রস্তাবিত পরবর্তী পদক্ষেপ বা প্রশ্ন:' : 'Suggested follow-up inquiries:'}
                      </span>
                      <div className="flex flex-col gap-1.5">
                        {msg.suggestedQueries.map((q, qIdx) => (
                          <button
                            key={qIdx}
                            type="button"
                            onClick={() => handleSend(q)}
                            disabled={loading}
                            className={`text-left px-3 py-1.5 rounded-xl border text-xs font-semibold transition-all shadow-xs flex items-center justify-between gap-2 cursor-pointer ${
                              isDark
                                ? 'bg-bdDark-950/70 hover:bg-bdDark-800 border-emerald-800/60 hover:border-emerald-500 text-slate-300 hover:text-emerald-300'
                                : 'bg-white hover:bg-emerald-50 border-slate-200 hover:border-bdGreen-700 text-slate-700 hover:text-bdGreen-900'
                            }`}
                          >
                            <span>{q}</span>
                            <ChevronRight
                              className={`w-3.5 h-3.5 shrink-0 ${
                                isDark ? 'text-emerald-400' : 'text-bdGreen-700'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {isUser && (
                  <div
                    className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 mt-1 shadow-xs border ${
                      isDark
                        ? 'bg-bdDark-800 text-slate-300 border-emerald-800/40'
                        : 'bg-emerald-50 text-bdGreen-800 border-emerald-200'
                    }`}
                  >
                    <User className={`w-4 h-4 ${isDark ? 'text-emerald-400' : 'text-bdGreen-700'}`} />
                  </div>
                )}
              </div>
            );
          })}

          {/* Loading Indicator */}
          {loading && (
            <div className="flex gap-3 sm:gap-4 items-start">
              <div className="w-9 h-9 rounded-xl bg-bdGreen-800 text-white flex items-center justify-center shrink-0 shadow-xs border border-emerald-600/40">
                <Scale className="w-4 h-4 animate-spin text-emerald-300" />
              </div>
              <div
                className={`p-4 rounded-2xl border text-xs sm:text-sm shadow-md space-y-1.5 ${
                  isDark
                    ? 'bg-bdDark-900/90 border-emerald-700/50 text-slate-200'
                    : 'bg-slate-50 border-slate-200 text-slate-800'
                }`}
              >
                <div
                  className={`flex items-center gap-2 font-bold ${
                    isDark ? 'text-emerald-400' : 'text-bdGreen-800'
                  }`}
                >
                  <RefreshCw
                    className={`w-4 h-4 animate-spin ${
                      isDark ? 'text-emerald-400' : 'text-bdGreen-700'
                    }`}
                  />
                  <span>
                    {lang === 'bn'
                      ? 'বাংলাদেশের সংশ্লিষ্ট আইন ও ধারা অনুসন্ধান করা হচ্ছে...'
                      : 'Analyzing incident and cross-referencing Bangladesh Legal Code...'}
                  </span>
                </div>
                <p className={`text-xs pl-6 ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                  {lang === 'bn'
                    ? 'সরকারি গেজেট, প্রযোজ্য দণ্ডবিধি ও উপযুক্ত আইনজীবীদের তালিকা প্রস্তুত হচ্ছে।'
                    : 'Retrieving statutory penalties, litigation procedures, and verified Bar Council advocates.'}
                </p>
              </div>
            </div>
          )}

          {/* Error Message & Retry */}
          {errorMessage && (
            <div
              className={`p-4 rounded-2xl border text-xs sm:text-sm flex items-center justify-between gap-3 shadow-md ${
                isDark
                  ? 'bg-rose-950/50 border-rose-800/60 text-rose-300'
                  : 'bg-rose-50 border-rose-200 text-rose-700'
              }`}
            >
              <div className="flex items-center gap-2">
                <AlertTriangle
                  className={`w-4 h-4 shrink-0 ${isDark ? 'text-rose-400' : 'text-rose-600'}`}
                />
                <span>{errorMessage}</span>
              </div>
              {lastFailedMessage && (
                <button
                  type="button"
                  onClick={() => handleSend(lastFailedMessage)}
                  className="px-3 py-1 bg-bdRed-600 hover:bg-bdRed-700 text-white rounded-lg text-xs font-bold transition-colors shrink-0 cursor-pointer"
                >
                  {lang === 'bn' ? 'পুনরায় চেষ্টা' : 'Retry'}
                </button>
              )}
            </div>
          )}

        </div>

        {/* Input Bar Form */}
        <div className="mt-4">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className={`flex items-center gap-2 rounded-2xl border-2 p-2 shadow-xl transition-all ${
              isDark
                ? 'bg-bdDark-900/95 border-emerald-800/60 focus-within:border-emerald-500'
                : 'bg-white border-slate-200 focus-within:border-bdGreen-800'
            }`}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={loading}
              placeholder={
                lang === 'bn'
                  ? 'আপনার আইনি সমস্যা বা ঘটনাটি বিস্তারিত লিখুন (বাংলা বা ইংরেজি)...'
                  : 'Describe your legal incident or ask about any Bangladesh statute in English or Bengali...'
              }
              className={`flex-1 px-4 py-3 text-xs sm:text-sm focus:outline-none bg-transparent ${
                isDark ? 'placeholder-slate-500 text-white' : 'placeholder-slate-400 text-slate-900'
              }`}
            />
            <button
              type="submit"
              disabled={loading || !input.trim()}
              className="p-3 bg-bdGreen-700 hover:bg-bdGreen-600 disabled:opacity-40 text-white rounded-xl transition-all shadow-md shrink-0 flex items-center justify-center border border-emerald-500/30 cursor-pointer"
              title="Send Message"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>

          {/* Legal Disclaimer Pill */}
          <p className={`text-[11px] text-center mt-2.5 ${isDark ? 'text-slate-500' : 'text-slate-500'}`}>
            ⚠️ Grounded strictly in official Bangladesh statutory data (Penal Code, CrPC, CPC, Land Crime Act 2023). Does not substitute formal advocate legal advice.
          </p>
        </div>

      </div>
    </div>
  );
}
