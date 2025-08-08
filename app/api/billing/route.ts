import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import prisma from '@/lib/prisma';

export async function GET() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      subscriptions: true,
      paymentMethods: true,
      transactions: true,
    },
  });

  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }

  return NextResponse.json({
    subscription: user.subscriptions[0] || null,
    paymentMethods: user.paymentMethods,
    transactions: user.transactions,
  });
}

export async function PATCH(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  const { autoRenew } = await req.json();
  const user = await prisma.user.findUnique({ where: { email: session.user.email } });
  if (!user) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 });
  }
  let subscription = await prisma.subscription.findFirst({ where: { userId: user.id } });
  if (subscription) {
    subscription = await prisma.subscription.update({
      where: { id: subscription.id },
      data: { autoRenew },
    });
  } else {
    subscription = await prisma.subscription.create({
      data: { userId: user.id, plan: 'Free', status: 'active', autoRenew },
    });
  }
  return NextResponse.json(subscription);
}
