<template>
    <div id="container">
        <GoogleMap ref="mapRef" :api-promise="apiPromise" style="width: 100%; height: 500px;" :center="center"
            :zoom="15">
            <template #default="{ ready, api, map, mapTilesLoaded }">
                <Marker :options="{ position: center, label: 'S', }" />
                <Marker :options="{ position: destinationPosition, label: 'E', }" />
                <Polyline :options="{
                    path: flightPlanCoordinates,
                    geodesic: true,
                    strokeColor: '#FF0000',
                    strokeOpacity: 1.0,
                    strokeWeight: 2,
                }" />
                <CustomControl position="TOP_CENTER">
                    <el-row :gutter="24">
                        <el-col :span="4"></el-col>
                        <el-col :span="16">
                            <el-select v-model="searchQuery" filterable remote reserve-keyword
                                placeholder="Please enter a place" remote-show-suffix :remote-method="remoteMethod"
                                :loading="loading" style="width: 240px">
                                <el-option v-for="item in predictionsList" :key="item.value" :label="item.value"
                                    :value="item.value" @click="locationSelect(item)" />
                            </el-select>
                        </el-col>
                    </el-row>
                    <el-row :gutter="24">
                        <el-col :span="4"></el-col>
                        <el-col :span="16">
                            <el-select v-model="searchDestination" filterable remote reserve-keyword
                                placeholder="Please enter a destination" remote-show-suffix
                                :remote-method="destinationRemoteMethod" :loading="destinationLoading"
                                style="width: 240px">
                                <el-option v-for="item in destinationPredictionsList" :key="item.value"
                                    :label="item.value" :value="item.value" @click="destinationLocationSelect(item)" />
                            </el-select>
                        </el-col>
                        <el-col :span="4">
                            <el-button type="primary" @click="go">Go</el-button>
                        </el-col>
                    </el-row>
                </CustomControl>
            </template>
        </GoogleMap>
    </div>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue'
import { GoogleMap, Marker, Polyline, CustomControl } from 'vue3-google-map'
import { Loader } from '@googlemaps/js-api-loader';
// Google Map
const mapRef = ref(null)
// Load Google Maps with Load
const loader = new Loader({
    apiKey: 'AIzaSyCf7QJKKMGq0O3jA0UKef-AvlDWOnGZMg8',
    version: 'weekly',
    libraries: ['places'],
});
// Initialize the loader and start loading resources
const apiPromise = loader.load();

// Initialize the map center coordinates
const center = ref({ lat: -37.9142416, lng: 145.1346592 })

// User input for the origin query
const origin = ref('')

// Geographical position of the origin
const originPosition = ref(null)

// Loading state for the origin position
const loading = ref(false)

// User input for the origin search query
const searchQuery = ref(null)

// List of predictions for the origin
const predictionsList = ref([])

// User input for the destination query
const destination = ref('')

// Geographical position of the destination
const destinationPosition = ref(null)

// Loading state for the destination position
const destinationLoading = ref(false)

// User input for the destination search query
const searchDestination = ref(null)

// List of predictions for the destination
const destinationPredictionsList = ref([])

// Directions object for route planning
const directions = ref(null)

// Place service object for fetching place details
const placeService = ref(null)

// Geocoding service object for converting addresses to coordinates
const geocoder = ref(null)

// Directions service object for route planning
const directionsService = ref(null)

// Directions renderer object for displaying routes
const directionsRenderer = ref(null)

// Info window object for displaying location information
const infoWindow = ref(null)

// Define a ref array to store flight plan coordinates
const flightPlanCoordinates = ref([
    { lat: 37.772, lng: -122.214 },
    { lat: 21.291, lng: -157.821 },
    { lat: -18.142, lng: 178.431 },
    { lat: -27.467, lng: 153.027 },
])

// Watch for when the map is ready
watch([() => mapRef.value?.ready], ([ready]) => {
    if (!ready)
        return
    // Create a div element to initialize various map services
    const divElement = document.createElement('div')
    placeService.value = new mapRef.value.api.places.PlacesService(divElement);
    geocoder.value = new mapRef.value.api.Geocoder(divElement)
    directionsService.value = new mapRef.value.api.DirectionsService(divElement)
    directionsRenderer.value = new mapRef.value.api.DirectionsRenderer(divElement)
    infoWindow.value = new mapRef.value.api.InfoWindow(divElement)
})

/**
 * Asynchronous method to search for locations
 * @param {string} query - The keyword to search for locations
 */
const remoteMethod = (query: string) => {
    if (!query) {
        predictionsList.value = []
        return
    }
    loading.value = true
    const request = {
        query: query,
        fields: ['name', 'geometry'], // Get the name and location information of places
    };
    // Search for places based on the query keyword
    placeService.value.findPlaceFromQuery(request, (results, status) => {
        loading.value = false
        if (status === mapRef.value.api.places.PlacesServiceStatus.OK) {
            predictionsList.value = []
            results.map((place) => {
                predictionsList.value.push({
                    label: place.name,
                    value: place.name,
                    location: place.geometry.location.toJSON()
                });
            });
            if (results[0]) {
                center.value = results[0].geometry.location.toJSON()
                originPosition.value = center.value
            }
        }
    });
}

/**
 * Asynchronous method to search for destinations, similar to `remoteMethod` but for destination searches
 * @param {string} query - The keyword to search for destinations
 */
const destinationRemoteMethod = (query: string) => {
    if (!query) {
        destinationPredictionsList.value = []
        return
    }
    destinationLoading.value = true
    const request = {
        query: query,
        fields: ['name', 'geometry'],
    };
    placeService.value.findPlaceFromQuery(request, (results, status) => {
        destinationLoading.value = false
        if (status === mapRef.value.api.places.PlacesServiceStatus.OK) {
            destinationPredictionsList.value = []
            results.map((place) => {
                destinationPredictionsList.value.push({
                    label: place.name,
                    value: place.name,
                    location: place.geometry.location.toJSON()
                });
            });
        }
    });
}

/**
 * Actions performed after selecting a location
 * @param {Object} item - The selected location information
 */
const locationSelect = (item) => {
    center.value = item.location
    origin.value = item.value
    originPosition.value = item.location
    flightPlanCoordinates.value = []
    flightPlanCoordinates.value.push(item.location)
}

/**
 * Actions performed after selecting a destination, similar to `locationSelect` but for destinations
 * @param {Object} item - The selected destination information
 */
const destinationLocationSelect = (item) => {
    destination.value = item.value
    destinationPosition.value = item.location
    flightPlanCoordinates.value = []
    flightPlanCoordinates.value.push(item.location)
}

/**
 * Asynchronous function to route planning
 */
const go = async () => {
    directionsService.value?.route({
        origin: originPosition.value,
        destination: destinationPosition.value,
        travelMode: 'DRIVING'
    }, (response, status) => {
        if (status === 'OK') {
            flightPlanCoordinates.value = []
            response.routes[0].overview_path.map(item => {
                flightPlanCoordinates.value.push({ lat: item.lat(), lng: item.lng() })
            })
            directions.value = response
        }
    }
    )
}

</script>