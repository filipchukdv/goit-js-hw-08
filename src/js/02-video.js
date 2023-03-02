import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const key = 'videoplayer-current-time';

player.setCurrentTime(localStorage.getItem(key) || 0);

player.on(
  'timeupdate',
  throttle(function (data) {
    console.log(data.seconds);
    localStorage.setItem(key, data.seconds);
  }),
  1000
);
