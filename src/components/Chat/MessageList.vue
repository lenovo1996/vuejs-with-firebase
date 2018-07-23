<template>
    <base-div :className="`message mCustomScrollbar`" data-mcs-theme="minimal-dark" v-bar>
        <base-div @scroll="getOldMessage">
            <ul>
                <li :class="{ 'msg-left': !isAuth(item.userId), 'msg-right': isAuth(item.userId) }"
                    v-for="item in list">
                    <base-div :className="`msg-left-sub`">
                        <small>{{ item.userEmail }}</small>
                        <br/>
                        <base-div :className="`msg-desc`" v-html="reformat(item.message)"></base-div>
                        <small>{{ item.timestamp | dateFilter }}</small>
                    </base-div>
                </li>
            </ul>
        </base-div>
    </base-div>
</template>

<script>

    import firebase, {chatRef} from '@/firebase';
    import moment from 'moment';
    import VueAtob from 'atob';
    import emojis from 'emojis';
    import BaseDiv from '@/components/Base/Div';

    export default {
        name: 'MessageList',
        components: {
            BaseDiv
        },

        data: () => ({
            list: [],
            currentGroupId: '',
            limit: 25
        }),

        watch: {
            '$route': {
                handler() {
                    this.getListMsg(true);
                }
            }
        },

        filters: {
            dateFilter(value) {
                if (value) {
                    return moment.unix(value).format(' h:mm a')
                }
            },
        },

        created() {
            this.getListMsg(true);
        },

        methods: {
            reformat(value) {
                value = value.replace(/<\/?[^>]+(>|$)/g, "");
                value = value.replace(/(?:\r\n|\r|\n)/g, "<br>");
                value = emojis.html(value, 'https://vue-with-firebase-338ed.firebaseapp.com/static/assets/icon/');
                return value;
            },

            getListMsg(autoScroll) {
                if (!this.$route.params.name) {
                    return false;
                }

                let callback = () => {
                };

                if (autoScroll) {
                    callback = () => {
                        // scroll to bottom of message list
                        setTimeout(() => {
                            let el = document.getElementsByClassName('vb-content')[1];
                            el.scrollTop = el.scrollHeight;
                        });
                    };
                }

                this.currentGroupId = VueAtob(this.$route.params.name);
                this.$bindAsArray('list',
                    chatRef.child(`${this.currentGroupId}`).limitToLast(this.limit),
                    callback,
                    callback);
            },

            getOldMessage() {
                let el = document.getElementsByClassName('vb-content')[1];
                let offsetScroll = el.scrollTop;

                if (offsetScroll <= 0) {
                    this.limit += 25;
                    this.getListMsg(false);
                }
            },

            isAuth(userId) {
                return `${userId}` === `${this.getUserId()}`;
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
    .message {
        height: calc(100% - 68px);
        font-family: sans-serif;
    }

    .message ul {
        padding: 0px;
        list-style: none;
        margin: 0px auto;
        width: 90%;
        overflow: hidden;
    }

    .message ul li {
        position: relative;
        width: 50%;
        padding: 6px 0px;
        clear: both;
    }

    .message ul li.msg-left {
        float: left;
    }

    .message ul li.msg-left img {
        position: absolute;
        width: 40px;
        bottom: 30px;
    }

    .message ul li.msg-left .msg-desc {
        margin-left: 0px;
        font-size: 12px;
        background: #E8E8E8;
        padding: 10px 10px;
        border-radius: 5px;
        position: relative;
        word-break: break-all;
    }

    .message ul li.msg-left .msg-desc:before {
        position: absolute;
        content: '';
        border-bottom-color: #E8E8E8;
        bottom: 0px;
        left: -10px;
    }

    .message ul li.msg-left small {
        float: left;
        color: #c1c1c1;
    }

    .message ul li.msg-right {
        float: right;
    }

    .message ul li.msg-right img {
        position: absolute;
        width: 40px;
        right: 0px;
        bottom: 30px;
    }

    .message ul li.msg-right .msg-desc {
        margin-right: 0px;
        font-size: 12px;
        background: #cce5ff;
        color: #004085;
        padding: 10px 10px;
        border-radius: 5px;
        position: relative;
        word-break: break-all;
    }

    .message ul li.msg-right .msg-desc:before {
        position: absolute;
        content: '';
        border: 10px solid transparent;
        border-bottom-color: #cce5ff;
        bottom: 0px;
    }

    .message ul li.msg-right small {
        float: right;
        color: #c1c1c1;
        margin-right: 0px;
    }

    .message ul li.msg-day {
        border-top: 1px solid #EBEBEB;
        width: 100%;
        padding: 0px;
        margin: 15px 0px;
    }

    .message ul li.msg-day small {
        position: absolute;
        top: -10px;
        background: #F6F6F6;
        color: #c1c1c1;
        padding: 3px 10px;
        left: 50%;
        transform: translateX(-50%);
    }
</style>