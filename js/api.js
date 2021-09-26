const api_url = "https://in-food.herokuapp.com/";


function getRestaurants(){
    const req = new Request(api_url+"api/v1/restaurant");
    fetch(req, {
        method: 'GET',
        credentials: 'include', 
        mode: 'cors',
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
        },
      }).then(res =>  res.json())
      .then((data) => {console.log(data)})
      .catch((err) => {console.log("err:"+err)})
};


