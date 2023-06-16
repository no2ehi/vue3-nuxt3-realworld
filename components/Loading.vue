<template>
  <slot />
<div class="lds-ring" >
  <div :style="styleLoading"></div>
  <div :style="styleLoading"></div>
  <div :style="styleLoading"></div>
  <div :style="styleLoading"></div>
</div>
</template>

<script setup>
const props = defineProps({
  color: {
    type: String,
    default: '#fff',
  }
})

const styleLoading = computed(() => {
  return `border: 3px solid ${props.color}; border-color: ${props.color} transparent transparent transparent;`
});
</script>

<style scoped>

.lds-ring {
  display: inline-block;
  position: relative;
  width: 16px;
  height: 24px;
}
.lds-ring div {
  box-sizing: border-box;
  display: block;
  position: absolute;
  /* border: 3px solid #fff; */
  width: 24px;
  height: 24px;
  margin: 0 8px; 
  border-radius: 50%;
  animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
  /* border-color: #fff transparent transparent transparent; */
}
.lds-ring div:nth-child(1) {
  animation-delay: -0.45s;
}
.lds-ring div:nth-child(2) {
  animation-delay: -0.3s;
}
.lds-ring div:nth-child(3) {
  animation-delay: -0.15s;
}
@keyframes lds-ring {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>