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
        <p>Username</p>
        <button>Likes</button>
        <button>Logout</button>
    </div>  
</div>

<div v-if="showLoginHolder" id="showSignOrLog">
    <button @click="Exit" id="exit"
    >X</button>

    <div v-if="showLogin" id="login"  >
        <label for="">Email</label>
        <input type="text">

        <label for="">Password</label>
        <input type="text">
        
        <button>Login</button>
    </div>
    
    <div v-if="showSignIn" id="login">
        <label for="">Email</label>
        <input type="text">

        <label for="">Username</label>
        <input type="text">

        <label for="">Password</label>
        <input type="text">
        
        <label for="">Confirm password</label>
        <input type="text">

        <button>Login</button>
    </div>
</div>

<div v-if="showLoginHolder" id="backgroundCheck"></div>
</template>

<script>
export default {
    data(){
        return {
            isLoggedIn: false,
            showLogin: false,
            showSignIn: false,
            showLoginHolder: false,
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
    }
}
</script>

<style>


#showSignOrLog {
    z-index: 1;
    position: absolute;
    top: 35%;
    bottom: 20%;
    left: 30%;
    right: 30%;
    border-radius: 5%;
    background-color: #78a8e2;
}

#showSignOrLog #login{
    display: flex;
    flex-direction: column;
    justify-content: center;
    position: absolute;
    top: 0%;
    bottom: 20%;
    left: 25%;
    right: 25%;
}

#login input{
    background-color: #fff;
    height: 10%;
    padding: 5%;
    font-family: Arial, sans-serif;
    font-size: 1rem;
}

#login label{
    padding-top: 5%;
}

#login button{
    margin-top: 5%;
}

#showSignOrLog #exit{
    float: right;
    margin-right: 20px;
    margin-top: 20px;
}

#main-header #logo {
    margin-left: 20%;
}

#main-header #backgroundCheck {
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
    border: none;
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
    border: none;
    border-radius: 10px;
    padding: 1rem 2rem;
    margin: 0;
    text-decoration: none;
    background: #3276c9;
    color: #ffffff;
    font-family: Arial, sans-serif;
    font-size: 1rem;
    cursor: pointer;
    text-align: center;
    transition: background 250ms ease-in-out, 
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
</style>