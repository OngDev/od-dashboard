<template>
  <div class="container">
    <a-row type="flex">
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
      <small-component
        class="listCard"
        title="Youtube"
        count="10,000"
        percent="80"
        icon="youtube"
      />
    </a-row>
  </div>
</template>

<script lang="ts">
export default {}
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

.title {
  font-family: 'Quicksand', 'Source Sans Pro', -apple-system, BlinkMacSystemFont,
    'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  display: block;
  font-weight: 300;
  font-size: 100px;
  color: #35495e;
  letter-spacing: 1px;
}

.subtitle {
  font-weight: 300;
  font-size: 42px;
  color: #526488;
  word-spacing: 5px;
  padding-bottom: 15px;
}

.links {
  padding-top: 15px;
}
.listCard {
  padding-right: 20px;
}
</style>
