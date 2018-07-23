<template>
    <base-div :className="`right-section`">
        <message-list/>
        <message-input/>
    </base-div>
</template>

<script>
    import MessageList from './MessageList';
    import MessageInput from './MessageInput';
    import BaseDiv from '@/components/Base/Div';

    export default {
        name: 'MessageBox',
        components: {
            BaseDiv, MessageList, MessageInput
        }
    }

</script>

<style scoped>
    .right-section {
        width: 70%;
        float: left;
        height: 500px;
        background-color: #F6F6F6;
        position: relative;
    }
</style>