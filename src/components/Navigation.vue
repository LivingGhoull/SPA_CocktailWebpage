<template>
<div id="main-header">
    <div id="logo">
        <img src="./icons/logo.png" alt="">
    </div>
    
    <div v-if="!isLoggedIn" class="userAccount">
        <button>Login</button>
        <button>Sign op</button>
    </div>

    <div v-if="isLoggedIn" class="userAccount">
        <p>Username</p>
        <button>Likes</button>
        <button>Logout</button>
    </div>    
</div>
</template>

<script>
export default {
    data(){
        return {
            isLoggedIn: true,
        }
    }
}
</script>

<style>
#logo {
    margin-left: 20%;
}

.userAccount{
    margin-right: 20%;
    align-self: center;
}
.userAccount button{
    margin: 5px;
}


#main-header{
    display: flex;
    justify-content: space-between;
    box-shadow: 0px 4px 15px #3276c9;
}

button, p{
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
button:hover,
button:focus {
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