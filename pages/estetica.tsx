import ServiceMenu from '@/components/estetica';
import RootLayout from '@/app/layout';
import DefaultLayout from '@/app/(default)/layout';
import Head from 'next/head';
import EsteticaMenu from '@/components/estetica';

const Estetica: React.FC = () => {
  return (
    <>
    <Head>
        <title>Medicina Estética</title>
    </Head>
    <RootLayout>
        <DefaultLayout>
            <EsteticaMenu/>
        </DefaultLayout>
    </RootLayout>
    </>
  );
};

export default Estetica;