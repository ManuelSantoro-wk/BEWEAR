"use client";

import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  Truck,
  House,
  ShoppingBag,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { authClient } from "@/lib/auth-client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { Cart } from "./cart";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="flex items-center justify-between p-5">
      <Link href="/">
        <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
      </Link>

      <div className="flex items-center gap-3">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <MenuIcon />
            </Button>
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="px-5">
              {session?.user ? (
                <>
                  <div className="flex justify-between space-y-6">
                    <div className="flex items-center gap-3">
                      <Avatar>
                        <AvatarImage
                          src={session?.user?.image as string | undefined}
                        />
                        <AvatarFallback>
                          {session?.user?.name?.split(" ")?.[0]?.[0]}
                          {session?.user?.name?.split(" ")?.[1]?.[0]}
                        </AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-semibold">{session?.user?.name}</h3>
                        <span className="text-muted-foreground block text-xs">
                          {session?.user?.email}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="mx-auto my-[20px] h-px w-8/9 border-0 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ml-[15px]">
                    <nav>
                      <Link
                        href="/"
                        className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition"
                      >
                        <House size={18} />
                        <span>Início</span>
                      </Link>
                    </nav>
                    <nav>
                      <Link
                        href="/my-orders"
                        className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition"
                      >
                        <Truck size={18} />
                        <span>Os meus pedidos</span>
                      </Link>
                    </nav>
                    <nav>
                      <Link
                        href="/cart/identification"
                        className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition"
                      >
                        <ShoppingBag size={18} />
                        <span>O meu saco</span>
                      </Link>
                    </nav>
                  </div>

                  <div className="mx-auto my-[20px] h-px w-8/9 border-0 bg-gray-200 dark:bg-gray-700"></div>
                  <div className="ml-[15px]">
                    <nav>
                      <Link
                        href="/category/camisetas"
                        className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition"
                      >
                        <span>T-shirts</span>
                      </Link>
                    </nav>
                    <nav>
                      <Link
                        href="/category/bermuda-shorts"
                        className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition"
                      >
                        <span>Calções</span>
                      </Link>
                    </nav>
                    <nav>
                      <Link
                        href="/category/calas"
                        className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition"
                      >
                        <span>Calças</span>
                      </Link>
                    </nav>
                  </div>
                  <div className="mx-auto my-[20px] h-px w-8/9 border-0 bg-gray-200 dark:bg-gray-700"></div>
                  <a
                    className="hover:bg-accent flex cursor-pointer items-center gap-[10px] rounded-lg px-5 py-2.5 text-sm text-[#63666A] transition"
                    onClick={() => authClient.signOut()}
                  >
                    <LogOutIcon />
                    <span>Sair da Conta</span>
                  </a>
                </>
              ) : (
                <>
                  <div className="flex items-center justify-between">
                    <h2 className="m-0 flex items-center font-semibold">
                      Olá. Faça seu login!
                    </h2>
                    <a
                      href="/authentication"
                      className="flex items-center rounded-lg bg-[#5131E8] px-5 py-2.5 text-sm font-medium text-white"
                    >
                      <span className="mr-2">Login</span>
                      <LogInIcon size={16} />
                    </a>
                  </div>
                  <div className="mx-auto my-[20px] h-px w-4/5 border-0 bg-gray-200 dark:bg-gray-700"></div>
                </>
              )}
            </div>
          </SheetContent>
        </Sheet>
        <Cart />
      </div>
    </header>
  );
};
