const token = localStorage.userToken;
const withdraw_list = document.querySelector('.withdraw_list');
let _withdrawalRquests

if (withdraw_list)
  (async () => {
    const response = await axios({
      method: 'post',
      url: 'https://trustpaddi-waitlist.herokuapp.com/admin/withdrawRequest',
      headers: { 'Authorization': `Bearer ${token}` }
    })

    _withdrawalRquests = response.data.transaction

    _withdrawalRquests.forEach((withdraw, index) => {
      withdraw_list.innerHTML += `<a  class="item">
                            <div class="detail">
                              <div id="_id" style="display: none">${withdraw._id}</div>
                                <strong>Peter Obi</strong>
                                <p style="margin-left: 5px; margin-top: -5px">${new Date(withdraw.createdAt).getDate()}/${new Date(withdraw.createdAt).getMonth()}/${new Date(withdraw.createdAt).getFullYear()}</p>
                              </div>
                            </div>
                            <div class="right">
                              <div class="price text-danger"> $ ${withdraw.amount}</div>
                              <button type="button" class="btn ${withdraw.status == 'PENDING' ? 'btn-success' : 'btn-dark'} btn-sm me-1 mt-2 withdraw_button">${withdraw.status == 'PENDING' ? 'Confirm' : 'Confirmed'}</button>
                            </div>
                          </a>`;
      let btns = document.querySelectorAll('.withdraw_button');
      
      for (i of btns) {
        i.addEventListener('click', async function () {
          const token = localStorage.userToken
          let withdraw = this.parentNode.parentNode
          let _id = withdraw.querySelector('#_id').innerText

          this.innerText = 'Loading...'

          await axios({
            method: 'post',
            url: 'https://trustpaddi-waitlist.herokuapp.com/admin/confirmWithdrawRequest',
            headers: { 'Authorization': `Bearer ${token}` },
            data: { _id }
          })

          this.innerText = 'Confirmed'

          notification('notification-6withdraw', 3000)
        });
      }
    })
  })();