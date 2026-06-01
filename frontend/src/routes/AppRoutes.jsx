import { lazy, Suspense } from "react";

const DoctorDetails = lazy(() => import("../pages/patient/DoctorDetails"));

<Suspense fallback={<div>Loading...</div>}>
  <DoctorDetails />
</Suspense>