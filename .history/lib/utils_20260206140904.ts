import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const parseStringify = (value: any) => JSON.parse(JSON.stringify(value));

export const convertFileToUrl = (file: File) => URL.createObjectURL(file);

// FORMAT DATE TIME
interface DateTimeFormatResult {
  dateTime: string;
  isValid: boolean;
  error?: string;
}

export const formatDateTime = (
  date: Date | string | number | null | undefined,
  timeZone?: string,
  options: Intl.DateTimeFormatOptions = {}
): DateTimeFormatResult => {
  // Default options merged with user-provided options
  const defaultOptions: Intl.DateTimeFormatOptions = {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "numeric",
    hour12: true,
    ...options
  };

  try {
    // Handle null/undefined
    if (date == null) {
      throw new Error("Date cannot be null or undefined");
    }

    // Convert to Date object if it isn't already
    const dateObj = date instanceof Date ? date : new Date(date);

    // Check if date is valid
    if (isNaN(dateObj.getTime())) {
      throw new Error("Invalid date value");
    }

    const formattedDateTime = new Intl.DateTimeFormat("en-US", {
      ...defaultOptions,
      timeZone: timeZone ?? 'UTC'
    }).format(dateObj);

    return {
      dateTime: formattedDateTime,
      isValid: true
    };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : "Unknown date formatting error";
    console.error("Date formatting error:", errorMessage, { input: date });
    
    return {
      dateTime: "Invalid date",
      isValid: false,
      error: errorMessage
    };
  }
};

export function encryptKey(passkey: string) {
  return btoa(passkey);
}

export function decryptKey(passkey: string) {
  return atob(passkey);
}
