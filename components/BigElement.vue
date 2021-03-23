<template>
  <div
    v-if="socialData"
    class="color-bg shadow rounded-3 p-2 border-top border-primary border-5"
    style="width: 250px"
  >
    <div class="m-3">
      <a-row justify="center" type="flex">
        <a-col :span="6" class="mr-5">
          <a-icon
            :style="{ fontSize: '25px', color: 'hsl(348, 97%, 39%)' }"
            :type="socialData.icon"
          />
        </a-col>
        <a-col :span="6" class="text-white-50">{{ socialData.title }}</a-col>
      </a-row>
    </div>
    <div>
      <h1 class="text-white fw-bolder" style="font-size: 60px">
        {{ socialData.subscriberCount }}
      </h1>
      <p class="text-white-50 lh-lg">FOLLOWERS</p>
      <p class="text-success">- {{ socialData.percent }} Today</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    socialData: {
      type: Object,
      default: () => {
        return {
          icon: 'youtube',
          title: '@ntdo',
          subscriberCount: 1000,
          percent: 20,
        }
      },
    },
  },
}
</script>
<style>
.color-bg {
  background-color: #252b43;
}
</style>
