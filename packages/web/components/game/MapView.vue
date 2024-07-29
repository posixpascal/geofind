<!--<template>-->
<!--  <div ref="map" style="cursor: pointer !important; width: 100vw; height: 100vh">-->

<!--  </div>-->
<!--</template>-->
<!--<script lang="ts">-->
<!--import Component from 'vue-class-component'-->
<!--import { Prop, Vue, Watch } from 'vue-property-decorator'-->
<!--import type { StylePropertySpecification } from "maplibre-gl";-->
<!--import maplibregl, {-->
<!--  MapMouseEvent,-->
<!--  Marker,-->
<!--  StyleSpecification,-->
<!--} from "maplibre-gl";-->
<!--import "maplibre-gl/dist/maplibre-gl.css";-->
<!--import background from "~/assets/layers/backgroundLayer";-->
<!--import coastline from "~/assets/layers/coastlineLayer";-->
<!--import countries from "~/assets/layers/countriesLayer";-->
<!--import countriesDark from "~/assets/layers/countriesDarkLayer";-->
<!--import countriesGray from "~/assets/layers/countryLayersGray";-->
<!--import countryBoundaries from "~/assets/layers/countryBoundariesLayer";-->
<!--import crimeaLayer from "~/assets/layers/crimeaLayer";-->
<!--import crimeaLayerGray from "~/assets/layers/crimeaLayerGray";-->
<!--import crimeaSource from "~/assets/layers/crimeaSource";-->
<!--import { PINS } from '~/constants/pins';-->
<!--import { states } from '~/constants/states';-->
<!--import { Room } from '../../models'-->

