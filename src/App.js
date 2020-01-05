import React from 'react';
import firebase from "firebase";
import LoginPage from "./components/LoginPage";
import RegistrationPage from "./components/RegistrationPage";
import Texting from "./components/Texting";


let firebaseConfig = {
    apiKey: "AIzaSyD85Zj27iqFlVqpwrGC3EW4aI7f0hpjaxU",
    authDomain: "family-messaging-6799f.firebaseapp.com",
    databaseURL: "https://family-messaging-6799f.firebaseio.com",
    projectId: "family-messaging-6799f",
    storageBucket: "family-messaging-6799f.appspot.com",
    messagingSenderId: "154092687798",
    appId: "1:154092687798:web:3bf42caf61871c5aa03117",
    measurementId: "G-2G2BX0KMWJ"
};
firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging.usePublicVapidKey('BDpVKMqMAMMorqbS3_2d6X4aT4bKiHT4m4fPp58dkwBsJTUzsQPY0wncvU9feFUhCUfsiiKspRBBFfuFpwaTxVA');

messaging.onMessage(function (payload) {
    console.log('onMessage: ' + payload);
});

class App extends React.Component {

    constructor() {
        super();
        this.state = {
            loginOrRegister:true,
            user:null,
            token:null
        }
    }

    componentDidMount() {
        Notification.requestPermission().then(() => {
            console.log('pushAPI permission granted by the user');
            messaging.getToken().then((response) => {
                console.log('getToken() successful');
                this.setState({token: response});
            }).catch(() => {
                console.log('getToken() failed')
            });
        }).catch(() => {
            console.log('pushAPI permission denied by the user');
        });
    }

    userInfo(){
        if(this.state.user){
            console.log('there is user');
            return <div>{this.state.user.email}</div>;
        }
    }

    setUser(newUser){
        this.setState({user: newUser});
    }

    loginOrRegister(){
        if(!this.state.user) {
            if (this.state.loginOrRegister) {
                return <LoginPage setUser={this.setUser.bind(this)}/>;
            } else {
                return <RegistrationPage/>;
            }
        }
    }

    textingPage(){
        if (this.state.user){
            return <Texting/>
        }
    }

    render() {
        console.log(this.state.token);

        return (
            <div>
                <div style={{display: 'flex', justifyContent: 'flex-end'}}>
                    {this.userInfo()}
                    <input
                        type='checkbox'
                        checked={this.state.loginOrRegister}
                        onChange={event => this.setState({loginOrRegister: event.target.checked})}
                    />
                    <button className='Page Button' onClick={()=> firebase.auth().signOut().then(() => {
                        console.log('cikti');
                        if(!firebase.auth().currentUser){
                            this.setState({user: null});
                        }
                    }).catch(function () {
                        console.log('cikamadi');
                    })}>Logout</button>
                </div>
                {this.loginOrRegister()}
                {this.textingPage()}
                <p>Welcome to my website, this is try&learn website where I test my knowledge. Thanks for visiting!</p>
            </div>
        );
    }
}

export default App;