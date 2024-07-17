<script>
import { store } from '../data/store.js';
import axios from 'axios';

export default {
  name : 'Login',
  components: {
    },
  data(){
    return {
      store,
      email: '',
      password: '',
      isError: false
    }
  },
  methods : {

    async login(){

      try {
        const res = await axios.post("auth/login",{
          email: this.email,
          password: this.password
        });
        localStorage.setItem('access_token', res.data.data.access_token);
        localStorage.setItem('refresh_token', res.data.data.refresh_token);
        this.getUser();
        
      } catch (error) {
        console.log(error);
        this.isError = true;
        setTimeout(() => {
          this.isError = false;
        }, 3000);
      }
    },
    async getUser(){  
      
      try {
        const res = await axios.get('user/')
        localStorage.setItem('user', JSON.stringify(res.data.data));
        this.$router.push('/');
      } catch (error) {
        await this.$router.push('/login')
      }

    }

  },
  mounted(){
  }
}

</script>

<template>

<div class="container d-flex justify-content-center">

<div class="form-login">

    <h1>Accesso</h1>

    <form @submit.prevent="login">
        <div class="mb-3">
            <label for="exampleInputEmail1" class="form-label">Email</label>
            <input type="email" class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" v-model="email">
        </div>
        <div>
            <label for="exampleInputPassword1" class="form-label">Password</label>
            <input type="password" class="form-control" id="exampleInputPassword1" v-model="password">
        </div>
        <div class="container-error mt-3">
          <p  v-if="isError">E-mail o Password errati</p>
        </div>
        <div>
          <button type="submit" class="btn-access mt-1">Accedi</button>
        </div>
    </form>  
</div>

</div>

</template> 

<style lang="scss" scoped>

.form-login{
  width: 300px;
  color: white;
}

.container-error{
  display: flex;
  align-items: center;
  height: 20px;
  color: red;
}

.btn-access{
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