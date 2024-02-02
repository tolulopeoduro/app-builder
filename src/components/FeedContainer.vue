<script setup>
import ProjectItem from './ProjectItem.vue'
const projects = [
  { projectName: 'Project1' },
  { projectName: 'Project2' },
  { projectName: 'Project3' }
]

const props = defineProps({
  header: String
})
</script>
<template>
  <div class="flex h-[35vh] w-[40%] flex-col justify-between rounded-lg bg-gray-1 p-4">
    <div class="flex w-full flex-col">
      <p class="mb-4 text-white">{{ props.header }}</p>
      <ProjectItem v-for="project in projects" :key="project.projectName" :project="project" />
    </div>
    <slot name="button"></slot>
  </div>
</template>
