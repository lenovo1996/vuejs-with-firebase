<template>
    <div :class="className" :id="id" @scroll="$emit('scroll')">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'BaseDiv',
        props: {
            className: {
                type: String
            },
            id: {
                type: String
            }
        }
    }
</script>