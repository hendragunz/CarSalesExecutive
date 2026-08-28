import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatCurrencyIDR(amount: number): string {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function generateWhatsAppUrl(phone: string, text: string): string {
  // Clean phone number: remove +, -, spaces
  const cleanPhone = phone.replace(/[^0-9]/g, '');
  const formattedPhone = cleanPhone.startsWith('0') ? '62' + cleanPhone.slice(1) : cleanPhone;
  const encodedText = encodeURIComponent(text);
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}

export function calculateMonthlyInstallment(
  carPrice: number,
  downPaymentPercent: number,
  tenorYears: number,
  annualInterestRate: number = 3.5
): {
  dpNominal: number;
  loanPrincipal: number;
  monthlyInstallment: number;
  totalPayment: number;
} {
  const dpNominal = (carPrice * downPaymentPercent) / 100;
  const loanPrincipal = carPrice - dpNominal;
  const totalInterest = loanPrincipal * (annualInterestRate / 100) * tenorYears;
  const totalLoanWithInterest = loanPrincipal + totalInterest;
  const totalMonths = tenorYears * 12;
  const monthlyInstallment = Math.round(totalLoanWithInterest / totalMonths);
  const totalPayment = dpNominal + totalLoanWithInterest;

  return {
    dpNominal,
    loanPrincipal,
    monthlyInstallment,
    totalPayment,
  };
}
