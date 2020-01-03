//////////////////////////////////////CSRF code/////////////////////////////
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== '') {
      var cookies = document.cookie.split(';');
      for (var i = 0; i < cookies.length; i++) {
          var cookie = cookies[i].trim();
          // Does this cookie string begin with the name we want?
          if (cookie.substring(0, name.length + 1) === (name + '=')) {
              cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
              break;
          }
      }
  }
  return cookieValue;
}

function csrfSafeMethod(method) {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}
//  $ajaxSetup - Sets the default values for future AJAX requests, beforeSend: runs function before sending reequest
$.ajaxSetup({
  beforeSend: function(xhr, settings) 
  {     
      var csrftoken = getCookie('csrftoken');
      if (!csrfSafeMethod(settings.type) && !this.crossDomain) {
          xhr.setRequestHeader("X-CSRFToken", csrftoken);
      }
  }
});
//////////////////////////END OF CSRF CODE///////////////////////////////////////////
function buildUserEnhancedObjectFromJSON(typeData="", userID=0,operationType="GET",username="")
{
  //first function 
  //builds object from json to Client/Employee/CO
  var requestObject ="";
  var requestURL="";
  baseURL = 'http://127.0.0.1:8000/rest/';
  switch(typeData)
  {
    case "Client":
      requestObject = "client/";
      requestURL = getUrlForEnhancedUserObject(baseURL,requestObject,userID)
      switch(operationType)
      {
        case "PUT":
          idVariablesArray=["#street","address","#birthday","birthday"];
          putObject(requestURL,idVariablesArray);
          break;
        case "GET":
          fillTextboxesWithGetUserObjectFromJSON(requestURL);
          break;
        default:
          break;
      }
      break;
    case "CompanyOwner":
      requestObject = "company_owner/";
      requestURL = getUrlForEnhancedUserObject(baseURL,requestObject,userID)
      switch(operationType)
      {
        case "PUT":
          idVariablesArray=["#birthday","birthday","#street","address"];
          putObject(requestURL,idVariablesArray);
          break;
        case "GET":
          fillTextboxesWithGetUserObjectFromJSON(requestURL);
          break;
        default:
          break;
      }
      break;
    case "Employee":
        requestObject = "employee/";
        requestURL = getUrlForEnhancedUserObject(baseURL,requestObject,userID)
        switch(operationType)
        {
          case "PUT":
            idVariablesArray=["#birthday","birthday","#street","address"];
            putObject(requestURL,idVariablesArray);
            break;
          case "GET":
            fillTextboxesWithGetUserObjectFromJSON(requestURL);
            break;
          default:
            break;
        }
      break;
    default:
        requestObject = "rest";
  }
  if(requestObject === "rest")
  {
    alert("unknown accout type");
  }
  else
  {
    switch(operationType)
    {
      case "PUT":
        requestObjectForBasicUser = getUrlForEnhancedUserObject(baseURL,"user/",username);
        idVariablesArray=["#firstname","first_name","#lastname","last_name"];
        putObject(requestObjectForBasicUser,idVariablesArray);
        break;
      case "GET":
        fillTextboxesWithGetUserObjectFromJSON(requestURL);
        break;
      default:
        break;
    }
  }
}
function fillTextboxesWithGetUserObjectFromJSON(fullURLForJSON)
{
  var request = new XMLHttpRequest();
  request.open('GET', fullURLForJSON);
  request.responseType = 'json';
  request.send();
  request.onload = function() {
    var user = request.response;
    loadSettingsFormGettingDataFromObject(user);
  }
function loadSettingsFormGettingDataFromObject(userObject)
  {
    document.getElementById("street").value = userObject.address;    
  }
}
function getJsonObjectWithDataFromHTML(arrayOfIds=[],jsonFile)
{
  tempObj = JSON.parse(jsonFile);
  for(i=0;i<=arrayOfIds.length/2;i+=2)
  {
  var tempString = arrayOfIds[i+1];
  tempObj[tempString] = $(arrayOfIds[i]).val();
  }
  jsonFile = JSON.stringify(tempObj);
  return jsonFile;
}

function putObject(url,idVariablesArray=[])
{
  var csrftoken = getCookie('csrftoken');
  var user = new Object; 
  var jsonFile;
  $.getJSON(url,function(data)
  {
    jsonFile=JSON.stringify(data);
    jsonFile = getJsonObjectWithDataFromHTML(idVariablesArray,jsonFile);
    console.log(jsonFile);
    $.ajax({
      type: "PUT",
      url: url,
      CSRF: csrftoken,
      data: jsonFile,
      contentType: "application/json",
    });
  });
}
function getUrlForEnhancedUserObject(base_domain_rest_url="",account_type="",username="")
{
  var temp = "";
  temp = base_domain_rest_url+account_type+username+".json";
  return temp;
}
