import {NextResponse} from "next/server";
import {prisma} from "@/prisma/prisma-client";
import {OrderStatus} from "@prisma/client";
import axios from 'axios';

export async function GET() {
  try {
    const pendingOrders = await prisma.order.findMany({
      where: {
        status: OrderStatus.PENDING,
        paymentId: {
          not: null,
        },
      },
    });

    console.log(`Found ${pendingOrders.length} pending orders to check`);

    const results = [];

    for (const order of pendingOrders) {
      try {
        const { data } = await axios.get(
          `https://api.monobank.ua/api/merchant/invoice/status?invoiceId=${order.paymentId}`,
          {
            headers: {
              'X-Token': process.env.MONOBANK_TOKEN!,
            },
          }
        );

        console.log(`Order #${order.id} payment status:`, data.status);

        let newStatus: OrderStatus;

        switch (data.status) {
          case 'success':
            newStatus = OrderStatus.SUCCEEDED;
            break;
          case 'failure':
          case 'expired':
          case 'reversed':
            newStatus = OrderStatus.CANCELLED;
            break;
          default:
            newStatus = OrderStatus.PENDING;
        }

        if (newStatus !== OrderStatus.PENDING) {
          await prisma.order.update({
            where: {
              id: order.id,
            },
            data: {
              status: newStatus,
            },
          });

          console.log(`Order #${order.id} status updated to ${newStatus}`);
        }

        results.push({
          orderId: order.id,
          oldStatus: OrderStatus.PENDING,
          newStatus: newStatus,
          paymentStatus: data.status,
        });

      } catch (error: any) {
        console.error(`Error checking order #${order.id}:`, error.response?.data || error.message);
        results.push({
          orderId: order.id,
          error: error.message,
        });
      }
    }

    return NextResponse.json({
      success: true,
      checkedOrders: pendingOrders.length,
      results: results,
    });

  } catch (error: any) {
    console.error('[Checkout Callback] Error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}
