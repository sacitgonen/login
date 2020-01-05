import React from "react";
import './Page.css';
import firebase from "firebase";

class LoginPage extends React.Component {

    state = {
        email:'',
        password:''
    };

    login(event){
        event.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
            console.log('giris basarili');
            let temp = firebase.auth().currentUser;
            console.log(temp);
            this.props.setUser(temp);
        }).catch(function (error) {
            console.log(error.message)
        });
    }

    render() {
        return (
            <form style={{border: 'solid black', margin: '10px', padding: '10px'}}>
                <h2 style={{textAlign: 'center'}}>Login</h2>
                <div className='Page Rows'>
                    <label style={{minWidth: '100px'}}>e-mail:</label>
                    <input type='email' value={this.state.email} onChange={event => this.setState({email: event.target.value})}/>
                </div>
                <div className='Page Rows'>
                    <label style={{minWidth: '100px'}}>password:</label>
                    <input type='password' value={this.state.password} onChange={event => this.setState({password: event.target.value})}/>
                </div>
                <button className='Page Button' onClick={event=> this.login(event)}>Login</button>
            </form>
        );
    }
}

export default LoginPage;