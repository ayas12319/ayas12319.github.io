var anzhiyu = {
  // 音乐节目切换背景
  changeMusicBg: function (isChangeBg = true) {
    const isMusicPage = window.location.pathname === "/music/";

    // 获取或创建元素 - 修复这里！
    let anMusicBg = document.getElementById("an_music_bg") || this._createMusicBgElement();
  
    if (isMusicPage) {
      // 音乐页面：显示背景并设置样式
      anMusicBg.style.display = "block";
      document.body.style.background = "rgb(13, 13, 13)";
      
      // 隐藏其他元素
      ['#web_bg', '#footer', '#nav-music'].forEach(selector => {
        const el = document.querySelector(selector);
        if (el) el.style.display = "none";
      });
    } else {
      // 非音乐页面：隐藏背景
      anMusicBg.style.display = "none";
    }

    if (isChangeBg) {
      // player listswitch 会进入此处
      const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
      if (musiccover) {
        anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
      }
    } else {
      // 第一次进入，绑定事件，改背景
      let timer = setInterval(() => {
        const musiccover = document.querySelector("#anMusic-page .aplayer-pic");
        // 确保player加载完成
        console.info("检查音乐封面:", musiccover);
        if (musiccover) {
          clearInterval(timer);
          anMusicBg.style.backgroundImage = musiccover.style.backgroundImage;
          // 绑定事件
          this.addEventListenerChangeMusicBg();

          // 暂停nav的音乐 - 添加安全检查
          const navMusic = document.querySelector("#nav-music meting-js");
          if (navMusic && navMusic.aplayer && !navMusic.aplayer.audio.paused) {
            this.musicToggle();
          }
        }
      }, 100);
    }
  },

  // 添加缺失的方法！
  _createMusicBgElement: function() {
    console.warn("自动创建 #an_music_bg 元素（原元素未在DOM中找到）");
    
    const element = document.createElement('div');
    element.id = 'an_music_bg';
    element.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: -999;
      filter: blur(63px);
      opacity: 0.6;
      background-attachment: local;
      background-position: center center;
      background-size: cover;
      background-repeat: no-repeat;
      transform: rotate(0deg);
      display: block;
      background-color: transparent;
    `;
    
    // 插入到 body 开始的位置
    document.body.insertBefore(element, document.body.firstChild);
    
    return element;
  },

  addEventListenerChangeMusicBg: function () {
    const anMusicPage = document.getElementById("anMusic-page");
    if (!anMusicPage) {
      console.error("anMusic-page 元素未找到");
      return;
    }

    const aplayerIconMenu = anMusicPage.querySelector(".aplayer-info .aplayer-time .aplayer-icon-menu");
    const metingJs = anMusicPage.querySelector("meting-js");

    if (metingJs && metingJs.aplayer) {
      metingJs.aplayer.on("loadeddata", function () {
        anzhiyu.changeMusicBg();
        console.info("player loadeddata");
      });
    }

    if (aplayerIconMenu) {
      aplayerIconMenu.addEventListener("click", function () {
        const menuMask = document.getElementById("menu-mask");
        if (menuMask) {
          menuMask.style.display = "block";
          menuMask.style.animation = "0.5s ease 0s 1 normal none running to_show";
        }
      });
    }

    const menuMask = document.getElementById("menu-mask");
    if (menuMask) {
      menuMask.addEventListener("click", function () {
        if (window.location.pathname != "/music/") return;
        const aplayerList = anMusicPage.querySelector(".aplayer-list");
        if (aplayerList) {
          aplayerList.classList.remove("aplayer-list-hide");
        }
      });
    }
  },

  // 添加缺失的 musicToggle 方法（如果没有的话）
  musicToggle: function() {
    const navMusic = document.querySelector("#nav-music meting-js");
    if (navMusic && navMusic.aplayer) {
      if (navMusic.aplayer.audio.paused) {
        navMusic.aplayer.play();
      } else {
        navMusic.aplayer.pause();
      }
    }
  }
};

// 确保在DOM加载完成后调用
document.addEventListener('DOMContentLoaded', function() {
  setTimeout(function() {
    anzhiyu.changeMusicBg(false);
  }, 100);
});