
export function convertPhoneNumber(phoneNumber: string) {
  const digitsOnly = phoneNumber.replace(/\D/g, '');
  return `1${digitsOnly}`;
}

export function convertNotification(notifications: boolean[]) {
  return notifications.map((isActive, index) => isActive ? Math.pow(2, index) : 0)
  .reduce((acc, curr) => acc + curr, 0);
}