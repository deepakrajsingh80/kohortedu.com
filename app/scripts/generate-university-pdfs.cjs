#!/usr/bin/env node
/**
 * Batch generator for university-specific admission guide PDFs.
 * Usage: node generate-university-pdfs.js
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Paths
const UNIVERSITIES_TS = path.resolve(__dirname, '../src/data/universities.ts');
const OUTPUT_DIR = path.resolve(__dirname, '../public/university-guides');
const HTML_TO_PDF_SCRIPT = '/app/.agents/skills/pdf/scripts/html_to_pdf.js';
const TEMP_DIR = path.resolve(__dirname, '../.temp-pdfs');

// Ensure output directories exist
if (!fs.existsSync(OUTPUT_DIR)) fs.mkdirSync(OUTPUT_DIR, { recursive: true });
if (!fs.existsSync(TEMP_DIR)) fs.mkdirSync(TEMP_DIR, { recursive: true });

// Extract universities array from TypeScript file using regex
function parseUniversities() {
  const content = fs.readFileSync(UNIVERSITIES_TS, 'utf-8');

  // Find each top-level university entry by matching { id: "..." } blocks
  // Strategy: split by entries and parse each one
  const uniBlocks = [];

  // Match each university object - find positions of id: "..." at the top level
  const idRegex = /\{\s*id:\s*"([^"]+)"/g;
  let match;
  const positions = [];

  while ((match = idRegex.exec(content)) !== null) {
    // Only count if this looks like a top-level university entry
    // (check if it comes after "const universities" array start)
    positions.push({ id: match[1], start: match.index });
  }

  // For each position, extract a chunk and parse key fields
  const universities = [];
  for (let i = 0; i < positions.length; i++) {
    const start = positions[i].start;
    const end = i < positions.length - 1 ? positions[i + 1].start : content.indexOf('];', start);
    const block = content.slice(start, end);

    const uni = extractFields(block, positions[i].id);
    if (uni.name) universities.push(uni);
  }

  return universities;
}

function extractString(block, field) {
  const regex = new RegExp(`${field}:\\s*"([^"]*)"`);
  const m = block.match(regex);
  return m ? m[1] : '';
}

function extractStringOptionalQuotes(block, field) {
  // Handle both quoted and unquoted values
  const regex = new RegExp(`${field}:\\s*(?:"([^"]*)"|([^,\\n]+))`);
  const m = block.match(regex);
  return m ? (m[1] || m[2]).trim() : '';
}

function extractStringArray(block, field) {
  const regex = new RegExp(`${field}:\\s*\\[([^\\]]*)\\]`);
  const m = block.match(regex);
  if (!m) return [];
  return m[1].match(/"([^"]*)"/g)?.map(s => s.replace(/"/g, '')) || [];
}

function extractObjectArray(block, field) {
  // Find the array of objects for a field
  const startIdx = block.indexOf(`${field}:`);
  if (startIdx === -1) return [];

  let arrStart = block.indexOf('[', startIdx);
  if (arrStart === -1) return [];

  let depth = 0;
  let arrEnd = arrStart;
  for (let i = arrStart; i < block.length; i++) {
    if (block[i] === '[') depth++;
    if (block[i] === ']') { depth--; if (depth === 0) { arrEnd = i; break; } }
  }

  const arrContent = block.slice(arrStart + 1, arrEnd);
  // Split by top-level object separators
  const objects = [];
  let objDepth = 0;
  let objStart = 0;
  for (let i = 0; i < arrContent.length; i++) {
    if (arrContent[i] === '{') { if (objDepth === 0) objStart = i; objDepth++; }
    if (arrContent[i] === '}') { objDepth--; if (objDepth === 0) {
      objects.push(arrContent.slice(objStart + 1, i));
    }}
  }

  return objects.map(obj => {
    const result = {};
    const fieldMatches = obj.matchAll(/(\w+):\s*"([^"]*)"/g);
    for (const m of fieldMatches) result[m[1]] = m[2];
    return result;
  }).filter(o => Object.keys(o).length > 0);
}

function extractSimpleObject(block, field) {
  const startIdx = block.indexOf(`${field}:`);
  if (startIdx === -1) return {};

  let objStart = block.indexOf('{', startIdx);
  if (objStart === -1) return {};

  let depth = 0;
  let objEnd = objStart;
  for (let i = objStart; i < block.length; i++) {
    if (block[i] === '{') depth++;
    if (block[i] === '}') { depth--; if (depth === 0) { objEnd = i; break; } }
  }

  const objContent = block.slice(objStart + 1, objEnd);
  const result = {};

  // Extract simple key-value pairs
  const pairs = objContent.matchAll(/(\w+):\s*"([^"]*)"/g);
  for (const m of pairs) result[m[1]] = m[2];

  return result;
}

function extractFields(block, id) {
  const uni = {
    id,
    name: extractString(block, 'name'),
    slug: extractString(block, 'slug'),
    country: extractString(block, 'country'),
    city: extractString(block, 'city'),
    state: extractString(block, 'state'),
    type: extractString(block, 'type'),
    founded: extractStringOptionalQuotes(block, 'founded'),
    qsRanking: extractString(block, 'qsRanking'),
    usNewsRanking: extractString(block, 'usNewsRanking') || '',
    website: extractString(block, 'website'),
    tagline: extractString(block, 'tagline'),
    description: extractString(block, 'description'),
    acceptanceRate: extractString(block, 'acceptanceRate'),
    totalStudents: extractString(block, 'totalStudents'),
    indianStudents: extractString(block, 'indianStudents'),
    studentFacultyRatio: extractString(block, 'studentFacultyRatio'),
    graduationRate: extractString(block, 'graduationRate'),
    genderRatio: extractString(block, 'genderRatio'),
    intlStudentPercent: extractString(block, 'intlStudentPercent'),
    heroImage: extractString(block, 'heroImage'),
    whyThisUni: extractStringArray(block, 'whyThisUni'),
    programs: extractObjectArray(block, 'programs'),
    scholarships: extractObjectArray(block, 'scholarships'),
    deadlines: extractObjectArray(block, 'deadlines'),
    studentQuotes: extractObjectArray(block, 'studentQuotes'),
    notableAlumni: extractObjectArray(block, 'notableAlumni'),
    clubs: extractObjectArray(block, 'clubs'),
    sports: extractStringArray(block, 'sports'),
    campusFacilities: extractStringArray(block, 'campusFacilities'),
    weekendSpots: extractStringArray(block, 'weekendSpots'),
    reviews: extractObjectArray(block, 'reviews'),
    videos: extractObjectArray(block, 'videos'),
    // Complex nested objects
    admissionReq: extractSimpleObject(block, 'admissionReq'),
    campusLife: extractSimpleObject(block, 'campusLife'),
    careerOutcomes: extractSimpleObject(block, 'careerOutcomes'),
    costOfLiving: extractObjectArray(block, 'costOfLiving'),
    academicVibe: '',
    socialVibe: '',
    nightlife: '',
  };

  // Extract longer text fields
  const acVibeMatch = block.match(/academicVibe:\s*"([^"]*)"/);
  if (acVibeMatch) uni.academicVibe = acVibeMatch[1];

  const socVibeMatch = block.match(/socialVibe:\s*"([^"]*)"/);
  if (socVibeMatch) uni.socialVibe = socVibeMatch[1];

  const nlMatch = block.match(/nightlife:\s*"([^"]*)"/);
  if (nlMatch) uni.nightlife = nlMatch[1];

  // Extract placement data
  const placementDataMatch = block.match(/placementData:\s*\{([^}]*(?:\{[^}]*\}[^}]*)*)\}/s);
  if (placementDataMatch) {
    const pd = placementDataMatch[1];
    const overallRate = pd.match(/overallPlacementRate:\s*"([^"]*)"/);
    const avgSal = pd.match(/avgSalary:\s*"([^"]*)"/);
    const highSal = pd.match(/highestSalary:\s*"([^"]*)"/);
    const totalCos = pd.match(/totalCompanies:\s*"([^"]*)"/);
    uni.placementData = {
      overallPlacementRate: overallRate ? overallRate[1] : '',
      avgSalary: avgSal ? avgSal[1] : '',
      highestSalary: highSal ? highSal[1] : '',
      totalCompanies: totalCos ? totalCos[1] : '',
    };
  }

  return uni;
}

// ====== HTML TEMPLATE ======
function generateHTML(uni) {
  const safe = (s) => (s || '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  // Stats pills
  const statsPills = [];
  if (uni.qsRanking) statsPills.push({ num: safe(uni.qsRanking), label: 'QS Ranking' });
  if (uni.founded) statsPills.push({ num: safe(uni.founded), label: 'Founded' });
  if (uni.totalStudents) statsPills.push({ num: safe(uni.totalStudents), label: 'Students' });
  if (uni.indianStudents) statsPills.push({ num: safe(uni.indianStudents), label: 'Indian Students' });

  // Programs table
  const programsRows = uni.programs.slice(0, 6).map(p =>
    `<tr>
      <td><strong>${safe(p.name)}</strong></td>
      <td>${safe(p.level || '')}</td>
      <td>${safe(p.duration || '')}</td>
      <td>${safe(p.tuition || '')}</td>
      <td>${safe(p.description || '')}</td>
    </tr>`
  ).join('');

  // Scholarships
  const scholRows = uni.scholarships.slice(0, 4).map(s =>
    `<tr><td><strong>${safe(s.name)}</strong></td><td>${safe(s.amount)}</td><td>${safe(s.eligibility)}</td><td>${safe(s.deadline)}</td></tr>`
  ).join('');

  // Deadlines
  const deadlineRows = uni.deadlines.slice(0, 4).map(d =>
    `<tr><td><strong>${safe(d.intake)}</strong></td><td>${safe(d.deadline)}</td><td>${safe(d.decisionDate)}</td></tr>`
  ).join('');

  // Quotes
  const quotesHTML = uni.studentQuotes.slice(0, 3).map(q =>
    `<div class="quote-block">"${safe(q.quote)}"<div class="quote-author">— ${safe(q.author)}</div></div>`
  ).join('');

  // Alumni
  const alumniHTML = uni.notableAlumni.slice(0, 3).map(a =>
    `<strong>${safe(a.name)}</strong> — ${safe(a.achievement)}<br>`
  ).join('');

  // Cost of living
  const costRows = uni.costOfLiving.slice(0, 8).map(c =>
    `<tr><td>${safe(c.category)}</td><td>${safe(c.cost)}</td></tr>`
  ).join('');

  // Admission requirements
  const req = uni.admissionReq;
  const reqRows = [];
  if (req.gpa) reqRows.push(`<tr><td><strong>GPA</strong></td><td>${safe(req.gpa)}</td></tr>`);
  if (req.gre) reqRows.push(`<tr><td><strong>GRE</strong></td><td>${safe(req.gre)}</td></tr>`);
  if (req.ielts) reqRows.push(`<tr><td><strong>IELTS</strong></td><td>${safe(req.ielts)}</td></tr>`);
  if (req.toefl) reqRows.push(`<tr><td><strong>TOEFL</strong></td><td>${safe(req.toefl)}</td></tr>`);
  if (req.workExp) reqRows.push(`<tr><td><strong>Work Experience</strong></td><td>${safe(req.workExp)}</td></tr>`);
  if (req.lor) reqRows.push(`<tr><td><strong>LORs</strong></td><td>${safe(req.lor)}</td></tr>`);
  if (req.sop) reqRows.push(`<tr><td><strong>SOP</strong></td><td>${safe(req.sop)}</td></tr>`);
  if (req.resume) reqRows.push(`<tr><td><strong>Resume</strong></td><td>${safe(req.resume)}</td></tr>`);
  if (req.interview) reqRows.push(`<tr><td><strong>Interview</strong></td><td>${safe(req.interview)}</td></tr>`);
  if (req.applicationFee) reqRows.push(`<tr><td><strong>Application Fee</strong></td><td>${safe(req.applicationFee)}</td></tr>`);

  // Document checklist
  const docItems = req.documents ? req.documents.slice(0, 12).map(d => `<li>${safe(d)}</li>`).join('') : '';

  // Career outcomes
  const co = uni.careerOutcomes;
  const careerStats = [];
  if (co.placementRate) careerStats.push({ num: safe(co.placementRate), label: 'Placement Rate' });
  if (co.avgSalary) careerStats.push({ num: safe(co.avgSalary), label: 'Avg Salary' });
  if (co.workVisaDuration) careerStats.push({ num: safe(co.workVisaDuration), label: 'Work Visa' });

  // Campus life
  const cl = uni.campusLife;
  const campusInfo = [];
  if (cl.indianAssoc) campusInfo.push(`<tr><td><strong>Indian Association</strong></td><td>${safe(cl.indianAssoc)}</td></tr>`);
  if (cl.accommodation) campusInfo.push(`<tr><td><strong>Accommodation</strong></td><td>${safe(cl.accommodation)}</td></tr>`);
  if (cl.avgRent) campusInfo.push(`<tr><td><strong>Avg Rent</strong></td><td>${safe(cl.avgRent)}</td></tr>`);
  if (cl.indianFood) campusInfo.push(`<tr><td><strong>Indian Food</strong></td><td>${safe(cl.indianFood)}</td></tr>`);
  if (cl.weather) campusInfo.push(`<tr><td><strong>Weather</strong></td><td>${safe(cl.weather)}</td></tr>`);
  if (cl.transport) campusInfo.push(`<tr><td><strong>Transport</strong></td><td>${safe(cl.transport)}</td></tr>`);
  if (cl.healthcare) campusInfo.push(`<tr><td><strong>Healthcare</strong></td><td>${safe(cl.healthcare)}</td></tr>`);
  if (cl.safety) campusInfo.push(`<tr><td><strong>Safety</strong></td><td>${safe(cl.safety)}</td></tr>`);

  // Placement data
  const pd = uni.placementData || {};
  const placementStatsHTML = [];
  if (pd.overallPlacementRate) placementStatsHTML.push({ num: safe(pd.overallPlacementRate), label: 'Placement Rate' });
  if (pd.avgSalary) placementStatsHTML.push({ num: safe(pd.avgSalary), label: 'Avg Salary' });
  if (pd.highestSalary) placementStatsHTML.push({ num: safe(pd.highestSalary), label: 'Highest Salary' });
  if (pd.totalCompanies) placementStatsHTML.push({ num: safe(pd.totalCompanies), label: 'Companies' });

  const allStats = [...statsPills, ...placementStatsHTML, ...careerStats];
  const statsHTML = allStats.slice(0, 5).map(s =>
    `<div class="stat-pill"><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div>`
  ).join('');

  // Why this uni
  const whyHTML = uni.whyThisUni.slice(0, 6).map(w => `<li>${safe(w)}</li>`).join('');

  // Top employers
  const employersHTML = co.topEmployers ? co.topEmployers.slice(0, 10).map(e => safe(e)).join(', ') : '';

  // Clubs
  const clubsHTML = uni.clubs.slice(0, 8).map(c => `<li><strong>${safe(c.name)}</strong> — ${safe(c.category)}</li>`).join('');

  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>${safe(uni.name)} — Admission Guide for Indian Students</title>
<style>
*{box-sizing:border-box}
body{margin:0;padding:0;font-family:Georgia,"Noto Serif",serif;font-size:10.5pt;line-height:1.6;color:#2d3748;text-align:justify;text-align-last:left}
@page{size:A4;margin:2cm 1.8cm;@top-center{content:string(doctitle);font-size:8pt;color:#718096}@bottom-center{content:counter(page);font-size:8pt;color:#718096}}
@page:first{margin:0;@top-center{content:none}@bottom-center{content:none}}
@page cover{@top-center{content:none}@bottom-center{content:none}}
@page toc{@top-center{content:none}@bottom-center{content:none}}
body{string-set:doctitle""}
h1{string-set:doctitle content()}

/* WATERMARK - appears on every page */
body::before{
  content:"KOHORTCONNECT PREMIUM";
  position:fixed;
  top:50%;
  left:50%;
  transform:translate(-50%,-50%) rotate(-45deg);
  font-size:48pt;
  font-weight:700;
  color:rgba(13,148,136,0.08);
  font-family:system-ui,sans-serif;
  letter-spacing:8px;
  z-index:9999;
  pointer-events:none;
  white-space:nowrap;
}
body::after{
  content:"CONFIDENTIAL - NOT FOR DISTRIBUTION";
  position:fixed;
  bottom:30px;
  right:30px;
  font-size:7pt;
  color:rgba(13,148,136,0.15);
  font-family:system-ui,sans-serif;
  letter-spacing:1px;
  z-index:9999;
  pointer-events:none;
}

