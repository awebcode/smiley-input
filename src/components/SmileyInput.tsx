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

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      setValue(e.target.value);
      if (!keepOpened) {
        setOpen(false);
      }
    },
    [setValue, keepOpened]
  );

  const handleEmojiClick = useCallback(
    (emojiData: { emoji: string } | { native: string }) => {
      const emoji = "emoji" in emojiData ? emojiData.emoji : emojiData.native;
      const cursorPosition = inputRef.current?.selectionStart || 0;
      const textBeforeCursor = value.substring(0, cursorPosition);
      const textAfterCursor = value.substring(cursorPosition);

      const newValue = textBeforeCursor + emoji + textAfterCursor;
      setValue(newValue);

      setTimeout(() => {
        if (inputRef.current) {
          const newCursorPosition = cursorPosition + emoji.length;
          inputRef.current.selectionStart = newCursorPosition;
          inputRef.current.selectionEnd = newCursorPosition;
          inputRef.current.focus();
        }
      }, 0);

      if (!keepOpened) {
        setOpen(false);
      }
    },
    [setValue, value, keepOpened]
  );

  return (
    <div className="relative flex min-h-[60px] items-center w-full">
      <textarea
        value={value}
        onChange={handleInputChange}
        ref={inputRef}
        className={`resize-none    flex w-full rounded-md border border-input bg-transparent px-3 py-2 text-base shadow-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm", ${className}`}
        rows={2}
        placeholder="Write your thoughts here..."
        {...props}
      />
      <DropdownMenu.Root open={open} onOpenChange={setOpen}>
        <DropdownMenu.Trigger
          asChild
          className="border-none outline-none h-8 w-8 bg-blue-500/60 hover:bg-blue-500 rounded-full"
        >
          <button
            className={`absolute bottom-1 right-2 h-full w-full text-lg ${emojiButtonClassName}`}
          
          >
            {emojiButtonElement}
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Portal>
          <DropdownMenu.Content
            sideOffset={18}
            align="start"
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
