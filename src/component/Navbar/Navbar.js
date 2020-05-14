import React, { useState, useEffect } from 'react'
import {connect} from 'react-redux'
import {initUser, getPosition} from '../../action/user'
import {initTodos} from '../../action/todo'
import {initReviewArray} from '../../action/review'
import {setError, removeError} from '../../action/error'
import './Navbar.css'
import Dialog from '../Dialog/Dialog'
import LoginForm from './LoginForm'
import SignupForm from './SignupForm'
import restaurants from '../../defaultData'

function Navbar(props){
    const [login, toggleLoginDialog] = useState(false);
    const [signup, toggleSignUpDialog] = useState(false);
    useEffect(()=>{
        props.init();
    })
    const logo = <div>WHAT DO YOU WANT TO EAT?</div>
    if(props.userName){
        return (
            <nav>
                {logo}
                <div>Welcom back, {props.userName}</div>
            </nav>
        )
    }

    return(
        <nav>
            {logo}
            <div>
            <button className = 'nav-btn btn btn-light' onClick={()=>{console.log('clicked!'); toggleLoginDialog(true)}}>
                login
            </button>
            <button className ='nav-btn btn btn-light' onClick={()=>toggleSignUpDialog(true)}>
                signup
            </button>
            </div>
            <Dialog show={login}  toggleShow={toggleLoginDialog}><LoginForm error={props.error} login={props.login} class='DialogContent' /></Dialog>
            <Dialog show={signup} toggleShow={toggleSignUpDialog} ><SignupForm setError={props.setError} error={props.error} signup={props.signup} class='DialogContent'/></Dialog>
        </nav>
    )
}


function mapStateToProps(state){
    return {
        userName: state.user.userName,
        userID: state.user.userID,
        error: state.error.message
    }
}

function mapDispatchToProps(dispatch){
    return {
        login: (user)=>{
            fetch('http://localhost:3001/api/auth/login', {
                method: 'POST',
                mode: 'cors',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then((data)=>{
                if(data.error)
                    throw new Error(data.error.message);
                dispatch(initUser(data));
                dispatch(removeError())
                return data;
            })
            .then((data)=>{
                let url = 'http://localhost:3001/api/todos/user/'+ data.id
                fetch(url,{
                    method: "GET",
                    credentials:"include"
                })
                .then(response=>response.json())
                .then(data=>{
                    dispatch(initTodos(data))
                })
            })
            .catch((error)=>{
                dispatch(setError(String(error)));
            })
        },
        init: ()=>{
            fetch('http://localhost:3001/api/auth',{
                method:'GET',
                mode: 'cors',
                credentials: 'include',
            })
            .then(response => response.json())
            .then((data)=>{
                if(data.error)
                    throw new Error(data.error.message);
                dispatch(initUser(data));
                dispatch(removeError());
                dispatch(initReviewArray(restaurants));
                navigator.geolocation.getCurrentPosition((position)=>{
                    dispatch(getPosition({latitude: position.coords.latitude, longtitude: position.coords.longitude}));
                });
                return data
            })
            .catch((error)=>{
                //do nothing
            })
        },
        signup: (user)=>{
            fetch('http://localhost:3001/api/auth/signup',{
                method:'POST',
                mode:'cors',
                credentials:'include',
                headers:{
                    'Content-Type': 'application/json'
                },
                body : JSON.stringify(user)
            })
            .then(response => response.json())
            .then((data)=>{
                if(data.error)
                    throw new Error(data.error.message);
                dispatch(initUser(data));
                dispatch(removeError())
            })
            .then((data)=>{
                let url = 'http://localhost:3001/api/todos/user/'+ data.id
                
                fetch(url,{
                    method: "GET",
                    credentials:"include"
                })
                .then(response=>response.json())
                .then(data=>{
                    console.log(data)
                    dispatch(initTodos(data))
                })
            })
            .catch((error)=>{
                dispatch(setError(String(error)));
            })
        },
        setError: (error)=>{
            dispatch(setError(error));
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Navbar)