<template>
  <div class="register">
    <h1>Register</h1>
    <form @submit.prevent="Register">
        <input type="text" placeholder="Email" v-model="email"/>
        <input type="password" placeholder="Password" v-model="password"/>
        <input type="submit" value="Register">
        <p>Have an account? <router-link to="/login">Login here</router-link></p>
    </form>
  </div>
</template>

<script>
import fire from '@/firebase'
import { ref } from 'vue';

export default {
    setup() {
        const email = ref('');
        const password = ref('');


        const Register = () => {
            fire
                .auth()
                .createUserWithEmailAndPassword(email.value, password.value)
                .then(user => {
                    const AuthfRef = fire.database().ref('user_data/' + user.uid)
                    const UserProfile = {name: user.email}
                    AuthfRef.child('UserMeta/').set(UserProfile)
                    alert(user)
                })
                .catch(err => alert(err.message));
        }

        return {
            Register,
            email,
            password
        }
    }

}
</script>

<style>

</style>