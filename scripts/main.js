const chats = [
  {
    pp: 'https://image.ibb.co/ktaZB9/boy-2.jpg',
    name: 'Terrell Owens',
    message: 'Hey i wanna talk about blockchain',
    time: '16:08'
  },
  {
    pp: 'https://image.ibb.co/k9PNyp/boy-1.jpg',
    name: 'Aditya Singh',
    message: 'Boii your work is lit!!',
    time: '16:08'
  },
  {
    pp: 'https://image.ibb.co/cGcWr9/rsz-girl-1.jpg',
    name: 'Caroline Hung',
    message: 'Have you done your work?',
    time: '16:08'
  }
]

const contacts = [
  { pp: 'https://image.ibb.co/k9PNyp/boy-1.jpg', name: 'Aditya Singh', phone: '080191283', status: 'Thank God' },
  { pp: 'https://image.ibb.co/cGcWr9/rsz-girl-1.jpg', name: 'Caroline Hung', phone: '085234234', status: 'Young Hustler'},
  { pp: 'https://image.ibb.co/ktaZB9/boy-2.jpg', name: 'Terrell Owens', phone: '082131239', status: 'I\'m a bad guy' },
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
    contacts: contacts,
    isWAOpen: false,
    isChatListOpen: false,
    isSelectContactOpen: false,
    isConvoOpen: false,
    isSearchbarOpen: false,
    contactSearchText: '',
    //#endregion WhatsApp Variables

    //#region Music App Variables
    musics: musics,
    nowPlaying: {},
    isMusicOpen: false,
    isMusicPlaying: false,
    isShuffled: false,
    isRepeated: true,
    isStopped: false,
    musicListOpen: false,
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
      this.openChatList()
    },
    openChatList() {
      this.isChatListOpen = true
      this.isSelectContactOpen = false
      this.isConvoOpen = false
      this.statusBarExpanded = false
    },
    openSearchContact() {
      this.isChatListOpen = false
      this.isSelectContactOpen = true
      this.isConvoOpen = false
      this.statusBarExpanded = false
    },
    openConvo(contact) {
      console.log(contact)
      this.isChatListOpen = false
      this.isSelectContactOpen = false
      this.isConvoOpen = true
      this.statusBarExpanded = false
    },
    toggleSearchbar() {
      this.isSearchbarOpen = !this.isSearchbarOpen
    },
    // filteredContacts() {
    //   return this.contacts
    // },
    //#endregion WhatsApp Variables

    //#region Music App Methods
    openMusic() {
      this.isMusicOpen = true
      this.statusBarExpanded = false
      this.activeApp = 'music'
      this.openMusicList()
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
      setTimeout(() => {
        this.isStopped = false
      }, 200)
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
    nextMusic() {
      let id = this.musics.indexOf(this.nowPlaying)
      if(id == this.musics.length - 1) this.nowPlaying = this.musics[0]
      else this.nowPlaying = this.musics[id+1]
      this.stopMusic()
      this.playMusic(this.nowPlaying)
    },
    prevMusic() {
      let id = this.musics.indexOf(this.nowPlaying)
      if(id == 0) this.nowPlaying = this.musics[this.musics.length - 1]
      else this.nowPlaying = this.musics[id-1]
      this.stopMusic()
      this.playMusic(this.nowPlaying)
    },
    stopMusic() {
      this.isStopped = true
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
  computed: {
    filteredContacts() {
      return this.contacts.filter(contact => contact.name.toLowerCase().includes(this.contactSearchText.toLowerCase()))
    }
  },
  mounted() {
    this.$nextTick(function() {
      console.log('Ready!')
    })
  }
})
