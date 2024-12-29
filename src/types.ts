interface EmojiPickerProps {
  data?: Record<string, any>; // Data to use for the picker
  i18n?: Record<string, any>; // Localization data to use for the picker
  categories?: (
    | "frequent"
    | "people"
    | "nature"
    | "foods"
    | "activity"
    | "places"
    | "objects"
    | "symbols"
    | "flags"
  )[]; // Categories to show in the picker
  custom?: string[]; // Custom emojis
  onEmojiSelect?: (emoji: string) => void; // Callback when an emoji is selected
  onClickOutside?: () => void; // Callback when a click outside of the picker happens
  onAddCustomEmoji?: () => void; // Callback when the Add custom emoji button is clicked
  autoFocus?: boolean; // Whether the picker should automatically focus on the search input
  categoryIcons?: Record<string, string>; // Custom category icons
  dynamicWidth?: boolean; // Whether the picker should calculate perLine dynamically
  emojiButtonColors?: string[]; // An array of colors that affects the hover background color of emoji buttons
  emojiButtonRadius?: string; // The radius of the emoji buttons (e.g. 6px, 1em, 100%)
  emojiButtonSize?: number; // The size of the emoji buttons
  emojiSize?: number; // The size of the emojis (inside the buttons)
  emojiVersion?: 1 | 2 | 3 | 4 | 5 | 11 | 12 | 12.1 | 13 | 13.1 | 14; // The version of the emoji data to use
  exceptEmojis?: string[]; // List of emoji IDs that will be excluded from the picker
  icons?: "auto" | "outline" | "solid"; // The type of icons to use for the picker
  locale?:
    | "en"
    | "ar"
    | "be"
    | "cs"
    | "de"
    | "es"
    | "fa"
    | "fi"
    | "fr"
    | "hi"
    | "it"
    | "ja"
    | "ko"
    | "nl"
    | "pl"
    | "pt"
    | "ru"
    | "sa"
    | "tr"
    | "uk"
    | "vi"
    | "zh"; // The locale to use for the picker
  maxFrequentRows?: number; // The maximum number of frequent rows to show
  navPosition?: "top" | "bottom" | "none"; // The position of the navigation bar
  noCountryFlags?: boolean; // Whether to show country flags or not
  noResultsEmoji?: string; // The ID of the emoji to use for the no results emoji
  perLine?: number; // The number of emojis to show per line
  previewEmoji?: string; // The ID of the emoji to use for the preview when not hovering any emoji
  previewPosition?: "top" | "bottom" | "none"; // The position of the preview
  searchPosition?: "sticky" | "static" | "none"; // The position of the search input
  set?: "native" | "apple" | "facebook" | "google" | "twitter"; // The set of emojis to use for the picker
  skin?: 1 | 2 | 3 | 4 | 5 | 6; // The emojis skin tone
  skinTonePosition?: "preview" | "search" | "none"; // The position of the skin tone selector
  theme?: "auto" | "light" | "dark"; // The color theme of the picker
  getSpritesheetURL?: () => string | null; // A function that returns the URL of the spritesheet to use
}

export default EmojiPickerProps;
