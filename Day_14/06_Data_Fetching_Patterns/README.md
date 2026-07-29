# Module 6: Data Fetching Patterns 📡🚀

Since Next.js allows us to fetch data directly inside Server Components, it is extremely easy to accidentally write slow code!

## The Waterfall Trap (Sequential Fetching)
If your Dashboard needs to fetch the `PatientProfile` and the `PatientMedicalHistory`, you might write it like this:
```typescript
const profile = await fetchPatientProfile(patientId); 
const history = await fetchPatientMedicalHistory(patientId); 
```
**This is a Waterfall!** The server will wait for the profile to finish downloading *before* it even asks the database for the history! If each takes 2 seconds, your user waits 4 seconds.

## The Solution: Parallel Fetching
If the `MedicalHistory` does not depend on the `Profile`, they should be fetched at the exact same time! We do this using standard JavaScript `Promise.all()`.

```typescript
const [profile, history] = await Promise.all([
  fetchPatientProfile(patientId),
  fetchPatientMedicalHistory(patientId)
]);
```
Now, both requests fire simultaneously! The user only waits 2 seconds total!

Check out `ParallelFetch.tsx` to see this implemented in a real component!
