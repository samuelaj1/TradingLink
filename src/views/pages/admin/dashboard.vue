<template>
  <div>
    <topHeader/>
    <div class="container">
      <div class="row">

        <!-- PRICING -->
        <div class="col-12 mt-4">
          <div class="table-wrapper2">
            <div class="title-and-btn mb-3">
              <div class="title">
                <h4>Pricing by Job Category</h4>
              </div>
            </div>

            <apexchart
                v-if="pricingSeries.length"
                type="bar"
                height="320"
                :options="pricingChartOptions"
                :series="pricingSeries"
            />

            <b-table
                :items="pricingBreakdown"
                :fields="pricingFields"
                responsive="sm"
                class="table table-bordered table-hover mt-3"
            >
              <template #cell(avg_total_price)="data">
                {{ formatCurrency(data.value) }}
              </template>
              <template #cell(avg_materials_cost)="data">
                {{ formatCurrency(data.value) }}
              </template>
              <template #cell(avg_labour_cost)="data">
                {{ formatCurrency(data.value) }}
              </template>
            </b-table>

            <div v-if="isLoadingPricing" class="text-center my-4">
              <div class="spinner-border" role="status"></div>
            </div>
          </div>
        </div>

        <!-- TRADESPERSON REGISTRY -->
        <div class="col-12 mt-4">
          <div class="table-wrapper2">
            <div class="title-and-btn mb-3">
              <div class="title">
                <h4>Tradesperson Registry ({{ totalTradespeople }} total)</h4>
              </div>
            </div>

            <div class="row">
              <div class="col-lg-6">
                <h6>By Trade</h6>
                <apexchart
                    v-if="tradeByTradeSeries.length"
                    type="bar"
                    height="280"
                    :options="tradeByTradeChartOptions"
                    :series="tradeByTradeSeries"
                />
                <b-table
                    :items="tradeByTradeBreakdown"
                    :fields="tradeFields"
                    responsive="sm"
                    class="table table-bordered table-hover mt-3"
                />
                <p v-if="tradeByTradeUnassigned" class="text-muted small">
                  {{ tradeByTradeUnassigned }} tradesperson(s) have no trade set and aren't included above.
                </p>
              </div>

              <div class="col-lg-6">
                <h6>By Parish</h6>
                <apexchart
                    v-if="tradeByParishSeries.length"
                    type="bar"
                    height="280"
                    :options="tradeByParishChartOptions"
                    :series="tradeByParishSeries"
                />
                <b-table
                    :items="tradeByParishBreakdown"
                    :fields="parishFields"
                    responsive="sm"
                    class="table table-bordered table-hover mt-3"
                />
                <p v-if="tradeByParishUnassigned" class="text-muted small">
                  {{ tradeByParishUnassigned }} tradesperson(s) have no parish set and aren't included above.
                </p>
              </div>
            </div>

            <div v-if="isLoadingTradesperson" class="text-center my-4">
              <div class="spinner-border" role="status"></div>
            </div>
          </div>
        </div>

        <!-- JOB VOLUME -->
        <div class="col-12 mt-4">
          <div class="table-wrapper2">
            <div class="title-and-btn mb-3">
              <div class="title">
                <h4>Job Volume</h4>
              </div>
            </div>

            <div class="row text-center mb-4">
              <div class="col-3">
                <h3>{{ jobSnapshot.open }}</h3>
                <span class="text-muted">Open</span>
              </div>
              <div class="col-3">
                <h3>{{ jobSnapshot.in_progress }}</h3>
                <span class="text-muted">In Progress</span>
              </div>
              <div class="col-3">
                <h3>{{ jobSnapshot.completed }}</h3>
                <span class="text-muted">Completed</span>
              </div>
              <div class="col-3">
                <h3>{{ jobSnapshot.cancelled }}</h3>
                <span class="text-muted">Cancelled</span>
              </div>
            </div>

            <apexchart
                v-if="jobVolumeSeries.length"
                type="line"
                height="320"
                :options="jobVolumeChartOptions"
                :series="jobVolumeSeries"
            />

            <div v-if="isLoadingJobVolume" class="text-center my-4">
              <div class="spinner-border" role="status"></div>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import topHeader from '../../base-layout/admin-header'
import appConfig from "../../../../app.config.json";
import {userService} from "@/apis/user.service";

