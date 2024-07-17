<script>

import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import { store } from "./data/store.js";


export default {
  name : 'App',
  components : {
    Header,
    Footer
  },
  data(){
    return {
      store,
    }
  },
  methods:{
  },
  created() {
  }
}

</script>

<template>

  <div class="container-custom">

    <div class="container-header">
      <Header />
    </div>

    <div class="container-route">
      <RouterView />
    </div>

    <div class="container-footer">
      <Footer />
    </div>

  </div>

</template>

<style lang="scss" scoped>


.container-custom {

  .container-header{
     background-color: #333;
     color: #fff;
     height: 100px;
     display: flex;
     justify-content: center;
     align-items: center;
  }

  .container-route{
     width: 100%;
     min-height: calc(100vh - 200px);
     display: flex;
     justify-content: center;
     align-items: center;
  }

  .container-footer{
     background-color: #333;
     color: #fff;
     height: 100px;
     text-align: center;
     display: flex;
     justify-content: center;
     align-items: center;
  }

}

</style>
