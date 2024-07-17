<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
  name : 'Home',
  components: {
    Loader
    },
  data(){
    return {
      concerts: {},
      isLoaded: false
    }
  },
  methods : {

    // async getUser(){  
      
    //   try {
    //     const res = await axios.get('user/')
    //     localStorage.setItem('user', JSON.stringify(res.data.data));
    //   } catch (error) {
    //     await this.$router.push('/login')
    //   }

    // },
    async getConcerts(){

      try {
        const res = await axios.get('concert/')
        this.concerts = res.data;
        this.isLoaded = true;
      } catch (error) {
        await this.$router.push('/login')
      }

    }

  },
  created(){
    
  },
  mounted(){
    // this.getUser();
    this.getConcerts();
  }
}

</script>

<template>

  <div v-if="!isLoaded" class="container d-flex justify-content-center h-100 align-items-center">
    <Loader />
  </div>

  <div v-else class="my-5">

    <h1 class="text-center mb-5">Concerti Disponibili</h1>
  
    <div class="container-fluid d-flex justify-content-center flex-wrap">
  
      <router-link :to="{name: 'payment-concert', params:{idConcert: concert.idConcert}}" v-for="concert in concerts" class="card-custom">
        <div>
          <div>
            <h2>🎵 {{ concert.band }}🎵</h2>
          </div>
        </div>
        <div class="mt-4">
          <p class="d-flex align-items-center mb-2">
            <img src="https://openui.fly.dev/openui/24x24.svg?text=📍" alt="Location icon" class="me-2"/>
            Città: <span class="ms-1">{{ concert.city }}</span>
          </p>
          <p class="d-flex align-items-center mb-2">
            <img src="https://openui.fly.dev/openui/24x24.svg?text=📅" alt="Date icon" class="me-2"/>
            Data: <span class="ms-1">{{ concert.reply[2] }}/{{ concert.reply[1] }}/{{ concert.reply[0] }}</span>
          </p>
          <p class="d-flex align-items-center mb-2">
            <img src="https://openui.fly.dev/openui/24x24.svg?text=🎟️" alt="Tickets icon" class="me-2"/>
            Biglietti disponibili: <span class="ms-1">{{ concert.qtyAvailable }}</span>
          </p>
          <p class="d-flex align-items-center mb-4">
            <img src="https://openui.fly.dev/openui/24x24.svg?text=💶" alt="Price icon" class="me-2"/>
            Prezzo del biglietto: <span class="ms-1">{{ concert.unitPrice }} &euro;</span>
          </p>
        </div>
      </router-link>
  
    </div>

  </div>



</template> 

<style lang="scss" scoped>

h1{
  color: white;
}

a{
    text-decoration: none;
    color: white;
  }

.card-custom{
  width: 400px;
  background-color: black;
  color: white;
  padding: 30px;
  margin: 20px;
  border-radius: 20px;
  transition: 0.25s ease;
  &:hover{
    transform: translate(-5px, -5px);
    box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
    h2{
      color:  #ff00a2;
    }
  }
  h2{
    font-size: 24px;
    color: white;
    text-align: center;
  }
}

</style>