import { zodResolver } from '@hookform/resolvers/zod';
import { useMediaQuery } from '@siberiacancode/reactuse';
import { LogOutIcon } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router';
import { toast } from 'sonner';
import { withMask } from 'use-mask-input';
import { z } from 'zod';

import { useAuth } from '@/contexts';
import { usePatchApiUsersProfileMutation } from '@/generated/api';
import { Container } from '@/layout';
import { Form, FormInput } from '@/shared/form';
import { useAuthTokenLocalStorage, useUserLocalStorage } from '@/shared/localltorage';
import { Button } from '@/shared/ui/button';
import { Spinner } from '@/shared/ui/spinner';
import { H2 } from '@/shared/ui/typography';

const profileSchema = z.object({
  lastname: z
    .string()
    .min(2, 'Last name must contain at least 2 characters')
    .max(20, 'Last name is too long'),
  firstname: z
    .string()
    .min(2, 'First name must contain at least 2 characters')
    .max(20, 'First name is too long'),
  middlename: z.string().max(20, 'Middle name is too long').optional().or(z.literal('')),
  email: z.email('Invalid email'),
  city: z.string().min(2, 'Specify a city').max(100, 'City name is too long')
});

type ProfileFormFields = z.infer<typeof profileSchema>;

const Profile = () => {
  const { user } = useAuth();
  const userStorage = useUserLocalStorage();
  const navigate = useNavigate();

  const isTablet = useMediaQuery('(max-width: 767px)');

  const patchProfileMutation = usePatchApiUsersProfileMutation();
  const tokenStorage = useAuthTokenLocalStorage();

  const form = useForm<ProfileFormFields>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      lastname: user?.lastname ?? '',
      firstname: user?.firstname ?? '',
      email: user?.email ?? '',
      middlename: user?.middlename ?? '',
      city: user?.city ?? ''
    }
  });

  const handleSubmitForm = (fields: ProfileFormFields) => {
    patchProfileMutation.mutate(
      { body: { profile: fields, phone: user!.phone } },
      {
        onSuccess: (response) => {
          userStorage.set(response.data.user);
          toast.success('Data updated successfully!');
        },
        onError: () => {
          toast.error('Failed to update data');
        }
      }
    );
  };

  const handleExit = () => {
    navigate('/auth');
    tokenStorage.remove();
  };

  return (
    <Container className='pt-3'>
      {isTablet ? (
        <div className='flex items-center justify-between'>
          <H2>Profile</H2>
          <Button className='bg-brand text-white' size='sm' onClick={handleExit}>
            Log out
            <LogOutIcon />
          </Button>
        </div>
      ) : (
        <H2>Profile</H2>
      )}
      <Form form={form} onSubmit={handleSubmitForm}>
        <div className='mt-8 flex grid-cols-2 flex-col gap-2 md:grid md:gap-4'>
          <FormInput label='Last name' name='lastname' placeholder='Dinosaurov' />
          <FormInput
            disabled
            ref={withMask('+7 (999) 999-99-99')}
            label='Phone'
            name='phone'
            placeholder='+7 (___) ___-__-__'
            value={user!.phone}
          />
          <FormInput label='First name' name='firstname' placeholder='Dino' />
          <FormInput label='Email' name='email' placeholder='ivanov@example.com' />
          <FormInput label='Middle name' name='middlename' placeholder='Dinovich' />
          <FormInput label='City' name='city' placeholder='Moscow' />
          <Button
            className='mt-8'
            disabled={patchProfileMutation.isPending}
            size='lg'
            type='submit'
          >
            {patchProfileMutation.isPending && <Spinner data-icon='inline-start' />}
            Update data
          </Button>
        </div>
      </Form>
    </Container>
  );
};

export default Profile;
