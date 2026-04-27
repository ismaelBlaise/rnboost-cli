# RNBoost templates

Each subfolder is either a **base template** or an **addon**. The `init` command
copies the base template, then layers each selected addon over it (later writes
win).

All templates are TypeScript-only.

## Layout

```
templates/
  expo/                    # base: Expo SDK 52 + Expo Router 4 + RN 0.76 + React 18.3
  react-native/            # base: bare RN CLI (planned)
  addons/
    routing-expo-router/   # placeholder, expo-router structure ships in the expo base
    state-zustand/
    state-redux/           (planned)
    state-context/         (planned)
    backend-firebase/      (planned)
    backend-supabase/      (planned)
    backend-custom/
    auth-jwt/
    auth-oauth/            (planned)
    auth-google/           (planned)
    ui-tailwind/           # NativeWind v4
    ui-nativebase/         (planned)
    ui-custom/             (planned)
```

## Base template: `expo/`

- Expo SDK 52, React Native 0.76, React 18.3.1
- File-based routing via Expo Router 4 (`app/_layout.tsx`, `app/index.tsx`, `app/(auth)/login.tsx`, ...)
- New Architecture enabled (`newArchEnabled: true`)
- `+not-found.tsx` fallback route

## Adding a new addon

1. Create `templates/addons/<name>/` mirroring the target file paths
2. Make sure file paths do not collide with the base template unless intentional
3. Update `src/core/scaffolder.ts` if the addon needs custom merging logic
   (e.g. merging into `package.json`)
