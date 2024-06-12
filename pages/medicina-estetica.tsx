import ServiceMenu from '@/components/esteticamenu';
import RootLayout from '@/app/layout';
import DefaultLayout from '@/app/(default)/layout';
import Head from 'next/head';
import EsteticaMenu from '@/components/esteticamenu';
import Accordion from '@/components/accordion'

const Estetica: React.FC = () => {
  return (
    <>
    <Head>
        <title>Medicina Estética</title>
    </Head>
    <RootLayout>
        <DefaultLayout>
          <div className='md:mx-48 sm:mx-24'>
            <EsteticaMenu/>
            <Accordion/>
          </div>
        </DefaultLayout>
    </RootLayout>
    </>
  );
};

export default Estetica;