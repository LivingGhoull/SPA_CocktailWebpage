<template>
    <div id="underHeader">
        <button onclick="window.location.href='/'">Homepage</button>
        <button @click="GetRandomDrink()">Suprise me!</button> 
    </div>
    
    <div id="drinkInfo">
        <p id="name">{{ drinkName }}</p>
        <img :src="drinkIMG" alt="drink img">

        <div id="info">
            <div id="infoP">
                <div>  
                    <p>Is alcoholic: </p>
                    <p>Categories: </p>
                    <p>Glass: </p>
                </div>
                <div>  
                    <p>{{ drinkIsAlcoholic }}</p>
                    <p>{{ drinkCategories }}</p>
                    <p>{{ drinkGlass }}</p>
                </div>
            </div>
            <div>
                <button @click="Like()" id="like">Like</button>
            </div>
        </div>
    </div>

    <div id="needToDo">
        <div id="ingredients">
            <h2>Ingredients</h2>
            <ul id="ingredientsList"></ul>
        </div>

        <div id="instruction">
            <h2>Instruction</h2>
            <p>{{ drinkInstruction }}</p>
        </div>
    </div>

    <div id="comments">
        <div id="userWriteComment">
            <p class="username">Username:</p>
            <input type="text" placeholder="Wirte a comment">
            <button @click="">Submit</button>
        </div>

        <div id="userInComments">
            <div class="user">
                <p class="username">Username:</p>
                <p class="usercomment">This is a comment </p>
            </div>
        </div>
        <button @click="SeeAllComments">See all commemnts</button>
    </div>
</template>

<script>
import { getFunctions, httpsCallable } from "firebase/functions";
import {functions, auth } from '../firebase'
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, signOut } from "firebase/auth";

export default {
    props: ['id'],
    data(){
        return {
            drinkId: '',
            drinkName: '',
            drinkIMG: '',
            drinkIsAlcoholic: '',
            drinkCategories: '',
            drinkGlass: '',
            drinkIngredients: [],
            drinkMeasurement: [],
            drinkInstruction: '',
            like: false,
            IslogedIn: false,
        }
    },
    created() {
    window.addEventListener('load', async () => {
                
        let url = `https://thecocktaildb.com/api/json/v1/1/lookup.php?i=${this.id}`
        let response = await fetch(url)
        let data = await response.json()
        let drinkArray = data.drinks[0] 

        this.drinkName = drinkArray.strDrink
        this.drinkIMG = drinkArray.strDrinkThumb
        this.drinkIsAlcoholic = drinkArray.strAlcoholic
        this.drinkCategories = drinkArray.strCategory
        this.drinkGlass = drinkArray.strDrink
        this.drinkInstruction = drinkArray.strInstructions

        this.drinkIngredients = [
            this.drinkIngredients[0] = drinkArray.strIngredient1,
            this.drinkIngredients[1] = drinkArray.strIngredient2,
            this.drinkIngredients[2] = drinkArray.strIngredient3,
            this.drinkIngredients[3] = drinkArray.strIngredient4,
            this.drinkIngredients[4] = drinkArray.strIngredient5,
            this.drinkIngredients[5] = drinkArray.strIngredient6,
            this.drinkIngredients[6] = drinkArray.strIngredient7,
            this.drinkIngredients[7] = drinkArray.strIngredient8,
            this.drinkIngredients[8] = drinkArray.strIngredient9,
            this.drinkIngredients[9] = drinkArray.strIngredient10,
            this.drinkIngredients[10] = drinkArray.strIngredient11,
            this.drinkIngredients[11] = drinkArray.strIngredient12,
            this.drinkIngredients[12] = drinkArray.strIngredient13,
            this.drinkIngredients[13] = drinkArray.strIngredient14,
            this.drinkIngredients[14] = drinkArray.strIngredient15,
        ]

        this.drinkMeasurement = [
            this.drinkMeasurement[0] = drinkArray.strMeasure1,
            this.drinkMeasurement[1] = drinkArray.strMeasure2,
            this.drinkMeasurement[2] = drinkArray.strMeasure3,
            this.drinkMeasurement[3] = drinkArray.strMeasure4,
            this.drinkMeasurement[4] = drinkArray.strMeasure5,
            this.drinkMeasurement[5] = drinkArray.strMeasure6,
            this.drinkMeasurement[6] = drinkArray.strMeasure7,
            this.drinkMeasurement[7] = drinkArray.strMeasure8,
            this.drinkMeasurement[8] = drinkArray.strMeasure9,
            this.drinkMeasurement[9] = drinkArray.strMeasure10,
            this.drinkMeasurement[10] = drinkArray.strMeasure11,
            this.drinkMeasurement[11] = drinkArray.strMeasure12,
            this.drinkMeasurement[12] = drinkArray.strMeasure13,
            this.drinkMeasurement[13] = drinkArray.strMeasure14,
            this.drinkMeasurement[14] = drinkArray.strMeasure15,
        ]
        this.AllIncredients()
    }
    )},
    methods: {
        async GetRandomDrink() {
            let url = 'https://thecocktaildb.com/api/json/v1/1/random.php'
            let response = await fetch(url)
            let data = await response.json()
            let drinkArray = data.drinks[0]
            window.location.href = `/cocktail/${drinkArray.idDrink}`
        },
        AllIncredients() {
            let ul = document.getElementById('ingredientsList')

            for (let i = 0; i < this.drinkIngredients.length; i++) {
                if (this.drinkIngredients[i] == null) {
                    break
                }
                let li = document.createElement('li')
                li.innerHTML = `'${this.drinkIngredients[i]}', ${this.drinkMeasurement[i]}`
                li.style.padding = '2px'
                ul.appendChild(li)    
            }
        },
        Homepage() {
            window.location.href = `/cocktail/${drinkArray.idDrink}`
        },
        async Like() {
            let liked = document.getElementById('like')
            this.like = !this.like

            if (this.like == false) 
            {
                const removeLike = httpsCallable(functions, 'removeLike')
                await removeLike({itemId: this.drinkId, userid: auth.currentUser.uid})
                liked.style.backgroundColor = '#3276c9'
            } 
            
            else 
            {
                const addLike = httpsCallable(functions, 'addLike')
                let result = await addLike({userid: auth.currentUser.uid, itemId: this.drinkId})
                console.log(result)
                liked.style.backgroundColor = '#F2A71E'
            }
        },
        Comment() {
            if (auth.currentUser) {
                //wites a commetn
            } else {

            }
        },
        SeeAllComments() {
            
        },  
    },
}

