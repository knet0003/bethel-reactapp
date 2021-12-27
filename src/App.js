import React, { Component} from "react";
import "./App.css";
import Sidebar from "./components/sideBar/sideNavBar";
import LoginForm from './components/loginForm';
import auth from "./services/authService";
import TopBar from "./components/topBar/topBar";

class App extends Component {
  state = {
    token: "",
    user: {}
  }; 

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }
 
  render() {

  // if(!this.token) {
  //   return <LoginForm setToken={this.state.token} />
  // }
  const { user } = this.state;
    return (
      <>
          {/* <Routes history={history}>
            <Route path='/' exact component={Home} />
            <Route path='/projects' exact render={(props) => <Projects {...props}/>} />
            <Route path='/status' exact component={Status} />
            <Route path='/support' exact component={Support} />
 
            <Route path='/createproject' exact render={(props) => <CreateProject  {...props}/>} />
          </Routes> */}
          <Sidebar/>
          {/* {!user &&
          <LoginForm />
          } */}
    
          
      </>
      
    );
  }
}
export default App;
