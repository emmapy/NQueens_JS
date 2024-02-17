class Square{
  constructor(){
    this.init();
  }

  init(){
    this.filled = false;
    this.token = '-';
  }
  setPiece(p){
    this.piece = p;
    this.token = p.token;
    this.filled = true;
  }
}