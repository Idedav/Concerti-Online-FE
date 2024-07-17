<script>
import axios from 'axios';
import Loader from '../components/Loader.vue';

export default {
  name : 'Orders',
  components: {
    Loader
    },
  data(){
    return {
      orders: {},
      isLoaded: false,
      isEmpty: false
    }
  },
  methods : {

    async getOrders(){
      const userId = JSON.parse(localStorage.getItem('user')).id;
      try{
        const response = await axios.get('ticket/tickets/' + userId);
        this.orders = response.data;
        if(this.orders.length == 0){
          this.isEmpty = true;
        }
        this.isLoaded = true;
      } catch(error){
        await this.$router.push('/login')
      }
    }

  },
  created(){
    if(!localStorage.getItem('user')){
      this.$router.push('/login');
      return;
    }else{
      this.getOrders();
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

<div v-else>

  <div v-if="isEmpty"  class="container-empty d-flex flex-column justify-content-center h-100 align-items-center">
    <h3>Non hai ancora effettuato nessun ordine</h3>
    <p>Per visualizzare i tuoi ordini, effettua un acquisto o ricerca di un concerto</p>
    <a href="/" class="btn-home">Torna alla Home</a>
  </div>


  <div v-else class="container-table">
    <h2>I tuoi ordini</h2>
    <ul class="responsive-table">
      <li class="table-header">
        <div class="col">Concerto</div>
        <div class="col">Città</div>
        <div class="col">Data</div>
        <div class="col">Quantità biglietti</div>
        <div class="col">Prezzo Totale</div>
      </li>
      <router-link :to="{name: 'order-detail', params:{idOrder: order.idTicket}}" v-for="order in orders" class="table-row row-custom">
        <div class="col" >{{ order.concert.band }}</div>
        <div class="col" >{{ order.concert.city }}</div>
        <div class="col" >{{ order.concert.reply[2] }}/{{ order.concert.reply[1] }}/{{ order.concert.reply[0] }}</div>
        <div class="col" >{{ order.ticketsQty }}</div>
        <div class="col" >{{ order.totalPrice }} &euro;</div>
      </router-link>
    </ul>
  </div>


</div>

</template>

<style lang="scss" scoped>

.container-empty{
  color: white;
}

a{
  color: white;
  text-decoration: none;
}

.container-table {
  width: 1000px;
  max-width: 1000px;
  margin-left: auto;
  margin-right: auto;
  padding-left: 10px;
  padding-right: 10px;
  color: white;
}

h2 {
  font-size: 26px;
  margin: 20px 0;
  text-align: center;
  small {
    font-size: 0.5em;
  }
}

.responsive-table {
  li, .row-custom {
    border-radius: 3px;
    padding: 25px 30px;
    display: flex;
    justify-content: space-between;
    margin-bottom: 25px;
  }
  .table-header {
    background-color: #333333;
    font-size: 14px;
    text-transform: uppercase;
    letter-spacing: 0.03em;
  }
  .table-row {
    background-color: black;
    transition: transform 0.2s, box-shadow 0.2s;
    &:hover {
      color:  rgb(255, 0, 162);
      transform: translate(0px, -5px);
      box-shadow: rgba(240, 46, 170, 0.4) 5px 5px, rgba(240, 46, 170, 0.3) 10px 10px, rgba(240, 46, 170, 0.2) 15px 15px, rgba(240, 46, 170, 0.1) 20px 20px, rgba(240, 46, 170, 0.05) 25px 25px;
    }
  }
  .col-1 {
    flex-basis: 10%;
  }
  .col-2 {
    flex-basis: 40%;
  }
  .col-3 {
    flex-basis: 25%;
  }
  .col-4 {
    flex-basis: 25%;
  }
  
  @media all and (max-width: 767px) {
    .table-header {
      display: none;
    }
    .table-row{
      
    }
    li, .row-custom  {
      display: block;
    }
    .col {
      
      flex-basis: 100%;
      
    }
    .col {
      display: flex;
      padding: 10px 0;
      &:before {
        color: #6C7A89;
        padding-right: 10px;
        content: attr(data-label);
        flex-basis: 50%;
        text-align: right;
      }
    }
  }
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