<script setup>
import { RouterLink, RouterView } from 'vue-router'

</script>

<template>
    <div id="underHeader">
        <button>filter</button>
        <div v-if="false" id="filter">    
        </div>
        <div>
            <input type="text" name="" id="search" placeholder="Search">
            <button id="searchConfirm">Submit</button>
        </div>
        
        <button><RouterLink :to=url>Suprise me!</RouterLink> </button> 
    </div>

    <table id="drinks"></table>

    <button id="lookAtMore">Look at more drinks</button>
</template>


<script>
//<RouterLink :to="{ name: 'Cocktail', params: { id: url}}" >suprise me! </RouterLink>

export default {
    data() {
         return {
            url:''
        }
    },
    created() {
    window.addEventListener('load', async () => {
        this.GetRandomDrink()


        const drinks = document.getElementById('drinks')

        for (let index = 0; index < 2; index++) {
            let tableRow = document.createElement('tr')
            drinks.appendChild(tableRow)  

            for (let index = 0; index < 3; index++) {
                
                let url = 'https://thecocktaildb.com/api/json/v1/1/random.php'
                let response = await fetch(url)
                let data = await response.json()
                let drinkArray = data.drinks[0]
           
            
                let tableColums = document.createElement('td')
                tableColums.style.paddingTop = '2%'
                tableRow.appendChild(tableColums)  


                let eatchDrink = document.createElement('div')
                eatchDrink.style.backgroundColor = '#3276c9'
                eatchDrink.style.border = '1px solid rgb(54, 39, 185)'
                eatchDrink.style.borderRadius = '10px'
                eatchDrink.style.padding = "20px"
                eatchDrink.style.marginLeft = "20%"
                eatchDrink.style.marginRight = "20%"
                tableColums.appendChild(eatchDrink)        


                let drinkName = document.createElement('p')
                drinkName.style.color = "#fff"
                drinkName.innerHTML = drinkArray.strDrink
                drinkName.style.fontFamily = 'Arial, sans-serif'
                drinkName.style.paddingBottom = "4%"
                drinkName.style.textAlign = "center"
                eatchDrink.appendChild(drinkName)


                let drinkIMG = document.createElement('img')
                drinkIMG.src = drinkArray.strDrinkThumb
                eatchDrink.appendChild(drinkIMG)  
            }            
        }        
    })},
    methods: {
        async GetRandomDrink() {
            let url = 'https://thecocktaildb.com/api/json/v1/1/random.php'
            let response = await fetch(url)
            let data = await response.json()
            let drinkArray = data.drinks[0]
            this.url = '/cocktail/' + drinkArray.idDrink
        },

    }
}
</script>

<style scoped>

    /* The buttons under the header but over the drinks */
    #underHeader {
        display: flex;
        justify-content: space-evenly;
        padding-top: 2%;
    }
    
    #underHeader div button {
        margin-left: 15px;
    }

    #underHeader input {
        background-color: #fff;
        padding: 5px;
        border: 1px solid rgb(54, 39, 185);
        border-radius: 5px;
        font-family: Arial, sans-serif;
        font-size: 1rem;
    }

    /* Drinks being shown */
    #drinks {
        margin-bottom: 2%;
        margin-left: 2%;
        margin-right: 2%;
        text-align: center;
    }
    
    /* Button in the bottom of the site */
    #lookAtMore {
        display: block;
        margin: auto;
        margin-bottom: 2%;
    }

    @media (pointer:none), (pointer:coarse) {
    #underHeader {
        padding-bottom: 10%;
        margin-left: 2%;
        margin-right: 2%;
        
    }

    #underHeader div button {
        margin-left: 20%;
        margin-top: 2%;
    }

    #underHeader input {
        margin-left:5%;
        width: 90%;
    }
}

</style>