const fetchDashboardData = async (userId) => {
    try {
      let response = null;
      if(userId !== 0) {
        response = await fetch(
          `https://bookbazaar-book-service.onrender.com/books/getBooksForDashboard?userId=${userId}`,
          { method: 'GET', credentials: 'include' }
        );
      }
      else {
        response = await fetch(
          `https://bookbazaar-book-service.onrender.com/books/getBooksForDashboard`,
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
  