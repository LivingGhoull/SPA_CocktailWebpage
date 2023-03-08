<template>
<div id="main-header">
    <div id="logo">
        <img src="./icons/logo.png" alt="">
    </div>
    
    <div v-if="!isLoggedIn" class="userAccount">
        <button @click="DisplayLogin">Login</button>
        <button @click="DisplaySignIn">Sign op</button>
    </div>
    <div v-else class="userAccount">
        <p>{{username}}</p>
        <button>Likes</button>
        <button @click="Logout">Logout</button>
        <button @click="DisplaySubscipeInfo">Subscripe</button>
    </div>  
</div>

<div v-if="backgorundBlock" id="showSignOrLog">
    <button @click="ExitDisplay" id="exit">X</button>

    <div v-if="showLogin" class="login">
        <p v-if=loginErrorActive id="error">Error: Something went wrong check your inputs!</p>

        <label for="">Email</label>
        <input type="email" placeholder="Enter your email" v-model="loginEmail">

        <label for="">Password</label>
        <input type="password" placeholder="Enter your password" v-model="loginPassword">
        <button @click="Login">Login</button>
    </div>
    
    <div v-if="showSignIn" class="login">
        <label for="">Email</label>
        <input type="email" placeholder="Enter a email" v-model="signEmail">

        <label for="">Username</label>
        <input type="text" placeholder="Enter a username" v-model="signUsername">

        <label for="">Password</label>
        <input type="password" placeholder="Enter a password" v-model="signPassword">
        
        <label for="">Confirm password</label>
        <input type="password" placeholder="Enter a the password again" v-model="signConfirmPassword">

        <button @click="loginUser">Sign up</button>
    </div>
     
    <div v-if="subInfo" class="login">
        <table>
            <tr>
                <th>Perks</th>
                <th>Not subscriped</th>
                <th>Subscriped</th>
            </tr>
            <tr>
                <td>Recive email with the best liked drinks</td>
                <td>NO</td>
                <td>YES</td>
            </tr>
            <tr>                
                <td>Related news</td>
                <td>YES</td>
                <td>YES</td>
            </tr>
        </table>
        <button @click="DisplaySubscipe">Subscribe</button>
    </div>

    <div v-if="showSub" class="login">
        <p v-if=loginErrorActive id="error">Error: Something went wrong check your inputs!</p>

        <label for="">Creditcard number</label>
        <input type="text" placeholder="Enter card numbner" v-model="cardNumber">

        <label for="">Card name</label>
        <input type="text" placeholder="Enter name on card" v-model="cardName">

        <label for="">Expiry date</label>
        <input type="text" placeholder="MM / YY" v-model="expiryDate">

        <label for="">CVV</label>
        <input type="text" placeholder="Enter CVV" v-model="cvv">
        <button @click="Subscribe">Subscribe</button>
    </div>

</div>

<div v-if="backgorundBlock" id="backgroundCheck"></div>
</template>

<script > 
import { getFunctions, httpsCallable } from "firebase/functions";// TODO: Add SDKs for Firebase products that you want to use
import {functions, auth } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default {
    data(){
        return {
            username: "",
            isLoggedIn: false,
            showLogin: false,
            showSignIn: false,
            showSub: false,
            subInfo: false,
            backgorundBlock: false,

            //login
            loginEmail: "",
            loginPassword: "",
            loginErrorActive: false,

            //signUp
            signEmail: "",
            signUsername: "",
            signPassword: "",
            signConfirmPassword: "",
            signErrorActive: false,

            //subscripe
            cardNumber: "",
            cardName: "",
            expiryDate: "",
            cvv: "",
        }
    },
    methods: {
        //used for displaying layers
        DisplayLogin() {
            this.showLogin = true
            this.backgorundBlock = true
        },
        DisplaySignIn() {
            this.showSignIn = true
            this.backgorundBlock = true
        },
        DisplaySubscipeInfo(){
            this.subInfo = true
            this.backgorundBlock = true
        },
        DisplaySubscipe(){
            this.subInfo = false
            this.showSub = true
            this.backgorundBlock = true
        },
        ExitDisplay() {
            this.showLogin = false
            this.showSignIn = false
            this.subInfo = false
            this.showSub = false
            this.backgorundBlock = false
        },
        Subscribe(){
            this.ExitDisplay()

        },
        // To login and signUp 
        Login() {
            signInWithEmailAndPassword(auth, this.loginEmail, this.loginPassword)
            .then((userCredential) => {
                const user = userCredential.user;
                this.ExitDisplay()
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(`${errorCode}, ${errorMessage}`)
                this.loginErrorActive = true;
            });
        },
        SignUp() {
            if (this.signConfirmPassword == this.signPassword) {
                createUserWithEmailAndPassword(auth, this.signEmail, this.signPassword)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    console.log(user)
                    // ...
                    this.ExitDisplay()
                    this.signErrorActive = false
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    console.log(`${errorCode}, ${errorMessage}`)
                    // ..
                    this.signErrorActive = true    
                });
            } else{
                this.signErrorActive = true
            }
        },
        Logout() {
            signOut(auth)
            .then(() => {
                this.isLoggedIn = false
            })
            .catch((error) => {
                console.log(error)
            })
        },

        async loginUser() {
            if(this.signPassword == this.signConfirmPassword)
            {
                const signUpUser = httpsCallable(functions, 'signUpUser')
                let res = await signUpUser({email: this.signEmail, name: this.signUsername, password: this.signConfirmPassword})

                console.log(res)
            }
            else
            {
                console.log('error 404')
            }
        },
    },
    // runs evrytime a change to authentication
    mounted() {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                this.isLoggedIn = true;
                this.username = user.email
            }
        })
    }
}
</script>

<style>
    #showSignOrLog {
        z-index: 1;
        position: absolute;
        top: 30%;
        bottom: 15%;
        left: 30%;
        right: 30%;
        border-radius: 5%;
        background-color: #78a8e2;
    }

    .login{
        display: flex;
        flex-direction: column;
        margin-top: 10%;
        padding-left: 15%;
        padding-right: 20%;
    }

    .login th{
        padding-top: 2%;
        padding-bottom: 5%;
        font-family: Arial, sans-serif;
        font-size: 1rem;
        font-weight: bold;
        border: 1px solid black;
        text-align: center;
    }

    .login table {
        border: 1px solid black;
    }

    .login td{
        padding-top: 2%;
        border: 1px solid black;
        font-family: Arial, sans-serif;
        font-size: 15px;
        text-align: center;
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
        height: 140%;
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
        font-weight:bold;
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

    #error {
        color: rgba(163, 0, 0, 0.719);
    }

    p {
        font-family: Arial, sans-serif;
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