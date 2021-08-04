//Get elements 
let project = document.querySelector(".name");
let client = document.querySelector(".cl");
let date = document.querySelector(".date");
let time = document.querySelector(".time");
let btn = document.querySelector('.btn');
let todoList = document.querySelector("#todoList");
let totalTodo = document.querySelector("#totalTodo");
let checkBox = document.querySelector(".item-check");



//Todo Array
let todoArr = [];
btn.onclick = () => {
  //Input date
  let replaceDate = date.value.replaceAll("-", "/");
  let inputDate = new Date(replaceDate);
  let inputMilliseconds = inputDate.getTime();


  //Input time
  let timeArr = time.value.split(":");
  let inputTime = new Date(0, 0, 0, timeArr[0], timeArr[1], 0);


  console.log(inputTime.getTime());



  //Get data from localStorage
  let localStorageVal = localStorage.getItem('todoList');

  if (localStorageVal == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(localStorageVal);
  }


  //Array push
  todoArr.push({
    project: project.value,
    client: client.value,
    date: inputMilliseconds,
    time: inputTime.getTime(),
    status: 0,
  });

  localStorage.setItem('todoList', JSON.stringify(todoArr));






  //Input value empty
  project.value= '';
  client.value= '';
  date.value= '';
  time.value= '';


  //Data show
  showTodo();

}



//Show data
function showTodo() {



  //Get value from localStorage
  let localStorageVal = localStorage.getItem('todoList');
  let todoArr = JSON.parse(localStorageVal);
  let data = '';
  // let revArr = todoArr.reverse();

  //Total todo list
  totalTodo.innerHTML = todoArr.length;

  todoArr.map(function (val, index, arr) {
 
    //Today Date
    let today = new Date();
    let dateMilliseconds = today.getTime();
    let cal = val.date - dateMilliseconds;
    //One day in milliseconds 
    let oneDay = 1000 * 60 * 60 * 24;
    //Calculate 
    let days = Math.round(cal / oneDay);

    // console.log(val.date);
    // console.log(days);

    //Now time
    let now = new Date();
    let h = now.getHours();
    let m = now.getMinutes();
    let s = now.getSeconds();
    let nowSec = new Date(0, 0, 0, h, m, s);
 



    //Day and time total milliseconds
    let totalDayMiliSec = days * oneDay;
    let totalMiliSec = totalDayMiliSec + val.time;
    let totalTime = totalMiliSec - nowSec.getTime();
    let day = parseInt(totalTime / 1000 / 60 / 60 / 24);
    let hours = parseInt(totalTime / 1000 / 60 / 60);
   
    totalTime -= hours * 1000 * 60 * 60;
    let mins = parseInt(Math.floor(Math.abs(totalTime / 1000 / 60)));
    totalTime -= mins * 1000 * 60 ;
    let seconds =  parseInt(Math.floor(Math.abs((totalTime / 1000) % 60)));

  //Progress bar width
  // let width =  Math.floor((totalTime/1000) % 60);






    if( totalTime >= 0 ){


      data += `<div class="list-item--container"  >

      <li class="items"> <span class="sl">${index+1}. </span> <span class="pName">${val.project}</span> <span class="cName">${val.client}</span> <span class="day">${day}D</span> <span class="hrs">${(hours >= 24) ? 00 : hours}H</span> <span class="mins">${mins}M</span> <span class="sec">${seconds}S</span></li>
      
      <div  class="delete"><span>✔</span> <span onclick="deleteItem(${index})">✗</span></div>
      
    </div>`;




    }else {


      data += `<div class="list-item--container" >

      <li class="items"> <span class="sl">${index+1}. </span> <span  class="pName">${val.project}</span> <span class="cName">${val.client}</span> <span style="background:#f50057; color:#fff" class="day">L</span> <span class="hrs" style="background:#f50057; color:#fff">A</span> <span style="background:#f50057; color:#fff" class="mins">T</span> <span style="background:#f50057; color:#fff" class="sec">E</span>  <span>Time is over!!</span> </li>
      
      <div class="delete"><span>✔</span> <span onclick="deleteItem(${index})">✗</span></div>
   
    </div>`;


    }


  

  });



  todoList.innerHTML = data;


}

//Show all
showTodo();
// setInterval(function(){
//   showTodo();
// }, 1000);

 /**
  * Delete item
  */
function deleteItem(index){
    //Get value from localStorage
    let localStorageVal = localStorage.getItem('todoList');
    let todoArr = JSON.parse(localStorageVal);
    let revArr = todoArr.reverse();

    revArr.splice(index, 1);
    localStorage.setItem('todoList', JSON.stringify(todoArr));
    showTodo();
}