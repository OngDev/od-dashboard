<template>
  <div class="container mt-4">
    <div></div>
    <a-row>
      <div class="d-flex justify-content-start">
        <h2>DashBoard</h2>
      </div>
      <div class="d-flex justify-content-start">
        <h6>Total Followers: 23.000</h6>
      </div>
      <div class="mb-4 d-flex justify-content-between">
        <BigElement class="m-2" />
        <BigElement class="m-2" />
        <BigElement class="m-2" />
        <BigElement class="m-2" />
      </div>
      <div class="d-flex justify-content-start">
        <h2>Overview - Today</h2>
      </div>
      <a-row class="mb-4 d-flex justify-content-between">
        <small-component
          class="listCard"
          title="Github"
          count="30,000"
          percent="120"
          icon="github"
        />
        <small-component
          class="listCard"
          title="Youtube"
          count="40,000"
          percent="80"
          icon="youtube"
        />
        <small-component
          class="listCard"
          title="Linked"
          count="130,000"
          percent="50"
          icon="facebook"
        />
      </a-row>
    </a-row>
  </div>
</template>

<script lang="ts">
export default {
  data() {
    return {
      youtubeInfo: {
          viewCount: '',
          videoCount: '',
          hiddenSubscriberCount: false,
          subscriberCount: '',
      },
    }
  },
  created() {
    this.$axios
      .$get('https://od-dashboard-api.herokuapp.com/youtube/statistic')
      .then(function (response) {
        console.log(response);
      }).catch(function(err){
        console.log(err);
      })
  },
}
</script>

<style>
.container {
  margin: 0 auto;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
</style>
