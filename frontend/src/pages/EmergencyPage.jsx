import React, { useState, useEffect } from 'react';
import {
  PhoneCall,
  ShieldAlert,
  HeartHandshake,
  Laptop,
  AlertTriangle,
  Building,
  MapPin,
  Clock,
  CheckCircle2
} from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { api } from '../services/api';

export default function EmergencyPage() {
  const { lang, t } = useLanguage();
  const [resources, setResources] = useState([]);

  useEffect(() => {
    api.getEmergencyResources().then(res => {
      if (res.success) setResources(res.resources);
    }).catch(() => { });
  }, []);

  const crisisGuides = [
    {
      title: 'If Apprehending Unlawful Police Arrest or Harassment',
      bangla: 'পুলিশি গ্রেপ্তার বা হয়রানির আশঙ্কা থাকলে তাৎক্ষণিক করণীয়:',
      points: [
        'Ask the police officer for their identification card, Thana name, and whether an arrest warrant or FIR exists.',
        'Article 33 of the Constitution guarantees the right to consult and be defended by a legal practitioner of your choice.',
        'Police must present any arrested person before the nearest Judicial Magistrate within 24 hours of arrest.',
        'File for Anticipatory Bail (আগাম জামিন) directly in the High Court Division under Section 498 CrPC before physical custody.'
      ]
    },
    {
      title: 'Immediate Actions for Domestic Abuse & Dowry Harassment',
      bangla: 'পারিবারিক সহিংসতা ও যৌতুক নির্যাতনের শিকার হলে করণীয়:',
      points: [
        'Call 109 (National Helpline for Violence Against Women and Children) or 999 for instant police rescue.',
        'Immediately go to the nearest Government Hospital One-Stop Crisis Centre (OCC) for medical injury documentation.',
        'File an application before the Judicial Magistrate under Section 11 of the 2010 Act for an emergency Protection Order.',
        'Contact National Legal Aid Helpline 16430 for government-funded free advocates.'
      ]
    },
    {
      title: 'Cyber Blackmail, Fake Photos & Extortion Emergency',
      bangla: 'সাইবার ব্ল্যাকমেইল বা গোপন ছবি ফাঁসের হুমকি পেলে করণীয়:',
      points: [
        'Do not delete the messages, chat history, or block the blackmailer immediately.',
        'Capture full-screen unedited screenshots showing profile URLs, phone numbers, and timestamps.',
        'Never send ransom money via bKash or Nagad.',
        'Contact CID Cyber Police Centre 24/7 hotline 01320-010148 or Police Cyber Support for Women (PCSW) 01320-000888.'
      ]
    }
  ];




  return (
    <div className="min-h-screen bg-[#F8FAF9] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-bdRed-600 text-xs font-bold uppercase mb-3">
            <ShieldAlert className="w-4 h-4" />
            <span>24/7 Rapid Emergency Response</span>
          </div>
          <h1 className="font-serif text-3xl sm:text-5xl font-bold text-slate-900 leading-tight">
            {lang === 'bn' ? 'জরুরি আইনি সহায়তা ও হটলাইন' : 'Emergency Legal Aid & Helplines'}
          </h1>
          <p className="text-sm text-slate-500 mt-2 max-w-2xl mx-auto leading-relaxed">
            Direct government helplines, One-Stop Crisis Centres (OCC), and immediate statutory guidance for citizens facing urgent crises.
          </p>
        </div>

        {/* Hotlines Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {resources.map((res) => (
            <div
              key={res.id}
              className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-4">
                  <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase bg-emerald-50 text-bdGreen-800 border border-emerald-200">
                    {res.category}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    <span>{res.timing}</span>
                  </span>
                </div>

                <h3 className="font-bold text-base text-slate-900 mb-1">{res.title}</h3>
                <h4 className="text-xs font-bold text-bdGreen-800 font-bangla mb-3">{res.bangla_title}</h4>
                <p className="text-xs text-slate-600 leading-relaxed mb-6">{res.description}</p>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
                <span className="font-serif font-bold text-2xl text-bdRed-600 tracking-tight">
                  {res.number}
                </span>
                <a
                  href={`tel:${res.number.replace(/[^0-9]/g, '')}`}
                  className="px-4 py-2 bg-bdRed-500 hover:bg-bdRed-600 text-white rounded-xl text-xs font-bold transition-colors shadow-xs flex items-center gap-1.5"
                >
                  <PhoneCall className="w-3.5 h-3.5" />
                  <span>Call Hotline</span>
                </a>
              </div>
            </div>
          ))}
        </div>




        {/* Emergency Crisis Protocols */}
        <div className="space-y-6">
          <h2 className="font-serif font-bold text-2xl text-slate-900 text-center mb-8">
            Emergency Legal Guidance & Protocols
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {crisisGuides.map((guide, idx) => (
              <div
                key={idx}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-4"
              >
                <div className="p-3 bg-rose-50 text-bdRed-600 rounded-2xl w-fit">
                  <AlertTriangle className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-base text-slate-900 leading-snug">{guide.title}</h3>
                  <h4 className="text-xs font-bold text-bdGreen-800 font-bangla mt-1">{guide.bangla}</h4>
                </div>

                <ul className="space-y-2.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  {guide.points.map((pt, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-bdRed-500 font-bold">•</span>
                      <span>{pt}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
