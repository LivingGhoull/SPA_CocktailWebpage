<template>
<div id="main-header">
    <div id="logo">
        <img src="./icons/logo.png" alt="">
    </div>
    
    <div v-if="!isLoggedIn" class="userAccount">
        <button @click="DisplayLogin">Login</button>
        <button @click="DisplaySignIn">Sign op</button>
    </div>

    <div v-if="isLoggedIn" class="userAccount">
        <p>{{username}}</p>
        <button>Likes</button>
        <button @click="Logout">Logout</button>
    </div>  
</div>

<div v-if="showLoginHolder" id="showSignOrLog">
    <button @click="Exit" id="exit"
    >X</button>

    <div v-if="showLogin" class="login">
        <label for="">{{labelName}}</label>
        <input v-if="!loginMethodEmail" type="text" v-model="username">
        <input v-else type="text" v-model="email">

        <label for="">Use username instead</label>
        <input @change="LoginMethod" id="check" type="checkbox">

        <label for="">Password</label>
        <input type="text" v-model="password">
        <button @click="Login">Login</button>
    </div>
    
    <div v-if="showSignIn" class="login">
        <label for="">Email</label>
        <input type="text" v-model="email">

        <label for="">Username</label>
        <input type="text" v-model="username">

        <label for="">Password</label>
        <input type="text" v-model="password">
        
        <label for="">Confirm password</label>
        <input type="text" v-model="confirmPassword">

        <button>Login</button>
    </div>
</div>

<div v-if="showLoginHolder" id="backgroundCheck"></div>
</template>

<script>
import { addUser } from '../firebase';

export default {
    data(){
        return {
            isLoggedIn: false,
            showLogin: false,
            showSignIn: false,
            showLoginHolder: false,

            loginMethodEmail: false,
            labelName: "Email",

            email: "jesper@hotmail.dk",
            username: "jesper",
            password: "1234",
            confirmPassword: "1234",

            error: "",
        }
    },
    methods: {
        DisplayLogin() {
            if (this.showSignIn) {
                this.showSignIn = false
            }
            this.showLogin = true
            this.showLoginHolder = true
            this.showLoginHolder = true
        },
        DisplaySignIn() {
            if (this.showLogin) {
                this.showLogin = false
            }
            this.showSignIn = true
            this.showLoginHolder = true
            this.showLoginHolder = true
        },
        Exit() {
            this.showLoginHolder = false
        },
        async Login() {
            await addUser()
            this.isLoggedIn = true
            this.Exit()
        },
        Logout() {
            this.isLoggedIn = false
            this.Exit()
        },
        LoginMethod() {
            if (this.loginMethodEmail) {
                this.labelName = "Username"
                this.loginMethodEmail = false
            } else {
                this.labelName = "Email"
                this.loginMethodEmail = true
            }
        },
    }
}
</script>

<style>
    #showSignOrLog {
        z-index: 1;
        position: absolute;
        top: 30%;
        bottom: 20%;
        left: 30%;
        right: 30%;
        border-radius: 5%;
        background-color: #78a8e2;
    }

    .login{
        display: flex;
        flex-direction: column;
        margin-top: 10%;
        padding-left: 20%;
        padding-right: 30%;
    }

    .login label{
        margin-top: 5%;
    }

    .login button{
        margin-top: 5%;
        margin-left: 30%;
        margin-right: 30%;
    }

    .login input{
        background-color: #fff;
        padding: 2%;
        border: 1px solid rgb(54, 39, 185);
        border-radius: 5px;
        font-family: Arial, sans-serif;
        font-size: 1rem;
    }

    input[type="checkbox"] {
        -webkit-appearance: checkbox !important;
        -moz-appearance: checkbox !important;
        -ms-appearance: checkbox !important;
        -o-appearance: checkbox !important;
        appearance: checkbox !important;
        width: 20px;
    }
    
    #showSignOrLog #exit{
        float: right;
        margin-right: 20px;
        margin-top: 20px;
    }

    #main-header #logo {
        margin-left: 20%;
    }

    #backgroundCheck {
        position: absolute; /*position: fixed;*/
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    #main-header {
        display: flex;
        justify-content: space-between;
        box-shadow: 0px 4px 15px #3276c9;
    }

    .userAccount{
        margin-right: 20%;
        align-self: center;
    }

    .userAccount button{
        margin: 5px;
    }

    .userAccount p{
        display: inline-block;
        border: 1px solid rgb(129, 60, 11);
        border-radius: 10px;
        padding: 1rem 2rem;
        margin-right: 40px;
        text-decoration: none;
        background-color: #F2A71E ;
        color: #3276c9;
        font-family: Arial, sans-serif;
        font-size: 1rem;
        text-align: center;
        transition: background 250ms ease-in-out, 
        transform 150ms ease;
    }

    button {
        display: inline-block;
        border: 1px solid rgb(54, 39, 185);
        border-radius: 10px;
        padding: 1rem 2rem;
        text-decoration: none;
        background: #3276c9;
        color: #ffffff;
        font-family: Arial, sans-serif;
        font-size: 1rem;
        cursor: pointer;
        text-align: center;
        transition: background 250ms ease-in-out
        transform 150ms ease;
    }

    button:hover {
        background: #F2A71E;
    }

    button:focus {
        outline: 1px solid #fff;
        outline-offset: -4px;
    }

    button:active {
        transform: scale(0.99);
    }


@media (pointer:none), (pointer:coarse) {
    #showSignOrLog {
        z-index: 1;
        position: absolute;
        top: 30%;
        bottom: 20%;
        left: 15%;
        right: 15%;
        border-radius: 5%;
        background-color: #78a8e2;
    }

    .login {
        display: flex;
        flex-direction: column;
        margin-top: 25%;
        padding-left: 10%;
        padding-right: 10%;
    }

    .login label{
        margin-top: 5%;
    }

    .login button{
        margin-top: 5%;
        margin-left: 30%;
        margin-right: 30%;
        
    }

    .login input{
        background-color: #fff;
        padding: 2%;
        border: 1px solid rgb(54, 39, 185);
        border-radius: 5px;
        font-family: Arial, sans-serif;
        font-size: 1rem;
    }

    #main-header #logo {
    margin-left: 10%;
    padding-right: 10%;
    }

    #showSignOrLog #exit{
        float: right;
        margin-right: 20px;
        margin-top: 20px;
    }

    #backgroundCheck {
        position: absolute; /*position: fixed;*/
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5);
    }

    .userAccount{
        margin-right: 0%;
        align-self: center;
    }
    
    .userAccount p{
        margin-left: 15%;
    }

    .userAccount button{
        margin: 1px;
    }

    .userAccount p{
        display: inline-block;
        border: none;
        border-radius: 10px;
        padding: 1rem 2rem;
        margin-right: 40px;
        text-decoration: none;
        background-color: #F2A71E;
        color: rgb(54, 39, 185);
        font-family: Arial, sans-serif;
        font-size: 1rem;
        text-align: center;
        transition: background 250ms ease-in-out, 
        transform 150ms ease;
    }
}
</style>