<script lang="ts">
  import type { Content } from "@prismicio/client";
  import BgVideo from "$lib/components/BgVideo.svelte";
  import { mediaUrl } from "$lib/links";

  let { slice }: { slice: Content.VideoBandSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-video-band relative aspect-[2/1] overflow-hidden bg-primary"
>
  <BgVideo
    mp4={mediaUrl(slice.primary.video_mp4)}
    webm={mediaUrl(slice.primary.video_webm)}
    mobileMp4={mediaUrl(slice.primary.video_mp4_mobile)}
    poster={slice.primary.poster?.url}
    class="absolute inset-0 h-full w-full"
  />
</section>

<style>
  :global([data-slice-type="leadership"] + .wc-video-band) {
    aspect-ratio: 16 / 9;
    margin-top: -12rem;
  }
  @media (max-width: 767px) {
    :global([data-slice-type="leadership"] + .wc-video-band) {
      margin-top: -10rem;
    }
  }
</style>
