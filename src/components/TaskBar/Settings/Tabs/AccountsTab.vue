<template>
    <div class="apps-settings-container">
        <div class="card mb-4">
            <div class="user-profile p-0">
                <div class="avatar"><User :size="28" /></div>
                <div class="user-info" v-if="!isEditing">
                    <span class="name" style="font-size: 18px;">{{ systemSettings.userName }}</span>
                    <span class="email">{{ systemSettings.userRole }} • Local Admin</span>
                </div>
                <div class="user-info-edit" v-else>
                    <input type="text" v-model="editName" class="edit-input" placeholder="Name" />
                    <input type="text" v-model="editRole" class="edit-input" placeholder="Role" />
                </div>
            </div>
            <div class="mt-4">
                <button class="custom-btn" @click="toggleEdit">{{ isEditing ? 'Save Profile' : 'Edit Profile' }}</button>
            </div>
        </div>

        <div class="list-group settings-list">
            <div class="list-item">
                <div class="item-left">
                    <KeyRound :size="20" class="item-icon"/>
                    <div class="item-text">
                        <span class="title">Sign-in options</span>
                        <span class="desc">Authentication status: Logged in (Guest / Admin)</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { User, KeyRound } from 'lucide-vue-next';
import { systemSettings } from "../../../../store/appState.ts";

const isEditing = ref(false);
const editName = ref(systemSettings.userName);
const editRole = ref(systemSettings.userRole);

const toggleEdit = () => {
    if (isEditing.value) {
        systemSettings.userName = editName.value.trim() || 'Maksym Balatskyi';
        systemSettings.userRole = editRole.value.trim() || 'Software Engineer';
        localStorage.setItem('os_user_name', systemSettings.userName);
        localStorage.setItem('os_user_role', systemSettings.userRole);
    } else {
        editName.value = systemSettings.userName;
        editRole.value = systemSettings.userRole;
    }
    isEditing.value = !isEditing.value;
};
</script>

<style scoped>
.user-info-edit {
    display: flex;
    flex-direction: column;
    gap: 6px;
    flex: 1;
}

.edit-input {
    background: #1a1a1a;
    border: 1px solid rgba(255,255,255,0.2);
    color: white;
    padding: 6px 10px;
    border-radius: 4px;
    outline: none;
}

.custom-btn {
    padding: 6px 16px;
    background: #ffffff;
    color: #000000;
    border: none;
    border-radius: 4px;
    font-weight: 600;
    cursor: pointer;
}
</style>