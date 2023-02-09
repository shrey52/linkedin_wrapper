var client_id;
var client_secret;

//linkedin developer site
$("#LinkedinDev").one("click", function () {
    window.open("https://developer.linkedin.com/");
});

//functions used
function generateRandomString() {
    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
}

var scope = "r_liteprofile%20r_emailaddress%20w_member_social"
var authorizeUrl = "https://www.linkedin.com/oauth/v2/authorization";
var redirect_Uri = "http://127.0.0.1:5000/redirect_auth";
var state = generateRandomString();


//get authorization from the user
$("#Client_details").submit(function(event) {
    event.preventDefault();
    var passwords = [];
    $("input[type='password']").each(function() {
    passwords.push($(this).val());
    });
    client_id = passwords[0]
    console.log(client_id)
    client_secret = passwords[1]
    async function makePostRequest(data) {
        await fetch('/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(data)
        });
    }
      
    const data = {
        authorize_Url : authorizeUrl, 
        redirect_Uri : redirect_Uri,
        client_id : client_id,
        client_secret : client_secret
    };

    makePostRequest(data);
    window.location.href = `${authorizeUrl}?client_id=${client_id}&response_type=code&redirect_uri=${redirect_Uri}&state=${state}&scope=${scope}`;
    
});





