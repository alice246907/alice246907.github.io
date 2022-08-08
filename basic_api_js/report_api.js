const apiUrl = "https://in-food.herokuapp.com/";
const sizePerPage = 20;

function OnLoad(){
}

function getReportOnInput(){
}

function showReport(reportList){
    if (reportList.length == 0){
        var row = $('<tr><td>無資料</td></tr>') 
        $("#reportTable").find('tbody').append(row);
    }
    else{
        var rows = [];
        reportList.forEach(report => {
            var row = $('<tr><td>' + report.createTime.split("T")[0] + ' ' + report.createTime.split("T")[1].split(".")[0]
                    + '</td><td>' + report.updateTime.split("T")[0] + ' ' + report.updateTime.split("T")[1].split(".")[0]
                    + '</td><td>' + report.contentId 
                    + '</td><td>' + report.contentType 
                    + '</td><td>' + report.reasonType 
                    + '</td><td>' + report.reason + '</td></tr>') 
            $("#reportTable").find('tbody').append(row);
            $('#reportTable').trigger('footable_initialize');
        });  

    }
    document.getElementById("searchReportBtn").disabled = false;
}

function getReport(){
    var isCheck = document.querySelector('input[name="reportOptionsRadios"]:checked').value;
    var contentType = document.querySelector('option[name="reportOptionsSelect"]:checked').value;
    var contentId = document.forms["searchReport"].elements.word.value;
    
    $("#reportTable").find('tbody').html("");
    document.getElementById("searchReportBtn").disabled = true;
    if (contentType == "--"){
        getReportByIsCheckApi(isCheck).then(reportList=>{
            showReport(reportList);
        })
    }
    else if(contentId != ""){
        getReportByContentIdAndContentTypeApi(isCheck, contentId, contentType).then(reportList=>{
            showReport(reportList);
        })
    }
    else{
        getReportByContentTypeApi(isCheck, contentType).then(reportList=>{
            showReport(reportList);
        })
    }

    
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

async function getReportByContentTypeApi(isCheck,contentType){
    var reportList = [];
    var currentPage = 0;
    var totalPage = 1;
    while(currentPage != totalPage){
        await $.ajax({
            url: apiUrl + "api/v1/report/contentType",
            context: document.body,
            method: "GET",
            data:{
                "isCheck": isCheck,
                "contentType": contentType,
                "page": currentPage,
                "size": sizePerPage
                }
        }).then(res=>{
            if(res.totalPage != 0){
                reportList = reportList.concat(res.reportList);
                totalPage = res.totalPage;
            }
            currentPage = currentPage + 1;
        });
    }
    return reportList;
}

async function getReportByContentIdAndContentTypeApi(isCheck,contentType){
    var reportList = [];
    var currentPage = 0;
    var totalPage = 1;
    while(currentPage != totalPage){
        await $.ajax({
            url: apiUrl + "api/v1/report/contentType",
            context: document.body,
            method: "GET",
            data:{
                "isCheck": isCheck,
                "contentType": contentType,
                "page": currentPage,
                "size": sizePerPage
                }
        }).then(res=>{
            if(res.totalPage != 0){
                reportList = reportList.concat(res.reportList);
                totalPage = res.totalPage;
            }
            currentPage = currentPage + 1;
        });
    }
    return reportList;
}

async function getReportByContentIdAndContentTypeApi(isCheck, contentId, contentType){
    var reportList = [];
    var currentPage = 0;
    var totalPage = 1;
    while(currentPage != totalPage){
        await $.ajax({
            url: apiUrl + "api/v1/report/content",
            context: document.body,
            method: "GET",
            data:{
                "isCheck": isCheck,
                "contentId": contentId,
                "contentType": contentType,
                "page": currentPage,
                "size": sizePerPage
                }
        }).then(res=>{
            if(res.totalPage != 0){
                reportList = reportList.concat(res.reportList);
                totalPage = res.totalPage;
            }
            currentPage = currentPage + 1;
        });
    }
    return reportList;
}