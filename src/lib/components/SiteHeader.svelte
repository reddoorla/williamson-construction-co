<script lang="ts">
  import { page } from "$app/state";
  import { NAV_LINKS } from "$lib/contact";

  let menuOpen = $state(false);
  let menuButton = $state<HTMLButtonElement>();

  const isCurrent = (href: string) =>
    page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);

  const closeMenu = () => (menuOpen = false);

  let header = $state<HTMLElement>();

  const onFocusout = () => {
    setTimeout(() => {
      const now = document.activeElement;
      if (!menuOpen || !header || !now || now === document.body) return;
      if (!header.contains(now)) closeMenu();
    });
  };

  const onKeydown = (event: KeyboardEvent) => {
    if (event.key !== "Escape" || !menuOpen) return;
    closeMenu();
    menuButton?.focus();
  };
</script>

<svelte:window onkeydown={onKeydown} />

<header
  class="wc-header fixed inset-x-0 top-0 z-50 mx-auto max-w-[1280px]"
  bind:this={header}
  onfocusout={onFocusout}
>
  <div class="relative z-10 flex h-16 items-stretch justify-between bg-white/90">
    <a href="/" class="block h-full" aria-label="Williamson Construction, home">
      <img src="/images/wcc-header-logo.svg" alt="" class="h-full w-auto" />
    </a>
    <nav aria-label="Main" class="hidden w-1/3 items-center px-6 max-[992px]:w-1/2 md:flex">
      <ul
        class="flex w-full items-center justify-between before:block before:w-4 before:content-['']"
      >
        {#each NAV_LINKS as link (link.href)}
          <li>
            <a
              href={link.href}
              aria-current={isCurrent(link.href) ? "page" : undefined}
              class="block rounded-[10px] px-[5px] py-0.5 text-[1.2rem] leading-5 font-medium whitespace-nowrap text-primary aria-[current=page]:underline aria-[current=page]:underline-offset-4"
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
            : 'opacity-100 delay-[900ms] duration-500'}"
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
  <nav
    id="wc-menu"
    aria-label="Menu"
    data-open={menuOpen}
    inert={!menuOpen}
    class="absolute inset-x-0 top-16 bg-white motion-reduce:transition-none md:hidden {menuOpen
      ? 'visible translate-y-0 [transition:translate_0.5s_ease,visibility_0s]'
      : 'invisible -translate-y-[15rem] [transition:translate_0.5s_ease,visibility_0s_linear_0.5s]'}"
  >
    <ul class="flex flex-col items-center justify-center">
      {#each NAV_LINKS as link (link.href)}
        <li>
          <a
            href={link.href}
            aria-current={isCurrent(link.href) ? "page" : undefined}
            class="block rounded-[10px] p-4 text-[1.2rem] leading-5 font-medium text-primary"
            onclick={closeMenu}>{link.label}</a
          >
        </li>
      {/each}
    </ul>
  </nav>
</header>
