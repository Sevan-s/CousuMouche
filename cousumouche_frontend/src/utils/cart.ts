import { Article } from "./interfaces/articleInterfaces";

type AnyObj = Record<string, any>;

export const CART_KEY = "cm_cart";

export const adaptCartToPanier = (items: AnyObj[]): Article[] => {
  return items.map((it) => {
    const price = Number(it.price ?? 0);
    const quantity = Number(it.quantity ?? 1);

    const image =
      it.image ??
      it.product?.imageUrls?.[0] ??
      it.product?.imageUrl ??
      "";

    const tissus = Array.isArray(it.fabricSelected)
      ? it.fabricSelected
          .map((f: any) => (typeof f === "string" ? f : f?.name ?? ""))
          .filter(Boolean)
          .join(", ")
      : (it.fabricSelected ?? "");

    const broderieFirstName = it.embroidery ?? "";

    return {
      id: it.id ?? String(Date.now()) + Math.random().toString(16).slice(2),
      name: it.name,
      price,
      quantity,
      subTotal: price * quantity,
      image,
      tissus,
      broderieFirstName,
      ...it,
    } as Article;
  });
};