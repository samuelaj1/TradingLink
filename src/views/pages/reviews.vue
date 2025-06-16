<template>
  <BaseDashboardLayout>
    <template v-slot:title>
      <h4 class="title mb-5">Reviews</h4>
    </template>
    <div class="row">
      <div class="col-md-8">
        <div class="card">
          <div class="card-body">
            <h6 class="reviews-title">Overall rating</h6>
            <div class="rating-container">
              <span class="rating-value">0</span>
              <div class="rating-stars">
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
                <i class="bi bi-star-fill"></i>
              </div>
              <span class="review-count">(0 reviews)</span>
            </div>
            <button class="request-review-btn">Request a review</button>
          </div>
        </div>
        <h3 class="font-weight-bold mt-4">Reviews (0)</h3>

      </div>
    </div>

  </BaseDashboardLayout>
</template>

<script>
import BaseDashboardLayout from '../base-layout/tradesperson-dashboard';
import appConfig from "../../../app.config.json";

export default {
  page: {
    title: "Reviews",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: {
    BaseDashboardLayout
  },
  mounted() {
    $('#reviews').addClass('active')
  },
};
</script>

<style scoped>
/* Add any custom styles here */

.rating-container {
  display: flex;
  align-items: center;
  margin-bottom: 15px;
}

.rating-value {
  font-size: 18px;
  margin-right: 10px;
  font-weight: bold;
}

.rating-stars {
  color: #ffc107;
  margin-right: 5px;
  font-size: 13px;
}

.review-count {
  color: #6c757d;
  margin-left: 5px;
}

.request-review-btn {
  background-color: var(--primary-color1);
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  font-weight: bold;
  width: 100%;
}

.reviews-title {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 20px;
}
</style>
