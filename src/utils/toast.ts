import { toast } from "sonner";

export const showSuccess = (message: string) => {
  toast.success(message);
};

export const showError = (message: string) => {
  toast.error(message);
};

export const showLoading = (message: string): string => {
  const toastId = toast.loading(message);
  return toastId.toString(); // Convert to string to ensure type safety
};

export const dismissToast = (toastId: string) => {
  toast.dismiss(toastId);
};