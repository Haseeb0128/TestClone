<template>
  <v-container fluid>
    <h2>Tabs Switched</h2>
    <p>The number of tabs Switched: {{ switchedTabs }} times</p>
  </v-container>
  <v-container fluid class="mt-5">
    <v-row>
      <v-col cols="12" lg="4" class="bg-brown-lighten-3">
        <v-card class="pa-3">
          <h1>Heading</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque minus sint provident,
            veniam autem rem eveniet alias porro adipisci veritatis aliquam illo tempore quis
            blanditiis, ad animi necessitatibus cum ducimus!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque minus sint provident,
            veniam autem rem eveniet alias porro adipisci veritatis aliquam illo tempore quis
            blanditiis, ad animi necessitatibus cum ducimus!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque minus sint provident,
            veniam autem rem eveniet alias porro adipisci veritatis aliquam illo tempore quis
            blanditiis, ad animi necessitatibus cum ducimus!
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4" class="bg-brown-lighten-3">
        <v-card class="pa-3">
          <h1>Heading</h1>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque minus sint provident,
            veniam autem rem eveniet alias porro adipisci veritatis aliquam illo tempore quis
            blanditiis, ad animi necessitatibus cum ducimus!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque minus sint provident,
            veniam autem rem eveniet alias porro adipisci veritatis aliquam illo tempore quis
            blanditiis, ad animi necessitatibus cum ducimus!
          </p>
          <p>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Neque minus sint provident,
            veniam autem rem eveniet alias porro adipisci veritatis aliquam illo tempore quis
            blanditiis, ad animi necessitatibus cum ducimus!
          </p>
        </v-card>
      </v-col>
      <v-col cols="12" lg="4" class="bg-brown-lighten-3">
        <v-textarea
          variant="outlined"
          v-model="results.data"
          placeholder="Write Code Here"
        ></v-textarea>
        <v-btn @click="submitData" class="bg-brown">Submit</v-btn>
      </v-col>
    </v-row>
  </v-container>
  <video hidden ref="videoElement"></video>
</template>
<script>
import axios from 'axios'

export default {
  data() {
    return {
      results: {
        data: '',
        switchedTabs: null
      },
      switchedTabs: 0,
      recording: false,
      stream: null,
      mediaRecorder: null,
      videoChunks: []
    }
  },
  mounted() {
    document.addEventListener('visibilitychange', this.changeTabs)
    this.startRecording();
  },
  methods: {
    async submitData() {
      const result = await axios.post('http://localhost:3000/result', {
        data: this.results.data,
        tabsSwitched: this.switchedTabs
      })
      this.stopRecording();
      alert('Submitted !')
    },
    changeTabs() {
      if (document.visibilityState === 'hidden') {
        this.switchedTabs++
      }
    },
    startRecording() {
        navigator.mediaDevices.getUserMedia({ video: true, audio: true })
          .then((webcamStream) => {
            this.stream = webcamStream;
            this.$refs.videoElement.srcObject = webcamStream;
            this.$refs.videoElement.play();
  
            this.mediaRecorder = new MediaRecorder(webcamStream);
            this.mediaRecorder.ondataavailable = this.handleDataAvailable;
            this.mediaRecorder.start();
  
            this.recording = true;
          })
          .catch((error) => {
            console.error('Error accessing webcam:', error);
          });
      },
      handleDataAvailable(event) {
        if (event.data.size > 0) {
          this.videoChunks.push(event.data);
        }
      },
      stopRecording() {
        this.mediaRecorder.stop();
  
        this.mediaRecorder.onstop = () => {
          const videoBlob = new Blob(this.videoChunks, { type: 'video/webm' });
          const videoUrl = URL.createObjectURL(videoBlob);
  
          const downloadLink = document.createElement('a');
          downloadLink.href = videoUrl;
          downloadLink.download = 'recorded_video.webm';
          document.body.appendChild(downloadLink);
          downloadLink.click();
          document.body.removeChild(downloadLink);
  
          this.videoChunks.length = 0;
          this.stream.getTracks().forEach((track) => {
            track.stop();
          });
  
          this.recording = false;
        };
      },
  }
}
</script>
