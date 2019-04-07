const contacts = [
  { pp: 'https://image.ibb.co/k9PNyp/boy-1.jpg', name: 'Aditya Singh', phone: '080191283', status: 'Thank God' },
  { pp: 'https://image.ibb.co/cGcWr9/rsz-girl-1.jpg', name: 'Caroline Hung', phone: '085234234', status: 'Young Hustler'},
  { pp: 'https://i.ibb.co/CHxxP6G/pp-placeholder.png', name: 'My Crush', phone: '08xxxxxx', status: 'Striving for excellence'},
  { pp: 'https://image.ibb.co/ktaZB9/boy-2.jpg', name: 'Terrell Owens', phone: '082131239', status: 'A guy with his wavey hair' },
  { pp: 'https://i.ibb.co/CHxxP6G/pp-placeholder.png', name: 'Tanaka', phone: '08xxxxxx', status: 'Hey, I am using WhatsApp'},
  { pp: 'https://i.ibb.co/CHxxP6G/pp-placeholder.png', name: 'Utaka', phone: '08xxxxxx', status: 'Hey, I am using WhatsApp'},
  { pp: 'https://i.ibb.co/CHxxP6G/pp-placeholder.png', name: 'Warren', phone: '08xxxxxx', status: 'Hey, I am using WhatsApp'},
]

let chatObject = {
  contact: {},
  conversations: []
}

let conversationsObject = {
  from: '',
  message: '',
  time: ''
}

let chats = [
  {
    contact: contacts[0],
    conversations: [
      { from: 'sender', message: 'Hello', time: '16:02' },
      { from: 'me', message: 'Hello, Singh! What\'s up?', time: '16:08' },
      { from: 'sender', message: 'hey i like your works!', time: '16:08' }
    ]
  },
  {
    contact: contacts[2],
    conversations: [
      { from: 'sender', message: 'Hi, Fikri', time: '16:08' },
      { from: 'me', message: 'Hi, Caroline!!', time: '16:08' }
    ]
  },
]

let currentConvo = {
  contact: {},
  conversations: []
}

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
    currentConvo: currentConvo,
    contactSearchText: '',
    isWAOpen: false,
    isChatListOpen: false,
    isSelectContactOpen: false,
    isConvoOpen: false,
    isSearchbarOpen: false,
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
      this.contactSearchText = ''
    },
    openConvo(contact) {
      this.isChatListOpen = false
      this.isSelectContactOpen = false
      this.isConvoOpen = true
      this.statusBarExpanded = false

      let chatID = chats.map(chat => chat.contact).indexOf(contact)
      if(chatID > -1) {
        this.currentConvo = chats[chatID]
        console.log('found')
      } else {
        let newChat = chatObject
        newChat.contact = contact
        newChat.conversations.push(conversationsObject)
        console.log(newChat)
        this.currentConvo = newChat
      }
    },
    toggleSearchbar() {
      this.isSearchbarOpen = !this.isSearchbarOpen
      setTimeout(() => {
        this.$refs['searchbar_contact'].focus()
      }, 200)
    },
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
