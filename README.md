# 💅 &nbsp; Styled-Colors

<p align="center">
<a href="https://marketplace.visualstudio.com/items?itemName=nyxb.vscode-styled-colors" target="__blank"><img src="https://img.shields.io/visual-studio-marketplace/v/nyxb.vscode-styled-colors.svg?style=flat&colorA=18181B&colorB=14F195&amp;label=VS%20Code%20Marketplace&logo=visual-studio-code" alt="Visual Studio Marketplace Version" /></a>
</p>

> Effortlessly visualize CSS colors in your JavaScript, TypeScript, and other source files. This extension is designed to work excellently with styled-components, dynamically generating a colored underline for your color specifications. The underline can be customized to appear as a background color through settings.

## 🌈 &nbsp; Key Features

- 🖥️ &nbsp; Support for source files like JavaScript and TypeScript.
- 💅 &nbsp; Ideal for working with styled-components.
- 👵👶 &nbsp; Support for both modern and legacy CSS color syntax. This includes:
  - 🌈 &nbsp; RGB: `rgb(0, 0, 0)`, `rgb(0 0 0)`, `rgba(12, 122, 231, 0.2)`, `rgb(12 122 231 / 0.2)`
  - 🌐 HSL: `hsl(.75turn, 60%, 70%)`, `hsla(270, 60%, 50%, 15%)`, `hsl(270 60% 50% / 15%)`, `hsl(.75turn 60% 70%)`
- 🖍️ &nbsp; Display of colors is done through an underline by default but can be set to background through settings.
- 🔄 &nbsp; Live color background updates.
- 🌎 &nbsp; Comprehensive color support, including:
  - 🎨 &nbsp; CSS variables
  - 📦 &nbsp; Preprocessor variables
  - 🌍 &nbsp; Cross-browser colors (e.g., _red, blue, green..._)
  - 🔢 &nbsp; CSS hexadecimal color
  - 💡 &nbsp; RGB/RGBA color
  - 🅰️ &nbsp; ARGB color

## ⚙️ &nbsp; Options (settings)

The following Visual Studio Code settings are available for the Styled-Colors extension. These can be set in user preferences `(cmd+,)` or workspace settings `(.vscode/settings.json)`.

### 🗣 &nbsp; styled-colors.languages _ARRAY_

Configure a list of languages that should be colorized. You can learn about languages at <https://code.visualstudio.com/docs/languages/overview>.

For example, if you want to styled-colors colors in `python` files, you just need to include it:

```json
  "styled-colors.languages": [
    "python",
    // ...
  ]
```

### 🔍 &nbsp; styled-colors.enable_search_variables _BOOLEAN_ _default: true_

By default, Styled-Colors read and parse all files in your workspace that are targeted by the settings styled-colors.languages, styled-colors.include, and styled-colors.exclude to extract all variables. Thanks to this behavior, all variables will have colored background even if you never open the file containing the declaration. _⚠️ This setting can slow down VS Code at opening_

### 📚 &nbsp; colorize.include

Configure glob patterns for including files and folders. By default, Styled-Colors is enabled for files matching one of the languages defined in the styled-colors.languages config. With this config, you can enable Styled-Colors for other files or folders. Read more about glob patterns [here](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options).

### ❌ &nbsp; styled-colors.exclude

Configure glob patterns for excluding files and folders. Styled-Colors will not colorize colors in these files and folders and it'll also not search for variables inside. Read more about glob patterns [here](https://code.visualstudio.com/docs/editor/codebasics#_advanced-search-options).

### 👀 &nbsp; styled-colors.hide_current_line_decorations _BOOLEAN_ _default: true_

By default, decorations for the current line are hidden. Set this setting to `false` if you want to deactivate this behavior.

### 🎨 &nbsp; styled-colors.colorized_colors _ARRAY_

This options allow you to enable/disable colorization for a type of colors.

Available colors are :

- 💎 &nbsp; `HEXA`: for hexadecimal colors: `#RGB`, `#RGBA`, `#RRGGBB`, `#RRGGBBAA`, `0xRGB`, `0xRGBA`, `0xRRGGBB` or `0xRRGGBBAA`
- 🎨 &nbsp; `ARGB`: for argb colors: `#RGB`, `#ARGB`, `#RRGGBB` or `#AARRGGBB`
- 🔴 &nbsp; `RGB`: for rgb colors: `rgb(r,g,b)` or `rgba(r,g,b,a)`
- 🌈 &nbsp; `HSL`: for HSL colors: `hsl(h,s,l)` or `hsla(h,s,l,a)`
- 🌐 &nbsp; `BROWSERS_COLORS`: for native browser's colors like `white`, `red`, `blue`...


For example, if you want to only styled-colors hexa colors (`#fff, #ffffff, 0xFFF`) in your files you can update the option like this :

```json
  "styled-colors.colorized_colors": [
    "HEXA"
  ]
```

### 🎨 &nbsp; styled-colors.colorized_variables

This options allow you to enable/disable colorization for a type of variables.

For example if you use less in your project you setup the option like this

```json
  "styled-colors.colorized_variables": [
    "LESS"
  ]
```

_This way all @variables will be colorized_


## 🤝💰 Sponsors

<p align="center">
  <a href="https://cdn.jsdelivr.net/gh/nyxb/static/sponsors.svg">
    <img src='https://cdn.jsdelivr.net/gh/nyxb/static/sponsors.png'/>
  </a>
</p>

## 📜 License

[MIT](./LICENSE) 💚 License © 2023 [Dennis Ollhoff](https://github.com/nyxb)
