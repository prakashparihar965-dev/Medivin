import { Language } from './types';

export function calculateNextRefillDate(startDateStr: string, durationDays: number): string {
  if (!startDateStr) return '';
  const [year, month, day] = startDateStr.split('-').map(Number);
  const date = new Date(year, month - 1, day);
  if (isNaN(date.getTime())) return '';
  
  date.setDate(date.getDate() + Number(durationDays));
  
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

export function getTodayDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function getDaysDifference(targetDateStr: string): number {
  if (!targetDateStr) return 0;
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const [year, month, day] = targetDateStr.split('-').map(Number);
  const target = new Date(year, month - 1, day);
  target.setHours(0, 0, 0, 0);
  return Math.round((target.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
}

export function getRefillStatus(nextRefillDateStr: string) {
  const days = getDaysDifference(nextRefillDateStr);
  if (days < 0) {
    return {
      status: 'overdue',
      daysRemaining: days,
      labelEn: `${Math.abs(days)} days overdue`,
      labelHi: `${Math.abs(days)} दिन लेट (दवा समाप्त)`,
      colorClass: 'text-rose-700 bg-rose-50 border-rose-200',
    };
  }
  if (days === 0) {
    return {
      status: 'due_today',
      daysRemaining: 0,
      labelEn: 'Refill Due Today!',
      labelHi: 'आज दवा समाप्त (रिफिल का दिन)',
      colorClass: 'text-amber-800 bg-amber-50 border-amber-300 animate-pulse',
    };
  }
  if (days <= 5) {
    return {
      status: 'due_soon',
      daysRemaining: days,
      labelEn: `Due in ${days} days`,
      labelHi: `${days} दिन में समाप्त होगी`,
      colorClass: 'text-orange-700 bg-orange-50 border-orange-200',
    };
  }
  return {
    status: 'active',
    daysRemaining: days,
    labelEn: `${days} days left`,
    labelHi: `${days} दिन बाकी हैं`,
    colorClass: 'text-emerald-700 bg-emerald-50 border-emerald-200',
  };
}

export function formatDateDisplay(dateStr: string, locale: Language = 'en'): string {
  if (!dateStr) return 'N/A';
  const [year, month, day] = dateStr.split('-').map(Number);
  const monthNamesEn = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthNamesHi = ['जनवरी', 'फरवरी', 'मार्च', 'अप्रैल', 'मई', 'जून', 'जुलाई', 'अगस्त', 'सितंबर', 'अक्टूबर', 'नवंबर', 'दिसंबर'];
  
  if (locale === 'hi') {
    return `${day} ${monthNamesHi[month - 1]} ${year}`;
  }
  return `${day} ${monthNamesEn[month - 1]} ${year}`;
}
