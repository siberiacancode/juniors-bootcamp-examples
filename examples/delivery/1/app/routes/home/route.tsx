import { useRef, useState } from 'react';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';

import type { DeliveryPackageType, DeliveryPoint } from '@/generated/api';

import { useGetApiDeliveryOrderByOrderIdMutation } from '@/generated/api';
import { Container } from '@/layout';
import { Footer } from '@/layout/footer';
import { Button } from '@/shared/ui/button';
import { Input } from '@/shared/ui/input';
import { H3, P } from '@/shared/ui/typography';

import { CityCombobox } from './components/city-combobox';
import { OrderDialog } from './components/order-dialog';
import { PackageSizeCombobox } from './components/package-size-combobox';

const Home = () => {
  const navigate = useNavigate();

  const [senderPoint, setSenderPoint] = useState<DeliveryPoint | null>(null);
  const [receiverPoint, setReceiverPoint] = useState<DeliveryPoint | null>(null);
  const [sizePackage, setSizePackage] = useState<DeliveryPackageType | null>(null);

  const [dialogOpen, setDialogOpen] = useState(false);

  const orderIdRef = useRef('');

  const searchOrderMutation = useGetApiDeliveryOrderByOrderIdMutation();

  const handleCalculateDelivery = () => {
    const params = new URLSearchParams({
      senderPoint: JSON.stringify(senderPoint),
      receiverPoint: JSON.stringify(receiverPoint),
      size: JSON.stringify(sizePackage)
    });

    navigate(`/delivery?${params}`);
  };

  const handleSearchOrder = () => {
    if (!orderIdRef.current.trim()) return;

    searchOrderMutation.mutate(
      { path: { orderId: orderIdRef.current } },
      {
        onSuccess: () => setDialogOpen(true),
        onError: () => toast.error('Order not found')
      }
    );
  };

  const disabled = !senderPoint || !receiverPoint || !sizePackage;
  const order = searchOrderMutation.data?.data?.order;

  return (
    <Container>
      <div className='mt-5 flex grid-cols-2 flex-col gap-4 md:grid'>
        <div className='rounded-3xl border p-4 lg:p-8'>
          <H3 className='mb-6'>Calculate delivery</H3>
          <div className='flex flex-col gap-10'>
            <CityCombobox
              colorPoint='green'
              label='Sender city'
              placeholder='Specify sender city'
              onChange={setSenderPoint}
            />
            <CityCombobox
              label='Destination city'
              placeholder='Specify destination city'
              onChange={setReceiverPoint}
            />
            <PackageSizeCombobox onChange={setSizePackage} />
            <Button
              className='bg-brand text-white'
              disabled={disabled}
              size='lg'
              onClick={handleCalculateDelivery}
            >
              Calculate
            </Button>
          </div>
        </div>
        <div className='flex h-full flex-col gap-4'>
          <div className="relative h-[50%] rounded-3xl border bg-[#6AC66A] bg-[url('/bg-muted.png')] bg-cover bg-center p-4 lg:p-8">
            <H3 className='text-white'>Free delivery</H3>
            <P className='font-normal text-white'>for referring a friend</P>
            <img
              alt='courier'
              className='absolute top-0 right-0 h-full w-auto'
              src='/deliver.png'
            />
          </div>
          <div className="h-[50%] rounded-3xl border bg-[url('/bg-muted-2.png')] bg-cover bg-center p-4 lg:p-8">
            <H3 className='mb-6 text-white'>Track package</H3>
            <div className='flex items-center gap-2'>
              <Input
                className='bg-white! text-black! placeholder:text-gray-400!'
                placeholder='Order number'
                onChange={(e) => (orderIdRef.current = e.target.value)}
              />
              <Button
                className='w-[5rem]'
                disabled={searchOrderMutation.isPending}
                size='lg'
                onClick={handleSearchOrder}
              >
                Find
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
      <OrderDialog open={dialogOpen} order={order!} onOpenChange={setDialogOpen} />
    </Container>
  );
};

export default Home;
