const transaction_list = document.querySelector('.transaction_list')
const allTransactions = [];

allTransactions.forEach((transaction, index) => {
  transaction_list.innerHTML += `<a class="item">
                                <div class="detail">
                                    <div>
                                        <div id="_id" style="display: none">${transaction._id}</div>
                                        <strong>Peter Obi</strong>
                                        <p>1:00pm</p>
                                    </div>
                                </div>
                                <div class="right">
                                    <div class="price text-success"> $ 150</div>
                                    <button type="button" class="btn btn-success btn-sm me-1 mt-2 transaction_button">Confirm</button>
                                </div>
                            </a>`
})

let btns = document.querySelectorAll('.transaction_button');

for (i of btns) {
  i.addEventListener('click', async function () {
    const { userToken } = localStorage
    let transaction = this.parentNode.parentNode
    let _id = transaction.querySelector('#_id').innerText

    await axios({
      method: 'post',
      url: 'https://web-production-09d2.up.railway.app/admin/confirmTransactionRequest',
      headers: { 'Authorization': `Bearer ${userToken}` },
      data: { _id }
    })

    notification('notification-6transaction', 3000)
  });
}