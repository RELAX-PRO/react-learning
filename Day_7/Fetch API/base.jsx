// The 4-Line Golden Snippet for Fetching Data:
const fetchPatientsData = async () => {
  // 1. Send the mailman (fetch) to the server address and WAIT for his return:
  const response = await fetch('https://api.optical-clinic.com/v1/patients');
  
  // 2. Unpack the box and convert the raw server response into JavaScript JSON:
  const data = await response.json();
  
  // 3. Now 'data' is a real JavaScript array/object you can use!
  console.log("Patients List from Server:", data);
};