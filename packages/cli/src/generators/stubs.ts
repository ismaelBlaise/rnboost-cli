export function componentStub(name: string): string {
  return `import { StyleSheet, Text, View } from 'react-native';

export interface ${name}Props {
  title?: string;
}

export default function ${name}({ title = '${name}' }: ${name}Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 16 },
  title: { fontSize: 16, fontWeight: '600' },
});
`;
}

export function screenStub(name: string): string {
  return `import { StyleSheet, Text, View } from 'react-native';

export default function ${name}() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>${name}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 24, fontWeight: '700' },
});
`;
}

export function hookStub(name: string): string {
  const camelName = name.charAt(0).toLowerCase() + name.slice(1);
  const hookName = camelName.startsWith('use') ? camelName : `use${name}`;
  return `import { useState, useEffect } from 'react';

export function ${hookName}() {
  const [value, setValue] = useState<string | null>(null);

  useEffect(() => {
    // TODO: implement ${hookName}
  }, []);

  return { value, setValue };
}
`;
}

export function storeStub(name: string): string {
  const camelName = name.charAt(0).toLowerCase() + name.slice(1);
  const storeName = camelName.startsWith('use') ? camelName : `use${name}Store`;
  const stateName = `${name}State`;
  return `import { create } from 'zustand';

interface ${stateName} {
  // TODO: replace with your fields
  count: number;
  increment: () => void;
  reset: () => void;
}

export const ${storeName} = create<${stateName}>((set) => ({
  count: 0,
  increment: () => set((s) => ({ count: s.count + 1 })),
  reset: () => set({ count: 0 }),
}));
`;
}

export function serviceStub(name: string): string {
  const camelName = name.charAt(0).toLowerCase() + name.slice(1);
  const resourcePath = camelName.toLowerCase().replace(/service$/i, '');
  return `import { api } from './api';

export interface ${name}Item {
  id: string;
  // TODO: add fields
}

export async function list${name}s(): Promise<${name}Item[]> {
  return api<${name}Item[]>('/${resourcePath}');
}

export async function get${name}(id: string): Promise<${name}Item> {
  return api<${name}Item>(\`/${resourcePath}/\${id}\`);
}

export async function create${name}(payload: Omit<${name}Item, 'id'>): Promise<${name}Item> {
  return api<${name}Item>('/${resourcePath}', {
    method: 'POST',
    body: JSON.stringify(payload),
  });
}
`;
}
