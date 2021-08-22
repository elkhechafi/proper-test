// control variables
    //change the Id to the div Id in our code
    let mainContainer = document.getElementById("mainContent");
    





var myCurrentDate=new Date();
var myPastDate=new Date(myCurrentDate);
    myPastDate.setDate(myPastDate.getDate() - 30);

//API URL
const link= "https://api.github.com/search/repositories?q=";

let pageNo = 1;
//an array where we push all the results for easier manipulation
let newArr = [];

let fetchedDay = myPastDate.getDate();
let month = myPastDate.getMonth() + 1;

function day_of_the_month(fetchedDay)
    { 
        return (fetchedDay < 10 ? '0' : '') + fetchedDay;
    };

    function month_of_the_year(month)
    { 
        return (month < 10 ? '0' : '') + month;
    };

let dynamicFetchedDay = myPastDate.getFullYear()+'-'+month_of_the_year(month) +'-'+day_of_the_month(fetchedDay);

//the actual link with limit controls
let actualLink = link +'created:>'+dynamicFetchedDay+'&sort=stars&order=desc&per_page=10' ;

//the function to fetch each
async function getRepo(pageNo){
    const resultArray = await fetch(actualLink+ `&page=${pageNo}`);
    const data = await resultArray.json();
    for(let i = 0; i < 10; i++){
        
           var div = document.createElement("div");
           let dayOFCreation = new Date(data.items[i].created_at).getTime();
           let milliseconds = Math.abs(myPastDate - dayOFCreation).toString();
           let seconds = parseInt(milliseconds / 1000);
           let minutes = parseInt(seconds / 60);
           let hours = parseInt(minutes / 60);
           let days = parseInt(hours / 24);
           let elapsedTime;
           if(days < 1){
            elapsedTime = hours+' hours';
           }else if(hours < 1){
            elapsedTime = minutes+' minutes'
           }
           else{
               elapsedTime = days+ ' days'
           }
           div.classList.add('card');
           content =`
               <div id="${data.items[i].id}">
                   <img src="${data.items[i].owner.avatar_url}" alt="" height="150" width="200">
               </div>
               <div>
                   <h2 >${data.items[i].name}</h2>
                   <p>${data.items[i].description}</p>
                   <h4>${data.items[i].stargazers_count}</h4>
                   <h4>${data.items[i].open_issues}</h4>
                   <p>Submitted ${elapsedTime} ago by: ${data.items[i].owner.login}</p>
               </div>
           `;
           div.innerHTML = content;
           mainContainer.appendChild(div);
    }
    return myPastDate;
};  

