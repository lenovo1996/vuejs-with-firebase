<template>
    <base-div :className="`left-section`">
        <base-div :className="`group-box`" data-mcs-theme="minimal-dark" v-bar="{preventParentScroll: true}">
            <ul>
                <!-- loop group list | firebase binding -->
                <li v-for="group in groupList" :class="{ active: currentGroup == group['.key']}">
                    <router-link :to="`/group/${VueBtoa(group['.key'])}`" style="color: black;">
                        <base-div :className="`chatList`">
                            <base-div :className="`img`">
                                <img :src="require('@/assets/image/man01.png')">
                            </base-div>
                            <base-div :className="`desc`">
                                <small class="time">{{ group.timestamp | dateFilter }}</small>
                                <h5>{{ group.name }}</h5>
                                <small>{{ getLatestMsgGroup(group['.key']) }}</small>
                            </base-div>
                        </base-div>
                    </router-link>
                </li>
            </ul>
        </base-div>
        <create-group/>
    </base-div>
</template>

<script>
    import {groupRef, chatRef} from '@/firebase';
    import BaseDiv from '@/components/Base/Div';
    import moment from 'moment';
    import VueBtoa from 'btoa';
    import VueAtob from 'atob';
    import CreateGroup from './CreateGroup';

    export default {
        name: 'GroupBox',
        data: () => ({
            loading: true,
            currentGroup: 'General',
            groupList: []
        }),
        components: {
            BaseDiv, CreateGroup
        },
        filters: {
            dateFilter(value) {
                if (value) {
                    return moment.unix(value).format(' h:mm a DD/MM/Y')
                }
            }
        },
        watch: {
            '$route': 'setCurrentGroup',
            groupList: {
                deep: true,
                handler() {
                    this.setCurrentGroup();
                }
            }
        },
        created() {
            this.setCurrentGroup();
            setTimeout(() => {
                if (document.getElementsByClassName('active').length) {
                    let el = document.getElementsByClassName('vb-content')[0];
                    el.scrollTop = el.offsetTop;
                }
            }, 1000);

            this.$bindAsArray(`groupList`, groupRef);

        },
        methods: {
            setCurrentGroup() {
                if (!this.groupList.length) {
                    return true;
                }

                let routeGroupName = this.$route.params.name;
                if (!routeGroupName) {
                    this.currentGroup = this.groupList[0]['.key'];
                    this.$router.push(`/group/${VueBtoa(this.currentGroup)}`);
                    return true;
                }

                for (let group of this.groupList) {
                    if (group['.key'] == VueAtob(routeGroupName)) {
                        this.currentGroup = group['.key'];
                        this[`last-msg-${VueBtoa(group['.key'])}`] = null;
                        break;
                    }
                }
            },

            getLatestMsgGroup(key) {
                if (!this[`last-msg-${VueBtoa(key)}`]) {
                    this.$bindAsArray(`last-msg-${VueBtoa(key)}`, chatRef.child(`${key}`).limitToLast(1));
                }

                if (this[`last-msg-${VueBtoa(key)}`].length) {
                    return this[`last-msg-${VueBtoa(key)}`][0].message;
                }

                return '';

            },

            VueBtoa(value) {
                return VueBtoa(value);
            }
        }
    }

</script>

<style scoped>
    .left-section {
        width: calc(30% - 1px);
        float: left;
        height: 500px;
        border-right: 1px solid #E6E6E6;
        background-color: #FFF;
        z-index: 1;
        position: relative;
    }

    .left-section ul {
        padding: 0px;
        margin: 0px;
        list-style: none;
    }

    .left-section ul li {
        cursor: pointer;
    }

    .left-section ul li.active {
        background: #009EF7;
        color: #fff;
        position: relative;
    }

    .mCustomScrollBox, .mCSB_container {
        overflow: unset !important;
    }

    .left-section ul li.active .desc .time {
        color: #fff;
    }

    .left-section ul li.active:before {
        position: absolute;
        content: '';
        right: -10px;
        border: 5px solid #009EF7;
        top: 0px;
        bottom: 0px;
        border-radius: 0px 3px 3px 0px;
    }

    .left-section ul li.active:after {
        position: absolute;
        content: "";
        bottom: 0px;
        right: 0px;
        left: auto;
        width: 100%;
        top: 0px;
        -webkit-box-shadow: -8px 4px 10px #a1a1a1;
        -moz-box-shadow: -8px 4px 10px #a1a1a1;
        box-shadow: -8px 4px 10px #a1a1a1;
    }

    .left-section .chatList {
        overflow: hidden;
        padding: 15px 0px;
    }

    .left-section .chatList .img {
        width: 60px;
        float: left;
        text-align: center;
        position: relative;
    }

    .left-section .chatList .img img {
        width: 30px;
        border-radius: 50%;
    }

    .left-section .chatList .img i {
        position: absolute;
        font-size: 10px;
        color: #52E2A7;
        border: 1px solid #fff;
        border-radius: 50%;
        left: 10px;
    }

    .left-section .chatList .desc {
        width: calc(100% - 60px);
        float: left;
        position: relative;
    }

    .left-section .chatList .desc h5 {
        margin-top: 6px;
        line-height: 5px;
    }

    .left-section .chatList .desc .time {
        position: absolute;
        right: 15px;
        color: #c1c1c1;
    }

    .group-box {
        height: 432px;
    }
</style>