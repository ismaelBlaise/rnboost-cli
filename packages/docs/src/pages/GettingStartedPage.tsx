export default function GettingStartedPage() {
  return (
    <article>
      <h1>Getting started</h1>
      <p className="lead">
        Install nothing. <code>npx</code> picks up RNBoost on demand.
      </p>

      <h2>Requirements</h2>
      <ul>
        <li>Node.js 18 or newer</li>
        <li>Git (for the optional auto <code>git init</code>)</li>
        <li>For Expo: a phone with the Expo Go app, or a simulator</li>
      </ul>

      <h2>Create a new app</h2>
      <pre>
        <code>npx rnboost init myApp</code>
      </pre>
      <p>
        RNBoost will ask a few questions, scaffold the app, run <code>npm install</code> and
        initialize a fresh git repo.
      </p>

      <h2>Skip the prompts</h2>
      <pre>
        <code>{`npx rnboost init myApp \\
  --template expo --ts --yes`}</code>
      </pre>
      <p>
        With <code>--yes</code>, RNBoost picks reasonable defaults: Expo, TypeScript, React
        Navigation, Zustand, custom REST API, JWT auth, NativeWind.
      </p>

      <h2>Next: AI screen generation</h2>
      <pre>
        <code>{`export OPENAI_API_KEY=sk-...
cd myApp
npx rnboost generate screen "settings page with toggle for dark mode"`}</code>
      </pre>

      <div className="callout">
        Your <code>OPENAI_API_KEY</code> never leaves your machine — RNBoost calls OpenAI
        directly from your terminal.
      </div>
    </article>
  );
}
