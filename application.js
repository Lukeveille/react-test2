// Setup board.
function Circle(props) {
  var color = "#FFF"
  if (props.cell === 1){
    color = "#000"
  } else if (props.cell === 2) {
    color = "#F33"
  }
  var style = {
    backgroundColor: color,
    border: "1px solid #000",
    borderRadius: "100%",
    paddingTop: "98%"
  }
  return (
    <div className = "circle" style = {style}></div>
  )
}
function Cell(props) {
  var style = {
    height: 70,
    width: 70,
    border: "1px solid #000",
    backgroundColor: "yellow"
  }
  return (
    <div style = {style} onClick = {() => props.handleClick(props.row,props.col)}>
        <Circle cell = {props.cell}/>
    </div>
  );
}
function Row(props) {
  var style = {
    display: "flex",
    justifyContent: "center"
  }
  var cells = [];
  for (let i = 0; i < 7; i++) {
    cells.push(<Cell key = {i} cell = {props.cells[i]} row = {props.row} col = {i} handleClick = {props.handleClick}/>)
  }
  return (
    <div className='gameRow' style={style}>
      {cells}
    </div>
  );
}
function Board(props) {
  var rows = [];
  for (let i = 0; i < 7; i++) {
    rows.push(<Row key = {i} row = {i} cells={props.cells[i]} handleClick = {props.handleClick}/>)
  }
  return (
    <div id='board'>{rows}</div>
  )
}

// Main Game class and application.
class Game extends React.Component {
  constructor(props) {
    super(props)

    var cells = []
    for (let i = 0; i < 7; i++ ) {
      cells.push(new Array(7).fill(0))
    }

    this.state = {
      player: false,
      cells: cells,
      winner: 0
    }

    this.handleClick = this.handleClick.bind(this)
  }
  
  // Game logic.
  findAvailableRow(col) {
    for (var i = 0; i < 7; i++) {
      if (this.state.cells[i][col] === 0) {
        return i;
      }
    }
    return -1;
  }
  // Victory logic.
  checkDiagonal(row,col){
    //find right and left tops
    var c = this.state.cells;
    var val = this.state.player? 2:1;
    var rR = row;
    var cR = col;
    
    while (rR < 5 && cR < 6){
      rR++; 
      cR++;
    }

    while (rR >= 3 && cR >= 3){
      if (c[rR][cR] === val && c[rR-1][cR-1] === val && c[rR-2][cR-2] === val && c[rR-3][cR-3] === val){
        return 1
      }
      rR--
      cR--
    }   

    var rL = row;
    var cL = col;

    while (rL < 5 && cL > 0){
      rL++
      cL--
    }

    while (rL >= 3 && cL <= 3){
      if (c[rL][cL] === val && c[rL-1][cL+1] === val && c[rL-2][cL+2] === val && c[rL-3][cL+3] === val){
        return 1;
      }
      rL--
      cL++
    }
    return 0;
  }
  checkHorizontal(row,col){
    var c = this.state.cells;
    var i = col;
    var val = this.state.player? 2:1;

    while( i >= 3){
      if(c[row][i] == val && c[row][i-1] == val && c[row][i-2] == val && c[row][i-3] == val){
        return 1
      }
      i--
    }
    return 0
  }
  checkVertical(row, col){
    var c = this.state.cells;
    var i = row;
    var val = this.state.player? 2:1;

    while( i >= 3) {
      console.log(c)
      if (c[i][col] == val && c[i-1][col] == val && c[i-2][col] == val && c[i-3][col] == val) {
        return 1
      }
      i--
    }
    return 0
  }
  checkVictory(row, col){
    return this.checkVertical(row,col) || this.checkHorizontal(row,col) || this.checkDiagonal(row,col);
  }

  // Controls.
  restart(){
    var cells = [];
    for(let i = 0; i < 7; i++ ){
      cells.push(new Array(7).fill(0));
    }
    this.setState({ player : false, cells : cells, winner:0});
  }
  handleClick(row, col) {
    if (this.state.winner)
      return
    console.log("row: " + row + " | col: " + col);
    var temp = [];
    for (let i = 0; i < 7; i++) {
      temp.push(this.state.cells[i].slice());
    }
    var newRow = this.findAvailableRow(col)
    temp[newRow][col] = this.state.player? 1 : 2
    this.setState({cells: temp, player: !this.state.player}, () => {
      if (this.checkVictory(newRow, col) > 0) {
        console.log('win');
        this.setState({winner:this.state.player? 2 : 1})
      }
    });
  }
  render() {
    return (
      <div id='gameBoard'>
        <h1>{this.state.winner > 0?  this.state.winner === 1? "Black Wins" : "Red Wins" : this.state.player? "Blacks Turn" : "Reds Turn"} </h1>
        <Board cells={this.state.cells} handleClick={this.handleClick}/>
        <button onClick = { () => this.restart()}>Restart</button>
      </div>
    )
  }
}

ReactDOM.render(<Game />, document.getElementById('root'));