<template>
    <input :type="type" :class="className" :name="name" :placeholder="placeholder" :value="value" :id="id" @input="$emit('input', $event.target.value)" />
</template>

<script>

    export default {
        name: 'BaseInput',
        props: {
            type: {
                type: String
            },
            className: {
                type: String
            },
            name: {
                type: String
            },
            placeholder: {
                type: String
            },
            value: {
                type: String
            },
            id: {
                type: String
            },
            eclick: {
                type: Function
            },
        },
    }

</script>