import {Component} from "react";
import Header from "../../components/common/Header";
import {inject, observer} from "mobx-react";
import withRouter from "../../withRouter";

class Home extends Component{
    render() {
      return (
       <>
       <Header/>

           Anasayfa
       </>
      )
    }
}

export default withRouter(inject("AuthStore")(observer(Home)));
