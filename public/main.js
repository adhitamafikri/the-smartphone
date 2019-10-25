const contacts = [
  { pp: 'https://image.ibb.co/k9PNyp/boy-1.jpg', name: 'Aditya Singh', phone: '080191283', status: 'Thank God' },
  { pp: 'https://image.ibb.co/cGcWr9/rsz-girl-1.jpg', name: 'Caroline Hung', phone: '085234234', status: 'Funky Panda'},
  { pp: 'https://i.ibb.co/CHxxP6G/pp-placeholder.png', name: 'Donald', phone: '08xxxxxx', status: 'Hey, I am using WhatsApp'},
  { pp: 'https://i.ibb.co/BrFVqFy/Surf.jpg', name: 'Harry', phone: '08xxxxxx', status: 'Hey, I am using WhatsApp'},
  { pp: 'https://image.ibb.co/ktaZB9/boy-2.jpg', name: 'Jarrell Owens', phone: '082131239', status: 'A guy with his wavey hair' },
  { pp: 'https://i.ibb.co/Hqk8L5G/sunset.jpg', name: 'Kevin F', phone: '08xxxxxx', status: 'Hey, I am using WhatsApp'},
  { pp: 'https://i.ibb.co/CHxxP6G/pp-placeholder.png', name: 'Her', phone: '08xxxxxx', status: 'What a time to be alive'},
  { pp: 'https://i.ibb.co/CHxxP6G/pp-placeholder.png', name: 'Wahyu', phone: '08xxxxxx', status: 'Hey, I am using WhatsApp'},
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

let currentConvo = chatObject

let chats = [
  {
    contact: contacts[4],
    conversations: [
      { from: 'other', message: 'Yo, Fikri', time: '16:08' }
    ]
  },
  {
    contact: contacts[0],
    conversations: [
      { from: 'other', message: 'Hello', time: '16:02' },
      { from: 'me', message: 'Hello, Singh! What\'s up?', time: '16:08' },
      { from: 'other', message: 'hey i like your works!', time: '16:08' }
    ]
  },
  {
    contact: contacts[3],
    conversations: [
      { from: 'other', message: 'Woe', time: '16:08' },
    ]
  },
]

let herReplies = [
  'Hi, Fik! What\'s up? 😄',
  'Honestly...',
  'I do really like you too, from the first time we met 😅.',
  'and i really want to get closer to you',
  'sure thing.. 😊',
  'aight, see you there 😄'
]

const musics = [
  {
    cover: 'https://i.ibb.co/fYrCzmF/Masego.jpg',
    title: 'Late Night',
    artist: 'Masego',
    duration: '2:48'
  },
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
  }
]

const vm = new Vue({
  el: '#frame',
  data: {
    authorized: false,
    statusBarExpanded: false,
    taps: 0,
    activeApp: '',
    currentTime: '',
    isPhoneRotated: false,
    phoneColor: 'white',

    //#region WhatsApp Variables
    chats: chats,
    contacts: contacts,
    currentConvo: currentConvo,
    contactSearchText: '',
    convoText: '',
    isWAOpen: false,
    isChatListOpen: false,
    isSelectContactOpen: false,
    isConvoOpen: false,
    isSearchbarOpen: false,
    herReplies: herReplies,
    herRepliesCount: 0,
    yourFlirtCount: 0,
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
    getCurrentTime() {
      let dt = new Date()
      let hour = dt.getHours()
      let mins = dt.getMinutes() < 10 ? `0${dt.getMinutes()}` : dt.getMinutes()
      return `${hour}:${mins}`
    },
    rotatePhone() {
      this.isPhoneRotated = !this.isPhoneRotated
    },
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
    changePhoneColor(color) {
      this.phoneColor = color
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
      this.activeApp = 'whatsapp'
    },
    openSearchContact() {
      this.isChatListOpen = false
      this.isSelectContactOpen = true
      this.isConvoOpen = false
      this.statusBarExpanded = false
      this.contactSearchText = ''
      this.activeApp = 'whatsapp'
    },
    openConvo(contact) {
      this.isChatListOpen = false
      this.isSelectContactOpen = false
      this.isConvoOpen = true
      this.statusBarExpanded = false
      this.activeApp = 'convo'
      let chatID = this.chats.map(chat => chat.contact).indexOf(contact)
      if(chatID > -1) {
        this.currentConvo = this.chats[chatID]
      }
      else {
        let newChat = {
          contact: {},
          conversations: []
        }
        newChat.contact = contact
        this.chats.unshift({...newChat})
        this.currentConvo = this.chats[0]
      }
      setTimeout(() => this.$refs['texting_field'].focus(), 200);
    },
    sendMessage() {
      let time = this.getCurrentTime()
      let messageObj = conversationsObject
      messageObj.from = 'me'
      messageObj.message = this.convoText
      messageObj.time = time
      this.currentConvo.conversations.push({...messageObj})
      this.$refs['texting_field'].focus()

      // bring the current chat to top
      let newChatList = this.chats.filter(v => v !== this.currentConvo )
      newChatList.unshift(this.currentConvo)
      this.chats = [...newChatList]
      this.autoScrollConvo()

      // play a rigged auto reply
      if(this.currentConvo.contact.name == 'Her') {
        this.herAutoReply()
        this.yourFlirtCount++
      } else if(this.currentConvo.contact.name == 'Harry') {
        if(this.convoText == 'bgsd la') this.autoReply('dih ngegad');
        else this.autoReply(`lah, coba sendiri lah. W mana pernah sepik-sepik awkawk :')`)
      } else this.autoReply('Not now, Fik. I am so busy right now.')
      this.convoText = ''
    },
    async waitReply(ms) {
      return new Promise(resolve => setTimeout(resolve, ms))
    },
    async autoReply(message, delay = 1000) {
      let time = this.getCurrentTime()
      let messageObj = conversationsObject
      messageObj.from = 'other'
      messageObj.message = message
      messageObj.time = time
      await this.waitReply(delay)
      this.currentConvo.conversations.push({...messageObj})
      this.autoScrollConvo()
    },
    async herAutoReply() {
      let flirtCount = this.yourFlirtCount
      if(flirtCount == 0) this.autoReply(this.herReplies[0])
      else if(flirtCount == 3) {
        await this.autoReply(this.herReplies[1])
        await this.autoReply(this.herReplies[2], 2000)
        await this.autoReply(this.herReplies[3], 3000)
      }
      else if(flirtCount == 5) await this.autoReply(this.herReplies[4], 1500)
      else if(flirtCount == 6) await this.autoReply(this.herReplies[5], 2000)
    },
    autoScrollConvo() {
      setTimeout(() => this.$refs['convo_content'].scrollTop = this.$refs['convo_content'].scrollHeight , 200)
    },
    toggleSearchbar() {
      this.isSearchbarOpen = !this.isSearchbarOpen
      setTimeout(() => this.$refs['searchbar_contact'].focus(), 200)
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
  beforeMount() {
    this.currentTime = this.getCurrentTime()
  },
  mounted() {
    this.$nextTick(function() {
      console.log('Ready!', this.currentTime)
      setInterval(() => {
        this.currentTime = this.getCurrentTime()
      }, 1000)
    })
  }
})
