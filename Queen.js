class Queen extends Chesspiece {
  constructor(){
    super();
    this.token = 'Q';
  }

  canReach(r1, c1){
    if (this.row == r1) return true;
    if (this.col == c1) return true;
    if (Math.abs(this.row-r1) == Math.abs(this.col-c1)) return true;
    return false;
  }
}