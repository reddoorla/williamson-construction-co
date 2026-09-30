<script lang="ts">
  import type { Content } from "@prismicio/client";
  import WcButton from "$lib/components/WcButton.svelte";
  import { hrefOf } from "$lib/links";
  import {
    PLAN_ACTIVE_FILL,
    PLAN_DISC_FILL,
    PLAN_FILL,
    PLAN_SHAPES,
    PLAN_VIEWBOX,
    nextStep,
  } from "$lib/plan-shapes";

  let { slice }: { slice: Content.OurPlanSlice } = $props();

  const steps = $derived(slice.items.slice(0, PLAN_SHAPES.length));
  let active = $state(0);
  const tabs: SVGGElement[] = [];

  function onKeydown(event: KeyboardEvent) {
    const next = nextStep(active, event.key, steps.length);
    if (next === null) return;
    event.preventDefault();
    active = next;
    tabs[next]?.focus();
  }
</script>

<section
  data-slice-type={slice.slice_type}
  data-slice-variation={slice.variation}
  class="wc-shell pb-16"
>
  {#if slice.primary.heading}
    <h2 class="wc-h2 mb-16 text-center text-primary">{slice.primary.heading}</h2>
  {/if}
  <div
    class="flex flex-col items-center gap-8 bg-primary px-[4%] py-12 lg:flex-row lg:px-0 lg:py-0"
  >
    <div class="w-full lg:w-[60%] lg:p-8">
      <svg
        viewBox={PLAN_VIEWBOX}
        class="wc-plan mx-auto my-8 block w-full max-w-[620px]"
        role="tablist"
        aria-label="Steps of our plan"
        tabindex="-1"
      >
        {#each steps as step, i (i)}
          {@const { shape, disc } = PLAN_SHAPES[i]}
          <g
            bind:this={tabs[i]}
            role="tab"
            id="{slice.id}-tab-{i}"
            tabindex={active === i ? 0 : -1}
            aria-selected={active === i}
            aria-controls="{slice.id}-step"
            aria-label="Step {i + 1}: {step.title}"
            class="cursor-pointer outline-none"
            onclick={() => (active = i)}
            onkeydown={onKeydown}
          >
            {#if shape.kind === "polygon"}
              <polygon
                points={shape.points}
                fill={active === i ? PLAN_ACTIVE_FILL : PLAN_FILL}
                class="transition-[fill] duration-300 hover:opacity-60"
              />
            {:else}
              <rect
                x={shape.x}
                y={shape.y}
                width={shape.width}
                height={shape.height}
                transform={shape.transform}
                fill={active === i ? PLAN_ACTIVE_FILL : PLAN_FILL}
                class="transition-[fill] duration-300 hover:opacity-60"
              />
            {/if}
            <circle
              cx={disc.cx}
              cy={disc.cy}
              r="18.39"
              fill={PLAN_DISC_FILL}
              class="transition-opacity duration-[400ms] hover:opacity-60"
            />
            <text
              x={disc.cx}
              y={disc.cy}
              fill="#ffffff"
              font-size="18"
              text-anchor="middle"
              dominant-baseline="central"
              aria-hidden="true">{i + 1}</text
            >
          </g>
        {/each}
      </svg>
    </div>
    {#if steps[active]}
      {@const step = steps[active]}
      {@const first = hrefOf(step.button_link)}
      {@const second = hrefOf(step.button2_link)}
      <div
        id="{slice.id}-step"
        role="tabpanel"
        aria-labelledby="{slice.id}-tab-{active}"
        class="w-full lg:w-[40%] lg:pr-[8%]"
      >
        <div class="flex h-20 w-20 items-center justify-center rounded-full bg-gold">
          <span class="text-5xl text-navy" aria-hidden="true">{active + 1}</span>
        </div>
        <h3 class="wc-h2 mt-8 text-left text-white">{step.title}</h3>
        <p class="mt-2 text-2xl leading-[1.6em] text-white">{step.body}</p>
        <div class="mt-12 flex flex-wrap gap-8">
          {#if first && step.button_label}<WcButton href={first}>{step.button_label}</WcButton>{/if}
          {#if second && step.button2_label}
            <WcButton href={second} variant="outline-light">{step.button2_label}</WcButton>
          {/if}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .wc-plan g:focus-visible :is(polygon, rect) {
    stroke: #ffffff;
    stroke-width: 6;
  }
</style>