export default {
  page: {
    title: "Admin | Dashboard",
    meta: [{name: "description", content: appConfig.description}]
  },
  components: {
    topHeader,
  },
  data() {
    return {
      isLoadingPricing: false,
      isLoadingTradesperson: false,
      isLoadingJobVolume: false,

      pricingBreakdown: [],
      pricingSeries: [],
      pricingCategories: [],
      pricingFields: [
        {key: 'trade_name', label: 'Category', sortable: true},
        {key: 'quote_count', label: 'Quotes', sortable: true},
        {key: 'avg_total_price', label: 'Avg Total Price', sortable: true},
        {key: 'avg_materials_cost', label: 'Avg Materials', sortable: true},
        {key: 'avg_labour_cost', label: 'Avg Labour', sortable: true},
        {key: 'quotes_with_breakdown', label: 'Quotes w/ Breakdown', sortable: true},
      ],

      totalTradespeople: 0,
      tradeByTradeBreakdown: [],
      tradeByTradeSeries: [],
      tradeByTradeCategories: [],
      tradeByTradeUnassigned: 0,
      tradeFields: [
        {key: 'trade_name', label: 'Trade', sortable: true},
        {key: 'tradesperson_count', label: 'Tradespeople', sortable: true},
      ],

      tradeByParishBreakdown: [],
      tradeByParishSeries: [],
      tradeByParishCategories: [],
      tradeByParishUnassigned: 0,
      parishFields: [
        {key: 'parish_name', label: 'Parish', sortable: true},
        {key: 'tradesperson_count', label: 'Tradespeople', sortable: true},
      ],

      jobSnapshot: {open: 0, in_progress: 0, completed: 0, cancelled: 0},
      jobVolumeSeries: [],
      jobVolumeCategories: [],
    };
  },
  computed: {
    pricingChartOptions() {
      return {chart: {id: 'pricing-by-category'}, xaxis: {categories: this.pricingCategories}};
    },
    tradeByTradeChartOptions() {
      return {chart: {id: 'tradespeople-by-trade'}, xaxis: {categories: this.tradeByTradeCategories}};
    },
    tradeByParishChartOptions() {
      return {chart: {id: 'tradespeople-by-parish'}, xaxis: {categories: this.tradeByParishCategories}};
    },
    jobVolumeChartOptions() {
      return {chart: {id: 'job-volume-trend'}, xaxis: {categories: this.jobVolumeCategories}};
    },
  },
  methods: {
    formatCurrency(value) {
      if (value === null || value === undefined) return '—';
      return '$' + Number(value).toFixed(2);
    },
    loadPricingStats() {
      this.isLoadingPricing = true;
      userService.getPricingStats().then((res) => {
        this.isLoadingPricing = false;
        const {extra, status} = res;
        if (status) {
          this.pricingBreakdown = extra.breakdown;
          this.pricingCategories = extra.categories;
          this.pricingSeries = extra.series;
        }
      });
    },
    loadTradespersonStats() {
      this.isLoadingTradesperson = true;
      userService.getTradespersonRegistryStats().then((res) => {
        this.isLoadingTradesperson = false;
        const {extra, status} = res;
        if (status) {
          this.totalTradespeople = extra.total_tradespeople;
          this.tradeByTradeBreakdown = extra.by_trade.breakdown;
          this.tradeByTradeCategories = extra.by_trade.categories;
          this.tradeByTradeSeries = extra.by_trade.series;
          this.tradeByTradeUnassigned = extra.by_trade.unassigned_count;
          this.tradeByParishBreakdown = extra.by_parish.breakdown;
          this.tradeByParishCategories = extra.by_parish.categories;
          this.tradeByParishSeries = extra.by_parish.series;
          this.tradeByParishUnassigned = extra.by_parish.unassigned_count;
        }
      });
    },
    loadJobVolumeStats() {
      this.isLoadingJobVolume = true;
      userService.getJobVolumeStats().then((res) => {
        this.isLoadingJobVolume = false;
        const {extra, status} = res;
        if (status) {
          this.jobSnapshot = extra.snapshot;
          this.jobVolumeCategories = extra.categories;
          this.jobVolumeSeries = extra.series;
        }
      });
    },
  },
  created() {
    this.loadPricingStats();
    this.loadTradespersonStats();
    this.loadJobVolumeStats();
  },
  mounted() {
    $('#dashboard').addClass('active')
  },
};
</script>

<style scoped>

</style>
