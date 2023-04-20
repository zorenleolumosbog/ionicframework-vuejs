<template>
    <ion-page>
      <ion-tabs>
        <the-menu></the-menu>
        <ion-router-outlet class="mt-5"></ion-router-outlet>
        <ion-tab-bar slot="bottom">
          <ion-tab-button tab="people" href="/people">
            <ion-icon :icon="people" />
            <ion-label>People</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="chatboxEllipses" href="/chat">
            <ion-icon :icon="chatboxEllipses" />
            <ion-label>Chat</ion-label>
          </ion-tab-button>
  
          <ion-tab-button tab="call" href="/calls">
            <ion-icon :icon="call" />
            <ion-label>Calls</ion-label>
          </ion-tab-button>
        </ion-tab-bar>
      </ion-tabs>
    </ion-page>
  </template>
  
  <script setup lang="ts">
    import { IonPage, IonTabs, IonRouterOutlet, IonTabBar, IonTabButton, IonLabel, IonIcon } from '@ionic/vue';
    import { people, chatboxEllipses, call } from 'ionicons/icons';
    import TheMenu from '@/views/TheMenu.vue';
  </script>