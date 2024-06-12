import RootLayout from '@/app/layout';
import DefaultLayout from '@/app/(default)/layout';

const Formaciones: React.FC = () => {
  return (
    <>
    
    <RootLayout>
        <DefaultLayout>
          <div className='md:mx-48 sm:mx-24'>
          <div className=' text-3xl text-center mt-16'>Bienvenidos a la página sobre Packs</div>

          <div className='text-xl text-center mt-16'>En breve estará lista, vuelve en unos días</div>
          </div>
        </DefaultLayout>
    </RootLayout>
    </>
  );
};

export default Formaciones;