# Changelog


## v0.0.2

[compare changes](https://github.com/nyxb/vscode-styled-colors/compare/v0.0.1...v0.0.2)


### 🎨 Styles

  - **package.json:** Change galleryBanner theme from dark to light to improve visibility and accessibility ([f492891](https://github.com/nyxb/vscode-styled-colors/commit/f492891))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

## v0.0.1


### 🚀 Enhancements

  - **cache-manager.ts): add CacheManager class to manage dirty and saved decorations cache ✨ feat(editor-manager.ts): add EditorManager class to manage editor's decorations ✨ feat(extractor-mixin.ts:** Add Extractor class to manage strategies and enable them ([0ff443b](https://github.com/nyxb/vscode-styled-colors/commit/0ff443b))
  - **extension.ts:** Add support for colorizing text editors based on configuration settings and variables found in the text. ([84bd3d7](https://github.com/nyxb/vscode-styled-colors/commit/84bd3d7))
  - **queue.ts): add Queue class to manage async actions in a queue ✨ feat(listeners.ts:** Add event listeners for text document changes, text document visible ranges changes and text document content changes. Add functions to handle these events and update decorations accordingly. Add function to clean decoration map. Add TasksRunner class to handle async tasks. Add DecoPositionUpdate interface to handle decoration position updates. Add filterPositions function to filter positions in decoration map. Add disposeDecorationsForEditedLines function to dispose decorations for edited lines. Add updatePositionsDeletion function to update positions when lines are deleted. Add getRemovedLines function to get removed lines. Add getAddedLines function to get added lines. Add getEditedLines function to get edited lines. Add getDecorationsToStyledColors function to get decorations to styled colors. Add getCurrentRangeText function to get current range text. Add handleVisibleRangeEvent function to handle visible range event. Add updateDecorations function to update decorations. Add cleanDecorationMap function to clean decoration map. Add textDocumentUpdated function to handle text document updates. Add setupEventListeners function to setup event listeners. ([a677843](https://github.com/nyxb/vscode-styled-colors/commit/a677843))
  - **color-extractor.ts:** Add ColorExtractor class with IColorStrategy interface and IStrategy mixin to extract colors from file lines and text. The class has a method to extract all colors from a file and another method to extract one color from a text. ([6e66575](https://github.com/nyxb/vscode-styled-colors/commit/6e66575))
  - **color-decoration.ts:** Add ColorDecoration class to handle TextEditorDecorationType generation and disposal for a given color. ([145e53a](https://github.com/nyxb/vscode-styled-colors/commit/145e53a))
  - **color.ts:** Add Color class and IColor interface to represent a color and its rgb and alpha values ([3e1756f](https://github.com/nyxb/vscode-styled-colors/commit/3e1756f))
  - **__strategy-base.ts:** Add a base class for color strategy with common methods and properties to be extended by other color strategies. ([f19dbee](https://github.com/nyxb/vscode-styled-colors/commit/f19dbee))
  - **argb-strategy.ts:** Add new strategy to extract ARGB color values from text using regular expressions. The strategy extracts the alpha, red, green and blue values from the ARGB string and returns a Color object with the extracted values. ([8549262](https://github.com/nyxb/vscode-styled-colors/commit/8549262))
  - **hexa-strategy.ts:** Add new strategy to extract colors in hexadecimal format from a string. The strategy extracts the color value, its position in the string, its RGB values and its alpha value. The strategy is registered in the ColorExtractor class. ([7216eab](https://github.com/nyxb/vscode-styled-colors/commit/7216eab))
  - **hsl-strategy.ts:** Add support for HSL and HSLA color formats to extract and convert them to RGB and RGBA respectively. ([18a585e](https://github.com/nyxb/vscode-styled-colors/commit/18a585e))
  - **rgb-strategy.ts:** Add support for RGB and RGBA color extraction from a string value using a regular expression strategy. ([b9ccc4d](https://github.com/nyxb/vscode-styled-colors/commit/b9ccc4d))
  - **array.ts:** Add utility functions to handle arrays - `unique` function returns an array with unique values from the input array - `equals` function returns a boolean indicating if two arrays are equal or not ([f54e1fa](https://github.com/nyxb/vscode-styled-colors/commit/f54e1fa))
  - **color-util.ts:** Add color utility functions and classes to extract, generate and manipulate colors in a text document. ([d1af6ce](https://github.com/nyxb/vscode-styled-colors/commit/d1af6ce))
  - **mut-edited-line.ts:** Add mutEditedLine function to split TextDocumentContentChangeEvent into multiple lines if the added text contains multiple lines. This is useful for handling multi-line text changes in VSCode extensions. ([a0f4c90](https://github.com/nyxb/vscode-styled-colors/commit/a0f4c90))
  - **regexp.ts:** Add regular expression constants for end of line, alpha values, dot values and hexadecimal values to be used in other modules ([0c1d8c3](https://github.com/nyxb/vscode-styled-colors/commit/0c1d8c3))
  - **variable-decoration.ts:** Add VariableDecoration class to handle TextEditorDecorationType generation and disposal for variables in the editor ([80ce421](https://github.com/nyxb/vscode-styled-colors/commit/80ce421))
  - **variable-store.ts:** Add VariablesStore class to manage variables declarations and their locations. It provides methods to add, delete, get and find declarations. ([0873faf](https://github.com/nyxb/vscode-styled-colors/commit/0873faf))
  - **variable.ts:** Add Variable class with name, color, location, id and type properties and methods toRgbString and update. Add VariableLocation interface to describe the location of a variable. ([3726ec6](https://github.com/nyxb/vscode-styled-colors/commit/3726ec6))
  - **variables-extractor.ts:** Add VariablesExtractor class with IVariableStrategy interface and its methods to extract and delete variables, extract declarations, get variables count and find variables. ([609fead](https://github.com/nyxb/vscode-styled-colors/commit/609fead))
  - **variables-manager.ts:** Add VariablesManager class to manage color variables extraction and decoration in the workspace. It includes methods to extract variables from files, find variables declarations and variables, generate decorations, and setup extractors. ([6982eed](https://github.com/nyxb/vscode-styled-colors/commit/6982eed))
  - **__strategy-base.ts:** Add a base class for variable strategies to extract variable declarations and uses from code and store them in a variable store. The class also provides methods to extract the value of a variable and delete a variable. ([2eaa819](https://github.com/nyxb/vscode-styled-colors/commit/2eaa819))
  - **css-strategy.ts): add CSS variable strategy to extract variables from CSS files 🚀 chore(css-strategy.ts:** Register CSS variable strategy in the VariablesExtractor class to be used in the application ([9028576](https://github.com/nyxb/vscode-styled-colors/commit/9028576))
  - **less-strategy.ts:** Add LESS variable strategy to extract variables from LESS files using regular expressions ([6b8d900](https://github.com/nyxb/vscode-styled-colors/commit/6b8d900))
  - **sass-strategy.ts:** Add new SASS strategy to extract variables from SASS files using regex expressions. ([a6117a6](https://github.com/nyxb/vscode-styled-colors/commit/a6117a6))
  - **stylus-strategy.ts:** Add new file to register a new strategy for extracting variables from Stylus files. The strategy uses regular expressions to extract variable declarations and uses. ([9844a8e](https://github.com/nyxb/vscode-styled-colors/commit/9844a8e))
  - **test-util.ts:** Add regex_exec function to test-util module to simplify regex matching in tests ([06b36f1](https://github.com/nyxb/vscode-styled-colors/commit/06b36f1))
  - **style.scss:** Add .foo class with blue color to style.scss file ([29daad8](https://github.com/nyxb/vscode-styled-colors/commit/29daad8))

### 🏡 Chore

  - **package.json): remove unused dependencies and update main path to reflect new dist folder 🐛 fix(hsl-strategy.ts): update regex to support hsl and hsla values with or without spaces and commas 🐛 fix(rgb-strategy.ts): update regex to support rgba and rgb values with or without spaces and commas and alpha as percentage 🔧 chore(regexp.ts): add regex patterns for alpha as percentage and decimal 🔧 chore(variables-manager.ts:** Import fs module from 'fs' instead of 'fs-extra' ([33944cb](https://github.com/nyxb/vscode-styled-colors/commit/33944cb))
  - **.codebeatignore): remove file 🔥 chore(appveyor.yml): remove file 📝 docs(LICENSE:** Update license to MIT License and add author's name and year to copyright notice ([d936afb](https://github.com/nyxb/vscode-styled-colors/commit/d936afb))
  - **README.md): update README.md with new features and options 📝 chore(package.json:** Update package.json with new scripts and keywords ([b30b19b](https://github.com/nyxb/vscode-styled-colors/commit/b30b19b))
  - **.gitignore:** Remove vscode-styled-colors-0.0.0.vsix from git tracking to avoid committing unnecessary files ([b60f9a9](https://github.com/nyxb/vscode-styled-colors/commit/b60f9a9))

### ✅ Tests

  - **color-util.test.ts:** Add unit tests for ColorUtil utility functions ([131e319](https://github.com/nyxb/vscode-styled-colors/commit/131e319))
  - **extension.test.ts:** Add tests to ensure extension is activated successfully upon opening a scss file, successfully extract colors in visible textEditor, and only generate decorations for visible part of the document ([c71c9c0](https://github.com/nyxb/vscode-styled-colors/commit/c71c9c0))
  - **index.ts:** Add function to run mocha tests ([8494660](https://github.com/nyxb/vscode-styled-colors/commit/8494660))
  - **regexp-util.test.ts:** Add tests for util/regexp.ts to ensure correct behavior of regex_exec function and ALPHA and DOT_VALUE regex patterns ([f9611fc](https://github.com/nyxb/vscode-styled-colors/commit/f9611fc))
  - **argb-extractor.test.ts:** Add tests for ARGB color extractor strategy to ensure correct color extraction and output ([9fc5fc7](https://github.com/nyxb/vscode-styled-colors/commit/9fc5fc7))
  - **browser-extractor.test.ts:** Add tests for browser predefined color Regex to ensure it matches and doesn't match the expected values ([dc69339](https://github.com/nyxb/vscode-styled-colors/commit/dc69339))
  - **hexa-extractor.test.ts:** Add tests for CSS hexa color Regex to ensure correct matching of different formats and cases ([a6a28a2](https://github.com/nyxb/vscode-styled-colors/commit/a6a28a2))
  - **hsl-extractor.test.ts:** Add tests for hsl(a) color Regex to ensure it matches valid hsl(a) colors and rejects invalid ones ([ad40a99](https://github.com/nyxb/vscode-styled-colors/commit/ad40a99))
  - **rgb-extractor.test.ts:** Add tests for RGB and RGBA color regex to ensure correct matching and handling of different values ([01da65d](https://github.com/nyxb/vscode-styled-colors/commit/01da65d))
  - **css-variables-extractor:** Add tests for CSS variables declaration and use regex and decoration generation ([b5da5fb](https://github.com/nyxb/vscode-styled-colors/commit/b5da5fb))
  - **less-variables-extractor.test.ts:** Add tests for less variables declaration and use regexes to improve test coverage and ensure correct behavior ([a728a14](https://github.com/nyxb/vscode-styled-colors/commit/a728a14))
  - **sass-variables-extractor.test.ts:** Add tests for Sass variables declaration and use regexes to improve coverage ([700a9bc](https://github.com/nyxb/vscode-styled-colors/commit/700a9bc))
  - **stylus-variables-extractor.test.ts:** Add tests for stylus variables declaration and use regexes to improve coverage ([8910ff3](https://github.com/nyxb/vscode-styled-colors/commit/8910ff3))

### 🎨 Styles

  - **assets): add new logo.svg and demo.gif assets 🚀 feat(lib/tasks-runner.ts:** Add TasksRunner class to handle running tasks in a sequence ([5a5c809](https://github.com/nyxb/vscode-styled-colors/commit/5a5c809))
  - **package.json): change galleryBanner theme to dark to improve visibility and consistency with the extension's purpose 🔖 chore(package.json:** Update version to 0.0.0 to indicate initial release of the extension ([112f968](https://github.com/nyxb/vscode-styled-colors/commit/112f968))

### ❤️  Contributors

- Nyxb <contact@nyxb.xyz>

