export default function TemplatesPage() {
  return (
    <article>
      <h1>Templates &amp; addons</h1>
      <p className="lead">
        RNBoost ships a base template per <em>framework × language</em>, then layers addons
        based on your prompt answers.
      </p>

      <h2>Base templates</h2>
      <ul>
        <li>
          <code>expo-ts</code> — Expo + TypeScript <span className="tag tag-green">stable</span>
        </li>
        <li>
          <code>expo-js</code> — Expo + JavaScript <span className="tag">planned</span>
        </li>
        <li>
          <code>react-native-ts</code> — bare RN CLI + TS <span className="tag">planned</span>
        </li>
        <li>
          <code>react-native-js</code> — bare RN CLI + JS <span className="tag">planned</span>
        </li>
      </ul>

      <h2>Addons</h2>
      <p>Each addon is a folder mirrored over the base template. Later writes win.</p>
      <table className="cmd-table">
        <thead>
          <tr>
            <th>Addon</th>
            <th>Drops in</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>navigation</code>
            </td>
            <td>React Navigation native stack with Login / Home / Profile routes</td>
          </tr>
          <tr>
            <td>
              <code>state-zustand</code>
            </td>
            <td>
              <code>useAuthStore</code> with token + user, ready to use across screens
            </td>
          </tr>
          <tr>
            <td>
              <code>backend-custom</code>
            </td>
            <td>
              Typed <code>api()</code> wrapper over <code>fetch</code> with bearer-token support
            </td>
          </tr>
          <tr>
            <td>
              <code>auth-jwt</code>
            </td>
            <td>
              <code>login</code>, <code>register</code>, <code>me</code> service calls
            </td>
          </tr>
          <tr>
            <td>
              <code>ui-tailwind</code>
            </td>
            <td>NativeWind preset + global stylesheet</td>
          </tr>
        </tbody>
      </table>

      <h2>Adding your own addon</h2>
      <pre>
        <code>{`packages/cli/templates/addons/<my-addon>/
  src/
    services/myThing.ts
  package.json   # optional, scaffolder merges deps`}</code>
      </pre>
      <p>
        Pick the prompt key it should attach to (e.g. <code>backend</code> →{' '}
        <code>backend-myThing</code>) and the scaffolder will pick it up automatically.
      </p>
    </article>
  );
}
