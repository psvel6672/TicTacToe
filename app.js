var getBoxClass = document.querySelector(".box");

var getBtnClass = document.querySelectorAll(".btn");

const stopClick = (getBtns) => {
    getBtns.forEach(function(btn){
        btn.setAttribute("disabled", "true");
    });
};

stopClick(getBtnClass);

const chkCookiesfrUsr = "";


const checkWinner = (playerPos, curPlayer, usr1, usr2) => {

    const soln = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

    for (let x of soln) {

        let tmpPosArr = [];
        let tmpPlayPos;

        if(curPlayer == usr1){
            tmpPlayPos = playerPos['X'];
        }

        if(curPlayer == usr2){
            tmpPlayPos = playerPos['O'];
        }

        for(var i = 0; i < tmpPlayPos.length; i++){
            tmpPosArr.push(Number(tmpPlayPos[i]));
        }

        if (x.every(y => tmpPosArr.includes(y))) {
            return true;
        }
        
    }

    return false;
}


var getModal = document.querySelector('.modal');
const getUsrDtls = document.querySelector(".UsrDtls");

getUsrDtls.addEventListener("click", function(e){
    getModal.style.display = 'block';
});

const getModalClose = document.querySelector(".close");

getModalClose.addEventListener("click", function(e){
    getModal.style.display = 'none';
});

let player_pos = {'X':[], 'O':[]};

let usr1 = document.querySelector("#usrX").value;
let usr2 = document.querySelector("#usrO").value;

var currentUsr = usr1;

getBtnClass.forEach(function(btn){
    btn.addEventListener("click", function(e){
        var BtnIndex = btn.id;

        var tmpUser1 = getCookie("user1");
        var tmpUser2 = getCookie("user2");

        if (currentUsr == tmpUser1){
            btn.classList.add('fillBackX');
            btn.textContent = 'X';
            tmpUsr = player_pos['X'];
            tmpUsr.push(BtnIndex);
            if(checkWinner(player_pos, currentUsr, tmpUser1, tmpUser2)){
                setTimeout(function() {
                    alert(""+currentUsr+" is Winner.");
                }, 0);
                stopClick(getBtnClass);
                return true;
            }
            currentUsr = tmpUser2;
        }else{
            btn.classList.add('fillBackO');
            btn.textContent = 'O';
            tmpUsr = player_pos['O'];
            tmpUsr.push(BtnIndex);
            if(checkWinner(player_pos, currentUsr, tmpUser1, tmpUser2)){
                setTimeout(function() {
                    alert(""+currentUsr+" is Winner.");
                }, 0);
                stopClick(getBtnClass);
                return true;
            }
            currentUsr = tmpUser1;
        }
        

    });
});

var getResetBtn = document.querySelector(".resetBtn");

getResetBtn.addEventListener("click", function(){

    getBtnClass.forEach(function(btn){
        btn.classList.remove('fillBackX');
        btn.classList.remove('fillBackO');
        btn.textContent = '';
        player_pos = {'X':[], 'O':[]};
        currentUsr = usr1;
        usr1.value = "";
        usr2.value = "";
    });

});

var getStartBtn = document.querySelector(".startBtn");

getStartBtn.addEventListener("click", function(){

    var tmpUser1 = getCookie("user1");
    var tmpUser2 = getCookie("user2");

    var tmpFlag = tmpUser1+"-"+tmpUser2;

    console.log(tmpFlag);

    if(tmpFlag == "-"){
        alert("Please add users.");
        return false;
    }
    
    currentUsr = tmpUser1;

    getBtnClass.forEach(function(btn){
        btn.removeAttribute('disabled');
    });

});

var getSaveUsr = document.querySelector(".saveBtn");

getSaveUsr.addEventListener("click", function(){

    let tmpusr1 = document.querySelector("#usrX").value;
    let tmpusr2 = document.querySelector("#usrO").value;

    alert(tmpusr1+""+tmpusr2);

    setCookie("user1", tmpusr1, 30);
    setCookie("user2", tmpusr2, 30);

});

function setCookie(name, value, days) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + value + expires + "; path=/";
}

function getCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1, c.length);
        }
        if (c.indexOf(nameEQ) == 0) {
            return c.substring(nameEQ.length, c.length);
        }
    }
    return null;
}