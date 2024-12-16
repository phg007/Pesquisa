import CustomerSurvey from '@/components/CustomerSurvey'
import { Suspense } from 'react';
export default function SurveyPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CustomerSurvey />
    </Suspense>
  )
}

