<template>
  <footer class="w3l-footer">
    <section class="footer-inner-main">
      <div class="below-section">
        <div class="container">
          <div class="copyright-footer">
            <div class="columns text-lg-left">
              <p>&copy; milimili广告</p>
            </div>
          </div>
        </div>
      </div>
      <button @click="topFunction" id="movetop" title="Go to top" v-show="isButtonVisible">
        <span class="fa fa-arrow-up" aria-hidden="true"></span>
      </button>
    </section>
  </footer>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';

const isButtonVisible = ref(false);

const scrollFunction = () => {
  const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
  isButtonVisible.value = scrollTop > 20;
};

const topFunction = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

onMounted(() => {
  window.addEventListener('scroll', scrollFunction);
});

onUnmounted(() => {
  window.removeEventListener('scroll', scrollFunction);
});
</script>


<style scoped>

</style>
