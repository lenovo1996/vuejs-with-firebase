<template>
    <base-div :className="`login-card`">
        <h1>Register</h1><br>
        <base-form @submit.prevent>
            <base-input :type="`text`" :placeholder="`Your email`" v-model="email"/>
            <base-input :type="`password`" :placeholder="`Password`" v-model="password"/>
            <base-input :type="`password`" :placeholder="`Retype Password`" v-model="repassword"/>
            <base-button :type="`submit`" :className="`login login-submit`" @click="register">register</base-button>
        </base-form>

        <base-div :className="`login-help`">
            <router-link to="/login">login</router-link>
            •
            <router-link to="#" @click="commingSoon">Forgot Password</router-link>
        </base-div>
    </base-div>
</template>

<script>

    import firebase from '@/firebase';
    import BaseDiv from '@/components/Base/Div';
    import BaseForm from '@/components/Base/Form';
    import BaseInput from '@/components/Base/Input';
    import BaseButton from '@/components/Base/Button';

    export default {
        name: 'register',
        components: {
            BaseInput, BaseForm, BaseDiv, BaseButton
        },
        data: () => ({
            email: '',
            password: '',
            repassword: '',
        }),
        methods: {
            commingSoon() {
                alert('cumming soon');
            },

            register() {
                if (this.password !== this.repassword) {
                    alert('Password not matches');
                    return false;
                }

                firebase.auth().createUserWithEmailAndPassword(this.email, this.password).then((user) => {
                    alert('Register successfully!');
                    this.$router.push('/home');
                }, (err) => {
                    alert('register failed!. ' + err.message);
                });
            }

        }
    }
</script>

<style scoped>
    @import url(https://fonts.googleapis.com/css?family=Roboto:400,100);

    body {
        -webkit-background-size: cover;
        -moz-background-size: cover;
        -o-background-size: cover;
        background-size: cover;
        font-family: 'Roboto', sans-serif;
    }

    .login-card {
        padding: 40px;
        width: 274px;
        background-color: #F7F7F7;
        margin: 0 auto 10px;
        border-radius: 2px;
        box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
        overflow: hidden;
    }

    .login-card h1 {
        font-weight: 100;
        text-align: center;
        font-size: 2.3em;
    }

    .login-card button[type=submit] {
        width: 100%;
        display: block;
        margin-bottom: 10px;
        position: relative;
    }

    .login-card input[type=text], input[type=password] {
        height: 44px;
        font-size: 16px;
        width: 100%;
        margin-bottom: 10px;
        -webkit-appearance: none;
        background: #fff;
        border: 1px solid #d9d9d9;
        border-top: 1px solid #c0c0c0;
        /* border-radius: 2px; */
        padding: 0 8px;
        box-sizing: border-box;
        -moz-box-sizing: border-box;
    }

    .login-card input[type=text]:hover, input[type=password]:hover {
        border: 1px solid #b9b9b9;
        border-top: 1px solid #a0a0a0;
        -moz-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        -webkit-box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
        box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .login {
        text-align: center;
        font-size: 14px;
        font-family: 'Arial', sans-serif;
        font-weight: 700;
        height: 36px;
        padding: 0 8px;
        /* border-radius: 3px; */
        /* -webkit-user-select: none;
          user-select: none; */
    }

    .login-submit {
        /* border: 1px solid #3079ed; */
        border: 0px;
        color: #fff;
        text-shadow: 0 1px rgba(0, 0, 0, 0.1);
        background-color: #4d90fe;
        /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#4787ed)); */
    }

    .login-submit:hover {
        /* border: 1px solid #2f5bb7; */
        border: 0px;
        text-shadow: 0 1px rgba(0, 0, 0, 0.3);
        background-color: #357ae8;
        /* background-image: -webkit-gradient(linear, 0 0, 0 100%,   from(#4d90fe), to(#357ae8)); */
    }

    .login-card a {
        text-decoration: none;
        color: #666;
        font-weight: 400;
        text-align: center;
        display: inline-block;
        opacity: 0.6;
        transition: opacity ease 0.5s;
    }

    .login-card a:hover {
        opacity: 1;
    }

    .login-help {
        width: 100%;
        text-align: center;
        font-size: 12px;
    }
</style>