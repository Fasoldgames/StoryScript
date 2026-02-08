<template>
  <div v-if="show" id="location" class="box-container">
    <div class="box-title" v-html="texts.format(texts.youAreHere, [game.currentLocation.name])"></div>
    <div class="location-content-wrapper">
      <div class="location-text-column">
        <div ref="description"
             @click="event => click(event)"
             @mouseover="event => mouseOver(event)"
             v-html="game.currentLocation.description"></div>
        <ul id="location-log" class="list-unstyled">
          <li v-for="message in game.currentLocation.log" v-html="message"></li>
        </ul>
      </div>
      <div class="location-image-column" v-if="game.currentLocation.picture">
        <div class="location-image-box">
          <img :alt="game.currentLocation.name"
               :src="game.currentLocation.picture"
               class="location-picture"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import {computed, onMounted, useTemplateRef} from "vue";
import {useStateStore} from "ui/StateStore.ts";
import {storeToRefs} from "pinia";
import {useTextFeatures} from "ui/Composables/TextFeatures.ts";

const store = useStateStore();
const {game} = storeToRefs(store);
const {texts} = store.services;
const {description, click, mouseOver, refreshFeatures} = useTextFeatures(useTemplateRef('description'));

const show = computed(() => game.value.currentLocation && (game.value.currentLocation.description || !game.value.currentLocation.features?.collectionPicture));

onMounted(() => {
  refreshFeatures(true);
});

</script>

<style scoped>
.location-content-wrapper {
  display: flex;
  gap: 15px;
  align-items: flex-start;
}

.location-text-column {
  flex: 1;
  min-width: 0;
}

.location-text-column > div {
  font-family: 'Georgia', 'Palatino Linotype', 'Book Antiqua', serif;
  color: #704214;
}

.location-text-column description {
  font-family: 'Georgia', 'Palatino Linotype', 'Book Antiqua', serif;
  color: #704214;
  display: block;
}

.location-text-column description p {
  font-family: 'Georgia', 'Palatino Linotype', 'Book Antiqua', serif;
  color: #704214;
}

.location-image-column {
  flex: 1;
  display: flex;
  justify-content: center;
}

.location-image-box {
  border: solid 1px var(--purple);
  padding: 10px;
  border-radius: 5px;
  background-color: white;
  max-height: fit-content;
}

.location-picture {
  max-width: 100%;
  height: auto;
  display: block;
}
</style>