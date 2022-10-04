const { userToken } = localStorage;
const usersList = document.querySelector('.copiesList');

(async () => {
  const users = await axios({
    method: 'get',
    url: 'https://trustpaddi-waitlist.herokuapp.com/admin/allCopies',
    headers: { 'Authorization': `Bearer ${userToken}` }
  });

  users.data.copies.forEach(copy => {
    usersList.innerHTML += `<li>
                            <div class="item">
                            <div id="_id" style="display: none">${copy?._id}</div>
                            <div id="_name" style="display: none">${copy?.name}</div>
                            <div id="_bankState" style="display: none">${copy?.bankState}</div>
                            <div id="_salesState" style="display: none">${copy?.salesState}</div>
                            <div id="_from" style="display: none">${copy?.from}</div>
                            <div id="_to" style="display: none">${copy?.to}</div>
                            <div id="_currency" style="display: none">${copy?.currency}</div>
                            <div id="_amount" style="display: none">${copy?.amount}</div>
                                <div class="imageWrapper">
                                    <img src="${copy?.image}" alt="image" class="imaged w64 rounded" style="height:64px">
                                </div>
                                <div class="in" style="position: relative; top: 10px; ">
                                    <div>
                                        <div class="_id" style="display: none"></div>
                                        <div class="tradersName">${copy?.name}</div>
                                        <div style="display:flex" class="text-small">
                                            <p>${copy?.currency || 'currency'}<p>,
                                            <p style="color:red">${copy?.profit}</p>
                                        </div>
                                        <div class="text-muted " style=" margin-bottom: 5%;">${copy?.from} &#x2192; ${copy?.to}</div>
                                    </div>
                                    <span class="" style=" position: relative; top: -15px;">
                                        <button type="button"
                                            class="view_trader_button btn btn-success btn-sm me-1 mt-2 " data-bs-toggle="modal" data-bs-target="#UpdateForm">VIEW</button>
                                    </span>
                                </div>
                            </div>
                        </li>`
  });

  let btns = document.querySelectorAll('.view_trader_button');

  for (i of btns) {
    i.addEventListener('click', async function () {
      const { userToken } = localStorage;

      let copy = this.parentNode.parentNode.parentNode;

      let _id = copy.querySelector('#_id').innerText;
      let _name = copy.querySelector('#_name').innerText;
      let _bankState = copy.querySelector('#_bankState').innerText
      let _salesState = copy.querySelector('#_salesState').innerText
      let _from = copy.querySelector('#_from').innerText
      let _to = copy.querySelector('#_to').innerText
      let _currency = copy.querySelector('#_currency').innerText
      let _amount = copy.querySelector('#_amount').innerText

      document.querySelector('#tradersName').innerText = _name
      const tradersName = document.querySelector('#tradersName')
      const bankState = document.querySelector('.bankState')
      const salesState = document.querySelector('.salesState')
      const from = document.querySelector('#from')
      const to = document.querySelector('#to')
      const currency = document.querySelector('.currency')
      const amount = document.querySelector('.amount')

      let bankStateValue = bankState.value
      let salesStateValue = salesState.value

      bankState.addEventListener('click', () => {
        bankStateValue = bankState.value
      })

      salesState.addEventListener('click', () => {
        salesStateValue = salesState.value
      })

      const updateTraderButton = document.querySelector('#updateTrader')

      updateTraderButton.addEventListener('click', async (e) => {
        e.preventDefault()

        await axios({
          method: 'post',
          url: 'https://trustpaddi-waitlist.herokuapp.com/admin/editCopy',
          data: {
            _id,
            tradersName: tradersName.innerText,
            bankState: bankStateValue,
            salesState: salesStateValue,
            from: from.value,
            to: to.value,
            currency: currency.value,
            amount: amount.value
          }
        })
      })
    });
  }
})();