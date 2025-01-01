function handleCredentialResponse(response) {
  console.log('Encoded JWT ID token: ' + response.credential);
  // Decode the JWT to get user information
  const user = parseJwt(response.credential);
  console.log('User information:', user);

  // Store user information in local storage or session storage
  localStorage.setItem('user', JSON.stringify(user));

  // Redirect to the project manager page
  window.location.href = 'index.html';
}

function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}