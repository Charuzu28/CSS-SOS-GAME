//selecting all elements
const selectBox = document.querySelector(".select-box"),
SelectSBtn = selectBox.querySelector(".playerS"),
SelectOBtn = selectBox.querySelector(".playerO"),
playerBoard = document.querySelector(".play-board"),
allBox = document.querySelectorAll("section span"),
players = document.querySelector(".players"),
resultBox = document.querySelector(".result-box"),
wonText = resultBox.querySelector(".won-text"),
playagainBtn = resultBox.querySelector("button");

window.onload = ()=>{
  for(let i = 0; i < allBox.length; i++){
    allBox[i].setAttribute("onclick", "clickedBox(this)");
  }

  SelectSBtn.onclick = ()=>{
  selectBox.classList.add("hide");
  playerBoard.classList.add("show");
}
SelectOBtn.onclick = ()=>{
  selectBox.classList.add("hide");
  playerBoard.classList.add("show");
  players.setAttribute("class", "players active player");
}
}

let playerSIcon = "fa-solid fa-s";
let playerOIcon = "fa-solid fa-o";
let playerSign = "s";
let runBot = true;

//user click function
function clickedBox(element){
  // console.log(element);
  if(players.classList.contains("player")){
    element.innerHTML = `<i class="${playerOIcon}"></i>`;
    players.classList.add("active");
   
    playerSign = "o";
    element.setAttribute("id", playerSign);
  }else{
    element.innerHTML = `<i class="${playerSIcon}"></i>`;
    players.classList.add("active");
    element.setAttribute("id", playerSign);
  }
  selectWinner();
  playerBoard.style.pointerEvents = "none";
  element.style.pointerEvents = "none";
  let randomTimeDelay = ((Math.random() * 1000) + 200).toFixed();
  setTimeout(()=>{
    bot(runBot);
}, randomTimeDelay);
}

//bot click function
function bot(runBot){
 if(runBot){
  playerSign = "o";
  let array = [];
  for(let i = 0; i < allBox.length; i++){
    if(allBox[i].childElementCount == 0){
        array.push(i);
        //console.log(i + " " + "has no children");
    }
  }
  let randomBox = array[Math.floor(Math.random() * array.length)];
  console.log(randomBox);
  if(array.length > 0){
    if(players.classList.contains("player")){
      allBox[randomBox].innerHTML = `<i class="${playerSIcon}"></i>`;
      players.classList.remove("active");

      playerSign = "s";
      allBox[randomBox].setAttribute("id", playerSign);
    }else{
      allBox[randomBox].innerHTML = `<i class="${playerOIcon}"></i>`;
      players.classList.remove("active");
      allBox[randomBox].setAttribute("id", playerSign);
    }
    selectWinner();
  }
  allBox[randomBox].style.pointerEvents = "none";
  playerBoard.style.pointerEvents = "auto";
  playerSign = "s";
 }

}

function getClass(idname){
  return document.querySelector(".box" + idname).id;
}
function checkClass(val1,val2,val3,sign){
  if(getClass(val1) == sign && getClass(val2) == sign && getClass(val3) == sign){
    return true;
  }
}
function selectWinner(){
  if(checkClass(1,2,3,playerSign) || checkClass(4,5,6,playerSign) ||checkClass(7,8,9,playerSign) || checkClass(1,4,7,playerSign) || checkClass(2,5,8,playerSign) || checkClass(3,6,9,playerSign) || checkClass(1,5,9,playerSign) || checkClass(3,5,7,playerSign)){
    // console.log(playerSign + " " + "ang panalo!! EYYYYY!!" );
    runBot = false;
    bot(runBot);
    setTimeout(()=>{
      playerBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 700);
    
    wonText.innerHTML = `Player <p>${playerSign}</p> ang panalo!`;
  }else{

    if(getClass(1) != "" && getClass(2) != ""  && getClass(3) != ""  && getClass(4) != ""  && getClass(5) != ""  && getClass(6) != ""  && getClass(7) != "" && getClass(8) != ""  && getClass(9) != "" ){
      runBot = false;
    bot(runBot);
    setTimeout(()=>{
      playerBoard.classList.remove("show");
      resultBox.classList.add("show");
    }, 700);
    wonText.textContent = `Tabla ang laban!`;
    }
  }
}

playagainBtn.onclick = ()=>{
  window.location.reload();
}
