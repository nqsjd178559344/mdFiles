<template>
    <div class="home">
        <h2>Vue 子应用（Vite）</h2>
        <p>{{ baseMessage }}</p>
        <button @click="sendToBase">向基座发送消息</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const baseMessage = ref('')

onMounted(() => {
    if (window.microApp) {
        // 监听基座消息
        window.microApp.addDataListener((data: any) => {
            baseMessage.value = `收到基座消息：${data.data}`
        })

        // const data = window.microApp.getData() // 返回主应用下发的data数据

        // baseMessage.value = `收到基座消息：${data.data}`

        // 发送初始化消息
        window.microApp.dispatch({
            type: 'from-sub',
            data: 'Vue 子应用（Vite）加载完成'
        })
    }
})

// 向基座发送消息
const sendToBase = () => {
    window.microApp?.dispatch({
        type: 'from-sub',
        data: '子应用按钮被点击'
    })
}
</script>