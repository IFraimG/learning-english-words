<template>
  <loader v-if="isLoader" />
  <div v-else class="display-cover">
    <div class="display-cover__video">
      <video ref="video" autoplay></video>
      <div class="video-options">
        <select v-if="videoDevices.length > 0" @change="cameraOptionsChange" ref="cameraOptions" class="custom-select">
          <option v-for="(videoDevice, index) of videoDevices" :value="videoDevice.deviceId" :key="index">{{ videoDevice.label }}</option>
        </select>
      </div>
    </div>
    <canvas ref="canvas" class="d-none"></canvas>
    <div class="controls">
      <button ref="play" @click="cameraOptionsChange" class="btn btn-play">{{ Ti18N('scanner.cameraOn') }}</button>
      <button ref="pause" @click="pauseStream" class="btn btn-info pause d-none">{{ Ti18N('scanner.stop') }}</button>
      <button ref="screenshot" @click="doScreenshot" class="btn btn-outline-success screenshot d-none">{{ Ti18N('scanner.makePhoto') }}</button>
    </div>
  </div>
</template>

<script lang="ts">
  import "@/components/app/scss/VideoRecorder.scss"
  import { defineComponent, onBeforeUnmount, onMounted, ref, watchEffect } from "vue"
  import Loader from "./Loader.vue"

  export default defineComponent({
    components: { Loader },
    name: "VideoRecorded",
    props: {
      isOpenVideo: Boolean
    },
    inject: ["Ti18N"],
    setup(props, { emit }) {
      const play = ref<any>(null)
      const pause = ref<any>(null)
      const screenshot = ref<any>(null)
      const cameraOptions = ref<any>(null)
      const video = ref<any>(null)
      const canvas = ref<any>(null)
      const isLoader = ref<boolean>(false)
      const videoDevices = ref<any>([])

      const constraints = {
        video: {
          width: {
            min: 1280,
            ideal: 1920,
            max: 2560,
          },
          height: {
            min: 720,
            ideal: 1080,
            max: 1440,
          },
        },
      }

      onMounted(() => getCameraSelection())
      onBeforeUnmount(() => stopPlayVideo())

      watchEffect(() => {
        if (!props.isOpenVideo) stopPlayVideo()
      })

      const cameraOptionsChange = () => startStream({ ...constraints, deviceId: { exact: cameraOptions.value }})
      const stopPlayVideo = () => {
        videoDevices.value = []
        play.value.classList.add("d-none")
        pause.value.classList.add("d-none")
        screenshot.value.classList.add("d-none")
        video.value.srcObject?.getTracks().forEach((element: any) => element.stop())
        video.value.classList.add("d-none")
      }

      const pauseStream = () => {
        video.value.pause()
        play.value.classList.remove("d-none")
        pause.value.classList.add("d-none")
      }

      const doScreenshot = () => {
        canvas.value.width = video.value.videoWidth
        canvas.value.height = video.value.videoHeight
        canvas.value.getContext("2d").drawImage(video.value, 0, 0)
        emit("setImageURL", canvas.value.toDataURL("image/webp"))
        stopPlayVideo()
      }

      const startStream = async (constraints: any) => {
        try {
          const stream = await navigator.mediaDevices.getUserMedia(constraints)
          video.value.srcObject = stream

          play.value.classList.add("d-none")
          pause.value.classList.remove("d-none")
          screenshot.value.classList.remove("d-none")
        } catch (error: any) {
          if (error.name == "NotAllowedError") emit("setErrors", "Разрешите доступ к камере")
        }
      }

      const getCameraSelection = async () => {
        const devices = await navigator.mediaDevices.enumerateDevices()
        videoDevices.value = devices.filter((device) => device.kind === "videoinput")
        cameraOptionsChange()
      }

      return { play, pause, screenshot, cameraOptions, video, canvas, cameraOptionsChange, pauseStream, doScreenshot, isLoader, videoDevices }
    },
  })
</script>
