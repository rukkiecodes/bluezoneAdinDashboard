(() => {
  let token = localStorage.token
  if (!token || token == undefined) location.replace('login.html')
  else location.replace('/')
})()