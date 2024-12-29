# smiley-input 😄😎✅👀

`smiley-input` is a React component that enables users to input text and emojis effortlessly. This component is ideal for chat applications, social media platforms, and any interactive applications where emoji input is required.

## Live Demo

Check out the  [Live Demo here](https://smiley-input.vercel.app/).

Watch the video demo on [YouTube](https://youtube.com/demo-video).

![Screenshot](https://raw.githubusercontent.com/awebcode/smiley-input/master/src/assets/smiley-input.png)

## Features

- Easy integration into any React application

- Customizable emoji picker

- Supports emoji insertion at the cursor position

- Responsive design for different screen sizes

- Configurable emoji picker options

- Styled with Tailwind CSS

## Installation

To install the package, run the following command:

```bash

npm install smiley-input

```

or using yarn/bun:

```bash

yarn add smiley-input || bun add  smiley-input

```

## Usage

Here is a simple example to get you started with `smiley-input`:

### Import the Component

```jsx
import React, { useState } from "react";

import { SmileyInput } from "smiley-input";

const App = () => {
  const [message, setMessage] = useState("");

  const handleSendMessage = (value) => {
    console.log("Message sent:", value);  # Api Call
    setMessage("");
  };

  return (
    <div className="p-4">
           {" "}
      <SmileyInput
        value={message}
        setValue={setMessage}
        keepOpened={true}
        className="custom-textarea"
        pickerOptions={{
          theme: "light",
        }}
        emojiButtonElement="😊"
        emojiButtonClassName="custom-emoji-button h-8 w-8"
      />
            <button
        className="mt-2 px-4 py-2 bg-violet-500 text-white rounded"
        onClick={() => handleSendMessage(message)}
      >
        Send
      </button>   {" "}
    </div>
  );
};

export default App;
```

### Tailwind CSS Setup

If you haven't already set up Tailwind CSS in your project, follow these steps:

1\. Install Tailwind CSS:

```bash

npm install -D tailwindcss postcss autoprefixer

npx tailwindcss init -p

```

2\. Configure your `tailwind.config.js`:

```js

// tailwind.config.js

module.exports = {

content: [

'./src/\*_/_.{js,jsx,ts,tsx}',

],

theme: {

extend: {},

},

plugins: [],

}

```

3\. Add Tailwind's directives to your CSS file:

```css

/_ styles.css _/

@tailwind base;

@tailwind components;

@tailwind utilities;

```

4\. Import the CSS file in your entry point (e.g., `index.tsx`):

```jsx

import './styles.css';

```

### Example Styles

```css

/* Custom styles for the textarea and emoji button */

.custom-textarea {

  @apply border border-gray-300 p-2 text-base rounded-md;

}

.custom-emoji-button {

  @apply bg-none border-none cursor-pointer text-lg;

}

```

## Props

The `SmileyInput` component accepts the following props:

| Prop                | Type                                            | Description                                              |

|---------------------|-------------------------------------------------|----------------------------------------------------------|

| `value`             | `string`                                        | The current value of the input                           |

| `setValue`          | `(value: string) => void`                       | Function to update the input value                       |

| `keepOpened`        | `boolean`                                       | Keep the emoji picker open after selecting an emoji      |

| `className`         | `string`                                        | Custom class name for the input                          |

| `pickerOptions`     | `Omit<EmojiPickerProps, 'data' | 'onEmojiSelect'>` | Configuration options for the emoji picker               |

| `emojiButtonElement`| `React.ReactNode`                               | Custom element for the emoji button                      |

| `emojiButtonClassName`| `string`                                      | Custom class name for the emoji button                   |

## Contributing

Contributions are welcome! If you find a bug or have a feature request, please open an issue. If you would like to contribute code, please open a pull request.

## License

This project is licensed under the MIT License. See the [LICENSE](./LICENSE) file for details.

---

This README now includes live demo links at the beginning, along with the rest of the essential information to help users get started with `smiley-input`. If you need any further adjustments or additional information, feel free to ask!
