<script>
// import child component
import HelloWorld from '../components/HelloWorld.vue'
export default {
  // register child component
  components: {
    HelloWorld
  },
  data() {
    return {
      msg: "You really did it!"
    }
  }
}
</script>

<template>
  <main>
    <div class="wrapper">
      
      <HelloWorld msg="Welcome to Our Webpage! Feel Free to Look Around" />
      <!-- <HelloWorld :msg="msg" /> -->
    </div>
  </main>
</template>


<style>
/* default styling */
@import "../assets/base.css";
</style>
