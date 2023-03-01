<template>
    <h1>HelloWorld</h1>
    <h2>this is {{ id }}</h2>
</template>

<script>
    export default {
        data(){
            return {
                id: this.$route.params.id
            }
        },
        methods: {

        }
        
    }
</script>