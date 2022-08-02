import './config';
import yargs from 'yargs';
import promptSync from 'prompt-sync';
import promptSyncHistory from 'prompt-sync-history';

const yargsObj = yargs
  .scriptName('create-population')
  .usage('Usage: $0 <command> [options]')
  .commandDir('commands', {
    extensions: ['js', 'ts'],
  })
  .demandCommand(1, 'At least 1 command must to be passed')
  // .help('help')
  // .alias('h', 'help')
  .epilog('copyright 2019')
  .exitProcess(false)
  .fail((msg, err, y: any) => {
    y.showHelp();
    console.log('\n');
    console.log(msg);
  });

function executeCommand(commands: string[]) {
  return yargsObj.parse(commands);
}

function askForInput() {
  const prompt = promptSync({
    sigint: true,
    history: promptSyncHistory(),
  });

  const commandString = prompt('>');

  if (commandString) {
    executeCommand(commandString.split(' '));
    (prompt as any).history.save();
  } else yargsObj.showHelp();

  askForInput();
}

export default function main(): void {
  askForInput();
}

main();
