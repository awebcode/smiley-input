import React, { useEffect, useState } from "react";
import { SmileyInput } from "./components/SmileyInput";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm"; // For GitHub-Flavored Markdown
import rehypeHighlight from "rehype-highlight"; // For syntax highlighting
import "highlight.js/styles/github.css"; // Import a highlight.js theme
import "./styles.css"; // Add custom CSS if needed

const App = () => {
  const [value, setValue] = React.useState("");
  const [markdownContent, setMarkdownContent] = useState("");

  // Fetch MARKDOWN.md dynamically
  useEffect(() => {
    fetch("/src/assets/MARKDOWN.md")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Failed to load MARKDOWN.md ${response.statusText}`);
        }
        return response.text();
      })
      .then(setMarkdownContent)
      .catch((error) => console.error(error));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
      {/* Smiley Input Section */}
      <div className="bg-white shadow-lg rounded-lg p-6 max-w-xl w-full">
        <h1 className="text-2xl font-bold mb-4 text-center text-blue-500">
          Smiley-Input Demo
        </h1>
        <p className="mb-6 text-center text-gray-600">
          Type your message below and add emojis with the smiley button!
        </p>
        <SmileyInput
          value={value}
          setValue={setValue}
          keepOpened={true}
          className="custom-textarea"
          pickerOptions={{ theme: "light" }}
          emojiButtonElement="😊"
          emojiButtonClassName="custom-emoji-button"
        />
        <p className="mt-4 text-center text-gray-700">
          <strong>Message:</strong> {value || "Type something..."}
        </p>
      </div>

      {/* Render Markdown Section */}
     <div className="mt-8 bg-white shadow-md rounded-lg p-6 max-w-xl w-full">
        <h2 className="text-xl font-bold mb-4 text-center text-green-500">
        Install Smiley-Input
        </h2>
        <div className="prose prose-blue mx-auto">
          <Markdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[ rehypeHighlight]}
          >
            {markdownContent || "Loading README.md..."}
          </Markdown>
        </div> 
      </div>
    </div>
  );
};

export default App;
