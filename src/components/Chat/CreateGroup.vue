<template>
    <base-div :className="`left-section-bottom`">
        <base-form @submit.prevent>
            <base-input :type="`text`" :placeholder="`create or search group...`" v-model="groupName"/>
            <base-button :className="`btn-send`" @click="createGroup"><i class="fa fa-plus"></i></base-button>
        </base-form>
    </base-div>
</template>

<script>
    import firebase, {groupRef} from '@/firebase';
    import BaseDiv from '@/components/Base/Div';
    import BaseForm from '@/components/Base/Form';
    import BaseInput from '@/components/Base/Input';
    import BaseButton from '@/components/Base/Button';
    import moment from 'moment';
    import VueBtoa from 'btoa';

    export default {
        name: 'CreateGroup',
        components: {BaseInput, BaseForm, BaseDiv, BaseButton},
        data: () => ({
            groupName: ''
        }),

        firebase: {
            groupList: groupRef
        },

        methods: {
            createGroup() {
                let groupName = this.groupName.trim();

                if (!groupName) {
                    alert('Group name is required');
                    return false;
                }

                let status = true;
                let key = null;

                for (let group of this.groupList) {
                    if (group.name == groupName) {
                        key = group['.key'];
                        status = false;
                    }
                }

                if (status) {
                    let newGroup = groupRef.push({
                        name: groupName,
                        timestamp: moment().unix(),
                        userId: this.getUserId(),
                        userEmail: this.getEmail()
                    }, () => {
                        key = newGroup.key;
                        this.groupName = '';
                        setTimeout(() => {
                            let el = document.getElementsByClassName('vb-content')[0];
                            el.scrollTop = el.scrollHeight;
                        });
                    });

                } else {
                    alert('Group exist! Please choose another name.');
                }

                this.$router.push(`/group/${VueBtoa(key)}`);

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
    .left-section-bottom {
        background: #fff;
        width: 90.4%;
        padding: 14px;
        position: absolute;
        bottom: 0px;
        border-top: 1px solid #E6E6E6;
        text-align: center;
    }

    .left-section-bottom input {
        border: 0px;
        padding: 12px 5px;
        width: calc(100% - 50px);
    }

    .left-section-bottom .btn-send {
        border: 0px;
        padding: 8px 10px;
        float: right;
        color: #009EF7;
        font-size: 20px;
        background: #fff;
        cursor: pointer;
    }
</style>