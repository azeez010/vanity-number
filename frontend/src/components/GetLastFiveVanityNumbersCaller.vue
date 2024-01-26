<template>
  <div>
    <h1>Last Five Callers Vanity Numbers</h1>
    <div v-for="phone_number in phone_numbers" :key="phone_number.phoneNumber">
      <h4>Phone {{ phone_number.phoneNumber }} called at {{formatTimestamp(phone_number.timestamp)}}</h4>
      <p>The below vanity numbers were generated</p>
      <div v-for="vanityNumber in phone_number.VanityNumbers" :key="vanityNumber">
        <p>{{ vanityNumber }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'GetLastFiveVanityNumbersCaller',
  
  data() {
    return {
      phone_numbers: [],
      errorMsg: '',
    }
  },
  created() {
    // Call the endpoint on page load
    this.getItems();
  },
  methods: {
    formatTimestamp(timestamp) {
      const date = new Date(timestamp);
      return `${date.getFullYear()}-${padZero(date.getMonth() + 1)}-${padZero(date.getDate())} ${padZero(date.getHours())}:${padZero(date.getMinutes())}:${padZero(date.getSeconds())}`;
    },
    getItems() {
      axios
        .get(process.env.VUE_APP_API_ENDPOINT)
        .then((response) => {
          console.log(response)
          this.phone_numbers = response.data
        })
        .catch((error) => {
          console.log(error)
          this.errorMsg = 'Error retrieving data'
        })
    },
  },
}
  function padZero(num) {
    return num < 10 ? '0' + num : num;
  }
</script>

<style scoped>

</style>