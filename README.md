# Law_BD (ল_বিডি) 
## Complete Bangladesh Legal Information, Victim Support & Advocate Management Platform

**Law_BD** is a production-quality, full-stack digital legal assistance platform built specifically for the legal architecture of Bangladesh. It connects ordinary citizens, victims of harassment or crime, law students, and businesses with verified Bangladesh Bar Council enrolled advocates, provides plain-language explanations of statutory laws in both **বাংলা (Bengali)** and **English**, and offers smart incident triage and automated consultation booking.

---
## 🏛️ System Architecture

- **Frontend**: React 18, Vite, Tailwind CSS, Lucide React, React Router v6.
- **Backend API**: Node.js, Express.js REST API with JWT authentication, Role-Based Access Control (RBAC), and full search and incident triage engines.
- **Database**: Relational file-backed ACID store with JSON persistence, audit trails, and automatic seeding.
- **Design & Theme**: Inspired by the National Flag of Bangladesh — Deep Forest Green (`#064E3B`), Crimson Red (`#F42A41`), Dark Background (`#071A14`), and Clean Slate White.

---

## 🌟 Key Platform Modules & Features

### 1. ⚖️ Complete Bangladesh Law Library (`/laws` & `/laws/:id`)
- Search across the **Constitution of Bangladesh**, **Penal Code 1860**, **CrPC 1898**, **Land Crime Prevention & Redress Act 2023**, **Cyber Security Act 2023**, **Negotiable Instruments Act 1881 (Sec 138)**, **Muslim Family Laws 1961**, **Labour Act 2006**, and **Consumer Rights Protection Act 2009**.
- Filter by jurisdiction, year of enactment, category, and legal status (**Current**, **Amended**, or **Repealed**).
- Individual statute detail pages with official English and Bengali titles, simple plain summaries, statutory punishments/penalties, step-by-step procedural timelines, evidence checklists, immediate Do's and Don'ts, and direct links to official Bangladesh Gazette references.

### 2. 🛡️ Smart Incident-Based Victim Triage (`/victim-support`)
- Victims do not need to know the name of a law. They can simply describe any incident in everyday natural language (e.g., *"আমার জমি জোর করে দখল করেছে এবং জাল দলিল বানিয়েছে"*, *"Someone is blackmailing me on Facebook with private pictures"*, *"Cheque bounced due to insufficient funds"*).
- Smart engine identifies legal categories, matches primary applicable Bangladeshi statutes, assesses urgency, outlines mandatory limitation periods (e.g. 30-day notice under NI Act), and recommends verified specialist advocates.

### 3. 🤖 AI Legal Assistant Grounded in BD Statutes (`/ai-assistant`)
- Grounded conversational legal AI that references verified Bangladesh statutes rather than inventing legal answers.
- Cites specific Acts and sections, explains terms in simple English and Bengali, suggests specialist advocate categories, and presents mandatory statutory legal disclaimers.

### 4. 👨‍⚖️ Verified Advocate Directory & Comparison Matrix (`/lawyers` & `/compare-lawyers`)
- Directory of verified advocates enrolled with the **Bangladesh Bar Council**, Supreme Court Bar Association (SCBA), and District Bars.
- Search and filter by Specialization, Division/District (Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Cumilla), Court Level (High Court Division, Metropolitan Sessions, Cyber Tribunal, Labour Court), and sort by Top Rated, Lowest Fee, or Most Experienced.
- **Side-by-Side Comparison Matrix**: Select up to 3 advocates to directly compare credentials, courtroom admissions, chamber locations, and fees.

### 5. 📅 Multi-Mode Booking & Digital Appointment Pass Generator (`/booking/:lawyerId`)
- Multi-mode consultation booking: **Online Video Consultation**, **In-Person Chamber Visit**, or **Phone Advice**.
- Interactive chamber calendar & time slot selector.
- Simulated Bangladesh payment gateways (**bKash**, **Nagad**, **Rocket**, Debit/Credit Cards).
- **Verified Appointment Pass (Ticket)**: Generates a printable appointment pass featuring a unique verification token (e.g., `LBD-2026-8914`), QR code simulation, chamber directions, and client brief.

