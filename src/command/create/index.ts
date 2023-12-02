import inquirer from 'inquirer'
import { red } from 'kolorist'
import { CREATE_TYPE_OPTIONS, COMPONENT_STYLE_OPTIONS } from '../../config/constant'
import { createFunc } from './create'

export const onCreate = async (args = { type: '' }): Promise<void> => {
  let { type } = args
  if (!type) {
    const typeOption = await inquirer.prompt([
      {
        name: 'createType',
        type: 'list',
        message: 'What do you want to create?',
        choices: CREATE_TYPE_OPTIONS,
        default: CREATE_TYPE_OPTIONS[0]
      }
    ])
    type = typeOption.type
  } else {
    if (!CREATE_TYPE_OPTIONS.includes(type)) {
      console.log(red(
        `
        Unsupported type: ${type}.
        Please select again.
      `
      ))
    }
    return onCreate()
  }
  /**
   * 交互式命令
   */
  try {
    const metaOption = await inquirer.prompt([
      {
        name: 'Dictionary Name',
        type: 'input',
        message: 'Please input dictionary name you want to create.',
        validate: (input: string): string | boolean => {
          if (!input) return 'Dictionary name cannot be empty.'
          return true
        }
      },
      {
        name: 'Component Name',
        type: 'input',
        message: 'Please input component name you want to create.',
        validate: (input: string): string | boolean => {
          if (!input) return 'Component name cannot be empty.'
          return true
        }
      },
      {
        name: 'Vue Component Style',
        type: 'list',
        choices: COMPONENT_STYLE_OPTIONS,
        message: 'Please select component style.',
        validate: (input: string): string | boolean => {
          if (!input) return 'Component style cannot be empty.'
          return true
        }
      }
    ])
    createFunc(metaOption)
  } catch (error) {
    console.error(error)
  }
}
