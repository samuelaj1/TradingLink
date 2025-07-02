<template>
  <div class="ms-3 my-3">
    <div class="d-flex gap-2 mb-1 align-items-center">
      <select v-model="option.type" class="form-select w-auto">
        <option value="StandardChoiceOption">Radio</option>
        <option value="StandardCheckOption">Checkbox</option>
        <option value="StandardTextAreaOption">TextArea</option>
      </select>
      <input v-model="option.formLabel" class="form-control" :placeholder="option.type ==='StandardTextAreaOption' ? 'Placeholder text description' : 'Option label'" />
      <button class="btn btn-sm btn-danger" @click="$emit('remove')">×</button>
    </div>

    <button v-if="!option.next" class="btn btn-primary my-2" @click="addNestedQuestion">Next question</button>

    <div v-if="option.next" class="border-start ps-3 ms-3 my-3">
      <div class="d-flex justify-content-between align-items-center mb-2">
        <label class="form-label mb-0">Follow-up Question</label>
        <button class="btn btn-sm btn-outline-danger" @click="removeNestedQuestion">Remove Follow-up</button>
      </div>

      <input class="form-control mb-1" v-model="option.next.formLabel" placeholder="Follow-up question label" />

      <div v-for="(opt, idx) in option.next.options" :key="idx">
        <NestedOption :option="opt" @remove="option.next.options.splice(idx, 1)" />
      </div>

      <button class="btn btn-sm btn-secondary my-2" @click="addOption(option.next)">Add Option</button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NestedOption',
  props: {
    option: Object
  },
  methods: {
    addOption(question) {
      if (!question.formLabel || question.formLabel.trim() === '') {
        alert('Please enter a label for the follow-up question before adding options.');
        return;
      }

      question.options.push({
        formLabel: '',
        type: 'StandardChoiceOption',
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      });
    },
    addNestedQuestion() {
      this.option.next = {
        formLabel: '',
        type: 'StandardChoiceOption',
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      };
    },
    removeNestedQuestion() {
      this.option.next = null;
    }
  }
}
</script>
