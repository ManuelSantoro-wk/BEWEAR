import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

import { db } from "@/db";
import { orderTable } from "@/db/schema";
import { getStripeInstance } from "@/lib/stripe-config";

export const GET = async (request: Request) => {
  try {
    const stripe = getStripeInstance();

    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json(
        { error: "Session ID is required" },
        { status: 400 },
      );
    }

    // Buscar a sessão no Stripe
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    if (!session) {
      return NextResponse.json({ error: "Session not found" }, { status: 404 });
    }

    const orderId = session.metadata?.orderId;
    if (!orderId) {
      return NextResponse.json(
        { error: "Order ID not found in session" },
        { status: 400 },
      );
    }

    // Buscar o pedido no banco de dados
    const order = await db.query.orderTable.findFirst({
      where: eq(orderTable.id, orderId),
    });

    if (!order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Determinar o status real do pedido
    let actualStatus = order.status;

    // Se o Stripe confirma que foi pago mas o banco ainda mostra pending,
    // atualizar para paid
    if (session.payment_status === "paid" && order.status === "pending") {
      try {
        await db
          .update(orderTable)
          .set({ status: "paid" })
          .where(eq(orderTable.id, orderId));
        actualStatus = "paid";
        console.log(`Auto-updated order ${orderId} status to paid`);
      } catch (error) {
        console.error("Error updating order status:", error);
      }
    }

    return NextResponse.json({
      orderId,
      status: actualStatus,
      stripePaymentStatus: session.payment_status,
      stripeStatus: session.status,
      metadata: session.metadata,
    });
  } catch (error) {
    console.error("Error checking session:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
};
