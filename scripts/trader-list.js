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
                                <div class="imageWrapper">
                                  <img src="${copy?.image}" alt="image" class="imaged w64 rounded"
                                      style="height:64px">
                                </div>
                                <div class="in" style="position: relative; top: 0px; ">
                                <div>
                                  <div class="_id" style="display: none"></div>
                                  <div class="tradersName">${copy?.name}</div>
                                  <div style="display:flex" class="text-small"></div>
                                </div>
                                  <span class="" style=" position: relative;    top: 0;">
                                    <button type="button"
                                        class="btn delete_trader_button btn-success btn-sm me-1 mt-2 copy_button">DELETE</button>
                                  </span>
                                </div>
                              </div>
                            </li>`
  });

  let btns = document.querySelectorAll('.delete_trader_button');

  for (i of btns) {
    i.addEventListener('click', async function () {
      const { userToken } = localStorage;

      let copy = this.parentNode.parentNode.parentNode;

      let _id = copy.querySelector('#_id').innerText;

      await axios({
        method: 'post',
        url: 'https://trustpaddi-waitlist.herokuapp.com/admin/deleteCopy',
        data: {
          _id
        }
      })
      location.reload()
    });
  }
})();