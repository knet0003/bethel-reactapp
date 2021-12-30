import React, { Component} from "react";
import "./App.css";
import Sidebar from "./components/sideBar/sideNavBar";
import LoginForm from './components/pages/authentication/loginForm';
import auth from "./services/authService";
import TopBar from "./components/topBar/topBar";
import RegisterForm from "./components/pages/authentication/registerForm";
import Authentication from './components/pages/authentication/authentication';

class App extends Component {
  state = {
    token: "",
    user: {},
    reg: ""
  }; 

  componentDidMount() {
    // const user = auth.getCurrentUser();
    // this.setState({ user });
    const token = auth.getJwt();
    this.setState({ token })
  }

 handleToken = (tok) => {
   const { token } = this.state;
   this.setState({ token: tok});
   console.log(token);
 }

  render() {
  const  { user, token } = this.state
  if(!token) {
    return <Authentication token={this.handleToken}/>
   
  }
    return (
      <>
          {/* <Routes history={history}>
            <Route path='/' exact component={Home} />
            <Route path='/projects' exact render={(props) => <Projects {...props}/>} />
            <Route path='/status' exact component={Status} />
            <Route path='/support' exact component={Support} />
 
            <Route path='/createproject' exact render={(props) => <CreateProject  {...props}/>} />
          </Routes> */}
        <Sidebar />           
          
      </>
      
    );
  }
}
export default App;
