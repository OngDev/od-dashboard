// eslint-disable-next-line no-undef
const { createApp } = Vue;

const App = {
  data() {
    return {
      youtube: {},
      facebook: {},
      github: {},
      facebookToken: '',
    };
  },
  async mounted() {
    await this.updateAccessToken();
    await this.fetchStats();
  },
  methods: {
    async updateAccessToken() {
      await fetch(`/fb_token?token=${this.facebookToken}`);
    },
    async fetchStats() {
      const response = await fetch('/stats');

      const result = await response.json();
      const { youtube, facebook, github } = result;
      this.youtube = youtube;
      this.facebook = facebook;
      this.github = github;
    },
  },
};

createApp(App).mount('#app');
