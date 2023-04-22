import { defineStore } from 'pinia'

export const userAuth = defineStore('auth', {
  state: () => ({
    userId: localStorage.getItem("userId"),
    accessToken: localStorage.getItem("accessToken"),
  }),
  actions: {
    setUserId(userId) {
      this.userId = userId
    },
    setAccessToken(accessToken) {
      this.accessToken = accessToken
    }
  },
});

export const onlineUsers = defineStore('users', {
  state: () => ({
    users: [],
    recipientId: null,
    chatHeads: []
  }),
  actions: {
    setOnlineUsers(users) {
      this.users = users
    },
    setRecipientId(recipientId) {
      this.recipientId = recipientId
    },
    setChatHeads(chat) {
      let found = false;
      // loop through the array of objects using forEach
      this.chatHeads.forEach(chatHead => {
        // check if the object has a certain property with a certain value
        if (chatHead?.senderId === chat?.senderId) {
          // replace the value of the property
          found = true;
          chatHead.newMessage = chat.message;
        }
      });

      if(!found) {
        this.chatHeads.push({
          senderId: chat.senderId,
          newMessage: chat.message
        });
      }
    }
  },
});