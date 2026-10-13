# LawBD — Bangladeshi Legal Information & Lawyer Appointment Platform

**LawBD** is a modern, responsive legal information and lawyer appointment platform designed to demystify the laws of Bangladesh and connect citizens with qualified, verified advocates tailored to their specific legal problems.

---

## 🌟 Key Features Implemented in the Frontend

### 1. ⚖️ Simplified Bangladeshi Legal Library & Problem Explorer
- **Plain-Language Legal Explanations**: 12+ real-world legal categories and topics (Divorce & Dower, Child Custody, Theft & Stolen Property, Bail & Criminal Defense, Land & Property Disputes, Cybercrime & Online Blackmail, Domestic Violence, Cheque Dishonour under Section 138 NI Act, Murder & Assault, Labour Law & Wrongful Termination, Consumer Rights, Financial Fraud).
- **Step-by-Step Procedural Timelines**: Numbered visual procedure flows showing the step-by-step path from police station (GD/FIR) to Magistrate hearing, bail, charge sheet, and court verdict.
- **Statutory Punishments & Penalties**: Prominent alerts highlighting maximum prison terms, monetary fines, and bailable/non-bailable statuses under the Penal Code 1860, CrPC 1898, Land Crime Act 2023, and Cyber Security Act 2023.
- **Document Requirements & Immediate Do's & Don'ts**: Practical guidance on evidence preservation and emergency actions.
- **Bilingual Context**: English descriptions alongside authentic Bengali titles and legal terms (e.g., *তালাক ও দেনমোহর*, *খতিয়ান ও নামজারি*, *চেক বাউন্স*, *আগাম জামিন*).

### 2. ✦ Guided Legal Problem Finder (Interactive Triage Wizard)
- **4-Step Problem Triage**: Asks guided questions:
  1. *What issue are you facing?* (Family, Land, Criminal, Cheque, Cyber, Domestic, Labour)
  2. *What is the urgency/stage?* (Emergency/Recent, Received legal notice, Ongoing, Preventive)
  3. *What outcome are you seeking?* (Protection/Bail, Financial recovery, Legal notice, Advocate hire)
- **Instant Triage Result**: Generates priority severity rating, primary applicable Bangladeshi statutes, 3 immediate next steps to take, required documents to assemble, and recommended specialized advocates with 1-click booking.

### 3. 🏛 Verified Advocate Directory & Comparison Tool
- **Bar Council Credential Badges**: Detailed profiles with Bangladesh Bar Council registration roll numbers, court enrollment (High Court Division, District & Sessions Judge Court, Labour Court, Cyber Tribunal), and bar association memberships (SCBA, Dhaka Bar, Ctg Bar, etc.).
- **Multi-Filter & Sorting Engine**: Filter by Specialization, Division/District (Dhaka, Chattogram, Sylhet, Rajshahi, Khulna, Cumilla, etc.), Court Level, and sort by Top Rated, Lowest Fee, or Most Experienced.
- **Side-by-Side Advocate Comparison Matrix**: Select up to 3 advocates to compare credentials, consultation fees (Video vs In-person Chamber), client reviews, experience years, chamber locations, and response times in a side-by-side table.
- **Direct Chamber Messaging**: Send confidential inquiries directly to an advocate's chamber with quick message templates.

### 4. 📅 Multi-Step Consultation Booking & Appointment Pass Generator
- **Multi-Mode Booking**: Select between **Online Video Consultation**, **In-Person Chamber Visit**, or **Urgent Phone Consultation**.
- **Interactive Calendar & Slot Picker**: Select preferred dates and morning/afternoon chamber time slots.
- **Case Summary & Client Details**: Enter brief case background and verify consultation confidentiality.
- **Verified Appointment Pass (Ticket)**: Generates a printable appointment pass featuring a unique reference token (e.g., `LBD-2026-8914`), scheduled time, chamber directions, QR simulation, and simulated SMS/WhatsApp confirmation notifications.

### 5. 📑 "My Bookings" Appointment Management
- Manage upcoming, confirmed, rescheduled, and past appointments with full persistence in `localStorage`.
- View passes, reschedule consultation dates, or cancel bookings on demand.

### 6. 🔖 Saved Laws & Bookmarked Advocates Drawer
- Dedicated bookmarking drawer to save important laws for later review and bookmark top advocates for future consultation.

### 7. 🔔 Live Notification Drawer
- Real-time appointment status alerts, statutory legal updates, and limitation deadline reminders (e.g. NI Act 30-day notice window).

### 8. 📋 Interactive Legal Document Checklists
- Pre-consultation checklists for 6 critical legal actions:
  - *Land Ownership Dispute & Title Verification*
  - *Family Court, Dower & Child Custody*
  - *Criminal Defense & Bail Application*
  - *Cheque Dishonour Case (NI Act 138)*
  - *Cybercrime & Hacking Complaint*
  - *Labour Court Grievance & Unpaid Wages*
- Dynamic progress bar, issuing authority guides (Sub-Registry, AC Land Office, Kazi, Thana, OCC), mandatory tags, and print button.

### 9. ❓ Categorized Legal FAQs
- Expandable accordion answers for high-stakes practical questions: GD vs FIR differences, High Court anticipatory bail procedure, Section 7 Talaq notice rules, Land Crime Prevention Act 2023 provisions, and 16430 National Legal Aid.

### 10. 📖 Bilingual Legal Term Dictionary (আইনি পরিভাষা অভিধান)
- Searchable glossary of key legal concepts with Bengali terms, statutory references, and plain explanations (e.g., *FIR / এজাহার*, *GD*, *Anticipatory Bail*, *Injunction*, *Khatian*, *Mutation*, *Kabinnama*, *Denmohur*, *Caveat*, *Habeas Corpus*).

### 11. 🚨 Emergency Helplines Integration
- Prominent header banner featuring National Legal Aid Helpline **16430** (Toll-free), Emergency Police **999**, Women & Child Helpline **109**, and CID Cyber Police **01320-010148**.

---

## 🛠 Tech Stack & Design Aesthetics

- **Framework**: React 19 + Vite 8
- **Styling**: Vanilla CSS (CSS3 custom properties, glassmorphism, responsive grid & flexbox)
- **Typography**: Google Fonts (*Cinzel* for judicial prestige, *Plus Jakarta Sans* for modern UI, *Hind Siliguri* for Bengali typography)
- **Palette**: Deep Royal Emerald (`#071714`, `#0C2B24`, `#103B31`), Judicial Gold (`#D4AF37`, `#F3C668`, `#C59B27`), Slate & Clean White surfaces.

---

## 🚀 How to Run Locally

1. Open a terminal in the project directory:
   ```bash
   cd lawbd-prototype
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173` in your browser.

4. Build for production:
   ```bash
   npm run build
   ```
