import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import dotenv from "dotenv";

dotenv.config();

const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// ─── Script Templates ───────────────────────────────────────
const scriptTemplates = [
  // English
  {
    title: "Self Introduction",
    category: "self_introduction",
    language: "en",
    content: `Good morning, everyone. My name is [Your Name], and I'm currently a [Your Role] at [Your Organization].

Today, I'd like to share a little about who I am, what drives me, and what I hope to contribute to this community.

I've always been passionate about [Your Passion/Field]. It started when I [Brief Story]. Since then, I've dedicated myself to [What You Do].

Some key experiences that shaped me include:
- [Experience 1]: This taught me the value of [Lesson].
- [Experience 2]: Here, I learned to [Skill].
- [Experience 3]: This gave me the confidence to [Outcome].

Looking ahead, my goal is to [Future Goal]. I believe that with the right combination of [Values], we can [Vision].

Thank you for giving me this opportunity. I look forward to working with all of you and learning from your experiences as well.`,
  },
  {
    title: "Graduation Speech",
    category: "graduation_speech",
    language: "en",
    content: `Distinguished guests, faculty members, proud families, and my fellow graduates — good morning.

Four years ago, we walked into this institution as strangers, uncertain of what lay ahead. Today, we stand here as graduates — transformed, tested, and ready.

Along the way, we faced challenges none of us expected:
- Late nights preparing for exams that seemed impossible.
- Group projects that tested our patience and teamwork.
- Personal moments of doubt where we questioned if we belonged here.

But here's the thing — we made it. Not because the road was easy, but because we chose to keep going.

I want to thank our professors who believed in us even when we didn't believe in ourselves. Our families, who sacrificed so much to give us this opportunity. And our friends, who became our second family.

As we step into the next chapter, remember this: success is not about the destination. It's about the courage to start, the resilience to continue, and the grace to help others along the way.

Congratulations, Class of [Year]. The world is waiting for us. Let's go make it better.

Thank you.`,
  },
  {
    title: "Elevator Pitch",
    category: "elevator_pitch",
    language: "en",
    content: `Hi, I'm [Your Name], and I help [Target Audience] solve [Problem] through [Your Solution].

Here's the thing: [Statistic or Pain Point]. Most people try to fix this by [Common Approach], but that often leads to [Limitation].

That's where [Your Product/Service] comes in. We use [Unique Method/Technology] to deliver [Key Benefit] — and our users have seen [Result/Metric].

What makes us different? Three things:
1. [Differentiator 1] — unlike competitors, we [Advantage].
2. [Differentiator 2] — our approach ensures [Benefit].
3. [Differentiator 3] — we've already [Traction/Proof].

We're currently [Stage/What You're Looking For]. I'd love to chat more about how we can [Value Proposition for Listener].

Can I get your card?`,
  },
  {
    title: "Project Presentation",
    category: "project_presentation",
    language: "en",
    content: `Good afternoon, everyone. Thank you for being here today.

I'm [Your Name], and today I'll be presenting [Project Name] — a project designed to [Project Goal].

Let me start with the problem. Currently, [Describe the Problem]. This affects [Who It Affects] and costs [Impact — time, money, resources].

Our approach was to [Methodology/Solution]. We chose this because [Rationale].

Here are our key findings:
- Finding 1: [Detail]
- Finding 2: [Detail]  
- Finding 3: [Detail]

The implementation involved [Technical Details]. We used [Tools/Technologies] to build [What You Built].

Results: We achieved [Measurable Outcome]. Compared to the baseline, this represents a [Percentage/Improvement].

Next steps include [Future Plans]. We believe this can be scaled to [Vision].

I'd be happy to take any questions. Thank you for your time.`,
  },
  {
    title: "Thesis Defense Opening",
    category: "thesis_defense",
    language: "en",
    content: `Good morning, esteemed committee members. Thank you for taking the time to evaluate my thesis.

My name is [Your Name], and my thesis is titled "[Thesis Title]", conducted under the supervision of [Advisor Name].

The motivation for this research stems from [Background/Gap in Knowledge]. Despite advances in [Field], the question of [Research Question] remains underexplored.

My research objectives are:
1. To investigate [Objective 1]
2. To analyze [Objective 2]
3. To propose [Objective 3]

The methodology I employed includes [Methods — qualitative, quantitative, mixed]. Data was collected from [Source] using [Instruments/Tools].

Key findings reveal that [Main Finding]. This is significant because [Significance].

The contributions of this thesis include:
- Theoretical: [Contribution to knowledge]
- Practical: [Real-world application]

In conclusion, this research demonstrates that [Conclusion]. I believe it opens new avenues for [Future Research Direction].

I am now ready to address your questions. Thank you.`,
  },
  {
    title: "Public Speech — Motivational",
    category: "public_speech",
    language: "en",
    content: `Good evening, everyone.

Let me ask you something: when was the last time you did something for the first time?

Think about it. Most of us fall into routines — the same morning, the same commute, the same conversations. And there's comfort in that. But growth? Growth lives outside of comfort.

I used to be terrified of speaking in public. My hands would shake. My voice would crack. I avoided it at all costs. But one day, I realized that the things I feared the most were the very things holding me back.

So I made a decision: I would do one thing every week that scared me. Speaking at a meeting. Introducing myself to a stranger. Sharing an idea I wasn't sure about.

And you know what happened? The fear didn't go away — but it got smaller. And my world got bigger.

Here's what I've learned:
- Courage is not the absence of fear. It's the decision that something else matters more.
- Every expert was once a beginner.
- The only failure is not trying.

So my challenge to you tonight is simple: do one thing this week that scares you. One small step outside your comfort zone. You might surprise yourself.

Thank you.`,
  },

  // Bahasa Indonesia
  {
    title: "Perkenalan Diri",
    category: "self_introduction",
    language: "id",
    content: `Selamat pagi, semuanya. Nama saya [Nama Anda], dan saat ini saya [Posisi/Peran Anda] di [Organisasi Anda].

Hari ini, saya ingin berbagi sedikit tentang siapa saya, apa yang memotivasi saya, dan apa yang saya harapkan bisa saya kontribusikan untuk komunitas ini.

Saya selalu memiliki minat yang besar di bidang [Minat/Bidang Anda]. Semuanya dimulai ketika saya [Cerita Singkat]. Sejak saat itu, saya mendedikasikan diri untuk [Apa yang Anda Lakukan].

Beberapa pengalaman penting yang membentuk saya:
- [Pengalaman 1]: Ini mengajarkan saya nilai dari [Pelajaran].
- [Pengalaman 2]: Di sini, saya belajar untuk [Keterampilan].
- [Pengalaman 3]: Ini memberi saya kepercayaan diri untuk [Hasil].

Ke depan, tujuan saya adalah [Tujuan Masa Depan]. Saya percaya bahwa dengan kombinasi yang tepat dari [Nilai-nilai], kita bisa [Visi].

Terima kasih atas kesempatan ini. Saya berharap bisa bekerja sama dan belajar dari pengalaman kalian semua.`,
  },
  {
    title: "Pidato Kelulusan",
    category: "graduation_speech",
    language: "id",
    content: `Yang terhormat para tamu undangan, dosen, keluarga tercinta, dan teman-teman wisudawan — selamat pagi.

Empat tahun yang lalu, kita memasuki institusi ini sebagai orang asing, tidak yakin dengan apa yang menanti di depan. Hari ini, kita berdiri di sini sebagai sarjana — berubah, teruji, dan siap.

Sepanjang perjalanan, kita menghadapi tantangan yang tidak terduga:
- Begadang mempersiapkan ujian yang tampaknya mustahil.
- Tugas kelompok yang menguji kesabaran dan kerja sama kita.
- Momen-momen keraguan personal di mana kita mempertanyakan apakah kita pantas di sini.

Tapi inilah faktanya — kita berhasil. Bukan karena jalannya mudah, tapi karena kita memilih untuk terus melangkah.

Saya ingin berterima kasih kepada dosen-dosen yang percaya pada kita bahkan saat kita tidak percaya pada diri sendiri. Keluarga kita, yang berkorban begitu banyak untuk memberikan kesempatan ini. Dan teman-teman kita, yang menjadi keluarga kedua kita.

Saat kita melangkah ke babak selanjutnya, ingatlah ini: kesuksesan bukan tentang tujuan akhir. Ini tentang keberanian untuk memulai, ketahanan untuk terus maju, dan kebaikan untuk membantu orang lain di sepanjang jalan.

Selamat, Angkatan [Tahun]. Dunia menunggu kita. Mari kita buat lebih baik.

Terima kasih.`,
  },
  {
    title: "Elevator Pitch",
    category: "elevator_pitch",
    language: "id",
    content: `Halo, saya [Nama Anda], dan saya membantu [Target Audiens] menyelesaikan [Masalah] melalui [Solusi Anda].

Faktanya: [Statistik atau Pain Point]. Kebanyakan orang mencoba mengatasinya dengan [Pendekatan Umum], tapi itu sering kali menghasilkan [Keterbatasan].

Di sinilah [Produk/Layanan Anda] hadir. Kami menggunakan [Metode/Teknologi Unik] untuk memberikan [Manfaat Utama] — dan pengguna kami telah melihat [Hasil/Metrik].

Apa yang membuat kami berbeda? Tiga hal:
1. [Pembeda 1] — tidak seperti kompetitor, kami [Keunggulan].
2. [Pembeda 2] — pendekatan kami memastikan [Manfaat].
3. [Pembeda 3] — kami sudah [Traksi/Bukti].

Kami saat ini sedang [Tahap/Apa yang Anda Cari]. Saya ingin membahas lebih lanjut bagaimana kami bisa [Value Proposition untuk Pendengar].

Boleh saya minta kartu nama Anda?`,
  },
  {
    title: "Presentasi Proyek",
    category: "project_presentation",
    language: "id",
    content: `Selamat siang, semuanya. Terima kasih sudah hadir hari ini.

Saya [Nama Anda], dan hari ini saya akan mempresentasikan [Nama Proyek] — sebuah proyek yang dirancang untuk [Tujuan Proyek].

Mari saya mulai dengan masalahnya. Saat ini, [Jelaskan Masalah]. Ini mempengaruhi [Siapa yang Terdampak] dan menghabiskan [Dampak — waktu, uang, sumber daya].

Pendekatan kami adalah [Metodologi/Solusi]. Kami memilih ini karena [Alasan].

Berikut temuan utama kami:
- Temuan 1: [Detail]
- Temuan 2: [Detail]
- Temuan 3: [Detail]

Implementasi melibatkan [Detail Teknis]. Kami menggunakan [Alat/Teknologi] untuk membangun [Apa yang Dibangun].

Hasil: Kami mencapai [Hasil Terukur]. Dibandingkan dengan baseline, ini mewakili [Persentase/Peningkatan].

Langkah selanjutnya mencakup [Rencana Masa Depan]. Kami percaya ini bisa ditingkatkan skala untuk [Visi].

Saya dengan senang hati menjawab pertanyaan. Terima kasih atas waktu Anda.`,
  },
  {
    title: "Pembukaan Sidang Skripsi",
    category: "thesis_defense",
    language: "id",
    content: `Selamat pagi, Bapak dan Ibu dewan penguji yang terhormat. Terima kasih telah meluangkan waktu untuk mengevaluasi skripsi saya.

Nama saya [Nama Anda], dan skripsi saya berjudul "[Judul Skripsi]", yang dilakukan di bawah bimbingan [Nama Pembimbing].

Motivasi penelitian ini berasal dari [Latar Belakang/Celah Pengetahuan]. Meskipun sudah banyak kemajuan di bidang [Bidang], pertanyaan tentang [Pertanyaan Penelitian] masih kurang dieksplorasi.

Tujuan penelitian saya adalah:
1. Menginvestigasi [Tujuan 1]
2. Menganalisis [Tujuan 2]
3. Mengusulkan [Tujuan 3]

Metodologi yang saya gunakan meliputi [Metode — kualitatif, kuantitatif, campuran]. Data dikumpulkan dari [Sumber] menggunakan [Instrumen/Alat].

Temuan utama menunjukkan bahwa [Temuan Utama]. Ini signifikan karena [Signifikansi].

Kontribusi skripsi ini meliputi:
- Teoretis: [Kontribusi terhadap pengetahuan]
- Praktis: [Aplikasi dunia nyata]

Kesimpulannya, penelitian ini menunjukkan bahwa [Kesimpulan]. Saya percaya ini membuka jalan baru untuk [Arah Penelitian Masa Depan].

Saya siap menjawab pertanyaan Bapak dan Ibu. Terima kasih.`,
  },
  {
    title: "Pidato Publik — Motivasi",
    category: "public_speech",
    language: "id",
    content: `Selamat malam, semuanya.

Coba saya tanya: kapan terakhir kali Anda melakukan sesuatu untuk pertama kalinya?

Pikirkan sejenak. Kebanyakan dari kita terjebak dalam rutinitas — pagi yang sama, perjalanan yang sama, percakapan yang sama. Dan ada kenyamanan di situ. Tapi pertumbuhan? Pertumbuhan hidup di luar zona nyaman.

Saya dulu sangat takut berbicara di depan umum. Tangan saya gemetar. Suara saya pecah. Saya menghindarinya habis-habisan. Tapi suatu hari, saya menyadari bahwa hal-hal yang paling saya takuti justru hal-hal yang menahan saya.

Jadi saya membuat keputusan: saya akan melakukan satu hal setiap minggu yang membuat saya takut. Berbicara di rapat. Memperkenalkan diri ke orang asing. Berbagi ide yang belum saya yakin.

Dan tahu apa yang terjadi? Rasa takut tidak hilang — tapi menjadi lebih kecil. Dan dunia saya menjadi lebih besar.

Inilah yang saya pelajari:
- Keberanian bukan tidak adanya rasa takut. Ini adalah keputusan bahwa ada sesuatu yang lebih penting.
- Setiap ahli pernah menjadi pemula.
- Satu-satunya kegagalan adalah tidak mencoba.

Jadi tantangan saya untuk Anda malam ini sederhana: lakukan satu hal minggu ini yang membuat Anda takut. Satu langkah kecil di luar zona nyaman Anda. Anda mungkin akan mengejutkan diri sendiri.

Terima kasih.`,
  },
];

