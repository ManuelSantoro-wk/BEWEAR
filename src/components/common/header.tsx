"use client";

import {
  LogInIcon,
  LogOutIcon,
  MenuIcon,
  User,
  ShoppingBag,
  Truck,
  House,
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
import { Separator } from "@radix-ui/react-separator";

export const Header = () => {
  const { data: session } = authClient.useSession();
  return (
    <header className="">
      {/*  Mobile */}
      <div className="flex items-center justify-between p-5 md:hidden">
        <Link href="/">
          <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
        </Link>

        <div className="flex items-center gap-3">
          <Cart />

          <div className="h-6 w-px bg-gray-300"></div>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                className="cursor-pointer border-none bg-transparent text-black hover:bg-transparent focus:ring-0 focus:outline-none"
                size="icon"
              >
                <MenuIcon />
              </Button>
            </SheetTrigger>
            <SheetContent className="rounded-l-lg [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:border-white [&>button]:bg-[#EFEFEF] [&>button]:p-[5px]">
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
                          <h3 className="font-semibold">
                            {session?.user?.name}
                          </h3>
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
                  <div>
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold">Olá. Faça seu login!</h2>
                      <Button size="icon" asChild className="px-10 text-white">
                        <Link href="/authentication">
                          <a>Login</a>
                          <LogInIcon />
                        </Link>
                      </Button>
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
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
      {/*  Desktop */}
      <div className="hidden md:block md:h-[15vh]">
        {/* Linha Superior */}
        <div className="grid grid-cols-3 items-center p-5">
          {/* Esquerda (Apenas o User que está com o login feito) */}
          <div className="flex items-center gap-3">
            <Sheet>
              <SheetTrigger asChild className="rounded-l-lg">
                <Button
                  className="cursor-pointer bg-white text-black"
                  size="icon"
                >
                  <User />
                </Button>
              </SheetTrigger>
              <SheetContent
                className="rounded-r-lg [&>button]:cursor-pointer [&>button]:rounded-full [&>button]:border-white [&>button]:bg-[#EFEFEF] [&>button]:p-[5px]"
                side="left"
              >
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
                            <h3 className="font-semibold">
                              {session?.user?.name}
                            </h3>
                            <span className="text-muted-foreground block text-xs">
                              {session?.user?.email}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="mx-auto my-[20px] h-px w-8/9 border-0 bg-gray-200 dark:bg-gray-700"></div>
                      <nav className="ml-[15px]">
                        <Link
                          href="/my-orders"
                          className="hover:bg-accent flex items-center gap-3 rounded-md p-2 transition"
                        >
                          <Truck size={18} />
                          <span>Os meus pedidos</span>
                        </Link>
                      </nav>
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
                    <div className="flex items-center justify-between">
                      <h2 className="font-semibold">Olá. Faça seu login!</h2>
                      <Button size="icon" asChild className="px-10 text-white">
                        <Link href="/authentication">
                          <a>Login</a>
                          <LogInIcon />
                        </Link>
                      </Button>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
            <div>
              {session?.user ? (
                <h3 className="font-semibold">Olá, {session.user.name}!</h3>
              ) : (
                <h3 className="font-semibold">Olá, faça o seu login!</h3>
              )}
            </div>
          </div>
          {/* Centro - Logo */}
          <div className="flex justify-center">
            <Link href="/">
              <Image src="/logo.svg" alt="BEWEAR" width={100} height={26.14} />
            </Link>
          </div>
          {/* Direita */}
          <div className="flex justify-end">
            <div className="flex cursor-pointer items-center gap-3">
              <Cart />
            </div>
          </div>
        </div>
        {/* Linha inferior Links */}
        <nav className="flex justify-center gap-20 pt-1 pb-0">
          <Link href="/my-orders">T-shirts</Link>
          <Link href="/my-orders">Calças</Link>
          <Link href="/my-orders">Sapatilhas</Link>
        </nav>
      </div>
    </header>
  );
};
