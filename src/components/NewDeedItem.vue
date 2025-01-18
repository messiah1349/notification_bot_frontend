<template>
    <li class="new-deed-item notificationRow">
        <input
            v-model="newDeedName"
            placeholder="New deed name"
            class="input"
        />
        <button @click="AddNewDeed">Add Deed</button>
    </li>
</template>

<script>
import { addDeed } from '@/services/api';

export default {
    data() {
        return {
            newDeedName: "", //new deed name
        };
    },
    methods: {
        async AddNewDeed() {
            const deed = {
                deed_name: this.newDeedName,
                telegram_id: this.$route.params.userId,
            };
            console.log('hi! i will call backend');
            console.log(deed);
            const response = await addDeed(deed);
            console.log(response.data.id);
            this.$emit('deedAdded');
            this.newDeedName = '';
        },
    },
};
</script>

<style>
.input {
    flex-grow: 1;
    padding: 5px;
    margin-right: 10px;
    border: 1px solid #ddd;
    border-radius: 3px;
}
</style>