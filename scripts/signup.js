const _name = document.querySelector('.name')
const email = document.querySelector('.email')
const password = document.querySelector('.password')
const signup_button = document.querySelector('.signup_button')



signup_button.addEventListener('click', async (e) => {
  e.preventDefault()
  if (_name.value == '' && email.value == '' && password.value == '') return

  let user = await axios({
    method: 'post',
    url: 'https://trustpaddi-waitlist.herokuapp.com/admin/signup',
    data: {
      name: _name.value,
      email: email.value,
      password: password.value
    }
  })

  
  localStorage.user = JSON.stringify(user.data.user)
  location.replace('login.html')
})