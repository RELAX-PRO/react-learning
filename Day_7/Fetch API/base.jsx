// A clearer fetch example with basic error handling.
const fetchPatientsData = async () => {
  try {
    const response = await fetch('https://api.optical-clinic.com/v1/patients');

    if (!response.ok) {
      throw new Error(`Request failed with status ${response.status}`);
    }

    const data = await response.json();
    console.log('Patients List from Server:', data);
    return data;
  } catch (error) {
    console.error('Failed to load patients data:', error.message);
    return [];
  }
};