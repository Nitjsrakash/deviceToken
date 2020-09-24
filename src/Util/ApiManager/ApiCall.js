

 function getBody(jsonData) {
    try {
        var formBody = [];
        for (var key in jsonData) {
          var encodedKey = encodeURIComponent(key);
          var encodedValue = encodeURIComponent(jsonData[key]);
          formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        
        return formBody;
    } catch (e) {
      return false;
     }
  }


export async function getFetch(){
  console.log("<------API CAll-------->")
  var DEMO_TOKEN = "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzUxMiJ9.eyJpYXQiOjE2MDAyNTUxOTIsImp0aSI6IkNmc0lJRmYxWm43TUNJdUJrS2pKVVEiLCJpc3MiOiJodHRwczpcL1wvcmVzb3VyY2VzLnZlZ2E2LmluZm9cLyIsIm5iZiI6MTYwMDI1NTIwMiwiZGF0YSI6eyJ1c2VyX2lkIjoiMSIsImFwcF91cmwiOiJOVWxsIn19.Y4UpB0--8kQWHFHrONhyJy_jGl3VmDZ93Y-qn7yD6tLZRmzktXeIf4YTdraNIMrYTucuVYLB6VrWVhN4TrZpaA"

  try{
    let res = await fetch('https://resources.vega6.info/get-photo/search',{
        method: "POST",
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + DEMO_TOKEN
        }
      })
    let result = await res.json();
    console.log("Response:",result)
     return result.data
  }
  catch(error){
    throw error;
  }
}

