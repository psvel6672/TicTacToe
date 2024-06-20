import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Tic Tac Toe';

  GameStartsWith:Number = 1;
  PlayerOne:String = 'O';
  PlayerTwo:String = 'X';

  getElement:any;
  tmpId:any;
  PlayerPos:any = {'O':[], 'X':[]};
  alertMsg:String = "";
  modalPop:any;

  AllPosArr:any = [];

  CurrentPlayer = this.PlayerOne;

  setDefaultValues(){
    this.GameStartsWith = 1;
    this.PlayerPos = {'O':[], 'X':[]};
    this.CurrentPlayer = this.PlayerOne;

    this.AllPosArr = [];

    let smallBoxes = document.querySelectorAll(".smallBox");
    smallBoxes.forEach(box => {
        let abc = box.id;
        this.getElement = this.AngGetById(abc);
        this.getElement.style.cursor = '';
    });

  }

  ClickBtn(id:Number){
    this.tmpId = String(id);
    this.getElement = this.AngGetById(this.tmpId);

    let WinnerFlag = 0;

    if(this.getElement.style.cursor == ''){
      this.getElement.querySelector('p').innerText = this.CurrentPlayer;

      this.getElement.style.cursor = 'not-allowed';

      this.PlayerPos[String(this.CurrentPlayer)].push(id);
      // console.log(this.PlayerPos);

      this.AllPosArr.push(id);

      if(this.checkWin(this.PlayerPos, this.CurrentPlayer)){
        // console.log('Winner is Player '+this.GameStartsWith);
        // modalPopUp
        this.alertMsg = "Player "+this.GameStartsWith+" is Winner.";

        this.modalPop = document.querySelector(".modalPopUp");
        this.modalPop.style.display = 'flex';

        // console.log(this.modalPop);

        WinnerFlag = 1;

      }

      if(this.CurrentPlayer == this.PlayerOne){
        this.CurrentPlayer = this.PlayerTwo;
        this.GameStartsWith = 2;
      }else{
        this.CurrentPlayer = this.PlayerOne;
        this.GameStartsWith = 1;
      }

      if(this.AllPosArr.length >= 9 && WinnerFlag == 0){
        this.alertMsg = "Match Draw.";
        this.modalPop = document.querySelector(".modalPopUp");
        this.modalPop.style.display = 'flex';
      }

    }

  }
  
  checkWin(playerPos: { [key: string]: number[] }, curPlayer: String): boolean {

    const soln: number[][] = [[1, 2, 3], [4, 5, 6], [7, 8, 9], [1, 4, 7], [2, 5, 8], [3, 6, 9], [1, 5, 9], [3, 5, 7]];

    for (const x of soln) {
      if (x.every(y => playerPos[String(curPlayer)].includes(y))) {
        return true;
      }
    }
    return false;
  }

  AngGetById(str:String){
    return document.getElementById(String(str));
  }

  CloseModal(){
    this.modalPop = document.querySelector(".modalPopUp");
    this.modalPop.style.display = 'none';

    let smallBoxes = document.querySelectorAll(".smallBox");
    smallBoxes.forEach(box => {
      let paragraph = box.querySelector('p');
      if (paragraph) {
        paragraph.innerText = '';
      }
    });

    this.setDefaultValues();

  }

  constructor(){}
  

}
