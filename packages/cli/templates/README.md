# RNBoost templates

Each subfolder is either a **base template** or an **addon**. The `init` command
copies the base template, then layers each selected addon over it (later writes
win).

## Layout

```
templates/
  expo-ts/                 # base: Expo + TypeScript
  expo-js/                 # base: Expo + JavaScript
  react-native-ts/         # base: bare RN CLI + TypeScript
  react-native-js/         # base: bare RN CLI + JavaScript
  addons/
    navigation/            # React Navigation wiring
    state-zustand/
    state-redux/
    state-context/
    backend-firebase/
    backend-supabase/
    backend-custom/
    auth-jwt/
    auth-oauth/
    auth-google/
    ui-tailwind/           # NativeWind
    ui-nativebase/
    ui-custom/
```

## Adding a new addon

1. Create `templates/addons/<name>/` mirroring the target file paths
2. Make sure file paths do not collide with the base template unless intentional
3. Update `src/core/scaffolder.ts` if the addon needs custom merging logic
   (e.g. merging into `package.json`)
