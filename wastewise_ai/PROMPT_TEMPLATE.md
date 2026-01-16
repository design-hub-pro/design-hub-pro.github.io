# Project Showcase Page - Prompt Template

Use this template to generate a professional project showcase page for student recruitment. Copy and fill in the bracketed sections with your project details.

---

## PROMPT START

Please create a professional, high-quality project showcase page for recruiting students to work on a tech project. The page should be designed to impress students and convince them this is a worthwhile project to pursue.

### Project Information

**Project Name:** [PROJECT_NAME]

**One-line Description:** [Brief description of what the project does - 1-2 sentences]

**Project Concept:** [Detailed description of the project - 3-5 sentences explaining the core idea, how it works, and what problem it solves]

**Target Majors:** [List 2-3 relevant academic majors, e.g., "Computer Science, Environmental Engineering, Data Science"]

**Student Background:** [Describe the ideal student's interests and background, e.g., "interested in sustainability, has volunteering experience, involved in community service, robotics club member"]

---

### Page Structure Requirements

Create the following sections in order:

#### 1. HERO HEADER
- Project logo/icon (use appropriate FontAwesome icon)
- Project name as main title
- One-line description as subtitle
- 3 major/field tags with icons (colored pills/badges)
- Language switcher (EN / 中文) in top-right corner

#### 2. PROBLEM STATEMENT SECTION
- Section tag: "The Problem" / "核心问题"
- Title: [A compelling problem statement title]
- Description paragraph explaining the problem (2-3 sentences with bold emphasis on key phrases)
- 3 statistics cards with:
  - Large number/percentage
  - Brief explanation of what the statistic means
  - Use real, verifiable data

#### 3. SOCIAL IMPACT SECTION
- Section tag: "Social Impact" / "社会影响"
- Title: "Why This Matters Now" / "为什么现在很重要"
- 4 impact cards in 2x2 grid, each containing:
  - Icon in colored rounded box
  - Title (3-5 words)
  - Description with bold statistics (2-3 sentences)
  - Source link with external link icon
- Research and cite REAL data, facts, and news with actual URLs

#### 4. MOBILE APP PROTOTYPE SECTION
- Section tag: "Product Design" / "产品设计"
- Title: "Mobile App Prototype" / "移动应用原型"
- 5 iPhone mockups displayed horizontally showing:
  - Home screen
  - Main feature screen 1
  - Main feature screen 2
  - Main feature screen 3
  - Profile/Settings screen
- Screen labels below each mockup

#### 5. HARDWARE DESIGN SECTION (if applicable)
- Section tag: "Hardware Design" / "硬件设计"
- Title: [Hardware component name]
- SVG diagram showing:
  - Cross-section or exploded view of hardware
  - Labeled components
  - Key components list with:
    - Component name
    - Brief description
    - Approximate cost
  - Data flow diagram
  - Total cost per unit
- Hardware feature tags at bottom (e.g., "Arduino-compatible", "WiFi-enabled", "Low power")

#### 6. SYSTEM ARCHITECTURE SECTION
- Section tag: "Technical Overview" / "技术概览"
- Title: "System Architecture" / "系统架构"
- SVG diagram showing:
  - 3 main layers/components (e.g., Hardware → Cloud → Mobile)
  - Data flow arrows with labels
  - Sub-components within each layer
  - Feedback loop if applicable
- Legend explaining color coding

#### 7. GROWTH PATH SECTION
- Section tag: "Growth Path" / "成长路径"
- Title: "From 1 to 100" / "从1到100"
- 3 numbered steps, each containing:
  - Step number in colored circle
  - Action title (specific and actionable)
  - Description explaining how to do it (2-3 sentences)
- Steps should be:
  1. First deployment opportunity (e.g., school, local organization)
  2. Second deployment opportunity (e.g., local business, apartment complex)
  3. Community/public presentation opportunity

#### 8. YOUR JOURNEY SECTION
- Section tag: "Your Journey" / "你的旅程"
- Title: "From Passion to Purpose" / "从热情到使命"
- Subtitle explaining the connection to student's background
- Timeline with 4 stages showing narrative arc:
  1. **Foundation** - Initial interest/awareness (seedling icon, green)
  2. **Service** - Community involvement (hands-helping icon, amber)
  3. **Insight** - Problem discovery (lightbulb icon, blue)
  4. **Innovation** - Project creation (rocket icon, purple)
- Each stage has:
  - Circular icon badge
  - Stage title
  - Quote-style description in first person

#### 9. FOOTER
- Project name with tagline
- "Designed for students passionate about [topic] and technology"

---

### Design Specifications

**Color Scheme:**
- Primary: Green/Emerald (#22c55e, #10b981) for environmental/positive themes
- Secondary: Blue (#3b82f6) for technology/data
- Accent: Purple (#8b5cf6) for AI/innovation
- Warning/Alert: Amber (#f59e0b)
- Error/Problem: Red (#ef4444)
- Neutral: Gray (#374151, #6b7280)

**Typography:**
- Font: Inter for English, Noto Sans SC for Chinese
- Headings: Bold, text-2xl to text-4xl
- Body: Regular, text-sm to text-base
- Labels/Tags: Semibold, text-xs uppercase tracking-wider

**Components:**
- Cards: rounded-2xl, shadow-sm, border border-gray-100
- Tags/Badges: rounded-full, px-3 py-1, colored background
- Buttons: rounded-xl or rounded-full
- Icons: FontAwesome 6.4.0
- Phone mockups: 280px wide, 605px tall, rounded-40px with device frame

**Layout:**
- Max content width: max-w-4xl to max-w-5xl
- Section padding: py-12 px-8
- Alternating section backgrounds: white and bg-gray-50

---

### Technical Requirements

1. **Framework:** HTML + Tailwind CSS (via CDN)
2. **Icons:** FontAwesome 6.4.0 (via CDN)
3. **Fonts:** Google Fonts (Inter, Noto Sans SC)
4. **Diagrams:** Inline SVG for all technical diagrams
5. **Images:** Use Unsplash for any real photos
6. **File Structure:**
   - `index.html` - English version
   - `index_zh.html` - Chinese version
   - `home.html` - App home screen
   - `[feature1].html` - App feature screens
   - `[feature2].html` - App feature screens
   - `profile.html` - App profile screen

---

### Research Requirements

Before creating the page, research and find:
1. 3 compelling statistics about the problem (with sources)
2. 4 social impact data points with real URLs
3. Market size/growth data if applicable
4. Any relevant policy or regulation information
5. Recent news or studies about the problem

---

### Mobile App Screens to Create

Create 5 mobile app screens:

1. **Home Screen**
   - Status bar (time, signal, wifi, battery)
   - User greeting with profile photo
   - Main score/status card with gradient background
   - 2 quick stats cards
   - List of 3-4 main items with status indicators
   - Bottom tab bar (5 tabs)

2. **Analytics/Data Screen**
   - AI/ML classification status badge
   - Time period selector (Day/Week/Month/Year)
   - Bar chart or line graph visualization
   - Breakdown/distribution view with progress bars
   - AI insight card

3. **Community/Social Screen**
   - User's community highlight card
   - Filter tags (All/Type1/Type2)
   - Leaderboard with 5 ranked items
   - User's position highlighted

4. **Feedback/Activity Screen**
   - Today's summary with 3 stats
   - Recent feedback list with:
     - Success items (green check)
     - Tips/suggestions (amber lightbulb)
     - Achievements (purple trophy)

5. **Profile Screen**
   - Profile photo and user info
   - 3-column stats grid
   - Horizontal scrolling achievements
   - Settings menu items with icons

---

### Output

Generate:
1. Complete `index.html` with all sections
2. Complete `index_zh.html` with Chinese translations
3. All 5 mobile app screen HTML files
4. Ensure all files are production-ready and professional quality

---

## PROMPT END

---

## Example Usage

Replace the bracketed sections above with your project details. For example:

```
**Project Name:** AquaSense AI

**One-line Description:** AI-powered water quality monitoring system using IoT sensors to detect contamination in real-time.

**Project Concept:** AquaSense AI deploys low-cost water quality sensors in community water sources to continuously monitor pH, turbidity, and chemical levels. The AI analyzes patterns to predict contamination events before they become health hazards, sending alerts to residents and local authorities via a mobile app.

**Target Majors:** Environmental Engineering, Chemistry, Computer Science

**Student Background:** interested in water conservation, has experience with science olympiad, involved in environmental club, concerned about clean water access
```

---

## Customization Notes

### For Different Project Types:

**Hardware + Software Projects:**
- Include Hardware Design section
- Show physical components and costs
- Include assembly/data flow diagrams

**Software-Only Projects:**
- Skip Hardware Design section
- Expand System Architecture section
- Add more detail to app screens

**Research/Analysis Projects:**
- Emphasize data visualization in app screens
- Include methodology in System Architecture
- Focus on insights/findings in Social Impact

### Adjusting the Narrative Arc:

Customize the 4 stages based on student background:
- **Environmental focus:** Nature → Conservation → Discovery → Innovation
- **Health focus:** Personal experience → Volunteering → Research → Solution
- **Education focus:** Learning → Teaching → Gap identification → Technology
- **Community focus:** Neighborhood → Service → Problem → Platform

### Language Considerations:

For Chinese version:
- Translate all text content
- Convert currency to ¥ (roughly multiply USD by 7)
- Adjust idioms and phrases for natural Chinese
- Keep technical terms that are commonly used in English (e.g., API, WiFi, AI)
