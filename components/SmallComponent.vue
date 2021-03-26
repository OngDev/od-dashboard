<template>
  <div>
    <a-card :title="title" style="width: 300px">
      <span slot="extra" href="#"><a-icon :type="icon" /></span>
      <a-row class="d-flex justify-content-between">
        <a-col :span="6" class="mr-4">
          <h2>{{ countView }}</h2>
        </a-col>
          <a-col :span="6"> <a-icon type="arrow-up" />0% </a-col>
        <!-- <a-col :span="6"> <a-icon type="arrow-up" />{{ percent }}% </a-col> -->
        <!-- <a-col :span="6"> <h2>{{ video }}</h2> 
        <h4>videos</h4>
        </a-col> -->
        
      </a-row>
      <!-- <a-row class="d-flex justify-content-center">
        <a-col :span="12"> <h2>{{ countSubcriber }} </h2> 
        <h4>subcribers</h4>
        </a-col>
      </a-row> -->
    </a-card>
    <br />
  </div>
</template>
<script>
export default {
  props: {
    title: {
      type: String,
      default: 'Page views',
    },
    countView: {
      type: String,
      default: '0',
    },
    percent: {
      type: String,
      default: '0',
    },
    icon: {
      type: String,
      default: 'github',
    },
    video: {
      type: String,
      default: '0'
    },
    countSubcriber: {
      type: String,
      default: '0'
    }

  },
  
}
</script>
<style>
.smallCard {
  color: white;
  background-color: blue;
}
</style>
