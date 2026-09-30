# Hardware Design Skill

This skill generates a professional hardware/IoT project showcase page with AI-generated images covering the product concept, design prototype, use cases, and technical architecture. It registers the project in the root portfolio index and pushes to GitHub.

## Input

- `hardware_description`: A detailed description of the hardware/IoT project to design

## Prompt

Create a professional, high-quality hardware project showcase page for the following idea, using AI-generated images to illustrate every aspect of the project. Register it in the portfolio and push to GitHub.

{{hardware_description}}

Follow these steps in order:

### Step 1: Generate Project Images via API

Call the image generation API to create professional images for the project. Use `curl` to call the API:

```bash
curl -X POST https://cm-idea-assistant.vercel.app/api/generate-all \
  -H "Content-Type: application/json" \
  -d '{
    "project_description": "<INSERT_PROJECT_DESCRIPTION_HERE>"
  }'
```

The API returns a JSON response containing image URLs organized by category. Parse the response to extract all image URLs. The images will be hosted on `cm-idea-images.s3.us-west-1.amazonaws.com`.

**Expected image categories from the API:**
- `product-concept`: Overall concept visualization of the hardware product (1-2 images)
- `design-prototype`: Physical product renders showing the device from different angles (2-3 images)
- `use-cases`: Real-world scenarios showing the product in action (4 images)
- `problem-background`: Images illustrating the problem being solved (2 images)
- `technical-diagram`: System architecture or technical design visualization (1-2 images)

Save the API response for reference, then use the returned image URLs in the HTML page.

### Step 2: Create the Project Folder and Showcase Page

1. Create a new folder in the project root with a descriptive snake_case name for the project.
2. Create an `index.html` file that serves as the main showcase page.
3. Also create an `index_zh.html` file with Chinese translations.

### Step 3: Design the Showcase Page (index.html)

Build a single-page professional showcase using HTML + Tailwind CSS (via CDN) + FontAwesome 6.4.0 (via CDN) + Google Fonts (Inter, Noto Sans SC).

The page MUST include ALL of the following sections, using the AI-generated images throughout:

#### 3.1 HERO HEADER
- Project logo/icon (FontAwesome icon in a gradient rounded box)
- Project name as main title (text-4xl or text-5xl, font-bold)
- One-line description as subtitle
- 3 relevant major/field tags with icons (colored pills/badges)
- Language switcher (EN / 中文) in top-right corner

#### 3.2 PROBLEM STATEMENT
- Section tag: "The Problem"
- Compelling problem statement title
- Description paragraph with bold emphasis on key phrases
- **2 AI-generated problem-background images** in a 2-column grid, each with a caption card below
- 3 statistics cards with large numbers, explanations, and source links (use REAL verifiable data)

#### 3.3 SOCIAL IMPACT
- Section tag: "Social Impact"
- Title: "Why This Matters Now"
- 4 impact cards in a 2x2 grid, each with: icon, title, description with bold stats, and source link
- Research and cite REAL data with actual URLs

#### 3.4 PRODUCT CONCEPT
- Section tag: "Product Vision"
- Title: "The [Product Name]"
- **1-2 AI-generated product-concept images** displayed full-width in rounded frames with shadow and caption
- Below the image(s), a brief description of the core product vision
- Key feature highlights (3-4 items) with icons

#### 3.5 DESIGN PROTOTYPE
- Section tag: "Industrial Design"
- Title: "Design Prototype"
- **2-3 AI-generated design-prototype images** showing the physical product
- Display in a grid layout (full-width hero + 2-column detail views, similar to game-design screenshot layout)
- Each image has a descriptive caption below
- Below the images, a component/specs list:
  - Key components with names, descriptions, and approximate costs
  - Hardware feature tags (e.g., "Arduino-compatible", "WiFi-enabled", "Low power", "Waterproof")
  - Total estimated cost per unit

#### 3.6 USE CASES
- Section tag: "See It Work"
- Title: "Project in Action"
- Subtitle describing real-world scenarios
- **4 AI-generated use-case images** in a 2x2 grid
- Each use case card has: image (h-52 object-cover), title (font-semibold), and description paragraph

#### 3.7 SYSTEM ARCHITECTURE
- Section tag: "Technical Overview"
- Title: "System Architecture"
- **1-2 AI-generated technical-diagram images** displayed full-width with caption
- Below the image, an SVG architecture diagram showing:
  - 3 main layers (e.g., Hardware Sensors → AI Processing → User Output)
  - Data flow arrows between layers
  - Sub-components within each layer
  - Color-coded legend

