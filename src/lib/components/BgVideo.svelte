<script lang="ts">
  import { onMount } from "svelte";
  import Pause from "@lucide/svelte/icons/pause";
  import Play from "@lucide/svelte/icons/play";

  type Props = {
    mp4?: string | null;
    webm?: string | null;
    poster?: string | null;
    class?: string;
    controlClass?: string;
  };

  let {
    mp4,
    webm,
    poster,
    class: passedClasses = "",
    controlClass = "bottom-4 right-4",
  }: Props = $props();

  let video = $state<HTMLVideoElement>();
  let playing = $state(false);
  let mounted = $state(false);

  const hasSource = $derived(Boolean(mp4 || webm));

  function play() {
    try {
      video?.play()?.catch?.(() => {});
    } catch {
      return;
    }
  }

  function pause() {
    video?.pause();
  }

  onMount(() => {
    mounted = true;
    const reduce = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!reduce?.matches) play();
    const onChange = (event: MediaQueryListEvent) => {
      if (event.matches) pause();
    };
    reduce?.addEventListener?.("change", onChange);
    return () => reduce?.removeEventListener?.("change", onChange);
  });
</script>

<video
  bind:this={video}
  class="bg-cover bg-center object-cover {passedClasses}"
  style={poster ? `background-image: url("${poster}")` : undefined}
  poster={poster ?? undefined}
  muted
  loop
  playsinline
  preload="metadata"
  aria-hidden="true"
  tabindex="-1"
  onplay={() => (playing = true)}
  onpause={() => (playing = false)}
>
  {#if webm}<source src={webm} type="video/webm" />{/if}
  {#if mp4}<source src={mp4} type="video/mp4" />{/if}
</video>
{#if mounted && hasSource}
  <button
    type="button"
    class="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary {controlClass}"
    aria-label={playing ? "Pause background video" : "Play background video"}
    onclick={() => (playing ? pause() : play())}
  >
    {#if playing}
      <Pause size={18} aria-hidden="true" />
    {:else}
      <Play size={18} aria-hidden="true" />
    {/if}
  </button>
{/if}
