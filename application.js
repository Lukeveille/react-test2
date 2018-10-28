class Counter extends React.Component{
  constructor(props){
      super(props)
      //initial state set up
      this.state = {message:"initial message"}
  }
  componentDidMount(){
      //updating state
      this.setState((prevState, props) => {
        return {message: prevState.message + '!'}
      })
  }
  render(){
      return <div>Message: {this.state.message}</div>
  }
}

ReactDOM.render(
  <Counter/>,
  document.getElementById("root")
)