</script>

<style scoped>
    /* Underheader */
    #underHeader {
        display: flex;
        justify-content: space-evenly;
        padding-top: 2%;
    }

    /* DrinkInfo */
    #drinkInfo {
        text-align: center;
        border: 1px solid rgb(54, 39, 185);
        background-color: #3276c9;

        border-radius: 10px;
        margin-top: 1%;
        margin-left: 30%;
        margin-right: 30%;
        padding: 2%;
    }

    #info {
        display: flex;
        justify-content: space-evenly;
        padding-top: 2%;
    }

    #infoP p{
        text-align: left;
        padding-top: 4%;
        font-weight:bold;
    }

    #infoP{
        display: flex;
    }

    #infoP div:first-of-type, #infoP div:first-of-type p{
        margin-right: 10px;
        color: #F2A71E;
    }

    #name{
        color: #fff;
        font-family: Arial, sans-serif;
        font-size: 2rem;
        padding-bottom: 5%;
        padding-top: 0%;
    }
     
    p{
        color: #fff;
        font-family: Arial, sans-serif;
        font-size: 15px;
    }

    /* Ingredients and Instruction */
    #needToDo {
        border-top: 1px solid rgb(54, 39, 185);
        margin-top: 1%;
        background-color: #3276c9;
        display: flex;
        justify-content: space-evenly;

    }
    #needToDo div:first-of-type{
        border-right: 1px solid rgb(54, 39, 185);
    }
    
    #ingredients, #instruction {
        padding-left: 3%;
        padding-right: 3%;
        width: 50%;
    }

    h2 {
        padding: 2%;
        text-align: center;
        color: #F2A71E;
        font-family: Arial, sans-serif;
        font-size: 20px;
        font-weight: bold;
    }
    
    ul {
        list-style-type: circle;
        font-family: Arial, sans-serif;
        color: #fff;
        font-weight: bold;
        padding-bottom: 2%;
        padding-left: 40%;
    }

    #comments ::placeholder{
        color: #fff;
    }

    #userWriteComment {
        font-family: Arial, sans-serif;
        color: #fff;
        margin-top: 2%;
        
        
    }

    #comments {
        border-top: 2px solid rgb(54, 39, 185);
        display: flex;
        flex-direction: column;
        background-color: #3276c9;
    }

    #comments button {
        margin-left: 40%;
        margin-right: 40%;
        margin-bottom: 2%;
        margin-top: 2%;
    }

    #userWriteComment .username {
        padding-left: 2%;
        padding-right: 2%;
        
        font-weight: bold;
        margin: auto
    }

    .user, #userWriteComment {
        display: flex;
        background-color:#F2A71E;
        margin-left: 20%;
        margin-right: 20%;
        padding: 10px;
        border: 1px solid rgb(129, 60, 11);
        margin-bottom: 5px;
    }

    #userInComments {
        margin-top: 2%;
    }

    .user .username {
        padding-left: 2%;
        padding-right: 2%;
        font-weight: bold;
    }

@media (pointer:none), (pointer:coarse) {
    #name{
        font-size: small;
    }
    #infoP p{
       font-size: small;
    }
    #drinkInfo {
        margin-left: 5%;
        margin-right: 5%;
    }
    #comments button {
        margin-left: 20%;
        margin-right: 20%;
        margin-top: 2%;
    }

    ul {
        
        padding-left: 10%;
    }

    #ingredients, #instruction{
        font-size: small;
        padding-bottom: 2%;
    }
}
</style>