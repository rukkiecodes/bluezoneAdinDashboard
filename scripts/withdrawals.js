const withdraw_list = document.querySelector('.withdraw_list')
const allWithdrawes = [];

allWithdrawes.forEach((withdraw, index) => {
  withdraw_list.innerHTML += `<a  class="item">
                                <div class="detail">
                                    <div>
                                    <div id="_id" style="display: none">${withdraw._id}</div>
                                        <strong>Peter Obi</strong>
                                        <p>1:00pm</p>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="price text-danger"> $ 150</div>
                                    <button type="button" class="btn btn-success btn-sm me-1 mt-2 withdraw_button">Confirm</button>
                                </div>
                            </a>`
})

let btns = document.querySelectorAll('.withdraw_button');

for (i of btns) {
  i.addEventListener('click', async function () {
    const token = localStorage.token
    let withdraw = this.parentNode.parentNode
    let _id = withdraw.querySelector('#_id').innerText

    await axios({
      method: 'post',
      url: 'https://trustpaddi-waitlist.herokuapp.com/admin/confirmWithdrawRequest',
      headers: { 'Authorization': `Bearer ${token}` },
      data: { _id }
    })

    notification('notification-6withdraw', 3000)
  });
}