import {Component} from "react";
import Header from "../../components/common/Header";
import {inject, observer} from "mobx-react";
import withRouter from "../../withRouter";
import AuthLayout from "../../components/Layout/AuthLayout";

class Home extends Component{
    render() {
      return (
       <>
        <AuthLayout>
            <Header/>

            Anasayfa
        </AuthLayout>
       </>
      )
    }
}

export default withRouter(inject("AuthStore")(observer(Home)));
