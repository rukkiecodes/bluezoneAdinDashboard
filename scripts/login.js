const email = document.querySelector('.email')
const password = document.querySelector('.password')
const login_button = document.querySelector('.login_button')



login_button.addEventListener('click', async (e) => {
  e.preventDefault()
  if (email.value == '' && password.value == '') return

  let user = await axios({
    method: 'post',
    url: 'https://trustpaddi-waitlist.herokuapp.com/admin/signin',
    data: {
      email,
      password
    }
  })

  console.log(user)

  // localStorage.token = data.token;
  // localStorage.user = data.user._id;
  // localStorage.email = data.user.email
  // window.location.href = "dashboard/";
})