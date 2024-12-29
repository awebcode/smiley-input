
# Installation

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

import React, { useState } from 'react';

import { SmileyInput } from 'smiley-input';

const App = () => {

  const [message, setMessage] = useState('');

  const handleSendMessage = (value) => {

    console.log("Message sent:", value);

    setMessage('');

  };

  return (

    <div className="p-4">

      <SmileyInput

        value={message}

        setValue={setMessage}

        keepOpened={true}

        className="custom-textarea"

        pickerOptions={{

          theme: 'light',

        }}

        emojiButtonElement="😊"

        emojiButtonClassName="custom-emoji-button"

      />

      <button className="mt-2 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => handleSendMessage(message)}>Send</button>

    </div>

  );

};

export default App;


```




