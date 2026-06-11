/* ═══════════════════════════════════════════════════════════════
   Shared Decision Engine Data
   Used by Evaluate.tsx and DestinationLanding.tsx
   ═══════════════════════════════════════════════════════════════ */

export const ACADEMIC_THRESHOLD: Record<string, { competitive: number; minimum: number; label: string }> = {
  Canada:    { competitive: 75, minimum: 60, label: "Top unis need 75%+. Some accept 60%+ for mid-tier colleges." },
  USA:       { competitive: 75, minimum: 55, label: "Top 100 unis need 75%+. 55%+ viable for tier-2 & state unis." },
  UK:        { competitive: 70, minimum: 55, label: "Russell Group needs 70%+. 55%+ works for many red-brick unis." },
  Australia: { competitive: 70, minimum: 55, label: "Group of Eight need 70%+. 55%+ acceptable for many unis." },
  Germany:   { competitive: 75, minimum: 65, label: "TU9 & elite unis need 75%+. NC courses (Medicine) need 85%+." },
  Ireland:   { competitive: 65, minimum: 55, label: "TCD & UCD need 65%+. 55%+ viable for other ITs." },
  Netherlands:{ competitive: 70, minimum: 60, label: "Research unis need 70%+. 60%+ for UAS (applied sciences)." },
  Singapore: { competitive: 80, minimum: 70, label: "NUS/NTU extremely competitive. 80%+ for realistic chance." },
  "New Zealand":{ competitive: 65, minimum: 55, label: "Major unis need 65%+. 55%+ for institutes of tech." },
  Sweden:    { competitive: 70, minimum: 60, label: "Top technical unis need 70%+. 60%+ for general programmes." },
  France:    { competitive: 70, minimum: 60, label: "Grandes Ecoles need 75%+. 60%+ for regular universities." },
  Italy:     { competitive: 65, minimum: 50, label: "Competitive courses need 65%+. 50%+ for many programmes." },
  Poland:    { competitive: 60, minimum: 50, label: "Top medical schools need 65%+. 50%+ for many programmes." },
  UAE:       { competitive: 70, minimum: 55, label: "Major branch campuses need 70%+. 55%+ for local unis." },
  Malaysia:  { competitive: 60, minimum: 50, label: "Branch campuses need 60%+. 50%+ for local private unis." },
  "South Korea":{ competitive: 70, minimum: 60, label: "SKY unis need 80%+. 60%+ for other national unis." },
  Russia:    { competitive: 55, minimum: 45, label: "Medical unis need 55%+. 45%+ for many programmes." },
  Georgia:   { competitive: 55, minimum: 45, label: "Medical unis need 50%+. 45%+ for general admission." },
  Philippines:{ competitive: 50, minimum: 40, label: "Most unis accept 50%+. Very accessible for Indian students." },
};

