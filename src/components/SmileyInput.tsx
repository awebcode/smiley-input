import React, { useState, useRef, useCallback } from "react";
import * as DropdownMenu from "@radix-ui/react-dropdown-menu";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import type EmojiPickerProps from "../types";
/**
 * SmileyInput component props interface
 */
export interface SmileyInputProps extends React.InputHTMLAttributes<HTMLTextAreaElement> {
  value: string;
  setValue: (value: string) => void;
  /** Keep the picker open after selecting an emoji */
  keepOpened?: boolean;
  /** Input/TextArea class name */
  className?: string;
  /** Emoji picker options */
  pickerOptions?: Omit<EmojiPickerProps, "data" | "onEmojiSelect">;
  /** Emoji button element */
  emojiButtonElement?: React.ReactNode;
  /** Emoji button class name */
  emojiButtonClassName?: string;
}

/**
 * SmileyInput component
 * @component for Emoji Supported Input React with TailwindCSS
 * @name SmileyInput
 */
export function SmileyInput({
  value = "",
  setValue,
  keepOpened = true,
  className,
  pickerOptions,
  emojiButtonElement = "😄" /** Emoji Element */,
  emojiButtonClassName = "border-none focus:border-none focus:ring-0 focus:ring-offset-0",
  ...props
}: SmileyInputProps) {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [open, setOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);

  // Handle input change
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      setCursorPosition(e.target.selectionStart || null); // Save current cursor position
      if (!keepOpened) {
        setOpen(false);
      }
    },
    [setValue, keepOpened]
  );

  // Handle emoji click
  const handleEmojiClick = useCallback(
    (emojiData: { emoji: string } | { native: string }) => {
      const emoji = "emoji" in emojiData ? emojiData.emoji : emojiData.native;

      // Determine current cursor position
      const position = cursorPosition ?? value.length; // Use saved cursor position or append to end
      const textBeforeCursor = value.substring(0, position);
      const textAfterCursor = value.substring(position);
      const newValue = textBeforeCursor + emoji + textAfterCursor;

      setValue(newValue);

      // Restore focus and update cursor position
      setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const newCursorPosition = position + emoji.length;
          inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
          setCursorPosition(newCursorPosition); // Update saved cursor position
        }
      }, 0);

      if (!keepOpened) {
        setOpen(false);
      }
    },
    [cursorPosition, setValue, value, keepOpened]
  );

  return (
    <div className="relative flex min-h-[60px] items-center w-full">
      <textarea
        value={value}
        onChange={handleInputChange}
        onClick={() => {
          if (inputRef.current) {
            setCursorPosition(inputRef.current.selectionStart); // Update cursor position on click
          }
        }}
        ref={inputRef}
        className={`resize-none flex w-full rounded-md border-2 border-emerald-500 ring-1 ring-offset-1  border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none  disabled:cursor-not-allowed disabled:opacity-50 md:text-sm ${className}`}
        rows={2}
        placeholder="Write your thoughts here..."
        {...props}
      />
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger asChild className="border-none outline-none h-8 w-8 bg-gray-300/60 rounded-full">
          <button
            className={`absolute bottom-2 right-2 h-8 w-8 text-lg ${emojiButtonClassName}`}
            // onKeyDown={(e) => {
            //   if (e.key === "Enter" || e.key === " ") {
            //     e.preventDefault();
            //     setOpen((prevOpen) => !prevOpen);
            //   }
            // }}
          >
            {emojiButtonElement}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={15}
            align="end"
            side="top"
          >
            <Picker
              data={data}
              onEmojiSelect={handleEmojiClick}
              {...pickerOptions} // Spread picker options safely
            />
          </DropdownMenu.Content>
        </DropdownMenu.Portal>
      </DropdownMenu.Root>
    </div>
  );
}
