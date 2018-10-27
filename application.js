class Welcome extends React.Component{
  render(){
    return <h1>Hello World!</h1>
  }
} 

//renders <h1>Hello World!</h1>
ReactDOM.render(
  <Welcome/>,
  document.getElementById("root")
)