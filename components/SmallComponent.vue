<template>
  <div>
    <a-card :title="title" style="width: 300px">
      <span slot="extra" href="#"><a-icon :type="icon" /></span>
      <a-row type="flex" justify="space-between">
        <a-col :span="6">
          <h2>{{ count }}</h2>
        </a-col>
        <a-col :span="6"> <a-icon type="arrow-up" />{{ percent }}% </a-col>
      </a-row>
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
    count: {
      type: Number,
      default: 0,
    },
    percent: {
      type: Number,
      default: 0,
    },
    icon: {
      type: String,
      default: 'github',
    },
  },
  
}
</script>
<style>
.smallCard {
  color: white;
  background-color: blue;
}
</style>
