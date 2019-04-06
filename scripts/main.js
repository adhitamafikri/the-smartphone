const chats = [
  {
    pp: 'https://image.ibb.co/dpzuB9/girl-2.jpg',
    name: 'Natalie Odell',
    message: 'I am home alone right now',
    time: '16:08'
  },
  {
    pp: 'https://image.ibb.co/ktaZB9/boy-2.jpg',
    name: 'Terrell Owens',
    message: 'Hey i wanna talk about blockchain',
    time: '16:08'
  },
  {
    pp: 'https://image.ibb.co/k9PNyp/boy-1.jpg',
    name: 'Jacqui Martin',
    message: 'Boii your work is lit!!',
    time: '16:08'
  },
  {
    pp: 'https://i.ibb.co/BrFVqFy/Surf.jpg',
    name: 'Hamish Brandon',
    message: 'Hey i wanna talk about blockchain',
    time: '16:08'
  },
  {
    pp: 'https://image.ibb.co/cGcWr9/rsz-girl-1.jpg',
    name: 'Caroline Hung',
    message: 'Hey I want to go to cinemas with you',
    time: '16:08'
  },
  {
    pp: 'https://i.ibb.co/BTBZ730/masked.jpg',
    name: 'Haskell',
    message: 'Hey i wanna talk about blockchain',
    time: '16:08'
  },
  {
    pp: 'https://i.ibb.co/DRcjBsF/singer.jpg',
    name: 'Brigitte Marquis',
    message: 'I am home alone right now',
    time: '16:08'
  }
]

const musics = [
  {
    cover: 'https://i.ibb.co/tcWVbVP/Jorja-Smith.jpg',
    title: 'Lost and Found',
    artist: 'Jorja Smith',
    duration: '3:15'
  },
  {
    cover: 'https://i.ibb.co/xDS6Vvr/Maverick-Sabre.jpg',
    title: 'Slow Down',
    artist: 'Maverick Sabre ft. Jorja Smith',
    duration: '3:56'
  },
  {
    cover: 'https://i.ibb.co/9pjLJ6x/6lack.jpg',
    title: 'Nonchalant',
    artist: '6lack',
    duration: '3:08'
  },
  {
    cover: 'https://i.ibb.co/fYrCzmF/Masego.jpg',
    title: 'Late Night',
    artist: 'Masego',
    duration: '2:48'
  }
]

const vm = new Vue({
  el: '#frame',
  data: {
    authorized: true,
    statusBarExpanded: false,
    taps: 0,
    activeApp: '',

    //#region WhatsApp Variables
    chats: chats,
    isWAOpen: false,
    //#endregion WhatsApp Variables

    //#region Music App Variables
    musics: musics,
    nowPlaying: musics[0],
    isMusicOpen: true,
    isMusicPlaying: true,
    isShuffled: false,
    isRepeated: true,
    musicListOpen: true,
    musicNowPlayingOpen: false,
    //#endregion Music App Variables
  },
  methods: {
    doubleTap() {
      this.taps++
      console.log(this.taps)
      setTimeout(() => {
        if(this.taps == 2) {
          this.authorized = !this.authorized
        }
        this.taps = 0
      }, 400)
    },

    //#region WhatsApp Methods
    openWA() {
      this.isWAOpen = true
      this.statusBarExpanded = false
      this.activeApp = 'whatsapp'
    },
    //#endregion WhatsApp Variables

    //#region Music App Methods
    openMusic() {
      this.isMusicOpen = true
      this.statusBarExpanded = false
      this.activeApp = 'music'
    },
    openMusicList() {
      this.musicListOpen = true
      this.musicNowPlayingOpen = false
      this.statusBarExpanded = false
    },
    openNowPlaying() {
      this.musicListOpen = false
      this.musicNowPlayingOpen = true
      this.statusBarExpanded = false
    },
    playMusic(music) {
      console.log('playing', music)
      this.nowPlaying = music
      this.openNowPlaying()
    },
    togglePlayState() {
      this.isMusicPlaying = !this.isMusicPlaying
    },
    toggleShuffle() {
      this.isShuffled = !this.isShuffled
    },
    toggleRepeat() {
      this.isRepeated = !this.isRepeated
    },
    //#endregion Music App Methods

    toHome() {
      this.statusBarExpanded = false
      this.activeApp = ''
      this.isWAOpen = false
      this.isMusicOpen = false
      this.musicListOpen = true
      this.musicNowPlayingOpen = false
    }
  },
  mounted() {
    this.$nextTick(function() {
      console.log(this.$data)
    })
  }
})
