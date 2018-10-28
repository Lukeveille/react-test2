class Counter extends React.Component{
  constructor(props){
      super(props)
      this.state = {
        count: 0
      }
      //binding is necessary to make `this` point to the correct object
      this.clickHandler = this.clickHandler.bind(this)
  }
  clickHandler(){
    //increments the count of the state
    this.setState({count: this.state.count + 1})
  }
  render(){
      //renders a button that displays the state count
      return <button onClick = {this.clickHandler}>{this.state.count}</button>
  }
}

ReactDOM.render(
<Counter/>,
document.getElementById("root")
)