<template>
  <div class="homechild">
      <p>首页的子组件</p>
      <hr/>
      <h3>{{count}}</h3>
      <p>{{$store.state.a.count}}</p>
      <div class="btn">
          <button @click="add">+</button>
          <button @click="reduce">-</button>
      </div>
  </div>
</template>

<script>
import store from '@/vuex/store.js'
import { mapState, mapMutations } from 'vuex'
export default {
    data() {
        return {
            msg: 'Hello World!'
        }
    },
    store,
    computed: {
        count() {
            return this.$store.state.count
        }
    },
    // computed: mapState({
    //     count: state => state.count
    // }),
    // computed: mapState(['count']),                                               
    // methods: {
    //     add() {
    //         // this.$store.state.count++
    //         this.$store.commit('add', 10)
    //     },
    //     reduce() {
    //         // this.$store.state.count--
    //         this.$store.commit('reduce')
    //     }
    // }
    methods: mapMutations ([
        'add', 'reduce'
    ])
    // methods: {
    //     ...mapMutations(['add', 'reduce'])
    // }
}
</script>

<style>

</style>
