<script setup lang="ts">
  import { IonContent, IonPage, IonItem, IonList, IonLabel } from '@ionic/vue';
  import { reactive, onMounted } from 'vue';
  import io from 'socket.io-client'
  import { userAuth, onlineUsers } from '../../stores';
  const authStore = userAuth();
  const usersStore = onlineUsers();

  const socket = io('http://localhost:3000');

  onMounted(() => {
    socket.on('join', (users) => {
      usersStore.setOnlineUsers(users);
    });
  });
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-list lines="full">
        <template v-for="user in usersStore.users" :key="user">
          <ion-item v-if="user.userId !== authStore.userId">
            <ion-label>{{ user.userId }}</ion-label>
          </ion-item>
        </template>
      </ion-list>
    </ion-content>
  </ion-page>
</template>