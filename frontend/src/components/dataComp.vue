<template>
  <div class="title">
    <h3>Technical assessement, owned it! (kind of)</h3>
    <div class ='data'>
    <ul class ='list'>
      <li> <span v-html="Name"></span></li>
      <li><span v-html="number_of_employees"></span></li>
      <li><span v-html="is_serious"></span></li>
      <li><span v-html="tags"></span></li>
    </ul>
    <ul v-if="errors && errors.length">
      <li v-for="error of errors" v-bind:key="error.id">
        {{error.message}}
      </li>
    </ul>
    </div>
  </div>
  
</template>

<script>
import axios from 'axios';

export default {
  
  data:() =>{
    return {
      Name : [],
      number_of_employees: [],
      is_serious: [],
      tags: [],
      errors: []
    }
  },

  // Fetches posts when the component is created.
  async created() {
    try {
      const response = await axios.get(`http://127.0.0.1:5000/function`)
      let Data = JSON.parse(response.data.data)
      this.Name =  Data.name
      this.number_of_employees = Data.number_of_employees
      this.is_serious = Data.is_serious
      this.tags = Data.tags
    } catch (e) {
      this.errors.push(e)
    }
  }
}
</script>


<style scoped>
.list{
list-style-type:none
}
</style>
