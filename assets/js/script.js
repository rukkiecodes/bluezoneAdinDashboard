

$(document).ready(function() {
$('#depo').click(function () {
    
    $.ajax({
        
        mode: 'cors',
        type: 'POST',
        url: 'https://web-production-09d2.up.railway.app/deposit/add',
        contentType: 'application/json',
        headers:{
            Authorization: 'Bearer'  + localStorage.token
        },
        data: {
            user:localStorage.user,
            amount: "30000",
            currency: "ethereuem",
            description: "desciption"
        },
        success: function (data) {
            console.log(data);
        },
        error: function () {
            alert("Sorry, you are not logged in.");
        }
    });
});
  $("#login_btn").click(function() {
    var email = $("#email").val();
    var password = $("#password").val();
    $.ajax({
        type: "POST",
        url: "https://web-production-09d2.up.railway.app/auth/signin",
        data: {
          email: email,
          password: password
        },
        success: function(data) {
          localStorage.token = data.token;
          alert('Got a token from the server! Token: ' + data.token);
          window.location='/index.html';
          console.log(data);
    
          console.log('Got a token from the server! Token: ' + data.token);
        },
        error: function() {
          alert("Login Failed");
          console.log("Login Failed");
        }
      });
    });

  
  
  
  
  
  
  
  
  
  
  
  
  
  $('#badLogin').click(function() {
    $.ajax({
      type: "POST",
      url: "/login",
      data: {
        username: "john.doe",
        password: "foobarfoobar"
      },
      success: function(data) {
        alert("ERROR: it is not supposed to alert.");
      },
      error: function() {
        alert("Login Failed");
      }
    });
  });
  $('#logout').click(function() {
    localStorage.clear();
  });
});