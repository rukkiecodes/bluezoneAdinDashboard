const email = document.querySelector('.email')
const password = document.querySelector('.password')
const login_button = document.querySelector('.login_button')



login_button.addEventListener('click', async (e) => {
  e.preventDefault()
  if (email.value == '' && password.value == '') return

  let user = await axios({
    method: 'post',
    url: 'https://web-production-09d2.up.railway.app/admin/signin',
    data: {
      email: email.value,
      password: password.value
    }
  })

  console.log(user)

  localStorage.userToken = user.data.token;
  localStorage.token = user.data.token;
  window.location.href = "/";
})