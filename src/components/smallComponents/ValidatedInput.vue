<template>
  <div class="mb-3">
    <input :placeholder=label v-model="inputValue" :type="type" class="form-control">
    <div v-for="temp in errorMsg.split(';')" v-if="!valid" class="text-danger error-message">
      {{temp}}
    </div>
    <br v-if="!optionalValidation && !valid">
    <div v-if="!optionalValidation" class="text-danger error-message">
      {{optionalErrorMsg}}
    </div>
  </div>
</template>

<script>
export default {
  name: "ValidatedInput",
  props:['label', 'type', 'errorMsg', 'modelValue', 'valid', 'optionalErrorMsg', 'optionalValidation'],
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