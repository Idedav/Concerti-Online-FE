<script>
import { store } from '../data/store.js';

export default {
  name : 'Header',
  data(){
    return {
        store,
        }
    },
    methods: {

        Logout() {
            
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            localStorage.removeItem('user');
            this.$router.push('/login');

        }

    }
    
}

</script>

<template>

    <header class="d-flex justify-content-between align-items-center">   

        <div class="logo">
            <svg version="1.0" xmlns="http://www.w3.org/2000/svg" width="500.000000ptpx" height="500.000000ptpx" viewBox="0 0 500.000000 500.000000" preserveAspectRatio="xMidYMid meet">
<metadata>
Created by potrace 1.16, written by Peter Selinger 2001-2019
</metadata>
<g transform="translate(0.000000,500.000000) scale(0.100000,-0.100000)" fill="#ffffff">
<path d="M2454 3375 c-40 -7 -88 -18 -108 -25 -21 -6 -43 -13 -49 -15 -80 -17&#10;-252 -129 -345 -225 -81 -82 -182 -227 -182 -260 0 -9 -4 -20 -9 -25 -19 -21&#10;-63 -184 -69 -262 -7 -75 0 -248 10 -258 2 -3 45 5 94 16 49 11 98 23 109 25&#10;11 2 32 25 48 50 24 39 27 55 26 117 -2 66 0 72 26 94 15 13 40 27 56 30 l29&#10;6 0 158 c0 149 -1 158 -20 164 -26 8 -26 25 1 25 14 0 19 5 17 18 -2 9 -11 16&#10;-21 16 -9 -1 -17 2 -17 7 0 5 9 9 20 9 11 0 20 5 20 10 0 6 14 10 30 10 17 0&#10;30 -4 30 -10 0 -5 7 -10 15 -10 8 0 15 -4 15 -10 0 -5 -7 -10 -15 -10 -8 0&#10;-15 -7 -15 -15 0 -8 7 -15 15 -15 8 0 15 -7 15 -15 0 -8 -7 -15 -15 -15 -13 0&#10;-15 -24 -15 -158 l0 -158 35 -13 c19 -6 44 -24 56 -39 18 -23 20 -35 14 -86&#10;-6 -56 -5 -61 29 -110 35 -51 37 -52 108 -65 109 -20 188 -47 338 -114 243&#10;-108 294 -128 363 -143 80 -16 209 -17 286 -1 l54 12 25 65 c36 96 62 234 62&#10;330 0 97 -28 245 -59 315 -12 26 -21 53 -21 59 0 30 -109 183 -187 263 -204&#10;209 -517 310 -799 258z m521 -179 c95 -44 154 -138 155 -244 0 -78 -14 -113&#10;-74 -179 -59 -65 -119 -88 -212 -80 -75 6 -136 37 -188 99 -42 48 -56 91 -56&#10;168 0 77 14 120 57 170 76 88 211 116 318 66z m343 -465 l32 -60 -30 -3 -31&#10;-3 31 -48 c16 -26 30 -50 30 -52 0 -3 -31 -5 -69 -5 l-69 0 24 50 c29 60 29&#10;60 4 60 -11 0 -20 2 -20 5 0 10 54 115 60 115 3 0 20 -27 38 -59z"/>
<path d="M2100 2573 c-55 -20 -68 -87 -24 -122 35 -27 59 -26 89 4 43 42 27&#10;103 -30 118 -11 3 -27 3 -35 0z"/>
<path d="M1940 2286 c-53 -8 -116 -20 -140 -26 -25 -7 -50 -13 -57 -14 -7 -1&#10;-15 -5 -18 -8 -8 -8 3 -49 20 -71 12 -17 17 -17 67 -3 114 32 389 37 553 10&#10;81 -13 203 -58 345 -126 80 -38 195 -86 255 -105 98 -32 123 -36 222 -37 l112&#10;-1 40 40 c43 41 54 70 24 61 -54 -15 -165 -16 -244 -2 -103 19 -184 48 -326&#10;120 -278 139 -594 199 -853 162z"/>
<path d="M2000 2129 c-85 -6 -204 -29 -217 -43 -7 -7 5 -38 25 -63 17 -22 18&#10;-22 87 -6 102 22 315 19 430 -6 144 -32 190 -47 293 -95 53 -24 131 -60 172&#10;-79 97 -44 158 -63 251 -77 70 -11 78 -11 115 9 49 26 79 49 72 56 -3 3 -44&#10;10 -91 15 -113 13 -210 45 -387 126 -309 142 -490 181 -750 163z"/>
<path d="M1952 1965 c-46 -7 -85 -15 -88 -18 -3 -3 10 -23 30 -44 l35 -40 68&#10;9 c184 24 389 -25 702 -167 167 -75 201 -82 275 -55 31 12 55 27 54 32 -2 6&#10;-38 21 -79 33 -86 27 -205 75 -339 138 -128 60 -244 96 -370 113 -125 16 -178&#10;16 -288 -1z"/>
<path d="M1996 1801 c-4 -5 15 -25 41 -44 40 -28 60 -35 115 -40 93 -8 172&#10;-30 320 -88 120 -47 130 -50 209 -47 83 3 114 19 67 33 -13 4 -59 26 -103 47&#10;-133 66 -254 109 -364 129 -109 20 -276 26 -285 10z"/>
</g>
            </svg>
        </div>

        <nav>
            <ul class="d-flex align-items-center">
                <li class="ms-3 list-unstyled">
                    <router-link :to="{name: 'home'}" class="text-decoration-none text-light">
                        <i class="fa-solid fa-house me-3"></i>
                    </router-link>
                </li>
                <li class="ms-3 list-unstyled">
                    <router-link :to="{name: 'orders'}" class="text-decoration-none text-light">
                        <i class="fa-solid fa-ticket me-3"></i>
                    </router-link>
                </li>
                <li class="ms-3 list-unstyled">
                    <button class="btn-logout" @click="Logout()">Logout</button>
                </li>
            </ul>
        </nav>

    </header>

</template>

<style lang="scss" scoped>

header{
    width: 800px;
    i{
        font-size: 1.5rem;
        transition: 0.25s ease;
        &:hover{
            color: rgb(255, 0, 162);
        }
    }
}

.logo{
    width: 150px;
    height: 150px;
    svg{
        width: 100%;
        height: 100%;
    }
}

.btn-logout{
  background-color: rgb(255, 0, 162);
  border: none;
  color: white;
  padding: 7px 15px;
  border-radius: 5px;
  text-align: center;
  transition: 0.25s ease;
  cursor: pointer;
  &:hover{
    background-color: rgb(203, 3, 130);
  }
}

</style>