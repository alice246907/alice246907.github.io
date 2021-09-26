const api_url = "https://in-food.herokuapp.com/";


function getRestaurants(){
    const req = new Request(api_url+"api/v1/restaurant");
    fetch(req, {
        method: 'GET',
        credentials: 'include', 
        mode: 'cors',
        headers: {
            "Content-Type": "application/json",
        },
      }).then(res =>  res.json())
      .then((data) => {console.log(data)})
      .catch((err) => {console.log(err)})
};

