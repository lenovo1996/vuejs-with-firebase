<template>
    <button :class="className" :id="id" :name="name" :type="type" @click="$emit('click')">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'BaseButton',
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
            type: {
                type: String
            },
        }
    }
</script>