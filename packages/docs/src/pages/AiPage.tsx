export default function AiPage() {
  return (
    <article>
      <h1>AI screen generation</h1>
      <p className="lead">
        Turn a natural-language description into a real React Native screen.
      </p>

      <h2>How it works</h2>
      <ol>
        <li>You provide a prompt, e.g. <code>"login with email and password"</code></li>
        <li>RNBoost derives a PascalCase component name (or you pass <code>--name</code>)</li>
        <li>The CLI calls OpenAI with a strict system prompt (TS, RN primitives, StyleSheet)</li>
        <li>The fenced code block is extracted and written to <code>src/screens/&lt;Name&gt;.tsx</code></li>
      </ol>

      <h2>Setup</h2>
      <pre>
        <code>{`# Get a key from https://platform.openai.com/api-keys
export OPENAI_API_KEY=sk-...`}</code>
      </pre>

      <h2>Examples</h2>
      <pre>
        <code>{`rnboost generate screen "settings page with toggle for dark mode"
# -> src/screens/SettingsPageScreen.tsx

rnboost generate screen "checkout summary with cart items and pay button" \\
  --name CheckoutSummaryScreen
# -> src/screens/CheckoutSummaryScreen.tsx

rnboost generate screen "feed of posts with like button" --model gpt-4o
# -> src/screens/FeedOfScreen.tsx`}</code>
      </pre>

      <h2>What you can rely on</h2>
      <ul>
        <li>Default-exported React function component</li>
        <li>
          <code>StyleSheet.create</code> for styles (no inline objects)
        </li>
        <li>
          <code>react-native</code> primitives only (no web-only APIs)
        </li>
        <li>Hooks for state — <code>useState</code>, <code>useEffect</code> when needed</li>
        <li>
          Reasonable accessibility props on interactive elements (
          <code>accessibilityLabel</code>)
        </li>
      </ul>

      <div className="callout">
        AI-generated code is a starting point — review it before you ship. RNBoost will refuse
        to overwrite an existing file with the same name.
      </div>
    </article>
  );
}
