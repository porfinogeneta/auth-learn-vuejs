<template>
  <div class="home">
    <h1>kupa</h1>
    <h1>Welcome, {{ name }}</h1>
    {{id}}
    <section class="linkSelection">
      <router-link class="route" to="/about">About</router-link>
      <router-link class="route" to="/globalData">Global Data</router-link>
    </section>
    <br>
    <button class="logout" @click="Logout">Logout</button>
    <button class="showUser" @click="ShowUser">ShowUser</button>
    <br>
    <form class="inputSection">
      <button type="submit" class="btn" @click="addSomethingToGlobalDatabase(state.customProperty)">Add to Global database</button>
      <input class="inputBox" type="text " placeholder="add Something To Database" v-model="state.customProperty"/>
      <button type="submit" class="btn" @click="addSomethingToSecureDatabase(state.customProperty)">Add to Secure database</button>
    </form>
    <h1>DATABSE</h1>
    <section class="DataShow">
      <section class="DataInner">
        <h3>Global Data</h3>
        <section v-for="(item, index) in state.GlobalData" :key="index">
          {{item}}
        </section> 
      </section>
      <section class="DataInner">
        <h3>Personal Data</h3>
        <section v-for="(item, index) in state.PersonalData" :key="index">
            {{item}}
        </section>
      </section>
      
    </section>
  </div>
</template>

<script>
import fire from '@/firebase'
// import {useStore} from '../store/index'
import {useStore} from 'vuex'
import { ref, onBeforeMount, reactive, computed, onMounted } from 'vue';
// import { useRoute } from 'vue-router';


export default {
  name: 'Home',
  components: {},
  setup() {

    const name = ref('');
    const id = ref('')

    // const router = useRoute()

    const store = useStore();

    const state = reactive({
      GlobalData: [],
      PersonalData: [],
      customProperty: '',
      AuthfRef: '',
      AuthUser: ''
    })

    const FireGlobalRef = fire.database().ref('globalData/')
  

    onBeforeMount(() => {
      fire.auth().onAuthStateChanged(function(user) {
        if (user) {
            state.AuthfRef = fire.database().ref('user_data/' + user.uid)
            state.AuthUser = SetUser
            name.value = state.AuthUser.email.split('@')[0];
            UpdateUserPersonalData()
        }else {
         // router.push('/login')
        }
      });
    })

    onMounted(() => {

      // fire.auth().onAuthStateChanged(function(user) {
      //   if (user) {
      //       state.AuthfRef = fire.database().ref('user_data/' + user.uid)
      //       ()
      //   }else {
      //     router.push('/login')
      //   }
      // });

      console.log('lupa');   
      
    })

    const UpdateUserPersonalData = () => {
        fire.database().ref('/globalData/').once('value').then((snapshot) => {
          state.GlobalData = snapshot.val();
          });
        state.AuthfRef.child('PersonalUserData').once('value').then((snapshot) => {
          state.PersonalData = snapshot.val();
          });
    }

    const ShowUser = () => {
      fire.auth().currentUser.getIdToken(/* forceRefresh */ true)
      .then(function(idToken) {
        id.value = idToken
      }).catch(function(error) {
        alert(error)
      });
    }

    const SetUser = computed(() => {
      return store.state.authUser
    })

    function addSomethingToSecureDatabase(toAdd) {
      state.AuthfRef.child('PersonalUserData').push(toAdd)
    }

    function addSomethingToGlobalDatabase(toAdd) {
      FireGlobalRef.push(toAdd)        
    }

    const Logout = () => {
      fire
        .auth()
        .signOut()
        .then(() => {
          console.log('Signed out');
        })
        .catch(err => alert(err.message))
    }

    return {
      name,
      id,
      Logout,
      ShowUser,
      addSomethingToSecureDatabase,
      addSomethingToGlobalDatabase,
      state
    }
  }
}
</script>

<style lang="scss" scoped>
.DataShow {
  display: grid;
  grid-template-columns: 1fr 1fr;
  .DataInner {
    font-size: 30px;
  }
}
  .inputSection {
    font-size: 30px;
    .btn {
      width: 15vh;
      height: 8vh;
      background-color: bisque;
      border-radius: 10px;
    }
    .inputBox {
      font-size:2vh;
      width: 30vh;
      height: 8vh;
    }
  }
  .linkSelection {
    margin: 3vh;
    font-size: 2vh;
    .route {
      margin: 10px;
    }
  }
</style>
