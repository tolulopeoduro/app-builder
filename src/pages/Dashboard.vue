<script setup>
import FeedContainer from '../components/FeedContainer.vue'
</script>
<template>
  <div class="bg-gray-2 flex h-full w-full items-start justify-center pt-10">
    <div class="mt-10 flex w-[75%] flex-row items-center justify-between rounded-sm">
      <FeedContainer header="RECENT PROJECTS" />
      <FeedContainer header="UPDATES" class="bg-gray-2 w-[50%]">
        <template v-slot:button>
          <div
            class="float-right mr-2 flex h-8 w-28 flex-row items-center justify-center self-end rounded-md bg-light-gray"
          >
            VIEW ALL
          </div>
        </template>
      </FeedContainer>
    </div>
  </div>
</template>
