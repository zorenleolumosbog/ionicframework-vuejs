<template>
    <ion-menu content-id="menu-content">
      <ion-header>
        <ion-toolbar>
          <ion-title>Menu</ion-title>
        </ion-toolbar>
      </ion-header>
      <ion-content class="ion-padding">This is the menu content.</ion-content>
    </ion-menu>
    <ion-header id="menu-content">
      <ion-toolbar>
        <ion-buttons slot="start">
          <ion-menu-button></ion-menu-button>
        </ion-buttons>
        <ion-title>{{ routeName }}</ion-title>
      </ion-toolbar>
    </ion-header>
  </template>
  
  <script setup lang="ts">
    import {
      IonButtons,
      IonContent,
      IonHeader,
      IonMenu,
      IonMenuButton,
      IonPage,
      IonTitle,
      IonToolbar,
    } from '@ionic/vue';

    import { useRoute } from 'vue-router';
    import { ref, watch } from 'vue';

    const route = useRoute();
    const routeName = ref('');

    watch(
      () => route.name,
      newRoute => {
        switch (newRoute) {
            case 'people':
                routeName.value = 'People'
                break;
            case 'chat':
                routeName.value = 'Chat';
                break;
            case 'calls':
                routeName.value = 'Calls';
                break;
        
            default:
                routeName.value = '';
                break;
        }
      }
    )
  </script>