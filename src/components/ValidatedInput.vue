<template>
  <div class="mb-3">
    <input :placeholder=label v-model="inputValue" :type="type" class="form-control">
    <div v-for="temp in errorMsg.split(';')" v-if="!valid" class="text-danger">
      {{temp}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ValidatedInput",
  props:['label', 'type', 'errorMsg', 'modelValue', 'valid'],
  computed:{
    inputValue:{
      get(){
        return this.modelValue
      },
      set(value){
        this.$emit('update:modelValue', value)
      }
    }
  }
}
</script>