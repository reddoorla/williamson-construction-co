<script lang="ts">
  import type { Snippet } from "svelte";
  import { buttonClass, type ButtonVariant, type Ground } from "$lib/button-styles";

  type Props = {
    href: string;
    variant?: ButtonVariant;
    grounds?: readonly Ground[];
    class?: string;
    download?: boolean;
    children: Snippet;
  };

  let {
    href,
    variant = "gold",
    grounds = [],
    class: passedClasses = "",
    download,
    children,
  }: Props = $props();
</script>

<a {href} class={buttonClass(variant, passedClasses, grounds)} download={download || undefined}>
  {@render children()}
</a>
