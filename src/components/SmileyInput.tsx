import React, { useState, useRef, useCallback, useMemo } from "react";
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
  keepOpened?: boolean;
  className?: string;
  pickerOptions?: Omit<EmojiPickerProps, "data" | "onEmojiSelect">;
  emojiButtonElement?: React.ReactNode;
  emojiButtonClassName?: string;
}

/**
 * EmojiButton component
 */
const EmojiButton: React.FC<{
  emojiButtonElement: React.ReactNode;
  emojiButtonClassName: string;
  onClick: () => void;
}> = ({ emojiButtonElement, emojiButtonClassName, onClick }) => (
  <button
    onClick={onClick}
    className={`absolute bottom-2 right-2 h-8 w-8 text-lg ${emojiButtonClassName}`}
  >
    {emojiButtonElement}
  </button>
);

/**
 * EmojiPicker component
 */
const EmojiPicker: React.FC<{
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEmojiSelect: (emojiData: { emoji: string } | { native: string }) => void;
  pickerOptions?: object;
}> = ({ open, onOpenChange, onEmojiSelect, pickerOptions }) => (
  <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
    <DropdownMenu.Trigger asChild>
      <div />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content sideOffset={15} align="end" side="top">
        <Picker
          data={data}
          onEmojiSelect={onEmojiSelect}
          {...pickerOptions} // Spread picker options safely
        />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

/**
 * SmileyInput component
 */
export const SmileyInput: React.FC<SmileyInputProps> = React.memo(
  ({
    value = "",
    setValue,
    keepOpened = true,
    className,
    pickerOptions,
    emojiButtonElement = "😄", // Default emoji element
    emojiButtonClassName = "border-none focus:border-none focus:ring-0 focus:ring-offset-0",
    ...props
  }: SmileyInputProps) => {
    const inputRef = useRef<HTMLTextAreaElement | null>(null);
    const [open, setOpen] = useState(false);
    const [cursorPosition, setCursorPosition] = useState<number | null>(null);

    // Memoize the textarea className to avoid unnecessary recalculations
    const textAreaClassName = useMemo(() => {
      return `resize-none flex w-full rounded-lg border border-violet-300 ring-1 ring-offset-2 ring-violet-300 hover:ring-violet-400 focus:ring-violet-500 focus:outline-none bg-transparent px-4 py-3 text-base text-gray-800 placeholder:text-gray-400 shadow-sm transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`;
    }, [className]);

    // Handle input change and update cursor position
    const handleInputChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const newValue = e.target.value;
        setValue(newValue);
        setCursorPosition(e.target.selectionStart || null); // Save current cursor position

        if (!keepOpened) {
          setOpen(false); // Close picker if keepOpened is false
        }
      },
      [setValue, keepOpened]
    );

    // Handle emoji click and update input value
    const handleEmojiClick = useCallback(
      (emojiData: { emoji: string } | { native: string }) => {
        const emoji = "emoji" in emojiData ? emojiData.emoji : emojiData.native;
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
          setOpen(false); // Close picker after emoji selection if keepOpened is false
        }
      },
      [cursorPosition, setValue, value, keepOpened]
    );

    return  (
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
            className={textAreaClassName}
            rows={3}
            placeholder="Write your thoughts here..."
            {...props}
          />

          <EmojiButton
            emojiButtonElement={emojiButtonElement}
            emojiButtonClassName={emojiButtonClassName}
            onClick={() => setOpen((prevOpen) => !prevOpen)}
          />

          <EmojiPicker
            open={open}
            onOpenChange={setOpen}
            onEmojiSelect={handleEmojiClick}
            pickerOptions={pickerOptions}
          />
        </div>
      
    
    );
  }
);
