# Web Design Skill

This skill generates high-fidelity web application prototypes ready for YC investor demos, registers them in the root portfolio index, and pushes to GitHub.

## Input

- `web_description`: A detailed description of the web application to design

## Prompt

Build a complete high-fidelity web app prototype for the following idea, register it in the portfolio, and push to GitHub.

{{web_description}}

Follow these steps in order:

### Step 1: Create the Web App Prototype

1. Create a new folder in the project root with a descriptive snake_case name for the app.
2. Analyze the app's main functions and user needs. Determine the core interaction logic.
3. As a product manager, define 5-7 key interfaces and ensure the information architecture is reasonable.
4. As a UI designer, design interfaces that closely follow real Chrome Browser Web design specifications, using modern UI elements for excellent visual experience.
5. Use HTML + Tailwind CSS to generate all prototype interfaces, and use FontAwesome to make the interfaces polished.
6. The design must reach a professional level suitable for presenting to YC Investors.
7. Split code files to maintain clear structure. Each interface should be stored as an independent HTML file (e.g., dashboard.html, settings.html, profile.html).
8. Use real UI images from Unsplash or Pexels, not placeholder images.
9. Keep interfaces clean and concise — focus on core functionality, avoid excessive detail.

### Step 2: Create the App's index.html

Create an `index.html` in the app folder that serves as the main entry point:
- Do NOT write all interface HTML inline. Instead, use `<iframe>` to embed each page.
- Display all pages vertically, one per row.
- Each section should have:
  - A label with the page name, icon, and short description.
  - An "Open in New Tab" button (`target="_blank"`) linking to the standalone HTML file.
- Include a hero header at the top with the app name, tagline, and 2-3 key value propositions.

### Step 3: Add Entry to Root index.html

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
                        <td class="px-6 py-4 text-sm text-gray-600">One-line description of the app</td>
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

Replace:
- `N+1` with the next sequential number
- `App Display Name` with the app's display name
- `folder_name` with the actual folder name
- `fa-ICON` with a relevant FontAwesome icon
- `from-COLOR1 to-COLOR2` with appropriate Tailwind gradient colors
- Tags with 2-3 relevant category tags
- Description with a concise one-liner

### Step 4: Commit and Push to GitHub

1. Stage only the new app folder and the modified root `index.html`:
   ```
   git add folder_name/ index.html
   ```
2. Commit with a descriptive message following the project's convention:
   ```
   Add AppName - short description of what the app does
   ```
3. Push to the remote repository:
   ```
   git push
   ```
