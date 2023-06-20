'use strict'
// The module 'vscode' contains the VS Code extensibility API
// Import the module and reference it with the alias vscode in your code below
import type {
   ExtensionContext,
   Range,
   Selection,
   StatusBarItem,
   TextDocument,
   TextEditor,
   TextEditorSelectionChangeEvent,
} from 'vscode'
import {
   StatusBarAlignment,
   ThemeColor,
   window,
   workspace,
} from 'vscode'
import * as globToRegexp from 'glob-to-regexp'
import type Variable from './lib/variables/variable'
import type { DocumentLine, IDecoration, LineExtraction } from './lib/util/color-util'
import ColorUtil from './lib/util/color-util'
import Queue from './lib/queue'
import VariablesManager from './lib/variables/variables-manager'
import CacheManager from './lib/cache-manager'
import EditorManager from './lib/editor-manager'
import type VariableDecoration from './lib/variables/variable-decoration'
import type { StyledColorsConfig } from './lib/styled-colors-config'
import { getStyledColorsConfig } from './lib/styled-colors-config'

import Listeners from './listeners'

let config: StyledColorsConfig = {
   languages: [],
   isHideCurrentLineDecorations: true,
   styledVariables: [],
   styledColors: [],
   filesToExcludes: [],
   filesToIncludes: [],
   inferedFilesToInclude: [],
   searchVariables: false,
   decorationFn: null,
}

class StyledColorsContext {
   editor: TextEditor = null
   nbLine = 0
   deco: Map < number, IDecoration[] > = new Map()
   currentSelection: number[] = null
   statusBar: StatusBarItem

   constructor() {
      this.statusBar = window.createStatusBarItem(StatusBarAlignment.Right)
   }

   updateStatusBar(activated: boolean): void {
      // List of icons can be found here https://code.visualstudio.com/api/references/icons-in-labels
      const icon = activated
         ? '$(check)'
         : '$(circle-slash)'
      const color = activated
         ? undefined
         : new ThemeColor('errorForeground')
      const hoverMessage = activated
         ? 'styled-colors is activated for this file'
         : 'styled-colors is not activated for this file'
      this.statusBar.text = `${icon} styled-colors`
      this.statusBar.color = color
      this.statusBar.tooltip = hoverMessage
      this.statusBar.show()
   }
}

const q = new Queue()

async function initDecorations(context: StyledColorsContext) {
   if (!context.editor)
      return

   const text = context.editor.document.getText()
   const fileLines: DocumentLine[] = ColorUtil.textToFileLines(text)

   const lines: DocumentLine[] = context.editor.visibleRanges.reduce((acc: DocumentLine[], range: Range) => {
      return [
         ...acc,
         ...fileLines.slice(range.start.line, range.end.line + 2),
      ]
   }, [])

   // removeDuplicateDecorations(context);
   await VariablesManager.findVariablesDeclarations(context.editor.document.fileName, fileLines)
   const variables: LineExtraction[] = await VariablesManager.findVariables(context.editor.document.fileName, lines)
   const colors: LineExtraction[] = await ColorUtil.findColors(lines)
   generateDecorations(colors, variables, context.deco)
   return EditorManager.decorate(context.editor, context.deco, context.currentSelection)
}

function updateContextDecorations(decorations: Map<number, IDecoration[]>, context: StyledColorsContext): void {
   const it = decorations.entries()
   let tmp = it.next()
   while (!tmp.done) {
      const line = tmp.value[0]
      if (context.deco.has(line))
         context.deco.set(line, context.deco.get(line).concat(decorations.get(line)))

      else
         context.deco.set(line, decorations.get(line))

      tmp = it.next()
   }
}