export const FUNDS_REQUIREMENT: Record<string, { amount: string; period: string; shortNote: string; fullExplain: string }> = {
  Canada:     { amount: "CAD 20,635 + 1st year tuition fees", period: "Money locked for 12 months", shortNote: "Guaranteed Investment Certificate required",
    fullExplain: "The Canadian government wants to see that you have enough money to support yourself. You must buy a Guaranteed Investment Certificate (GIC) from a Canadian bank for 20,635 Canadian Dollars. This money is locked for one year and paid back to you in monthly installments while you study. Additionally, you must show proof that you can pay the first year of tuition. If you do not want to buy a GIC, you can show 6 months of bank statements instead, but this takes longer for visa approval." },
  UK:         { amount: "£1,483 per month (London) or £1,136 per month (outside London)", period: "Money must stay in bank for 28 days", shortNote: "Must cover 9 months of living costs",
    fullExplain: "The United Kingdom wants proof that you can afford living there. If your university is in London, you need to show 1,483 pounds for every month of your course (up to 9 months). Outside London, it is 1,136 pounds per month. This money must stay in your bank account continuously for 28 days before you apply for the visa. You also need to show that you have paid your tuition fees, or show funds for unpaid fees. The money can be in your account, your parent's account, or a joint account." },
  USA:        { amount: "Full first year cost as shown on your university admission letter", period: "Current bank balance is acceptable", shortNote: "Bank letter or education loan letter accepted",
    fullExplain: "The United States requires proof that you can pay for the first full year of your studies. The exact amount is written on your admission letter (called the I-20 form) and varies by university. You can show a bank statement, a letter from your bank, or an education loan approval letter. Your parents or relatives can sponsor you — you just need a letter from them saying they will support you. There is no fixed amount — it depends on what your university charges." },
  Germany:    { amount: "11,904 Euros in a blocked bank account", period: "11 months, released monthly at 992 Euros per month", shortNote: "Special blocked account mandatory before visa",
    fullExplain: "Germany requires you to open a special blocked account with a German bank before you apply for your visa. You must deposit 11,904 Euros into this account. The money is then released to you in monthly installments of 992 Euros for 11 months — this is your living allowance. You cannot access the full amount at once. Popular providers are Fintiba and Expatrio. This amount increases every year — it was 11,208 Euros in 2024 and 11,904 Euros in 2025. You must set up this account before your visa appointment." },
  Australia:  { amount: "29,710 Australian Dollars + tuition + travel", period: "3 months of bank history preferred", shortNote: "Amount increased in May 2024",
    fullExplain: "Australia requires proof of funds to cover your living expenses, tuition, and return travel. The living cost amount is 29,710 Australian Dollars per year. This amount was increased in May 2024 from the previous 24,505 Dollars. You should show 3 months of bank history. Along with funds, you also need to pass a Genuine Temporary Entrant assessment — this means convincing the visa officer that you genuinely want to study and will return home after your course. An education loan letter is widely accepted." },
  "New Zealand":{ amount: "20,000 New Zealand Dollars + tuition + 2,000 travel", period: "3 months of bank history", shortNote: "Funds Transfer Scheme available as alternative",
    fullExplain: "New Zealand requires 20,000 New Zealand Dollars for living costs, plus your tuition fees, plus 2,000 Dollars for travel. You can show 3 months of bank statements. Alternatively, you can use the Funds Transfer Scheme — you deposit the money directly with an approved provider in New Zealand, which is simpler than showing bank history. A scholarship letter or education loan sanction letter can also be used as proof of funds." },
  Ireland:    { amount: "10,000 Euros + first year tuition fees", period: "6 months of bank history", shortNote: "Can be in student or sponsor account",
    fullExplain: "Ireland requires proof of 10,000 Euros for living expenses, plus your first year tuition fees. The money must be in the bank account for 6 months before applying. It can be in the student's own account, a parent's account, or a sponsor's account. If you have an education loan, the loan approval letter is accepted instead of bank statements. Ireland does not require a blocked account — regular savings are fine." },
  Netherlands:{ amount: "1,020 Euros per month", period: "12 months total = 12,240 Euros", shortNote: "Transferred to Dutch bank after arrival",
    fullExplain: "The Netherlands requires proof of 1,020 Euros per month for the entire duration of your course. For a 12-month course, this is 12,240 Euros total. After you arrive, you transfer this money into a Dutch blocked account, and it is released to you monthly. Alternatively, you can show a bank guarantee from your home country bank. Education loans are accepted. The amount is moderate compared to other European countries." },
  France:     { amount: "615 Euros per month", period: "12 months total = 7,380 Euros", shortNote: "One of the lowest requirements in Europe",
    fullExplain: "France has one of the lowest fund requirements in Europe. You need to show 615 Euros per month for 12 months, which is 7,380 Euros total. You can show your parent's bank account with a simple affidavit letter stating they will support you. Before your visa appointment, you must complete a verification process with Campus France. Education loans are accepted. The low amount makes France an attractive option for students with limited funds." },
  Sweden:     { amount: "10,584 Swedish Krona per month", period: "10 months total = 105,840 Krona", shortNote: "Must be in student's own account",
    fullExplain: "Sweden requires 10,584 Swedish Krona per month for 10 months, totaling 105,840 Krona. The money must be in the student's own bank account — parent's or sponsor accounts are not accepted. If you have a scholarship, the scholarship letter can substitute for bank statements. A bank guarantee from a Swedish bank after arrival is also an option. The strict requirement about the account being in the student's name is important to note." },
  Italy:      { amount: "448 Euros per month", period: "12 months total = 5,376 Euros", shortNote: "Lowest in Europe, family account accepted",
    fullExplain: "Italy has the lowest fund requirement in Europe. You only need to show 448 Euros per month for 12 months, which is 5,376 Euros total. You can show a family bank account with proof of relationship. No blocked account is needed — regular savings are sufficient. Some universities may ask for a declaration of value of your previous education certificates. The low cost makes Italy very accessible for Indian students." },
  Singapore:  { amount: "Enough for tuition plus 1,500 Singapore Dollars per month living", period: "Current bank balance acceptable", shortNote: "University admission letter determines amount",
    fullExplain: "Singapore does not specify an exact fixed amount. You need to show that you have enough money to pay your tuition fees plus 1,500 Singapore Dollars per month for living expenses. A current bank balance is acceptable — there is no minimum number of months the money must be in the account. Your university's admission letter (called the In-Principle Approval letter) will state the exact amount you need to show. Bank statements and education loans are both accepted." },
  UAE:        { amount: "15,000 to 30,000 UAE Dirhams", period: "3 months of bank history", shortNote: "Requirements vary by city",
    fullExplain: "The United Arab Emirates requires between 15,000 and 30,000 UAE Dirhams depending on which city and university you choose. Dubai is typically more flexible than other emirates. You need to show 3 months of bank history. There is no blocked account system — a regular bank statement is sufficient. If you have a scholarship from the university, the scholarship letter serves as proof of funds. The requirement is relatively straightforward compared to Western countries." },
  Poland:     { amount: "600 Euros per month", period: "10 months total = 6,000 Euros", shortNote: "Low requirement, family funds accepted",
    fullExplain: "Poland requires 600 Euros per month for 10 months, totaling 6,000 Euros. This is a low requirement compared to Western Europe. You can show family funds with proof of relationship. Some Polish universities offer delayed tuition payment plans, which can reduce the amount you need to show upfront. There is no blocked account system. An education loan letter is accepted. Poland is one of the most budget-friendly options in Europe." },
  Malaysia:   { amount: "15,000 Malaysian Ringgit + tuition fees", period: "3 months of bank history", shortNote: "Low and flexible requirements",
    fullExplain: "Malaysia requires 15,000 Malaysian Ringgit for living costs plus your tuition fees. You need to show 3 months of bank history. The Education Malaysia Global Services (EMGS) processes your visa application. The fund requirement is low and flexible — education loans are widely accepted, and family sponsorship is straightforward. Many Indian students choose Malaysia because of the low total cost and simple visa process." },
  "South Korea":{ amount: "20,000 United States Dollars equivalent", period: "3 or more months of bank history", shortNote: "Scholarship recipients are exempt",
    fullExplain: "South Korea requires proof of funds equivalent to 20,000 United States Dollars. You need to show 3 or more months of bank history. If you receive a scholarship — such as the Korean Government Scholarship or a university scholarship — you are exempt from the funds requirement. The scholarship letter alone is sufficient. Education loans are also accepted. The D-2 student visa is the standard visa for degree-seeking students." },
  Russia:     { amount: "3,000 to 5,000 United States Dollars + tuition fees", period: "Current bank balance accepted", shortNote: "One of the lowest requirements",
    fullExplain: "Russia has one of the lowest fund requirements. You only need to show 3,000 to 5,000 United States Dollars plus your tuition fees. A current bank balance is accepted — there is no minimum duration the money must be in the account. The invitation letter from your university makes the visa process simpler. No blocked account or special visa schemes are needed. Russia is particularly popular for Indian students studying medicine due to the low cost and straightforward process." },
  Georgia:    { amount: "5,000 to 7,000 United States Dollars + tuition fees", period: "Current bank balance accepted", shortNote: "Simple bank statement sufficient",
    fullExplain: "Georgia requires 5,000 to 7,000 United States Dollars plus your tuition fees. A simple bank statement showing the current balance is usually sufficient. There is no blocked account requirement. The visa process is straightforward — an invitation letter from your university is the main document. Georgia has become a popular destination for Indian medical students due to affordable tuition and simple visa requirements. Make sure your university is recognized by the National Medical Commission of India." },
  Philippines:{ amount: "3,000 to 5,000 United States Dollars", period: "Current bank balance accepted", shortNote: "Very simple process",
    fullExplain: "The Philippines has one of the simplest fund requirements. You only need to show 3,000 to 5,000 United States Dollars. A current bank balance is accepted — no minimum duration needed. Some schools include the fund requirement in their total cost estimate they provide for visa purposes. The visa process is among the easiest for Indian students. The Philippines is especially popular for medical studies. Do verify that your chosen university is listed in the World Directory of Medical Schools." },
};

