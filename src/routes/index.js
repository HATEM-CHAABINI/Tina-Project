import React, { Component } from 'react';
import { Router, Scene} from 'react-native-router-flux';
import Home from '../screens/Home'
import Questionnaire from '../screens/Questionnaire'
import NoResult from '../screens/NoResult';
import Depanneurs from '../screens/Depanneurs';
import FoundResult from '../screens/FoundResult';
import SignIn from '../screens/SignIn';
import RegPassword from '../screens/RegPassword';
import RegPostcode from '../screens/RegPostcode';
import RegName from '../screens/RegName';
import RegEmail from '../screens/RegEmail';
import History from '../screens/History';
import FAQ from '../screens/FAQ';
import FAQDetail from '../screens/FAQDetail';
import About from '../screens/About';
import Becomeadvertiser from '../screens/BecomeAdvertiser'
import Settings from '../screens/Settings'
import MyAccount from '../screens/MyAccount'
import MyEmail from '../screens/MyEmail'
import MyName from '../screens/MyName'
import SearchPostcode from '../screens/SearchPostcode';
import ForgotPassword from '../screens/ForgotPassword';
import AboutTina from '../screens/AboutTina';
import Cgu from '../screens/Cgu';
import Rgpd from '../screens/Rgpd';

class Routes extends Component {
	render() {
		return (
			<Router>
        		<Scene key="root">
				  <Scene key="home" hideNavBar component={Home} />
          		  <Scene key="questionnaire" hideNavBar component={Questionnaire} />
				  <Scene key="noresult" hideNavBar component={NoResult} />
				  <Scene key="depanneurs" hideNavBar component={Depanneurs} />
				  <Scene key="foundresult" hideNavBar component={FoundResult} />
				  <Scene key="regemail" hideNavBar component={RegEmail} />
				  <Scene key="regname" hideNavBar component={RegName} />
				  <Scene key="regpostcode" hideNavBar component={RegPostcode} />
				  <Scene key="regpassword" hideNavBar component={RegPassword} />
				  <Scene key="signin" hideNavBar component={SignIn} />
				  <Scene key="history" hideNavBar component={History} />
				  <Scene key="faq" hideNavBar component={FAQ} />
				  <Scene key="settings" hideNavBar component={Settings} />
				  <Scene key="myaccount" hideNavBar component={MyAccount} />
				  <Scene key="myemail" hideNavBar component={MyEmail} />
				  <Scene key="myname" hideNavBar component={MyName} />
				  <Scene key="faqdetail" hideNavBar component={FAQDetail} />
				  <Scene key="about" hideNavBar component={About} />
				  <Scene key="becomeadvertiser" hideNavBar component={Becomeadvertiser} />
				  <Scene key="searchpostcode" hideNavBar component={SearchPostcode} />
				  <Scene key="forgotpassword" hideNavBar component={ForgotPassword} />
				  <Scene key="abouttina" hideNavBar component={AboutTina} />
				  <Scene key="cgu" hideNavBar component={Cgu} />
				  <Scene key="rgpd" hideNavBar component={Rgpd} />
        		</Scene>
			</Router>
		)
	}
}

export default Routes;