class Chessboard{

  constructor (n){
    this.dim = n;
    this.grid = [];
    this.pieces = [];
    this.init();
    this.initCanvas();
  }

  init() {
    for (let i = 0; i<this.dim; i++){
      this.grid.push([]);
      for (let j = 0; j<this.dim; j++){
        this.grid[i].push(new Square());
      }
    }
  }

  initCanvas(){
    this.canvas = document.getElementById('myCanvas');
    this.ctx = this.canvas.getContext("2d");
    let dimMin = Math.min(window.innerWidth, window.innerHeight);
    this.canvas.width = dimMin*0.8;
    this.canvas.height = dimMin*0.8;
    this.boxWidth = this.canvas.width/this.dim;
    this.boxHeight = this.canvas.height/this.dim;
    this.border = 1;
  }

  print(){
    let col = "  ";
    for (let j = 0; j<this.dim; j++){
      col+=" c"+j;
    }
    console.log(col);
    for (let i = 0; i<this.dim; i++){
      let row = "r"+i+" ";
      for (let j = 0; j<this.dim; j++){
        row+= " " + this.grid[i][j].token + " ";
      }
      console.log(row);
    }
  }

  printPieces(){
    for (let index in this.pieces){
      this.pieces[index].print();
    }
  }

  drawBoard(){
    this.ctx.fillStyle = "black";
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();

    for (let r = 0; r<this.dim; r++){
      for (let c=0; c<this.dim; c++){
        this.drawBox(r, c);
        this.drawToken(r, c);
      }
    }
  }

  drawBox(r, c){
    if ((r+c)%2 == 1) this.ctx.fillStyle = "white";
    else this.ctx.fillStyle = "black";

    let x = c*this.boxWidth;
    let y = r*this.boxHeight;
    this.ctx.beginPath();
    this.ctx.rect(x, y, this.boxWidth-this.border, this.boxHeight-this.border);
    this.ctx.fill();
  }

  drawToken(r, c){
    this.ctx.fillStyle = "gray";
    let sz = 1/this.dim*100;
    this.ctx.font = sz+"px Georgia";
    this.ctx.textAlign = "center";
    this.ctx.textBaseline = "middle";

    let x = c*this.boxWidth+this.boxWidth/2;
    let y = r*this.boxHeight+this.boxHeight/2;

    this.ctx.fillText(this.grid[r][c].token, x, y);

  }

  validLoc(r, c){
    if (r>-1 &&
        r<this.dim &&
        c>-1 &&
        c<this.dim){
      return true;
    } else return false;
  }

  place(piece, r, c){
    this.grid[r][c].setPiece(piece);
    piece.setLoc(r, c);
  }

  placeNew(piece, r, c){
    if (!this.validLoc(r, c)){
      console.log("Chessboard placeNew(): Did not place chesspiece bc bad location: " + piece.getToken + ", " + r + ", " + c);
    }
    if (!this.grid[r][c].isFilled){
      this.place(piece, r, c);
      this.pieces.push(piece);

    } else {
      console.log("Chessboard placeNew(): Did not place chesspiece bc square is already filled: ");
      console.log(piece.getToken()+ ", "+r+", "+c);
    }
  }

  move(i, r, c){
    let oldR = this.pieces[i].row;
    let oldC = this.pieces[i].col;
    this.grid[oldR][oldC].init();
    this.place(this.pieces[i], r, c);
  }

  numThreats(r, c){
    if (!this.validLoc(r, c)) return -1; //if loc is out of bounds of the board
    let a = 0;
    for (let index in this.pieces){
      if (index == c) continue;
      if (this.pieces[index].canReach(r, c)) {
        a++;
      }
    }
    return a;
  }

  conflictPieces(){
    let conflicts = [];
    for (let i = 0; i<this.pieces.length; i++){
      if (this.numThreats(this.pieces[i].row, i)!=0) {
        conflicts.push(i);
      }
    }
    return conflicts;
  }

  fewestThreats(col){
    let bestThreats = 100;
    let bestR = [];

    //examine each row by traversing
    for (let row = 0; row<this.dim; row++){
      if (this.numThreats(row, col)<bestThreats){ //new lowest number of threats
        bestR = [row];
        bestThreats = this.numThreats(row, col);
      } else if (this.numThreats(row, col)==bestThreats){//add to bestR list
        bestR.push(row);
      }
    }
    return bestR;

  }

}