function removeDuplicateDecorations(context: StyledColorsContext): void {
   const it = context.deco.entries()
   const m: Map<number, IDecoration[]> = new Map()
   let tmp = it.next()

   while (!tmp.done) {
      const line = tmp.value[0]
      const decorations = tmp.value[1]
      let newDecorations = []
      // TODO; use reduce?
      decorations.forEach((deco: VariableDecoration) => {
         deco.generateRange(line)
         const exist = newDecorations.findIndex((_: IDecoration) => deco.currentRange.isEqual(_.currentRange))
         if (exist !== -1) {
            newDecorations[exist].dispose()
            newDecorations = newDecorations.filter((_, i) => i !== exist)
         }
         newDecorations.push(deco)
      })
      m.set(line, newDecorations)
      tmp = it.next()
   }
   context.deco = m
}

function updateDecorationMap(map: Map<number, IDecoration[]>, line: number, decoration: IDecoration) {
   if (map.has(line))
      map.set(line, map.get(line).concat([decoration]))

   else
      map.set(line, [decoration])
}

function generateDecorations(colors: LineExtraction[], variables: LineExtraction[], decorations: Map<number, IDecoration[]>): Map<number, IDecoration[]> {
   colors.map(({ line, colors }) => colors.forEach((color) => {
      const decoration = ColorUtil.generateDecoration(color, line, config.decorationFn)
      updateDecorationMap(decorations, line, decoration)
   }))
   variables.map(({ line, colors }) => colors.forEach((variable) => {
      const decoration = VariablesManager.generateDecoration(<Variable>variable, line, config.decorationFn)
      updateDecorationMap(decorations, line, decoration)
   }))
   return decorations
}

/**
 * Check if styled-colors support a language
 *
 * @param {string} languageId A valid languageId
 * @returns {boolean}
 */
function isLanguageSupported(languageId: string): boolean {
   return config.languages.includes(languageId)
}

/**
 * Check if the file is the `styled-colors.include` setting
 *
 * @param {string} fileName A valid filename (path to the file)
 * @returns {boolean}
 */
function isIncludedFile(fileName: string): boolean {
   return config.filesToIncludes.find((globPattern: string) => globToRegexp(globPattern).test(fileName)) !== undefined
}

/**
 * Check if a file can be styled by styled-colors
 *
 * @param {TextDocument} document The document to test
 * @returns {boolean}
 */
function canStyled(document: TextDocument): boolean { // update to use filesToExcludes. Remove `isLanguageSupported` ? checking path with file extension or include glob pattern should be enough
   return isLanguageSupported(document.languageId) || isIncludedFile(document.fileName)
}

function handleTextSelectionChange(event: TextEditorSelectionChangeEvent, cb: () => void) {
   if (!config.isHideCurrentLineDecorations || event.textEditor !== extension.editor)
      return cb()

   if (extension.currentSelection.length !== 0) {
      extension.currentSelection.forEach((line) => {
         const decorations = extension.deco.get(line)
         if (decorations !== undefined)
            EditorManager.decorateOneLine(extension.editor, decorations, line)
      })
   }
   extension.currentSelection = []
   event.selections.forEach((selection: Selection) => {
      const decorations = extension.deco.get(selection.active.line)
      if (decorations)
         decorations.forEach(_ => _.hide())
   })
   extension.currentSelection = event.selections.map((selection: Selection) => selection.active.line)
   return cb()
}

function handleCloseOpen(document: TextDocument) {
   q.push((cb) => {
      if (extension.editor && extension.editor.document.fileName === document.fileName) {
         CacheManager.saveDecorations(document, extension.deco)
         return cb()
      }
      return cb()
   })
}

async function styledColors(editor: TextEditor, cb: () => void): Promise<void> {
   extension.editor = null
   extension.deco = new Map()
   if (!editor || !canStyled(editor.document)) {
      extension.updateStatusBar(false)
      return cb()
   }
   extension.updateStatusBar(true)
   extension.editor = editor
   extension.currentSelection = editor.selections.map((selection: Selection) => selection.active.line)
   const deco = CacheManager.getCachedDecorations(editor.document)
   if (deco) {
      extension.deco = deco
      extension.nbLine = editor.document.lineCount

      EditorManager.decorate(extension.editor, extension.deco, extension.currentSelection)
   }
   else {
      extension.nbLine = editor.document.lineCount
      try {
         await initDecorations(extension)
      }
      finally {
         CacheManager.saveDecorations(extension.editor.document, extension.deco)
      }
   }
   return cb()
}

