import React from "react";
import { SmileyInput } from "react-input-emoji-v3";
// import { SmileyInput } from "smiley-v2";
const App = () => {
  const [value, setValue] = React.useState("");

  return (
    <div className="fixed top-0 right-0 left-0 m-4 p-4 max-w-xl mx-auto min-h-screen self-center">
      <h1 className="text-xl">Smiley-Input:* {value||""}</h1> <SmileyInput value={value} setValue={setValue} />
    </div>
  );
};

export default App;
// import React from 'react'
// import { Button } from "react-input-emoji-v3"
// const App = () => {
//   return (
//     <div><Button/></div>
//   )
// }

// export default App