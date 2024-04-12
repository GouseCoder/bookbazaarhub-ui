
export const checkToken = () => {
    const token = localStorage.getItem('token'); // Assuming you're storing the token in localStorage
  
    return !!token;
  };