import { formatDistanceToNow } from 'date-fns';
import { toast } from 'react-toastify';

export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  const formatedDate = formatDistanceToNow(date, { addSuffix: true });
  return formatedDate;
};

export const getErrorMessage = (error: unknown): String => {
  if (error instanceof Error) return error.message;

  return String(error);
};

export const generateUniqueUserTag = (): string => {
  let randomNumber = Math.floor(Math.random() * 1000000);
  let uniqueNumber = randomNumber.toString().padStart(6, '0');

  return `#${uniqueNumber}`;
};

export const hasDuplicates = <T>(list: T[]): boolean => {
  const set = new Set(list);
  return set.size !== list.length;
};

export const showToast = (
  type: 'success' | 'warn' | 'info' | 'error',
  message: string,
) => {
  toast[type](message, { theme: 'colored', autoClose: 3000 });
};
