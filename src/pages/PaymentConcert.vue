<script>
import axios from 'axios';
import Loader from '../components/Loader.vue'

export default {
  name : 'PaymentConcert',
  components: {
    Loader
    },
  data(){
    return {
      concert: {},
      qtyOrdered: 1,
      typePayment: '',
      totalPrice: 0,
      isLoaded: false,
      isError: false
    }
  },
  methods : {

    async getConcert(){

      try {
        const res = await axios.get('concert/' + this.$route.params.idConcert)
        this.concert = res.data;
        this.calcPrice();
        this.isLoaded = true;
      } catch (error) {
        await this.$router.push('/login')
      }

    },
    handleAddPassenger(){
      if(this.qtyOrdered < this.concert.qtyAvailable){
          this.qtyOrdered++;
          this.calcPrice();
      }
    },
    handleRemovePassenger(){
      if (this.qtyOrdered > 1) {
          this.qtyOrdered--;
          this.calcPrice();
      }
    },
    calcPrice(){
      this.totalPrice = this.concert?.unitPrice * this.qtyOrdered;
    },
    async addTicket(){
      if(this.typePayment === ''){
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
        return;
      }
      const idUser = JSON.parse(localStorage.getItem('user')).id;
      try {
        const res = await axios.post('ticket/',{
          "idUser": idUser,
          "idConcert": this.concert.idConcert,
          "ticketsQty": this.qtyOrdered,
          "typePayment": this.typePayment,
        })
        await this.$router.push('/orders');
      } catch (error) {
        await this.$router.push('/login');
      }

    }

  },
  created(){
  },
  mounted(){
    this.getConcert();
  }
}

</script>

<template>

  <div class="container-fluid d-flex justify-content-center align-items-center my-5">

    <div v-if="!isLoaded">
      <Loader />
    </div>

    <div v-else>

      <div class="card-custom">
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
            <form @submit.prevent="addTicket()">
                  <div class="mt-4">
                <div class="mb-4">
                  <label for="quantity" class="d-flex align-items-center mb-3">
                    <img src="https://openui.fly.dev/openui/24x24.svg?text=🎟️" alt="Tickets icon" class="me-2"/>
                    Quantità di biglietti:
                  </label>
                  <div class="d-flex align-items-center">
                    <span class="btn-qty decrement" @click="handleRemovePassenger">-</span>
                    <input  type="number" v-model="qtyOrdered" readonly="true" class="input-custom" />
                    <span class="btn-qty increment" @click="handleAddPassenger">+</span>
                  </div>
                </div>
                <label class="d-flex align-items-center mb-3">
                  <img aria-hidden="true" alt="payment-icon" src="https://openui.fly.dev/openui/24.svg?text=💳" class="me-2"/>
                  Tipo di pagamento: <span class="text-danger ms-2" v-if="isError">inserire un metodo di pagamento</span></label>
                <div class="mb-4 d-flex">
                  <div class="me-3">
                    <input type="radio" id="credit-card" name="typePayment" value="CREDIT_CARD" v-model="typePayment" class="form-check-input me-2" />
                    <label for="credit-card" class="ml-2 text-accent">Carta di Credito</label>
                  </div>
                  <div class="me-3">
                    <input type="radio" id="debit-card" name="typePayment" value="DEBIT_CARD" v-model="typePayment" class="form-check-input me-2" />
                    <label for="debit-card" class="ml-2 text-accent">Carta di Debito</label>
                  </div>
                  <div class="me-3">
                    <input type="radio" id="paypal" name="typePayment" value="PAYPAL" v-model="typePayment" class="form-check-input me-2" />
                    <label for="paypal" class="ml-2 text-accent">Paypal</label>
                  </div>
                </div>
                <div class="mt-4">
                  <p class="d-flex align-items-centermb-4">
                    <img src="https://openui.fly.dev/openui/24x24.svg?text=💶" alt="Price icon" class="me-2"/>
                    Prezzo totale: <span class="ms-1">{{ totalPrice }} &euro;</span>
                  </p>
                </div>
                <button type="submit" class="btn-confirm">Acquista</button>
              </div>
            </form>
      </div>

    </div>
    


  </div>


</template> 

<style lang="scss" scoped>

h1{
  color: white;
}

.card-custom{
  width: 600px;
  background-color: black;
  color: white;
  padding: 30px;
  margin: 20px;
  border-radius: 20px;
  h2{
    font-size: 24px;
    color: white;
    text-align: center;
  }
  .input-custom{
    width: 75px;
    height: 30px;
    text-align: center;
    border-radius: 5px;
    margin: 0px 5px;
  }
  .btn-qty{
    background-color: white;
    border-radius: 5px;
    display: inline-block;
    color: black;;
    width: 30px;
    height: 30px;
    text-align: center;
    font-weight: bold;
    &:hover{
      cursor: pointer;
    }
  }
  .increment{
    background-color: #45a049;
    &:hover{
      background-color: #019108;
    }
  }
  .decrement{
    background-color: #f44336;
    &:hover{
      background-color: #ff1100;
    }
  }
  .btn-confirm{
    background-color: rgb(255, 0, 162);
    border: none;
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
}

.form-check-input:checked {
    background-color: rgb(255, 0, 162);
    border-color: rgb(255, 0, 162);
    box-shadow: none;
}

</style>