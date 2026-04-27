import type { Command } from 'commander';
import pc from 'picocolors';
import { logger } from '../utils/logger.js';
import { runAnalyze } from '../analyze/runner.js';
import type { Severity } from '../analyze/rules.js';

interface AnalyzeOptions {
  json?: boolean;
}

const SEVERITY_LABEL: Record<Severity, string> = {
  info: pc.cyan('info'),
  warn: pc.yellow('warn'),
  error: pc.red('error'),
};

export function registerAnalyzeCommand(program: Command): void {
  program
    .command('analyze')
    .description('Analyze the current React Native project and suggest improvements')
    .option('--json', 'output machine-readable JSON report')
    .action(async (opts: AnalyzeOptions) => {
      const findings = await runAnalyze(process.cwd());

      if (opts.json) {
        process.stdout.write(JSON.stringify({ findings }, null, 2) + '\n');
        return;
      }

      if (findings.length === 0) {
        logger.success('No issues found. Looks healthy 🎉');
        return;
      }

      logger.blank();
      logger.info(`Found ${findings.length} suggestion${findings.length > 1 ? 's' : ''}:`);
      logger.blank();
      for (const f of findings) {
        console.log(`${SEVERITY_LABEL[f.severity]} ${pc.bold(f.rule)} — ${f.message}`);
        if (f.hint) console.log(`     ${pc.dim(f.hint)}`);
      }
      logger.blank();

      if (findings.some((f) => f.severity === 'error')) {
        process.exitCode = 1;
      }
    });
}
