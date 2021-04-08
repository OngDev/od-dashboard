// eslint-disable-next-line no-undef
const { createApp } = Vue;

const App = {
  data() {
    return {
      name: 'Gregg',
    };
  },
  methods: {
    async fetchStats() {
      const response = await fetch('/url', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
          url: this.url,
          slug: this.slug || undefined,
        }),
      });
    },
  },
};

createApp(App).mount('#app');
