import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <article>
      <h1>RNBoost CLI</h1>
      <p className="lead">
        The smart React Native starter — scaffold a production-ready app in one command.
      </p>

      <pre>
        <code>npx rnboost init myApp</code>
      </pre>

      <div className="cta-row">
        <Link to="/getting-started" className="btn btn-primary">
          Get started
        </Link>
        <Link to="/commands" className="btn btn-secondary">
          Browse commands
        </Link>
      </div>

      <h2>What you get</h2>
      <div className="feature-grid">
        <div className="feature-card">
          <h3>Smart prompts</h3>
          <p>Pick framework, language, navigation, state, backend, auth and UI in seconds.</p>
        </div>
        <div className="feature-card">
          <h3>Clean architecture</h3>
          <p>Feature-based folder layout, ready to scale beyond a weekend project.</p>
        </div>
        <div className="feature-card">
          <h3>Auth + API ready</h3>
          <p>Login, register, token handling and a typed API client wired in.</p>
        </div>
        <div className="feature-card">
          <h3>AI screen generation</h3>
          <p>
            <code>rnboost generate screen "..."</code> turns a prompt into a real component.
          </p>
        </div>
        <div className="feature-card">
          <h3>Project analyzer</h3>
          <p>
            <code>rnboost analyze</code> audits your app and proposes concrete improvements.
          </p>
        </div>
        <div className="feature-card">
          <h3>Open source</h3>
          <p>MIT licensed. Templates live alongside the CLI — fork and extend freely.</p>
        </div>
      </div>

      <div className="callout">
        RNBoost is opinionated by default but lets you swap any layer. Every choice you skip
        becomes an addon you can add later by hand.
      </div>
    </article>
  );
}
