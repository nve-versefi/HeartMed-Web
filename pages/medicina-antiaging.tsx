import RootLayout from '@/app/layout';
import DefaultLayout from '@/app/(default)/layout';
import Head from 'next/head';
import AntiAgingMenu from '@/components/antiagingmenu';
import Accordion from '@/components/accordion'

const Estetica: React.FC = () => {
  return (
    <>
    <Head>
        <title>Medicina Anti-Aging</title>
    </Head>
    <RootLayout>
        <DefaultLayout>
          <div className='md:mx-48 sm:mx-24'>
            <AntiAgingMenu/>
            <Accordion/>
          </div>
        </DefaultLayout>
    </RootLayout>
    </>
  );
};

export default Estetica;