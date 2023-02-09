from flask import Flask,render_template,jsonify,make_response,request
import requests

data_array = []

app = Flask(__name__)

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/access_token",methods=["POST"])
def access_token():
    data = request.get_json()
    data_array.append(data)

    ACCESS_TOKEN_URL = 'https://www.linkedin.com/oauth/v2/accessToken'
    qd = {
        'grant_type': 'authorization_code',
        'code': data_array[1]["code"],
        'redirect_uri': data_array[0]["redirect_Uri"],
        'client_id': data_array[0]["client_id"],
        'client_secret': data_array[0]["client_secret"]}

    response = requests.post(ACCESS_TOKEN_URL, data=qd, timeout=60)
    response = response.json()
    global token 
    token = response["access_token"]
    return "The token has been acquired"

@app.route("/make_requests",methods=["GET"])
def make_requests():
    params = {'oauth2_access_token': token}
    email_req = requests.get('https://api.linkedin.com/v2/emailAddress?q=members&projection=(elements*(handle~))', params = params)
    personal_req = requests.get('https://api.linkedin.com/v2/me', params = params)
    profile_image_req = requests.get('https://api.linkedin.com/v2/me?projection=(id,profilePicture(displayImage~digitalmediaAsset:playableStreams))', params = params)
    
    personal_details = personal_req.json() 
    email_address = email_req.json()
    profile_image = profile_image_req.json()
    
    data = {"a":email_address,"b":personal_details,"c":profile_image}
    return make_response(jsonify(data), 200)

@app.route("/redirect_auth")
def redirect_auth():
    return render_template("auth_code.html")
    
    
if __name__ == '__main__':
    app.run(debug="true",port=5000)