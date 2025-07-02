<template>
  <div class="container py-5">
    <h2 class="mb-4">Add Questions for Trade</h2>

    <div class="mb-3">
      <label class="form-label">Select Trade</label>
      <select v-model="selectedTrade" class="form-select">
        <option disabled value="">Select a trade</option>
        <option v-for="trade in trades" :key="trade.id" :value="trade.id">{{ trade.name }}</option>
      </select>
    </div>

    <div class="card mb-5">
      <div class="card-body">
        <label class="form-label">Main Question</label>
        <input class="form-control mb-2" v-model="question.formLabel" placeholder="e.g. What is the issue?" />

        <NestedOption
            v-for="(opt, index) in question.options"
            :key="index"
            :option="opt"
            @remove="question.options.splice(index, 1)"
        />

        <button class="btn btn-sm btn-secondary mt-2" @click="addOption(question)">+ Add Option</button>
      </div>
    </div>

    <button class="btn btn-success ms-2" :disabled="!selectedTrade" @click="submitQuestions">Save</button>
  </div>
</template>

<script>
import NestedOption from '../../../components/optionNode.vue';

export default {
  components: { NestedOption },
  data() {
    return {
      selectedTrade: '',
      trades: [],
      question: {
        formLabel: '',
        type: 'StandardChoiceOption',
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      }
    };
  },
  created() {
    this.fetchTrades();
  },
  methods: {
    fetchTrades() {
      this.trades = [
        { id: '1', name: 'Plumbing' },
        { id: '2', name: 'Electrical' },
      ];
    },
    addOption(question) {
      question.options.push({
        formLabel: '',
        type: 'StandardChoiceOption',
        required: true,
        requiredErrorMessage: 'This field is required',
        options: [],
        next: null
      });
    },
    submitQuestions() {
      console.log('Saving for trade ID:', this.selectedTrade);
      console.log(JSON.stringify(this.question, null, 2));
      alert('Questions submitted. Check console log.');
    }
  }
};
</script>
