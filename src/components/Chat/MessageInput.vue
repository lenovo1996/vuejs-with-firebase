<template>
    <base-div class="right-section-bottom">
        <div contenteditable="true" @keyup="changeText" placeholder="type something and press `ctrl + enter`"></div>
    </base-div>
</template>

<script>

    import firebase, {chatRef} from "@/firebase";
    import BaseDiv from '@/components/Base/Div';
    import BaseForm from '@/components/Base/Form';
    import moment from 'moment';
    import VueAtob from 'atob';

    export default {
        name: 'MessageInput',
        components: {BaseForm, BaseDiv},
        data: () => ({
            item: {
                message: '',
                timestamp: moment().unix(),
                userId: null,
                userEmail: null
            },
            newMessage: '',
            currentGroupId: ''
        }),
        created() {
            this.setCurrentGroupId();
            this.item.userId = this.getUserId();
            this.item.userEmail = this.getEmail();
        },
        watch: {
            '$route': 'setCurrentGroupId'
        },
        methods: {

            setCurrentGroupId() {
                if (!this.$route.params.name) {
                    return false;
                }
                this.currentGroupId = VueAtob(this.$route.params.name);
            },

            changeText(event) {
                if (event.keyCode == 13 && event.ctrlKey) {
                    this.item.message = this.$el.childNodes[0].innerText.trim().replace(/<\/?[^>]+(>|$)/g, "");
                    this.addNewMessage();
                }
            },

            addNewMessage() {
                if (!this.item.message) {
                    this.item.message = '';
                    this.$el.childNodes[0].innerText = '';
                    return false;
                }

                chatRef.child(this.currentGroupId).push(this.item, () => {
                    setTimeout(() => {
                        let el = document.getElementsByClassName('vb-content')[1];
                        el.scrollTop = el.scrollHeight;
                    });
                });

                this.item.message = '';
                this.$el.childNodes[0].innerText = '';
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


<style scoped>
    [contenteditable=true]:empty:before {
        content: attr(placeholder);
        display: block; /* For Firefox */
        color: #04040473;
    }

    .right-section-bottom {
        background: #fff;
        width: 100%;
        padding: 13px 0;
        position: absolute;
        bottom: 0px;
        border-top: 1px solid #E6E6E6;
        text-align: center;
    }

    .right-section-bottom div {
        border: 0px;
        padding: 9px 5px;
        width: calc(95%);
        display: inline-block;
        text-align: left;
        max-height: 200px;
        overflow: auto;
    }

    .right-section-bottom .btn-send {
        border: 0px;
        padding: 8px 10px;
        float: right;
        margin-right: 30px;
        color: #009EF7;
        font-size: 18px;
        background: #fff;
        cursor: pointer;
        line-height: inherit;
    }

    .upload-btn {
        position: relative;
        overflow: hidden;
        display: inline-block;
        float: left;
    }

    .upload-btn .btn {
        border: 0px;
        padding: 8px 10px;
        color: #009EF7;
        font-size: 18px;
        background: #fff;
        cursor: pointer;
    }

    .upload-btn input[type=file] {
        font-size: 100px;
        position: absolute;
        left: 0;
        top: 0;
        opacity: 0;
    }

</style>