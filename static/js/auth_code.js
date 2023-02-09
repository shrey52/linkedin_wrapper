var code
var state
$(window).on('load', function() {
    const queryString = window.location.search;
    const params = new URLSearchParams(queryString);
    code = params.get("code");
    state = params.get("state");

    async function makePostRequest(credentials) {
        await fetch('/access_token', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(credentials)
        });
    }
      
    const credentials= {
        code: code,
        state: state
    };

    makePostRequest(credentials);


});

$("#btn_post_details").one("click", function () {    
    $.ajax({
        type:"GET",
        datatype: "json",
        url:"http://127.0.0.1:5000/make_requests",
        success: function (result) {
            $(".profile_img").attr({src:"https://media.licdn.com/dms/image/C4D03AQEugCGDZaqgqg/profile-displayphoto-shrink_100_100/0/1615011829565?e=1678924800&v=beta&t=CIeWRQkKo0rQFrMp0SKdsYBwJyy0mLvxuKp9Z9gWCZg"})
            $("#result").append("First Name: " + result.b.firstName.localized.en_US + "<br>");
            $("#result").append("Last Name: " + result.b.lastName.localized.en_US + "<br>");
            $("#result").append(" Email Address: " + result.a.elements[0]["handle~"].emailAddress + "<br>");

        },
        error: function (error) {
            
        }
    });
});