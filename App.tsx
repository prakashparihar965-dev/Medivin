import React, { useState } from 'react';
import { PatientRecord } from './types';
import { generateReminderMessage, getWhatsAppUrl } from './whatsappUtils';
import { getRefillStatus } from './dateUtils';

export default function App() {
  const [patient, setPatient] = useState<PatientRecord>({
    id: '1',
    medicalStoreName: 'गुप्ता मेडिकल स्टोर',
    medicalStorePhone: '9876543210',
    patientName: 'रमेश कुमार',
    patientPhone: '9876543210',
    doctorName: 'डॉ. शर्मा',
    prescriptionDate: '2026-08-01',
    refillDurationDays: 30,
    nextRefillDate: '2026-08-31',
    medicines: [
      {
        id: 'm1',
        name: 'Paracetamol 500mg',
        form: 'tablet',
        morning: true,
        afternoon: false,
        night: true,
        mealTiming: 'after_food',
        dosage: '1 गोली',
        quantityPerMonth: 60
      }
    ],
    notificationLogs: [],
    refillHistory: [],
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  });

  const message = generateReminderMessage(patient, 'refill_alert', 'hi');
  const whatsappUrl = getWhatsAppUrl(patient.patientPhone, message);
  const status = getRefillStatus(patient.nextRefillDate);

  return (
    <div style={{ padding: '16px', fontFamily: 'sans-serif', maxWidth: '480px', margin: '0 auto' }}>
      <h2 style={{ color: '#0f766e', textAlign: 'center' }}>🏥 मेडिकल रिफिल रिमाइंडर</h2>
      
      <div style={{ border: '1px solid #e5e7eb', borderRadius: '12px', padding: '16px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}>
        <p><strong>मरीज़ का नाम:</strong> {patient.patientName}</p>
        <p><strong>डॉक्टर:</strong> {patient.doctorName}</p>
        <p><strong>स्थिति:</strong> {status.labelHi}</p>

        <p style={{ marginTop: '12px', fontWeight: 'bold' }}>व्हाट्सएप संदेश (Preview):</p>
        <div style={{ background: '#f3f4f6', padding: '12px', borderRadius: '8px', fontSize: '13px', whitespace: 'pre-wrap' }}>
          {message}
        </div>

        <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" style={{ textDecoration: 'none' }}>
          <button style={{
            width: '100%',
            backgroundColor: '#25D366',
            color: 'white',
            border: 'none',
            padding: '12px',
            borderRadius: '8px',
            fontSize: '16px',
            fontWeight: 'bold',
            marginTop: '16px',
            cursor: 'pointer'
          }}>
            📲 WhatsApp पर मैसेज भेजें
          </button>
        </a>
      </div>
    </div>
  );
}
