<template>
  <div class="login">
    <h1>Login</h1>
    <section class="switchData">
        <p class="switchInner">Not interested in login go to: </p>
        <router-link class="switchInner" to="/globalData">Global Data</router-link>
    </section>
    <button @click="WhereWantedToGo('/about')">Go to about</button>
    <form @submit.prevent="Login">
        <input ref="InputEmailRef" type="text" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <input type="submit" value="Login">
        <p>Need an account? <router-link to="/register">Register here</router-link></p>
    </form>
  </div>
</template>

<script>
import {onMounted, ref} from 'vue';
import fire from '@/firebase'
import { useRouter } from 'vue-router'
import {WhereWantedToGo} from '../middleware/wherewantedtogo'
import { useStore} from 'vuex'

export default {
    setup() {

        const InputEmailRef = ref('');
        
        const router = useRouter();

        const store = useStore()

        onMounted(()=> {
            InputEmailRef.value.select();
        })

        const email = ref('kapusta@gmiail.com');
        const password = ref('123456');

        const Login = () => {
            fire
                .auth()
                .signInWithEmailAndPassword(email.value, password.value)
                .then(router.replace(store.state.WantedToGo))
                .catch(err => alert(err.message));
        }

        return {
            Login,
            email,
            password,
            InputEmailRef,
            WhereWantedToGo
        }
    }
}
</script>

<style lang="scss" scoped>
.switchData {
    padding: 2vh;
    font-size: 3vh;
    .switchInner {
        display: inline;
    }
}
</style>