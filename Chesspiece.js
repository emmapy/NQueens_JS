class Chesspiece {
  constructor(){
  }

  getToken(){
    return this.token;
  }

  setLoc(r, c){
    this.row = r;
    this.col = c;
  }

  print(){
    console.log(this.token + " at " + this.row + ", " + this.col);
  }
}