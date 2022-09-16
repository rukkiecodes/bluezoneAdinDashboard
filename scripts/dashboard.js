const token = localStorage.userToken;
const total_number_of_users = document.querySelector('.total_number_of_users');

// count all registrd usrs
(async () => {
  const users = await axios({
    method: 'get',
    url: 'https://trustpaddi-waitlist.herokuapp.com/admin/allUsers',
    headers: { 'Authorization': `Bearer ${token}` }
  })
  total_number_of_users.innerText = users.data.users.length
 })()