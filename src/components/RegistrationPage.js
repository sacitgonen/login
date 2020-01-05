import React from "react";
import './Page.css';
import firebase from "firebase";

class RegistrationPage extends React.Component {

    state = {
        firstName:'',
        lastName:'',
        email:'',
        password:''
    };

    handleOnSubmit(event){
        event.preventDefault();
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(function() {
            console.log('Registration Basarili');
            /*
            firebase.auth().currentUser.sendEmailVerification().then(function() {
                console.log('verification gonderildi');
            }).catch(function(error) {
                console.log('verification gonderilmedi');
            });
            */
        }).catch(function(error) {
            var errorCode = error.code;
            var errorMessage = error.message;
            console.log('HATA');
            console.log(errorCode + ', ' + errorMessage);
        });
    }

    render() {
        return (
            <form style={{border: 'solid black', margin: '10px', padding: '10px'}}>
                <h2 style={{textAlign: 'center'}}>Register</h2>
                <div className='Page Rows'>
                    <label style={{minWidth: '100px'}}>First Name:</label>
                    <input type='text' onChange={event => this.setState({firstName: event.target.value})}/>
                </div>
                <div className='Page Rows'>
                    <label style={{minWidth: '100px'}}>Last Name:</label>
                    <input type='text' onChange={event => this.setState({lastName: event.target.value})}/>
                </div>
                <div className='Page Rows'>
                    <label style={{minWidth: '100px'}}>e-mail:</label>
                    <input type='email' onChange={event => this.setState({email: event.target.value})}/>
                </div>
                <div className='Page Rows'>
                    <label style={{minWidth: '100px'}}>password:</label>
                    <input type='password' onChange={event => this.setState({password: event.target.value})}/>
                </div>
                <button className='Page Button' onClick={event=> this.handleOnSubmit(event)}>Register</button>
            </form>
        );
    }
}

export default RegistrationPage;