/* COVER */
.cover{
  page:cover;
  width:210mm;
  height:297mm;
  margin:0;
  position:relative;
  overflow:hidden;
  page-break-after:always;
  background:linear-gradient(145deg,#0f172a 0%,#134e4a 50%,#0f172a 100%);
}
.cover::before{content:'';position:absolute;top:-100px;right:-100px;width:450px;height:450px;border:3px solid rgba(13,148,136,0.2);border-radius:50%}
.cover::after{content:'';position:absolute;bottom:-80px;left:-80px;width:350px;height:350px;border:2px solid rgba(13,148,136,0.15);border-radius:50%}
.cover-grid{position:absolute;inset:0;background-image:linear-gradient(rgba(13,148,136,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(13,148,136,0.04) 1px,transparent 1px);background-size:35px 35px}
.cover-accent{position:absolute;top:0;left:0;width:100%;height:6mm;background:linear-gradient(90deg,#0d9488,#14b8a6,#0d9488)}
.cover-badge{position:absolute;top:40px;right:40px;background:rgba(13,148,136,0.2);border:1px solid rgba(13,148,136,0.5);color:#5eead4;font-size:9pt;font-family:system-ui,sans-serif;letter-spacing:2px;text-transform:uppercase;padding:6px 18px;border-radius:3px}
.cover-content{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);text-align:center;width:78%;z-index:10}
.cover-logo{font-size:11pt;color:#14b8a6;font-weight:700;letter-spacing:3px;text-transform:uppercase;font-family:system-ui,sans-serif;margin-bottom:30px}
.cover-title{font-size:30pt;font-weight:700;color:#fff;line-height:1.15;margin-bottom:12px}
.cover-subtitle{font-size:12pt;color:#94a3b8;margin-bottom:50px;font-weight:400}
.cover-year{display:inline-block;background:linear-gradient(135deg,#0d9488,#14b8a6);color:#fff;font-size:12pt;font-weight:700;padding:10px 36px;border-radius:25px;font-family:system-ui,sans-serif}
.cover-footer{position:absolute;bottom:50px;left:0;right:0;text-align:center;z-index:10}
.cover-footer p{color:#64748b;font-size:9pt;font-family:system-ui,sans-serif;margin:3px 0}
.cover-footer .brand{color:#14b8a6;font-size:11pt;font-weight:600;letter-spacing:1px}

/* TOC */
.toc-page{page:toc;page-break-after:always}
.toc-title{font-size:20pt;font-weight:700;color:#0f172a;margin-bottom:25px;padding-bottom:8px;border-bottom:3px solid #0d9488}
.toc{list-style:none;padding:0;margin:0}
.toc li{margin-bottom:8px}
.toc a{color:#2d3748;text-decoration:none;font-size:10.5pt;display:flex;align-items:baseline}
.toc a::after{content:leader('.') target-counter(attr(href url),page);flex:1;text-align:right;color:#718096}
.toc-chapter{font-weight:700;font-size:11pt;margin-top:14px}

/* HEADINGS */
h1{font-size:20pt;font-weight:700;color:#0f172a;margin-top:0;margin-bottom:16px;padding-bottom:8px;border-bottom:3px solid #0d9488;page-break-before:always}
h1:first-of-type{page-break-before:auto}
h2{font-size:13pt;font-weight:700;color:#0f766e;margin-top:22px;margin-bottom:10px;padding-left:10px;border-left:4px solid #0d9488}
h3{font-size:11pt;font-weight:700;color:#2d3748;margin-top:16px;margin-bottom:6px}

/* TABLES */
table{width:100%;border-collapse:collapse;margin:14px 0;font-size:9.5pt;max-width:100%}
thead{border-top:2.5px solid #0f172a;border-bottom:1.5px solid #0f172a}
tbody{border-bottom:2.5px solid #0f172a}
th{padding:8px 6px;text-align:left;font-weight:700;color:#0f172a;background:#f8fafc}
td{padding:7px 6px;vertical-align:top}
tr{page-break-inside:avoid}
tr:nth-child(even){background:#f8fafc}

/* CALLOUTS */
.info-box{background:#f0fdfa;border-left:4px solid #0d9488;padding:12px 16px;margin:14px 0;border-radius:0 6px 6px 0}
.info-box-title{font-weight:700;color:#0f766e;margin-bottom:5px;font-size:10pt}
.tip-box{background:#fef2f2;border-left:4px solid #ce1126;padding:12px 16px;margin:14px 0;border-radius:0 6px 6px 0}
.warning-box{background:#fffbeb;border-left:4px solid #f59e0b;padding:12px 16px;margin:14px 0;border-radius:0 6px 6px 0}

/* STATS */
.stats-row{display:flex;gap:10px;margin:16px 0;flex-wrap:wrap}
.stat-pill{background:linear-gradient(135deg,#f0fdfa,#fff);border:1px solid #ccfbf1;border-radius:8px;padding:10px 14px;text-align:center;flex:1;min-width:90px;page-break-inside:avoid}
.stat-num{font-size:15pt;font-weight:700;color:#0d9488;font-family:system-ui,sans-serif}
.stat-label{font-size:7.5pt;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;margin-top:3px}

/* CHECKLIST */
.checklist{list-style:none;padding-left:0;margin:8px 0}
.checklist li{padding:5px 0 5px 26px;position:relative;border-bottom:1px solid #e2e8f0;font-size:10pt}
.checklist li::before{content:'[  ]';position:absolute;left:0;color:#0d9488;font-weight:700;font-family:monospace}

/* QUOTE */
.quote-block{background:#f8fafc;border-left:4px solid #0d9488;padding:14px 18px;margin:14px 0;font-style:italic;color:#4a5568}
.quote-author{font-style:normal;font-weight:700;color:#2d3748;margin-top:8px;font-size:9.5pt}

/* BACK COVER */
.back-cover{page-break-before:always;page:cover;width:210mm;height:297mm;margin:0;position:relative;overflow:hidden;background:linear-gradient(145deg,#0f172a 0%,#134e4a 50%,#0f172a 100%);display:flex;align-items:center;justify-content:center;flex-direction:column;text-align:center}
.back-cover h2{color:#fff;font-size:26pt;border:none;padding:0;margin-bottom:16px}
.back-cover p{color:#94a3b8;font-size:11pt;max-width:65%}
.back-cover .cta{display:inline-block;background:linear-gradient(135deg,#0d9488,#14b8a6);color:#fff;font-family:system-ui,sans-serif;font-size:11pt;font-weight:600;padding:12px 36px;border-radius:25px;margin-top:24px;text-decoration:none}
.back-cover .footer-text{position:absolute;bottom:45px;color:#64748b;font-size:9pt}

/* UTILS */
.highlight{background:#fef3c7;padding:1px 4px;border-radius:2px}
strong{color:#0f172a}
a{color:#0d9488;text-decoration:none;word-break:break-all}
p{margin:0 0 8px 0}
ul,ol{margin:8px 0;padding-left:22px}
li{margin-bottom:5px}
pre,table,figure,img,svg,blockquote{max-width:100%;box-sizing:border-box}
</style>
</head>
<body>

<!-- COVER -->
<div class="cover">
  <div class="cover-grid"></div>
  <div class="cover-accent"></div>
  <div class="cover-badge">Premium Guide</div>
  <div class="cover-content">
    <div class="cover-logo">${safe(uni.name)}</div>
    <div class="cover-title">Complete Admission Guide<br>for Indian Students</div>
    <div class="cover-subtitle">Programs, Fees, Scholarships, Placements &amp; Campus Life</div>
    <div class="cover-year">${safe(uni.city)}, ${safe(uni.state || uni.country)}</div>
  </div>
  <div class="cover-footer">
    <p class="brand">KOHORTCONNECT</p>
    <p>Your Study Abroad Admission Partner</p>
    <p>www.kohortconnect.com</p>
  </div>
</div>

<!-- TOC -->
<div class="toc-page">
  <div class="toc-title">Table of Contents</div>
  <ul class="toc">
    <li class="toc-chapter"><a href="#sec1">1. ${safe(uni.name)} at a Glance</a></li>
    <li class="toc-chapter"><a href="#sec2">2. Why Choose ${safe(uni.name.split(' ')[0])}?</a></li>
    ${programsRows ? '<li class="toc-chapter"><a href="#sec3">3. Programs &amp; Courses</a></li>' : ''}
    ${reqRows.length ? '<li class="toc-chapter"><a href="#sec4">4. Eligibility &amp; Requirements</a></li>' : ''}
    ${deadlineRows ? '<li class="toc-chapter"><a href="#sec5">5. Application Deadlines</a></li>' : ''}
    ${costRows ? '<li class="toc-chapter"><a href="#sec6">6. Tuition &amp; Cost of Living</a></li>' : ''}
    ${scholRows ? '<li class="toc-chapter"><a href="#sec7">7. Scholarships &amp; Funding</a></li>' : ''}
    ${placementStatsHTML.length || employersHTML ? '<li class="toc-chapter"><a href="#sec8">8. Placements &amp; Career Outcomes</a></li>' : ''}
    ${campusInfo.length ? '<li class="toc-chapter"><a href="#sec9">9. Campus Life for Indians</a></li>' : ''}
    ${docItems ? '<li class="toc-chapter"><a href="#sec10">10. Application Checklist</a></li>' : ''}
    ${quotesHTML ? '<li class="toc-chapter"><a href="#sec11">11. What Students Say</a></li>' : ''}
  </ul>
</div>

<!-- SECTION 1: AT A GLANCE -->
<h1 id="sec1">1. ${safe(uni.name)} at a Glance</h1>

<div class="stats-row">${statsHTML}</div>

<table>
  <thead><tr><th>Attribute</th><th>Details</th></tr></thead>
  <tbody>
    <tr><td><strong>Full Name</strong></td><td>${safe(uni.name)}</td></tr>
    <tr><td><strong>Location</strong></td><td>${safe(uni.city)}${uni.state ? ', ' + safe(uni.state) : ''}, ${safe(uni.country)}</td></tr>
    <tr><td><strong>Type</strong></td><td>${safe(uni.type)}${uni.founded ? ' (Est. ' + safe(uni.founded) + ')' : ''}</td></tr>
    ${uni.acceptanceRate ? `<tr><td><strong>Acceptance Rate</strong></td><td>${safe(uni.acceptanceRate)}</td></tr>` : ''}
    ${uni.studentFacultyRatio ? `<tr><td><strong>Student-Faculty Ratio</strong></td><td>${safe(uni.studentFacultyRatio)}</td></tr>` : ''}
    ${uni.graduationRate ? `<tr><td><strong>Graduation Rate</strong></td><td>${safe(uni.graduationRate)}</td></tr>` : ''}
    ${uni.intlStudentPercent ? `<tr><td><strong>International Students</strong></td><td>${safe(uni.intlStudentPercent)}</td></tr>` : ''}
    ${uni.genderRatio ? `<tr><td><strong>Gender Ratio</strong></td><td>${safe(uni.genderRatio)}</td></tr>` : ''}
    ${uni.website ? `<tr><td><strong>Website</strong></td><td>${safe(uni.website)}</td></tr>` : ''}
    ${uni.tagline ? `<tr><td><strong>Motto</strong></td><td>${safe(uni.tagline)}</td></tr>` : ''}
  </tbody>
</table>

${uni.description ? `<p>${safe(uni.description)}</p>` : ''}
${alumniHTML ? `<div class="info-box"><div class="info-box-title">Notable Alumni</div>${alumniHTML}</div>` : ''}

<!-- SECTION 2: WHY THIS UNI -->
<h1 id="sec2">2. Why Choose ${safe(uni.name.split(' ')[0])}?</h1>
${whyHTML ? `<ul>${whyHTML}</ul>` : uni.description ? `<p>${safe(uni.description)}</p>` : ''}
${uni.academicVibe ? `<h2>Academic Environment</h2><p>${safe(uni.academicVibe)}</p>` : ''}
${uni.socialVibe ? `<h2>Student Life</h2><p>${safe(uni.socialVibe)}</p>` : ''}

<!-- SECTION 3: PROGRAMS -->
${programsRows ? `
<h1 id="sec3">3. Programs &amp; Courses</h1>
<h2>Popular Programs for Indian Students</h2>
<table>
  <thead><tr><th>Program</th><th>Level</th><th>Duration</th><th>Tuition</th><th>Highlights</th></tr></thead>
  <tbody>${programsRows}</tbody>
</table>
` : ''}

<!-- SECTION 4: REQUIREMENTS -->
${reqRows.length ? `
<h1 id="sec4">4. Eligibility &amp; Requirements</h1>
<h2>Admission Requirements</h2>
<table>
  <thead><tr><th>Requirement</th><th>Details</th></tr></thead>
  <tbody>${reqRows.join('')}</tbody>
</table>
${docItems ? `
<h2>Required Documents</h2>
<ul class="checklist">${docItems}</ul>
` : ''}
` : ''}

<!-- SECTION 5: DEADLINES -->
${deadlineRows ? `
<h1 id="sec5">5. Application Deadlines</h1>
<table>
  <thead><tr><th>Intake</th><th>Deadline</th><th>Decision Date</th></tr></thead>
  <tbody>${deadlineRows}</tbody>
</table>
` : ''}

<!-- SECTION 6: COSTS -->
${costRows ? `
<h1 id="sec6">6. Tuition &amp; Cost of Living</h1>
<table>
  <thead><tr><th>Expense Category</th><th>Cost</th></tr></thead>
  <tbody>${costRows}</tbody>
</table>
` : ''}

<!-- SECTION 7: SCHOLARSHIPS -->
${scholRows ? `
<h1 id="sec7">7. Scholarships &amp; Funding</h1>
<table>
  <thead><tr><th>Scholarship</th><th>Amount</th><th>Eligibility</th><th>Deadline</th></tr></thead>
  <tbody>${scholRows}</tbody>
</table>
` : ''}

<!-- SECTION 8: PLACEMENTS -->
${(placementStatsHTML.length || employersHTML) ? `
<h1 id="sec8">8. Placements &amp; Career Outcomes</h1>
${placementStatsHTML.length ? `<div class="stats-row">${placementStatsHTML.slice(0, 4).map(s => `<div class="stat-pill"><div class="stat-num">${s.num}</div><div class="stat-label">${s.label}</div></div>`).join('')}</div>` : ''}
${employersHTML ? `<h2>Top Recruiting Companies</h2><p>${employersHTML}</p>` : ''}
${co.prPathway ? `<div class="tip-box"><div class="info-box-title">Post-Study Work Pathway</div>${safe(co.prPathway)}${co.workVisaDuration ? ' | Work visa duration: ' + safe(co.workVisaDuration) : ''}</div>` : ''}
` : ''}

<!-- SECTION 9: CAMPUS LIFE -->
${campusInfo.length ? `
<h1 id="sec9">9. Campus Life for Indians</h1>
<table>
  <thead><tr><th>Aspect</th><th>Details</th></tr></thead>
  <tbody>${campusInfo.join('')}</tbody>
</table>
${uni.nightlife ? `<h2>Nightlife &amp; Social Scene</h2><p>${safe(uni.nightlife)}</p>` : ''}
${clubsHTML ? `<h2>Student Clubs &amp; Societies</h2><ul>${clubsHTML}</ul>` : ''}
` : ''}

<!-- SECTION 10: CHECKLIST -->
${docItems ? `
<h1 id="sec10">10. Application Checklist</h1>
<h2>Required Documents</h2>
<ul class="checklist">${docItems}</ul>
<div class="warning-box"><strong>Important:</strong> Start your document preparation at least 3 months before the application deadline. Document attestation can take 4-6 weeks.</div>
` : ''}

<!-- SECTION 11: QUOTES -->
${quotesHTML ? `
<h1 id="sec11">11. What Students Say</h1>
${quotesHTML}
` : ''}

<!-- BACK COVER -->
<div class="back-cover">
  <div class="cover-grid"></div>
  <div style="position:absolute;top:0;left:0;width:100%;height:6mm;background:linear-gradient(90deg,#0d9488,#14b8a6,#0d9488)"></div>
  <h2>Your ${safe(uni.name.split(' ')[0])} Journey<br>Starts Here</h2>
  <p>Get expert guidance on your ${safe(uni.name)} application — SOP review, LOR templates, visa prep, and more.</p>
  <div class="cta">www.kohortconnect.com</div>
  <p class="footer-text">Premium Admission Guides | Verified Consultants | End-to-End Support</p>
</div>

</body>
</html>`;
}

// ====== MAIN ======
async function main() {
  console.log('Parsing universities data...');
  const universities = parseUniversities();
  console.log(`Found ${universities.length} universities`);

  // Limit to first 10 for testing, then all
  const toProcess = universities; //.slice(0, 5);
  console.log(`Generating PDFs for ${toProcess.length} universities...`);

  let success = 0;
  let failed = 0;

  for (let i = 0; i < toProcess.length; i++) {
    const uni = toProcess[i];
    const slug = uni.slug || uni.id;
    const htmlPath = path.join(TEMP_DIR, `${slug}.html`);
    const pdfPath = path.join(OUTPUT_DIR, `${slug}-guide.pdf`);

    // Skip if already exists
    if (fs.existsSync(pdfPath)) {
      console.log(`  [${i+1}/${toProcess.length}] SKIP ${uni.name} (already exists)`);
      success++;
      continue;
    }

    try {
      // Generate HTML
      const html = generateHTML(uni);
      fs.writeFileSync(htmlPath, html);

      // Convert to PDF
      execSync(`node ${HTML_TO_PDF_SCRIPT} ${htmlPath} --output ${pdfPath}`, {
        timeout: 60000,
        stdio: 'pipe'
      });

      success++;
      console.log(`  [${i+1}/${toProcess.length}] OK ${uni.name}`);
    } catch (err) {
      failed++;
      console.error(`  [${i+1}/${toProcess.length}] FAIL ${uni.name}: ${err.message.substring(0, 100)}`);
    }
  }

  console.log(`\nDone! ${success} succeeded, ${failed} failed`);
  console.log(`PDFs saved to: ${OUTPUT_DIR}`);

  // Cleanup temp HTML files
  fs.rmSync(TEMP_DIR, { recursive: true, force: true });
}

main().catch(console.error);
