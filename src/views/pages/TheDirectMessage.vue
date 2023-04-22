<script setup lang="ts">
    import { IonHeader, IonToolbar, IonButtons, IonBackButton, IonTitle, IonContent, IonPage, IonItem, IonList, IonLabel, IonTextarea } from '@ionic/vue';
    import { send } from 'ionicons/icons';
    import { userAuth, onlineUsers } from '../../stores';
    import { ref, reactive, onMounted } from 'vue';
    import io from 'socket.io-client';

    const authStore = userAuth();
    const userStore = onlineUsers();

    const customFormatter= (inputLength: number, maxLength: number) => {
        return `${maxLength - inputLength} characters remaining`;
    }

    const socket = io('http://localhost:3000');
    const isTyping = ref(false);
    const state = reactive({
        senderId: authStore.userId,
        recipientId: userStore.recipientId,
        message: '',
    });
    const messages = reactive([]);

    onMounted(() => {
        socket.emit('join', authStore.userId);

        socket.on('typing', (senderId) => {
            if (senderId === userStore.recipientId) {
                isTyping.value = true;
            }
            setTimeout(() => {
                isTyping.value = false;
            }, 1000);
        });

        socket.on('message', (data) => {
            userStore.setChatHeads(data);
            
            if(data.senderId == userStore.recipientId) {
                messages.push(data);
            }
        });
    })
    
    const onTyping = () => {
        socket.emit('typing', state);
    }

    const sendMessage = () => {
        if (state.senderId && state.recipientId && state.message) {
            messages.push({
                senderId: authStore.userId,
                recipientId: userStore.recipientId,
                message: state.message,
            });

            socket.emit('message', state);
            state.message = '';
        }
    }
</script>

<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
            <ion-buttons slot="start">
                <ion-back-button></ion-back-button>
            </ion-buttons>
            <ion-title>{{ userStore.recipientId }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <ion-grid>
                <ion-row v-for="(message, index) in messages" :key="index">
                    <ion-col>
                        <div :class="{
                            'ion-text-left': state.senderId == message?.senderId,
                            'ion-text-right': state.senderId != message?.senderId
                        }">
                            <ion-label><strong>{{ state.senderId == message?.senderId ? 'Me' : state.recipientId}}:</strong> {{ message?.message }}</ion-label>
                        </div>
                    </ion-col>
                </ion-row>
            </ion-grid>
            <div v-if="isTyping" class="d-flex float-end p-2">
                {{ state.recipientId }} is typing...
            </div>
            <div class="d-flex justify-content-center align-items-center fixed-bottom p-2">
                <ion-textarea
                    label="Message"
                    label-placement="floating"
                    :counter="true"
                    maxlength="100"
                    :counter-formatter="customFormatter"
                    v-model="state.message"
                    @keydown="onTyping"
                ></ion-textarea>
                <ion-icon :disabled="!state.message" @click="sendMessage" :icon="send" size="large" color="primary"></ion-icon>
            </div>
        </ion-content>
  </ion-page>
</template>