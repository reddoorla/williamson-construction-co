<script lang="ts">
  import { onMount } from "svelte";

  type Props = {
    mp4?: string | null;
    webm?: string | null;
    poster?: string | null;
    class?: string;
  };

  let { mp4, webm, poster, class: passedClasses = "" }: Props = $props();

  let video = $state<HTMLVideoElement>();

  onMount(() => {
    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) video?.pause();
  });
</script>

<video
  bind:this={video}
  class="bg-cover bg-center object-cover {passedClasses}"
  style={poster ? `background-image: url("${poster}")` : undefined}
  poster={poster ?? undefined}
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  aria-hidden="true"
  tabindex="-1"
>
  {#if webm}<source src={webm} type="video/webm" />{/if}
  {#if mp4}<source src={mp4} type="video/mp4" />{/if}
</video>
