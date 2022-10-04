const video = document.querySelector("video");
const fullscreen = document.querySelector(".fullscreen-btn");
const playPause = document.querySelector(".play-pause");
const volume = document.querySelector(".volume");
const currentTime = document.querySelector(".current-time");
const duration = document.querySelector(".duration");
const buffer = document.querySelector(".buffer");
const totalDuration = document.querySelector(".total-duration");
const currentDuration = document.querySelector(".current-duration");
const controls = document.querySelector(".controls");
const videoContainer = document.querySelector(".video-container");
const currentVol = document.querySelector(".current-vol");
const totalVol = document.querySelector(".max-vol");
const mainState = document.querySelector(".main-state");
const muteUnmute = document.querySelector(".mute-unmute");
const forward = document.querySelector(".forward");
const backward = document.querySelector(".backward");
const hoverTime = document.querySelector(".hover-time");
const hoverDuration = document.querySelector(".hover-duration");
const miniPlayer = document.querySelector(".mini-player");
const settingsBtn = document.querySelector(".setting-btn");
const settingMenu = document.querySelector(".setting-menu");
const theaterBtn = document.querySelector(".theater-btn");
const speedButtons = document.querySelectorAll(".setting-menu li");
const backwardSate = document.querySelector(".state-backward");
const forwardSate = document.querySelector(".state-forward");
const loader = document.querySelector(".custom-loader");

let isPlaying = false,
  mouseDownProgress = false,
  mouseDownVol = false,
  isCursorOnControls = false,
  muted = false,
  timeout,
  volumeVal = 1,
  mouseOverDuration = false,
  touchClientX = 0,
  touchPastDurationWidth = 0,
  touchStartTime = 0;

currentVol.style.width = volumeVal * 100 + "%";

// Video Event Listeners
video.addEventListener("loadedmetadata", canPlayInit);
video.addEventListener("play", play);
video.addEventListener("pause", pause);
video.addEventListener("progress", handleProgress);
video.addEventListener("waiting", handleWaiting);
video.addEventListener("playing", handlePlaying);

document.addEventListener("keydown", handleShorthand);
fullscreen.addEventListener("click", toggleFullscreen);

playPause.addEventListener("click", (e) => {
  if (!isPlaying) {
    play();
  } else {
    pause();
  }
});

duration.addEventListener("click", navigate);

duration.addEventListener("mousedown", (e) => {
  mouseDownProgress = true;
  navigate(e);
});

totalVol.addEventListener("mousedown", (e) => {
  mouseDownVol = true;
  handleVolume(e);
});

document.addEventListener("mouseup", (e) => {
  mouseDownProgress = false;
  mouseDownVol = false;
});

document.addEventListener("mousemove", handleMousemove);

duration.addEventListener("mouseenter", (e) => {
  mouseOverDuration = true;
});
duration.addEventListener("mouseleave", (e) => {
  mouseOverDuration = false;
  hoverTime.style.width = 0;
  hoverDuration.innerHTML = "";
});

videoContainer.addEventListener("click", toggleMainState);
videoContainer.addEventListener("fullscreenchange", () => {
  videoContainer.classList.toggle("fullscreen", document.fullscreenElement);
});
videoContainer.addEventListener("mouseleave", hideControls);
videoContainer.addEventListener("mousemove", (e) => {
  controls.classList.add("show-controls");
  hideControls();
});
videoContainer.addEventListener("touchstart", (e) => {
  controls.classList.add("show-controls");
  touchClientX = e.changedTouches[0].clientX;
  const currentTimeRect = currentTime.getBoundingClientRect();
  touchPastDurationWidth = currentTimeRect.width;
  touchStartTime = e.timeStamp;
});
videoContainer.addEventListener("touchend", () => {
  hideControls();
  touchClientX = 0;
  touchPastDurationWidth = 0;
  touchStartTime = 0;
});
videoContainer.addEventListener("touchmove", handleTouchNavigate);

controls.addEventListener("mouseenter", (e) => {
  controls.classList.add("show-controls");
  isCursorOnControls = true;
});

controls.addEventListener("mouseleave", (e) => {
  isCursorOnControls = false;
});

