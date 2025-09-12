// Простой скрипт для проверки API
const API_URL = 'http://localhost:3001';

async function testAPI() {
  try {
    console.log('Testing API connection...');
    
    // Проверяем доступность API
    const response = await fetch(`${API_URL}/cars`);
    const cars = await response.json();
    
    console.log('API is working!');
    console.log('Total cars:', cars.length);
    
    if (cars.length > 0) {
      const firstCar = cars[0];
      console.log('First car:', firstCar);
      console.log('Car files:', firstCar.files);
      
      if (firstCar.files && firstCar.files.length > 0) {
        console.log('First file:', firstCar.files[0]);
        console.log('File URL:', `${API_URL}/${firstCar.files[0].path}`);
      }
    }
    
  } catch (error) {
    console.error('API Error:', error);
  }
}

testAPI();