<!--@Component({-->
<!--  methods: {},-->
<!--  components: {-->
<!--  },-->
<!--})-->
<!--export default class MapView extends Vue {-->
<!--  map: maplibregl.Map;-->
<!--  marker: maplibregl.Marker;-->
<!--  mapReady;-->
<!--  whenMapReady = new Promise(resolve => {-->
<!--    this.mapReady = resolve;-->
<!--  });-->

<!--  @Prop() room: Room;-->

<!--  created() {-->
<!--    this.whenMapReady = new Promise(resolve => { });-->
<!--  }-->

<!--  mounted() {-->
<!--    const map$: HTMLElement = this.$refs.map as HTMLElement;-->
<!--    this.map = new maplibregl.Map({-->
<!--      container: map$,-->
<!--      style: this.style,-->
<!--      center: [4.550343, 55.665957],-->
<!--      zoom: 1.5,-->
<!--    });-->

<!--    this.marker = new maplibregl.Marker({-->
<!--      draggable: true,-->
<!--      element: this.pin(this.room.player.pin),-->
<!--    })-->
<!--      .setLngLat([8.550343, 55.665957])-->
<!--      .addTo(this.map);-->

<!--    this.map.on("click", event => {-->
<!--      this.marker.setLngLat(event.lngLat);-->
<!--    });-->
<!--    this.map.on("load", () => this.mapReady());-->
<!--  }-->

<!--  fadeMapColors() {-->
<!--    this.whenMapReady.then(() => {-->
<!--      this.map.setStyle(this.style as StyleSpecification, {-->

<!--      });-->
<!--    });-->
<!--  }-->

<!--  showCountryShape() {-->
<!--    this.whenMapReady.then(() => {-->
<!--      if (!this.room?.country?.shape) {-->
<!--        return;-->
<!--      }-->

<!--      const geojson = JSON.parse(this.room.country.shape);-->
<!--      const source = this.map.addSource('subject', {-->
<!--        'type': 'geojson',-->
<!--        'data': geojson-->
<!--      });-->
<!--      this.map.addLayer({-->
<!--        'id': 'subject-fill',-->
<!--        'type': 'fill',-->
<!--        'source': 'subject',-->
<!--        'layout': {},-->
<!--        'paint': {-->
<!--          'fill-color': '#4AB63B',-->
<!--          'fill-opacity': 0.7-->
<!--        }-->
<!--      });-->

<!--      this.map.addLayer({-->
<!--        'id': 'subject-border',-->
<!--        'type': 'line',-->
<!--        'source': 'subject',-->
<!--        'layout': {},-->
<!--        'paint': {-->
<!--          'line-color': '#4AB63B',-->
<!--          'line-width': 5,-->
<!--          'line-opacity': 1-->
<!--        }-->
<!--      });-->
<!--    });-->
<!--  }-->

<!--  showCountryMarker() {-->
<!--    this.whenMapReady.then(() => {-->
<!--      this.countryMarker = new maplibregl.Marker()-->
<!--        .setLngLat([this.room.country.lat, this.room.country.lng])-->
<!--        .addTo(this.map);-->
<!--    });-->
<!--  }-->

<!--  showDistanceLines() {-->
<!--    this.whenMapReady.then(() => {-->
<!--      // Coordinates for the polyline from point A to point B-->
<!--      const coordinates = [-->
<!--        this.marker.getLngLat().toArray(), // Point A (Longitude, Latitude)-->
<!--        [this.room.country.lat, this.room.country.lng] // Point B (Longitude, Latitude)-->
<!--      ];-->

<!--      // Add a GeoJSON source with the polyline data-->
<!--      this.map.addSource('line', {-->
<!--        'type': 'geojson',-->
<!--        'data': {-->
<!--          'type': 'Feature',-->
<!--          'geometry': {-->
<!--            'type': 'LineString',-->
<!--            'coordinates': coordinates-->
<!--          }-->
<!--        }-->
<!--      });-->

<!--      // Add a line layer to display the polyline-->
<!--      this.map.addLayer({-->
<!--        'id': 'line-layer',-->
<!--        'type': 'line',-->
<!--        'source': 'line',-->
<!--        'layout': {-->
<!--          'line-cap': 'round',-->
<!--          'line-join': 'round'-->
<!--        },-->
<!--        'paint': {-->
<!--          'line-color': '#FF0000',-->
<!--          'line-width': 4,-->
<!--          'line-opacity': 0.8-->
<!--        }-->
<!--      });-->

<!--    });-->
<!--  }-->

<!--  @Watch('room.state', { immediate: true })-->
<!--  async vote(newState) {-->
<!--    switch (newState) {-->
<!--      case states.PARTY_ROUND_END:-->
<!--      case states.ROUND_END:-->
<!--        //this.fadeMapColors();-->
<!--        this.showCountryShape();-->
<!--        this.showCountryMarker();-->
<!--        this.showDistanceLines();-->
<!--        break;-->
<!--      default:-->
<!--    }-->
<!--  }-->

<!--  pin(color) {-->
<!--    const pin = PINS[this.room.player.pin];-->
<!--    const element = document.createElement("div");-->
<!--    element.innerHTML = `<img style="width: 52px; height: 52px; position: relative; left: 4px; top: -26px;" src=${pin} />`;-->
<!--    return element;-->
<!--  }-->

<!--  get style() {-->
<!--    const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;-->
<!--    return {-->
<!--      name: "MapLibre",-->
<!--      zoom: 0.8619833357855968,-->
<!--      pitch: 0,-->
<!--      center: [17.65431710431244, 32.954120326746775],-->
<!--      glyphs: `/font/{fontstack}/{range}.pbf`,-->
<!--      layers: [-->
<!--        background,-->
<!--        coastline,-->
<!--        isDarkMode ? countriesDark : countries,-->
<!--        countryBoundaries,-->
<!--        crimeaLayer-->
<!--      ],-->
<!--      bearing: 0,-->
<!--      sources: {-->
<!--        maplibre: {-->
<!--          url: `/tiles/tiles.json`,-->
<!--          type: "vector",-->
<!--        },-->
<!--        crimea: crimeaSource,-->
<!--      },-->
<!--      version: 8,-->
<!--      metadata: {-->

<!--      },-->
<!--    };-->
<!--  }-->
<!--}-->
<!--</script>-->
<!--<style>-->
<!--.maplibregl-canvas {-->
<!--  cursor: crosshair !important;-->
<!--}-->
<!--</style>-->
