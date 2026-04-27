import pc from 'picocolors';

export function printBanner(version: string): void {
  const lines = [
    '',
    pc.cyan('  ____  _   _ ____                  _   '),
    pc.cyan(' |  _ \\| \\ | | __ )  ___   ___  ___| |_ '),
    pc.cyan(' | |_) |  \\| |  _ \\ / _ \\ / _ \\/ __| __|'),
    pc.cyan(' |  _ <| |\\  | |_) | (_) | (_) \\__ \\ |_ '),
    pc.cyan(' |_| \\_\\_| \\_|____/ \\___/ \\___/|___/\\__|'),
    '',
    pc.dim(`  the smart React Native starter  v${version}`),
    '',
  ];
  console.log(lines.join('\n'));
}
