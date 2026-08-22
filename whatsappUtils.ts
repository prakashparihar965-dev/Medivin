import { PatientRecord, ReminderType, Language } from './types';
import { formatDateDisplay, getDaysDifference } from './dateUtils';

export function formatPhoneNumber(phone: string): string {
  const cleaned = phone.replace(/\D/g, '');
  if (cleaned.length === 10) return `91${cleaned}`;
  return cleaned;
}

export function generateReminderMessage(
  patient: PatientRecord,
  type: ReminderType,
  lang: Language = 'hi'
): string {
  const daysDiff = getDaysDifference(patient.nextRefillDate);
  const formattedRefillDate = formatDateDisplay(patient.nextRefillDate, lang);
  const formattedPrescriptionDate = formatDateDisplay(patient.prescriptionDate, lang);
  const isHi = lang === 'hi';

  const medicineListText = patient.medicines.map((m, idx) => {
    const timingParts: string[] = [];
    if (m.morning) timingParts.push(isHi ? 'सुबह' : 'Morning');
    if (m.afternoon) timingParts.push(isHi ? 'दोपहर' : 'Afternoon');
    if (m.night) timingParts.push(isHi ? 'रात' : 'Night');

    let mealText = '';
    if (m.mealTiming === 'before_food') mealText = isHi ? '(खाने से पहले)' : '(Before food)';
    else if (m.mealTiming === 'after_food') mealText = isHi ? '(खाने के बाद)' : '(After food)';
    else if (m.mealTiming === 'with_food') mealText = isHi ? '(खाने के साथ)' : '(With food)';
    else if (m.mealTiming === 'empty_stomach') mealText = isHi ? '(खाली पेट)' : '(Empty stomach)';

    return `${idx + 1}. *${m.name}* [${m.dosage}] -> ${timingParts.join(' - ')} ${mealText}`.trim();
  }).join('\n');

  if (isHi) {
    if (type === 'refill_alert') {
      let urgencyText = `आपकी मासिक दवाइयाँ *${formattedRefillDate}* को समाप्त होने वाली हैं (${daysDiff > 0 ? `${daysDiff} दिन शेष` : 'आज ही समाप्त'})।`;
      if (daysDiff < 0) urgencyText = `आपकी मासिक दवाइयों की अवधि *${Math.abs(daysDiff)} दिन पहले* पूरी हो चुकी है।`;

      return `🏥 *${patient.medicalStoreName.toUpperCase()}* - दवाई रिफिल अलर्ट 🔔

नमस्ते *${patient.patientName}* जी,
${urgencyText}

👨‍⚕️ *परामर्शक डॉक्टर:* ${patient.doctorName}${patient.clinicHospitalName ? ` (${patient.clinicHospitalName})` : ''}
📅 *शुरू करने की तारीख:* ${formattedPrescriptionDate}
📅 *अगली रिफिल तारीख:* ${formattedRefillDate}

💊 *आपकी नियमित दवाइयाँ:*
${medicineListText}

⚠️ कृपया अपनी नियमित दवाई का क्रम न टूटने दें। समय पर रिफिल प्राप्त करने के लिए कृपया हमारे मेडिकल स्टोर पर संपर्क करें।

📍 *${patient.medicalStoreName}*
${patient.medicalStorePhone ? `📞 फोन: ${patient.medicalStorePhone}` : ''}`.trim();
    }
  }

  return `🏥 *${patient.medicalStoreName.toUpperCase()}* - Medicine Refill Alert 🔔

Dear *${patient.patientName}*,
Your monthly medicines refill is due on *${formattedRefillDate}*.

👨‍⚕️ *Doctor:* ${patient.doctorName}
📅 *Next Refill:* ${formattedRefillDate}

💊 *Medicines:*
${medicineListText}

📍 *${patient.medicalStoreName}*
${patient.medicalStorePhone ? `📞 Phone: ${patient.medicalStorePhone}` : ''}`.trim();
}

export function getWhatsAppUrl(phone: string, message: string): string {
  const formattedPhone = formatPhoneNumber(phone);
  const encodedText = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedText}`;
}
