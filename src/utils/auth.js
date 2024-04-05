
export const checkToken = () => {
    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
  
    if (!token) {
      // Redirect to login page
      window.location.href = '/login';
      return null; // Optional: You can also throw an error or return a promise to handle redirection asynchronously
    }
  
    return token;
  };