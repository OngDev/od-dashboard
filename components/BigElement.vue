<template>
  <div
    v-if="data"
    class="bg-secondary shadow rounded-3 p-2 border-top border-primary border-5"
    style="width: 250px"
  >
    <div class="m-3">
      <a-row justify="center" type="flex">
        <a-col :span="6" class="mr-5">
          <a-icon
            :style="{ fontSize: '25px', color: '#e71b2b' }"
            :type="data.icon"
          />
        </a-col>
        <a-col :span="6" class="text-white-50">{{ data.title }}</a-col>
      </a-row>
    </div>
    <div>
      <h1 class="text-white fw-bolder" style="font-size: 60px">
        {{ data.subscriberCount }}
      </h1>
      <p class="text-white-75 lh-base fw-light">FOLLOWERS</p>
      <p class="text-warning">- {{ data.percent }} Today</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
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
