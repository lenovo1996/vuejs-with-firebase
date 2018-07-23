<template>
    <form :class="className" :id="id" :name="name" @submit.prevent>
        <slot></slot>
    </form>
</template>

<script>
    export default {
        name: 'BaseForm',
        props: {
            className: {
                type: String
            },
            id: {
                type: String
            },
            name: {
                type: String
            },
        }
    }
</script>