function handleChangeActiveTextEditor(editor: TextEditor) {
   if (extension.editor !== undefined && extension.editor !== null) {
      extension.deco.forEach(decorations => decorations.forEach(deco => deco.hide()))
      CacheManager.saveDecorations(extension.editor.document, extension.deco)
   }
   getVisibleFileEditors().filter(e => e !== editor).forEach((e) => {
      q.push(cb => styledColors(e, cb))
   })
   q.push(cb => styledColors(editor, cb))
}

function cleanDecorationList(context: StyledColorsContext, cb: () => void): void {
   const it = context.deco.entries()
   let tmp = it.next()
   while (!tmp.done) {
      const line = tmp.value[0]
      const decorations = tmp.value[1]
      context.deco.set(line, decorations.filter(decoration => !decoration.disposed))
      tmp = it.next()
   }
   return cb()
}

function clearCache() {
   extension.deco.clear()
   extension.deco = new Map()
   CacheManager.clearCache()
}

function handleConfigurationChanged() {
   const newConfig = getStyledColorsConfig()
   clearCache()
   // delete current decorations then regenerate decorations
   ColorUtil.setupColorsExtractors(newConfig.styledColors)

   q.push(async (cb) => {
      // remove event listeners?
      VariablesManager.setupVariablesExtractors(newConfig.styledVariables)

      if (newConfig.searchVariables)
         await VariablesManager.getWorkspaceVariables(newConfig.filesToIncludes.concat(newConfig.inferedFilesToInclude), newConfig.filesToExcludes) // 👍

      return cb()
   })
   config = newConfig
   styledVisibleTextEditors()
}

function initEventListeners(context: ExtensionContext) {
   window.onDidChangeTextEditorSelection(event => q.push(cb => handleTextSelectionChange(event, cb)), null, context.subscriptions)

   workspace.onDidCloseTextDocument(handleCloseOpen, null, context.subscriptions)
   workspace.onDidSaveTextDocument(handleCloseOpen, null, context.subscriptions)
   window.onDidChangeActiveTextEditor(handleChangeActiveTextEditor, null, context.subscriptions)
   workspace.onDidChangeConfiguration(handleConfigurationChanged, null, context.subscriptions) // Does not update when local config file is edited manualy ><

   Listeners.setupEventListeners(context)
}

function getVisibleFileEditors(): TextEditor[] {
   return window.visibleTextEditors.filter(editor => editor.document.uri.scheme === 'file')
}

function styledVisibleTextEditors() {
   extension.nbLine = 65
   getVisibleFileEditors().forEach((editor) => {
      q.push(cb => styledColors(editor, cb))
   })
}

let extension: StyledColorsContext

export function activate(context: ExtensionContext): StyledColorsContext {
   extension = new StyledColorsContext()
   config = getStyledColorsConfig()
   ColorUtil.setupColorsExtractors(config.styledColors)
   VariablesManager.setupVariablesExtractors(config.styledVariables)
   q.push(async (cb) => {
      try {
         if (config.searchVariables)
            await VariablesManager.getWorkspaceVariables(config.filesToIncludes.concat(config.inferedFilesToInclude), config.filesToExcludes) // 👍

         initEventListeners(context)
      }
      catch (error) {
      // do something
      }
      return cb()
   })
   styledVisibleTextEditors()
   return extension
}

// this method is called when your extension is deactivated
export function deactivate(): void {
   extension.nbLine = null
   extension.editor = null
   extension.deco.clear()
   extension.deco = null
   CacheManager.clearCache()
}

export {
   canStyled,
   StyledColorsContext,
   styledColors,
   config,
   extension,
   q,
   updateContextDecorations,
   generateDecorations,
   removeDuplicateDecorations,
   cleanDecorationList,
}