### 6. 📊 Multi-Role Dashboards
- **Citizen / Client Dashboard (`/dashboard/client`)**:
  - My Legal Cases (create, track status: Under Review, Ongoing, Resolved).
  - My Appointments & passes with 1-click printable view or cancellation.
  - Saved laws and bookmarked advocates drawer.
  - Direct confidential chamber communications.
- **Advocate / Lawyer Dashboard (`/dashboard/lawyer`)**:
  - Appointment queue (Accept, Complete, or Reject consultation requests).
  - Chamber availability schedule & slot configurator.
  - Consultation fee manager (Video, Chamber, Phone).
  - Bar Council credential verification status and earnings summary.
- **Central Administrative Control Panel (`/dashboard/admin`)**:
  - Platform analytics (Total statutes, enrolled advocates, verified badges, platform revenue).
  - Law Library Management (Add new laws, edit sections, mark amendments/repeals).
  - Bar Council Verification Desk (Review Roll numbers, approve/revoke verification).
  - User Directory and account suspension controls.
  - Real-time platform audit log trail.

### 7. 📖 Bilingual Experience (বাংলা & English)
- Global language switcher (EN / বাং) throughout the entire platform.
- Persistent user preference stored in `localStorage`.
- Proper Bengali Unicode typography with Google's *Hind Siliguri* font.

### 8. 🚨 24/7 Emergency Legal Assistance (`/emergency`)
- Integrated click-to-call banners and emergency directory:
  - **16430**: National Legal Aid Services Helpline (Toll-Free, Ministry of Law)
  - **999**: National Emergency Service (Police / Rescue)
  - **109**: Violence Against Women and Children Helpline
  - **1098**: Child Helpline Bangladesh
  - **01320-010148**: CID Cyber Police Centre
- Guidance for unlawful police detention, domestic abuse, and cyber extortion.

### 9. 📑 Legal Document & Template Center (`/templates`)
- Standardized statutory legal notice templates:
  - Statutory Legal Notice under Section 138 Negotiable Instruments Act.
  - General Diary (GD) format for police stations.
  - Section 33 Grievance Application to Employer under Bangladesh Labour Act.
  - Printable formatting and 1-click clipboard copy.

---

## 🚀 How to Run Locally

### Prerequisites
- Node.js (v18+, v20+, or v24+)
- npm (v9+)

### ⚡ Quick Start (Integrated Dev Environment)
Launch both the Backend Express API and Frontend Vite development servers concurrently with a single command from the root directory:
```bash
npm run dev
# or: node start-dev.js
```
- **Frontend App (Vite)**: `http://localhost:5173`
- **Backend API Server**: `http://localhost:5000`
- **API Health Check**: `http://localhost:5000/api/health`

---

### Manual Step-by-Step Start

#### 1. Start the Backend API Server
```bash
cd backend
npm install
node server.js
```
The backend API server will start on: **`http://localhost:5000`**

#### 2. Start the Frontend Application
Open another terminal:
```bash
cd frontend
npm install
npm run dev
```
The React frontend development server will start on: **`http://localhost:5173`**

#### 3. Production Build
```bash
cd frontend
npm run build
```

---

## 📱 Responsive Layout & Design System
- **Desktop (≥ 1280px)**: Full uncompressed sequential navigation bar aligned to standard `max-w-7xl` container. Single-line titles with zero text wrapping.
- **Tablet / Mobile (< 1280px)**: Compact responsive header with quick 1–30 Jurisdictions trigger, Saved Vault drawer, Bengali/English toggle, and animated drawer menu.
- **Zero Horizontal Overflow**: Guaranteed 100vw constraint preventing unwanted horizontal scrollbars.

---

## 🔑 Demo Accounts for Fast Testing

You can use the **1-Click Demo Switcher** in the navigation bar or sign in manually with these credentials:

| Role | Name | Email | Password |
|---|---|---|---|
| **Citizen (Client)** | Rahim Ahmed | `client@lawbd.com` | `password123` |
| **Advocate (Lawyer)** | Adv. Barrister Tanvir Hasan | `tanvir@lawbd.com` | `password123` |
| **Administrator** | Director General Legal Affairs | `admin@lawbd.com` | `admin123` |
