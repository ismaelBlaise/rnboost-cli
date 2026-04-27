import { existsSync } from 'node:fs';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';

export interface WriteOptions {
  cwd?: string;
  outDir: string;
  fileName: string;
  contents: string;
  overwrite?: boolean;
}

export async function writeGenerated(opts: WriteOptions): Promise<string> {
  const cwd = opts.cwd ?? process.cwd();
  const targetDir = resolve(cwd, opts.outDir);
  const filePath = resolve(targetDir, opts.fileName);

  if (existsSync(filePath) && !opts.overwrite) {
    throw new Error(`File already exists: ${filePath}`);
  }

  await mkdir(dirname(filePath), { recursive: true });
  await writeFile(filePath, opts.contents.endsWith('\n') ? opts.contents : `${opts.contents}\n`, 'utf8');
  return filePath;
}
