<script lang="ts">
  import type { Content } from "@prismicio/client";
  import BgVideo from "$lib/components/BgVideo.svelte";
  import { mediaUrl } from "$lib/links";

  let { slice }: { slice: Content.VideoBandSlice } = $props();
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="relative aspect-[2/1] overflow-hidden bg-primary"
>
  <BgVideo
    mp4={mediaUrl(slice.primary.video_mp4)}
    webm={mediaUrl(slice.primary.video_webm)}
    poster={slice.primary.poster?.url}
    class="absolute inset-0 h-full w-full"
  />
</section>
