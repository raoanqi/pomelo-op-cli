import { Command } from 'commander'
import { onCreate } from './command/create/index'

const cmdInstance = new Command()
cmdInstance
  .command('create')
  .description('Create a new component')
  .option('-t --type <type>', 'Create Type: Dictionary')
  .action(onCreate)
  .parse()
