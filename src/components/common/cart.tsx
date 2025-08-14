"use client";
import { ShoppingBag } from "lucide-react"; // Bag para o ícone de saco
import Link from "next/link";

import { Button } from "@/components/ui/button";
import { formatCentsToBRL } from "@/helpers/money";
import { useCart } from "@/hooks/queries/use-cart";

import { ScrollArea } from "../ui/scroll-area";
import { Separator } from "../ui/separator";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import CartItem from "./cart-item";

export const Cart = () => {
  const { data: cart } = useCart();

  const isEmpty = !cart?.items || cart.items.length === 0;

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          className="cursor-pointer border-none bg-transparent text-black hover:bg-transparent focus:ring-0 focus:outline-none"
          size="icon"
        >
          <ShoppingBag />
        </Button>
      </SheetTrigger>
      <SheetContent className="rounded-l-lg [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:border-white [&>button]:bg-[#EFEFEF] [&>button]:p-[5px]">
        <SheetHeader>
          <SheetTitle>Saco de Compras</SheetTitle>
        </SheetHeader>

        <div className="flex h-full flex-col px-5 pb-5">
          {isEmpty ? (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-gray-500">
              <ShoppingBag className="h-12 w-12" />
              <p>O teu saco está vazio.</p>
            </div>
          ) : (
            <>
              <div className="flex h-full max-h-full flex-col overflow-hidden">
                <ScrollArea className="h-full">
                  <div className="flex h-full flex-col gap-8">
                    {cart.items.map((item) => (
                      <CartItem
                        key={item.id}
                        id={item.id}
                        productVariantId={item.productVariant.id}
                        productName={item.productVariant.product.name}
                        productVariantName={item.productVariant.name}
                        productVariantImageUrl={item.productVariant.imageUrl}
                        productVariantPriceInCents={
                          item.productVariant.priceInCents
                        }
                        quantity={item.quantity}
                      />
                    ))}
                  </div>
                </ScrollArea>
              </div>

              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between text-xs font-medium">
                  <p>Subtotal</p>
                  <p className="text-[#656565]">
                    {formatCentsToBRL(cart.totalPriceInCents ?? 0)}
                  </p>
                </div>

                <Separator />

                <Button className="mt-5 rounded-full bg-[#5131E8] p-5" asChild>
                  <Link href="/cart/identification">Finalizar a compra</Link>
                </Button>

                <nav className="flex items-center justify-center">
                  <Link href="/" className="text-[14px] font-medium underline">
                    Continuar a comprar
                  </Link>
                </nav>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};
