const _name = document.querySelector('#name')
const image = document.querySelector('#fileuploadInput')
const wins = document.querySelector('#wins')
const losses = document.querySelector('#losses')
const rate = document.querySelector('#rate')
const profit = document.querySelector('#profit')
const copy_button = document.querySelector('#copy')
const token = localStorage.token

let file
image.addEventListener('change', (e) => {
  file = e.target.files[0]
})

copy_button.addEventListener('click', async () => {
  const formData = new FormData()
  formData.append("image", file)
  formData.append("name", _name.value)
  formData.append("wins", wins.value)
  formData.append("losses", losses.value)
  formData.append("rate", rate.value)
  formData.append("profit", profit.value)

  await axios({
    method: 'post',
    url: 'https://trustpaddi-waitlist.herokuapp.com/admin/creatCopy',
    data: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  })

  notification('notification-6', 3000)
  // Toastify({
  //   text: "Trader sucessfully created.",
  //   duration: 3000,
  //   newWindow: true,
  //   className: "bg-success",
  //   close: false,
  //   gravity: "top", // `top` or `bottom`
  //   position: "right", // `left`, `center` or `right`
  //   stopOnFocus: true, // Prevents dismissing of toast on hover
  //   style: {
  //     background: "green",
  //     width: "20em"
  //   },
  // }).showToast();
})