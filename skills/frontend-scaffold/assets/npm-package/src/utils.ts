/**
 * Utility functions
 */

export const capitalize = (str: string): string => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const isEmpty = (value: unknown): boolean => {
  return value === null || value === undefined || value === '';
};