import type { Command } from 'commander';
import ora from 'ora';
import { logger } from '../utils/logger.js';
import { toPascalCase, ensureScreenName } from '../utils/naming.js';
import { writeGenerated } from '../generators/writeFile.js';
import { componentStub, hookStub, screenStub, serviceStub, storeStub } from '../generators/stubs.js';
import { generateWithAI, type ArtifactKind } from '../generators/ai.js';

interface GenerateBaseOptions {
  out?: string;
  ai?: string;
  model: string;
}

const DEFAULT_OUT_DIRS: Record<ArtifactKind, string> = {
  screen: 'app',
  component: 'src/components',
  hook: 'src/hooks',
  store: 'src/store',
  service: 'src/services',
};

export function registerGenerateCommand(program: Command): void {
  const generate = program
    .command('generate')
    .alias('g')
    .description('Generate code (screen, component, hook, store, service)');

  generate
    .command('screen <prompt...>')
    .description('Generate a React Native screen — AI by default, derives name from prompt')
    .option('--out <dir>', 'output directory', 'app')
    .option('--name <name>', 'override component name')
    .option('--no-ai', 'skip AI and use a deterministic stub instead')
    .option('--model <model>', 'OpenAI model', 'gpt-4o-mini')
    .action(async (
      promptParts: string[],
      opts: GenerateBaseOptions & { name?: string; ai?: string | false },
    ) => {
      const prompt = promptParts.join(' ').trim();
      if (!prompt) {
        logger.error('Provide a prompt, e.g. rnboost generate screen "user profile"');
        process.exitCode = 1;
        return;
      }
      const name = opts.name ?? ensureScreenName(prompt);
      await runGenerator({
        kind: 'screen',
        name,
        outDir: opts.out ?? DEFAULT_OUT_DIRS.screen,
        useAi: opts.ai !== false,
        aiPrompt: prompt,
        model: opts.model,
      });
    });

  generate
    .command('component <name>')
    .description('Generate a reusable React Native component')
    .option('--out <dir>', 'output directory', DEFAULT_OUT_DIRS.component)
    .option('--ai <prompt>', 'use AI to fill in the component body')
    .option('--model <model>', 'OpenAI model', 'gpt-4o-mini')
    .action(async (name: string, opts: GenerateBaseOptions) => {
      await runGenerator({
        kind: 'component',
        name: toPascalCase(name),
        outDir: opts.out ?? DEFAULT_OUT_DIRS.component,
        useAi: Boolean(opts.ai),
        aiPrompt: opts.ai,
        model: opts.model,
      });
    });

  generate
    .command('hook <name>')
    .description('Generate a custom React hook')
    .option('--out <dir>', 'output directory', DEFAULT_OUT_DIRS.hook)
    .option('--ai <prompt>', 'use AI to fill in the hook body')
    .option('--model <model>', 'OpenAI model', 'gpt-4o-mini')
    .action(async (name: string, opts: GenerateBaseOptions) => {
      await runGenerator({
        kind: 'hook',
        name: toPascalCase(name.replace(/^use/, '')),
        outDir: opts.out ?? DEFAULT_OUT_DIRS.hook,
        useAi: Boolean(opts.ai),
        aiPrompt: opts.ai,
        model: opts.model,
      });
    });

  generate
    .command('store <name>')
    .description('Generate a Zustand store')
    .option('--out <dir>', 'output directory', DEFAULT_OUT_DIRS.store)
    .option('--ai <prompt>', 'use AI to fill in the store body')
    .option('--model <model>', 'OpenAI model', 'gpt-4o-mini')
    .action(async (name: string, opts: GenerateBaseOptions) => {
      await runGenerator({
        kind: 'store',
        name: toPascalCase(name),
        outDir: opts.out ?? DEFAULT_OUT_DIRS.store,
        useAi: Boolean(opts.ai),
        aiPrompt: opts.ai,
        model: opts.model,
      });
    });

  generate
    .command('service <name>')
    .description('Generate an API service module')
    .option('--out <dir>', 'output directory', DEFAULT_OUT_DIRS.service)
    .option('--ai <prompt>', 'use AI to fill in the service body')
    .option('--model <model>', 'OpenAI model', 'gpt-4o-mini')
    .action(async (name: string, opts: GenerateBaseOptions) => {
      await runGenerator({
        kind: 'service',
        name: toPascalCase(name),
        outDir: opts.out ?? DEFAULT_OUT_DIRS.service,
        useAi: Boolean(opts.ai),
        aiPrompt: opts.ai,
        model: opts.model,
      });
    });
}

interface RunArgs {
  kind: ArtifactKind;
  name: string;
  outDir: string;
  useAi: boolean;
  aiPrompt?: string;
  model: string;
}

async function runGenerator(args: RunArgs): Promise<void> {
  const fileName = `${args.name}${args.kind === 'hook' || args.kind === 'store' || args.kind === 'service' ? '.ts' : '.tsx'}`;
  const action = args.useAi
    ? `Generating ${args.kind} ${args.name} via ${args.model}...`
    : `Writing ${args.kind} stub ${args.name}...`;
  const spinner = ora(action).start();

  try {
    const contents = args.useAi
      ? await generateWithAI({
          kind: args.kind,
          name: args.name,
          prompt: args.aiPrompt ?? args.name,
          model: args.model,
        })
      : stubFor(args.kind, args.name);

    const filePath = await writeGenerated({
      outDir: args.outDir,
      fileName,
      contents,
    });
    spinner.succeed(`Created ${filePath}`);
  } catch (err) {
    spinner.fail((err as Error).message);
    process.exitCode = 1;
  }
}

function stubFor(kind: ArtifactKind, name: string): string {
  switch (kind) {
    case 'screen':
      return screenStub(name);
    case 'component':
      return componentStub(name);
    case 'hook':
      return hookStub(name);
    case 'store':
      return storeStub(name);
    case 'service':
      return serviceStub(name);
  }
}