mainState.addEventListener("click", toggleMainState);

mainState.addEventListener("animationend", handleMainSateAnimationEnd);

muteUnmute.addEventListener("click", toggleMuteUnmute);

muteUnmute.addEventListener("mouseenter", (e) => {
  if (!muted) {
    totalVol.classList.add("show");
  } else {
    totalVol.classList.remove("show");
  }
});

muteUnmute.addEventListener("mouseleave", (e) => {
  if (e.relatedTarget != volume) {
    totalVol.classList.remove("show");
  }
});

forward.addEventListener("click", handleForward);

forwardSate.addEventListener("animationend", () => {
  forwardSate.classList.remove("show-state");
  forwardSate.classList.remove("animate-state");
});

backward.addEventListener("click", handleBackward);

backwardSate.addEventListener("animationend", () => {
  backwardSate.classList.remove("show-state");
  backwardSate.classList.remove("animate-state");
});

miniPlayer.addEventListener("click", toggleMiniPlayer);

theaterBtn.addEventListener("click", toggleTheater);

settingsBtn.addEventListener("click", handleSettingMenu);

speedButtons.forEach((btn) => {
  btn.addEventListener("click", handlePlaybackRate);
});

function canPlayInit() {
  totalDuration.innerHTML = showDuration(video.duration);
  video.volume = volumeVal;
  muted = video.muted;
  if (video.paused) {
    controls.classList.add("show-controls");
    mainState.classList.add("show-state");
    handleMainStateIcon(`<img src="../cdn-player-rodiki/icons/play.svg" id="icon-rodiki">`);
  }
}

function play() {
  video.play();
  isPlaying = true;
  playPause.innerHTML = `<img src="../cdn-player-rodiki/icons/pause.svg" id="icon-rodiki">`;
  mainState.classList.remove("show-state");
  handleMainStateIcon(`<img src="../cdn-player-rodiki/icons/pause.svg" id="icon-rodiki">`);
  watchProgress();
}

function watchProgress() {
   if (isPlaying) {
     requestAnimationFrame(watchProgress);
     handleProgressBar();
   }
}

video.ontimeupdate = handleProgressBar;

function handleProgressBar() {
  currentTime.style.width = (video.currentTime / video.duration) * 100 + "%";
  currentDuration.innerHTML = showDuration(video.currentTime);
}

function pause() {
  video.pause();
  isPlaying = false;
  playPause.innerHTML = `<img src="../cdn-player-rodiki/icons/play.svg" id="icon-rodiki">`;
  controls.classList.add("show-controls");
  mainState.classList.add("show-state");
  handleMainStateIcon(`<img src="../cdn-player-rodiki/icons/play.svg" id="icon-rodiki">`);
  if (video.ended) {
    currentTime.style.width = 100 + "%";
  }
}

function handleWaiting() {
  loader.style.display = "unset";
}

function handlePlaying() {
  loader.style.display = "none";
}

function navigate(e) {
  const totalDurationRect = duration.getBoundingClientRect();
  const width = Math.min(
    Math.max(0, e.clientX - totalDurationRect.x),
    totalDurationRect.width
  );
  currentTime.style.width = (width / totalDurationRect.width) * 100 + "%";
  video.currentTime = (width / totalDurationRect.width) * video.duration;
}

function handleTouchNavigate(e) {
  hideControls();
  if (e.timeStamp - touchStartTime > 500) {
    const durationRect = duration.getBoundingClientRect();
    const clientX = e.changedTouches[0].clientX;
    const value = Math.min(
      Math.max(0, touchPastDurationWidth + (clientX - touchClientX) * 0.2),
      durationRect.width
    );
    currentTime.style.width = value + "px";
    video.currentTime = (value / durationRect.width) * video.duration;
    currentDuration.innerHTML = showDuration(video.currentTime);
  }
}

function showDuration(time) {
  const hours = Math.floor(time / 60 ** 2);
  const min = Math.floor((time / 60) % 60);
  const sec = Math.floor(time % 60);
  if (hours > 0) {
    return `${formatter(hours)}:${formatter(min)}:${formatter(sec)}`;
  } else {
    return `${formatter(min)}:${formatter(sec)}`;
  }
}

