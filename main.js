

//setup
let boardSize = prompt("enter board size greater than 3");
let A = new Chessboard(boardSize);

//solve
initQueens(A);
let t0 = performance.now();
solveNQueens(A);
let t1 = performance.now();

//print
A.print();
A.drawBoard();
A.printPieces();
console.log("solveNQueens("+boardSize+") runs in " + (t1 - t0) + " milliseconds.")


function initQueens(board){
  for (let i=0; i<board.dim; i++) {
    let rRnd = Math.floor(Math.random()*board.dim);
    A.placeNew(new Queen(), rRnd, i);
  }
}

function solveNQueens(board){
  let MAXSTEPS = 100;

  for (let i = 0; i<MAXSTEPS; i++){
    if (board.conflictPieces().length == 0) {
      console.log("NQueens complete!");
      return;
    }
    else {
      //get rnd conflict
      let rndCIndex = Math.floor(Math.random()*board.conflictPieces().length); //rnd conflict index
      let conflict = board.conflictPieces()[rndCIndex]; //conflict (a colNum) by rnd conflict index

      //find locs for conflict with fewest conflicts possible
      let fewestConflicts = board.fewestThreats(conflict);
      //set loc to rnd fewestConflicts
      let rndRIndex = Math.floor(Math.random()*fewestConflicts.length);  
      board.move(conflict, fewestConflicts[rndRIndex], conflict);

    }
    if (i == MAXSTEPS-1) console.log("reached MAXSTEPS - NQueens failed");
  }
  console.log("end of solve nQueens");


}