interface Cmd {
  name: string;
  signature: string;
  description: string;
  status?: 'stable' | 'beta';
}

const commands: Cmd[] = [
  {
    name: 'init',
    signature: 'rnboost init [name] [--template expo|react-native] [--yes]',
    description:
      'Scaffolds a new TypeScript React Native app. Prompts for framework, state, backend, auth, UI.',
    status: 'stable',
  },
  {
    name: 'generate screen',
    signature: 'rnboost generate screen "<prompt>" [--out <dir>] [--name <Name>] [--no-ai] [--model <id>]',
    description:
      'AI-generated screen from a natural-language prompt. Use --no-ai for a deterministic stub.',
    status: 'beta',
  },
  {
    name: 'generate component',
    signature: 'rnboost g component <Name> [--out <dir>] [--ai "<prompt>"] [--model <id>]',
    description:
      'Reusable component with Props interface and StyleSheet. AI optional via --ai.',
    status: 'beta',
  },
  {
    name: 'generate hook',
    signature: 'rnboost g hook <name> [--out <dir>] [--ai "<prompt>"] [--model <id>]',
    description:
      'Custom React hook (use* convention). AI optional via --ai.',
    status: 'beta',
  },
  {
    name: 'generate store',
    signature: 'rnboost g store <Name> [--out <dir>] [--ai "<prompt>"] [--model <id>]',
    description:
      'Zustand store with state interface and actions. AI optional via --ai.',
    status: 'beta',
  },
  {
    name: 'generate service',
    signature: 'rnboost g service <Name> [--out <dir>] [--ai "<prompt>"] [--model <id>]',
    description:
      'API service module with list/get/create methods using the api() helper.',
    status: 'beta',
  },
  {
    name: 'analyze',
    signature: 'rnboost analyze [--json]',
    description:
      'Audits the current project: TypeScript, navigation, state, env, ESLint, console-log volume.',
    status: 'beta',
  },
];

export default function CommandsPage() {
  return (
    <article>
      <h1>Commands</h1>
      <p className="lead">All RNBoost subcommands at a glance.</p>

      <table className="cmd-table">
        <thead>
          <tr>
            <th>Command</th>
            <th>What it does</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {commands.map((cmd) => (
            <tr key={cmd.name}>
              <td>
                <code>{cmd.name}</code>
                <div style={{ color: 'var(--text-muted)', fontSize: 12, marginTop: 4 }}>
                  {cmd.signature}
                </div>
              </td>
              <td>{cmd.description}</td>
              <td>
                <span className={`tag ${cmd.status === 'stable' ? 'tag-green' : 'tag-yellow'}`}>
                  {cmd.status}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <h2>Examples</h2>
      <pre>
        <code>{`# Scaffold an app (TypeScript-only, latest Expo SDK)
npx rnboost init shop-app

# AI-generated screen
rnboost generate screen "user profile with avatar, bio and edit button"

# Stub component (no AI)
rnboost g component Button

# AI-assisted component
rnboost g component PriceTag --ai "show price in EUR with strikethrough discount"

# Hook + store + service
rnboost g hook useDebounce --ai "debounce a value with delay ms"
rnboost g store Cart --ai "shopping cart with items, add, remove, clear"
rnboost g service Product

# Audit your project
rnboost analyze --json > audit.json`}</code>
      </pre>
    </article>
  );
}
