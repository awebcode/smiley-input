# smiley-input 😀

> A powerful and customizable React component that seamlessly integrates emoji picker functionality into any input element, enhancing user experience.

[![NPM](https://img.shields.io/npm/v/smiley-input.svg)](https://www.npmjs.com/package/smiley-input) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

<a href="https://awebcode.github.io/smiley-input/"><img width="500" src="https://awebcode.github.io/smiley-input/assets/images/screely-1566732641740.png" alt="Demo"></a>

## 📝 About

`SmileyInput` provides a simple and intuitive way to add emoji picker functionality to any input element in your React application. With just a few lines of code, you can enable your users to easily select and insert emojis into their text input. 

The component is highly customizable, allowing you to control the styling, positioning, and behavior of the emoji picker. It also supports various useful features out of the box, such as:

- Easy integration with any input element 
- Customizable appearance via props
- Built-in support for cleaning input on enter
- Callback functions for `onChange`, `onClick`, and `onEnter` events
- Ability to keep the picker open after selecting an emoji
- Internationalization support for multiple languages

`SmileyInput` leverages the power of the emoji-mart library to provide a wide range of emojis across different categories and styles. The internationalization capabilities allow you to cater to users from diverse linguistic backgrounds, making your application more inclusive and accessible.

Whether you're building a chat app, social media platform, or any other application that could benefit from emoji input, `SmileyInput` has you covered. Give your users a fun and engaging way to express themselves with this powerful yet easy-to-use component!

## 📦 Install

```bash
npm install --save smiley-input

## 📦 Install

```bash
npm install --save smiley-input
```

## 🚀 Usage

After install import the smiley-input component to display your input with emoji support like so:

```tsx
import { useState } from 'react'
import  SmileyInput  from 'smiley-input'
function App() {
  const [value, setValue] = useState("")

  return (
    <>
      <h1>{value}</h1>
     <SmileyInput value={value} setValue={setValue} className='m-2' />
    </>
  )
}

export default App

```

## 🧩 Props
# Including all props for html text area element
| Prop               | Type                     | Default          | Description                                                                                                              |
| ------------------ | ------------------------ | ---------------- | ------------------------------------------------------------------------------------------------------------------------ |
                      
| `value`            | string | required                  | ""               | The current value of the input element.                                                                                  
| `setValue`            | function | required                  | ""               | The callback to accept values.  
 

# Contact
For any questions or issues, feel free to open an issue or contact me at your-email@example.com.

# Changelog
v1.0.0: Initial release with core emoji input functionality.


## License

MIT © [awebcode](https://github.com/awebcode)