function formatter(number) {
  return new Intl.NumberFormat({}, { minimumIntegerDigits: 2 }).format(number);
}

function toggleMuteUnmute() {
  if (!muted) {
    video.volume = 0;
    muted = true;
    muteUnmute.innerHTML = `<img src="../cdn-player-rodiki/icons/off-volumen.png" id="icon-rodiki" class="ico-vol">`;
    handleMainStateIcon(`<img src="../cdn-player-rodiki/icons/off-volumen.png" id="icon-rodiki" class="ico-vol">`);
    totalVol.classList.remove("show");
  } else {
    video.volume = volumeVal;
    muted = false;
    totalVol.classList.add("show");
    handleMainStateIcon(`<img src="../cdn-player-rodiki/icons/volume.png" id="icon-rodiki" class="ico-vol">`);
    muteUnmute.innerHTML = `<img src="../cdn-player-rodiki/icons/volume.png" id="icon-rodiki" class="ico-vol">`;
  }
}

function hideControls() {
  if (timeout) {
    clearTimeout(timeout);
  }
  timeout = setTimeout(() => {
    if (isPlaying && !isCursorOnControls) {
      controls.classList.remove("show-controls");
      settingMenu.classList.remove("show-setting-menu");
    }
  }, 500);
}

function toggleMainState(e) {
  e.stopPropagation();
  if (!e.path.includes(controls)) {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  }
}

function handleVolume(e) {
  const totalVolRect = totalVol.getBoundingClientRect();
  currentVol.style.width =
    Math.min(Math.max(0, e.clientX - totalVolRect.x), totalVolRect.width) +
    "px";
  volumeVal = Math.min(
    Math.max(0, (e.clientX - totalVolRect.x) / totalVolRect.width),
    1
  );
  video.volume = volumeVal;
}

function handleProgress() {
  if (!video.buffered || !video.buffered.length) {
    return;
  }
  const width = (video.buffered.end(0) / video.duration) * 100 + "%";
  buffer.style.width = width;
}

function toggleFullscreen() {
  if (!document.fullscreenElement) {
    videoContainer.requestFullscreen();
    handleMainStateIcon(`<ion-icon name="scan-outline"></ion-icon>`);
  } else {
    handleMainStateIcon(`<img src="../cdn-player-rodiki/icons/in-fullscreen.svg" id="icon-rodiki">`);
    document.exitFullscreen();
  }
}

function handleMousemove(e) {
  if (mouseDownProgress) {
    e.preventDefault();
    navigate(e);
  }
  if (mouseDownVol) {
    handleVolume(e);
  }
  if (mouseOverDuration) {
    const rect = duration.getBoundingClientRect();
    const width = Math.min(Math.max(0, e.clientX - rect.x), rect.width);
    const percent = (width / rect.width) * 100;
    hoverTime.style.width = width + "px";
    hoverDuration.innerHTML = showDuration((video.duration / 100) * percent);
  }
}

function handleForward() {
  forwardSate.classList.add("show-state");
  forwardSate.classList.add("animate-state");
  video.currentTime += 10;
  handleProgressBar();
}

function handleBackward() {
  backwardSate.classList.add("show-state");
  backwardSate.classList.add("animate-state");
  video.currentTime -= 10;
  handleProgressBar();
}

function handleMainStateIcon(icon) {
  mainState.classList.add("animate-state");
  mainState.innerHTML = icon;
}

function handleMainSateAnimationEnd() {
  mainState.classList.remove("animate-state");
  if (!isPlaying) {
    mainState.innerHTML = `<img src="../cdn-player-rodiki/icons/play.svg" id="icon-rodiki"/>`;
  }
  if (document.pictureInPictureElement) {
    mainState.innerHTML = ` <ion-icon name="tv-outline"></ion-icon>`;
  }
}

function toggleTheater() {
  videoContainer.classList.toggle("theater");
  if (videoContainer.classList.contains("theater")) {
    handleMainStateIcon(
      `<ion-icon name="tablet-landscape-outline"></ion-icon>`
    );
  } else {
    handleMainStateIcon(`<ion-icon name="tv-outline"></ion-icon>`);
  }
}

