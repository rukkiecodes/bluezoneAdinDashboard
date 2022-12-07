const { userToken } = localStorage;
const usersList = document.querySelector('.usersList');

let user;
let _id;
let _name;
let _email;
let _phone;
let _country;
let _investment;
let _earnings;

(async () => {
  const users = await axios({
    method: 'get',
    url: 'https://web-production-09d2.up.railway.app/admin/allUsers',
    headers: { 'Authorization': `Bearer ${userToken}` }
  })

  users.data.users.forEach(user => {
    usersList.innerHTML += `<li>
                              <div class="item">
                              <p style="display: none" id="_id">${user?._id}</p>
                              <p style="display: none" id="_name">${user?.name}</p>
                              <p style="display: none" id="_email">${user?.email}</p>
                              <p style="display: none" id="_phone">${user?.phone}</p>
                              <p style="display: none" id="_country">${user?.country != undefined ? user?.country : 'Country not specified'}</p>
                              <p style="display: none" id="_investment">${user?.investment != undefined ? user?.investment : 'No recent investment'}</p>
                              <p style="display: none" id="_earnings">${user?.earnings != undefined ? user?.earnings : 'No earnings'}</p>
                                <div class="imageWrapper">
                                  <img src="./assets/img/bluezone logo.png" alt="image" class="imaged w64 rounded" style="height:64px">
                                </div>
                                <div class="in" style="position: relative; top: 0px; ">
                                  <div>
                                    <div class="_id" style="display: none"></div>
                                    <div class="tradersName">${user?.name}</div>
                                    <div style="display:flex" class="text-small"> </div>
                                  </div>
                                    <span class="" style=" position: relative;    top: 0;">
                                      <button type="button" class="view_user_button btn btn-success btn-sm me-1 mt-2 copy_button"
                                          data-bs-toggle="modal" data-bs-target="#UpdateProfile">VIEW</button>
                                    </span>
                                </div>
                              </div>
                            </li>`
  });

  let btns = document.querySelectorAll('.view_user_button');

  for (i of btns) {
    i.addEventListener('click', async function () {
      const { userToken } = localStorage
      user = this.parentNode.parentNode.parentNode
      _id = user.querySelector('#_id').innerText
      _name = user.querySelector('#_name').innerText
      _email = user.querySelector('#_email').innerText
      _phone = user.querySelector('#_phone').innerText
      _country = user.querySelector('#_country').innerText
      _investment = user.querySelector('#_investment').innerText
      _earnings = user.querySelector('#_earnings').innerText

      document.querySelector('#username').innerText = _name
      document.querySelector('#email').innerText = _email
      document.querySelector('#phone').innerText = _phone
      document.querySelector('#country').innerText = _country
      document.querySelector('#investmenmts').innerText = _investment
      document.querySelector('#earnings').value = _earnings
    });
  }
})();

const earningsInput = document.querySelector('#earnings');

earningsInput.addEventListener("keypress", async function (event) {
  if (event.key === "Enter") {
    event.preventDefault();
    await axios({
      method: 'post',
      url: 'https://web-production-09d2.up.railway.app/admin/updateEarnings',
      data: {
        email: _email,
        earnings: parseFloat(earningsInput.value)
      }
    })
    document.querySelector('.closeButton').click()
  }
});