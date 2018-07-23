<template>
    <base-div :className="`main-section`">
        <base-div :className="`head-section`">
            <base-div :className="`headLeft-section`">
                <base-div :className="`headLeft-sub`">
                    <base-div>CHAT APP</base-div>
                    <small>using firebase + vuejs</small>
                </base-div>
            </base-div>
            <base-div :className="`headRight-section`">
                <base-div :className="`headRight-sub`">
                    <h3>Email: {{ this.getEmail() }}</h3>
                    <small>User id: {{ this.getUserId() }}</small>
                </base-div>
                <base-div :className="`logout-btn`">
                    <base-button @click="logout">logout</base-button>
                </base-div>
            </base-div>
        </base-div>
        <base-div :className="`body-section`">
            <group-box/>
            <message-box/>
        </base-div>
    </base-div>
</template>

<script>

    import firebase, {groupRef, chatRef} from '@/firebase';
    import BaseDiv from '@/components/Base/Div';
    import BaseButton from '@/components/Base/Button';
    import GroupBox from '@/components/Chat/GroupBox';
    import MessageBox from '@/components/Chat/MessageBox';

    export default {
        name: 'Home',
        data: () => ({
            comment: '',
            newComment: '',
            searchGroup: ''
        }),

        components: {
            BaseDiv, BaseButton,
            GroupBox, MessageBox
        },

        firebase: {
            chatList: chatRef
        },

        methods: {

            logout() {
                firebase.auth().signOut().then(() => {
                    this.$router.push('/login');
                });
            },

            getUserId() {
                return firebase.auth().currentUser.uid;
            },

            getEmail() {
                return firebase.auth().currentUser.email;
            }
        }
    }

</script>

<style>
    body {
        font-family: 'Raleway', sans-serif;
        background-color: #ACCEDC;
        margin: 50px 0px;
    }

    .main-section small {
        font-size: 12px;
    }

    .main-section h3, .main-section h5 {
        margin: 0px;
    }

    .main-section {
        width: 960px;
        background-color: #fff;
        margin: auto;
    }

    .head-section {
        border-bottom: 1px solid #E6E6E6;
        clear: both;
        overflow: hidden;
        width: 100%;
    }

    .headLeft-section {
        width: calc(30% - 1px);
        float: left;
        border-right: 1px solid #E6E6E6;
    }

    .headLeft-sub {
        padding: 15px;
        text-align: center;
    }

    .headLeft-sub input {
        width: 60%;
        border-radius: 0px;
        border: 1px solid #E6E6E6;
        padding: 7px;
    }

    .headLeft-sub button {
        background: #009EF7;
        color: #fff;
        border: 1px solid #E6E6E6;
        padding: 7px 15px;
    }

    .headRight-section {
        width: 70%;
        float: left;
    }

    .headRight-sub {
        padding: 10px 15px 0px 15px;
        float: left;
        width: 80%;
        height: 51px
    }

    .logout-btn {
        float: right;
        vertical-align: middle;
        height: 61px;
        width: 15%;
    }

    .headRight-section button {
        background: #009EF7;
        color: #fff;
        border: 1px solid #E6E6E6;
        padding: 7px 15px;
        margin-top: 15px;
    }

    .body-section {
        clear: both;
        overflow: hidden;
        width: 100%;
    }

    .vb > .vb-dragger {
        z-index: 5;
        width: 12px;
        right: 0;
    }

    .vb > .vb-dragger > .vb-dragger-styler {
        -webkit-backface-visibility: hidden;
        backface-visibility: hidden;
        -webkit-transform: rotate3d(0, 0, 0, 0);
        transform: rotate3d(0, 0, 0, 0);
        -webkit-transition: background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
        transition: background-color 100ms ease-out,
        margin 100ms ease-out,
        height 100ms ease-out;
        background-color: rgba(2, 158, 247, 0);
        margin: 5px 5px 5px 0;
        border-radius: 20px;
        height: calc(100% - 10px);
        display: block;
    }

    .vb.vb-scrolling-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(2, 158, 247, 0.37);
    }

    .vb > .vb-dragger:hover > .vb-dragger-styler {
        background-color: rgba(2, 158, 247, 0.37);
    }

    .vb.vb-dragging > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(2, 158, 247, 0.37);
    }

    .vb.vb-dragging-phantom > .vb-dragger > .vb-dragger-styler {
        background-color: rgba(2, 158, 247, 0.37);
    }

    .noselect, .left-section li, .left-section a, small, img {
        -webkit-touch-callout: none; /* iOS Safari */
        -webkit-user-select: none; /* Safari */
        -khtml-user-select: none; /* Konqueror HTML */
        -moz-user-select: none; /* Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
        user-select: none;
        /* Non-prefixed version, currently
                                         supported by Chrome and Opera */
    }


</style>