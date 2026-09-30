<script lang="ts">
  import { page } from "$app/state";
  import { NAV_LINKS } from "$lib/contact";

  let menuOpen = $state(false);
  let menuButton = $state<HTMLButtonElement>();

  const isCurrent = (href: string) =>
    page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);

  const closeMenu = () => (menuOpen = false);

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !menuOpen) return;
    closeMenu();
    menuButton?.focus();
  };
</script>

<svelte:window onkeydown={onKeydown} />

<header class="wc-header fixed inset-x-0 top-0 z-50 mx-auto max-w-[1280px]">
  <div class="relative z-10 flex h-16 items-stretch justify-between bg-white/90">
    <a href="/" class="block h-full" aria-label="Williamson Construction, home">
      <img src="/images/wcc-header-logo.svg" alt="" class="h-full w-auto" />
    </a>
    <nav aria-label="Main" class="hidden items-center pr-6 md:flex">
      <ul class="flex gap-2">
        {#each NAV_LINKS as link (link.href)}
          <li>
            <a
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              class="block px-3 py-2 text-base whitespace-nowrap text-primary aria-[current=page]:underline aria-[current=page]:underline-offset-4"
              >{link.label}</a
            >
          </li>
        {/each}
      </ul>
    </nav>
    <button
      bind:this={menuButton}
      type="button"
      class="group flex w-16 shrink-0 items-center justify-center bg-primary md:hidden"
      aria-label="Menu"
      aria-controls="wc-menu"
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = !menuOpen)}
    >
      <span class="relative block h-8 w-8 transition-opacity duration-200 group-hover:opacity-60">
        <img
          src="/images/menu-icon_white.svg"
          alt=""
          class="absolute inset-0 h-8 w-8 transition-opacity ease-[ease] {menuOpen
            ? 'opacity-0 duration-500'
            : 'opacity-100 delay-200 duration-500'}"
        />
        <img
          src="/images/close-icon_white.svg"
          alt=""
          class="absolute inset-0 h-8 w-8 transition-opacity ease-[ease] {menuOpen
            ? 'opacity-100 delay-200 duration-700'
            : 'opacity-0 duration-700'}"
        />
      </span>
    </button>
  </div>
  <div
    id="wc-menu"
    data-open={menuOpen}
    class="absolute inset-x-0 top-16 flex flex-col items-center justify-center bg-white motion-reduce:transition-none md:hidden {menuOpen
      ? 'visible translate-y-0 [transition:transform_0.5s_ease,visibility_0s]'
      : 'invisible -translate-y-[15rem] [transition:transform_0.5s_ease,visibility_0s_linear_0.5s]'}"
  >
    {#each NAV_LINKS as link (link.href)}
      <a
        href={link.href}
        aria-current={isCurrent(link.href) ? "page" : undefined}
        class="rounded-[10px] p-4 text-[1.2rem] leading-5 font-medium text-primary"
        onclick={closeMenu}>{link.label}</a
      >
    {/each}
  </div>
</header>
