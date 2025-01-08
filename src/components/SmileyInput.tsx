import React, { useState, useRef, useCallback, useMemo, useEffect } from "react";
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
    type="button"
    onClick={onClick}
    className={` h-8 w-8 text-lg ${emojiButtonClassName}`}
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
  side?: "top" | "bottom"| "left" | "right";
  sideOffset?: number;
}> = ({ open, onOpenChange, onEmojiSelect, pickerOptions, side="bottom",sideOffset=26 }) => (
  <DropdownMenu.Root open={open} onOpenChange={onOpenChange}>
    <DropdownMenu.Trigger asChild>
      <div />
    </DropdownMenu.Trigger>
    <DropdownMenu.Portal>
      <DropdownMenu.Content  sideOffset={sideOffset} side={side} align="end" >
        <Picker
          data={data}
          onEmojiSelect={onEmojiSelect}
          {...pickerOptions} // Spread picker options safely
        />
      </DropdownMenu.Content>
    </DropdownMenu.Portal>
  </DropdownMenu.Root>
);

export const SmileyInput: React.FC<SmileyInputProps> = ({
  value = "",
  setValue,
  keepOpened = true,
  className,
  pickerOptions,
  emojiButtonElement = "😄",
  emojiButtonClassName = "border-none  focus:border-none focus:ring-0 focus:ring-offset-0",
  ...props
}) => {
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [open, setOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState<number | null>(null);
  const textAreaClassName = useMemo(
    () =>
      ` flex w-full rounded-lg border border-violet-300 ring-1 ring-offset-2 ring-violet-300 hover:ring-violet-400 focus:ring-violet-500 focus:outline-none bg-transparent px-2 py-1 text-base text-gray-800 placeholder:text-gray-400 shadow-sm transition-all duration-300 ease-in-out disabled:cursor-not-allowed disabled:opacity-50 md:text-sm focus-visible:ring-2 focus-visible:ring-offset-2 ${className}`,
    [className]
  );
  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLTextAreaElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      setCursorPosition(e.target.selectionStart || null);
      if (!keepOpened) {
        setOpen(false);
      }
    },
    [setValue, keepOpened]
  );
  const handleEmojiClick = useCallback(
    (emojiData: { emoji: string } | { native: string }) => {
      const emoji = "emoji" in emojiData ? emojiData.emoji : emojiData.native;
      const position = cursorPosition ?? value.length;
      const textBeforeCursor = value.substring(0, position);
      const textAfterCursor = value.substring(position);
      const newValue = textBeforeCursor + emoji + textAfterCursor;
      setValue(newValue);
      requestAnimationFrame(() => {
        if (inputRef.current) {
          inputRef.current.focus();
          const newCursorPosition = position + emoji.length;
          inputRef.current.setSelectionRange(newCursorPosition, newCursorPosition);
          setCursorPosition(newCursorPosition);
        }
      });
      if (!keepOpened) {
        setOpen(false);
      }
    },
    [cursorPosition, setValue, value, keepOpened]
  );
  /** Maintain cursor position when input value changes  */
  useEffect(() => {
    if (inputRef.current) {

      inputRef.current.setSelectionRange(cursorPosition || 0, cursorPosition || 0);
    }
  }, [cursorPosition, value]);
 
  
  
  return (
    <div className="relative flex min-h-[60px] items-center w-full">
      {" "}
      <textarea
        value={value}
        onChange={handleInputChange}
        onClick={() => {
          if (inputRef.current) {
            setCursorPosition(inputRef.current.selectionStart);
          }
        }}
        ref={inputRef}
        className={textAreaClassName}
        rows={3}
        placeholder="Write your thoughts here..."
        {...props}
      />{" "}
      <div className="absolute bottom-0 right-1">
        <EmojiButton
          emojiButtonElement={emojiButtonElement}
          emojiButtonClassName={emojiButtonClassName}
          onClick={() => setOpen((prevOpen) => !prevOpen)}
        />{" "}
        <EmojiPicker
          open={open}
          onOpenChange={setOpen}
          onEmojiSelect={handleEmojiClick}
          pickerOptions={pickerOptions}
        />{" "}
      </div>
    </div>
  );
};
