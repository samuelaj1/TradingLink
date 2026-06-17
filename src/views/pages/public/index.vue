<template>
  <div class="tl-home">
    <RoleBasedHeader :userRole="userRole" />

    <!-- HERO -->
    <section class="tl-hero">
      <div class="tl-hero__overlay"></div>
      <div class="tl-hero__content">
        <div class="tl-hero__text">
          <h1 class="tl-hero__heading">
            Find Trusted Tradespeople<br>
            Across Jamaica —<br>
            <span class="tl-hero__highlight">Fast, Reliable, Secure</span>
          </h1>
          <p class="tl-hero__sub">Post your job and get connected with certified professionals today</p>
          <div class="tl-search">
            <div class="tl-search__wrap">
              <svg class="tl-search__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input
                class="tl-search__input"
                type="text"
                placeholder="What trade do you need? e.g. Plumber, Electrician"
                v-model="searchQuery"
                @input="filterCategories"
                @focus="showDropdown = true"
                @blur="collapseDropdown"
                autocomplete="off"
              />
              <button class="tl-search__btn" @click="handleSearchBtn">Search</button>
            </div>
            <ul v-if="showDropdown && filteredCategories.length" class="tl-search__dropdown">
              <li
                v-for="result in filteredCategories.slice(0, 8)"
                :key="result.id"
                @mousedown.prevent="goToPostJob(result)"
                class="tl-search__item"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>
                </svg>
                {{ result.name }}
              </li>
            </ul>
          </div>
          <div class="tl-hero__quick">
            <span class="tl-hero__quick-label">Popular:</span>
            <button v-for="(t, i) in quickTrades" :key="i" class="tl-pill" @click="$router.push('/find-tradesperson?category=' + t)">{{ t }}</button>
          </div>
        </div>
      </div>
    </section>

    <!-- TRUST BADGES -->
    <section class="tl-trust">
      <div class="tl-container">
        <div class="tl-trust__grid">
          <div class="tl-trust__item" v-for="(badge, i) in trustBadges" :key="i">
            <div class="tl-trust__icon" v-html="badge.icon"></div>
            <div>
              <div class="tl-trust__title">{{ badge.title }}</div>
              <div class="tl-trust__sub">{{ badge.sub }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- HOW IT WORKS -->
    <section class="tl-section tl-how">
      <div class="tl-container">
        <span class="tl-label">Simple Process</span>
        <h2 class="tl-section__title">How <span class="tl-teal">Tradelink</span> works</h2>
        <p class="tl-section__sub">Connect with trusted professionals in 3 easy steps</p>
        <div class="tl-how__steps">
          <div class="tl-how__step" v-for="(step, i) in steps" :key="i">
            <div class="tl-how__img">
              <img :src="step.img" :alt="step.title" />
              <div class="tl-how__num">{{ String(i + 1).padStart(2, '0') }}</div>
            </div>
            <div class="tl-how__body">
              <h3 class="tl-how__title">{{ step.title }}</h3>
              <p class="tl-how__text">{{ step.body }}</p>
            </div>
          </div>
        </div>
        <div class="tl-center">
          <router-link to="/post-a-job" class="tl-btn tl-btn--primary">Post Your Job Free</router-link>
        </div>
      </div>
    </section>

    <!-- CATEGORIES -->
    <section class="tl-section tl-categories">
      <div class="tl-container">
        <div class="tl-section__header">
          <div>
            <span class="tl-label" style="text-align:left">Browse by Trade</span>
            <h2 class="tl-section__title" style="text-align:left">Popular <span class="tl-teal">Categories</span></h2>
          </div>
          <router-link to="/find-tradesperson" class="tl-link-more">View all trades →</router-link>
        </div>
        <div class="tl-categories__grid">
          <router-link
            v-for="(trade, i) in trades"
            :key="i"
            :to="'/find-tradesperson?category=' + trade.name"
            class="tl-cat-card"
          >
            <div class="tl-cat-card__icon" v-html="getCategoryIcon(trade.name)"></div>
            <div class="tl-cat-card__name">{{ trade.name }}</div>
            <svg class="tl-cat-card__arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="m9 18 6-6-6-6"/></svg>
          </router-link>
        </div>
        <div class="tl-center" style="margin-top:32px">
          <router-link to="/find-tradesperson" class="tl-btn tl-btn--outline">Explore All Trades →</router-link>
        </div>
      </div>
    </section>

    <!-- FOR TRADESPEOPLE -->
    <section class="tl-tradesperson">
      <div class="tl-container">
        <div class="tl-tradesperson__inner">
          <div class="tl-tradesperson__copy">
            <span class="tl-label tl-label--light">For Tradespeople</span>
            <h2 class="tl-tradesperson__heading">Looking for job <span class="tl-teal-light">leads?</span></h2>
            <p class="tl-tradesperson__sub">Grow your business with Tradelink — thousands of jobs posted every month across all 14 parishes.</p>
            <ul class="tl-perks">
              <li v-for="(perk, i) in tradePerks" :key="i">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M9 12l2 2 4-4m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z"/></svg>
                {{ perk }}
              </li>
            </ul>
            <button class="tl-btn tl-btn--white" @click="goToSignUp">Sign Up for Free ✦</button>
          </div>
          <div class="tl-tradesperson__badges">
            <div class="tl-badge" v-for="(b, i) in tradeBadges" :key="i">
              <div class="tl-badge__icon" v-html="b.icon"></div>
              <div class="tl-badge__label">{{ b.label }}</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- STATS -->
    <section class="tl-stats">
      <div class="tl-container">
        <div class="tl-stats__grid">
          <div class="tl-stat" v-for="(s, i) in statItems" :key="i">
            <div class="tl-stat__num">{{ s.num }}</div>
            <div class="tl-stat__label">{{ s.label }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA -->
    <section class="tl-cta">
      <div class="tl-container">
        <h2 class="tl-cta__heading">Ready to get started?</h2>
        <p class="tl-cta__sub">Join thousands of Jamaicans who trust Tradelink to connect them with quality professionals.</p>
        <router-link to="/post-a-job" class="tl-btn tl-btn--primary">Post Your Job Now →</router-link>
      </div>
    </section>

    <HomeFooter />
  </div>
</template>

<script>
import HomeFooter from '../../base-layout/footer'
import appConfig from "../../../../app.config.json"
import { userService } from "@/apis/user.service"
import store from "@/store/store"
import RoleBasedHeader from "@/views/base-layout/roleBasedHeader"

export default {
  name: "Home",
  page: {
    title: "Find Trusted Tradespeople in Jamaica | TradeLinkJA",
    meta: [{ name: "description", content: appConfig.description }]
  },
  components: { HomeFooter, RoleBasedHeader },
  data() {
    return {
      trades: [],
      stats: null,
      searchQuery: '',
      showDropdown: false,
      categories: [],
      filteredCategories: [],
      quickTrades: ['Plumber', 'Electrician', 'Carpenter', 'Painter', 'Tiler'],
      trustBadges: [
        { title: 'Verified Tradespeople', sub: 'All tradespeople are verified', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>` },
        { title: 'Secure Messaging', sub: 'Chat safely in-app', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>` },
        { title: 'Customer Reviews', sub: 'Real reviews from real customers', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
        { title: 'Island-wide Coverage', sub: 'Connecting you across Jamaica', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>` },
      ],
      steps: [
        { title: 'Post your job', body: 'Tell us what you need done. Whether it\'s plumbing, painting, or electrical — give as much detail as you can so tradespeople understand the job clearly.', img: '/frontend/assets/images/bg/carpenter-cutting.jpg' },
        { title: 'Trades respond', body: 'Skilled tradespeople will reply with quotes and links to their profiles. Compare their experience, reviews, and portfolios before deciding.', img: '/frontend/assets/images/bg/carpenter-2.jpg' },
        { title: 'Choose & connect', body: 'When you\'re ready, select the tradesperson who best fits your job. Once confirmed, you\'ll be connected directly to make arrangements.', img: '/frontend/assets/images/bg/tradesperson.jpg' },
      ],
      tradePerks: [
        'Free to register and set up your profile',
        'Get matched to jobs in your trade and area',
        'Build your reputation with verified reviews',
        'No monthly subscription fees',
      ],
      tradeBadges: [
        { label: 'Verified Badge', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0 1 12 2.944a11.955 11.955 0 0 1-8.618 3.04A12.02 12.02 0 0 0 3 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>` },
        { label: 'Star Ratings', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>` },
        { label: 'Portfolio', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="3" width="20" height="14" rx="2"/><path d="M8 21h8M12 17v4"/></svg>` },
        { label: 'Job Alerts', icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-
