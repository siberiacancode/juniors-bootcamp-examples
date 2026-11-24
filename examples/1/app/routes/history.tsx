import { useQueryClient } from '@tanstack/react-query';
import { RefreshCwIcon } from 'lucide-react';
import { Link } from 'react-router';
import { toast } from 'sonner';

import {
  getApiDeliveryOrdersQueryKey,
  useGetApiDeliveryOrdersQuery,
  usePutApiDeliveryOrdersCancelMutation
} from '@/generated/api';
import { Container } from '@/layout';
import { formatAddress } from '@/shared/lib/format';
import { Button } from '@/shared/ui/button';
import { Separator } from '@/shared/ui/separator';
import { H4, Large, Small } from '@/shared/ui/typography';

const STATUS_MAPA: Record<string, string> = {
  in_processing: 'Processing',
  waiting_courier: 'Waiting for courier',
  success: 'Delivered',
  on_my_way: 'On the way',
  canceled: 'Canceled'
};

const History = () => {
  const deliveryOrderQuery = useGetApiDeliveryOrdersQuery();
  const cancelDeliveryMutation = usePutApiDeliveryOrdersCancelMutation();
  const queryClient = useQueryClient();

  const orders = deliveryOrderQuery.data?.data?.orders ?? [];

  const handleCancelDelivery = (orderId: string) =>
    cancelDeliveryMutation.mutate(
      {
        body: {
          orderId
        }
      },
      {
        onSuccess: () => {
          toast.success('Order canceled!');
          queryClient.invalidateQueries({ queryKey: [getApiDeliveryOrdersQueryKey] });
        },
        onError: () => toast.error('Failed to cancel order')
      }
    );

  if (deliveryOrderQuery.isLoading) {
    return (
      <Container>
        <H4 className='mt-5'>Shipment history</H4>
        <div className='flex flex-col items-center justify-center'>
          <img alt='loading' className='mt-20 w-50' src='/deliver-calc.png' />
          <Large>Loading your history...</Large>
        </div>
      </Container>
    );
  }

  if (deliveryOrderQuery.isError) {
    return (
      <Container>
        <div className='w-full'>
          <H4 className='mt-5'>Shipment history</H4>
          <div className='flex flex-col items-center justify-center gap-5'>
            <img alt='error' className='mt-20 w-50' src='/error-feedback.png' />
            <Large>Failed to load history</Large>
            <Button onClick={() => window.location.reload()}>
              <RefreshCwIcon size={20} />
              Refresh page
            </Button>
          </div>
        </div>
      </Container>
    );
  }

  if (deliveryOrderQuery.isSuccess && orders.length === 0) {
    return (
      <Container>
        <H4 className='mt-5'>Shipment history</H4>
        <div className='flex flex-col items-center justify-center'>
          <img alt='loading' className='mt-20 w-50' src='/deliver-home.png' />
          <Large className='mt-8'>You haven't sent anything yet.</Large>
          <Small className='mt-2 font-light'>
            Place your first{' '}
            <Link className='text-brand font-medium hover:opacity-80' to='/'>
              order.
            </Link>{' '}
          </Small>
        </div>
      </Container>
    );
  }

  return (
    <Container>
      <H4 className='mt-5'>Shipment history</H4>
      <div className='mt-6'>
        {orders.map((order) => (
          <div key={order._id}>
            <div className='flex flex-col gap-1 py-3 md:hidden'>
              <div className='flex items-center justify-between'>
                <Small className='font-medium'>{STATUS_MAPA[order.status] ?? order.status}</Small>
                {(order.status as unknown as string) !== 'canceled' && (
                  <Button
                    size='sm'
                    variant='outline'
                    onClick={() => handleCancelDelivery(order._id)}
                  >
                    Cancel
                  </Button>
                )}
              </div>
              <Small className='text-muted-foreground'>
                {formatAddress(order.receiverAddress)}
              </Small>
              <Small className='text-muted-foreground'>{order._id}</Small>
            </div>
            <div className='hidden h-[60px] grid-cols-8 items-center md:grid'>
              <Small className='col-span-1'>{STATUS_MAPA[order.status] ?? order.status}</Small>
              <Small className='col-span-3'>{formatAddress(order.receiverAddress)}</Small>
              <Small className='col-span-3'>{order._id}</Small>
              <div className='col-span-1'>
                {(order.status as unknown as string) !== 'canceled' && (
                  <Button variant='outline' onClick={() => handleCancelDelivery(order._id)}>
                    Cancel
                  </Button>
                )}
              </div>
            </div>
            <Separator />
          </div>
        ))}
      </div>
    </Container>
  );
};

export default History;
