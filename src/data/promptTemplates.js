export const categories = [
  { id: 'coding', label: 'Coding', icon: '💻', color: '#6366f1', bg: '#eef2ff' },
  { id: 'design', label: 'Design', icon: '🎨', color: '#ec4899', bg: '#fdf2f8' },
  { id: 'ideas', label: 'Ideas', icon: '💡', color: '#f59e0b', bg: '#fffbeb' },
  { id: 'product', label: 'Product Docs', icon: '📋', color: '#10b981', bg: '#ecfdf5' },
]

export const promptConfig = {
  coding: {
    title: 'Coding Prompt Generator',
    description: 'Generate precise prompts for code generation, debugging, refactoring, and more.',
    fields: [
      {
        id: 'language',
        label: 'Programming Language',
        type: 'select',
        options: ['Python', 'JavaScript', 'TypeScript', 'Rust', 'Go', 'Java', 'C++', 'C#', 'Swift', 'Kotlin', 'Ruby', 'PHP'],
      },
      {
        id: 'task',
        label: 'Task Type',
        type: 'select',
        options: ['Write a function', 'Build a REST API', 'Create a class/module', 'Debug & fix code', 'Refactor code', 'Write unit tests', 'Optimize performance', 'Build a CLI tool', 'Create a database schema', 'Implement an algorithm'],
      },
      {
        id: 'framework',
        label: 'Framework / Library',
        type: 'select',
        options: ['None (vanilla)', 'React', 'Next.js', 'Vue.js', 'Node.js / Express', 'FastAPI', 'Django', 'Spring Boot', 'Flutter', 'React Native', '.NET / ASP.NET', 'Laravel'],
      },
      {
        id: 'complexity',
        label: 'Complexity Level',
        type: 'select',
        options: ['Beginner (simple, well-commented)', 'Intermediate (clean, modular)', 'Advanced (production-ready, optimized)', 'Expert (high-performance, edge cases handled)'],
      },
      {
        id: 'description',
        label: 'What should it do?',
        type: 'textarea',
        placeholder: 'e.g. A function that fetches paginated user data from an API and caches results in Redis...',
      },
      {
        id: 'extras',
        label: 'Extra Requirements',
        type: 'checkboxes',
        options: ['Include error handling', 'Add TypeScript types', 'Write JSDoc / docstrings', 'Include unit tests', 'Follow SOLID principles', 'Add input validation', 'Make it async/await'],
      },
    ],
    generate: (vals) => {
      const extras = vals.extras?.length ? `\n\nAdditional requirements:\n${vals.extras.map(e => `- ${e}`).join('\n')}` : ''
      return `You are a senior ${vals.language} engineer with deep expertise in ${vals.framework !== 'None (vanilla)' ? vals.framework : vals.language + ' best practices'}.

Task: ${vals.task}

${vals.description ? `Description:\n${vals.description}\n` : ''}
Skill level of output: ${vals.complexity}

Please provide:
1. Complete, working ${vals.language} code
2. Clear explanation of the approach and key decisions
3. Any important caveats, edge cases, or limitations to be aware of
4. Usage example showing how to call/use the code${extras}

Format the code with proper indentation and follow ${vals.language} community conventions.`
    },
  },

  design: {
    title: 'Design Prompt Generator',
    description: 'Generate detailed prompts for UI/UX, brand design, illustrations, and visual assets.',
    fields: [
      {
        id: 'designType',
        label: 'Design Type',
        type: 'select',
        options: ['UI / Screen design', 'Logo & brand identity', 'Illustration', 'Icon set', 'Landing page', 'Mobile app UI', 'Dashboard / Data viz', 'Social media graphics', 'Email template', 'Presentation / Slide deck'],
      },
      {
        id: 'style',
        label: 'Visual Style',
        type: 'select',
        options: ['Minimal & clean', 'Bold & expressive', 'Modern & tech', 'Playful & friendly', 'Luxury & premium', 'Brutalist', 'Glassmorphism', 'Neumorphism', 'Retro / Vintage', 'Flat design'],
      },
      {
        id: 'palette',
        label: 'Color Palette',
        type: 'select',
        options: ['Monochromatic', 'Cool tones (blues, purples)', 'Warm tones (reds, oranges)', 'Earth tones', 'Vibrant / Neon', 'Pastel', 'Dark / Midnight', 'Black & White', 'Custom — specify below'],
      },
      {
        id: 'platform',
        label: 'Target Platform',
        type: 'select',
        options: ['Web (desktop)', 'Web (mobile-first)', 'iOS app', 'Android app', 'Print', 'Social media', 'TV / Large display'],
      },
      {
        id: 'context',
        label: 'What is being designed?',
        type: 'textarea',
        placeholder: 'e.g. A fintech app dashboard for tracking personal investments. Users are professionals aged 25-45...',
      },
      {
        id: 'extras',
        label: 'Include in Output',
        type: 'checkboxes',
        options: ['Typography recommendations', 'Spacing & grid system', 'Accessibility guidelines (WCAG)', 'Component breakdown', 'Interaction / animation notes', 'Dark mode variant', 'Asset specifications'],
      },
    ],
    generate: (vals) => {
      const extras = vals.extras?.length ? `\n\nAlso include:\n${vals.extras.map(e => `- ${e}`).join('\n')}` : ''
      return `You are an expert UI/UX designer and visual designer specializing in ${vals.style.toLowerCase()} aesthetics.

Design request: ${vals.designType}
Platform: ${vals.platform}
Visual style: ${vals.style}
Color palette direction: ${vals.palette}

${vals.context ? `Context & requirements:\n${vals.context}\n` : ''}
Please provide:
1. Detailed design direction and visual concept description
2. Specific color values (hex codes) and usage guidelines
3. Typography system (font families, sizes, weights, line-heights)
4. Layout structure and key design decisions
5. Component-level design details for the main elements${extras}

Be specific and actionable — describe exactly what the design should look like so a developer or another designer can implement it precisely.`
    },
  },

  ideas: {
    title: 'Ideas Prompt Generator',
    description: 'Spark creative ideas for startups, apps, content, campaigns, and more.',
    fields: [
      {
        id: 'domain',
        label: 'Domain / Area',
        type: 'select',
        options: ['SaaS / Software product', 'Mobile app', 'Content & media', 'E-commerce', 'AI / ML product', 'Social platform', 'Developer tool', 'EdTech / Learning', 'HealthTech', 'FinTech', 'Marketing campaign', 'Open source project'],
      },
      {
        id: 'audience',
        label: 'Target Audience',
        type: 'select',
        options: ['General consumers', 'Developers / Engineers', 'Designers', 'Small businesses', 'Enterprises', 'Students', 'Creators & freelancers', 'Healthcare professionals', 'Educators', 'Investors'],
      },
      {
        id: 'innovation',
        label: 'Innovation Level',
        type: 'select',
        options: ['Incremental (improve existing solutions)', 'Adjacent (apply known tech to new domain)', 'Radical (new-to-world concept)', 'Disruptive (challenge the incumbent model)'],
      },
      {
        id: 'quantity',
        label: 'Number of Ideas',
        type: 'select',
        options: ['3 focused ideas', '5 diverse ideas', '10 rapid ideas', '1 fully developed idea'],
      },
      {
        id: 'context',
        label: 'Problem or Theme to Explore',
        type: 'textarea',
        placeholder: 'e.g. Remote team collaboration is broken. People feel disconnected and async communication creates bottlenecks...',
      },
      {
        id: 'extras',
        label: 'For Each Idea, Include',
        type: 'checkboxes',
        options: ['One-liner pitch', 'Core value proposition', 'Key features (top 3)', 'Monetization model', 'Potential risks / challenges', 'Go-to-market angle', 'Competitive landscape'],
      },
    ],
    generate: (vals) => {
      const extras = vals.extras?.length ? `\n\nFor each idea, provide:\n${vals.extras.map(e => `- ${e}`).join('\n')}` : ''
      return `You are a seasoned product strategist, serial entrepreneur, and creative thinker with a track record of launching successful products.

Generate ${vals.quantity} for the ${vals.domain} space targeting ${vals.audience}.
Innovation approach: ${vals.innovation}

${vals.context ? `Problem / Theme:\n${vals.context}\n` : ''}
Requirements:
- Ideas should be specific, actionable, and grounded in real market needs
- Each idea should have a clear differentiation from existing solutions
- Consider feasibility alongside creativity${extras}

Format each idea clearly with a name and structured breakdown. Be bold and think beyond the obvious.`
    },
  },

  product: {
    title: 'Product Documentation Prompt Generator',
    description: 'Generate prompts for API docs, user guides, technical specs, changelogs, and more.',
    fields: [
      {
        id: 'docType',
        label: 'Document Type',
        type: 'select',
        options: ['API Reference', 'User Guide / Manual', 'Technical Specification', 'Architecture Document', 'README / Getting Started', 'Release Notes / Changelog', 'Runbook / Playbook', 'Data Model / Schema Docs', 'Integration Guide', 'FAQ / Troubleshooting Guide'],
      },
      {
        id: 'audience',
        label: 'Target Audience',
        type: 'select',
        options: ['End users (non-technical)', 'Developers / Engineers', 'DevOps / SRE teams', 'Product managers', 'Executive stakeholders', 'QA / Testers', 'External partners / Integrators'],
      },
      {
        id: 'tone',
        label: 'Tone & Style',
        type: 'select',
        options: ['Formal & precise', 'Friendly & approachable', 'Concise & direct', 'Tutorial-style (step-by-step)', 'Reference-style (scannable)', 'Conversational'],
      },
      {
        id: 'format',
        label: 'Output Format',
        type: 'select',
        options: ['Markdown (.md)', 'Structured prose', 'OpenAPI / Swagger spec', 'Confluence-style', 'README format', 'JSDoc / docstring style'],
      },
      {
        id: 'context',
        label: 'Product / Feature Description',
        type: 'textarea',
        placeholder: 'e.g. A REST API for managing user authentication — supports OAuth 2.0, JWT tokens, MFA, and session management...',
      },
      {
        id: 'extras',
        label: 'Sections to Include',
        type: 'checkboxes',
        options: ['Overview / Introduction', 'Prerequisites & setup', 'Authentication / Authorization', 'Code examples (multiple languages)', 'Error codes & handling', 'Rate limits & quotas', 'Versioning policy', 'Glossary of terms', 'Security considerations'],
      },
    ],
    generate: (vals) => {
      const sections = vals.extras?.length ? `\n\nMust include these sections:\n${vals.extras.map(e => `- ${e}`).join('\n')}` : ''
      return `You are a technical writer with 10+ years of experience creating world-class documentation for developer-facing products.

Write a ${vals.docType} for the following:
${vals.context ? `\n${vals.context}\n` : ''}
Audience: ${vals.audience}
Tone: ${vals.tone}
Format: ${vals.format}

Documentation requirements:
- Be thorough, accurate, and unambiguous
- Use clear headings and logical information hierarchy
- Include concrete, copy-paste-ready examples
- Anticipate common questions and edge cases
- Follow documentation best practices for ${vals.docType}${sections}

Produce complete, publication-ready documentation that requires minimal editing.`
    },
  },
}

