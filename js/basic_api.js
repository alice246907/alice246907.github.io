const api_url = "https://in-food.herokuapp.com/";



function getRestaurants(){
    var form_value = document.forms["searchRestaurant"];
    var word = form_value.elements.word.value;
    $("#restaurantTable").find('tbody').html("");

    $("#searchRestaurant").ajaxSubmit(function(restaurants) {
        for(var i in restaurants){
            if(restaurants[i].restaurantName.indexOf(word) != -1){
                getRestaurantById(restaurants[i]);
            }
        };
    });
}

function getRestaurantById(restaurant){
    $.ajax({
        url: api_url+"api/v1/restaurant/"+restaurant.id,
        context: document.body,
    }).then((res)=>{
        var row = $('<tr><td>' + restaurant.restaurantName + '</td><td>' + restaurant.phoneNumber+ '</td><td>' + restaurant.address  + '</td><td><pre><code>' + JSON.stringify(restaurant, null, '  ') + '</code></pre></td><td><pre><code>' + JSON.stringify(res, null, '  ') + '</code></pre></td></tr>') 
        $("#restaurantTable").find('tbody').append(row);
        $('#restaurantTable').trigger('footable_initialize');
    })
}