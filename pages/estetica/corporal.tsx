import RootLayout from '@/app/layout';
import DefaultLayout from '@/app/(default)/layout';

const Equipos: React.FC = () => {
  return (
    <>
    
    <RootLayout>
        <DefaultLayout>
          <div className='md:mx-48 sm:mx-24'>
          <div className=' text-3xl text-center mt-16'>Bienvenidos a la página sobre medicina estética corporal</div>

          <div className='text-xl text-center mt-16'>En breve estará lista, vuelve en unos días</div>
          </div>
        </DefaultLayout>
    </RootLayout>
    </>
  );
};

export default Equipos;