export const CULTURAL_WARNING: Record<string, { level: "high" | "moderate"; title: string; text: string }> = {
  Germany: {
    level: "high",
    title: "Language Barrier — German Required",
    text: "German language (B2/C1) required for 90%+ of jobs — 6-12 months learning. Cultural integration harder than English-speaking countries. Blocked account 11.2L rupees needed upfront."
  },
  France: {
    level: "high",
    title: "Language Barrier — French Required",
    text: "French (B2) essential for most jobs. Very few English-speaking workplaces outside tech. Bureaucracy is complex and in French. Indian community small outside Paris."
  },
  Italy: {
    level: "high",
    title: "Language Barrier — Italian Required",
    text: "Italian required for 95%+ of jobs. English rarely used in workplaces. Job market weak for non-EU graduates. Bureaucracy slow and Italian-only."
  },
  Russia: {
    level: "high",
    title: "Language and Cultural Barrier",
    text: "Russian required for daily life and jobs. Significant cultural differences. Limited Indian community. Cold climate adaptation needed. Currency volatility risk."
  },
  "South Korea": {
    level: "high",
    title: "Language Barrier — Korean Required",
    text: "Korean (TOPIK 4+) needed for most jobs. Very few English-speaking roles. Competitive job market favours locals. Cultural adjustment significant."
  },
  Poland: {
    level: "moderate",
    title: "Language Consideration — Polish Helpful",
    text: "Polish preferred for many jobs though English growing in IT. Indian community small but growing. Bureaucracy can be challenging."
  },
  Sweden: {
    level: "moderate",
    title: "Language Consideration — Swedish Preferred",
    text: "Swedish preferred for 70%+ of jobs despite high English fluency. Housing shortage in cities. Dark winters affect mental health for some Indian students."
  },
  Netherlands: {
    level: "moderate",
    title: "Language Consideration — Dutch Helpful",
    text: "English widely spoken but Dutch preferred for many roles. Housing crisis — finding accommodation extremely difficult. High cost of living."
  },
  UAE: {
    level: "moderate",
    title: "Cultural Consideration",
    text: "English widely used but Arabic beneficial. No permanent residency pathway — work visa tied to employer. Hot climate. Cost of living high in Dubai and Abu Dhabi."
  },
  Georgia: {
    level: "moderate",
    title: "Language and Scale Consideration",
    text: "Georgian or Russian widely used. English limited outside Tbilisi. Very small Indian community. Limited post-study work options. Verify university recognition carefully."
  },
};
