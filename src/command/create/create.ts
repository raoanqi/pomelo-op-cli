import { ensureDirSync, writeFileSync } from 'fs-extra'
import { resolve } from 'path'
import { WRITE_FILE_OPTIONS } from '../../config/constant'
import { genCompositionMainComponent } from '../../utils/composition/mainComponent'
import { genCompositionUpdateComponent } from '../../utils/composition/updateComponent'
import { genCompositionDeleteComponent } from '../../utils/composition/deleteComponent'
import { genOptionsMainComponent } from '../../utils/options/mainComponent'
import { genOptionsUpdateComponent } from '../../utils/options/updateComponent'
import { genOptionsDeleteComponent } from '../../utils/options/deleteComponent'

export const createFunc = (meta): void => {
  const { DictionaryName, ComponentName, VueComponentStyle } = meta
  const dirPath = resolve(__dirname, `../${DictionaryName}`)
  ensureDirSync(dirPath)
  const mainComponentPath = resolve(__dirname, `../${DictionaryName}/${ComponentName}.vue`)
  const updateComponentPath = resolve(__dirname, `../${DictionaryName}/${ComponentName}Update.vue`)
  const deleteComponentPath = resolve(__dirname, `../${DictionaryName}/${ComponentName}Delete.vue`)
  if (VueComponentStyle === 'Composition') {
    writeFileSync(mainComponentPath, genCompositionMainComponent(meta), WRITE_FILE_OPTIONS)
    writeFileSync(updateComponentPath, genCompositionUpdateComponent(meta), WRITE_FILE_OPTIONS)
    writeFileSync(deleteComponentPath, genCompositionDeleteComponent(meta), WRITE_FILE_OPTIONS)
  } else if (VueComponentStyle === 'Options') {
    writeFileSync(mainComponentPath, genOptionsMainComponent(meta), WRITE_FILE_OPTIONS)
    writeFileSync(updateComponentPath, genOptionsUpdateComponent(meta), WRITE_FILE_OPTIONS)
    writeFileSync(deleteComponentPath, genOptionsDeleteComponent(meta), WRITE_FILE_OPTIONS)
  }
  console.log(`✅ Create ${DictionaryName} successfully.`)
  console.log(`📂 Path: ${DictionaryName}`)
  console.log(`🚀 Start your code tour!`)
}
