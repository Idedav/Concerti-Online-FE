<script>
import axios from 'axios';
import Loader from '../components/Loader.vue'

export default {
  name : 'OrderDetail',
  components: {
    Loader
    },
  data(){
    return {
      order: {},
      isLoaded: false,
    }
  },
  methods : {

    async getOrder(){
      const userId = JSON.parse(localStorage.getItem('user')).id;
      try {
        const response = await axios.get('ticket/' + this.$route.params.idOrder); 
        if(response.data.user.id != userId){
          await this.$router.push('/unauthorized');
          return;
        }
        this.order = response.data;
        this.isLoaded = true;
      } catch (error) {
        await this.$router.push('/login')
      }
    },
    formatTypePayment(typePayment){

      switch(typePayment) {
        case "PAYPAL":
          return "PayPal";
          break;
        case "CREDIT_CARD":
          return "Carta di credito";
          break;
        default:
          return "Carta di debito";
      }

    },

  },
  created(){
    if(!localStorage.getItem('user')){
      this.$router.push('/login');
      return;
    }else{
      this.getOrder();
    }
  },
  mounted(){
  }
}

</script>

<template>

<div v-if="!isLoaded" class="container d-flex justify-content-center h-100 align-items-center">
  <Loader />
</div>

<div v-else class="my-5">

  <h2 class="text-center mb-3">Dettaglio ordine N°{{ order.idTicket }}</h2>
  
  <div class="container-fluid d-flex justify-content-center flex-wrap">
  
    <div class="card-custom">
      <div>
        <div>
          <h2>🎵 {{ order.concert.band }} 🎵</h2>
        </div>
      </div>
      <div class="mt-4">
        <p class="d-flex align-items-center mb-2">
          <img src="https://openui.fly.dev/openui/24x24.svg?text=📍" alt="Location icon" class="me-2" />
          Città: <span class="ms-1">{{ order.concert.city }}</span>
        </p>
        <p class="d-flex align-items-center mb-2">
          <img src="https://openui.fly.dev/openui/24x24.svg?text=📅" alt="Date icon" class="me-2" />
          Data: <span class="ms-1">{{ order.concert.reply[2] }}/{{ order.concert.reply[1] }}/{{ order.concert.reply[0] }}</span>
        </p>
        <p class="d-flex align-items-center mb-2">
          <img src="https://openui.fly.dev/openui/24x24.svg?text=🎟️" alt="Tickets icon" class="me-2" />
          Biglietti Acquistati: <span class="ms-1">{{ order.ticketsQty }}</span>
        </p>
        <p class="d-flex align-items-center mb-2">
          <img aria-hidden="true" alt="payment-icon" src="https://openui.fly.dev/openui/24.svg?text=💳" class="me-2" />
          Metodo di pagamento: <span class="ms-1">{{ formatTypePayment(order.typePayment) }}</span>
        </p>
        <p class="d-flex align-items-center mb-4">
          <img src="https://openui.fly.dev/openui/24x24.svg?text=💶" alt="Price icon" class="me-2" />
          Prezzo totale: <span class="ms-1">{{ order.totalPrice }} &euro;</span>
        </p>
        <router-link :to="{name: 'payment-concert', params:{idConcert: order.concert.idConcert}}" class="btn-confirm" v-if="order.concert.qtyAvailable > 0">Compra ancora</router-link> 
        <span class="sold-out" v-else>Concerto sold out</span> 
      </div>
    </div>
  
  </div>

</div>


</template> 

<style lang="scss" scoped>


h2{
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
  h2{
    font-size: 24px;
    color: white;
    text-align: center;
  }
  .btn-confirm{
    background-color: rgb(255, 0, 162);
    border: none;
    display: flex;
    justify-content: center;
    align-items: center;
    color: white;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    text-align: center;
    transition: 0.25s ease;
    cursor: pointer;
    &:hover{
      background-color: rgb(203, 3, 130);
    }
  }
  .sold-out{
    background-color: red;
    display: flex;
    justify-content: center;
    align-items: center;
    border: none;
    color: white;
    border-radius: 5px;
    width: 100%;
    height: 50px;
    text-align: center;
  }
}


</style>