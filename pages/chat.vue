<script setup lang="ts">
import {FormSubmitEvent} from "#ui/types";

definePageMeta({
  titleLabel: "Chat",
  titleIcon: "i-mdi-chat",
});

const turnstile = ref();

const token = ref('')

const output = ref('')

const state = reactive({
  input: '',
})

const working = ref(false)

async function onSubmit(event: FormSubmitEvent<any>) {
  // Do something with data
  console.log(event.data)
  working.value = true;
  try {
    const {data, error} = await useFetch('/api/chat', {
      method: 'POST',
      immediate: true,
      body: JSON.stringify({
        input: state.input,
        token: token.value,
      }),
    })
    if (error.value) {
      output.value = error.value.message
    } else {
      output.value = data.value.response || 'no response'
    }
  } finally {
    working.value = false;
    turnstile.value?.reset()
  }
}
</script>

<template>
  <div class="flex flex-col w-full md:w-3/4 lg:w-1/2">
    <div class="w-full mb-4">
      <UAlert
          color="amber"
          title="Heads up!"
          description="chat is currently in development, this is for testing purposes only."
      />
    </div>
    <div class="w-full">
      <UForm :state="state" @submit.prevent="onSubmit">
        <UFormGroup label="Input" name="input">
          <UTextarea v-model="state.input" :disabled="working"/>
        </UFormGroup>

        <UFormGroup label="Output" class="my-4">
          <UTextarea v-model="output" :disabled="true"/>
        </UFormGroup>

        <div class="py-4 flex flex-col md:flex-row justify-between items-center">
          <div class="mb-4 md:mb-0">
            <NuxtTurnstile v-model="token" ref="turnstile"/>
          </div>
          <UButton type="submit" icon="i-mdi-tray-arrow-up" :loading="working" :disabled="!token || !state.input">
            Submit
          </UButton>
        </div>
      </UForm>
    </div>
  </div>
</template>