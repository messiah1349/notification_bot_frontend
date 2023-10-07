<script setup>
    
import { ref, computed } from 'vue' 

const deeds = ref([]);

async function fetchAsync (url) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    headers.append('Accept', 'application/json');

    let response = await fetch(url, {
            method: "GET",
            mode: "cors",
            headers: headers
        }
    );
    let data = await response.json();
    return data;
  }

async function get_user_deeds(user_id) {
    //const host = import.meta.env.VITE_BACKEND_HOST
    const url = 'http://localhost:8001/user/' + user_id + '/deeds/';
    console.log('vot url - ' + url)
    const data = await fetchAsync(url);
    return data;
}

async function get_my_deed() {
    deeds.value = await get_user_deeds(46340594);
    console.log(deeds.value);
}

</script>


<template>
  <header>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet"
        integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
  </header>
  <button @click="get_my_deed">toggle</button>

    <div class="list-group">
        <label v-for="deed in deeds" class="list-group-item d-flex gap-2">
            <span>
                {{ deed.name }}
            </span>
            <button type="button" class="btn btn-dark btn-sm btndeed btnnotify">C</button>
            <button type="button" class="btn btn-danger btn-sm btndeed btncancell">X</button>
        </label>
    </div>
</template>
