import React, { useState, useRef, useCallback, useMemo } from "react";
import SmileyIcon from "../assets/smiley-icon.svg"; // Ensure you have a smiley SVG icon here
import "../styles.css"
import EmojiPicker from "emoji-picker-react";
interface SmileyInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  setValue: (value: string) => void;
  className?: string;
}

export default function SmileyInput({
  value="",
  setValue,
  className,
  ...props
}: SmileyInputProps) {
  const [showPicker, setShowPicker] = useState(false);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);

  // Optimizing the input change handler
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
    },
    [setValue]
  );

  // Optimizing the emoji click handler with useCallback to avoid unnecessary re-renders
  const handleEmojiClick = useCallback(
    (emojiData: { emoji: string }) => {
      const emoji = emojiData.emoji;
      const cursorPosition = inputRef.current?.selectionStart || 0;
      const textBeforeCursor = value.substring(0, cursorPosition);
      const textAfterCursor = value.substring(cursorPosition);

      // Insert the emoji at the cursor position
      const newValue = textBeforeCursor + emoji + textAfterCursor;
      setValue(newValue);

      // Ensure the cursor stays after the newly inserted emoji
      setTimeout(() => {
        if (inputRef.current) {
          const newCursorPosition = cursorPosition + emoji.length;
          inputRef.current.selectionStart = newCursorPosition;
          inputRef.current.selectionEnd = newCursorPosition;
          inputRef.current.focus();
        }
      }, 0);
    },
    [setValue, value]
  );

  // Using useMemo for className optimizations
  const inputClassName = useMemo(() => {
    return `flex resize-none h-full w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`;
  }, [className]);

  return (
    <div className="relative flex min-h-[60px] items-center w-full">
      {/* Text Area with extended size */}
      <textarea
        value={value}
        onChange={handleInputChange} // Using the optimized onChange handler
        ref={inputRef}
        className={inputClassName}
        placeholder="Type something..."
        {...props}
      />
      {/* Smiley Icon button */}
      <button
        onClick={() => setShowPicker(!showPicker)}
        className="ml-3 p-1 bg-blue-500 hover:bg-blue-600 text-white rounded-full focus:outline-none 
        dark:bg-blue-700 dark:hover:bg-blue-800"
      >
        <img src={SmileyIcon} alt="Smiley Icon" style={{ width: "24px", height: "24px" }} className="w-8 h-8" />
      </button>
      {/* Emoji Picker */}
      {showPicker && (
           <div className="absolute top-full mt-2 right-0 z-10">
          <EmojiPicker open lazyLoadEmojis onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </div>
  );
}
