const apiUrl = "https://in-food.herokuapp.com/";
const sizePerPage = 20;

function OnLoad(){
}

function getReportOnInput(){
}

function getReport(){
    var isCheck = document.querySelector('input[name="reportOptionsRadios"]:checked').value;;
    console.log(isCheck);
    $("#reportTable").find('tbody').html("");
    document.getElementById("searchReportBtn").disabled = true;

    getReportByIsCheckApi(isCheck).then(reportList=>{
        
        if (reportList.length == 0){
            var row = $('<tr><td>無資料</td></tr>') 
            $("#reportTable").find('tbody').append(row);
        }
        else{
            var rows = [];
            reportList.forEach(report => {
                console.log(report);
                var row = $('<tr><td>' + report.createTime.split("T")[0] + '</td><td>' + report.createTime.split("T")[1].split(".")[0] + '</td><td>' + report.reason + '</td></tr>') 
                $("#reportTable").find('tbody').append(row);
                $('#reportTable').trigger('footable_initialize');
            });  

        }
        document.getElementById("searchReportBtn").disabled = false;
    })

    
}

async function getReportByIsCheckApi(isCheck){
    var reportList = [];
    var currentPage = 0;
    var totalPage = 1;
    while(currentPage != totalPage){
        await $.ajax({
            url: apiUrl + "api/v1/report",
            context: document.body,
            method: "GET",
            data:{
                "isCheck": isCheck,
                "page": currentPage,
                "size": sizePerPage
                }
        }).then(res=>{
            if(res.reportList){
                reportList = reportList.concat(res.reportList);
                totalPage = res.totalPage;
                currentPage = currentPage + 1;
            }
        });
    }
    return reportList;
}