export const learnContent = [
  {
    id: 'basics',
    icon: '🧱',
    title: 'Prompt Fundamentals',
    color: '#6366f1',
    lessons: [
      {
        title: 'What is a Prompt?',
        content: `A prompt is the input you give to an AI model to get a desired output. Think of it as instructions to a highly capable assistant who needs clear direction.

**Key components of a prompt:**
- **Context** — Background information the AI needs
- **Task** — What you want it to do
- **Format** — How you want the response structured
- **Constraints** — Limits or rules to follow

**Poor prompt:** "Write code"
**Better prompt:** "Write a Python function that validates email addresses using regex, handles edge cases, and includes docstrings."`,
      },
      {
        title: 'The Anatomy of a Great Prompt',
        content: `Great prompts follow a structure. Here's a proven template:

**[ROLE] + [CONTEXT] + [TASK] + [FORMAT] + [CONSTRAINTS]**

**Example:**
> You are a senior React developer. I have a slow-loading dashboard that re-renders too often. Refactor this component to use useMemo and useCallback appropriately. Return the full updated component with inline comments explaining each optimization.

Breaking it down:
- Role: "senior React developer"
- Context: "slow-loading dashboard, re-renders too often"
- Task: "Refactor using useMemo and useCallback"
- Format: "full component with inline comments"`,
      },
    ],
  },
  {
    id: 'techniques',
    icon: '⚡',
    title: 'Core Techniques',
    color: '#10b981',
    lessons: [
      {
        title: 'Zero-Shot vs Few-Shot',
        content: `**Zero-Shot:** Ask the model to do something without examples.
> "Classify this review as positive, negative, or neutral: 'The product arrived late but works great.'"

**Few-Shot:** Provide examples to guide the output format and style.
> "Classify these reviews:
> 'Great product!' → positive
> 'Terrible experience' → negative
> 'It works fine' → neutral
> Now classify: 'The product arrived late but works great.'"

Few-shot is powerful when you need consistent output formatting.`,
      },
      {
        title: 'Chain-of-Thought (CoT)',
        content: `Asking the model to "think step by step" dramatically improves accuracy on reasoning tasks.

**Without CoT:**
> "What is 17 × 24 + 89?"

**With CoT:**
> "What is 17 × 24 + 89? Think through this step by step."

CoT works because it forces the model to decompose the problem rather than guessing the final answer.

**Best for:** Math, logic, debugging, complex analysis, multi-step planning.`,
      },
      {
        title: 'Role Prompting',
        content: `Assigning a role to the AI dramatically shifts its response quality and style.

**Without role:**
> "Review my code"

**With role:**
> "You are a principal engineer at a FAANG company conducting a code review. Focus on: performance bottlenecks, security vulnerabilities, and maintainability. Be direct and specific."

The role primes the model to use relevant domain knowledge, vocabulary, and standards appropriate to that perspective.`,
      },
    ],
  },
  {
    id: 'advanced',
    icon: '🚀',
    title: 'Advanced Strategies',
    color: '#f59e0b',
    lessons: [
      {
        title: 'Prompt Chaining',
        content: `Break complex tasks into a sequence of simpler prompts where the output of one becomes the input of the next.

**Example pipeline for writing a feature:**
1. "List the edge cases for a user authentication system"
2. "For each edge case listed, write a test case description"
3. "Now write the implementation that passes all these test cases"

Chaining prevents the model from being overwhelmed and gives you checkpoints to verify quality along the way.`,
      },
      {
        title: 'Structured Output',
        content: `Force the model to return data in a predictable format by specifying the exact structure.

**Prompt:**
> "Analyze this function and return a JSON object with this exact structure:
> {"complexity": "low|medium|high", "issues": ["..."], "suggestions": ["..."], "score": 0-10}"

**Benefits:**
- Easy to parse programmatically
- Consistent response shape
- Less post-processing needed

Works with JSON, CSV, markdown tables, XML, or any custom format.`,
      },
      {
        title: 'Self-Consistency & Verification',
        content: `Ask the model to verify or critique its own output for higher quality results.

**Technique 1 — Ask for alternatives:**
> "Give me 3 different approaches to solve this, then recommend the best one with reasoning."

**Technique 2 — Critique loop:**
> First prompt: "Write a function to do X"
> Second prompt: "Review the function above. List any bugs, edge cases missed, or improvements. Then write the improved version."

This two-pass approach catches errors the first pass missed.`,
      },
    ],
  },
  {
    id: 'tips',
    icon: '✨',
    title: 'Pro Tips & Patterns',
    color: '#ec4899',
    lessons: [
      {
        title: 'Be Specific About Format',
        content: `Vague prompts get vague responses. Specify exactly what you want.

**Instead of:** "Explain React hooks"
**Use:** "Explain React hooks in 3 bullet points, each under 20 words, targeting a developer who knows JavaScript but is new to React."

**Format control phrases:**
- "In exactly N bullet points..."
- "Return only the code, no explanation"
- "Use a table with columns: X, Y, Z"
- "Keep the response under 200 words"
- "Use markdown headers for each section"`,
      },
      {
        title: 'The "No" Pattern',
        content: `Telling the model what NOT to do is just as important as what to do.

**Examples:**
- "Do not include boilerplate setup code"
- "Don't use external libraries — vanilla JS only"
- "Don't repeat the question, just answer directly"
- "Avoid jargon — the reader is non-technical"
- "Don't add placeholder comments like // TODO"

The "no" pattern prevents the model from filling responses with filler content you'll need to clean up.`,
      },
      {
        title: 'Iterative Refinement',
        content: `Treat prompting as a conversation, not a one-shot request. Iterate!

**Refinement strategies:**
1. **Narrow scope:** "Make the explanation shorter and more technical"
2. **Add constraints:** "The previous solution won't work in Python 3.8 — rewrite for compatibility"
3. **Request alternatives:** "I don't like that approach, suggest a different pattern"
4. **Ask to explain:** "Explain why you chose that data structure"

Each follow-up gives the model context to improve. The best prompts often come from 3-4 rounds of refinement.`,
      },
    ],
  },
]
