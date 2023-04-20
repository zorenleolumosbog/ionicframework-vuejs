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
  }),
  actions: {
    setOnlineUsers(users) {
      this.users = users
    }
  },
});