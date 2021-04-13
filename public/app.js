// eslint-disable-next-line no-undef
const { createApp } = Vue;

const App = {
  template: `<div class="intro">Hế lô hế lô, <span class="ongdev-text">Ông Dev đêi!</span></div>
  <div class="tagline">Ghét code | Nghiện bia | Đừng như <span class="ongdev-text">Ông Dev</span></div>
  <br/>
  <div id="social-text">---Youtube---</div>
  <p>Người theo dõi: <span class="ongdev-text">{{youtube.subscriberCount}}</span> | Lượt view: <span class="ongdev-text">{{youtube.viewCount}}</span> | Số video: <span class="ongdev-text">{{youtube.videoCount}}</span></p>
  <div id="social-text">---Facebook---</div>
  <p>Người theo dõi: <span class="ongdev-text">{{facebook.followerCount}}</span></p>
  <div id="social-text">---Github---</div>
  <p>Người theo dõi: <span class="ongdev-text">{{github.followerCount}}</span> | Số Repo: <span class="ongdev-text">{{github.repoCount}}</span> | Số Gists: <span class="ongdev-text">{{github.gistCount}}</span></p>
  <br/>
  <div id="social-text">---Các trang thuộc Ông Dev---</div>
  <br/>
  <p>Trang request: <a class="ongdev-text" href="https://request.ongdev.com">https://request.ongdev.com</a></p>

  <p>Url shortener: <a class="ongdev-text" href="https://ongdev.link">https://ongdev.link</a></p>
  <br/>
  <div id="social-text">---Link social ở dưới nhá---</div>
  <br/>
<div id="icons-social">
<a target="_blank" href="https://github.com/milonguyen95"><i class="fab fa-github"></i></a>
<a target="_blank" href="https://www.linkedin.com/in/milonguyen95"><i class="fab fa-linkedin"></i></a>
      <a target="_blank" href="https://youtube.com/ongdev?sub_confirmation=1"><i class="fab fa-youtube"></i></a>
      <a target="_blank" href="https://www.facebook.com/ongdevvuitinh"><i class="fab fa-facebook"></i></a>
</div>`,
  data() {
    return {
      youtube: {},
      facebook: {},
      github: {},
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
