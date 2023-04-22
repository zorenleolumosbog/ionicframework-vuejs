<script setup lang="ts">
  import { IonContent, IonPage, IonItem, IonList, IonLabel, IonTextarea } from '@ionic/vue';
  import { reactive, onMounted, computed } from 'vue';
  import { useRouter } from 'vue-router';
  import { userAuth, onlineUsers } from '../../stores';
  import io from 'socket.io-client';
  const router = useRouter()
  const authStore = userAuth();
  const userStore = onlineUsers();
  const socket = io('http://localhost:3000');

  onMounted(() => {
  });

  const chat = (recipientId: string) => {
    router.push({name: 'direct-message'});
    userStore.setRecipientId(recipientId);
    userStore.setSeenChatHead(recipientId);
  };
</script>

<template>
  <ion-page>
    <ion-content :fullscreen="true">
      <ion-list>
          <ion-item button lines="full" v-for="chatHead in userStore.chatHeads" :key="chatHead" @click="chat(chatHead.senderId)">
            <ion-label>
              <h3>{{ chatHead?.senderId }}</h3>
              <p><strong>{{ chatHead?.newMessage }}</strong></p>
            </ion-label>
          </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>