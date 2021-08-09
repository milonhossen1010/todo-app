//Get elements 
let project = document.querySelector(".name");
let client = document.querySelector(".cl");
let date = document.querySelector(".date");
let time = document.querySelector(".time");
let btn = document.querySelector('.btn');
let todoList = document.querySelector("#todoList");
let totalTodo = document.querySelector("#totalTodo");
let checkBox = document.querySelector(".item-check");
let clearAll = document.querySelector(".clearAll");
let completed = document.querySelector(".completed");
let allTodo = document.querySelector(".allTodo");



//Todo Array
let todoArr = [];
btn.onclick = () => {
  //Input date
  let replaceDate = date.value.replaceAll("-", "/");
  let inputDate = new Date(replaceDate);
  let year = inputDate.getFullYear();
  let month = inputDate.getMonth() + 1;
  let days = inputDate.getDate();

  //Input time
  let timeArr = time.value.split(":");
  let inputTime = new Date(0, 0, 0, timeArr[0], timeArr[1], 0);
  let hrs = inputTime.getHours();
  let mins = inputTime.getMinutes();
  let sec = inputTime.getSeconds();

  let dates = new Date(year, month, days, hrs, mins, sec);





  //Get data from localStorage
  let localStorageVal = localStorage.getItem('todoList');

  if (localStorageVal == null) {
    todoArr = [];
  } else {
    todoArr = JSON.parse(localStorageVal);
  }

  if (project.value == '' ||  client.value == '' || date.value == '' || time.value == '') {
    document.querySelector("#mess").innerHTML = "All field are require.";
  } else {
    //Array push
    todoArr.push({
      project: project.value,
      client: client.value,
      date: dates,
      status: 0,
    });
  
    localStorage.setItem('todoList', JSON.stringify(todoArr));
    
    //Input value empty
    project.value = '';
    client.value = '';
    date.value = '';
    time.value = '';
  }








  //Data show
  showTodo();

}



//Show data
function showTodo() {



  //Get value from localStorage
  let localStorageVal = localStorage.getItem('todoList');
  let todoArr = JSON.parse(localStorageVal);
  let data = '';
  let revArr = todoArr.reverse();

  //Total todo list
  totalTodo.innerHTML = todoArr.length;

  revArr.map(function (val, index, arr) {

    //Now date
    let date = new Date();
    let yy = date.getFullYear();
    let m = date.getMonth() + 1;
    let dd = date.getDate();
    let hh = date.getHours();
    let mm = date.getMinutes();
    let ss = date.getSeconds();
    let nowTime = new Date(yy, m, dd, hh, mm, ss);

  
    //Total date
    let totalTime = new Date(val.date) - nowTime;

  

    //Get day hrs mins sec
    let day = parseInt(totalTime / 1000 / 60 / 60 / 24);
    totalTime -= day * 1000 * 60 * 60 * 24;
    let hours = parseInt(totalTime / 1000 / 60 / 60);
    totalTime -= hours * 1000 * 60 * 60;
    let mins = parseInt(Math.floor(Math.abs(totalTime / 1000 / 60)));
    totalTime -= mins * 1000 * 60;
    let seconds = parseInt(Math.floor(Math.abs((totalTime / 1000) % 60)));


    

    if (val.status) {

      data += `<div class="list-item--container" >

      <li class="items" style="color: #28a745"> <span class="sl">${index+1}. </span> <span  class="pName">${val.project}</span> <span class="cName">${val.client}</span> <span style="background:#28a745; color:#fff" class="day">D</span> <span class="hrs" style="background:#28a745; color:#fff">O</span> <span style="background:#28a745; color:#fff" class="mins">N</span> <span style="background:#28a745; color:#fff" class="sec">E</span>  <span> Completed</span> </li>
      
      <div class="delete"> <span onclick="deleteItem(${index})">✗</span></div>
   
      </div>`;

    } else if (totalTime >= 0) {
      data += `<div class="list-item--container"  >
 
      <li class="items"> <span class="sl">${index+1}. </span> <span class="pName">${val.project}</span> <span class="cName">${val.client}</span> <span class="day">${day}D</span> <span class="hrs">${hours}H</span> <span class="mins">${mins}M</span> <span class="sec">${seconds}S</span> <span >Running</span></li>
      <div  class="delete"><span onclick="status(${index})">✔</span> <span onclick="deleteItem(${index})">✗</span></div>
      </div>`;
    } else {


      data += `<div class="list-item--container" >

      <li class="items" style="color:#dd1818"> <span class="sl">${index+1}. </span> <span  class="pName">${val.project}</span> <span class="cName">${val.client}</span> <span style="background:#dd1818; color:#fff" class="day">L</span> <span class="hrs" style="background:#dd1818; color:#fff">A</span> <span style="background:#dd1818; color:#fff" class="mins">T</span> <span style="background:#dd1818; color:#fff" class="sec">E</span>  <span style="color:red;">Time is over!!</span> </li>
      
      <div class="delete"> <span onclick="deleteItem(${index})">✗</span></div>
   
      </div>`;

    }



  });


  todoList.innerHTML = data;



}

//Show all
let interval = setInterval(showTodo, 1000);

/**
 * allTodo
 */
 allTodo.onclick = function(){
  return  interval = setInterval(showTodo, 1000);
 }

/**
 * Completed task
 */
 completed.onclick = function(){
  clearInterval(interval);
  
    //Get value from localStorage
    let localStorageVal = localStorage.getItem('todoList');
    let todoArr = JSON.parse(localStorageVal);
    let data = ''; 
 
  
    todoArr.map(function (val, index, arr) {
      if (val.status) {

        data += `<div class="list-item--container" >
  
        <li class="items" style="color: #28a745"> <span class="sl">${index+1}. </span> <span  class="pName">${val.project}</span> <span class="cName">${val.client}</span> <span style="background:#28a745; color:#fff" class="day">D</span> <span class="hrs" style="background:#28a745; color:#fff">O</span> <span style="background:#28a745; color:#fff" class="mins">N</span> <span style="background:#28a745; color:#fff" class="sec">E</span>  <span> Completed</span> </li>
        
        <div class="delete"> <span onclick="deleteItem(${index})">✗</span></div>
     
        </div>`;
      }
    });

    todoList.innerHTML = data;

}





/**
 * Delete item
 */
function deleteItem(index) {
  //Get value from localStorage
  let localStorageVal = localStorage.getItem('todoList');
  let todoArr = JSON.parse(localStorageVal);
  let revArr = todoArr.reverse();

  revArr.splice(index, 1);
  localStorage.setItem('todoList', JSON.stringify(todoArr));
  showTodo();
}


/**
 * Clear all 
 */
clearAll.onclick = function () {
  // localStorage.clear();
  // todoList.innerHTML = '';
   //Get value from localStorage
   let localStorageVal = localStorage.getItem('todoList');
   let todoArr = JSON.parse(localStorageVal);
   todoArr = [];
   localStorage.setItem('todoList', JSON.stringify(todoArr));

  showTodo();
  // clearInterval(interval);
}

/**
 * status function
 */
function status(index) {
  //Get value from localStorage
  let localStorageVal = localStorage.getItem('todoList');
  let todoArr = JSON.parse(localStorageVal);
  // let revArr = todoArr.reverse();
  todoArr[index]['status'] = 1;


  localStorage.setItem('todoList', JSON.stringify(todoArr));



}


