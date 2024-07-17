import { reactive } from "vue";

export const store = reactive({

    apiUrl: "http://localhost:8080/api/",
    isLogged: false,
    user: {}

});