<template>
    <ion-page>
      <ion-content>
        <div class="d-flex justify-content-center align-items-center h-100">
            <ion-grid>
                <ion-row>
                    <ion-col>
                        <ion-title class="text-center">Please Login</ion-title>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-input
                            ref="input"
                            type="email"
                            fill="solid"
                            label="Email"
                            label-placement="floating"
                            helper-text="Enter a valid email"
                            error-text="Invalid email"
                            @ionInput="validate"
                            @ionBlur="markTouched"
                            v-model="email"
                        ></ion-input>
                    </ion-col>
                </ion-row>
                <ion-row>
                    <ion-col>
                        <ion-button @click="submit" :disabled="!validation.validEmail" expand="full" size="large">Submit</ion-button>
                    </ion-col>
                </ion-row>
            </ion-grid>
        </div>
      </ion-content>
    </ion-page>
  </template>

<script lang="ts">
    import { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonButton } from '@ionic/vue';
    import { defineComponent } from 'vue';
    import io from 'socket.io-client'
    const socket = io('http://localhost:3000');
    import { onlineUsers } from '../../stores';
    const usersStore = onlineUsers();

    export default defineComponent({
    components: { IonPage, IonContent, IonGrid, IonRow, IonCol, IonTitle, IonInput, IonButton } ,
    data() {
        return {
            email: '',
            validation: {
                validEmail: false
            }
        }
    },
    methods: {
        validateEmail(email: string) {
            return email.match(/^(?=.{1,254}$)(?=.{1,64}@)[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-zA-Z0-9!#$%&'*+/=?^_`{|}~-]+)*@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/);
        },
        validate(event: any) {
            const value = event.target.value;

            this.$refs.input.$el.classList.remove('ion-valid');
            this.$refs.input.$el.classList.remove('ion-invalid');

            if (value === '') return;

            if(this.validateEmail(value)) {
                this.$refs.input.$el.classList.add('ion-valid');
                this.validation.validEmail = true;
            } else {
                this.$refs.input.$el.classList.add('ion-invalid'); 
                this.validation.validEmail = false;
            }
        },
        markTouched() {
            this.$refs.input.$el.classList.add('ion-touched')
        },
        submit() {
            if(this.validation.validEmail) {
                localStorage.setItem("userId", this.email);
                socket.emit('join', this.email, (response: any) => {
                    this.$router.push({name: 'people'});
                    usersStore.setOnlineUsers(response);
                });
            }
        }
    },
    });
</script>