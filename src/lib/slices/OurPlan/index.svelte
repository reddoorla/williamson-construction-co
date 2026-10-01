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

  const PLAN_PANEL_PAD = ["pr-[10%]", "pr-[8%]", "pr-[8%]", "pr-[20%]"];

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

<section data-slice-type={slice.slice_type} data-slice-variation={slice.variation}>
  {#if slice.primary.heading}
    <h2 class="wc-h2 mb-8 pb-8 text-center text-primary">{slice.primary.heading}</h2>
  {/if}
  <div
    class="mx-auto mb-16 flex max-w-[1280px] flex-wrap items-center justify-between bg-[#004a7e] max-[992px]:px-[10%] max-[768px]:px-[4%]"
  >
    <div class="w-[60%] p-8 max-[992px]:w-full max-[768px]:p-0">
      <div class="my-8 text-[14px] leading-5">
        <svg
          viewBox={PLAN_VIEWBOX}
          class="wc-plan inline w-full align-baseline"
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
                  class="transition-[fill] duration-[400ms] ease-[ease] hover:opacity-60"
                />
              {:else}
                <rect
                  x={shape.x}
                  y={shape.y}
                  width={shape.width}
                  height={shape.height}
                  transform={shape.transform}
                  fill={active === i ? PLAN_ACTIVE_FILL : PLAN_FILL}
                  class="transition-[fill] duration-[400ms] ease-[ease] hover:opacity-60"
                />
              {/if}
              <circle
                cx={disc.cx}
                cy={disc.cy}
                r="18.39"
                fill={PLAN_DISC_FILL}
                class="transition-opacity duration-[400ms] ease-[ease] hover:opacity-60"
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
    </div>
    {#if steps[active]}
      {@const step = steps[active]}
      {@const first = hrefOf(step.button_link)}
      {@const second = hrefOf(step.button2_link)}
      <div class="mx-auto w-[40%] max-[992px]:w-full">
        <div
          class="relative mb-16 h-96 pl-[8%] max-[992px]:flex max-[992px]:h-auto max-[992px]:min-h-96 max-[992px]:pl-0"
        >
          <div
            id="{slice.id}-step"
            role="tabpanel"
            aria-labelledby="{slice.id}-tab-{active}"
            class="absolute flex h-full w-full flex-col justify-between max-[992px]:relative max-[992px]:h-auto {PLAN_PANEL_PAD[
              active
            ] ?? 'pr-[8%]'}"
          >
            <div class="flex h-20 w-20 items-center justify-center rounded-full bg-gold">
              <span class="-mt-4 text-[3rem] leading-5 text-navy" aria-hidden="true"
                >{active + 1}</span
              >
            </div>
            <div>
              <h3 class="wc-h2 text-left text-white">{step.title}</h3>
              <p class="mb-[10px] text-[1.5rem] leading-[1.6em] text-white">{step.body}</p>
            </div>
            <div class="mt-6 flex gap-8 pt-6 max-[992px]:flex-wrap">
              {#if first && step.button_label}<WcButton href={first}>{step.button_label}</WcButton
                >{/if}
              {#if second && step.button2_label}
                <WcButton href={second} variant="outline-light">{step.button2_label}</WcButton>
              {/if}
            </div>
          </div>
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