function toggleMiniPlayer() {
  if (document.pictureInPictureElement) {
    document.exitPictureInPicture();
    handleMainStateIcon(`<ion-icon name="magnet-outline"></ion-icon>`);
  } else {
    video.requestPictureInPicture();
    handleMainStateIcon(`<ion-icon name="albums-outline"></ion-icon>`);
  }
}

function handleSettingMenu() {
  settingMenu.classList.toggle("show-setting-menu");
}

function handlePlaybackRate(e) {
  video.playbackRate = parseFloat(e.target.dataset.value);
  speedButtons.forEach((btn) => {
    btn.classList.remove("speed-active");
  });
  e.target.classList.add("speed-active");
  settingMenu.classList.remove("show-setting-menu");
}

function handlePlaybackRateKey(type = "") {
  if (type === "increase" && video.playbackRate < 2) {
    video.playbackRate += 0.25;
  } else if (video.playbackRate > 0.25 && type !== "increase") {
    video.playbackRate -= 0.25;
  }
  handleMainStateIcon(
    `<span style="font-size: 1.4rem">${video.playbackRate}x</span>`
  );
  speedButtons.forEach((btn) => {
    btn.classList.remove("speed-active");
    if (btn.dataset.value == video.playbackRate) {
      btn.classList.add("speed-active");
    }
  });
}

function handleShorthand(e) {
  const tagName = document.activeElement.tagName.toLowerCase();
  if (tagName === "input") return;
  if (e.key.match(/[0-9]/gi)) {
    video.currentTime = (video.duration / 100) * (parseInt(e.key) * 10);
    currentTime.style.width = parseInt(e.key) * 10 + "%";
  }
  switch (e.key.toLowerCase()) {
    case "space":
      if (tagName === "button") return;
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      break;
    case "f":
      toggleFullscreen();
      break;
    case "arrowright":
      handleForward();
      break;
    case "arrowleft":
      handleBackward();
      break;
    case "t":
      toggleTheater();
      break;
    case "i":
      toggleMiniPlayer();
      break;
    case "m":
      toggleMuteUnmute();
      break;
    case "+":
      handlePlaybackRateKey("increase");
      break;
    case "-":
      handlePlaybackRateKey();
      break;

    default:
      break;
  }
}

document.querySelector("video").addEventListener("contextmenu", (event) => {
  event.preventDefault();
});

let videoList = document.querySelectorAll('.video-list-container #list');

videoList.forEach(vid =>{
   vid.onclick = () =>{
      videoList.forEach(remove =>{remove.classList.remove('active')});
      vid.classList.add('active');
      let src = vid.querySelector('.list-video').src;
      let title = vid.querySelector('.list-title').innerHTML;
      document.querySelector('.video-container .main-video').src = src;
      document.querySelector('.video-container .main-video').play();
      document.querySelector('.video-container .main-vid-title').innerHTML = title;
   };
});

jQuery(document).ready(function( $ ) {

  $("video").on("pause", function(event) {
    localStorage.setItem(btoa(this.src), this.currentTime);
  });

  $("video").on("play", function(event) {
      $storedtime = localStorage.getItem(btoa(this.src));
      if ($storedtime < this.duration) 
          this.currentTime = $storedtime;

      this.play();
  });   
    
  $(window).on("unload", function(e) {
     $("video").each(function(index, value) {
       if ( ! this.paused ) {
          localStorage.setItem(btoa(this.src), this.currentTime);
       }
    });
  });
  
});

//ADS MANAGER SDK

var videoElement;
// Defina una variable para rastrear si hay anuncios cargados e inicialmente configúrela como falsa
var adsLoaded = false;
var adContainer;
var adDisplayContainer;
var adsLoader;
var adsManager;

// Al cargar la ventana, adjunte un evento al clic del botón de reproducción
// que activa la reproducción en el elemento de video
window.addEventListener('load', function(event) {
  videoElement = document.getElementById('video');
  initializeIMA();
  videoElement.addEventListener('play', function(event) {
    loadAds(event);
  });
  var playButton = document.getElementById('play-button');
  playButton.addEventListener('click', function(event) {
    videoElement.play();
  });

});

