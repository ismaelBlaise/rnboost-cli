interface Cmd {
  name: string;
  signature: string;
  description: string;
  status?: 'stable' | 'beta';
}

const commands: Cmd[] = [
  {
    name: 'init',
    signature: 'rnboost init [name] [--template expo|react-native] [--ts|--js] [--yes]',
    description:
      'Scaffolds a new React Native app. Prompts for framework, language, navigation, state, backend, auth, UI.',
    status: 'stable',
  },
  {
    name: 'generate',
    signature: 'rnboost generate screen "<prompt>" [--model <id>] [--out <dir>] [--name <Name>]',
    description:
      'Calls OpenAI to produce a complete React Native screen from a natural-language prompt.',
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
        <code>{`# Scaffold an app
npx rnboost init shop-app

# Generate a screen with AI
rnboost generate screen "user profile with avatar, bio and edit button"

# Audit your project
rnboost analyze --json > audit.json`}</code>
      </pre>
    </article>
  );
}
