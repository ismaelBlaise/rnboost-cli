# RNBoost CLI

> The smart React Native starter — scaffold a production-ready app in one command.

```bash
npx rnboost init myApp
```

RNBoost is an opinionated CLI that takes you from `npx` to a running React Native app
with navigation, state, auth, an API client and AI-assisted code generation already
wired in. It also analyzes existing projects and proposes concrete improvements.

---

## Highlights

- **Smart prompts** — pick framework (Expo / RN CLI), language, navigation, state, backend, auth, UI.
- **Production-ready architecture** — feature-based folders, env handling, typed API client.
- **Auth out of the box** — login / register / token management.
- **AI screen generation** — `rnboost generate screen "..."` turns a prompt into a real component.
- **Reverse-engineering analyzer** — `rnboost analyze` audits your project and suggests improvements.
- **Open source, MIT** — fork the templates, ship your own.

---

## Quickstart

```bash
# Requires Node.js 18+
npx rnboost init myApp
cd myApp
npx expo start
```

Skip the prompts entirely:

```bash
npx rnboost init myApp --template expo --yes
```

> All scaffolded projects are **TypeScript-only** and use the latest **Expo SDK 52** (React Native 0.76, React 18.3) with **Expo Router 4** for file-based routing.

Generate code with AI:

```bash
export OPENAI_API_KEY=sk-...
rnboost generate screen "settings page with toggle for dark mode"
# -> app/SettingsPageScreen.tsx

rnboost g component PriceTag --ai "show price in EUR with strikethrough discount"
# -> src/components/PriceTag.tsx

rnboost g hook useDebounce --ai "debounce a value with delay ms"
rnboost g store Cart --ai "shopping cart with items, add, remove, clear"
rnboost g service Product
```

Audit an existing project:

```bash
rnboost analyze
```

---

## Commands

| Command | What it does |
|---|---|
| `rnboost init [name]` | Interactive scaffolding (framework, state, backend, auth, UI). TypeScript-only. |
| `rnboost generate screen "<prompt>"` | AI-generated React Native screen. `--no-ai` for a stub. |
| `rnboost g component <Name>` | Reusable component with Props + StyleSheet. `--ai "<prompt>"` optional. |
| `rnboost g hook <name>` | Custom React hook (use* convention). |
| `rnboost g store <Name>` | Zustand store with state and actions. |
| `rnboost g service <Name>` | API service module using the `api()` helper. |
| `rnboost analyze` | Audit the current project and suggest improvements. |

Run `rnboost <cmd> --help` for full options.

---

## Project layout

This is a npm-workspaces monorepo:

```
rnboost-cli/
├─ packages/
│  ├─ cli/              # the CLI itself (@rnboost/cli)
│  │  ├─ src/
│  │  │  ├─ commands/   # init / generate / analyze
│  │  │  ├─ prompts/    # inquirer prompts
│  │  │  ├─ core/       # scaffolder
│  │  │  ├─ generators/ # AI generators
│  │  │  ├─ analyze/    # rules + runner
│  │  │  └─ ai/         # OpenAI client
│  │  └─ templates/     # base templates + addons
│  └─ docs/             # React + Vite documentation site
└─ .github/             # CI workflows, issue/PR templates
```

The documentation site under `packages/docs` is the same content as this README,
expanded into navigable pages.

---

## Local development

```bash
npm install
npm run cli -- init myApp     # run the CLI from source
npm run docs:dev              # start the docs site (Vite)
```

---

## Branching workflow

```
main   ──●─────────────────●─── (release)
          \\               /
dev     ───●──●──●──●──●──●──── (integration)
              ↑  ↑  ↑  ↑
              │  │  │  └── feature/docs-site
              │  │  └───── feature/cli-analyze
              │  └──────── feature/cli-generate
              └─────────── feature/templates ...
```

- `main` — protected, releasable
- `dev` — integration branch, all feature branches merge here first
- `feature/*` — one branch per scoped change, opened against `dev`

See [CONTRIBUTING.md](CONTRIBUTING.md) for the full flow.

---

## License

[MIT](LICENSE) © Ismael Blaise