window.addEventListener('resize', function(event) {
  console.log("window resized");
  if(adsManager) {
    var width = videoElement.clientWidth;
    var height = videoElement.clientHeight;
    adsManager.resize(width, height, google.ima.ViewMode.NORMAL);
  }
});

function initializeIMA() {
  console.log("initializing IMA");
  adContainer = document.getElementById('ad-container');
  adContainer.addEventListener('click', adContainerClick);
  adDisplayContainer = new google.ima.AdDisplayContainer(adContainer, videoElement);
  adsLoader = new google.ima.AdsLoader(adDisplayContainer);
  adsLoader.addEventListener(
    google.ima.AdsManagerLoadedEvent.Type.ADS_MANAGER_LOADED,
    onAdsManagerLoaded,
    false);
  adsLoader.addEventListener(
    google.ima.AdErrorEvent.Type.AD_ERROR,
    onAdError,
    false);

  // Avisa a AdsLoader cuando el video haya terminado  
  videoElement.addEventListener('ended', function() {
    adsLoader.contentComplete();
  });

  var adsRequest = new google.ima.AdsRequest();
  adsRequest.adTagUrl = 'https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_text_image&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=30000&adtest=on';


  //https://googleads.g.doubleclick.net/pagead/ads?ad_type=video_text_image&client=ca-video-pub-4968145218643279&videoad_start_delay=0&description_url=http%3A%2F%2Fwww.google.com&max_ad_duration=30000&adtest=on

  // Especifique los tamaños de las ranuras lineales y no lineales. Esto ayuda al SDK a
  // seleccionar la creatividad correcta si se devuelven varias.
  adsRequest.linearAdSlotWidth = videoElement.clientWidth;
  adsRequest.linearAdSlotHeight = videoElement.clientHeight;
  adsRequest.nonLinearAdSlotWidth = videoElement.clientWidth;
  adsRequest.nonLinearAdSlotHeight = videoElement.clientHeight / 3;

  // Pasar la solicitud a adsLoader para solicitar anuncios
  adsLoader.requestAds(adsRequest);
}

function onAdsManagerLoaded(adsManagerLoadedEvent) {
  // Cree una instancia de AdsManager desde la respuesta de adsLoader y pásele el elemento de video
  adsManager = adsManagerLoadedEvent.getAdsManager(
      videoElement);

  adsManager.addEventListener(
      google.ima.AdErrorEvent.Type.AD_ERROR,
      onAdError);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_PAUSE_REQUESTED,
      onContentPauseRequested);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.CONTENT_RESUME_REQUESTED,
      onContentResumeRequested);
  adsManager.addEventListener(
      google.ima.AdEvent.Type.LOADED,
      onAdLoaded);
}

function onContentPauseRequested() {
  videoElement.pause();
}

function onContentResumeRequested() {
  videoElement.play();
}

function onAdError(adErrorEvent) {
  // Manejar el registro de errores.
  console.log(adErrorEvent.getError());
  if(adsManager) {
    adsManager.destroy();
  }
}

function onAdLoaded(adEvent) {
  var ad = adEvent.getAd();
  if (!ad.isLinear()) {
    videoElement.play();
  }
}

function adContainerClick(event) {
  console.log("Hizo click en un anuncios");
  if(videoElement.paused) {
    videoElement.play();
  } else {
    videoElement.pause();
  }
}

function loadAds(event) {
  // Evite que esta función se ejecute si ya hay anuncios cargados
  if(adsLoaded) {
    return;
  }
  adsLoaded = true;

  event.preventDefault();
  // Evitar la activación de la reproducción inmediata cuando se cargan los anuncios
  console.log("Cargando Anuncios");

  // Inicializar el contenedor. Debe realizarse a través de una acción del usuario en dispositivos móviles.
  videoElement.load();
  adDisplayContainer.initialize();

  var width = videoElement.clientWidth;
  var height = videoElement.clientHeight;
  try {
    adsManager.init(width, height, google.ima.ViewMode.FULLSCREEN);
    adsManager.start();
  } catch (adError) {
    // Reproduce el video sin anuncios, si ocurre un error
    console.log("AdsManager no puede poner anuncios");
    videoElement.play();
  }
}
