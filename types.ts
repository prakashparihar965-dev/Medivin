export type MealTiming = 'before_food' | 'after_food' | 'with_food' | 'empty_stomach' | 'anytime';
export type MedicineForm = 'tablet' | 'capsule' | 'syrup' | 'injection' | 'drops' | 'ointment' | 'inhaler' | 'powder' | 'other';
export type ReminderType = 'refill_alert' | 'daily_schedule' | 'doctor_visit' | 'custom' | 'morning_dose' | 'night_dose';
export type Language = 'hi' | 'en' | 'hinglish';

export interface MedicineItem {
  id: string;
  name: string;
  form: MedicineForm;
  morning: boolean;
  afternoon: boolean;
  night: boolean;
  mealTiming: MealTiming;
  dosage: string;
  quantityPerMonth: number;
  instructions?: string;
}

export interface NotificationLog {
  id: string;
  timestamp: string;
  channel: 'whatsapp' | 'sms' | 'browser' | 'share';
  type: ReminderType;
  messageText: string;
  recipientPhone: string;
}

export interface RefillEvent {
  id: string;
  refillDate: string;
  daysAdded: number;
  recordedAt: string;
  note?: string;
}

export interface PatientRecord {
  id: string;
  medicalStoreName: string;
  medicalStorePhone?: string;
  medicalStoreAddress?: string;
  patientName: string;
  patientPhone: string;
  patientAge?: number;
  patientGender?: 'Male' | 'Female' | 'Other';
  patientAddress?: string;
  doctorName: string;
  doctorSpecialty?: string;
  doctorPhone?: string;
  clinicHospitalName?: string;
  prescriptionDate: string;
  refillDurationDays: number;
  nextRefillDate: string;
  nextDoctorVisitDate?: string;
  diagnosisCondition?: string;
  medicines: MedicineItem[];
  notes?: string;
  notificationLogs: NotificationLog[];
  refillHistory: RefillEvent[];
  createdAt: string;
  updatedAt: string;
}

export interface MedicalStoreInfo {
  name: string;
  phone: string;
  address: string;
  pharmacistName: string;
  gstNumber?: string;
}
