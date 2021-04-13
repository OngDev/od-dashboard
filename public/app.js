// eslint-disable-next-line no-undef
const { createApp } = Vue;

const App = {
  template: `
  <br/>
  <div id="social-text" v-if="youtube">---Youtube---</div>
  <p v-if="youtube">Người theo dõi: <span class="ongdev-text">{{youtube.subscriberCount}}</span> | Lượt view: <span class="ongdev-text">{{youtube.viewCount}}</span> | Số video: <span class="ongdev-text">{{youtube.videoCount}}</span></p>
  <div id="social-text" v-if="facebook">---Facebook---</div>
  <p v-if="facebook">Người theo dõi: <span class="ongdev-text">{{facebook.followerCount}}</span></p>
  <div id="social-text" v-if="github">---Github---</div>
  <p v-if="github">Người theo dõi: <span class="ongdev-text">{{github.followerCount}}</span> | Số Repo: <span class="ongdev-text">{{github.repoCount}}</span> | Số Gists: <span class="ongdev-text">{{github.gistCount}}</span></p>
  <br v-if="youtube && facebook && github"/>
  `,
  data() {
    return {
      youtube: null,
      facebook: null,
      github: null,
      facebookToken: '',
    };
  },
  async mounted() {
    await this.fetchStats();
  },
  methods: {
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
