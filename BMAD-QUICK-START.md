# BMAD-METHOD Quick Start Guide

A quick reference guide for getting started with BMAD-METHOD v6 Alpha in your PM-Winston project.

## 📋 Table of Contents

- [After Installation](#after-installation)
- [Loading Agents](#loading-agents)
- [Running Workflows](#running-workflows)
- [Three Planning Tracks](#three-planning-tracks)
- [Common Workflows](#common-workflows)
- [Tips & Tricks](#tips--tricks)
- [Getting Help](#getting-help)

---

## After Installation

Once BMAD is installed, you'll have a `bmad/` folder in your project with:

```
bmad/
├── core/         # Core framework + BMad Master agent
├── bmm/          # BMad Method (12 agents, 34 workflows)
├── bmb/          # BMad Builder (1 agent, 7 workflows)
├── cis/          # Creative Intelligence (5 agents, 5 workflows)
└── _cfg/         # Your customizations (survives updates)
```

---

## Loading Agents

### In Cursor IDE

1. **Open Cursor** and navigate to your project
2. **Open the chat/command palette** (usually `Cmd+L` or `Cmd+K`)
3. **Reference an agent** using:
   ```
   @bmad/bmm/agents/pm
   ```
   or
   ```
   @bmad/core/agents/bmad-master
   ```

4. **Available Agents:**
   - **BMM Module:**
     - `@bmad/bmm/agents/pm` - Product Manager
     - `@bmad/bmm/agents/analyst` - Business Analyst
     - `@bmad/bmm/agents/architect` - Solution Architect
     - `@bmad/bmm/agents/sm` - Scrum Master
     - `@bmad/bmm/agents/dev` - Developer
     - `@bmad/bmm/agents/tea` - Test Architect
     - `@bmad/bmm/agents/ux-designer` - UX Designer
     - `@bmad/bmm/agents/tech-writer` - Technical Writer
   
   - **Core:**
     - `@bmad/core/agents/bmad-master` - Master orchestrator

5. **After loading**, the agent will show you a menu of available workflows

---

## Running Workflows

### Method 1: Agent Menu (Recommended for Beginners)

1. Load an agent (see above)
2. Wait for the menu to appear
3. Tell the agent what to run:
   - Natural language: "Run workflow-init"
   - Shortcut: `*workflow-init`
   - Menu number: "Run option 2"

### Method 2: Direct Slash Commands

Execute workflows directly using slash commands:

```
/bmad:bmm:workflows:workflow-init
/bmad:bmm:workflows:prd
/bmad:bmm:workflows:dev-story
```

**Note:** Slash command format may vary by IDE. In Cursor, check the `.cursor/rules/` directory for the exact syntax.

### Method 3: Party Mode

Run workflows with multi-agent collaboration:

1. Start party mode: `/bmad:core:workflows:party-mode`
2. Execute any workflow - the entire team collaborates
3. Get diverse perspectives from multiple specialized agents

---

## Three Planning Tracks

BMAD automatically adapts to your project scale:

### ⚡ Quick Flow Track
**For:** Bug fixes, small features, rapid prototyping

- Minimal planning (tech-spec only)
- Fast implementation
- **Workflow:** `*quick-spec` → `*dev-story` → implement

### 📋 BMad Method Track
**For:** Products, platforms, complex features

- Complete planning (PRD + Architecture + UX)
- Story-centric implementation
- **Workflow:** `*workflow-init` → `*prd` → `*architecture` → `*dev-story`

### 🏢 Enterprise Method Track
**For:** Enterprise requirements, compliance

- Extended planning (BMad Method + Security/DevOps/Test)
- Comprehensive documentation
- **Workflow:** Full BMad Method + security/DevOps workflows

**Not sure which track?** Run `*workflow-init` and let BMM analyze your project and recommend the right track.

---

## Common Workflows

### Initial Setup

1. **`*workflow-init`** - Set up your project workflow path
   - Analyzes your project
   - Recommends the right planning track
   - Creates workflow structure

### Planning Phase

2. **`*prd`** - Create Product Requirements Document
   - Full product planning
   - User stories and requirements
   - Acceptance criteria

3. **`*quick-spec`** - Quick technical specification
   - Fast planning for small features
   - Technical details only
   - No full PRD needed

4. **`*architecture`** - Solution architecture
   - System design
   - Technology decisions
   - Component structure

### Implementation Phase

5. **`*dev-story`** - Development story
   - Break down work into stories
   - Implementation details
   - Just-in-time context

6. **`*implement-story`** - Implement a specific story
   - Step-by-step implementation
   - Code generation
   - Testing guidance

### Documentation

7. **`*document-project`** - Document existing codebase
   - Great for brownfield projects
   - Creates project documentation
   - Understands existing structure

---

## Tips & Tricks

### 🎯 Workflow Shortcuts

- Use `*` prefix for quick workflow access: `*workflow-init`
- Agents understand natural language: "Create a PRD for user authentication"
- Menu numbers work: "Run option 3"

### 🔄 Updating BMAD

```bash
# Quick update (preserves your settings)
cd your-project
npx bmad-method@alpha install
# Select "Quick Update" when prompted

# Or use the local CLI
node BMAD-METHOD/tools/cli/bmad-cli.js update
```

### 🎨 Customizing Agents

Edit agent personalities in:
```
bmad/_cfg/agents/
```

Your customizations persist through updates!

### 📚 Document Sharding (Advanced)

For large projects, use document sharding to save tokens:

```bash
# Shard a large document
/bmad:core:tools:shard-doc
```

Workflows automatically detect and use sharded documents.

### 🤝 Multi-Agent Collaboration

Use Party Mode for complex decisions:
1. `/bmad:core:workflows:party-mode`
2. Run any workflow
3. Get input from PM, Architect, Developer, etc.

---

## Getting Help

### Documentation

- **Main README:** `BMAD-METHOD/README.md`
- **BMM Complete Docs:** `BMAD-METHOD/src/modules/bmm/docs/README.md`
- **Quick Start:** `BMAD-METHOD/src/modules/bmm/docs/quick-start.md`
- **IDE Integration:** `BMAD-METHOD/docs/ide-info/cursor.md`

### Community

- 💬 **Discord:** https://discord.gg/gk8jAdXWmj
- 🐛 **GitHub Issues:** https://github.com/bmad-code-org/BMAD-METHOD/issues
- 🎥 **YouTube:** https://www.youtube.com/@BMadCode

### Common Issues

**Agent not loading?**
- Check that `bmad/` folder exists
- Verify IDE integration in `.cursor/rules/`
- Try reloading Cursor

**Workflow not found?**
- Run `*workflow-init` first to set up project structure
- Check workflow manifest: `bmad/_cfg/workflow-manifest.csv`

**Need to reinstall?**
- Run the installer again
- Choose "Quick Update" to preserve settings

---

## Quick Reference Card

```
┌─────────────────────────────────────────┐
│  BMAD Quick Commands                   │
├─────────────────────────────────────────┤
│  Setup:                                 │
│    *workflow-init                       │
│                                         │
│  Planning:                              │
│    *prd          (full planning)        │
│    *quick-spec   (fast planning)        │
│    *architecture (system design)        │
│                                         │
│  Implementation:                        │
│    *dev-story    (create story)         │
│    *implement-story (build it)          │
│                                         │
│  Documentation:                         │
│    *document-project                    │
│                                         │
│  Special:                               │
│    /bmad:core:workflows:party-mode      │
└─────────────────────────────────────────┘
```

---

**Happy Building! 🚀**

*Remember: BMAD doesn't give you answers—it helps you discover better solutions through guided reflection.*

