<script setup lang="ts">
  import { IonContent, IonPage, IonItem, IonList, IonLabel } from '@ionic/vue';
  import { reactive, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { userAuth, onlineUsers } from '../../stores';
  import io from 'socket.io-client';
  const router = useRouter()
  const authStore = userAuth();
  const userStore = onlineUsers();
  const socket = io('http://localhost:3000');

  onMounted(() => {
    socket.on('online', (users) => {
      userStore.setOnlineUsers(users);
    });
  });

  const chat = (recipientId: string) => {
    router.push({name: 'direct-message'});
    userStore.setRecipientId(recipientId);
  };
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-list lines="full">
        <template v-for="user in userStore.users" :key="user">
          <ion-item button v-if="user.userId !== authStore.userId" @click="chat(user.userId)">
            <ion-label>{{ user.userId }}</ion-label>
          </ion-item>
        </template>
      </ion-list>
    </ion-content>
  </ion-page>
</template>