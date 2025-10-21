import axios from 'axios';

export interface MonobankPaymentResponse {
  invoiceId: string;
  pageUrl: string;
}

export async function createPayment(amount: number, orderId: number): Promise<MonobankPaymentResponse> {
  try {
    const { data } = await axios.post(
      process.env.MONOBANK_API_URL as string,
      {
        amount: amount * 100,
        ccy: 980,
        merchantPaymInfo: {
          reference: orderId.toString(),
          destination: 'Оплата замовлення #' + orderId,
        },
      },
      {
        headers: {
          'X-Token': process.env.MONOBANK_TOKEN!,
        },
      }
    );

    console.log(data);

    return {
      invoiceId: data.invoiceId,
      pageUrl: data.pageUrl,
    };
  } catch (error: any) {
    console.error('Monobank error:', error.response?.data);
    throw error;
  }
}