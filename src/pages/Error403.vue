<script>

export default {
  name : 'Error401',
}

</script>

<template>

    <div class="container-fluid d-flex flex-column justify-content-center align-items-center">
      <h1>ERROR403</h1>
      <p>Non sei autorizzato ad accedere a questa risorsa.</p>
      <div class="btn-home">
        <router-link :to="{name: 'home'}">Torna alla home</router-link>
      </div>
    </div>

</template>

<style lang="scss" scoped>

h1{
  color: white;
}

p{
  color: white;
}

a{
  color: white;
  text-decoration: none;
}

.btn-home{
  background-color: rgb(255, 0, 162);
  border: none;
  color: white;
  padding: 10px 15px;
  border-radius: 5px;
  text-align: center;
  transition: 0.25s ease;
  cursor: pointer;
  &:hover{
    background-color: rgb(203, 3, 130);
  }
}

</style>