// ─── Learning Articles ──────────────────────────────────────
const learningArticles = [
  // English
  {
    title: "Breathing Techniques for Confidence",
    topic: "breathing",
    language: "en",
    body: `# Breathing Techniques for Confidence

## Why Breathing Matters

Your breath is the foundation of your voice. When you're nervous, your breathing becomes shallow and rapid, which makes your voice sound shaky, weak, or breathless. By learning to control your breathing, you can:

- **Project your voice** more effectively
- **Reduce anxiety** before and during speeches
- **Maintain composure** under pressure
- **Improve vocal quality** and resonance

## The 4-7-8 Technique (Before Your Speech)

This technique activates your parasympathetic nervous system, calming you down naturally:

1. **Inhale** through your nose for **4 seconds**
2. **Hold** your breath for **7 seconds**
3. **Exhale** slowly through your mouth for **8 seconds**
4. Repeat **3-4 times**

Do this 5 minutes before you go on stage. You'll notice your heart rate dropping and your muscles relaxing.

## Diaphragmatic Breathing (During Your Speech)

Most people breathe from their chest, which limits air capacity. Diaphragmatic breathing uses your full lung capacity:

1. Place one hand on your chest, one on your belly
2. Breathe in — your **belly** should expand, not your chest
3. Breathe out — your belly contracts naturally
4. Practice this daily until it becomes automatic

## The Power Pause

Instead of rushing through your speech, use strategic pauses:

- Take a **full breath** between key points
- Use pauses to **emphasize important ideas**
- This gives your audience time to **absorb your message**

## Practice Exercise

Spend 5 minutes daily:
1. Stand tall, feet shoulder-width apart
2. Practice diaphragmatic breathing (2 min)
3. Read a paragraph aloud, pausing at commas and periods to breathe
4. Gradually increase speed while maintaining controlled breathing`,
  },
  {
    title: "How to Open a Presentation",
    topic: "opening",
    language: "en",
    body: `# How to Open a Presentation

## The First 30 Seconds

You have approximately **30 seconds** to capture your audience's attention. The opening of your presentation sets the tone for everything that follows. A strong opening creates curiosity, establishes credibility, and makes people want to listen.

## 6 Powerful Opening Techniques

### 1. Start with a Question
Ask a thought-provoking question that your presentation will answer:
- "What if I told you that 75% of people fear public speaking more than death?"
- "When was the last time you felt truly heard?"

### 2. Tell a Story
Humans are wired for stories. Start with a brief, relevant narrative:
- A personal experience related to your topic
- A case study that illustrates the problem you're solving
- A "day in the life" scenario your audience can relate to

### 3. Share a Surprising Statistic
Data creates urgency when it challenges assumptions:
- "Every year, companies lose $37 billion due to poor communication."
- "The average person speaks 16,000 words per day — but how many are truly impactful?"

### 4. Use a Bold Statement
Make a declarative statement that demands attention:
- "The way we teach public speaking is fundamentally broken."
- "In the next 10 minutes, I'm going to change how you think about presentations."

### 5. Visual Prop or Demo
Show, don't tell. Start with something visual that creates intrigue.

### 6. Quote + Twist
Start with a relevant quote, then add your own perspective:
- "Maya Angelou said, 'People will forget what you said, but they'll never forget how you made them feel.' Today, I want to talk about exactly how to create that feeling."

## What to Avoid

- **Don't apologize**: "Sorry, I'm not very good at this..." undermines your credibility immediately
- **Don't start with "Today I'm going to talk about..."** — it's boring and predictable
- **Don't read your opening** from notes — make eye contact
- **Don't start with a joke** unless you're confident it will land`,
  },
  {
    title: "The Rule of Three in Public Speaking",
    topic: "rule_of_three",
    language: "en",
    body: `# The Rule of Three in Public Speaking

## What is the Rule of Three?

The "Rule of Three" is one of the most powerful principles in communication. It states that ideas presented in groups of three are inherently more **satisfying**, **memorable**, and **persuasive** than other groupings.

Why? Our brains are pattern-seeking machines. Three is the smallest number that creates a pattern.

## Famous Examples

- "Life, Liberty, and the Pursuit of Happiness" — US Declaration of Independence
- "I came, I saw, I conquered" — Julius Caesar
- "Government of the people, by the people, for the people" — Abraham Lincoln
- "Blood, sweat, and tears" — Winston Churchill

## How to Apply It

### In Your Structure
Organize your presentation into three main sections:
1. **The Problem** — Why should the audience care?
2. **The Solution** — What's your approach?
3. **The Impact** — What changes as a result?

### In Your Arguments
Support each point with three pieces of evidence:
- A statistic
- A story
- An expert quote

### In Your Key Messages
Distill your takeaways to three:
- "Remember these three things: [Point 1], [Point 2], and [Point 3]."

### In Your Word Choice
Use tricolons (three parallel phrases):
- "This approach is faster, cheaper, and more effective."
- "We need to think bigger, act bolder, and move faster."

## Practice Exercise

Take your next presentation and:
1. Identify your three main points
2. For each point, prepare three supporting details
3. Write a closing that summarizes in three key takeaways
4. Time yourself — keep the three sections roughly equal in length`,
  },
  {
    title: "Body Language Basics for Speakers",
    topic: "body_language",
    language: "en",
    body: `# Body Language Basics for Speakers

## Why Body Language Matters

Research by Albert Mehrabian suggests that in communication:
- **7%** is the words you say
- **38%** is how you say it (tone, pitch, pace)
- **55%** is body language

Whether or not you agree with the exact numbers, the message is clear: **how you look is as important as what you say**.

## The Five Pillars of Speaker Body Language

### 1. Posture — Own the Stage
- Stand tall with shoulders back and feet shoulder-width apart
- Avoid crossing your arms (it signals defensiveness)
- Lean slightly forward to show engagement
- Don't lock your knees — stay relaxed but alert

### 2. Gestures — Speak with Your Hands
- Use open palm gestures to convey honesty
- Match gesture size to audience size (bigger room = bigger gestures)
- Use the "power sphere" — the space between your waist and shoulders
- Avoid repetitive or nervous gestures (fidgeting, touching face)

### 3. Eye Contact — Connect with Individuals
- Look at one person for 3-5 seconds, then move to another
- Cover all sections of the room (left, center, right)
- Don't stare at one spot or scan rapidly
- In virtual settings: look at the camera lens, not the screen

### 4. Facial Expressions — Show Emotion
- Your face should match your message
- Smile when appropriate — it builds rapport
- Show concern when discussing problems
- Avoid a "stone face" — it disconnects you from the audience

### 5. Movement — Be Purposeful
- Move to different areas of the stage with intention
- Step forward to emphasize important points
- Return to center for main messages
- Avoid pacing or swaying — it's distracting

## Common Mistakes

| Mistake | Fix |
|---|---|
| Hands in pockets | Rest at sides or use purposeful gestures |
| Reading from notes | Use bullet-point cards, glance briefly |
| Turning back to audience | Position screen to the side |
| Clutching podium | Step away, use the full stage |

## Quick Exercise

Record yourself giving a 2-minute speech. Watch it on mute. Can you understand the emotion and emphasis from body language alone? If not, practice exaggerating your gestures until they feel natural on camera.`,
  },
  {
    title: "Managing Stage Fright",
    topic: "stage_fright",
    language: "en",
    body: `# Managing Stage Fright

## It's Normal — Even the Pros Feel It

Stage fright (glossophobia) affects approximately 75% of people. Even seasoned speakers experience nervousness. The goal isn't to eliminate fear — it's to manage and channel it into energy.

## Understanding the Fear Response

When you're about to speak, your body triggers a "fight or flight" response:
- Heart rate increases
- Palms get sweaty
- Mouth goes dry
- Muscles tense up
- Mind goes blank

This is your body preparing for perceived danger. The trick is to reframe this response as **excitement**, not fear. Research shows that saying "I am excited" before a performance actually improves outcomes more than saying "I am calm."

## Pre-Speech Strategies

### Physical Preparation
1. **Exercise** the morning of your speech (even a 10-minute walk helps)
2. **Hydrate** — drink water, avoid caffeine
3. **Warm up your voice** — hum, do tongue twisters
4. **Power pose** for 2 minutes (hands on hips, chest up) — it shifts your hormone balance

### Mental Preparation
1. **Visualize success** — imagine yourself delivering confidently
2. **Reframe the narrative**: "I'm not nervous, I'm excited"
3. **Focus on the audience**: It's about them, not you
4. **Accept imperfection**: No one expects perfection

## During the Speech

### If Your Mind Goes Blank
- **Pause** — the audience won't know you've forgotten anything
- **Repeat your last point** — it buys time and emphasizes the idea
- **Look at your notes** — there's no shame in this
- **Ask the audience a question** — shifts attention temporarily

### If Your Voice Shakes
- **Slow down** — nervousness makes us rush
- **Lower your pitch** slightly — deeper voices sound more confident
- **Breathe** from your diaphragm
- **Ground yourself** — feel your feet on the floor

## Long-Term Strategies

1. **Practice, practice, practice** — familiarity reduces fear
2. **Join a speaking group** (Toastmasters, university clubs)
3. **Start small** — meetings, then small groups, then larger audiences
4. **Record and review** your speeches — you're always better than you think
5. **Celebrate small wins** — every speech you complete is a victory`,
  },
  {
    title: "Eliminating Filler Words",
    topic: "filler_words",
    language: "en",
    body: `# Eliminating Filler Words

## What Are Filler Words?

Filler words are sounds or words we insert when we're thinking, transitioning, or feeling uncertain. Common fillers include:
- "Um", "Uh", "Er"
- "Like", "You know", "So"
- "Basically", "Actually", "Literally"
- "Right?", "OK?", "Yeah?"

## Why They Matter

A few filler words are natural and human. But excessive use:
- **Undermines credibility** — you sound unsure
- **Distracts the audience** — they start counting your "ums"
- **Breaks your rhythm** — disrupts the flow of ideas
- **Wastes time** — in a 10-minute speech, fillers can eat 1-2 minutes

## Why We Use Them

Understanding the cause helps find the cure:
1. **Fear of silence** — we feel uncomfortable with pauses
2. **Thinking out loud** — our mouth moves faster than our brain
3. **Habit** — it becomes automatic over time
4. **Nervousness** — anxiety increases filler frequency

## The Solution: Embrace the Pause

The most powerful tool against filler words is the **strategic pause**. When you feel the urge to say "um":

1. **Stop talking** — close your mouth
2. **Breathe** — take a quick breath
3. **Think** — formulate your next thought
4. **Speak** — deliver a clear, intentional sentence

This feels awkward at first, but to your audience, pauses make you sound **confident and thoughtful**.

## Practice Techniques

### 1. The "Um" Jar
Every time you catch yourself using a filler word in daily conversation, note it. Awareness is the first step.

### 2. Record and Count
Record a 3-minute speech. Listen back and count every filler word. Set a goal to reduce by 50% in your next attempt.

### 3. Slow Down
Most fillers happen because we're speaking too fast. Reduce your pace by 20% and you'll naturally use fewer fillers.

### 4. Script Transitions
Fillers often appear at transitions. Instead of "So, um, moving on..." prepare specific transitions:
- "The second point is..."
- "Now let's look at..."
- "Building on that idea..."

### 5. Practice with MirrAI
Use the real-time filler word counter during practice sessions. Seeing the count increase in real-time creates powerful awareness.`,
  },
  {
    title: "How to Close a Presentation",
    topic: "closing",
    language: "en",
    body: `## How to Close a Presentation

### Why Closings Matter
Audiences remember beginnings and endings far more than the middle of a talk — a phenomenon psychologists call the **serial position effect**. A weak closing can undo an otherwise strong presentation, while a strong one cements your message long after you've left the stage.

### The Four Elements of a Strong Closing

**1. Signal the End**
- Use verbal cues like "As I wrap up..." or "Let me leave you with this..."
- Slow your pace slightly to signal importance
- Avoid abrupt stops that leave the audience unsure if you're finished

**2. Summarize — Don't Introduce**
- Restate your 2-3 key points briefly
- Never introduce new information in the closing
- Keep it short — a summary should take seconds, not minutes

**3. End with Impact**
- **Callback** — return to your opening story or quote to create a sense of closure
- **Call to action** — tell the audience exactly what to do next
- **Rhetorical question** — leave them thinking after you've stopped talking

**4. Land the Last Line**
- Prepare and memorize your final sentence word-for-word
- End on a strong statement, not a trailing thought
- Pause after your last word before stepping back or sitting down

### Common Mistakes

| Mistake | Fix |
|---|---|
| Ending with "That's it" or "I guess that's all" | Prepare a deliberate final line in advance |
| Apologizing for time or content ("Sorry, I'm out of time") | Practice pacing so you finish on schedule |
| Introducing new ideas at the very end | Save new points for the body, not the close |
| Trailing off while gathering notes | Finish speaking, pause, then move |

### Quick Exercise
Write your closing line word-for-word and memorize it. Practice saying it out loud 5 times with a full pause afterward. Notice how the silence after a strong line makes it land harder.`
  },
  {
    title: "Vocal Variety for Confident Speaking",
    topic: "vocal_variety",
    language: "en",
    body: `## Vocal Variety for Confident Speaking

### Why Vocal Variety Matters
A monotone voice is one of the fastest ways to lose an audience, regardless of how strong the content is. Vocal variety keeps listeners engaged and signals confidence, emotion, and emphasis.

### The Four Dimensions of Voice

**1. Pitch — Rise and Fall**
- Raise pitch slightly for questions or excitement
- Lower pitch for serious or authoritative points
- Avoid staying flat across an entire sentence

**2. Pace — Speed Control**
- Slow down on key points so they sink in
- Speed up slightly during stories to build energy
- Insert brief pauses before important statements

**3. Volume — Dynamic Range**
- Lower your volume to draw the audience in during a key moment
- Raise volume for emphasis or excitement
- Avoid speaking at one constant volume throughout

**4. Pauses — The Power of Silence**
- Pause after asking a rhetorical question
- Pause before revealing an important point
- Avoid filling every silence with "um" or "so"

### Common Mistakes

| Mistake | Fix |
|---|---|
| Speaking in a flat, unchanging tone | Practice reading a passage with exaggerated emotion |
| Rushing through the entire talk | Mark pause points directly in your notes |
| Trailing off at the end of sentences | Keep volume steady through the full sentence |
| Fear of silence | Practice counting "one-two" silently during pauses |

### Quick Exercise
Record yourself reading the same paragraph twice: once in a flat monotone, once using pitch, pace, and pauses deliberately. Compare the two recordings — notice how much more engaging the second version sounds.`
  },
  {
    title: "Eye Contact and Audience Connection",
    topic: "eye_contact",
    language: "en",
    body: `## Eye Contact and Audience Connection

### Why Eye Contact Matters
Eye contact builds trust, signals confidence, and makes each audience member feel personally addressed rather than lectured at.

### The Core Techniques

**1. The Lighthouse Method**
- Sweep your gaze evenly across the whole room
- Don't favor one side or only the front rows
- Move like a lighthouse beam — steady and continuous, not darting

**2. Hold, Don't Dart**
- Hold eye contact with one person for 3-5 seconds before moving on
- Complete a full thought while looking at one person
- Avoid scanning too quickly — it reads as nervousness

**3. Zone Coverage for Large Rooms**
- Divide the room into left, center, and right zones
- Pick one representative point in each zone to look at
- Rotate through zones evenly over the course of your talk

**4. Virtual Presentations**
- Look directly into the camera lens, not at faces on screen
- Position your camera at eye level
- Occasionally glance at the gallery to read reactions, then return to the lens

### Common Mistakes

| Mistake | Fix |
|---|---|
| Staring at notes or slides | Use brief glances, memorize key transitions |
| Looking only at one friendly face | Consciously rotate across all zones |
| Rapid scanning across the room | Slow down, hold each point for a few seconds |
| Looking at the screen instead of the camera (virtual) | Tape a small arrow near the lens as a reminder |

### Quick Exercise
Practice your opening 30 seconds in front of a small group or on video. Have them note whether you looked at each zone of the room evenly. Adjust and repeat until the coverage feels balanced.`
  },
  {
    title: "Handling Q&A Sessions",
    topic: "qna",
    language: "en",
    body: `## Handling Q&A Sessions

### Why Q&A Matters
The question-and-answer session is unscripted, which makes it feel risky — but it's also where speakers build the most credibility by thinking on their feet.

### The Four-Step Q&A Framework

**1. Listen Fully**
- Let the person finish their question completely
- Don't interrupt, even if you think you know where it's going
- Take a breath before responding to avoid rushing

**2. Repeat or Paraphrase**
- Repeat the question so the whole room hears it
- Paraphrasing also buys you a few seconds to think
- Confirm you understood correctly before answering

**3. Answer with Structure**
- Lead with your main point, then explain
- Keep answers concise — avoid rambling
- If the question has multiple parts, address them one at a time

**4. Handle Difficult Questions Gracefully**
- Acknowledge the questioner's perspective before responding
- If you don't know the answer, say so honestly and offer to follow up
- Redirect aggressive or off-topic questions politely back to the topic

### Common Mistakes

| Mistake | Fix |
|---|---|
| Making up an answer when unsure | Say "I don't know, but I'll find out" |
| Getting defensive with critical questions | Acknowledge the point calmly before responding |
| Letting one person dominate the session | Politely note time limits and move to others |
| No time limit set in advance | Announce Q&A duration at the start |

### Quick Exercise
Have a colleague ask you 5 unexpected questions about your topic. Practice pausing, paraphrasing, and answering concisely before moving to the next question.`
  },
  {
    title: "Storytelling in Presentations",
    topic: "storytelling",
    language: "en",
    body: `## Storytelling in Presentations

### Why Storytelling Matters
Stories are remembered far longer than facts and figures alone. They create emotional connection and make abstract ideas concrete and memorable.

### The Story Structure

**1. Setup**
- Introduce a relatable character (often yourself or someone the audience can identify with)
- Establish the setting and context quickly
- Keep this part brief — get to the conflict fast

**2. Conflict**
- Introduce the challenge, obstacle, or tension
- Make the stakes clear — what happens if it isn't resolved?
- This is the part that hooks audience attention

**3. Resolution**
- Show how the conflict was resolved
- Connect the resolution directly to your main message
- Let the takeaway feel earned, not stated outright

### Techniques for Stronger Stories
- Use specific, concrete details (names, places, exact moments) instead of vague generalities
- Personal stories create stronger connection than hypothetical examples
- Keep stories short — 1-2 minutes is usually enough for a presentation
- Practice a small set of 2-3 reusable stories that fit different contexts

### Common Mistakes

| Mistake | Fix |
|---|---|
| Story too long or detailed | Trim to only the details that serve the point |
| No clear connection to the message | Explicitly link the resolution to your takeaway |
| Overly generic examples | Use specific names, numbers, and moments |
| Punchline buried or rushed | Slow down and pause before the key moment |

### Quick Exercise
Write down one personal story in three sentences: setup, conflict, resolution. Practice telling it aloud in under 90 seconds, then connect it explicitly to a message you want your audience to remember.`
  },
  {
    title: "Effective Slide Design",
    topic: "slide_design",
    language: "en",
    body: `## Effective Slide Design

### Why Slide Design Matters
Slides should support the speaker, not replace them. Cluttered or text-heavy slides pull attention away from the speaker and turn a presentation into a reading exercise.

### The Core Principles

**1. The 6x6 Rule**
- No more than 6 lines per slide
- No more than 6 words per line
- Use this as a guideline to prevent slide clutter, not a rigid law

**2. One Idea Per Slide**
- Each slide should communicate a single concept
- Split complex ideas across multiple slides rather than cramming them together
- This also makes it easier for you to control pacing

**3. Visuals Over Text**
- Replace long paragraphs with images, icons, or charts
- Use data visualizations instead of raw number tables when possible
- A strong image can replace an entire paragraph of explanation

**4. Contrast and Readability**
- Ensure strong contrast between text and background
- Choose fonts that are legible from the back of the room
- Avoid small font sizes — bigger is almost always safer

**5. Consistency**
- Use the same template, color palette, and font across all slides
- Consistent design signals professionalism and reduces visual distraction
- Align elements (titles, images, logos) in the same position slide to slide

### Common Mistakes

| Mistake | Fix |
|---|---|
| Slides packed with full sentences | Apply the 6x6 rule, move detail to speaker notes |
| Reading directly off the slide | Use slides as visual cues, not a script |
| Inconsistent fonts/colors across slides | Build from a single template |
| Low contrast text (e.g., light gray on white) | Test slides projected on a screen before presenting |

### Quick Exercise
Take one text-heavy slide you've used before and redesign it using only one image or icon and a short headline. Compare how much faster the redesigned version communicates the idea.`
  },


  // Bahasa Indonesia
  {
    title: "Teknik Pernapasan untuk Percaya Diri",
    topic: "breathing",
    language: "id",
    body: `# Teknik Pernapasan untuk Percaya Diri

## Mengapa Pernapasan Penting

Napas Anda adalah fondasi dari suara Anda. Saat Anda gugup, pernapasan menjadi dangkal dan cepat, yang membuat suara Anda terdengar gemetar, lemah, atau terengah-engah. Dengan belajar mengontrol pernapasan, Anda bisa:

- **Memproyeksikan suara** lebih efektif
- **Mengurangi kecemasan** sebelum dan selama pidato
- **Menjaga ketenangan** di bawah tekanan
- **Meningkatkan kualitas vokal** dan resonansi

## Teknik 4-7-8 (Sebelum Pidato)

Teknik ini mengaktifkan sistem saraf parasimpatik, menenangkan Anda secara alami:

1. **Tarik napas** melalui hidung selama **4 detik**
2. **Tahan** napas selama **7 detik**
3. **Hembuskan** perlahan melalui mulut selama **8 detik**
4. Ulangi **3-4 kali**

Lakukan ini 5 menit sebelum Anda naik panggung. Anda akan merasakan detak jantung melambat dan otot-otot rileks.

## Pernapasan Diafragma (Selama Pidato)

Kebanyakan orang bernapas dari dada, yang membatasi kapasitas udara. Pernapasan diafragma menggunakan kapasitas penuh paru-paru:

1. Letakkan satu tangan di dada, satu di perut
2. Tarik napas — **perut** harus mengembang, bukan dada
3. Hembuskan — perut mengecil secara alami
4. Latih ini setiap hari sampai menjadi otomatis

## Jeda yang Kuat

Alih-alih terburu-buru, gunakan jeda strategis:

- Ambil **napas penuh** di antara poin-poin utama
- Gunakan jeda untuk **menekankan ide penting**
- Ini memberi waktu audiens untuk **menyerap pesan Anda**`,
  },
  {
    title: "Cara Membuka Presentasi yang Menarik",
    topic: "opening",
    language: "id",
    body: `# Cara Membuka Presentasi yang Menarik

## 30 Detik Pertama

Anda memiliki sekitar **30 detik** untuk menarik perhatian audiens. Pembukaan presentasi menentukan nada untuk segalanya yang mengikuti. Pembukaan yang kuat menciptakan rasa penasaran, membangun kredibilitas, dan membuat orang ingin mendengarkan.

## 6 Teknik Pembukaan yang Kuat

### 1. Mulai dengan Pertanyaan
Ajukan pertanyaan yang memancing pemikiran:
- "Apa jadinya jika saya bilang 75% orang lebih takut berbicara di depan umum daripada kematian?"
- "Kapan terakhir kali Anda merasa benar-benar didengar?"

### 2. Ceritakan Sebuah Kisah
Manusia terhubung dengan cerita. Mulailah dengan narasi singkat dan relevan:
- Pengalaman pribadi terkait topik Anda
- Studi kasus yang menggambarkan masalah yang Anda pecahkan
- Skenario kehidupan sehari-hari yang bisa dirasakan audiens

### 3. Bagikan Statistik Mengejutkan
Data menciptakan urgensi saat menantang asumsi:
- "Setiap tahun, perusahaan kehilangan $37 miliar karena komunikasi yang buruk."

### 4. Gunakan Pernyataan Berani
Buat pernyataan deklaratif yang menuntut perhatian:
- "Cara kita mengajar public speaking secara fundamental salah."

### 5. Demo Visual
Tunjukkan, jangan hanya ceritakan. Mulai dengan sesuatu visual yang menciptakan rasa ingin tahu.

### 6. Kutipan + Twist
Mulai dengan kutipan relevan, lalu tambahkan perspektif Anda sendiri.

## Yang Harus Dihindari

- **Jangan minta maaf**: "Maaf, saya tidak terlalu pandai..." langsung merusak kredibilitas Anda
- **Jangan mulai dengan "Hari ini saya akan membahas..."** — membosankan dan bisa ditebak
- **Jangan membaca pembukaan** dari catatan — buat kontak mata
- **Jangan mulai dengan lelucon** kecuali Anda yakin akan berhasil`,
  },
  {
    title: "Aturan Tiga dalam Public Speaking",
    topic: "rule_of_three",
    language: "id",
    body: `# Aturan Tiga dalam Public Speaking

## Apa itu Aturan Tiga?

"Aturan Tiga" adalah salah satu prinsip paling kuat dalam komunikasi. Prinsip ini menyatakan bahwa ide yang disajikan dalam kelompok tiga secara inheren lebih **memuaskan**, **mudah diingat**, dan **persuasif** dibandingkan pengelompokan lainnya.

Mengapa? Otak kita adalah mesin pencari pola. Tiga adalah angka terkecil yang membentuk pola.

## Contoh Terkenal

- "Bhinneka Tunggal Ika" — tiga kata, satu bangsa
- "Veni, Vidi, Vici" (Saya datang, saya melihat, saya menaklukkan) — Julius Caesar
- "Cepat, Tepat, Akurat" — prinsip jurnalisme

## Cara Menerapkannya

### Dalam Struktur Presentasi
Bagi presentasi Anda menjadi tiga bagian utama:
1. **Masalah** — Mengapa audiens harus peduli?
2. **Solusi** — Apa pendekatan Anda?
3. **Dampak** — Apa yang berubah sebagai hasilnya?

### Dalam Argumen
Dukung setiap poin dengan tiga bukti:
- Sebuah statistik
- Sebuah cerita
- Kutipan ahli

### Dalam Pesan Utama
Ringkas takeaways menjadi tiga:
- "Ingat tiga hal ini: [Poin 1], [Poin 2], dan [Poin 3]."

## Latihan

Ambil presentasi berikutnya dan:
1. Identifikasi tiga poin utama Anda
2. Untuk setiap poin, siapkan tiga detail pendukung
3. Tulis penutup yang merangkum dalam tiga kesimpulan
4. Ukur waktu — jaga tiga bagian kira-kira sama panjang`,
  },
  {
    title: "Dasar-Dasar Bahasa Tubuh untuk Pembicara",
    topic: "body_language",
    language: "id",
    body: `# Dasar-Dasar Bahasa Tubuh untuk Pembicara

## Mengapa Bahasa Tubuh Penting

Riset oleh Albert Mehrabian menunjukkan bahwa dalam komunikasi:
- **7%** adalah kata-kata yang Anda ucapkan
- **38%** adalah cara Anda mengatakannya (nada, pitch, kecepatan)
- **55%** adalah bahasa tubuh

Pesannya jelas: **penampilan Anda sama pentingnya dengan apa yang Anda katakan**.

## Lima Pilar Bahasa Tubuh Pembicara

### 1. Postur — Kuasai Panggung
- Berdiri tegak dengan bahu ke belakang dan kaki selebar bahu
- Hindari menyilangkan tangan (menandakan sikap defensif)
- Condongkan badan sedikit ke depan untuk menunjukkan keterlibatan

### 2. Gestur — Bicara dengan Tangan
- Gunakan gestur telapak tangan terbuka untuk menunjukkan kejujuran
- Sesuaikan ukuran gestur dengan ukuran audiens
- Gunakan "power sphere" — ruang antara pinggang dan bahu

### 3. Kontak Mata — Terhubung dengan Individu
- Tatap satu orang selama 3-5 detik, lalu pindah ke orang lain
- Jangkau semua bagian ruangan (kiri, tengah, kanan)
- Jangan menatap satu titik atau memindai dengan cepat

### 4. Ekspresi Wajah — Tunjukkan Emosi
- Wajah Anda harus sesuai dengan pesan Anda
- Tersenyum saat tepat — ini membangun hubungan
- Tunjukkan kekhawatiran saat membahas masalah

### 5. Gerakan — Bergerak dengan Tujuan
- Bergerak ke area panggung yang berbeda dengan niat
- Maju selangkah untuk menekankan poin penting
- Kembali ke tengah untuk pesan utama
- Hindari mondar-mandir — ini mengganggu`,
  },
  {
    title: "Mengelola Demam Panggung",
    topic: "stage_fright",
    language: "id",
    body: `# Mengelola Demam Panggung

## Ini Normal — Bahkan Profesional Merasakannya

Demam panggung (glossophobia) mempengaruhi sekitar 75% orang. Bahkan pembicara berpengalaman merasakan gugup. Tujuannya bukan menghilangkan rasa takut — melainkan mengelola dan menyalurkannya menjadi energi.

## Memahami Respons Ketakutan

Saat Anda akan berbicara, tubuh memicu respons "lawan atau lari":
- Detak jantung meningkat
- Telapak tangan berkeringat
- Mulut kering
- Otot menegang
- Pikiran kosong

Ini adalah tubuh Anda bersiap menghadapi bahaya yang dirasakan. Triknya adalah mengubah respons ini dari **ketakutan** menjadi **kegembiraan**.

## Strategi Sebelum Pidato

### Persiapan Fisik
1. **Olahraga** di pagi hari pidato (jalan kaki 10 menit saja membantu)
2. **Hidrasi** — minum air, hindari kafein
3. **Pemanasan suara** — bersenandung, latih tongue twister
4. **Power pose** selama 2 menit (tangan di pinggang, dada tegak)

### Persiapan Mental
1. **Visualisasi sukses** — bayangkan diri Anda tampil percaya diri
2. **Ubah narasi**: "Saya bukan gugup, saya bersemangat"
3. **Fokus pada audiens**: Ini tentang mereka, bukan Anda
4. **Terima ketidaksempurnaan**: Tidak ada yang mengharapkan kesempurnaan

## Selama Pidato

### Jika Pikiran Kosong
- **Jeda** — audiens tidak akan tahu Anda lupa sesuatu
- **Ulangi poin terakhir** — ini memberi waktu dan menekankan ide
- **Lihat catatan** — tidak ada yang salah dengan ini

### Jika Suara Gemetar
- **Perlambat** — gugup membuat kita terburu-buru
- **Turunkan pitch** sedikit — suara lebih dalam terdengar lebih percaya diri
- **Bernapas** dari diafragma
- **Grounding** — rasakan kaki Anda di lantai`,
  },
  {
    title: "Menghilangkan Kata-Kata Pengisi",
    topic: "filler_words",
    language: "id",
    body: `# Menghilangkan Kata-Kata Pengisi

## Apa itu Kata Pengisi?

Kata pengisi adalah suara atau kata yang kita sisipkan saat berpikir, bertransisi, atau merasa tidak yakin. Kata pengisi umum meliputi:
- "Em", "Eh", "Anu"
- "Kayak", "Gitu", "Jadi"
- "Pada dasarnya", "Sebenarnya", "Intinya"
- "Kan?", "Ya?", "Gitu kan?"

## Mengapa Ini Penting

Beberapa kata pengisi itu natural dan manusiawi. Tapi penggunaan berlebihan:
- **Merusak kredibilitas** — Anda terdengar tidak yakin
- **Mengganggu audiens** — mereka mulai menghitung "em" Anda
- **Memutus ritme** — mengganggu aliran ide
- **Membuang waktu** — dalam pidato 10 menit, kata pengisi bisa memakan 1-2 menit

## Solusinya: Peluk Jeda

Alat paling kuat melawan kata pengisi adalah **jeda strategis**. Saat Anda merasa ingin bilang "em":

1. **Berhenti bicara** — tutup mulut
2. **Bernapas** — ambil napas cepat
3. **Berpikir** — formulasikan pikiran berikutnya
4. **Bicara** — sampaikan kalimat yang jelas dan disengaja

Ini terasa canggung awalnya, tapi bagi audiens, jeda membuat Anda terdengar **percaya diri dan bijaksana**.

## Teknik Latihan

### 1. Toples "Em"
Setiap kali Anda menyadari menggunakan kata pengisi dalam percakapan sehari-hari, catat. Kesadaran adalah langkah pertama.

### 2. Rekam dan Hitung
Rekam pidato 3 menit. Dengarkan ulang dan hitung setiap kata pengisi. Tetapkan target pengurangan 50% di percobaan berikutnya.

### 3. Perlambat
Kebanyakan kata pengisi muncul karena kita berbicara terlalu cepat. Kurangi kecepatan 20% dan Anda akan secara natural menggunakan lebih sedikit kata pengisi.

### 4. Skrip Transisi
Kata pengisi sering muncul di transisi. Alih-alih "Jadi, em, lanjut ya..." siapkan transisi spesifik:
- "Poin kedua adalah..."
- "Sekarang mari kita lihat..."
- "Melanjutkan ide tersebut..."

### 5. Latihan dengan MirrAI
Gunakan penghitung kata pengisi real-time selama sesi latihan. Melihat hitungan meningkat secara real-time menciptakan kesadaran yang kuat.`,
  },
];

async function main() {
  console.log("Seeding database...\n");

  // ─── Seed Script Templates ─────────────────────────────────
  console.log("Seeding Script Templates...");
  for (const tpl of scriptTemplates) {
    const existing = await prisma.scriptTemplate.findFirst({
      where: {
        title: tpl.title,
        language: tpl.language,
      },
    });

    if (!existing) {
      await prisma.scriptTemplate.create({ data: tpl });
      console.log(`  Created: ${tpl.title} (${tpl.language})`);
    } else {
      console.log(`  Skipped (exists): ${tpl.title} (${tpl.language})`);
    }
  }

  // ─── Seed Learning Articles ────────────────────────────────
  console.log("\nSeeding Learning Articles...");
  for (const article of learningArticles) {
    const existing = await prisma.learningArticle.findFirst({
      where: {
        title: article.title,
        language: article.language,
      },
    });

    if (!existing) {
      await prisma.learningArticle.create({ data: article });
      console.log(`  Created: ${article.title} (${article.language})`);
    } else {
      console.log(`  Skipped (exists): ${article.title} (${article.language})`);
    }
  }

  console.log("\nSeed completed!");
}

main()
  .catch((e) => {
    console.error("Seed error:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
    await pool.end();
  });
