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
        <BigElement class="m-2" :countSubcriber="youtubeInfo.subscriberCount"/>
        <!-- <BigElement class="m-2" :countSubcriber="youtubeInfo.subscriberCount"/>
        <BigElement class="m-2" :countSubcriber="youtubeInfo.subscriberCount"/>
        <BigElement class="m-2" :countSubcriber="youtubeInfo.subscriberCount"/> -->
      </div>
      <div class="d-flex justify-content-start mb-4">
        <h2>Overview - Today</h2>
      </div>
      <div class="d-flex justify-content-start mb-2">
        <h2>Youtube</h2>
      </div>
      <a-row class="mb-4 d-flex justify-content-between">
        <small-component
          class="listCard"
          title="Video"
          :countView="youtubeInfo.videoCount"
          :video="youtubeInfo.videoCount"
          :countSubcriber="youtubeInfo.subscriberCount"
          icon="youtube"
        />
        <small-component
          class="listCard"
          title="View"
          :countView="youtubeInfo.viewCount"
          :video="youtubeInfo.videoCount"
          :countSubcriber="youtubeInfo.subscriberCount"
          icon="youtube"
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
    var method = this;
    this.$axios
      .$get('https://od-dashboard-api.herokuapp.com/youtube/statistic')
      .then(function (response) {
        console.log(response);
        method.youtubeInfo.viewCount =new Intl.NumberFormat().format(response.viewCount);
        method.youtubeInfo.videoCount = response.videoCount;
        method.youtubeInfo.subscriberCount = response.subscriberCount;
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
