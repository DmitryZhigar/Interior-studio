export const getRequestErrorMessage = (error: any, fallback: string) =>
  error?.data?.statusMessage ||
  error?.data?.message ||
  error?.statusMessage ||
  error?.message ||
  fallback
