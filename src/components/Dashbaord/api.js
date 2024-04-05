// Mock API file for fetching dashboard data
const fetchDashboardData = async (userId) => {
    try {
      let response = null;
      if(userId !== 0) {
        response = await fetch(
          `http://localhost:8082/books/getBooksForDashboard?userId=${userId}`,
          { method: 'GET', credentials: 'include' }
        );
      }
      else {
        response = await fetch(
          `http://localhost:8082/books/getBooksForDashboard`,
          { method: 'GET', credentials: 'include' }
        );
      }
      const data = await response.json();
      console.log('Response data:', data);
      return data.dataObject;
    } catch (error) {
      console.error('Error fetching data:', error);
      throw error;
    }
  };
  
  export { fetchDashboardData };
  