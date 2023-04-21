<script setup lang="ts">
  import { IonContent, IonPage, IonItem, IonList, IonLabel, IonTextarea } from '@ionic/vue';
  import { send } from 'ionicons/icons';

  const customFormatter= (inputLength: number, maxLength: number) => {
    return `${maxLength - inputLength} characters remaining`;
  }
</script>

<template>
  <ion-page>
      <ion-content :fullscreen="true">
        <ion-list>
          <ion-item lines="none">
            <ion-label>Test</ion-label>
          </ion-item>
          <ion-item lines="none">
            <ion-label>Test</ion-label>
          </ion-item>
        </ion-list>
    </ion-content>
  </ion-page>
</template>