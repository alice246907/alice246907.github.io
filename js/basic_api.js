const apiUrl = "https://in-food.herokuapp.com/";
const pageSize = 2;


// for basic_api/restaurant.html
function getRestaurants(){
    var formValue = document.forms["searchRestaurant"];
    var word = formValue.elements.word.value;
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
        url: apiUrl+"api/v1/restaurant/"+restaurant.id,
        context: document.body,
    }).then((res)=>{
        var row = $('<tr><td>' + restaurant.restaurantName + '</td><td>' + restaurant.phoneNumber+ '</td><td>' + restaurant.address  + '</td><td><pre><code>' + JSON.stringify(restaurant, null, '  ') + '</code></pre></td><td><pre><code>' + JSON.stringify(res, null, '  ') + '</code></pre></td></tr>') 
        $("#restaurantTable").find('tbody').append(row);
        $('#restaurantTable').trigger('footable_initialize');
    })
}


// for basic_api/post.html
async function searchRestaurant(restaurantName){
    var restaurantList = [];
    for(var i=0; i<pageSize; i++){
        await $.ajax({
            url: apiUrl + "api/v1/restaurant/search",
            context: document.body,
            method: "GET",
            data:{
                "restaurantName": restaurantName,
                "page": i,
                "size": pageSize
            }
        }).then((res)=>{
            if(res.restaurantList){
                restaurantList = restaurantList.concat(res.restaurantList)
            }
        })
    }
    return restaurantList;
}

async function getPostByRestaurantId(restaurantId){
    var posts;
    await $.ajax({
        url: apiUrl + "api/v1/post/restaurantId",
        context: document.body,
        method: "GET",
        data:{
            "restaurantId": restaurantId,
        }
    }).then((res)=>{
        posts = res;
    })
    return posts;
}

async function SearchPostByRestaurant(){
    let postTable = $("#postTable").find('tbody');
    postTable.html("");
    var formValue = document.forms["postRestaurantList"];
    var word = formValue.elements.word.value;
    var restaurantList= await searchRestaurant(word);
    for(var i in restaurantList){
        await getPostByRestaurantId(restaurantList[i].id).then((postList)=>{
            for(var post_i in postList){
                var createTime = postList[post_i].createTime.split("T")[0] + " "+ postList[post_i].createTime.split("T")[1].split(".")[0];
                var updateTime = postList[post_i].updateTime.split("T")[0] + " "+ postList[post_i].updateTime.split("T")[1].split(".")[0];
                var row = $('<tr><td>' + restaurantList[i].restaurantName + '</td><td>' + postList[post_i].content + '</td><td>' + createTime + '</td><td>' + updateTime + '</td><td><pre><code>' + JSON.stringify(postList[post_i], null, '  ') + '</code></pre></td></tr>') 
                postTable.append(row);
            }
            postTable.trigger('footable_initialize'); 
        })
    }
}



async function getPostByUserId(userId){
    var posts;
    await $.ajax({
        url: apiUrl + "api/v1/post/userId",
        context: document.body,
        method: "GET",
        data:{
            "userId": userId,
        }
    }).then((res)=>{
        posts = res;
    })
    return posts;
}

async function SearchPostByUser(){
    let postTable = $("#postTable").find('tbody');
    postTable.html("");
    var formValue = document.forms["postUserList"];
    var word = formValue.elements.word.value;
    var userList = await searchUser(word);
    console.log(userList);
    for(var i in userList){
        await getPostByUserId(userList[i].userId).then((postList)=>{
            for(var post_i in postList){
                var createTime = postList[post_i].createTime.split("T")[0] + " "+ postList[post_i].createTime.split("T")[1].split(".")[0];
                var updateTime = postList[post_i].updateTime.split("T")[0] + " "+ postList[post_i].updateTime.split("T")[1].split(".")[0];
                var row = $('<tr><td>' + userList[i].displayName + '</td><td>' + postList[post_i].content + '</td><td>' + createTime + '</td><td>' + updateTime + '</td><td><pre><code>' + JSON.stringify(postList[post_i], null, '  ') + '</code></pre></td></tr>') 
                postTable.append(row);
            }
            postTable.trigger('footable_initialize'); 
        })
    }
}