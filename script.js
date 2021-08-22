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