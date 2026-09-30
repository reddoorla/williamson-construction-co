<script lang="ts">
  import { Menu, X } from "@lucide/svelte";
  import { page } from "$app/state";
  import { trapFocus } from "$lib/actions/trapFocus";
  import { NAV_LINKS } from "$lib/contact";

  let menuOpen = $state(false);
  let menuButton = $state<HTMLButtonElement>();

  const isCurrent = (href: string) =>
    page.url.pathname === href || page.url.pathname.startsWith(`${href}/`);

  const closeMenu = () => (menuOpen = false);
</script>

<header class="wc-header fixed inset-x-0 top-0 z-50">
  <div class="mx-auto flex h-16 max-w-[1280px] items-stretch justify-between bg-white/90">
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
      class="flex w-16 items-center justify-center bg-primary text-white md:hidden"
      aria-label="Open menu"
      aria-controls={menuOpen ? "wc-menu" : undefined}
      aria-expanded={menuOpen}
      onclick={() => (menuOpen = true)}
    >
      <Menu aria-hidden="true" />
    </button>
  </div>
</header>

{#if menuOpen}
  <div
    id="wc-menu"
    class="fixed inset-0 z-[60] flex flex-col items-center justify-center gap-8 bg-primary md:hidden"
    role="dialog"
    aria-modal="true"
    aria-label="Menu"
    use:trapFocus={{ onEscape: closeMenu, restoreFocus: () => menuButton }}
  >
    <button
      type="button"
      class="absolute top-4 right-4 p-2 text-white"
      aria-label="Close menu"
      onclick={closeMenu}
    >
      <X aria-hidden="true" />
    </button>
    {#each NAV_LINKS as link (link.href)}
      <a
        href={link.href}
        aria-current={isCurrent(link.href) ? "page" : undefined}
        class="text-2xl text-white"
        onclick={closeMenu}>{link.label}</a
      >
    {/each}
  </div>
{/if}
