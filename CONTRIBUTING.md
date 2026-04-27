# Contributing to RNBoost CLI

Thanks for your interest in improving RNBoost.

## Branching model

We use a small gitflow-style model:

- **`main`** — protected, always releasable. Pushes are forbidden; only fast-forward
  merges from `dev` (or hotfix branches).
- **`dev`** — integration branch. All `feature/*` branches merge here first.
- **`feature/<scope>`** — one branch per scoped change, opened against `dev`.

```
       feature/X        feature/Y       feature/Z
           \\               \\               \\
dev   ──●───●───●───────●───●───────●───●─────────────
                                              \\
main  ──●───────────────────────────────────────●──── (release)
```

## Workflow for a change

```bash
# 1. Start from up-to-date dev
git checkout dev
git pull origin dev

# 2. Create a feature branch
git checkout -b feature/cli-generate-component

# 3. Code, commit (Conventional Commits)
git commit -m "feat(cli): add component generator"

# 4. Push and open a PR against dev
git push -u origin feature/cli-generate-component
# Open the PR on GitHub, target = dev
```

## Commit messages

We follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat(scope): ...` — new feature
- `fix(scope): ...` — bug fix
- `docs: ...` — docs only
- `chore: ...` — build/config/CI
- `refactor(scope): ...` — refactor without behavior change
- `test(scope): ...` — tests only

Common scopes: `cli`, `templates`, `docs`, `ci`.

## Pull requests

- Target `dev`, not `main`.
- Keep PRs focused — one feature/fix per PR.
- Include a test plan in the PR description.
- CI must pass before merge.

## Releases

1. Open a PR `dev → main` once a release is ready.
2. Once merged, tag `main`:

   ```bash
   git checkout main && git pull
   npm version --workspace @rnboost/cli minor
   git push --follow-tags
   ```

3. The `release.yml` workflow publishes `@rnboost/cli` to npm on `v*` tags.

## Code style

- TypeScript everywhere
- Prefer named exports, avoid default exports outside React components
- Run `npm run build` and `npm test` before pushing

## Templates and addons

Templates live in `packages/cli/templates/`. See
[packages/cli/templates/README.md](packages/cli/templates/README.md) for the addon
contract and how the scaffolder layers them.
