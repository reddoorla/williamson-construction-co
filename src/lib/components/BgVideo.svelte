<script lang="ts">
  import { onMount } from "svelte";
  import Pause from "@lucide/svelte/icons/pause";
  import Play from "@lucide/svelte/icons/play";
  import { cappedWidths } from "@reddoorla/maintenance/images";
  import { DEFAULT_IMAGE_WIDTHS, imgix, srcset } from "$lib/utils/image";

  type Props = {
    mp4?: string | null;
    webm?: string | null;
    mobileMp4?: string | null;
    poster?: string | null;
    posterWidth?: number | null;
    sizes?: string;
    class?: string;
    controlClass?: string;
    priority?: boolean;
  };

  let {
    mp4,
    webm,
    mobileMp4,
    poster,
    posterWidth,
    sizes = "100vw",
    class: passedClasses = "",
    controlClass = "bottom-4 right-4",
    priority = false,
  }: Props = $props();

  let video = $state<HTMLVideoElement>();
  let playing = $state(false);
  let revealed = $state(false);
  let mounted = $state(false);
  let motionOk = $state(true);
  let userPaused = false;

  const hasSource = $derived(Boolean(mp4 || webm || mobileMp4));
  const posterWidths = $derived(
    cappedWidths({ dimensions: { width: posterWidth ?? 0 } }, DEFAULT_IMAGE_WIDTHS),
  );
  const posterSrc = $derived(imgix(poster, { w: Math.min(1920, posterWidth || 1920) }));
  const posterSrcset = $derived(srcset(poster, posterWidths));
  const fade = $derived(motionOk ? "transition-opacity duration-700 ease-out" : "");

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
    motionOk = !reduce?.matches;
    const onChange = (event: MediaQueryListEvent) => {
      motionOk = !event.matches;
      if (event.matches) pause();
    };
    reduce?.addEventListener?.("change", onChange);

    const el = video;
    if (!el || typeof IntersectionObserver === "undefined") {
      if (motionOk) play();
      return () => reduce?.removeEventListener?.("change", onChange);
    }
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          if (motionOk && !userPaused) play();
        } else {
          pause();
        }
      },
      { rootMargin: "200px 0px" },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      reduce?.removeEventListener?.("change", onChange);
    };
  });

  function toggle() {
    if (playing) {
      userPaused = true;
      pause();
    } else {
      userPaused = false;
      play();
    }
  }
</script>

<svelte:head>
  {#if priority && posterSrc}
    <link
      rel="preload"
      as="image"
      href={posterSrc}
      imagesrcset={posterSrcset}
      imagesizes={sizes}
      fetchpriority="high"
    />
  {/if}
</svelte:head>

{#if posterSrc}
  <img
    src={posterSrc}
    srcset={posterSrcset}
    {sizes}
    alt=""
    fetchpriority={priority ? "high" : "auto"}
    loading={priority ? "eager" : "lazy"}
    decoding="async"
    class="object-cover {passedClasses}"
  />
{/if}
<video
  bind:this={video}
  class="object-cover {revealed || !posterSrc ? 'opacity-100' : 'opacity-0'} {fade} {passedClasses}"
  muted
  loop
  playsinline
  preload="metadata"
  aria-hidden="true"
  tabindex="-1"
  onplay={() => (playing = true)}
  onplaying={() => (revealed = true)}
  onpause={() => (playing = false)}
>
  {#if mobileMp4}<source src={mobileMp4} type="video/mp4" media="(max-width: 767px)" />{/if}
  {#if webm}<source src={webm} type="video/webm" />{/if}
  {#if mp4}<source src={mp4} type="video/mp4" />{/if}
</video>
{#if mounted && hasSource}
  <button
    type="button"
    class="absolute z-10 flex h-10 w-10 items-center justify-center rounded-full bg-primary/80 text-white hover:bg-primary {controlClass}"
    aria-label={playing ? "Pause background video" : "Play background video"}
    onclick={toggle}
  >
    {#if playing}
      <Pause size={18} aria-hidden="true" />
    {:else}
      <Play size={18} aria-hidden="true" />
    {/if}
  </button>
{/if}
