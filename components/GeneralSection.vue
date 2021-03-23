<template>
  <div>
    <h1 class="text-white">Social Media Dashboard</h1>
    <div class="d-flex flex-row">
      <div v-for="(socialData, index) in items" :key="index">
        <BigElement :social-data="socialData" class="m-3" />
      </div>
    </div>
  </div>
</template>

<script>
import BigElement from '~/components/BigElement'

export default {
  components: { BigElement },
  data() {
    return {
      items: [
        {
          icon: 'youtube',
          title: '@ntdo',
          subscriberCount: 1000,
          percent: 20,
        },
        {
          icon: 'youtube',
          title: '@ntdo',
          subscriberCount: 1000,
          percent: 20,
        },
        {
          icon: 'youtube',
          title: '@ntdo',
          subscriberCount: 1000,
          percent: 20,
        },
        {
          icon: 'youtube',
          title: '@ntdo',
          subscriberCount: 1000,
          percent: 20,
        },
      ],
    }
  },
}
</script>