#### 3.8 GROWTH PATH
- Section tag: "Growth Path"
- Title: "From Prototype to Product"
- 3 numbered steps in a 3-column grid, each with:
  - Step number in colored circle
  - Action title
  - Description (2-3 sentences)

#### 3.9 COMMUNITY INITIATIVE (Non-Profit)
- Section tag: "Community Initiative"
- A related non-profit/community initiative name and description
- Mission statement in a gradient card
- 3 community activity cards with icons, titles, and descriptions

#### 3.10 YOUR JOURNEY
- Section tag: "Your Journey"
- Title: "From Passion to Purpose"
- Timeline with 4 stages (Foundation → Observation → Insight → Innovation)
- Each stage has: colored circle icon, stage title, and first-person quote

#### 3.11 FOOTER
- Project name with icon
- Tagline
- "A student-led [topic] initiative"

### Step 4: Design Specifications

**Image Display Styles:**
```css
/* For concept/prototype images - use screenshot-frame style */
.screenshot-frame {
    border-radius: 16px;
    overflow: hidden;
    box-shadow: 0 25px 60px rgba(0,0,0,0.2), 0 0 0 1px rgba(0,0,0,0.05);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
}
.screenshot-frame:hover {
    transform: translateY(-4px);
    box-shadow: 0 35px 80px rgba(0,0,0,0.25), 0 0 0 1px rgba(0,0,0,0.08);
}

/* For use-case/problem images - use card style */
.rounded-2xl overflow-hidden shadow-lg bg-white
```

**Layout:**
- Max content width: max-w-4xl to max-w-5xl
- Section padding: py-12 px-8
- Alternating section backgrounds: white and bg-gray-50
- Section dividers: `<div class="section-divider">` with gradient line

**Typography:**
- Font: Inter (English), Noto Sans SC (Chinese)
- Headings: Bold, text-2xl to text-5xl
- Section tags: text-xs uppercase tracking-wider in colored rounded-full badges

**Components:**
- Cards: rounded-2xl, shadow-sm, border border-gray-100
- Tags/Badges: rounded-full, px-3 py-1
- Icons: FontAwesome 6.4.0

### Step 5: Create Chinese Version (index_zh.html)

Create a complete Chinese translation of the showcase page:
- Translate all text content naturally
- Convert currency to ¥ (multiply USD by ~7)
- Keep technical terms commonly used in English (API, WiFi, AI, IoT, etc.)
- Language switcher should link back to English version

### Step 6: Add Entry to Root index.html

Read the root `index.html` to find the last `<tr class="row-hover ...">` entry inside `<tbody>`. Determine the last entry number (N). Then insert a new row **before** the `</tbody>` tag with entry number N+1, following this exact format:

```html
                    <!-- N+1. App Display Name -->
                    <tr class="row-hover border-b border-gray-100">
                        <td class="px-6 py-4 text-sm text-gray-400 font-medium">N+1</td>
                        <td class="px-6 py-4">
                            <div class="flex items-center gap-3">
                                <div class="w-10 h-10 bg-gradient-to-br from-COLOR1 to-COLOR2 rounded-xl flex items-center justify-center flex-shrink-0">
                                    <i class="fas fa-ICON text-white"></i>
                                </div>
                                <div>
                                    <div class="flex items-center gap-2">
                                        <span class="font-semibold text-gray-900">App Display Name</span>
                                        <span class="text-xs bg-green-100 text-green-600 px-2 py-0.5 rounded-full font-medium">New</span>
                                    </div>
                                    <span class="text-xs text-gray-400">folder_name</span>
                                </div>
                            </div>
                        </td>
                        <td class="px-6 py-4 text-sm text-gray-600">One-line description of the project</td>
                        <td class="px-6 py-4">
                            <div class="flex flex-wrap gap-1">
                                <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Tag1</span>
                                <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Tag2</span>
                                <span class="text-xs bg-gray-100 text-gray-600 px-2 py-0.5 rounded">Tag3</span>
                            </div>
                        </td>
                        <td class="px-6 py-4">
                            <a href="folder_name/index.html" class="text-indigo-600 hover:text-indigo-800 text-sm font-medium">View <i class="fas fa-arrow-right ml-1"></i></a>
                        </td>
                    </tr>
```

Replace placeholders with actual project details.

### Step 7: Commit and Push to GitHub

1. Stage the new project folder and modified root `index.html`:
   ```
   git add folder_name/ index.html
   ```
2. Commit with a descriptive message:
   ```
   Add ProjectName - short description with AI-generated hardware design images
   ```
3. Push to the remote repository:
   ```
   git push
   ```
