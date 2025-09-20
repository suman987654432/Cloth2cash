import { toast } from 'react-toastify';

export const showSuccessToast = (msg) => toast.success(msg);
export const showErrorToast = (msg) => toast.error(msg);